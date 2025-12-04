'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface EnhancedCardProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'glass' | 'elevated' | 'gradient'
  hover?: boolean
  animation?: 'slide-up' | 'fade-in' | 'scale-up' | 'none'
  delay?: number
}

export function EnhancedCard({ 
  children, 
  className, 
  variant = 'default', 
  hover = true,
  animation = 'fade-in',
  delay = 0
}: EnhancedCardProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'glass':
        return 'bg-white/70 backdrop-blur-md border border-white/20 shadow-lg'
      case 'elevated':
        return 'bg-white border border-gray-100 shadow-xl'
      case 'gradient':
        return 'bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-lg'
      default:
        return 'bg-white border border-gray-100 shadow-md'
    }
  }

  const getHoverStyles = () => {
    if (!hover) return ''
    
    switch (variant) {
      case 'glass':
        return 'hover:bg-white/80 hover:shadow-xl hover:scale-105'
      case 'elevated':
        return 'hover:shadow-2xl hover:scale-102'
      case 'gradient':
        return 'hover:shadow-xl hover:scale-102'
      default:
        return 'hover:shadow-lg hover:scale-102'
    }
  }

  const getAnimationStyles = () => {
    switch (animation) {
      case 'slide-up':
        return 'translate-y-8 opacity-0 animate-slide-up'
      case 'fade-in':
        return 'opacity-0 animate-fade-in'
      case 'scale-up':
        return 'scale-95 opacity-0 animate-scale-up'
      default:
        return ''
    }
  }

  return (
    <div
      className={cn(
        'rounded-xl transition-all duration-300',
        getVariantStyles(),
        getHoverStyles(),
        getAnimationStyles(),
        className
      )}
      style={{
        animationDelay: delay ? `${delay}ms` : undefined
      }}
    >
      {children}
    </div>
  )
}

interface CardHeaderProps {
  children: React.ReactNode
  className?: string
  gradient?: boolean
}

export function CardHeaderEnhanced({ children, className, gradient = false }: CardHeaderProps) {
  return (
    <div
      className={cn(
        'p-6 border-b border-gray-100',
        gradient && 'bg-gradient-to-r from-rose-50 to-pink-50',
        className
      )}
    >
      {children}
    </div>
  )
}

interface CardContentProps {
  children: React.ReactNode
  className?: string
  padding?: 'sm' | 'md' | 'lg' | 'xl'
}

export function CardContentEnhanced({ 
  children, 
  className, 
  padding = 'md' 
}: CardContentProps) {
  const getPaddingStyles = () => {
    switch (padding) {
      case 'sm':
        return 'p-4'
      case 'lg':
        return 'p-8'
      case 'xl':
        return 'p-10'
      default:
        return 'p-6'
    }
  }

  return (
    <div className={cn(getPaddingStyles(), className)}>
      {children}
    </div>
  )
}