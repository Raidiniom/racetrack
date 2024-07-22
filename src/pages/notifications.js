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

    const userId = localStorage.getItem('lsuserid'); // Retrieve user ID from local storage

    // Define the fetchNotifications function with useCallback to ensure it doesn't change on every render
    const fetchNotifications = useCallback(async () => {
        if (!userId) {
            setFetchError('User ID is missing');
            return;
        }

        const { data, error } = await supabase
            .from('notification')
            .select('*')
            .eq('user_id', parseInt(userId, 10)) // Ensure userId is an integer
            .order('time_stamp', { ascending: false });

        if (error) {
            console.error('Error fetching notifications:', error);
            setFetchError(error.message);
            return;
        }

        setNotifications(data);
    }, [userId]);

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
            </div>
            {/* Sidebar */}
            <div className="gen-sidebar">
                <ul>
                    <li><NavLink to="/profile">Your Profile</NavLink></li>
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
