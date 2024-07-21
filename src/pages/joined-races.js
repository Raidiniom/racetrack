import { NavLink } from 'react-router-dom';
import '../styles/joined-races.css';
import '../styles/header_and_sidebar.css';
import { useEffect, useState } from 'react';
import supabase from '../config/supabaseclient';
import JoinCard from '../components/JoinCard';

const JoinedEvent = () => {
    const [fetchError, setFetchError] = useState(null);
    const [joinedRaces, setJoinedRaces] = useState(null);
    const [refresh, setRefresh] = useState(false); // State to trigger re-fetch

    const username = localStorage.getItem('lsusername');

    useEffect(() => {
        const fetchJoinedRaces = async () => {
            try {
                if (!username) {
                    throw new Error('User not logged in');
                }

                // Fetch user ID based on username
                const { data: userData, error: userError } = await supabase
                    .from('app_users')
                    .select('user_id')
                    .eq('username', username)
                    .single();

                if (userError) {
                    throw userError;
                }

                const userId = userData.user_id;

                // Fetch races that the user has joined
                const { data: participantData, error: participantError } = await supabase
                    .from('participant_list')
                    .select('from_race')
                    .eq('user_participant', userId);

                if (participantError) {
                    throw participantError;
                }

                const raceIds = participantData.map(item => item.from_race);

                if (raceIds.length === 0) {
                    throw new Error('No joined races');
                }

                // Fetch race details
                const { data: raceData, error: raceError } = await supabase
                    .from('user_created_race')
                    .select('*')
                    .in('race_id', raceIds);

                if (raceError) {
                    throw raceError;
                }

                setJoinedRaces(raceData);
                setFetchError(null);
            } catch (error) {
                setFetchError(error.message || 'Failed to fetch joined events');
                setJoinedRaces(null);
            }
        };

        fetchJoinedRaces();
    }, [username, refresh]);

    const handleLogout = () => {
        localStorage.removeItem('lsusername');
    };

    const handleCancel = () => {
        // Trigger re-fetch by updating `refresh` state
        console.log('Cancelling participation...');
        setRefresh(prev => !prev);
    };

    return (
            <div className="joinedraces-body">
                {/* Headerbar */}
                <div class="gen-headerbar">
                    <div className="gen-headerbar-logo">
                        <NavLink to='/dashboard'><img src="/img/RaceTrack Logos/RT-logo.png" alt="logo" className="RaceTrack-logo" /></NavLink>
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
                <div class="joinedraces-main-content">
                    <div class='dashb-main-content-header'>
                        <h2>Available Races</h2>
                    </div> 
                    {/* Joined Races Display */}
                    <div className="joinedraces-main-container">
                        {fetchError && (<p className='error'>{fetchError}</p>)}
                        {joinedRaces && (
                            <div>
                                {joinedRaces.map(race => (
                                    <JoinCard key={race.race_id} output={race} onLeave={handleCancel} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
    );
};

export default JoinedEvent;
