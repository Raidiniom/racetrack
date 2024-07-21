import { useEffect, useState } from "react";
import supabase from "../config/supabaseclient";
import { useHistory } from "react-router-dom";

const NotifCard = () => {
    const [notifications, setNotifications] = useState([]);
    const userId = localStorage.getItem('user_id'); // Assuming user ID is stored in local storage
    const history = useHistory();

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

    const handleViewNotifications = () => {
        history.push('/notifications');
    };

    return (
        <div>
            <button onClick={handleViewNotifications}>
                View Notifications
            </button>
            {/* Optionally, you can display a summary or count of notifications here */}
            {notifications.length > 0 && (
                <div className="notification-summary">
                    You have {notifications.length} new notifications
                </div>
            )}
        </div>
    );
};

export default NotifCard;