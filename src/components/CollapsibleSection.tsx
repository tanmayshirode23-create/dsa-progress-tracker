import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Problem } from '../types'
import ProblemTable from './ProblemTable'

interface CollapsibleSectionProps {
  title: string
  problems: Problem[]
  onToggle: (id: string) => void
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  problems,
  onToggle,
}) => {
  const [isOpen, setIsOpen] = useState(true)
  const solved = problems.filter((p) => p.completed).length
  const total = problems.length

  return (
    <div className="card animate-fadeIn">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between hover:bg-dark-700/50 p-4 -m-4 rounded transition-colors"
      >
        <div className="flex items-center space-x-4 flex-1">
          {isOpen ? (
            <ChevronUp className="text-primary" size={24} />
          ) : (
            <ChevronDown className="text-primary" size={24} />
          )}
          <div className="text-left">
            <h3 className="text-lg font-bold text-white">{title}</h3>
            <p className="text-sm text-gray-400">
              {solved} of {total} completed ({Math.round((solved / total) * 100)}%)
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-primary">{solved}</p>
          <p className="text-xs text-gray-500">Solved</p>
        </div>
      </button>

      {isOpen && (
        <div className="mt-4 pt-4 border-t border-dark-700">
          <ProblemTable problems={problems} onToggle={onToggle} />
        </div>
      )}
    </div>
  )
}

export default CollapsibleSection
