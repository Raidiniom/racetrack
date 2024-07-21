import { NavLink } from 'react-router-dom'
import '../styles/dashboard-page.css'
import '../styles/header_and_sidebar.css'
import '../styles/searchbar.css'
import { useEffect, useState } from 'react'
import supabase from '../config/supabaseclient'
//Components
import DashCard from '../components/DashCard'
import { SearchR } from '../components/Searching'

const Dashboard = ({token}) => {
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

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut()
        sessionStorage.removeItem('token')

        if (error) {
            console.error(error)
        } else {
            window.location.href='/'
        }
    }

    return (
            <div className="dashb-body">
                {/* Headerbar */}
                <div className="dashb-headerbar">
                    <div className="dashb-logo">
                        <NavLink to='/dashboard'><img src="/img/RaceTrack Logos/RT-logo.png" alt="logo" className="RaceTrack-logo" /></NavLink>
                    </div>
                    </div>
                {/* Sidebar */}
                <div className="dashb-sidebar">
                    <ul>
                        <li><NavLink to="/profile">Your Profile</NavLink></li>
                        <li><NavLink to="/created-races">Your Races</NavLink></li>
                        <li><NavLink to="/create-race">Create a Race</NavLink></li>
                        <li><NavLink to="/joined-races">Joined Races</NavLink></li>
                        <li><NavLink to="/" onClick={handleLogout}>Log Out</NavLink></li>
                    </ul>
                </div>
                {/* Main Content */}
                <div className="dashb-main-content">
                    <div className='dashb-main-content-header'>
                        <h2>Available Races</h2>
                        {/* Search Bar */}
                        <div>
                            <SearchR setGetraces={setGetraces} setFetchError={setFetchError}/>
                        </div> 
                    </div>  
                    {/* Events Display */}
                    <div className="dashb-main-container">
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
    )
}

export default Dashboard