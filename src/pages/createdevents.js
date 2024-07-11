import { NavLink } from 'react-router-dom'
import '../styles/yourevents.css'
import { useEffect, useState } from 'react'
import supabase from '../config/supabaseclient'
//import raceCard from '../components/raceCard'

const MadeEvents = () => {
    const [fetchError, setFetchError] = useState(null)
    const [getraces, setGetraces] = useState(null)

    const raceCreator = localStorage.getItem('race_creator')

    useEffect(() => {
        const fetchRaces = async () => {
            const { data, error} = await supabase
            .from('user_created_race')
            .select('*')
            .eq('race_creator', raceCreator)


            if (error) {
                setFetchError('Could not fetch races')
                setGetraces(null)
            }

            if (data) {
                setGetraces(data)
                setFetchError(null)
            }
        }

        fetchRaces()
    }, [raceCreator])


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
                        <li><NavLink to="/madeevents">Your Events</NavLink></li>
                        <li><NavLink to="/create">Create Race</NavLink></li>
                        <li>Joined Events</li>
                        <li><NavLink to="/login">Logout</NavLink></li>
                    </ul>
                </div>

                {/* Main Content */}
                <div class="yourEvents-main-content">
                    <h2 className="ye">Your Created Events</h2>

                    {fetchError && (<p className='error'>{fetchError}</p>)}

                    {getraces &&(
                        <div>
                            {getraces.map(output => (
                                <div className="container-post">
                                    <div class="card-ye">
                                        <div className='user-name-ye'>
                                            {output.race_title}
                                                <div className='contents-post-ye'>
                                                    {output.race_description}
                                                </div>
                                        </div>
                                    </div>
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