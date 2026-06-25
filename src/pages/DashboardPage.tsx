import React from 'react'
import Navbar from '../components/Navbar'
import StatCard from '../components/StatCard'
import ProgressBar from '../components/ProgressBar'
import { useProgress } from '../contexts/ProgressContext'
import { BookOpen, CheckCircle, Target, TrendingUp } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const DashboardPage: React.FC = () => {
  const { userProgress, loading } = useProgress()
  const navigate = useNavigate()

  if (loading || !userProgress) {
    return (
      <div className="min-h-screen bg-dark-900">
        <Navbar />
        <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
          <div className="text-center">
            <div className="inline-flex animate-spin">
              <div className="h-12 w-12 rounded-full border-4 border-dark-700 border-t-primary"></div>
            </div>
            <p className="mt-4 text-gray-400">Loading your progress...</p>
          </div>
        </div>
      </div>
    )
  }

  const easyTotal = userProgress.problems.filter(p => p.difficulty === 'Easy').length
  const mediumTotal = userProgress.problems.filter(p => p.difficulty === 'Medium').length
  const hardTotal = userProgress.problems.filter(p => p.difficulty === 'Hard').length

  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Welcome Section */}
        <div className="animate-slideUp">
          <h1 className="text-4xl font-bold text-white mb-2">Welcome back! 👋</h1>
          <p className="text-gray-400">Keep pushing towards your goal. You're doing amazing!</p>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-slideUp">
          <StatCard
            title="Total Questions"
            value={userProgress.totalProblems}
            icon={<BookOpen size={24} />}
            color="blue"
          />
          <StatCard
            title="Problems Solved"
            value={userProgress.totalSolved}
            icon={<CheckCircle size={24} />}
            color="green"
            trend={Math.round((userProgress.totalSolved / userProgress.totalProblems) * 100)}
          />
          <StatCard
            title="Completion %"
            value={`${userProgress.completionPercentage}%`}
            icon={<TrendingUp size={24} />}
            color="purple"
          />
          <StatCard
            title="Current Streak"
            value={`${userProgress.streakDays} days`}
            icon={<Target size={24} />}
            color="orange"
          />
        </div>

        {/* Main Progress Bar */}
        <div className="card animate-slideUp">
          <h2 className="text-2xl font-bold text-white mb-6">Overall Progress</h2>
          <ProgressBar
            current={userProgress.totalSolved}
            total={userProgress.totalProblems}
            label="Problems Solved"
            showPercentage
          />
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-green-900/20 border border-green-800 rounded-lg p-4 text-center">
              <p className="text-gray-400 text-sm font-medium mb-2">Easy</p>
              <p className="text-3xl font-bold text-green-400">{userProgress.easySolved}</p>
              <p className="text-xs text-gray-500 mt-2">of {easyTotal}</p>
            </div>
            <div className="bg-orange-900/20 border border-orange-800 rounded-lg p-4 text-center">
              <p className="text-gray-400 text-sm font-medium mb-2">Medium</p>
              <p className="text-3xl font-bold text-orange-400">{userProgress.mediumSolved}</p>
              <p className="text-xs text-gray-500 mt-2">of {mediumTotal}</p>
            </div>
            <div className="bg-red-900/20 border border-red-800 rounded-lg p-4 text-center">
              <p className="text-gray-400 text-sm font-medium mb-2">Hard</p>
              <p className="text-3xl font-bold text-red-400">{userProgress.hardSolved}</p>
              <p className="text-xs text-gray-500 mt-2">of {hardTotal}</p>
            </div>
          </div>
        </div>

        {/* Today's Progress */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-slideUp">
          <div className="card">
            <h3 className="text-lg font-bold text-white mb-4">Today's Progress</h3>
            <div className="space-y-4">
              <div>
                <p className="text-gray-400 text-sm mb-2">Solved Today</p>
                <p className="text-4xl font-bold text-primary">{userProgress.todaysSolved}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-2">Daily Goal</p>
                <p className="text-2xl font-bold text-gray-300">{userProgress.dailyGoal}</p>
              </div>
              <div className="mt-4">
                <ProgressBar
                  current={userProgress.todaysSolved}
                  total={userProgress.dailyGoal}
                  showPercentage
                />
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
            <button
              onClick={() => navigate('/tracker')}
              className="w-full btn-primary mb-3"
            >
              📝 Start Solving
            </button>
            <button
              onClick={() => navigate('/analytics')}
              className="w-full btn-secondary"
            >
              📊 View Analytics
            </button>
          </div>
        </div>

        {/* Difficulty Distribution */}
        <div className="card animate-slideUp">
          <h3 className="text-lg font-bold text-white mb-4">Difficulty Distribution</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-5xl font-bold text-green-400">
                {Math.round((userProgress.easySolved / easyTotal) * 100)}%
              </div>
              <p className="text-sm text-gray-400 mt-2">Easy Completion</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-orange-400">
                {Math.round((userProgress.mediumSolved / mediumTotal) * 100)}%
              </div>
              <p className="text-sm text-gray-400 mt-2">Medium Completion</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-red-400">
                {Math.round((userProgress.hardSolved / hardTotal) * 100)}%
              </div>
              <p className="text-sm text-gray-400 mt-2">Hard Completion</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
