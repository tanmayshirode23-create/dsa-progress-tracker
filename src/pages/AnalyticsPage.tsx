import React, { useMemo } from 'react'
import Navbar from '../components/Navbar'
import ProgressChart from '../components/ProgressChart'
import ContributionHeatmap from '../components/ContributionHeatmap'
import { DifficultyPieChart } from '../components/ProgressChart'
import { useProgress } from '../contexts/ProgressContext'
import { format, subDays } from 'date-fns'
import { TrendingUp, Calendar, Target, Flame } from 'lucide-react'
import StatCard from '../components/StatCard'

const AnalyticsPage: React.FC = () => {
  const { userProgress, problems, loading } = useProgress()

  const generateMockChartData = useMemo(() => {
    const data = []
    for (let i = 30; i >= 0; i--) {
      const date = subDays(new Date(), i)
      const dateStr = format(date, 'MMM dd')
      // Mock data based on completion count
      const solved = Math.floor(Math.random() * 5)
      data.push({ date: dateStr, solved })
    }
    return data
  }, [])

  const generateHeatmapData = useMemo(() => {
    const data = []
    for (let i = 90; i >= 0; i--) {
      const date = format(subDays(new Date(), i), 'MMM dd')
      const count = Math.floor(Math.random() * 6)
      data.push({ date, count })
    }
    return data
  }, [])

  if (loading || !userProgress) {
    return (
      <div className="min-h-screen bg-dark-900">
        <Navbar />
        <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
          <div className="text-center">
            <div className="inline-flex animate-spin">
              <div className="h-12 w-12 rounded-full border-4 border-dark-700 border-t-primary"></div>
            </div>
            <p className="mt-4 text-gray-400">Loading analytics...</p>
          </div>
        </div>
      </div>
    )
  }

  const todaysSolved = problems.filter(
    (p) => p.completedDate === format(new Date(), 'dd/MM/yyyy')
  ).length

  const thisWeekSolved = problems.filter((p) => {
    if (!p.completedDate) return false
    const completedDate = new Date(p.completedDate.split('/').reverse().join('-'))
    const weekAgo = subDays(new Date(), 7)
    return completedDate >= weekAgo
  }).length

  const thisMonthSolved = problems.filter((p) => {
    if (!p.completedDate) return false
    const completedDate = new Date(p.completedDate.split('/').reverse().join('-'))
    const monthAgo = subDays(new Date(), 30)
    return completedDate >= monthAgo
  }).length

  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="animate-slideUp">
          <h1 className="text-4xl font-bold text-white mb-2">Analytics & Insights</h1>
          <p className="text-gray-400">Track your learning progress and identify patterns</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-slideUp">
          <StatCard
            title="Today"
            value={todaysSolved}
            icon={<Calendar size={24} />}
            color="blue"
          />
          <StatCard
            title="This Week"
            value={thisWeekSolved}
            icon={<TrendingUp size={24} />}
            color="green"
          />
          <StatCard
            title="This Month"
            value={thisMonthSolved}
            icon={<Target size={24} />}
            color="orange"
          />
          <StatCard
            title="Streak"
            value={`${userProgress.streakDays}d`}
            icon={<Flame size={24} />}
            color="red"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-slideUp">
          <ProgressChart
            data={generateMockChartData}
            title="Problems Solved (Last 30 Days)"
            type="line"
          />
          <DifficultyPieChart
            easy={userProgress.easySolved}
            medium={userProgress.mediumSolved}
            hard={userProgress.hardSolved}
          />
        </div>

        {/* Contribution Heatmap */}
        <div className="animate-slideUp">
          <ContributionHeatmap data={generateHeatmapData} />
        </div>

        {/* Detailed Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-slideUp">
          <div className="card">
            <h3 className="text-lg font-bold text-white mb-4">Difficulty Stats</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Easy</span>
                  <span className="font-semibold text-green-400">
                    {userProgress.easySolved}/{problems.filter(p => p.difficulty === 'Easy').length}
                  </span>
                </div>
                <div className="w-full bg-dark-700 rounded-full h-2">
                  <div
                    className="bg-green-400 h-2 rounded-full"
                    style={{
                      width: `${(userProgress.easySolved / (problems.filter(p => p.difficulty === 'Easy').length || 1)) * 100}%`,
                    }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Medium</span>
                  <span className="font-semibold text-orange-400">
                    {userProgress.mediumSolved}/{problems.filter(p => p.difficulty === 'Medium').length}
                  </span>
                </div>
                <div className="w-full bg-dark-700 rounded-full h-2">
                  <div
                    className="bg-orange-400 h-2 rounded-full"
                    style={{
                      width: `${(userProgress.mediumSolved / (problems.filter(p => p.difficulty === 'Medium').length || 1)) * 100}%`,
                    }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Hard</span>
                  <span className="font-semibold text-red-400">
                    {userProgress.hardSolved}/{problems.filter(p => p.difficulty === 'Hard').length}
                  </span>
                </div>
                <div className="w-full bg-dark-700 rounded-full h-2">
                  <div
                    className="bg-red-400 h-2 rounded-full"
                    style={{
                      width: `${(userProgress.hardSolved / (problems.filter(p => p.difficulty === 'Hard').length || 1)) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-bold text-white mb-4">Top Topics</h3>
            <div className="space-y-3">
              {[
                { topic: 'Arrays', solved: 12, total: 38 },
                { topic: 'Strings', solved: 8, total: 28 },
                { topic: 'Trees', solved: 15, total: 40 },
              ].map((item) => (
                <div key={item.topic}>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400 text-sm">{item.topic}</span>
                    <span className="font-semibold text-primary text-sm">
                      {item.solved}/{item.total}
                    </span>
                  </div>
                  <div className="w-full bg-dark-700 rounded-full h-1.5">
                    <div
                      className="bg-primary h-1.5 rounded-full"
                      style={{ width: `${(item.solved / item.total) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-bold text-white mb-4">Your Performance</h3>
            <div className="space-y-4">
              <div>
                <p className="text-gray-400 text-sm">Accuracy Rate</p>
                <p className="text-3xl font-bold text-primary">
                  {Math.round((userProgress.totalSolved / userProgress.totalProblems) * 100)}%
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Problems Remaining</p>
                <p className="text-2xl font-bold text-orange-400">
                  {userProgress.totalProblems - userProgress.totalSolved}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnalyticsPage
