import { useDesignHubStore } from './store'

export default function UserProfile() {
  const user = useDesignHubStore((s) => s.user)
  const setUser = useDesignHubStore((s) => s.setUser)
  const clearUser = useDesignHubStore((s) => s.clearUser)

  if (!user) {
    return (
      <div className="mb-6 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">👤 User</h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setUser({ id: 'u1', name: 'Alex Designer' })}
        >
          Login
        </button>
      </div>
    )
  }

  return (
    <div className="mb-6 p-4 bg-green-100 rounded-lg">
      <h2 className="text-xl font-semibold mb-2">👤 User</h2>
      <p>Welcome, <strong>{user.name}</strong></p>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded mt-2"
        onClick={clearUser}
      >
        Logout
      </button>
    </div>
  )
}
