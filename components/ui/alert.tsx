import React from 'react'
import { cn } from '@/lib/utils'
import { AlertCircle, CheckCircle, XCircle } from 'lucide-react'

interface AlertProps {
  children: React.ReactNode
  variant?: 'default' | 'destructive' | 'success' | 'warning'
  className?: string
  onDismiss?: () => void
}

export function Alert({ children, variant = 'default', className, onDismiss }: AlertProps) {
  const variantClasses = {
    default: 'bg-blue-50 border-blue-200 text-blue-800',
    destructive: 'bg-red-50 border-red-200 text-red-800',
    success: 'bg-green-50 border-green-200 text-green-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800'
  }

  const icons = {
    default: <AlertCircle className="h-4 w-4" />,
    destructive: <XCircle className="h-4 w-4" />,
    success: <CheckCircle className="h-4 w-4" />,
    warning: <AlertCircle className="h-4 w-4" />
  }

  return (
    <div className={cn(
      'relative rounded-lg border p-4',
      variantClasses[variant],
      className
    )}>
      <div className="flex">
        <div className="flex-shrink-0">
          {icons[variant]}
        </div>
        <div className="ml-3 flex-1">
          {children}
        </div>
        {onDismiss && (
          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            onClick={onDismiss}
          >
            <XCircle className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  )
}