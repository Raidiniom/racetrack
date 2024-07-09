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
                        <li>Joined Events</li>
                        <li><NavLink to="/login">Logout</NavLink></li>
                    </ul>
                </div>

                {/* Main Content */}
                <div class="dashboard-main-content">
                    <h2>Events</h2>

                    {/* mga events diri display */}

                    {fetchError && (<p className='error'>{fetchError}</p>)}

                    {getraces && (
                        // @CallenCaracy @MarQtie
                        /* Diri lang mo edit sa CSS sa katung content sa dashboard */
                        <div>
                            {getraces.map(output => (
                                <div className='card'>
                                    <NavLink to="/viewevent" className="view-e">
                                        <div className='user-name'>
                                            {output.racetitle}
                                        </div>

                                        <div className='contents-post'>
                                            {output.description}
                                        </div>

                                        <div className='race-details'>
                                            <p>Start Date: {output.startdate} Registration Date: {output.regdate}</p>
                                            <p>Race Capacity: {output.capacity} Race Distance: {output.trackkm} KM</p>
                                            <p>Age Requirement: {output.maxage} - {output.minage}</p>
                                        </div>

                                        <div className=''>
                                            {/*  */}
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

export default Dashboard