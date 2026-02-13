import { useState, useCallback } from 'react'
import { AnalyticsChart } from './components/AnalyticsChart'
import { CommentsPanel } from './components/CommentsPanel'
import { TagList } from './components/TagList'
import { TagInput } from './components/TagInput'

function App() {
  const [counter, setCounter] = useState(0)
  const [tags, setTags] = useState(['React', 'Analytics', 'Dashboard'])
  const [tagFilter, setTagFilter] = useState('')

  const data = [
    { id: 1, value: 10 },
    { id: 2, value: 20 },
    { id: 3, value: 30 },
  ]

  const comments = [
    { id: 1, text: 'Great stream!' },
    { id: 2, text: 'Amazing quality!' },
    { id: 3, text: 'Very informative.' },
  ]

  const handleAddTag = useCallback((tag: string) => {
    setTags((prev) => [...prev, tag])
  }, [])

  console.log('Rendering App')

  return (
    <div style={{ padding: '2rem' }}>
      <h1>🎥 StreamVision Dashboard</h1>

      {/* Unrelated State */}
      <button onClick={() => setCounter((c) => c + 1)}>
        Counter: {counter}
      </button>

      <hr />

      <AnalyticsChart data={data} />

      <hr />

      <CommentsPanel comments={comments} />

      <hr />

      <h2>🏷 Tags</h2>

      <input
        placeholder="Filter tags..."
        onChange={(e) => setTagFilter(e.target.value)}
      />

      <TagInput onAddTag={handleAddTag} />

      <TagList tags={tags} filter={tagFilter} />
    </div>
  )
}

export default App
