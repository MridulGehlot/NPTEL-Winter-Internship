// NotificationList.tsx
import { useNotificationStore } from './store/notificationStore';
import { useEffect } from 'react';

function NotificationList() {
  const notifications = useNotificationStore((state) => state.notifications);
  const markAsRead = useNotificationStore((state) => state.markAsRead);
  const clearNotifications = useNotificationStore((state) => state.clearNotifications);
  
  // Demo: Add a notification on mount
  useEffect(() => {
    useNotificationStore.getState().addNotification('Welcome to TaskFlow!', 'success');
  }, []);

  const unreadNotifications = notifications.filter((n) => !n.read);

  return (
    <div className="notifications">
      <h3>Notifications ({unreadNotifications.length})</h3>
      {unreadNotifications.length === 0 ? (
        <p>No unread notifications</p>
      ) : (
        <ul>
          {unreadNotifications.map((notification) => (
            <li key={notification.id} className={`notification ${notification.type}`}>
              <span>{notification.message}</span>
              <button onClick={() => markAsRead(notification.id)}>
                Mark as Read
              </button>
            </li>
          ))}
        </ul>
      )}
      <button onClick={clearNotifications}>Clear All</button>
    </div>
  );
}

export default NotificationList;
