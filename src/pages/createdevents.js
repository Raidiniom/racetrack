import { NavLink } from 'react-router-dom'
import '../styles/yourevents.css'

const MadeEvents = () => {
    return (
        <div className="wholesite">
            <div class="yourEvents">
                <div class="yourEvents-header">
                    <div className="yourEvents-logo">
                        <img src="\img\RaceTrack Logos\2_FF.png" alt="logo" className="RaceTrack-logo" />
                    </div>
                </div>

                {/* Sidebar */}
                <div class="yourEvents-sidebar">
                    <ul>
                        <li><NavLink to="/profile">Your Profile</NavLink></li>
                        <li><NavLink to="/">Dashboard</NavLink></li>
                        <li><NavLink to="/create">Create Race</NavLink></li>
                        <li>Settings</li>
                        <li><NavLink to="/login">Logout</NavLink></li>
                    </ul>
                </div>

                {/* Main Content */}
                <div class="dashboard-main-content">
                    <h2>Your Created Events</h2>

                    {/* mga events diri display */}
                    <div class="card">
                        <div className='person-post-container'>
                            <div className='user-name'>
                                <h4>Event Name</h4><br></br>
                                <p>By user</p>
                            </div>
                        </div>
                        <div className='contents-post'>
                            Here the contents like the description, pic, etc.
                        </div>
                    </div>
                    <div class="card">
                        <div className='person-post-container'>
                            <div className='user-name'>
                                <h4>Event Name</h4><br></br>
                                <p>By user</p>
                            </div>
                        </div>
                        <div className='contents-post'>
                            Here the contents like the description, pic, etc.
                        </div>
                    </div>
                    <div class="card">
                        <div className='person-post-container'>
                            <div className='user-name'>
                                <h4>Event Name</h4><br></br>
                                <p>By user</p>
                            </div>
                        </div>
                        <div className='contents-post'>
                            Here the contents like the description, pic, etc.
                        </div>
                    </div>
                    <div class="card">
                        <div className='person-post-container'>
                            <div className='user-name'>
                                <h4>Event Name</h4><br></br>
                                <p>By user</p>
                            </div>
                        </div>
                        <div className='contents-post'>
                            Here the contents like the description, pic, etc.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MadeEvents