'use client'

import React, { useState, useEffect } from 'react'
import { EnhancedNavigation } from './navigation-enhanced'
import { BreadcrumbNavigation, getBreadcrumbForPath } from './breadcrumb-navigation'
import { usePathname } from 'next/navigation'

interface EnhancedLayoutProps {
  children: React.ReactNode
  showBreadcrumb?: boolean
  className?: string
}

export function EnhancedLayout({ 
  children, 
  showBreadcrumb = true,
  className 
}: EnhancedLayoutProps) {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    setIsVisible(true)
    
    // 处理滚动效果
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const breadcrumbItems = getBreadcrumbForPath(pathname)

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      {/* 增强背景装饰元素 */}
      <div className="fixed inset-0 bg-gradient-to-br from-rose-100/20 via-pink-100/20 to-purple-100/20 pointer-events-none" />
      <div className="fixed top-10 left-10 w-72 h-72 bg-gradient-to-r from-rose-300/30 to-pink-300/30 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div className="fixed bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-purple-300/30 to-blue-300/30 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div className="fixed top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-orange-300/20 to-red-300/20 rounded-full blur-3xl animate-pulse delay-300 pointer-events-none" />
      <div className="fixed bottom-1/3 left-1/3 w-80 h-80 bg-gradient-to-r from-yellow-300/20 to-amber-300/20 rounded-full blur-3xl animate-pulse delay-700 pointer-events-none" />

      {/* 增强导航栏 */}
      <EnhancedNavigation />

      {/* 主内容区域 */}
      <main className={`pt-16 relative z-10 ${className}`}>
        {/* 面包屑导航 */}
        {showBreadcrumb && breadcrumbItems.length > 0 && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <BreadcrumbNavigation items={breadcrumbItems} />
          </div>
        )}

        {/* 页面内容 */}
        <div className={`transition-all duration-700 delay-200 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          {children}
        </div>
      </main>

      {/* 增强页脚 */}
      <footer className={`relative z-10 bg-white/70 backdrop-blur-md border-t border-white/20 mt-16 transition-all duration-500 delay-800 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* 公司信息 */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full flex items-center justify-center">
                  <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                    <div className="w-2.5 h-2.5 bg-rose-500 rounded-full"></div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">丘比特AI</h3>
                  <p className="text-sm text-gray-500">情感互动平台</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4 max-w-md">
                专为情侣设计的互动游戏平台，通过精心设计的游戏和活动，增进感情深度，创造美好回忆。
              </p>
              <div className="flex space-x-4">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>系统运行正常</span>
                </div>
                <div className="text-sm text-gray-500">
                  版本: v2.0.0
                </div>
              </div>
            </div>

            {/* 快速链接 */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">功能导航</h4>
              <ul className="space-y-2">
                <li>
                  <a href="/games" className="text-gray-600 hover:text-rose-600 transition-colors">
                    游戏中心
                  </a>
                </li>
                <li>
                  <a href="/emotion-analysis" className="text-gray-600 hover:text-rose-600 transition-colors">
                    情感分析
                  </a>
                </li>
                <li>
                  <a href="/content-creation" className="text-gray-600 hover:text-rose-600 transition-colors">
                    内容创作
                  </a>
                </li>
                <li>
                  <a href="/social-assistant" className="text-gray-600 hover:text-rose-600 transition-colors">
                    社交助手
                  </a>
                </li>
              </ul>
            </div>

            {/* 支持与帮助 */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">支持与帮助</h4>
              <ul className="space-y-2">
                <li>
                  <a href="/help" className="text-gray-600 hover:text-rose-600 transition-colors">
                    使用帮助
                  </a>
                </li>
                <li>
                  <a href="/contact" className="text-gray-600 hover:text-rose-600 transition-colors">
                    联系我们
                  </a>
                </li>
                <li>
                  <a href="/privacy" className="text-gray-600 hover:text-rose-600 transition-colors">
                    隐私政策
                  </a>
                </li>
                <li>
                  <a href="/terms" className="text-gray-600 hover:text-rose-600 transition-colors">
                    服务条款
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* 版权信息 */}
          <div className="border-t border-gray-200 mt-8 pt-8 text-center">
            <p className="text-gray-600">
              © 2024 丘比特AI情感助手. 让爱更美好.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              用心创造每一份感动 | 
              <a href="#" className="hover:text-rose-600 transition-colors">隐私政策</a> | 
              <a href="#" className="hover:text-rose-600 transition-colors">服务条款</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}