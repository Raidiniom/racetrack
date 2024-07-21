// components/NotifCard.js
import React from 'react';
import supabase from '../config/supabaseclient';

const NotifCard = ({ notification, onRead }) => {
    const handleReadNotification = async () => {
        // Update the notification as read in the database
        const { error } = await supabase
            .from('notification')
            .update({ read: true })
            .eq('notification_id', notification.notification_id);

        if (error) {
            console.error('Error updating notification status:', error);
        } else {
            // Notify the parent component to refresh notifications
            onRead();
        }
    };

    return (
        <div 
            className={`notif-card ${notification.read ? 'read' : ''}`}
            onClick={handleReadNotification}
        >
            <div className="notif-card-message">
                {notification.message}
            </div>
            <div className="notif-card-timestamp">
                {new Date(notification.time_stamp).toLocaleString()}
            </div>
        </div>
    );
};

export default NotifCard;