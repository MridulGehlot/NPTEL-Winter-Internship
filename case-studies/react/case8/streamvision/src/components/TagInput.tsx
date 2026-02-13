import React from 'react'

interface TagInputProps {
  onAddTag: (tag: string) => void
}

export const TagInput = React.memo(({ onAddTag }: TagInputProps) => {
  console.log('Rendering TagInput')

  return (
    <input
      placeholder="Add tag..."
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          onAddTag((e.target as HTMLInputElement).value)
          ;(e.target as HTMLInputElement).value = ''
        }
      }}
    />
  )
})
