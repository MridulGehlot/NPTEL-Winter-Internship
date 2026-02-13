import { NotesList } from './components/NotesList'
import { usePreferencesStore } from './store/preferenceStore'
import { useSessionStore } from './store/sessionStore'

function App() {
  const { theme, setTheme } = usePreferencesStore()
  const { userId, role } = useSessionStore()


  return (
    <div
      style={{
        padding: '2rem',
        fontFamily: 'Arial',
        backgroundColor: theme === 'dark' ? '#1e1e1e' : '#ffffff',
        color: theme === 'dark' ? '#ffffff' : '#000000',
        minHeight: '100vh',
      }}
    >
      <h1>📝 CollabNotes</h1>

      {/* Session Info */}
      <div style={{ marginBottom: '1rem' }}>
        <strong>User:</strong> {userId ?? 'Guest'} | <strong>Role:</strong>{' '}
        {role}
      </div>

      {/* Theme Toggle */}
      <button
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        style={{ marginBottom: '1rem' }}
      >
        Toggle Theme
      </button>

      {/* Notes List */}
      <NotesList />
    </div>
  )
}

export default App
