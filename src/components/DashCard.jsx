import { NavLink } from "react-router-dom"

/* This is the dashboard Race details display, For dashboard use only */

const DashCard = ({ output }) => {
    return (
        <div className="dashb-card">
            <div className="dashb-card-racetitle">
                {output.race_title}
            </div>
            <div>
                <img 
                    src={output.race_banner_url}
                    alt="race banner picture"
                />
            </div>
            <div className="dashb-card-details-container">
                <div className="dashb-card-details-wrapper">
                    <img src="img/distance-icon.png" alt="distance" className="icon" />
                    <div>
                        <label className="dashb-card-details">Track Distance:</label> {output.race_distance} KM
                    </div>
                </div>
                <div className="dashb-card-details-wrapper">
                    <img src="img/loc-icon.png" alt="icon" className="icon" />
                    <div>
                        <label className="dashb-card-details">Location:</label> {output.location}
                    </div>
                </div>
                <div className="dashb-card-details-wrapper">
                    <img src="img/calendar-icon.png" alt="icon" className="icon" />
                    <div>
                        <label className="dashb-card-details">Start Date:</label> {output.start_date}
                    </div>
                    <div>
                        <label className="dashb-card-details">Registration Date:</label> {output.registration_date}
                    </div>
                </div>
            </div>
            <div className="more-button-container">
                <NavLink to={`/view-races/${output.race_id}`}>
                    <button className="more-button" type="submit">
                        More Details
                    </button>
                </NavLink>
            </div>
        </div>
    )
}

export default DashCard
