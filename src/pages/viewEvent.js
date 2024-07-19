import { NavLink } from 'react-router-dom'
import '../styles/viewevents.css'
import '../styles/header_and_sidebar.css'
import supabase from '../config/supabaseclient'

const ViewEvent = () => {
    // naay ny join feature 


    const joinEvent = async (e) => {
        e.preventDefault()
    }

    const handleLogout = () => {
        localStorage.removeItem('lsusername')
    }

    return (
        <div className="wholesite">
            <div class="viewEvents">
                <div class="dashboard-header">
                    <div className="dash-logo">
                        <img src="\img\RaceTrack Logos\l_FF.png" alt="logo" className="RaceTrack-logo" />
                    </div>
                </div>

                {/* Sidebar */}
                <div class="dashboard-sidebar">
                    <ul>
                        <li><NavLink to="/profile">Your Profile</NavLink></li>
                        <li><NavLink to="/">Dashboard</NavLink></li>
                        <li><NavLink to="/madeevents">Your Events</NavLink></li>
                        <li><NavLink to="/create">Create Race</NavLink></li>
                        <li><NavLink to="/joinedevents">Joined Event</NavLink></li>
                        <li><NavLink to="/login" onClick={handleLogout}>Logout</NavLink></li>
                    </ul>
                </div>

                {/* Main Content */}
                <div class="viewEvents-main-content">
                    <h2 className="ve">Info Event</h2>
                        <div className="view-container-post">

                            {/* mga events diri display */}
                            <div class="view-content">
                                <div className="card-view">
                                    <div className="pad">
                                        <div className="details-event">
                                        <div className="event-picc">
                                            <img src="https://wallpapercave.com/wp/wp4043831.jpg" alt="Profile Picture" />
                                        </div>
                                        <hr></hr>
                                            <div className="details-event-part1">
                                                <h2>Event title</h2>
                                                <p>then the rest info</p>
                                                <p>Event description last</p>
                                                <h2>Event title</h2>
                                                <p>then the rest info</p>
                                                <p>Event description last</p>
                                                <h2>Event title</h2>
                                                <p>then the rest info</p>
                                                <p>Event description last</p>
                                            </div>
                                            <div className="details-event-part2">
                                                <button className="join-event">Join Event</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default ViewEvent