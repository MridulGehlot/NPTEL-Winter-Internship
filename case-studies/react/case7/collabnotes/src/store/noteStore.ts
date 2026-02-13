import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import type { Draft } from 'immer'

/* ---------------- TYPES ---------------- */

export interface Note {
  id: string
  text: string
}

export interface NoteState {
  notes: Note[]
  setNotes: (notes: Note[]) => void
  addNote: (note: Note) => void
  updateNote: (id: string, text: string) => void
  deleteNote: (id: string) => void
}

/* ---------------- STORE ---------------- */

export const useNoteStore = create<NoteState>()(
  devtools(
    immer((set) => ({
      notes: [],

      setNotes: (notes: Note[]) =>
        set((state: Draft<NoteState>) => {
          state.notes = notes
        }),

      addNote: (note: Note) =>
        set((state: Draft<NoteState>) => {
          state.notes.push(note)
        }),

      updateNote: (id: string, text: string) =>
        set((state: Draft<NoteState>) => {
          const note = state.notes.find((n) => n.id === id)
          if (note) note.text = text
        }),

      deleteNote: (id: string) =>
        set((state: Draft<NoteState>) => {
          state.notes = state.notes.filter((n) => n.id !== id)
        }),
    })),
    { name: 'NoteStore' }
  )
)
