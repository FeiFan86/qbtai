'use client'

import { ReactNode } from 'react'

// 移动端优化容器组件
export function MobileOptimizedContainer({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`
      w-full max-w-full
      px-4 sm:px-6 md:px-8
      mx-auto
      overflow-x-hidden
      ${className}
    `}>
      {children}
    </div>
  )
}

// 响应式网格布局组件
export function ResponsiveGrid({ 
  children, 
  className = '',
  cols = {
    default: 1,
    xs: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5
  } 
}: { 
  children: ReactNode; 
  className?: string;
  cols?: Record<string, number>;
}) {
  const gridClass = Object.entries(cols)
    .map(([breakpoint, colCount]) => {
      if (breakpoint === 'default') {
        return `grid-cols-${colCount}`
      }
      return `${breakpoint}:grid-cols-${colCount}`
    })
    .join(' ')

  return (
    <div className={`
      grid 
      gap-4 sm:gap-6
      ${gridClass}
      ${className}
    `}>
      {children}
    </div>
  )
}

// 移动端友好的按钮组件
export function MobileFriendlyButton({ 
  children, 
  className = '',
  size = 'default' 
}: { 
  children: ReactNode; 
  className?: string;
  size?: 'sm' | 'default' | 'lg';
}) {
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm min-h-[36px]',
    default: 'px-4 py-3 text-base min-h-[44px]',
    lg: 'px-6 py-4 text-lg min-h-[52px]'
  }

  return (
    <button className={`
      relative
      inline-flex items-center justify-center
      font-medium
      rounded-lg
      transition-all duration-200
      active:scale-95
      focus:outline-none focus:ring-2 focus:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed
      ${sizeClasses[size]}
      ${className}
    `}>
      {children}
    </button>
  )
}

// 移动端触摸友好的卡片组件
export function TouchFriendlyCard({ 
  children, 
  className = '',
  interactive = false 
}: { 
  children: ReactNode; 
  className?: string;
  interactive?: boolean;
}) {
  return (
    <div className={`
      bg-white
      rounded-xl
      shadow-sm
      border border-gray-100
      transition-all duration-200
      ${interactive ? 'hover:shadow-md active:shadow-sm active:scale-[0.98] cursor-pointer' : ''}
      overflow-hidden
      ${className}
    `}>
      {children}
    </div>
  )
}

// 响应式文本组件
export function ResponsiveText({ 
  children, 
  className = '',
  size = 'base' 
}: { 
  children: ReactNode; 
  className?: string;
  size?: 'sm' | 'base' | 'lg' | 'xl' | '2xl';
}) {
  const sizeClasses = {
    sm: 'text-xs xs:text-sm',
    base: 'text-sm xs:text-base',
    lg: 'text-base xs:text-lg',
    xl: 'text-lg xs:text-xl',
    '2xl': 'text-xl xs:text-2xl'
  }

  return (
    <span className={`
      ${sizeClasses[size]}
      leading-relaxed
      ${className}
    `}>
      {children}
    </span>
  )
}

// 移动端优化的表单输入组件
export function MobileInput({ 
  type = 'text',
  placeholder = '',
  value = '',
  onChange,
  className = ''
}: {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      className={`
        w-full
        px-4 py-3
        text-base
        border border-gray-200
        rounded-lg
        focus:outline-none focus:ring-2 focus:ring-purple-500
        focus:border-transparent
        transition-all duration-200
        bg-white
        ${className}
      `}
    />
  )
}

// 移动端优化的导航栏组件
export function MobileNav({ children }: { children: ReactNode }) {
  return (
    <nav className="
      fixed bottom-0 left-0 right-0
      bg-white/95 backdrop-blur-lg
      border-t border-gray-200
      z-50
      safe-bottom
    ">
      <div className="
        flex items-center justify-around
        px-4 py-3
        max-w-md mx-auto
      ">
        {children}
      </div>
    </nav>
  )
}

// 安全区域处理（针对带刘海的手机）
export function SafeArea({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`
      pt-safe-top
      pb-safe-bottom
      ${className}
    `}>
      {children}
    </div>
  )
}

// 移动端优化的加载状态组件
export function MobileLoading({ size = 'default' }: { size?: 'sm' | 'default' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    default: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  return (
    <div className="flex items-center justify-center p-8">
      <div className={`
        animate-spin
        rounded-full
        border-2 border-gray-200 border-t-purple-600
        ${sizeClasses[size]}
      `} />
    </div>
  )
}

// CSS 变量定义（用于处理安全区域）
export const MobileStyles = () => (
  <style jsx global>{`
    :root {
      --safe-top: env(safe-area-inset-top, 0px);
      --safe-bottom: env(safe-area-inset-bottom, 0px);
      --safe-left: env(safe-area-inset-left, 0px);
      --safe-right: env(safe-area-inset-right, 0px);
    }
    
    .pt-safe-top {
      padding-top: var(--safe-top);
    }
    
    .pb-safe-bottom {
      padding-bottom: var(--safe-bottom);
    }
    
    .pl-safe-left {
      padding-left: var(--safe-left);
    }
    
    .pr-safe-right {
      padding-right: var(--safe-right);
    }
    
    .safe-bottom {
      padding-bottom: var(--safe-bottom);
    }
    
    /* 移动端优化滚动 */
    .mobile-scroll {
      -webkit-overflow-scrolling: touch;
      scroll-behavior: smooth;
    }
    
    /* 移动端优化动画 */
    @media (prefers-reduced-motion: reduce) {
      * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    }
    
    /* 移动端优化字体渲染 */
    html {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-rendering: optimizeLegibility;
    }
    
    /* 移动端优化点击效果 */
    @media (hover: none) and (pointer: coarse) {
      button, a {
        -webkit-tap-highlight-color: transparent;
      }
    }
  `}</style>
)