'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { Heart, User, LogOut, Menu, X, Settings, Award } from 'lucide-react'
import { useAuth } from '@/components/auth-provider'
import LoginModal from './login-modal'

interface GlobalNavbarProps {
  className?: string
}

export default function GlobalNavbar({ className = '' }: GlobalNavbarProps) {
  const { user, isAuthenticated, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)

  // 判断当前页面是否是主要功能页面
  const isFeaturePage = [
    '/emotion-analysis',
    '/social-assistant',
    '/content-creation',
    '/emotion-diary',
    '/data-insights',
    '/games'
  ].includes(pathname)

  const handleLogout = async () => {
    try {
      logout()
      router.push('/')
    } catch (error) {
      console.error('登出失败:', error)
    }
  }

  const navItems = [
    { name: '情感分析', href: '/emotion-analysis', icon: <Heart className="h-4 w-4" /> },
    { name: '社交助手', href: '/social-assistant', icon: <User className="h-4 w-4" /> },
    { name: '内容创作', href: '/content-creation', icon: <Heart className="h-4 w-4" /> },
    { name: '情感日记', href: '/emotion-diary', icon: <Heart className="h-4 w-4" /> },
    { name: '数据洞察', href: '/data-insights', icon: <Award className="h-4 w-4" /> },
    { name: '互动游戏', href: '/games', icon: <Heart className="h-4 w-4" /> },
  ]

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 ${className}`}>
        <div className="container">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full flex items-center justify-center">
                <Heart className="h-4 w-4 text-white" fill="currentColor" />
              </div>
              <span className="text-lg font-bold text-gray-900">丘比特AI</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {/* 功能页面导航 */}
              {isFeaturePage && (
                <div className="flex items-center space-x-6 mr-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center space-x-2 text-sm font-medium transition-colors ${
                        pathname === item.href
                          ? 'text-rose-600'
                          : 'text-gray-600 hover:text-rose-600'
                      }`}
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </Link>
                  ))}
                </div>
              )}

              {/* 用户状态 */}
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <Link 
                    href="/profile" 
                    className="flex items-center space-x-2 text-gray-600 hover:text-rose-600 transition-colors"
                  >
                    <User className="h-4 w-4" />
                    <span className="text-sm font-medium">
                      {user?.name || user?.username || '用户'}
                    </span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-gray-600 hover:text-rose-600 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="text-sm font-medium">退出</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={() => setShowLoginModal(true)}
                    className="text-gray-600 hover:text-rose-600 transition-colors font-medium"
                  >
                    登录
                  </button>
                  <Link 
                    href="/register" 
                    className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:from-rose-600 hover:to-pink-600 transition-all text-sm font-medium"
                  >
                    立即体验
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-600 hover:text-rose-600 focus:outline-none"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-white border-t border-gray-100 pb-4">
              {/* 功能页面导航 */}
              {isFeaturePage && (
                <div className="px-4 py-3 space-y-3">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center space-x-3 w-full px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        pathname === item.href
                          ? 'text-rose-600 bg-rose-50'
                          : 'text-gray-600 hover:text-rose-600 hover:bg-rose-50'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </Link>
                  ))}
                </div>
              )}

              {/* 用户状态 */}
              <div className="px-4 py-3 border-t border-gray-100">
                {isAuthenticated ? (
                  <div className="space-y-3">
                    <Link
                      href="/profile"
                      className="flex items-center space-x-3 w-full px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <User className="h-4 w-4" />
                      <span>个人中心</span>
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout()
                        setMobileMenuOpen(false)
                      }}
                      className="flex items-center space-x-3 w-full px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>退出登录</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <button
                      onClick={() => {
                        setShowLoginModal(true)
                        setMobileMenuOpen(false)
                      }}
                      className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-600 hover:text-rose-600 hover:border-rose-600 transition-colors"
                    >
                      登录
                    </button>
                    <Link
                      href="/register"
                      className="flex items-center justify-center w-full px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-md text-sm font-medium hover:from-rose-600 hover:to-pink-600 transition-all"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      立即体验
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* 登录弹窗 */}
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />
    </>
  )
}