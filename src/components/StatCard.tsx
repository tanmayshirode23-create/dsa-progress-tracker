import React from 'react'
import { TrendingUp } from 'lucide-react'

interface StatCardProps {
  title: string
  value: number | string
  icon?: React.ReactNode
  color?: 'green' | 'blue' | 'orange' | 'red' | 'purple'
  trend?: number
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  color = 'blue',
  trend,
}) => {
  const colorMap = {
    green: 'bg-green-900/20 text-green-400 border-green-800',
    blue: 'bg-blue-900/20 text-blue-400 border-blue-800',
    orange: 'bg-orange-900/20 text-orange-400 border-orange-800',
    red: 'bg-red-900/20 text-red-400 border-red-800',
    purple: 'bg-purple-900/20 text-purple-400 border-purple-800',
  }

  return (
    <div
      className={`card ${colorMap[color]} border-2 transition-all duration-300 hover:shadow-2xl`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-400 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
          {trend !== undefined && (
            <div className="flex items-center space-x-1 mt-2 text-xs">
              <TrendingUp size={14} />
              <span>{trend}% from last week</span>
            </div>
          )}
        </div>
        {icon && <div className="text-2xl">{icon}</div>}
      </div>
    </div>
  )
}

export default StatCard
