import { useDesignHubStore } from './store'
import { useMemo } from 'react'

export default function NotificationsPanel() {
  const notifications = useDesignHubStore((s) => s.notifications)
  const unreadNotifications = useMemo(
    () => notifications.filter((n:any) => !n.read),
    [notifications]
  )
  const addNotification = useDesignHubStore((s) => s.addNotification)
  const markAsRead = useDesignHubStore((s) => s.markAsRead)
  const clearNotifications = useDesignHubStore((s) => s.clearNotifications)

  return (
    <div className="p-4 bg-purple-100 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">
        🔔 Notifications ({unreadNotifications.length})
      </h2>
      
      {unreadNotifications.length === 0 ? (
        <p className="text-gray-500 italic">No new notifications</p>
      ) : (
        <div className="space-y-2 mb-4">
          {unreadNotifications.map((notification:any) => (
            <div key={notification.id} className="p-3 bg-white rounded shadow flex justify-between items-center">
              <span>{notification.message}</span>
              <button
                className="bg-green-500 text-white px-3 py-1 rounded text-sm"
                onClick={() => markAsRead(notification.id)}
              >
                Mark Read
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-2">
        <button
          className="bg-indigo-500 text-white px-4 py-2 rounded text-sm"
          onClick={() => addNotification('New collaboration invite!')}
        >
          Test Notification
        </button>
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded text-sm"
          onClick={clearNotifications}
          disabled={unreadNotifications.length === 0}
        >
          Clear All
        </button>
      </div>
    </div>
  )
}
