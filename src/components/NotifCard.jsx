import React, { useState } from 'react';
import supabase from '../config/supabaseclient';

const NotifCard = ({ notification, onRead }) => {
    const [isUpdating, setIsUpdating] = useState(false)

    const handleReadNotification = async () => {
        if (isUpdating || notification.read) {
            return
        }

        setIsUpdating(true)

        const { error } = await supabase
            .from('notification')
            .update({ read: true })
            .eq('notification_id', notification.notification_id);

        if (error) {
            console.error('Error updating notification status:', error);
        } else {
            onRead();
        }
    };

    const formattedTime = new Date(notification.time_stamp).toLocaleString([], {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })

    return (
        <div 
            className={`notif-card ${notification.read ? 'read' : 'unread'}`}
            onClick={handleReadNotification}
            title={notification.read ? 'click for details' : 'Mark as read'}
        >
            <div className="notif-card-message">
                {notification.message}
            </div>

            <div className="notif-card-timestamp">
                {formattedTime}
            </div>
        </div>
    );
};

export default NotifCard;