import { NavLink } from 'react-router-dom'
import '../styles/created-races.css'
import '../styles/header_and_sidebar.css'
import { useEffect, useState } from 'react'
import supabase from '../config/supabaseclient'
import { useParams } from 'react-router-dom'

//components
import RaceCard from '../components/RaceCard'

const MadeEvents = () => {
    const [fetchError, setFetchError] = useState(null)
    const [getraces, setGetraces] = useState(null)
    const [refresh, setRefresh] = useState(false);

    const raceCreator = localStorage.getItem('lsusername')

    useEffect(() => {
        const fetchRaces = async () => {
            try {
                const { data, error} = await supabase
                 .from('app_users')
                 .select('user_id')
                 .eq('username', raceCreator)
   
               if (error) {
                   throw error
               }
   
               if (!data || data.length === 0) {
                   throw new Error('Uh oh!!')
               }
   
               const u_id = data[0].user_id
   
               const { data: races, error: no_races } = await supabase
                .from('user_created_race')
                .select('*')
                .eq('race_creator', u_id)
   
               if (no_races) {
                   throw no_races
               }
   
               if (!races || races.length === 0) {
                   throw new Error('No created Races yet.')
               }
   
               setGetraces(races)
               setFetchError(null)
            } catch (error) {
                setFetchError(error.message || JSON.stringify(error))
                setGetraces(null)
            }
        }

        fetchRaces()
    }, [raceCreator, refresh])

    const handleLogout = () => {
        localStorage.removeItem('lsusername')
    }

    const handleDelete = () => {
        // Trigger re-fetch by updating `refresh` state
        setRefresh(prev => !prev);
    };


    return (
            <div className="createdr-body">
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
                <div className="createdr-main-content">
                    <div className='createdr-main-content-header'>
                        <h2>Your Races</h2>
                    </div> 
                {/* Created Races Display */}
                <div className="createdr-main-container">
                    {fetchError && (<p className='error'>{fetchError}</p>)}
                        {getraces && (
                        <div>
                            {getraces.map(output => (
                                <RaceCard key={output.race_id} output={output} onDelete={handleDelete}/>
                            ))}
                        </div>
                    )}
                </div>
            </div>  
        </div>
    )
}

export default MadeEvents