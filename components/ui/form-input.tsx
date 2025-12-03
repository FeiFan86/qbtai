import React from 'react'
import { cn } from '@/lib/utils'

interface BaseFormInputProps {
  label?: string
  error?: string
  hint?: string
  containerClassName?: string
  multiline?: boolean
  rows?: number
}

interface InputProps extends BaseFormInputProps, React.InputHTMLAttributes<HTMLInputElement> {
  multiline?: false
}

interface TextareaProps extends BaseFormInputProps, React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  multiline?: true
  rows?: number
}

type FormInputProps = InputProps | TextareaProps

export function FormInput(props: FormInputProps) {
  const { 
    label, 
    error, 
    hint, 
    containerClassName, 
    className, 
    id, 
    multiline, 
    rows = 3,
    ...inputProps 
  } = props

  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

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
      {multiline ? (
        <textarea
          id={inputId}
          rows={rows}
          className={cn(
            'block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
            className
          )}
          {...inputProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>}
        />
      ) : (
        <input
          id={inputId}
          className={cn(
            'block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
            className
          )}
          {...inputProps as React.InputHTMLAttributes<HTMLInputElement>}
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