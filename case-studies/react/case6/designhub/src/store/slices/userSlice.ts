import type { StateCreator } from 'zustand'

export interface UserSlice {
  user: { id: string; name: string } | null
  setUser: (user: { id: string; name: string }) => void
  clearUser: () => void
}

export const createUserSlice: StateCreator<UserSlice> = (set,_get,_api) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
})
