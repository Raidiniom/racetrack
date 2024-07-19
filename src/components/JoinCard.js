import { NavLink } from "react-router-dom";
import supabase from "../config/supabaseclient";
import { useState } from "react";

const JoinCard = ({ output }) => {
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

            // Optionally, refresh the list of joined events or update the UI
            // You may need to lift the state up to handle this in the parent component

            setFetchError(null);
            alert('Successfully canceled participation!');
        } catch (error) {
            console.error('Unexpected error:', error);
            setFetchError('Unexpected error occurred!');
        }
    };

    return (
        <div className="card">
            <div className="race-title">
                {output.race_title}
            </div>
                <div className='content-wrap'>
                    <div className="race-container">
                        <div className="join-card-buttons">
                            <NavLink to={`/viewevent/${output.race_id}`}>
                                <button className="view-event">View Event</button>
                            </NavLink>
                            <button className="cancel-participation" onClick={handleLeave}>Cancel Participation</button>
                     </div>
                </div>
            </div>
            {fetchError && <p className='error'>{fetchError}</p>}
        </div>
    );
};

export default JoinCard;
