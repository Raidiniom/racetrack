import { NavLink } from "react-router-dom"
import supabase from "../config/supabaseclient"

/* This is for displaying the races created by the user to Update and Delete */

const RaceCard = ({ output, onDelete }) => {
    const handleDelete = async () => {
        try {

             // Fetch participants of the race
             const { data: participants, error: participantsError } = await supabase
                .from('participant_list')
                .select('list_id, user_participant')
                .eq('from_race', output.race_id);

         if (participantsError) {
             console.log(participantsError);
             return;
         }

         console.log('Fetched participants:', participants);

         // Delete participants first
         if (participants && participants.length > 0) {
            const participantIds = participants.map(participant => participant.list_id);

            if (participantIds.includes(undefined)) {
                console.error('Some participant IDs are undefined:', participantIds);
                return;
            }

            const { error: deleteParticipantsError } = await supabase
                .from('participant_list')
                .delete()
                .in('list_id', participantIds);

            if (deleteParticipantsError) {
                console.log(deleteParticipantsError);
                return;
            }
        }
         
            // Delete related data
            const { error: relatedError } = await supabase
                .from('user_created_race')
                .delete()
                .eq('race_id', output.race_id);

            if (relatedError) {
                console.log(relatedError);
                return;
            }

            // Delete the race
            const { data, error } = await supabase
                .from('user_created_race')
                .delete()
                .eq('race_id', output.race_id);

            if (error) {
                console.log(error);
                return;
            }

            console.log(data);

            // Create notifications for each participant
            if (participants) {
                const notifications = participants.map(participant => ({
                    user_id: participant.user_participant,
                    message: `The event "${output.race_title}" has been deleted.`,
                }));

                const { error: notificationsError } = await supabase
                    .from('notification')
                    .insert(notifications);

                if (notificationsError) {
                    console.log(notificationsError);
                    return;
                }
            }

            // Call the onDelete callback to refresh the parent component
            if (onDelete) onDelete();

        } catch (error) {
            console.error('Error deleting race:', error);
        }
    };

    return (
        <div className="ye-card">
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
                    <div>
                        <NavLink to={'/' + output.race_id}>
                        <button className="yeButton">Update Event</button>
                        </NavLink>
                        <button className="yeButton" onClick={handleDelete}>Delete Event</button>
                    </div>

                </div>
                
        </div>
    )
}

export default RaceCard