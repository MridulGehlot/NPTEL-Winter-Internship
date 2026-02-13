import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface SessionState {
  userId: string | null
  token: string | null
  expiresAt: number | null
  role: 'admin' | 'user'
  setSession: (data: Partial<SessionState>) => void
  logout: () => void
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      userId: null,
      token: null,
      expiresAt: null,
      role: 'user',

      setSession: (data) =>
        set((state) => ({
          ...state,
          ...data,
        })),

      logout: () =>
        set({
          userId: null,
          token: null,
          expiresAt: null,
          role: 'user',
        }),
    }),
    {
      name: 'collabnotes-session',
      storage: createJSONStorage(() => localStorage),

      // Persist only userId and token
      partialize: (state) => ({
        userId: state.userId,
        token: state.token,
      }),

      version: 2,

      migrate: (persisted: any, version) => {
        if (version < 2) {
          return {
            ...persisted,
            role: 'user',
          }
        }
        return persisted
      },
    }
  )
)
