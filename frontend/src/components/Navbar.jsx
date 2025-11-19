import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  const isActive = (path) => location.pathname === path

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="glass-card m-4 px-6 py-4 sticky top-4 z-50"
    >
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-calm-blue to-soft-purple rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">M</span>
          </div>
          <span className="text-xl font-bold text-gradient">MoodNest</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {user ? (
            <>
              <Link
                to="/dashboard"
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  isActive('/dashboard') ? 'bg-calm-blue/20 text-calm-blue' : 'hover:bg-white/20'
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/create"
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  isActive('/create') ? 'bg-calm-blue/20 text-calm-blue' : 'hover:bg-white/20'
                }`}
              >
                Write
              </Link>
              <Link
                to="/insights"
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  isActive('/insights') ? 'bg-calm-blue/20 text-calm-blue' : 'hover:bg-white/20'
                }`}
              >
                Insights
              </Link>
              <Link
                to="/profile"
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  isActive('/profile') ? 'bg-calm-blue/20 text-calm-blue' : 'hover:bg-white/20'
                }`}
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="btn-secondary"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-secondary">
                Login
              </Link>
              <Link to="/signup" className="btn-primary">
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-white/20 transition-colors"
        >
          <div className="w-6 h-6 flex flex-col justify-center space-y-1">
            <span className={`block h-0.5 bg-gray-600 transition-all ${isOpen ? 'rotate-45 translate-y-1' : ''}`} />
            <span className={`block h-0.5 bg-gray-600 transition-all ${isOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 bg-gray-600 transition-all ${isOpen ? '-rotate-45 -translate-y-1' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden mt-4 pt-4 border-t border-white/20"
        >
          <div className="flex flex-col space-y-2">
            {user ? (
              <>
                <Link to="/dashboard" className="px-4 py-2 rounded-lg hover:bg-white/20 transition-colors">
                  Dashboard
                </Link>
                <Link to="/create" className="px-4 py-2 rounded-lg hover:bg-white/20 transition-colors">
                  Write
                </Link>
                <Link to="/insights" className="px-4 py-2 rounded-lg hover:bg-white/20 transition-colors">
                  Insights
                </Link>
                <Link to="/profile" className="px-4 py-2 rounded-lg hover:bg-white/20 transition-colors">
                  Profile
                </Link>
                <button onClick={handleLogout} className="text-left px-4 py-2 rounded-lg hover:bg-white/20 transition-colors">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="px-4 py-2 rounded-lg hover:bg-white/20 transition-colors">
                  Login
                </Link>
                <Link to="/signup" className="px-4 py-2 rounded-lg hover:bg-white/20 transition-colors">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}

export default Navbar