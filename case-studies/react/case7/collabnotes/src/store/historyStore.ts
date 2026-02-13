import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

interface HistoryEntry {
  noteId: string
  action: string
  timestamp: number
}

interface HistoryState {
  history: HistoryEntry[]
  addHistoryEntry: (entry: HistoryEntry) => void
  clearHistory: () => void
}

export const useHistoryStore = create<HistoryState>()(
  devtools(
    immer((set) => ({
      history: [],

      addHistoryEntry: (entry) =>
        set((state: HistoryState) => {
          state.history.push(entry)
        }),

      clearHistory: () =>
        set((state: HistoryState) => {
          state.history = []
        }),
    }))
  )
)
