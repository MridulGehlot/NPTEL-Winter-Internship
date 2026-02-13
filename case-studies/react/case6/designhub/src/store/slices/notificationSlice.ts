import type { StateCreator } from 'zustand'

export interface Notification {
  id: string
  message: string
  read: boolean
}

export interface NotificationSlice {
  notifications: Notification[]
  addNotification: (message: string) => void
  markAsRead: (id: string) => void
  clearNotifications: () => void
}

export const createNotificationSlice: StateCreator<NotificationSlice> = (set, _get,_api) => ({
  notifications: [],
  addNotification: (message) => {
    const id = Date.now().toString()
    set((state) => ({
      notifications: [...state.notifications, { id, message, read: false }],
    }))
  },
  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
    })),
  clearNotifications: () => set({ notifications: [] }),
})
