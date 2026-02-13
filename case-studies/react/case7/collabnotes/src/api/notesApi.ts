import type { Note } from '../store/noteStore'

export const fetchNotes = async (): Promise<Note[]> => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts')
  const data = await res.json()

  return data.slice(0, 10).map((item: any) => ({
    id: String(item.id),
    text: item.title,
  }))
}
