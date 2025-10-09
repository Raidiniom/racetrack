import { NavLink } from 'react-router-dom'
import '../styles/dashboard-page.css'
import '../styles/header_and_sidebar.css'
import '../styles/errors.css'
import '../styles/searchbar.css'
import { useEffect, useState } from 'react'
import supabase from '../config/supabaseclient'
//hello
//Components
import DashCard from '../components/DashCard'
import { SearchR } from '../components/Searching'

// ASDASDASDASDASDASD

const Dashboard = () => {
    const [ fetchError, setFetchError ] = useState(null)
    const [ getraces, setGetraces ] = useState([])

    useEffect(() => {
    
        const fetchRaces = async () => {
            const { data, error } = await supabase
             .from('user_created_race')
             .select('*')

            if (error) {
                setFetchError('No Races Open!')
                setGetraces(error)
            }

            if (data) {
                setGetraces(data)
                setFetchError(null)
            }
        }

        fetchRaces()
    }, [])


    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut()
        
        if (error) {
            console.error(error)
        } else {
            window.location.href='/login'
        }
    }

    return (
            <div class="dashb-body">
                {/* Headerbar */}
                <div class="gen-headerbar">
                    <div className="gen-headerbar-logo">
                        <NavLink to='/dashboard'><img src="/img/RaceTrack Logos/RT-logo.png" alt="logo" className="RaceTrack-logo" /></NavLink>
                    </div>
                    <div className="header-right">
                        <div className="pfp">
                            <NavLink to="/profile">
                                <button className="notification-button">
                                    <img src="img/pfp.png" alt="icon" className="pfp-icon" /> Profile
                                </button>
                            </NavLink>
                        </div>
                        <div className="notifications-container">
                            <NavLink to="/notifications">
                                <button className="notification-button">
                                    <img src="img/noti-icon.png" alt="icon" className="noti-icon" /> Notifications
                                </button>
                            </NavLink>
                        </div>
                    </div>
                </div>
                {/* Sidebar */}
                <div className="gen-sidebar">
                    <ul>
                        <li><NavLink to="/profile">Your Profile</NavLink></li>
                        <li><NavLink to="/created-races">Your Races</NavLink></li>
                        <li><NavLink to="/joined-races">Joined Races</NavLink></li>
                        <li><NavLink to="/dashboard">Join a Race</NavLink></li>
                        <li><NavLink to="/create-race">Create a Race</NavLink></li>
                        <li><NavLink to="/landing" onClick={handleLogout}>Log Out</NavLink></li>
                    </ul>
                </div>
                {/* Main Content */}
                <div className="dashb-main-content">
                    <div class='dashb-main-content-header'>
                        <h2>Available Races</h2>
                        {/* Search Bar */}
                        <div>
                            <SearchR setGetraces={setGetraces} setFetchError={setFetchError}/>
                        </div> 
                    </div>  
                    {/* Available Races Display */}
                    <div className="dashb-main-container">
                        {fetchError && getraces.length === 0 && (<p className='error'>{fetchError}</p>)}
                        {getraces && (
                            <div>
                                {getraces.map(output => (
                                    <DashCard key={output.race_id} output={output}/>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
    )
}

export default Dashboard