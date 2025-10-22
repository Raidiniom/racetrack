import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';

// CSS
import '../styles/created-races.css';
import '../styles/header_and_sidebar.css';

// Config
import supabase from '../config/supabaseclient';

// Components
import RaceCard from '../components/RaceCard';
import Sidebar from '../components/Sidebar'
import Header from '../components/Header';

const MadeEvents = () => {
    const [fetchError, setFetchError] = useState(null);
    const [getraces, setGetraces] = useState(null);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const fetchRaces = async () => {
            try {
                // Fetch session
                const { data: sess, error: nosess } = await supabase.auth.getSession();
                
                if (nosess) {
                    console.error('Session Error:', nosess.message);
                    setFetchError('Failed to fetch session. Please try again.');
                    return;
                }
        
                if (!sess || !sess.session) {
                    setFetchError('No session found. Please log in.');
                    return;
                }
        
                // Extract user from session
                const user = sess.session.user;
        
                if (!user || !user.email) {
                    setFetchError('No user found in session. Please log in.');
                    return;
                }
        
                // Fetch user_id based on email
                const { data: userData, error: userError } = await supabase
                    .from('app_users')
                    .select('user_id')
                    .eq('email', user.email)
                    .single(); // Use .single() to fetch a single row
        
                if (userError) {
                    console.error('User ID Fetch Error:', userError.message);
                    setFetchError('Failed to retrieve user ID.');
                    return;
                }
        
                if (!userData || !userData.user_id) {
                    setFetchError('User ID not found.');
                    return;
                }
        
                // Ensure user_id is a number
                const u_id = userData.user_id
            
                console.log('Fetching races for user ID:', u_id);
        
                // Fetch races created by the user
                const { data: races, error: racesError } = await supabase
                    .from('user_created_race')
                    .select('*')
                    .eq('race_creator', u_id);
        
                if (racesError) {
                    console.error('Races Fetch Error:', racesError.message);
                    setFetchError('Failed to fetch races.');
                    return;
                }
        
                if (!races || races.length === 0) {
                    setFetchError('No created races yet.');
                    return;
                }
        
                // Update state with fetched races
                setGetraces(races);
                setFetchError(null);
            } catch (error) {
                console.error('Unexpected Error:', error.message);
                setFetchError('An unexpected error occurred. Please try again.');
                setGetraces(null);
            }
        };        

        fetchRaces();
    }, [refresh]);

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error('Logout Error:', error.message);
        } else {
            window.location.href = '/login';
        }
    };

    const handleDelete = () => {
        setRefresh(prev => !prev);
    };

    return (
        <div className="createdr-body">
            {/* Headerbar */}
            <Header />
            
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="createdr-main-content">
                <div className='createdr-main-content-header'>
                    <h2>Your Races</h2>
                </div> 
                {/* Created Races Display */}
                <div className="createdr-main-container">
                    {fetchError && <p className='error'>{fetchError}</p>}
                    {getraces ? (
                        <div>
                            {getraces.map(output => (
                                <RaceCard key={output.race_id} output={output} onDelete={handleDelete} />
                            ))}
                        </div>
                    ) : (
                        <p>No races found or loading...</p>
                    )}
                </div>
            </div>  
        </div>
    );
};

export default MadeEvents;
