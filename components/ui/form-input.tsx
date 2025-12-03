import React from 'react'
import { cn } from '@/lib/utils'

interface FormInputProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  hint?: string
  containerClassName?: string
  multiline?: boolean
  rows?: number
}

export function FormInput({
  label,
  error,
  hint,
  containerClassName,
  className,
  id,
  multiline,
  rows = 3,
  ...props
}: FormInputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

  const InputComponent = multiline ? 'textarea' : 'input'

  return (
    <div className={cn('space-y-2', containerClassName)}>
      {label && (
        <label 
          htmlFor={inputId} 
          className="text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      {InputComponent === 'textarea' ? (
        <textarea
          id={inputId}
          rows={rows}
          className={cn(
            'block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
            className
          )}
          {...props}
        />
      ) : (
        <input
          id={inputId}
          className={cn(
            'block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
            className
          )}
          {...props}
        />
      )}
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      {hint && !error && (
        <p className="text-sm text-gray-500">{hint}</p>
      )}
    </div>
  )
}