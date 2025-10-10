import { useEffect, useState, useCallback } from "react";
import { NavLink } from "react-router-dom";
import supabase from "../config/supabaseclient";
import '../styles/header_and_sidebar.css'; // Import the same styles to match the design
import '../styles/errors.css'; // Import the same styles to match the design
import '../styles/notifications.css';

import NotifCard from "../components/NotifCard";

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [fetchError, setFetchError] = useState(null);
    const [unreadCount, setUnreadCount] = useState(0);

    const [authuser, setAuthuser] = useState({ user: null });
    
    // Define the fetchNotifications function with useCallback to ensure it doesn't change on every render
    const fetchNotifications = useCallback(async () => {
        const { data: sess, error: nosess } = await supabase.auth.getSession();
                
        // Check for errors and log them
        if (nosess) {
            console.error('Session Error:', nosess.message);
            return;
        }
        
        console.log('This is Sess: ', sess)
        const theU = sess?.session.user;
        setAuthuser({ theU });

        const { data: user, error: userError } = await supabase
                .from('app_users')
                .select('user_id, birth_day')
                .eq('email', theU.email)
                .single();

            if (userError) {
                console.error('Error fetching user:', userError);
                setFetchError('User not found!');
                return;
            }

            const u_id = parseInt(user.user_id, 10);
            if (isNaN(u_id)) {
                setFetchError('Invalid user ID.');
                return;
            }

        if (!u_id) {
            setFetchError('User ID is missing');
            return;
        }
        

        // Will receive user ID
        const { data, error } = await supabase
            .from('notification')
            .select('*')
            .eq('user_id', parseInt(u_id, 10)) // Ensure userId is an integer
            .order('time_stamp', { ascending: false });

        if (error) {
            console.error('Error fetching notifications:', error);
            setFetchError(error.message);
            return;
        }

        setNotifications(data);
        const unread = data.filter(notification => !notification.read).length;
        setUnreadCount(unread);
    }, []);

    useEffect(() => {
        fetchNotifications();
    }, [fetchNotifications]);

    return (
        <div className="noti-body">
            {/* Headerbar */}
            <div className="gen-headerbar">
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
                    
                    <li><NavLink to="/created-races">Your Races</NavLink></li>
                    <li><NavLink to="/joined-races">Joined Races</NavLink></li>
                    <li><NavLink to="/dashboard">Join a Race</NavLink></li>
                    <li><NavLink to="/create-race">Create a Race</NavLink></li>
                    <li><NavLink to="/landing" onClick={() => localStorage.removeItem('lsusername')}>Log Out</NavLink></li>
                </ul>
            </div>
            {/* Main Content */}
            <div className="noti-main-content">
                    <div class='noti-main-content-header'>
                        <h2>Your Notifications</h2>
                    </div>
                        <div className="notifications-page">
                                {fetchError && <p className="error">{fetchError}</p>}
                                {notifications.length === 0 && !fetchError ? (
                                <p>No Notifications</p>
                                ) : (
                                <div className="notifications-container">
                                {notifications.map(notification => (
                                    <NotifCard 
                                        key={notification.notification_id} 
                                        notification={notification} 
                                        onRead={fetchNotifications} // Pass refresh function
                                    />
                                    ))}
                                </div>
                            )}
                        </div>
            </div>
        </div>
    );
};

export default Notifications;
