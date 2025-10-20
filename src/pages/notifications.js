import { useEffect, useState, useCallback } from "react";
import { NavLink } from "react-router-dom";

// CSS
import '../styles/header_and_sidebar.css';
import '../styles/errors.css';
import '../styles/notifications.css';

// Config
import supabase from "../config/supabaseclient";

// Components
import NotifCard from "../components/NotifCard";
import Sidebar from "../components/Sidebar";

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [fetchError, setFetchError] = useState(null);
    const [unreadCount, setUnreadCount] = useState(0);
    const [authUser, setAuthuser] = useState(null);
    
    const fetchNotifications = useCallback(async () => {
        try {
            const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

            if (sessionError || !sessionData.session) {
                setFetchError("User is not Logged In")
                return;
            }

            const user = sessionData.session.user;
            setAuthuser(user)

            const {data, error} = await supabase
            .from("notification")
            .select("*")
            .eq("user_id", user.id)
            .order("time_stamp", { ascending: false })

            if (error) throw error

            setNotifications(data)

            const unread = data.filter((n) => !n.read).length
            setUnreadCount(unread)

            setFetchError(null)

        } catch (err) {
            console.error("Error fetching notifications: ", err)
            setFetchError(err.message)
        }
    }, []);

    useEffect(() => {
        fetchNotifications();

        const channel = supabase
        .channel("notification_realtime")
        .on(
            "postgres_changes",
            { event: "*", schema: "public", table: "notification" },
            (payload) => {
                console.log("Realtime Payload: ", payload)

                fetchNotifications();
            }
        )
        .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }

    }, [fetchNotifications]);

    const markAllAsRead = async () => {
        if (!authUser) return;

        const { error } = await supabase
        .from("notification")
        .update({read: true})
        .eq("user_id", authUser.id)

        if (!error) {
            fetchNotifications()
        } else {
            console.error("Error making as read: ", error)
        }
    }

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
                                    <img src="img/noti-icon.png" alt="icon" className="noti-icon" />{" "}Notifications{" "}

                                    {unreadCount > 0 && (
                                        <span className="notif-count">{unreadCount}</span>
                                    )}
                                </button>
                            </NavLink>
                        </div>
                    </div>
            </div>

            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="noti-main-content">
                <div class='noti-main-content-header'>
                    <h2>Your Notifications</h2>
                    
                    {unreadCount > 0 && (
                        <button className="mark-read-btn" onClick={markAllAsRead}>Mark All as Read</button>
                    )}
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
                                onRead={fetchNotifications}
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
