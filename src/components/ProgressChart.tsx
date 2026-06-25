import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'

interface DailyStatsData {
  date: string
  solved: number
}

interface ProgressChartProps {
  data: DailyStatsData[]
  title: string
  type?: 'bar' | 'line'
}

const ProgressChart: React.FC<ProgressChartProps> = ({
  data,
  title,
  type = 'line',
}) => {
  if (data.length === 0) {
    return (
      <div className="card flex items-center justify-center h-96 text-gray-400">
        <p>No data available yet. Start solving problems to see your progress!</p>
      </div>
    )
  }

  return (
    <div className="card">
      <h3 className="text-lg font-bold text-white mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        {type === 'bar' ? (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="date" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1f2937',
                border: '1px solid #374151',
                borderRadius: '8px',
              }}
              labelStyle={{ color: '#e5e7eb' }}
            />
            <Bar dataKey="solved" fill="#10b981" radius={[8, 8, 0, 0]} />
          </BarChart>
        ) : (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="date" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1f2937',
                border: '1px solid #374151',
                borderRadius: '8px',
              }}
              labelStyle={{ color: '#e5e7eb' }}
            />
            <Line
              type="monotone"
              dataKey="solved"
              stroke="#10b981"
              dot={{ fill: '#10b981', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  )
}

interface PieChartDataProps {
  easy: number
  medium: number
  hard: number
}

export const DifficultyPieChart: React.FC<PieChartDataProps> = ({
  easy,
  medium,
  hard,
}) => {
  const data = [
    { name: 'Easy', value: easy },
    { name: 'Medium', value: medium },
    { name: 'Hard', value: hard },
  ]

  const COLORS = ['#10b981', '#f59e0b', '#ef4444']

  return (
    <div className="card">
      <h3 className="text-lg font-bold text-white mb-4">Difficulty Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name}: ${value}`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: '#1f2937',
              border: '1px solid #374151',
              borderRadius: '8px',
            }}
            labelStyle={{ color: '#e5e7eb' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ProgressChart
