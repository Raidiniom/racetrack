import { NavLink } from 'react-router-dom'
import '../styles/dashboardpage.css'

const Dashboard = () => {
    return (
        <div className="wholesite">
            <div class="dashboard">
                <div class="dashboard-header">
                    <div className="dash-logo">
                        <img src="\img\RaceTrack Logos\2_FF.png" alt="logo" className="RaceTrack-logo" />
                    </div>
                </div>

                {/* Sidebar */}
                <div class="dashboard-sidebar">
                    <ul>
                        <li>Profile </li>
                        <li><NavLink to="/create">Create Race </NavLink></li>
                        <li><NavLink to="/update">Update Race </NavLink></li>
                        <li>Settings </li>
                        <li><NavLink to="/login">Logout </NavLink></li>
                    </ul>
                </div>

                {/* Main Content */}
                <div class="dashboard-main-content">
                    <h2>Events</h2>

                    {/* mga events diri display */}
                    <div class="card">
                        <div className='person-post-container'>
                            <div className='user-post-pfp'>
                                <img src="\img\Default Img\defaultpfp.jpg" alt="pfp" className="user-pfp" />
                            </div>
                            <div className='user-name'>
                                <h4>Username</h4>
                            </div>
                        </div>
                        <div className='contents-post'>
                            Here the contents like the description, pic, etc.
                        </div>
                    </div>
                    <div class="card">
                        <div className='person-post-container'>
                            <div className='user-post-pfp'>
                                <img src="\img\Default Img\defaultpfp.jpg" alt="pfp" className="user-pfp" />
                            </div>
                            <div className='user-name'>
                                <h4>Username</h4>
                            </div>
                        </div>
                        <div className='contents-post'>
                            Here the contents like the description, pic, etc.
                        </div>
                    </div>
                    <div class="card">
                        <div className='person-post-container'>
                            <div className='user-post-pfp'>
                                <img src="\img\Default Img\defaultpfp.jpg" alt="pfp" className="user-pfp" />
                            </div>
                            <div className='user-name'>
                                <h4>Username</h4>
                            </div>
                        </div>
                        <div className='contents-post'>
                            Here the contents like the description, pic, etc.
                        </div>
                    </div>
                    <div class="card">
                        <div className='person-post-container'>
                            <div className='user-post-pfp'>
                                <img src="\img\Default Img\defaultpfp.jpg" alt="pfp" className="user-pfp" />
                            </div>
                            <div className='user-name'>
                                <h4>Username</h4>
                            </div>
                        </div>
                        <div className='contents-post'>
                            Here the contents like the description, pic, etc.
                        </div>
                    </div>
                    <div class="card">
                        <div className='person-post-container'>
                            <div className='user-post-pfp'>
                                <img src="\img\Default Img\defaultpfp.jpg" alt="pfp" className="user-pfp" />
                            </div>
                            <div className='user-name'>
                                <h4>Username</h4>
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

export default Dashboard