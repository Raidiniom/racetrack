import { NavLink } from 'react-router-dom'
import '../styles/dashboardpage.css'
import '../styles/header_and_sidebar.css'
import { useEffect, useState } from 'react'
import supabase from '../config/supabaseclient'


const Dashboard = () => {
    const [ fetchError, setFetchError ] = useState(null)
    const [ getraces, setGetraces ] = useState(null)

    useEffect(() => {
        const fetchRaces = async () => {
            const { data, error } = await supabase
             .from('user_created_race')
             .select('*')

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

    const handleLogout = () => {
        localStorage.removeItem('lsusername')
    }

    return (
        <div className="wholesite">
            <div class="dashboard">
                <div class="dashboard-header">
                    <div className="dash-logo">
                    <NavLink to='/'><img src="/img/RaceTrack Logos/RT-logo.png" alt="logo" className="RaceTrack-logo" /></NavLink>
                    </div>
                </div>
                {/* Sidebar */}
                <div class="dashboard-sidebar">
                    <ul>
                        <li><NavLink to="/profile">Your Profile</NavLink></li>
                        <li><NavLink to="/">Dashboard</NavLink></li>
                        <li><NavLink to="/madeevents">Your Races</NavLink></li>
                        <li><NavLink to="/create">Create a Race</NavLink></li>
                        <li><NavLink to="/joinedevents">Joined Races</NavLink></li>
                        <li><NavLink to="/login" onClick={handleLogout}>Logout</NavLink></li>
                    </ul>
                </div>

                {/* Main Content */}
                <div class="dashboard-main-content">
                    <h2>Events</h2>
                    <div className="main-container-dashoard">
                    
                    {/* Events Display   */}

                    {fetchError && (<p className='error'>{fetchError}</p>)}

                    {getraces && (
                        // @CallenCaracy @MarQtie
                        /* Diri lang mo edit sa CSS sa katung content sa dashboard */
                        <div>
                            {getraces.map(output => (
                                <div className='card'>
                                    <NavLink to="/viewevent" className="view-e">
                                        <div className='race-title'>
                                            {output.race_title}
                                        </div>

                                        <div className='contents-post'>
                                            {output.race_description}
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
                            ))}
                        </div>
                    )}
                </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard