import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchNotes } from '../api/notesApi'
import { useNoteStore } from '../store/noteStore'
import type { Note } from '../store/noteStore'

export function NotesList() {
  const setNotes = useNoteStore((s) => s.setNotes)
  const notes = useNoteStore((s) => s.notes)

  const { data, isLoading } = useQuery<Note[]>({
    queryKey: ['notes'],
    queryFn: fetchNotes,
  })

  // Sync React Query -> Zustand
  useEffect(() => {
    if (data) {
      setNotes(data)
    }
  }, [data, setNotes])

  if (isLoading) return <div>Loading...</div>

  return (
    <ul>
      {notes.map((n) => (
        <li key={n.id}>{n.text}</li>
      ))}
    </ul>
  )
}
