'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ResponsiveLayoutProps {
  children: ReactNode
  className?: string
  mobileClassName?: string
  tabletClassName?: string
  desktopClassName?: string
}

export function ResponsiveLayout({ 
  children, 
  className = '',
  mobileClassName = '',
  tabletClassName = '',
  desktopClassName = ''
}: ResponsiveLayoutProps) {
  return (
    <div className={cn(
      // 移动端默认样式
      'w-full max-w-full px-4 mx-auto',
      // 平板端
      'md:max-w-3xl md:px-6',
      // 桌面端
      'lg:max-w-6xl lg:px-8',
      // 自定义类名
      className,
      mobileClassName,
      tabletClassName,
      desktopClassName
    )}>
      {children}
    </div>
  )
}

interface GridLayoutProps {
  children: ReactNode
  className?: string
  cols?: {
    mobile?: number
    tablet?: number
    desktop?: number
  }
  gap?: {
    mobile?: string
    tablet?: string
    desktop?: string
  }
}

export function GridLayout({ 
  children, 
  className = '',
  cols = { mobile: 1, tablet: 2, desktop: 3 },
  gap = { mobile: 'gap-4', tablet: 'gap-6', desktop: 'gap-8' }
}: GridLayoutProps) {
  return (
    <div className={cn(
      'grid',
      // 移动端
      `grid-cols-${cols.mobile || 1}`,
      gap.mobile || 'gap-4',
      // 平板端
      `md:grid-cols-${cols.tablet || 2}`,
      `md:${gap.tablet || 'gap-6'}`,
      // 桌面端
      `lg:grid-cols-${cols.desktop || 3}`,
      `lg:${gap.desktop || 'gap-8'}`,
      className
    )}>
      {children}
    </div>
  )
}

interface TouchButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  disabled?: boolean
}

export function TouchButton({ 
  children, 
  onClick, 
  variant = 'default',
  size = 'md',
  className = '',
  disabled = false
}: TouchButtonProps) {
  const baseClasses = cn(
    // 基础样式
    'inline-flex items-center justify-center font-medium transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'active:scale-95',
    // 触摸优化
    'min-h-[44px] min-w-[44px]', // 最小触摸目标尺寸
    'touch-manipulation', // 禁用双击缩放
    // 变体
    variant === 'default' && 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    variant === 'outline' && 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-blue-500',
    variant === 'ghost' && 'text-gray-600 hover:bg-gray-100 focus:ring-blue-500',
    // 尺寸
    size === 'sm' && 'px-3 py-2 text-sm',
    size === 'md' && 'px-4 py-2 text-base',
    size === 'lg' && 'px-6 py-3 text-lg',
    // 禁用状态
    disabled && 'opacity-50 cursor-not-allowed',
    className
  )

  return (
    <button 
      className={baseClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

interface SwipeContainerProps {
  children: ReactNode
  className?: string
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  threshold?: number
}

export function SwipeContainer({ 
  children, 
  className = '',
  onSwipeLeft,
  onSwipeRight,
  threshold = 50
}: SwipeContainerProps) {
  let touchStartX = 0
  let touchEndX = 0

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX = e.changedTouches[0].clientX
    handleSwipe()
  }

  const handleSwipe = () => {
    const swipeDistance = touchEndX - touchStartX
    
    if (Math.abs(swipeDistance) > threshold) {
      if (swipeDistance > 0 && onSwipeRight) {
        onSwipeRight()
      } else if (swipeDistance < 0 && onSwipeLeft) {
        onSwipeLeft()
      }
    }
  }

  return (
    <div 
      className={cn('touch-pan-y', className)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {children}
    </div>
  )
}

// 移动端优化的卡片组件
interface MobileCardProps {
  children: ReactNode
  className?: string
  clickable?: boolean
}

export function MobileCard({ children, className = '', clickable = false }: MobileCardProps) {
  return (
    <div className={cn(
      'bg-white rounded-lg shadow-sm border border-gray-200',
      'p-4 md:p-6', // 移动端更紧凑的padding
      clickable && 'cursor-pointer hover:shadow-md transition-shadow',
      className
    )}>
      {children}
    </div>
  )
}

// 响应式文本组件
interface ResponsiveTextProps {
  children: ReactNode
  className?: string
  mobileSize?: string
  tabletSize?: string
  desktopSize?: string
}

export function ResponsiveText({ 
  children, 
  className = '',
  mobileSize = 'text-sm',
  tabletSize = 'text-base',
  desktopSize = 'text-lg'
}: ResponsiveTextProps) {
  return (
    <div className={cn(
      mobileSize,
      `md:${tabletSize}`,
      `lg:${desktopSize}`,
      className
    )}>
      {children}
    </div>
  )
}