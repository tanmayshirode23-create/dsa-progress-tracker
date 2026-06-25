import React, { useState } from 'react'
import { Search, Filter, Download, Upload } from 'lucide-react'
import { Problem, FilterOptions } from '../types'
import DifficultyBadge from './DifficultyBadge'
import { useProgress } from '../contexts/ProgressContext'

interface ProblemTableProps {
  problems: Problem[]
  onToggle: (id: string) => void
}

const ProblemTable: React.FC<ProblemTableProps> = ({ problems, onToggle }) => {
  const { exportAsCSV, exportAsJSON } = useProgress()
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState<FilterOptions>({
    difficulty: 'All',
    pattern: 'All',
    status: 'All',
    dataStructure: 'All',
    searchQuery: '',
  })
  const [showFilters, setShowFilters] = useState(false)

  const filteredProblems = problems.filter((p) => {
    if (filters.difficulty !== 'All' && p.difficulty !== filters.difficulty)
      return false
    if (filters.pattern !== 'All' && p.pattern !== filters.pattern) return false
    if (filters.status === 'Solved' && !p.completed) return false
    if (filters.status === 'Unsolved' && p.completed) return false
    if (filters.dataStructure !== 'All' && p.dataStructure !== filters.dataStructure)
      return false
    if (
      searchTerm &&
      !p.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
      return false
    return true
  })

  const difficulties = Array.from(new Set(problems.map((p) => p.difficulty)))
  const patterns = Array.from(new Set(problems.map((p) => p.pattern)))
  const dataStructures = Array.from(new Set(problems.map((p) => p.dataStructure)))

  return (
    <div className="space-y-4">
      {/* Search and Filter Bar */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Search problems..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field w-full pl-10"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn-secondary flex items-center justify-center gap-2"
          >
            <Filter size={20} />
            <span>Filters</span>
          </button>
          <div className="flex gap-2">
            <button
              onClick={exportAsCSV}
              className="btn-secondary flex items-center justify-center gap-2"
            >
              <Download size={20} />
              <span className="hidden sm:inline">CSV</span>
            </button>
            <button
              onClick={exportAsJSON}
              className="btn-secondary flex items-center justify-center gap-2"
            >
              <Download size={20} />
              <span className="hidden sm:inline">JSON</span>
            </button>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="card space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Difficulty
                </label>
                <select
                  value={filters.difficulty}
                  onChange={(e) =>
                    setFilters({ ...filters, difficulty: e.target.value as any })
                  }
                  className="input-field w-full"
                >
                  <option>All</option>
                  {difficulties.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Pattern
                </label>
                <select
                  value={filters.pattern}
                  onChange={(e) => setFilters({ ...filters, pattern: e.target.value })}
                  className="input-field w-full"
                >
                  <option>All</option>
                  {patterns.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Status
                </label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value as any })}
                  className="input-field w-full"
                >
                  <option>All</option>
                  <option>Solved</option>
                  <option>Unsolved</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Data Structure
                </label>
                <select
                  value={filters.dataStructure}
                  onChange={(e) =>
                    setFilters({ ...filters, dataStructure: e.target.value as any })
                  }
                  className="input-field w-full"
                >
                  <option>All</option>
                  {dataStructures.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results Count */}
      <p className="text-sm text-gray-400">
        Showing {filteredProblems.length} of {problems.length} problems
      </p>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-dark-700">
        <table className="w-full text-sm">
          <thead className="table-header bg-dark-800">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-gray-300 w-12">
                <input type="checkbox" disabled className="w-4 h-4" />
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-300">Problem</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-300 hidden md:table-cell">
                Pattern
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-300 hidden sm:table-cell">
                Difficulty
              </th>
              <th className="px-4 py-3 text-center font-semibold text-gray-300">Status</th>
              <th className="px-4 py-3 text-center font-semibold text-gray-300 hidden lg:table-cell">
                Completed
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-dark-700">
            {filteredProblems.map((problem) => (
              <tr
                key={problem.id}
                className="hover:bg-dark-700/50 transition-colors"
              >
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={problem.completed}
                    onChange={() => onToggle(problem.id)}
                    className="w-4 h-4 rounded cursor-pointer accent-primary"
                  />
                </td>
                <td className="px-4 py-3">
                  <a
                    href={problem.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-medium truncate block"
                  >
                    {problem.name}
                  </a>
                  <p className="text-xs text-gray-500 mt-1">{problem.dataStructure}</p>
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <span className="pattern-chip bg-blue-900/30 text-blue-300 rounded">
                    {problem.pattern}
                  </span>
                </td>
                <td className="px-4 py-3 hidden sm:table-cell">
                  <DifficultyBadge difficulty={problem.difficulty} />
                </td>
                <td className="px-4 py-3 text-center">
                  {problem.completed ? (
                    <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-green-900/30 text-green-300">
                      ✓ Done
                    </span>
                  ) : (
                    <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-orange-900/30 text-orange-300">
                      Pending
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-center text-xs text-gray-400 hidden lg:table-cell">
                  {problem.completedDate ? (
                    <div>
                      <p>{problem.completedDate}</p>
                      <p>{problem.completedTime}</p>
                    </div>
                  ) : (
                    <p>—</p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProblemTable
