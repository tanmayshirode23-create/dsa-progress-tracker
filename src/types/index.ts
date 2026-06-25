export interface User {
  uid: string
  email: string
  displayName: string
  photoURL?: string
}

export type Difficulty = 'Easy' | 'Medium' | 'Hard'
export type DataStructure = 'Arrays' | 'Strings' | 'Linked List' | 'Stack' | 'Queue/Deque' | 'Trees'

export interface Problem {
  id: string
  dataStructure: DataStructure
  name: string
  link: string
  pattern: string
  difficulty: Difficulty
  completed: boolean
  completedDate?: string
  completedTime?: string
  notes?: string
  isFavorite?: boolean
  revisionRequired?: boolean
  revisionCount?: number
  lastRevisedDate?: string
}

export interface UserProgress {
  uid: string
  problems: Problem[]
  totalSolved: number
  easySolved: number
  mediumSolved: number
  hardSolved: number
  streakDays: number
  lastActivityDate: string
  totalProblems: number
  completionPercentage: number
  dailyGoal: number
  todaysSolved: number
  lastUpdated: string
}

export interface DailyStats {
  date: string
  solved: number
  easy: number
  medium: number
  hard: number
}

export interface FilterOptions {
  difficulty: Difficulty | 'All'
  pattern: string | 'All'
  status: 'All' | 'Solved' | 'Unsolved'
  dataStructure: DataStructure | 'All'
  searchQuery: string
}
