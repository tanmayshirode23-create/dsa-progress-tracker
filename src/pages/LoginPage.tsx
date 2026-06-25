import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Github, Zap } from 'lucide-react'

const LoginPage: React.FC = () => {
  const { loginWithGoogle } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = React.useState(false)

  const handleGoogleLogin = async () => {
    try {
      setLoading(true)
      await loginWithGoogle()
      navigate('/')
    } catch (error) {
      console.error('Login failed:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 animate-slideUp">
        {/* Logo */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary">
            <span className="text-2xl font-bold text-white">DSA</span>
          </div>
          <h1 className="mt-6 text-4xl font-extrabold text-white">DSA Tracker</h1>
          <p className="mt-2 text-gray-400">Track your Data Structures & Algorithms learning</p>
        </div>

        {/* Features */}
        <div className="card space-y-4">
          <div className="flex items-start space-x-3">
            <Zap className="text-primary mt-1 flex-shrink-0" size={20} />
            <div>
              <p className="font-semibold text-white">Real-time Sync</p>
              <p className="text-sm text-gray-400">Your progress syncs across all devices</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Zap className="text-primary mt-1 flex-shrink-0" size={20} />
            <div>
              <p className="font-semibold text-white">Curated Problems</p>
              <p className="text-sm text-gray-400">200+ carefully selected DSA questions</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Zap className="text-primary mt-1 flex-shrink-0" size={20} />
            <div>
              <p className="font-semibold text-white">PWA Support</p>
              <p className="text-sm text-gray-400">Install as a native app on your device</p>
            </div>
          </div>
        </div>

        {/* Login Button */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full btn-primary flex items-center justify-center space-x-2 py-3"
        >
          <Github size={20} />
          <span>{loading ? 'Signing in...' : 'Sign in with Google'}</span>
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500">
          Your data is stored securely in Firebase. We never share your personal information.
        </p>
      </div>
    </div>
  )
}

export default LoginPage
