import { useDesignHubStore } from './store'
import { useMemo } from 'react'

interface Props {
  fileId: string
}

export default function CommentsPanel({ fileId }: Props) {
  const comments = useDesignHubStore((s) => s.comments)
  const addComment = useDesignHubStore((s) => s.addComment)
  
  const fileComments = useMemo(() => 
    comments.filter(c => c.fileId === fileId), 
    [comments, fileId]
  )

  return (
    <div className="mb-6 p-4 bg-yellow-100 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">
        💬 Comments ({fileComments.length})
      </h2>
      <ul className="space-y-2 mb-4">
        {fileComments.map((comment:any) => (
          <li key={comment.id} className="p-3 bg-white rounded shadow">
            <strong>{comment.author}:</strong> {comment.text}
          </li>
        ))}
      </ul>
      <button
        className="bg-orange-500 text-white px-4 py-2 rounded"
        onClick={() =>
          addComment({
            id: Date.now().toString(),
            fileId,
            author: 'Alex',
            text: 'Great design!',
          })
        }
      >
        ➕ Add Comment
      </button>
    </div>
  )
}
