import UserProfile from './UserProfile'
import FileList from './FileList'
import CommentsPanel from './CommentsPanel'
import NotificationsPanel from './NotificationsPanel'

function App() {

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">🎨 DesignHub</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <UserProfile />
          <FileList />
        </div>
        
        <div>
          <CommentsPanel fileId="1" />
          <NotificationsPanel /> {/* ✅ CHALLENGE */}
        </div>
      </div>

    </div>
  )
}

export default App
