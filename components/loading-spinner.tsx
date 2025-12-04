'use client'

import React from 'react'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'secondary' | 'white'
  className?: string
}

export function LoadingSpinner({ 
  size = 'md', 
  color = 'primary', 
  className = '' 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  }

  const colorClasses = {
    primary: 'text-blue-600',
    secondary: 'text-gray-600',
    white: 'text-white'
  }

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <svg
        className={`animate-spin ${sizeClasses[size]} ${colorClasses[color]}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  )
}

interface LoadingOverlayProps {
  show: boolean
  message?: string
  className?: string
}

export function LoadingOverlay({ 
  show, 
  message = '加载中...', 
  className = '' 
}: LoadingOverlayProps) {
  if (!show) return null

  return (
    <div className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 ${className}`}>
      <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm mx-4">
        <div className="flex items-center gap-3">
          <LoadingSpinner size="md" />
          <span className="text-gray-700">{message}</span>
        </div>
      </div>
    </div>
  )
}

interface ErrorMessageProps {
  error: string
  onRetry?: () => void
  className?: string
}

export function ErrorMessage({ 
  error, 
  onRetry, 
  className = '' 
}: ErrorMessageProps) {
  return (
    <div className={`bg-red-50 border border-red-200 rounded-lg p-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-red-600 text-sm font-medium">{error}</span>
        </div>
        {onRetry && (
          <button
            onClick={onRetry}
            className="text-red-600 hover:text-red-700 text-sm font-medium px-3 py-1 rounded border border-red-200 hover:bg-red-50"
          >
            重试
          </button>
        )}
      </div>
    </div>
  )
}