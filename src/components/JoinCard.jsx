import { NavLink } from "react-router-dom";
import supabase from "../config/supabaseclient";
import { useState } from "react";

const JoinCard = ({ output, onLeave }) => {
    const [fetchError, setFetchError] = useState(null);

    const handleLeave = async (e) => {
        e.preventDefault();

        try {
            const { data: sess, error: nosess } = await supabase.auth.getSession();

            if (nosess) {
                setFetchError('User not found!');
                return;
            }

            const user_participant = sess.session.user;

            const { data: userData, error: userError} = await supabase
                .from('app_users')
                .select('user_id')
                .eq('email', user_participant.email)
                .single()

            if (userError) {
                setFetchError('Failed to retrieve user ID!');
                return;
            }

            const userId = userData.user_id;
            const raceId = output.race_id;

            // Delete the participant record
            const { error: deleteError } = await supabase
                .from('participant_list')
                .delete()
                .eq('user_participant', userId)
                .eq('from_race', raceId)

            if (deleteError) {
                setFetchError('Error canceling participation!');
                return;
            }

            // Update the current participant count
            const { data: race, error: raceError } = await supabase
                .from('user_created_race')
                .select('current_participant')
                .eq('race_id', raceId)
                .single();

            if (raceError) {
                setFetchError('Error fetching race data!');
                return;
            }

            const updatedParticipantCount = race.current_participant - 1;

            const { error: updateError } = await supabase
                .from('user_created_race')
                .update({ current_participant: updatedParticipantCount })
                .eq('race_id', raceId)
                .single();

            if (updateError) {
                setFetchError('Error updating participant count!');
                return;
            }

            setFetchError(null);
            alert('Successfully canceled participation!');

            if (onLeave) onLeave(raceId); 
        } catch (error) {
            console.error('[ERROR] -> ', error);
            setFetchError('Unexpected error occurred!');
        }
    };
    return (
        <div className="joinedraces-card">
            <div className="joinedraces-card-racetitle">
                {output.race_title}
            </div>
            {/* Insert Picture/Banner here */}
            <div class="joinedraces-card-banner-container">
                <img src="insert-path-here" alt="banner" class="dashb-card-banner"/>
            </div>
                <div className='joinedraces-card-details-container'>
                    <div class="joinedraces-card-details-wrapper">
                        <img src="img/distance-icon.png" alt="distance" class="joinraces-icon"/>
                        <div><label class="joinedraces-card-details">Track Distance:</label> {output.race_distance} KM</div>
                    </div>
                    <div class="joinedraces-card-details-wrapper">
                        <img src="img/loc-icon.png" alt="icon" class="joinraces-icon"/>
                        <div><label class="joinedraces-card-details">Location:</label> {output.location}</div>
                    </div>
                    <div class="joinedraces-card-details-wrapper">
                        <img src="img/calendar-icon.png" alt="icon" class="joinraces-icon"/>
                        <div><label class="joinedraces-card-details">Start Date:</label> {output.start_date}</div>
                        <div><label class="joinedraces-card-details">Registration Date:</label> {output.registration_date}</div>
                    </div>
                </div>
                    <div class='button-container'>
                        <NavLink to={`/view-races/${output.race_id}`}>
                            <button className="more-button">View Event</button>
                        </NavLink>
                        <button className="join-button" onClick={handleLeave}>Leave Race</button>
                    </div>
            {fetchError && <p className='error'>{fetchError}</p>}
        </div>
    );
};

export default JoinCard;