import { NavLink } from "react-router-dom"

/* This is the dashboard Race details display, For dashboard use only */
// hello
const DashCard =({output}) => {
    return  (
            <div className="dashb-card">
                <div className="dashb-card-racetitle">
                    {output.race_title}
                </div>
                {/* Insert Picture/Banner here */}
                <div class="dashb-card-banner-container">
                    <img src="insert-path-here" alt="banner" class="dashb-card-banner"/>
                </div>
                <div className="dashb-card-details-container">
                    <div class="dashb-card-details-wrapper">
                        <img src="img/distance-icon.png" alt="distance" class="icon"/>
                        <div><label class="dashb-card-details">Track Distance:</label> {output.race_distance} KM</div>
                    </div>
                    <div class="dashb-card-details-wrapper">
                        <img src="img/loc-icon.png" alt="icon" class="icon"/>
                        <div><label class="dashb-card-details">Location:</label> {output.location}</div>
                    </div>
                    <div class="dashb-card-details-wrapper">
                        <img src="img/calendar-icon.png" alt="icon" class="icon"/>
                        <div><label class="dashb-card-details">Start Date:</label> {output.start_date}</div>
                        <div><label class="dashb-card-details">Registration Date:</label> {output.registration_date}</div>
                    </div>
                </div>
                <div class='more-button-container'>
                    <NavLink to={'/view-races/' + output.race_id}> <button class="more-button" type='submit'>More Details</button></NavLink>
                </div>
            </div>
    )
}

export default DashCard