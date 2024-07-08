import { NavLink } from 'react-router-dom'
import '../styles/viewevents.css'

const ViewEvent = () => {
    return (
        <div className="wholesite">
            <div class="viewEvents">
                <div class="viewEvents-header">
                    <div className="viewEvents-logo">
                        <img src="\img\RaceTrack Logos\2_FF.png" alt="logo" className="RaceTrack-logo" />
                    </div>
                </div>

                {/* Sidebar */}
                <div class="viewEvents-sidebar">
                    <ul>
                        <li><NavLink to="/profile">Your Profile</NavLink></li>
                        <li><NavLink to="/">Dashboard</NavLink></li>
                        <li><NavLink to="/create">Create Race</NavLink></li>
                        <li>Settings</li>
                        <li><NavLink to="/login">Logout</NavLink></li>
                    </ul>
                </div>

                {/* Main Content */}
                <div class="viewEvents-main-content">
                    <h2 className="ve">Info Event</h2>
                        <div className="view-container-post">

                            {/* mga events diri display */}
                            <div class="view-content">
                                <p>Detailed Sht sa event</p>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default ViewEvent