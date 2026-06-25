import React, { useState } from 'react'
import { Menu, LogOut, BarChart3, CheckSquare, Home } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const Navbar: React.FC = () => {
  const { user, logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-dark-800 border-b border-dark-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-primary p-2 rounded-lg group-hover:shadow-lg transition-shadow">
              <span className="text-white font-bold text-lg">DSA</span>
            </div>
            <span className="text-white font-bold text-lg hidden sm:inline">Progress Tracker</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="flex items-center space-x-2 text-gray-300 hover:text-primary transition-colors"
            >
              <Home size={20} />
              <span>Dashboard</span>
            </Link>
            <Link
              to="/tracker"
              className="flex items-center space-x-2 text-gray-300 hover:text-primary transition-colors"
            >
              <CheckSquare size={20} />
              <span>Tracker</span>
            </Link>
            <Link
              to="/analytics"
              className="flex items-center space-x-2 text-gray-300 hover:text-primary transition-colors"
            >
              <BarChart3 size={20} />
              <span>Analytics</span>
            </Link>
            <div className="flex items-center space-x-4 pl-8 border-l border-dark-700">
              <div className="flex items-center space-x-2">
                {user?.photoURL && (
                  <img
                    src={user.photoURL}
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <span className="text-gray-300 text-sm">{user?.displayName}</span>
              </div>
              <button
                onClick={() => logout()}
                className="flex items-center space-x-2 text-gray-300 hover:text-red-400 transition-colors"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-300 hover:text-primary transition-colors"
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 border-t border-dark-700 pt-4">
            <Link
              to="/"
              className="block px-4 py-2 text-gray-300 hover:bg-dark-700 rounded transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center space-x-2">
                <Home size={20} />
                <span>Dashboard</span>
              </div>
            </Link>
            <Link
              to="/tracker"
              className="block px-4 py-2 text-gray-300 hover:bg-dark-700 rounded transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center space-x-2">
                <CheckSquare size={20} />
                <span>Tracker</span>
              </div>
            </Link>
            <Link
              to="/analytics"
              className="block px-4 py-2 text-gray-300 hover:bg-dark-700 rounded transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center space-x-2">
                <BarChart3 size={20} />
                <span>Analytics</span>
              </div>
            </Link>
            <button
              onClick={() => {
                logout()
                setIsOpen(false)
              }}
              className="w-full text-left px-4 py-2 text-gray-300 hover:text-red-400 hover:bg-dark-700 rounded transition-colors flex items-center space-x-2"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
