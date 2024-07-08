import { NavLink } from 'react-router-dom'
import '../styles/dashboardpage.css'
import { useEffect, useState } from 'react'
import supabase from '../config/supabaseclient'

const Dashboard = () => {
    const [ fetchError, setFetchError ] = useState(null)
    const [ getraces, setGetraces ] = useState(null)

    useEffect(() => {
        const fetchRaces = async () => {
            const { data, error } = await supabase
             .from('createRace')
             .select()

            if (error) {
                setFetchError('No Races Open!')
                setGetraces(null)
            }

            if (data) {
                setGetraces(data)
                setFetchError(null)
            }
        }

        fetchRaces()
    }, [])

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
                        <li><NavLink to="/profile">Your Profile</NavLink></li>
                        <li><NavLink to="/madeevents">Your Events</NavLink></li>
                        <li><NavLink to="/create">Create Race</NavLink></li>
                        <li>Settings</li>
                        <li><NavLink to="/login">Logout</NavLink></li>
                    </ul>
                </div>

                {/* Main Content */}
                <div class="dashboard-main-content">
                    <h2>Events</h2>

                    {/* mga events diri display */}

                    {fetchError && (<p className='error'>{fetchError}</p>)}

                    {getraces && (
                        <div>
                            {getraces.map(output => (
                                <div className='card'>
                                    <div className='user-name'>
                                        {output.racetitle}
                                    </div>

                                    <div className='contents-post'>
                                        {output.description}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}





                    {/* <div class="card">
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
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default Dashboard