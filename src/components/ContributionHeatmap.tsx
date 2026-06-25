import React from 'react'

interface HeatmapDay {
  date: string
  count: number
}

interface ContributionHeatmapProps {
  data: HeatmapDay[]
}

const getColor = (count: number): string => {
  if (count === 0) return 'bg-dark-700'
  if (count <= 1) return 'bg-green-900'
  if (count <= 3) return 'bg-green-700'
  if (count <= 5) return 'bg-green-500'
  return 'bg-green-400'
}

const ContributionHeatmap: React.FC<ContributionHeatmapProps> = ({ data }) => {
  // Group data by week
  const weeks: HeatmapDay[][] = []
  let currentWeek: HeatmapDay[] = []

  data.forEach((day) => {
    currentWeek.push(day)
    if (currentWeek.length === 7) {
      weeks.push(currentWeek)
      currentWeek = []
    }
  })
  if (currentWeek.length > 0) {
    weeks.push(currentWeek)
  }

  return (
    <div className="card">
      <h3 className="text-lg font-bold text-white mb-4">Contribution Graph</h3>
      <div className="overflow-x-auto">
        <div className="flex space-x-1 min-w-max p-2">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col space-y-1">
              {week.map((day, dayIndex) => (
                <div
                  key={`${weekIndex}-${dayIndex}`}
                  className={`w-4 h-4 rounded ${getColor(day.count)} transition-all duration-200 hover:ring-2 hover:ring-primary cursor-pointer group relative`}
                  title={`${day.date}: ${day.count} problems solved`}
                >
                  <div className="hidden group-hover:block absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-dark-900 text-xs text-white px-2 py-1 rounded whitespace-nowrap border border-dark-700 z-10">
                    {day.date}: {day.count} solved
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 flex items-center space-x-2 text-xs text-gray-400">
        <span>Less</span>
        <div className="flex space-x-1">
          <div className="w-3 h-3 rounded bg-dark-700"></div>
          <div className="w-3 h-3 rounded bg-green-900"></div>
          <div className="w-3 h-3 rounded bg-green-700"></div>
          <div className="w-3 h-3 rounded bg-green-500"></div>
          <div className="w-3 h-3 rounded bg-green-400"></div>
        </div>
        <span>More</span>
      </div>
    </div>
  )
}

export default ContributionHeatmap
