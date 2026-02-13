import React,{ useState, useMemo, useCallback } from 'react'

interface Comment {
  id: number
  text: string
}

const FilterInput = React.memo(
  ({ onFilter }: { onFilter: (value: string) => void }) => {
    console.log('Rendering FilterInput')
    return (
      <input
        placeholder="Filter comments..."
        onChange={(e) => onFilter(e.target.value)}
      />
    )
  }
)

export function CommentsPanel({ comments }: { comments: Comment[] }) {
  const [filter, setFilter] = useState('')

  const filtered = useMemo(() => {
    console.log('Filtering comments...')
    return comments.filter((c) =>
      c.text.toLowerCase().includes(filter.toLowerCase())
    )
  }, [comments, filter])

  const handleFilter = useCallback((value: string) => {
    setFilter(value)
  }, [])

  console.log('Rendering CommentsPanel')

  return (
    <div>
      <FilterInput onFilter={handleFilter} />
      <ul>
        {filtered.map((c) => (
          <li key={c.id}>{c.text}</li>
        ))}
      </ul>
    </div>
  )
}
