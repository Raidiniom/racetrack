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
                        <li>Joined Events</li>
                        <li><NavLink to="/login">Logout</NavLink></li>
                    </ul>
                </div>

                {/* Main Content */}
                <div class="yourEvents-main-content">
                    <h2 className="ye">Your Created Events</h2>
                        <div className="container-post">

                            {/* mga events diri display */}
                            <div class="card-ye">
                                <div className='person-post-container-ye'>
                                    <div className='user-name-ye'>
                                        <h4>Event Name<br></br>By User</h4>
                                    </div>
                                </div>
                                <div className='contents-post-ye'>
                                    Here the contents like the description, pic, etc.
                                </div>
                            </div>
                            <div class="card-ye">
                                <div className='person-post-container-ye'>
                                    <div className='user-name-ye'>
                                        <h4>Event Name<br></br>By User</h4>
                                    </div>
                                </div>
                                <div className='contents-post-ye'>
                                    Here the contents like the description, pic, etc.
                                </div>
                            </div>
                            <div class="card-ye">
                                <div className='person-post-container-ye'>
                                    <div className='user-name-ye'>
                                        <h4>Event Name<br></br>By User</h4>
                                    </div>
                                </div>
                                <div className='contents-post-ye'>
                                    Here the contents like the description, pic, etc.
                                </div>
                            </div>
                            <div class="card-ye">
                                <div className='person-post-container-ye'>
                                    <div className='user-name-ye'>
                                        <h4>Event Name<br></br>By User</h4>
                                    </div>
                                </div>
                                <div className='contents-post-ye'>
                                    Here the contents like the description, pic, etc.
                                </div>
                            </div>
                            <div class="card-ye">
                                <div className='person-post-container-ye'>
                                    <div className='user-name-ye'>
                                        <h4>Event Name<br></br>By User</h4>
                                    </div>
                                </div>
                                <div className='contents-post-ye'>
                                    Here the contents like the description, pic, etc.
                                </div>
                            </div>
                            <div class="card-ye">
                                <div className='person-post-container-ye'>
                                    <div className='user-name-ye'>
                                        <h4>Event Name<br></br>By User</h4>
                                    </div>
                                </div>
                                <div className='contents-post-ye'>
                                    Here the contents like the description, pic, etc.
                                </div>
                            </div>
                            <div class="card-ye">
                                <div className='person-post-container-ye'>
                                    <div className='user-name-ye'>
                                        <h4>Event Name<br></br>By User</h4>
                                    </div>
                                </div>
                                <div className='contents-post-ye'>
                                    Here the contents like the description, pic, etc.
                                </div>
                            </div>
                            <div class="card-ye">
                                <div className='person-post-container-ye'>
                                    <div className='user-name-ye'>
                                        <h4>Event Name<br></br>By User</h4>
                                    </div>
                                </div>
                                <div className='contents-post-ye'>
                                    Here the contents like the description, pic, etc.
                                </div>
                            </div>
                            <div class="card-ye">
                                <div className='person-post-container-ye'>
                                    <div className='user-name-ye'>
                                        <h4>Event Name<br></br>By User</h4>
                                    </div>
                                </div>
                                <div className='contents-post-ye'>
                                    Here the contents like the description, pic, etc.
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default MadeEvents