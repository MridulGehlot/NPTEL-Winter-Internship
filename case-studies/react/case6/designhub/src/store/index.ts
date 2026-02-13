import { create } from 'zustand'
import type { StateCreator } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { createUserSlice, type UserSlice } from './slices/userSlice'
import { createFileSlice, type FileSlice } from './slices/fileSlice'
import { createCommentSlice, type CommentSlice } from './slices/commentSlice'
import { createNotificationSlice, type NotificationSlice } from './slices/notificationSlice'

type DesignHubStore = UserSlice & FileSlice & CommentSlice & NotificationSlice

export const useDesignHubStore = create<DesignHubStore>()(
  devtools(
    persist(
      (set, get, api) => ({
        ...(createUserSlice as unknown as StateCreator<DesignHubStore>)(set, get, api),
        ...(createFileSlice as unknown as StateCreator<DesignHubStore>)(set, get, api),
        ...(createCommentSlice as unknown as StateCreator<DesignHubStore>)(set, get, api),
        ...(createNotificationSlice as unknown as StateCreator<DesignHubStore>)(set, get, api), 
      }),
      { name: 'designhub-storage' }
    )
  )
)
