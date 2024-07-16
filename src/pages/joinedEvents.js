import { NavLink } from 'react-router-dom'
import '../styles/joinedevents.css'
import supabase from '../config/supabaseclient'

const JoinedEvent = () => {

    const handleLogout = () => {
        localStorage.removeItem('lsusername')
    }

    return (
        <div className="wholesite">
            <div class="joinEvents">
                <div class="joinEvents-header">
                    <div className="joinEvents-logo">
                        <img src="\img\RaceTrack Logos\2_FF.png" alt="logo" className="RaceTrack-logo" />
                    </div>
                </div>

                {/* Sidebar */}
                <div class="joinEvents-sidebar">
                    <ul>
                        <li><NavLink to="/profile">Your Profile</NavLink></li>
                        <li><NavLink to="/">Dashboard</NavLink></li>
                        <li><NavLink to="/madeevents">Your Events</NavLink></li>
                        <li><NavLink to="/create">Create Race</NavLink></li>
                        <li><NavLink to="/joinedevents">Joined Events</NavLink></li>
                        <li><NavLink to="/login" onClick={handleLogout}>Logout</NavLink></li>
                    </ul>
                </div>

                {/* Main Content */}
                <div class="joinEvents-main-content">
                    <h2 className="join-ve">Joined Events</h2>
                        <div className="join-container-post">

                            {/* backend ako ra e css, ebutang lang display */}
                            {/* {fetchError && (<p className='error'>{fetchError}</p>)}

                                {getraces && (
                                    <div className="container-post">
                                        {getraces.map(output => (
                                            <div key={output.id} className="join-card-ye">
                                                <NavLink to="/updateevent" className="adto">
                                                    <div className='join-user-name-ye'>
                                                        {output.race_title}
                                                        <div className='join-contents-post-ye'>
                                                            {output.race_description}
                                                        </div>
                                                    </div>
                                                </NavLink>
                                            </div>
                                        ))}
                                    </div>
                                )} */}
                        </div>
                </div>
            </div>
        </div>
    )
}

export default JoinedEvent