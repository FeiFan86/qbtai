'use client'

import { cn } from '../lib/utils'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function LoadingSpinner({ size = 'md', className }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  }

  return (
    <div className={cn('flex items-center justify-center', className)}>
      <div 
        className={cn(
          'animate-spin rounded-full border-2 border-gray-300 border-t-pink-500',
          sizeClasses[size]
        )}
      />
    </div>
  )
}

interface LoadingOverlayProps {
  message?: string
  show?: boolean
}

export function LoadingOverlay({ message = '加载中...', show = true }: LoadingOverlayProps) {
  if (!show) return null

  return (
    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="text-center">
        <LoadingSpinner size="lg" className="mb-4" />
        <p className="text-sm text-gray-600">{message}</p>
      </div>
    </div>
  )
}

interface ErrorMessageProps {
  error: string | null
  onRetry?: () => void
  className?: string
}

export function ErrorMessage({ error, onRetry, className }: ErrorMessageProps) {
  if (!error) return null

  return (
    <div className={cn('bg-red-50 border border-red-200 rounded-lg p-4', className)}>
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">!</span>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-red-800">{error}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
            >
              重试
            </button>
          )}
        </div>
      </div>
    </div>
  )
}