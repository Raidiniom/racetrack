import { NavLink } from 'react-router-dom';
import '../styles/created-races.css';
import '../styles/header_and_sidebar.css';
import { useEffect, useState } from 'react';
import supabase from '../config/supabaseclient';

// Components
import RaceCard from '../components/RaceCard';

const MadeEvents = () => {
    const [fetchError, setFetchError] = useState(null);
    const [getraces, setGetraces] = useState(null);
    const [refresh, setRefresh] = useState(false);

    const raceCreator = localStorage.getItem('lsusername');

    useEffect(() => {
        const fetchRaces = async () => {
            try {
                const { data: userData, error: userError } = await supabase
                    .from('app_users')
                    .select('user_id')
                    .eq('username', raceCreator);

                if (userError) {
                    throw userError;
                }

                if (!userData || userData.length === 0) {
                    throw new Error('User not found!');
                }

                const u_id = userData[0].user_id;

                const { data: races, error: racesError } = await supabase
                    .from('user_created_race')
                    .select('*')
                    .eq('race_creator', u_id);

                if (racesError) {
                    throw racesError;
                }

                if (!races || races.length === 0) {
                    throw new Error('No created races yet.');
                }

                setGetraces(races);
                setFetchError(null);
            } catch (error) {
                setFetchError(error.message || JSON.stringify(error));
                setGetraces(null);
            }
        };

        fetchRaces();
    }, [raceCreator, refresh]);

    const handleLogout = () => {
        localStorage.removeItem('lsusername');
    };

    const handleDelete = () => {
        // Trigger re-fetch by updating `refresh` state
        setRefresh(prev => !prev);
    };

    return (
        <div className="wholesite">
            <div className="yourEvents">
                <div className="dashboard-header">
                    <div className="dash-logo">
                        <img src="/img/RaceTrack Logos/RT-logo.png" alt="logo" className="RaceTrack-logo" />
                    </div>
                </div>
                {/* Sidebar */}
                <div className="dashboard-sidebar">
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
                    <div className="createdr-main-content-header">
                        <h2>Your Races</h2>
                    </div>
                    {/* Created Races Display */}
                    <div className="createdr-main-container">
                        {fetchError && (<p className='error'>{fetchError}</p>)}
                        {getraces && (
                            <div>
                                {getraces.map(output => (
                                    <RaceCard key={output.race_id} output={output} onDelete={handleDelete} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MadeEvents;
