import React, { createContext, useContext, useEffect, useState } from 'react'
import {
  collection,
  doc,
  setDoc,
  getDoc,
  onSnapshot,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from '../utils/firebase'
import { Problem, UserProgress } from '../types'
import { useAuth } from './AuthContext'
import generateProblems from '../utils/dsaData'
import { format } from 'date-fns'

interface ProgressContextType {
  problems: Problem[]
  userProgress: UserProgress | null
  loading: boolean
  toggleProblem: (problemId: string) => Promise<void>
  updateProblemNote: (problemId: string, note: string) => Promise<void>
  toggleFavorite: (problemId: string) => Promise<void>
  toggleRevisionRequired: (problemId: string) => Promise<void>
  incrementRevisionCount: (problemId: string) => Promise<void>
  updateDailyGoal: (goal: number) => Promise<void>
  exportAsCSV: () => void
  exportAsJSON: () => void
  importFromJSON: (data: string) => Promise<void>
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined)

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth()
  const [problems, setProblems] = useState<Problem[]>([])
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null)
  const [loading, setLoading] = useState(true)

  // Initialize user progress
  useEffect(() => {
    if (!user) {
      setProblems([])
      setUserProgress(null)
      setLoading(false)
      return
    }

    const initializeUserProgress = async () => {
      try {
        const userDocRef = doc(db, 'users', user.uid)
        const userDocSnap = await getDoc(userDocRef)

        if (!userDocSnap.exists()) {
          // Create new user progress
          const initialProblems = generateProblems()
          const newProgress: UserProgress = {
            uid: user.uid,
            problems: initialProblems,
            totalSolved: 0,
            easySolved: 0,
            mediumSolved: 0,
            hardSolved: 0,
            streakDays: 0,
            lastActivityDate: format(new Date(), 'yyyy-MM-dd'),
            totalProblems: initialProblems.length,
            completionPercentage: 0,
            dailyGoal: 5,
            todaysSolved: 0,
            lastUpdated: new Date().toISOString(),
          }
          await setDoc(userDocRef, newProgress)
          setProblems(initialProblems)
          setUserProgress(newProgress)
        } else {
          const data = userDocSnap.data() as UserProgress
          setProblems(data.problems)
          setUserProgress(data)
        }
      } catch (error) {
        console.error('Error initializing user progress:', error)
      } finally {
        setLoading(false)
      }
    }

    initializeUserProgress()
  }, [user])

  // Real-time listener
  useEffect(() => {
    if (!user) return

    const userDocRef = doc(db, 'users', user.uid)
    const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data() as UserProgress
        setProblems(data.problems)
        setUserProgress(data)
      }
    })

    return unsubscribe
  }, [user])

  const toggleProblem = async (problemId: string) => {
    if (!user || !userProgress) return

    const updatedProblems = problems.map((p) => {
      if (p.id === problemId) {
        return {
          ...p,
          completed: !p.completed,
          completedDate: !p.completed
            ? format(new Date(), 'dd/MM/yyyy')
            : undefined,
          completedTime: !p.completed
            ? format(new Date(), 'HH:mm')
            : undefined,
        }
      }
      return p
    })

    const stats = calculateStats(updatedProblems)
    const today = format(new Date(), 'yyyy-MM-dd')
    const lastActivityDate = userProgress.lastActivityDate

    let streakDays = userProgress.streakDays
    if (today !== lastActivityDate) {
      streakDays = 1
    }

    const updatedProgress: UserProgress = {
      ...userProgress,
      problems: updatedProblems,
      ...stats,
      streakDays,
      lastActivityDate: today,
      todaysSolved: updatedProblems.filter(
        (p) => p.completedDate === format(new Date(), 'dd/MM/yyyy')
      ).length,
      lastUpdated: new Date().toISOString(),
    }

    try {
      await updateDoc(doc(db, 'users', user.uid), updatedProgress)
    } catch (error) {
      console.error('Error updating problem:', error)
    }
  }

  const updateProblemNote = async (problemId: string, note: string) => {
    if (!user || !userProgress) return

    const updatedProblems = problems.map((p) =>
      p.id === problemId ? { ...p, notes: note } : p
    )

    try {
      await updateDoc(doc(db, 'users', user.uid), {
        problems: updatedProblems,
        lastUpdated: new Date().toISOString(),
      })
    } catch (error) {
      console.error('Error updating note:', error)
    }
  }

  const toggleFavorite = async (problemId: string) => {
    if (!user || !userProgress) return

    const updatedProblems = problems.map((p) =>
      p.id === problemId ? { ...p, isFavorite: !p.isFavorite } : p
    )

    try {
      await updateDoc(doc(db, 'users', user.uid), {
        problems: updatedProblems,
        lastUpdated: new Date().toISOString(),
      })
    } catch (error) {
      console.error('Error toggling favorite:', error)
    }
  }

  const toggleRevisionRequired = async (problemId: string) => {
    if (!user || !userProgress) return

    const updatedProblems = problems.map((p) =>
      p.id === problemId
        ? { ...p, revisionRequired: !p.revisionRequired }
        : p
    )

    try {
      await updateDoc(doc(db, 'users', user.uid), {
        problems: updatedProblems,
        lastUpdated: new Date().toISOString(),
      })
    } catch (error) {
      console.error('Error toggling revision required:', error)
    }
  }

  const incrementRevisionCount = async (problemId: string) => {
    if (!user || !userProgress) return

    const updatedProblems = problems.map((p) =>
      p.id === problemId
        ? {
            ...p,
            revisionCount: (p.revisionCount || 0) + 1,
            lastRevisedDate: format(new Date(), 'dd/MM/yyyy'),
          }
        : p
    )

    try {
      await updateDoc(doc(db, 'users', user.uid), {
        problems: updatedProblems,
        lastUpdated: new Date().toISOString(),
      })
    } catch (error) {
      console.error('Error incrementing revision count:', error)
    }
  }

  const updateDailyGoal = async (goal: number) => {
    if (!user || !userProgress) return

    try {
      await updateDoc(doc(db, 'users', user.uid), {
        dailyGoal: goal,
        lastUpdated: new Date().toISOString(),
      })
    } catch (error) {
      console.error('Error updating daily goal:', error)
    }
  }

  const calculateStats = (probs: Problem[]) => {
    const totalSolved = probs.filter((p) => p.completed).length
    const easySolved = probs.filter(
      (p) => p.completed && p.difficulty === 'Easy'
    ).length
    const mediumSolved = probs.filter(
      (p) => p.completed && p.difficulty === 'Medium'
    ).length
    const hardSolved = probs.filter(
      (p) => p.completed && p.difficulty === 'Hard'
    ).length

    return {
      totalSolved,
      easySolved,
      mediumSolved,
      hardSolved,
      completionPercentage: Math.round(
        (totalSolved / probs.length) * 100
      ),
    }
  }

  const exportAsCSV = () => {
    const csv = [
      ['Data Structure', 'Problem Name', 'Platform Link', 'Pattern', 'Difficulty', 'Status', 'Completed Date', 'Completed Time', 'Notes'],
      ...problems.map((p) => [
        p.dataStructure,
        p.name,
        p.link,
        p.pattern,
        p.difficulty,
        p.completed ? 'Completed' : 'Pending',
        p.completedDate || '',
        p.completedTime || '',
        p.notes || '',
      ]),
    ]
      .map((row) => row.map((cell) => `"${cell}"`).join(','))
      .join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `dsa-progress-${format(new Date(), 'yyyy-MM-dd')}.csv`
    a.click()
  }

  const exportAsJSON = () => {
    const json = JSON.stringify(
      {
        exportDate: new Date().toISOString(),
        progress: userProgress,
      },
      null,
      2
    )

    const blob = new Blob([json], { type: 'application/json' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `dsa-progress-${format(new Date(), 'yyyy-MM-dd')}.json`
    a.click()
  }

  const importFromJSON = async (data: string) => {
    if (!user) return

    try {
      const parsed = JSON.parse(data)
      const importedProblems = parsed.progress.problems as Problem[]

      const stats = calculateStats(importedProblems)

      const importedProgress: UserProgress = {
        uid: user.uid,
        problems: importedProblems,
        ...stats,
        streakDays: parsed.progress.streakDays || 0,
        lastActivityDate: format(new Date(), 'yyyy-MM-dd'),
        totalProblems: importedProblems.length,
        dailyGoal: parsed.progress.dailyGoal || 5,
        todaysSolved: importedProblems.filter(
          (p) => p.completedDate === format(new Date(), 'dd/MM/yyyy')
        ).length,
        lastUpdated: new Date().toISOString(),
      }

      await setDoc(doc(db, 'users', user.uid), importedProgress)
    } catch (error) {
      console.error('Error importing data:', error)
      throw error
    }
  }

  return (
    <ProgressContext.Provider
      value={{
        problems,
        userProgress,
        loading,
        toggleProblem,
        updateProblemNote,
        toggleFavorite,
        toggleRevisionRequired,
        incrementRevisionCount,
        updateDailyGoal,
        exportAsCSV,
        exportAsJSON,
        importFromJSON,
      }}
    >
      {children}
    </ProgressContext.Provider>
  )
}

export const useProgress = () => {
  const context = useContext(ProgressContext)
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider')
  }
  return context
}
