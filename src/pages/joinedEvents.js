import { NavLink } from 'react-router-dom';
import '../styles/joinedevents.css';
import '../styles/header_and_sidebar.css';
import '../styles/dashboardpage.css';
import { useEffect, useState } from 'react';
import supabase from '../config/supabaseclient';
import JoinCard from '../components/JoinCard';

const JoinedEvent = () => {
    const [fetchError, setFetchError] = useState(null);
    const [joinedRaces, setJoinedRaces] = useState(null);

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
    }, [username]);

    const handleLogout = () => {
        localStorage.removeItem('lsusername');
    };

    return (
        <div className="wholesite">
            <div className="joinEvents">
                <div className="dashboard-header">
                    <div className="dash-logo">
                        <img src="\img\RaceTrack Logos\RT-logo.png" alt="logo" className="RaceTrack-logo" />
                    </div>
                </div>

                {/* Sidebar */}
                <div className="dashboard-sidebar">
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
                    <h2 className="join-ve">Joined Events</h2>
                    {fetchError && (<p className='error'>{fetchError}</p>)}
                    {joinedRaces && (
                        <div className="container-post">
                            {joinedRaces.map(race => (
                                <JoinCard key={race.race_id} output={race} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default JoinedEvent;
