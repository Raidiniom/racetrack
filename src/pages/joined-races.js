import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';

// CSS
import '../styles/joined-races.css';
import '../styles/header_and_sidebar.css';

// Config
import supabase from '../config/supabaseclient';

// Component
import JoinCard from '../components/JoinCard';

const JoinedEvent = () => {
    const [fetchError, setFetchError] = useState(null);
    const [joinedRaces, setJoinedRaces] = useState(null);
    const [refresh, setRefresh] = useState(false); // State to trigger re-fetch

    useEffect(() => {
        const fetchJoinedRaces = async () => {
            try {
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
                const u_id = parseInt(userData.user_id, 10);
                if (isNaN(u_id)) {
                    setFetchError('Invalid user ID.');
                    return;
                }
        
                console.log('Fetching races for user ID:', u_id);

                // Fetch races that the user has joined
                const { data: participantData, error: participantError } = await supabase
                    .from('participant_list')
                    .select('from_race')
                    .eq('user_participant', u_id);

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
    }, [refresh]);

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