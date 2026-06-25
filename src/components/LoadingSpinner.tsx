import React from 'react'

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-dark-900">
      <div className="text-center">
        <div className="inline-flex animate-spin">
          <div className="h-12 w-12 rounded-full border-4 border-dark-700 border-t-primary"></div>
        </div>
        <p className="mt-4 text-gray-400">Loading...</p>
      </div>
    </div>
  )
}

export default LoadingSpinner
