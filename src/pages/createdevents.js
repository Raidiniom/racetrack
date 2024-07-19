import { NavLink } from 'react-router-dom'
import '../styles/yourevents.css'
import '../styles/header_and_sidebar.css'
import { useEffect, useState } from 'react'
import supabase from '../config/supabaseclient'

const MadeEvents = () => {
    const [fetchError, setFetchError] = useState(null)
    const [getraces, setGetraces] = useState(null)

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
                   throw new Error('No Races!!')
               }
   
               setGetraces(races)
               setFetchError(null)
            } catch (error) {
                setFetchError(error.message || JSON.stringify(error))
                setGetraces(null)
            }
        }

        fetchRaces()
    }, [raceCreator])

    const handleLogout = () => {
        localStorage.removeItem('lsusername')
    }

    return (
        <div className="wholesite">
            <div className="yourEvents">
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
                <div className="yourEvents-main-content">
                    <h2 className="ye">Your Created Events</h2>

                    {fetchError && (<p className='error'>{fetchError}</p>)}

                    {getraces && (
                        <div className="container-post">
                            {getraces.map(output => (
                                <div key={output.id} className="card-ye">
                                    <NavLink to="/updateevent" className="adto">
                                        <div className='user-name-ye'>
                                            {output.race_title}
                                            <div className='contents-post-ye'>
                                                {output.race_description}
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
    )
}

export default MadeEvents