import { useEffect, useState } from "react";
import supabase from "../config/supabaseclient";

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);

    const userId = localStorage.getItem('user_id'); // Assuming user ID is stored in local storage

    useEffect(() => {
        const fetchNotifications = async () => {
            const { data, error } = await supabase
                .from('notifications')
                .select('*')
                .eq('user_id', userId)
                .order('timestamp', { ascending: false });

            if (error) {
                console.error('Error fetching notifications:', error);
                return;
            }

            setNotifications(data);
        };

        fetchNotifications();
    }, [userId]);

    return (
        <div className="notifications">
            <h2>Notifications</h2>
            {notifications.map((notification) => (
                <div key={notification.notification_id} className="notification">
                    <p>{notification.message}</p>
                    <span>{new Date(notification.timestamp).toLocaleString()}</span>
                </div>
            ))}
        </div>
    );
};

export default Notifications;