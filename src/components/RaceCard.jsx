import { NavLink } from "react-router-dom";
import supabase from "../config/supabaseclient";

/* This displays the races created by the user with Update and Delete functionality */

const RaceCard = ({ output, onDelete }) => {
    const handleDelete = async () => {
        try {
            // Fetch participants of the race
            const { data: participants, error: participantsError } = await supabase
                .from("participant_list")
                .select("list_id, user_participant")
                .eq("from_race", output.race_id);

            if (participantsError) {
                console.log(participantsError);
                return;
            }

            console.log("Fetched participants:", participants);

            // Delete participants first
            if (participants && participants.length > 0) {
                const participantIds = participants.map((p) => p.list_id);

                if (participantIds.includes(undefined)) {
                    console.error("Some participant IDs are undefined:", participantIds);
                    return;
                }

                const { error: deleteParticipantsError } = await supabase
                    .from("participant_list")
                    .delete()
                    .in("list_id", participantIds);

                if (deleteParticipantsError) {
                    console.log(deleteParticipantsError);
                    return;
                }
            }

            // Delete the race
            const { error: deleteRaceError } = await supabase
                .from("user_created_race")
                .delete()
                .eq("race_id", output.race_id);

            if (deleteRaceError) {
                console.log(deleteRaceError);
                return;
            }

            // Create notifications for each participant
            if (participants && participants.length > 0) {
                const notifications = participants.map((participant) => ({
                    user_id: participant.user_participant,
                    message: `The event "${output.race_title}" has been deleted.`,
                    time_stamp: new Date().toISOString(),
                }));

                console.log("Notifications to be inserted:", notifications);

                const { error: notificationsError } = await supabase
                    .from("notification")
                    .insert(notifications);

                if (notificationsError) {
                    console.log("Error inserting notifications:", notificationsError);
                    return;
                }
            }

            // Notify parent to refresh list
            if (onDelete) onDelete();
        } catch (error) {
            console.error("Error deleting race:", error);
        }
    };

    return (
        <div className="createdr-card">
            <div className="createdr-title">{output.race_title}</div>
            <p className="createdr-location"><strong>Location:</strong>{output.location}</p>

            <div className="race-grid">

                <div className="createdr-left">



                    <div className="race-banner-picture">
                        <img
                            src={output.race_banner_url}
                            alt="race banner"
                            className="race-banner-img"
                        />
                    </div>

                    <p className="createdr-header-description">About the event</p>
                    <p className="createdr-description"> {output.race_description}</p>
                </div>

                {/* RIGHT SIDE */}

                <div className="createdr-details-container">
                    <div className="createdr-details-wrapper">
                        <img src="img/agereq-icon.png" alt="icon" className="icon" />
                        <div>
                            <label className="createdr-card-details">Age Requirement:</label>
                            {output.min_age} - {output.max_age} yrs old
                        </div>
                    </div>



                    <div className="createdr-details-wrapper">
                        <img src="img/distance-icon.png" alt="icon" className="icon" />
                        <div>
                            <label className="createdr-card-details">Race Distance:</label>
                            {output.race_distance} KM
                        </div>
                    </div>

                    <div className="createdr-details-wrapper">
                        <img src="img/capacity-icon.png" alt="icon" className="icon" />
                        <div>
                            <label className="createdr-card-details">Maximum Racers:</label>
                            {output.capacity}
                        </div>
                    </div>


                    <div className="createdr-details-wrapper">
                        <img src="img/participant-icon.png" alt="icon" className="icon" />
                        <div>
                            <label className="createdr-details">Currently Joined:</label>
                            {output.current_participant}
                        </div>
                    </div>

                    <div className="createdr-details-wrapper">
                        <img src="img/calendar-icon.png" alt="icon" className="icon" />
                        <div>
                            <label className="createdr-details">Start Date:</label>
                            {output.start_date}
                        </div>
                    </div>

                    <div className="createdr-details-wrapper">
                        <img src="img/calendar-icon.png" alt="icon" className="icon" />
                        <div>
                            <label className="createdr-card-details">Registration Date:</label>
                            {output.registration_date}
                        </div>
                    </div>



                    <div className="createdr-button-container">
                        <NavLink to={"/" + output.race_id}>
                            <button className="createdr-button">Update Event</button>
                        </NavLink>

                        <button className="createdr-button" onClick={handleDelete}>
                            Delete Event
                        </button>
                    </div>


                </div>








            </div>

        </div>
    );
};

export default RaceCard;
