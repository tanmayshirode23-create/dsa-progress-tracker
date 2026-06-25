import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import CollapsibleSection from '../components/CollapsibleSection'
import { useProgress } from '../contexts/ProgressContext'
import { Upload, FileJson } from 'lucide-react'
import { DataStructure } from '../types'

const TrackerPage: React.FC = () => {
  const { problems, toggleProblem, loading } = useProgress()
  const [showImport, setShowImport] = useState(false)
  const [importFile, setImportFile] = useState<File | null>(null)

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-900">
        <Navbar />
        <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
          <div className="text-center">
            <div className="inline-flex animate-spin">
              <div className="h-12 w-12 rounded-full border-4 border-dark-700 border-t-primary"></div>
            </div>
            <p className="mt-4 text-gray-400">Loading problems...</p>
          </div>
        </div>
      </div>
    )
  }

  const dataStructures: DataStructure[] = [
    'Arrays',
    'Strings',
    'Linked List',
    'Stack',
    'Queue/Deque',
    'Trees',
  ]

  const handleImportChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImportFile(file)
    }
  }

  const handleImportSubmit = async () => {
    if (!importFile) return

    try {
      const text = await importFile.text()
      // Import logic would go here
      alert('Import successful!')
      setShowImport(false)
      setImportFile(null)
    } catch (error) {
      console.error('Import failed:', error)
      alert('Import failed. Please check the file format.')
    }
  }

  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 animate-slideUp">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">DSA Problem Tracker</h1>
            <p className="text-gray-400">Track your progress through {problems.length} carefully curated problems</p>
          </div>
          <button
            onClick={() => setShowImport(!showImport)}
            className="btn-secondary flex items-center space-x-2 whitespace-nowrap"
          >
            <Upload size={20} />
            <span>Import Progress</span>
          </button>
        </div>

        {/* Import Modal */}
        {showImport && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="card max-w-md w-full space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                <FileJson size={24} />
                <span>Import Progress</span>
              </h3>
              <input
                type="file"
                accept=".json"
                onChange={handleImportChange}
                className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-opacity-90"
              />
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowImport(false)
                    setImportFile(null)
                  }}
                  className="flex-1 btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleImportSubmit}
                  disabled={!importFile}
                  className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Import
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Data Structure Sections */}
        <div className="space-y-6">
          {dataStructures.map((ds) => {
            const dsProblems = problems.filter((p) => p.dataStructure === ds)
            return (
              <CollapsibleSection
                key={ds}
                title={ds}
                problems={dsProblems}
                onToggle={toggleProblem}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default TrackerPage
