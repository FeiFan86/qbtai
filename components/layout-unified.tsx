'use client'

import React, { ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { Heart } from 'lucide-react'

interface UnifiedLayoutProps {
  children: ReactNode
  title: string
  subtitle: string
  showAuthButtons?: boolean
  showBackButton?: boolean
  icon?: ReactNode
  extraActions?: ReactNode
}

export function UnifiedLayout({ 
  children, 
  title, 
  subtitle,
  showAuthButtons = true,
  showBackButton = false,
  icon,
  extraActions
}: UnifiedLayoutProps) {
  const router = useRouter()
  const [isVisible, setIsVisible] = React.useState(false)

  React.useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 动态背景 - 与首页保持一致 */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-white to-pink-50"></div>
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-rose-300 to-pink-300 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-pink-300 to-rose-300 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-r from-rose-200 to-pink-200 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-gradient-to-r from-pink-200 to-rose-200 rounded-full blur-3xl animate-float"></div>
      </div>

      {/* 导航栏 */}
      <nav className={`navbar safe-top transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'}`}>
        <div className="container">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                  <Heart className="h-5 w-5 text-white" fill="currentColor" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div>
                <span className="text-xl font-bold text-gradient">丘比特AI</span>
                <span className="block text-xs text-gray-500 -mt-1">情感互动平台</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {showBackButton && (
                <button 
                  onClick={() => router.back()}
                  className="text-gray-600 hover:text-rose-600 transition-colors font-medium"
                >
                  返回
                </button>
              )}
              {showAuthButtons ? (
                <>
                  <button 
                    onClick={() => router.push('/login')}
                    className="text-gray-600 hover:text-rose-600 transition-colors font-medium"
                  >
                    登录
                  </button>
                  <button 
                    onClick={() => router.push('/register')}
                    className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-2 rounded-lg text-base font-medium hover:from-rose-600 hover:to-pink-600 transition-all"
                  >
                    立即体验
                  </button>
                </>
              ) : (
                extraActions
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* 主要内容区域 */}
      <div className="relative z-10">
        {/* 页面标题区域 */}
        <div className={`container py-16 transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          <div className="text-center max-w-4xl mx-auto space-y-8">
            {/* 标签 */}
            {icon && (
              <div className="inline-flex items-center px-4 py-2 rounded-full glass">
                {icon}
                <span className="text-sm font-medium text-gray-700 ml-2">{subtitle}</span>
              </div>
            )}

            {/* 主标题 */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance">
                <span className="block text-gray-900">{title}</span>
                <span className="text-gradient mt-2 block">{subtitle}</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 text-pretty leading-relaxed">
                {subtitle}，
                <span className="text-primary-600 font-semibold">让每一次互动都充满意义</span>
              </p>
            </div>
          </div>
        </div>

        {/* 页面内容 */}
        {children}
      </div>

      {/* 页脚 */}
      <footer className={`footer relative z-10 transition-all duration-1000 delay-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
        <div className="container py-12">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full flex items-center justify-center">
                <Heart className="h-5 w-5 text-white" fill="currentColor" />
              </div>
              <span className="text-xl font-bold text-gray-900">丘比特AI情感助手</span>
            </div>
            <p className="text-gray-600 max-w-md mx-auto text-pretty">
              © 2024 专为情侣设计的互动游戏平台. 让爱更美好.
            </p>
            <div className="flex justify-center space-x-6">
              <a href="#" className="text-gray-500 hover:text-rose-600 transition-colors">隐私政策</a>
              <a href="#" className="text-gray-500 hover:text-rose-600 transition-colors">服务条款</a>
              <a href="#" className="text-gray-500 hover:text-rose-600 transition-colors">联系我们</a>
            </div>
            <p className="text-sm text-gray-500">
              当前版本: v2.0.0 | 用心创造每一份感动
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}