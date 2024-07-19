import { NavLink } from "react-router-dom";
import supabase from "../config/supabaseclient";
import { useState } from "react";

const JoinCard = ({ output, onLeave }) => {
    const [fetchError, setFetchError] = useState(null);

    const handleLeave = async (e) => {
        e.preventDefault();

        const username = localStorage.getItem('lsusername');
        if (!username) {
            setFetchError('Please log in to cancel your participation.');
            return;
        }

        try {
            // Fetch user ID
            const { data: user, error: userError } = await supabase
                .from('app_users')
                .select('user_id')
                .eq('username', username)
                .single();

            if (userError) {
                console.error('Error fetching user:', userError);
                setFetchError('User not found!');
                return;
            }

            const user_participant = user.user_id;
            const parsedRaceId = parseInt(output.race_id, 10);

            if (isNaN(parsedRaceId)) {
                setFetchError('Invalid race ID!');
                return;
            }

            // Delete the participant record
            const { error: deleteError } = await supabase
                .from('participant_list')
                .delete()
                .eq('from_race', parsedRaceId)
                .eq('user_participant', user_participant);

            if (deleteError) {
                console.error('Error canceling participation:', deleteError);
                setFetchError('Error canceling participation!');
                return;
            }

            // Update the current participant count
            const { data: race, error: raceError } = await supabase
                .from('user_created_race')
                .select('current_participant')
                .eq('race_id', parsedRaceId)
                .single();

            if (raceError) {
                console.error('Error fetching race data:', raceError);
                setFetchError('Error fetching race data!');
                return;
            }

            const updatedParticipantCount = race.current_participant - 1;

            const { error: updateError } = await supabase
                .from('user_created_race')
                .update({ current_participant: updatedParticipantCount })
                .eq('race_id', parsedRaceId)
                .single();

            if (updateError) {
                console.error('Error updating participant count:', updateError);
                setFetchError('Error updating participant count!');
                return;
            }

            setFetchError(null);
            alert('Successfully canceled participation!');

            if (onLeave) onLeave(); 
        } catch (error) {
            console.error('Unexpected error:', error);
            setFetchError('Unexpected error occurred!');
        }
    };

    return (
        <div className="join-card">
            <div className="race-title">
                {output.race_title}
            </div>
                <div className='content-wrap'>
                    <div className="race-container">
                        <img src="img/agereq-icon.png" alt="icon" class="icon"/>
                        <div class ="race-details"><label class="race-label">Age Requirement:</label> {output.min_age} - {output.max_age} years old</div>
                        <img src="img/distance-icon.png" alt="icon" class="icon"/>
                        <div class ="race-details"><label class="race-label">Race Distance:</label> {output.race_distance} KM</div>
                        <img src="img/capacity-icon.png" alt="icon" class="icon"/>
                        <div class ="race-details"><label class="race-label">Maximum Racers:</label> {output.capacity}</div>
                        <img src="img/participant-icon.png" alt="icon" class="icon"/>
                        <div class ="race-details"><label class="race-label">Currently Joined:</label> {output.current_participant}</div>
                    </div>
                    <div class="date-container">
                        <img src="img/calendar-icon.png" alt="icon" class="icon"/>
                        <div class ="date-details"><label class="date-label">Start Date:</label> {output.start_date}</div>
                        <div class ="date-details"><label class="date-label">Registration Date:</label> {output.registration_date}</div>
                        <img src="img/loc-icon.png" alt="icon" class="icon"/>
                        <div class ="date-details"><label class="date-label">Location:</label> {output.location}</div>
                        </div>
                    </div>
                    <div>
                        <NavLink to={`/viewevent/${output.race_id}`}>
                            <button className="joinButton">View Event</button>
                        </NavLink>
                    </div>
                    <div>
                        <button className="joinButton" onClick={handleLeave}>Cancel Participation</button>
                    </div>
            {fetchError && <p className='error'>{fetchError}</p>}
        </div>
    );
};

export default JoinCard;
