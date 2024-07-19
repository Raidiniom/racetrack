import { NavLink } from 'react-router-dom'
import '../styles/dashboardpage.css'
import '../styles/header_and_sidebar.css'
import '../styles/searchbar.css'
import { useEffect, useState } from 'react'
import supabase from '../config/supabaseclient'

//components
import DashCard from '../components/DashCard'
import { SearchR } from '../components/Searching'

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
                setGetraces()
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
                        <li><NavLink to="/login" onClick={handleLogout}>Log Out</NavLink></li>
                    </ul>
                </div>

                {/* Main Content */}
                <div class="dashboard-main-content">
                    <h2>Events</h2>   
                     {/* Search Bar */}
                    <SearchR setGetraces={setGetraces} setFetchError={setFetchError}/>

                    <div className="main-container-dashboard">
                    {/* Events Display   */}
                    {fetchError && (<p className='error'>{fetchError}</p>)}
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
        </div>
    )
}

export default Dashboard