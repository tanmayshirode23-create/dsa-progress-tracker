import React from 'react'

interface DifficultyBadgeProps {
  difficulty: 'Easy' | 'Medium' | 'Hard'
  className?: string
}

const DifficultyBadge: React.FC<DifficultyBadgeProps> = ({
  difficulty,
  className = '',
}) => {
  const badgeClass =
    difficulty === 'Easy'
      ? 'badge-easy'
      : difficulty === 'Medium'
      ? 'badge-medium'
      : 'badge-hard'

  return <span className={`${badgeClass} ${className}`}>{difficulty}</span>
}

export default DifficultyBadge
