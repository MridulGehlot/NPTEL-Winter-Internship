import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Suspense, lazy, useState } from 'react'
import { ErrorBoundary } from './components/ErrorBoundary'

// 🔥 Route-based Lazy Loading
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Courses = lazy(() => import('./pages/Courses'))
const Forum = lazy(() => import('./pages/Forum'))
const AdminPanel = lazy(() => import('./pages/AdminPanel'))

// 🔥 Component-based Lazy Loading
const ProfileSettings = lazy(() => import('./components/ProfileSettings'))

function App() {
  const [showSettings, setShowSettings] = useState(false)

  return (
    <Router>
      <div style={{ padding: '2rem' }}>
        <h1>🎓 EduStream Learning Platform</h1>

        {/* Navigation */}
        <nav style={{ marginBottom: '1rem' }}>
          <Link to="/">Dashboard</Link> |{" "}
          <Link to="/courses">Courses</Link> |{" "}
          <Link to="/forum">Forum</Link> |{" "}
          <Link to="/admin">Admin</Link>
        </nav>

        {/* Profile Settings Button */}
        <button onClick={() => setShowSettings(true)}>
          Open Profile Settings
        </button>

        {/* Component-Based Lazy Loading */}
        {showSettings && (
          <ErrorBoundary>
            <Suspense fallback={<div>Loading Settings...</div>}>
              <ProfileSettings />
            </Suspense>
          </ErrorBoundary>
        )}

        <hr />

        {/* Route-Based Lazy Loading */}
        <ErrorBoundary>
          <Suspense fallback={<div>Loading Page...</div>}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/forum" element={<Forum />} />
              <Route path="/admin" element={<AdminPanel />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </div>
    </Router>
  )
}

export default App
