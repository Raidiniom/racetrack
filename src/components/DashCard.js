import { NavLink } from "react-router-dom"

const DashCard =({output}) => {
    return(
        <div className="card">
            <NavLink to={'/viewevent/' + output.race_id}>
            <div className="race-title">
                {output.race_title}
            </div>
            <div className='content-wrap'>
                <div class="race-container">
                    <img src="img/agereq-icon.png" alt="icon" class="icon"/>
                        <div class ="race-details"><label class="race-label">Age Requirement:</label> {output.min_age} - {output.max_age} years old</div>
                        <img src="img/distance-icon.png" alt="icon" class="icon"/>
                        <div class ="race-details"><label class="race-label">Race Distance:</label> {output.race_distance} KM</div>
                        <img src="img/capacity-icon.png" alt="icon" class="icon"/>
                        <div class ="race-details"><label class="race-label">Maximum Racers:</label> {output.capacity}</div>
                        <img src="img/participant-icon.png" alt="icon" class="icon"/>
                        <div class ="race-details"><label class="race-label">Currently Joined:</label> {output.curren_cap}</div>
                    </div>
                    <div class="date-container">
                        <img src="img/calendar-icon.png" alt="icon" class="icon"/>
                        <div class ="date-details"><label class="date-label">Start Date:</label> {output.start_date}</div>
                        <div class ="date-details"><label class="date-label">Registration Date:</label> {output.registration_date}</div>
                    </div>
                </div>
            </NavLink>
        </div>
    )
}

export default DashCard