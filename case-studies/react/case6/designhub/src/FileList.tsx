import { useDesignHubStore } from './store'

export default function FileList() {
  const files = useDesignHubStore((s) => s.files)
  const addFile = useDesignHubStore((s) => s.addFile)

  return (
    <div className="mb-6 p-4 bg-blue-100 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">📁 Files ({files.length})</h2>
      <button
        className="bg-indigo-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => addFile({ id: Date.now().toString(), name: 'Untitled', content: '' })}
      >
        ➕ Add File
      </button>
      <ul className="space-y-2">
        {files.map((file:any) => (
          <li key={file.id} className="p-3 bg-white rounded shadow">
            {file.name}
          </li>
        ))}
      </ul>
    </div>
  )
}
