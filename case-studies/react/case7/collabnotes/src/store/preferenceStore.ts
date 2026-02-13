import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface PreferencesState {
  theme: 'light' | 'dark'
  fontSize: number
  setTheme: (theme: 'light' | 'dark') => void
  setFontSize: (size: number) => void
}

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      theme: 'light',
      fontSize: 14,
      setTheme: (theme) => set({ theme }),
      setFontSize: (fontSize) => set({ fontSize }),
    }),
    {
      name: 'collabnotes-preferences',
      storage: createJSONStorage(() => localStorage),

      // persist only selected fields
      partialize: (state) => ({
        theme: state.theme,
        fontSize: state.fontSize,
      }),

      version: 2,

      migrate: (persistedState: any, version) => {
        if (version < 2) {
          return { ...persistedState, fontSize: 14 }
        }
        return persistedState
      },
    }
  )
)
