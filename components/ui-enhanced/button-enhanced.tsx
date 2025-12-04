'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

interface EnhancedButtonProps {
  children: React.ReactNode
  className?: string
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  loading?: boolean
  disabled?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  fullWidth?: boolean
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  href?: string
  target?: string
}

export function EnhancedButton({
  children,
  className,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  onClick,
  type = 'button',
  href,
  target
}: EnhancedButtonProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-gradient-to-r from-rose-500 to-pink-500 text-white hover:from-rose-600 hover:to-pink-600 shadow-md hover:shadow-lg'
      case 'secondary':
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-200'
      case 'outline':
        return 'border border-rose-300 text-rose-600 hover:bg-rose-50 hover:border-rose-400'
      case 'ghost':
        return 'text-gray-600 hover:text-rose-600 hover:bg-rose-50'
      case 'gradient':
        return 'bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 text-white hover:from-rose-600 hover:via-pink-600 hover:to-purple-600 shadow-lg hover:shadow-xl'
      default:
        return ''
    }
  }

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'px-3 py-1.5 text-sm h-8'
      case 'lg':
        return 'px-6 py-3 text-lg h-12'
      case 'xl':
        return 'px-8 py-4 text-xl h-14'
      default:
        return 'px-4 py-2 text-base h-10'
    }
  }

  const buttonContent = (
    <>
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <span className="mr-2">{icon}</span>
          )}
          <span>{children}</span>
          {icon && iconPosition === 'right' && (
            <span className="ml-2">{icon}</span>
          )}
        </>
      )}
    </>
  )

  const buttonClasses = cn(
    'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2',
    getVariantStyles(),
    getSizeStyles(),
    fullWidth && 'w-full',
    (disabled || loading) && 'opacity-50 cursor-not-allowed',
    !loading && 'hover:scale-105',
    className
  )

  if (href) {
    return (
      <a
        href={href}
        target={target}
        className={buttonClasses}
        onClick={onClick}
      >
        {buttonContent}
      </a>
    )
  }

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {buttonContent}
    </button>
  )
}