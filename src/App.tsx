import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { ProgressProvider } from './contexts/ProgressContext'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import TrackerPage from './pages/TrackerPage'
import AnalyticsPage from './pages/AnalyticsPage'
import LoadingSpinner from './components/LoadingSpinner'

function AppContent() {
  const { user, loading } = useAuth()

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={user ? <DashboardPage /> : <Navigate to="/login" />}
      />
      <Route
        path="/tracker"
        element={user ? <TrackerPage /> : <Navigate to="/login" />}
      />
      <Route
        path="/analytics"
        element={user ? <AnalyticsPage /> : <Navigate to="/login" />}
      />
    </Routes>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProgressProvider>
          <AppContent />
        </ProgressProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
