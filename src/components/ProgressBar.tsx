import React from 'react'

interface ProgressBarProps {
  current: number
  total: number
  label?: string
  showPercentage?: boolean
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  total,
  label,
  showPercentage = true,
}) => {
  const percentage = total > 0 ? (current / total) * 100 : 0

  return (
    <div>
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-300">{label}</span>
          {showPercentage && (
            <span className="text-sm font-bold text-primary">{Math.round(percentage)}%</span>
          )}
        </div>
      )}
      <div className="w-full bg-dark-700 rounded-full h-3 overflow-hidden">
        <div
          className="bg-gradient-to-r from-primary to-green-400 h-3 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="flex justify-between items-center mt-1">
        <span className="text-xs text-gray-500">
          {current} of {total}
        </span>
      </div>
    </div>
  )
}

export default ProgressBar
