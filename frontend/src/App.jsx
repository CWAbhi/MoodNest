import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { MoodProvider } from './context/MoodContext'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import CreateEntry from './pages/CreateEntry'
import EntryDetails from './pages/EntryDetails'
import MoodInsights from './pages/MoodInsights'
import Profile from './pages/Profile'

function App() {
  return (
    <AuthProvider>
      <MoodProvider>
        <Router>
          <div className="min-h-screen">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/create" element={
                <ProtectedRoute>
                  <CreateEntry />
                </ProtectedRoute>
              } />
              <Route path="/entry/:id" element={
                <ProtectedRoute>
                  <EntryDetails />
                </ProtectedRoute>
              } />
              <Route path="/insights" element={
                <ProtectedRoute>
                  <MoodInsights />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
            </Routes>
          </div>
        </Router>
      </MoodProvider>
    </AuthProvider>
  )
}

export default App