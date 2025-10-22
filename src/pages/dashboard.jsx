import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'

// CSS
import '../styles/dashboard-page.css'
import '../styles/header_and_sidebar.css'
import '../styles/errors.css'
import '../styles/searchbar.css'

// Config
import supabase from '../config/supabaseclient'

//Components
import DashCard from '../components/DashCard'
import Sidebar from '../components/Sidebar'
import { SearchR } from '../components/Searching'
import Header from '../components/Header'


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

    return (
            <div class="dashb-body">
                {/* Headerbar */}
                <Header />
                
                {/* Sidebar */}
                <Sidebar />

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