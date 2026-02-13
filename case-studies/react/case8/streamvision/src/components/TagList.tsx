import React,{ useMemo } from 'react'

interface TagListProps {
  tags: string[]
  filter: string
}

export const TagList = React.memo(({ tags, filter }: TagListProps) => {
  console.log('Rendering TagList')

  const filteredTags = useMemo(() => {
    console.log('Filtering tags...')
    return tags.filter((tag) =>
      tag.toLowerCase().includes(filter.toLowerCase())
    )
  }, [tags, filter])

  return (
    <ul>
      {filteredTags.map((tag, index) => (
        <li key={index}>{tag}</li>
      ))}
    </ul>
  )
})
