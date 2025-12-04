'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { 
  Heart, 
  Menu, 
  X, 
  Gamepad2, 
  Brain, 
  PenTool, 
  MessageCircle, 
  User, 
  Bell,
  Search,
  ChevronDown,
  Home,
  Trophy,
  Settings,
  LogOut
} from 'lucide-react'

interface NavigationItem {
  title: string
  href: string
  icon: React.ReactNode
  description?: string
  badge?: string
  active?: boolean
}

const navigationItems: NavigationItem[] = [
  {
    title: '首页',
    href: '/',
    icon: <Home className="h-4 w-4" />,
    description: '返回主页'
  },
  {
    title: '游戏中心',
    href: '/games',
    icon: <Gamepad2 className="h-4 w-4" />,
    description: '探索互动游戏',
    badge: '热门'
  },
  {
    title: '情感分析',
    href: '/emotion-analysis',
    icon: <Brain className="h-4 w-4" />,
    description: 'AI智能分析'
  },
  {
    title: '内容创作',
    href: '/content-creation',
    icon: <PenTool className="h-4 w-4" />,
    description: 'AI内容生成'
  },
  {
    title: '情感日记',
    href: '/emotion-diary',
    icon: <MessageCircle className="h-4 w-4" />,
    description: '记录情感历程'
  },
  {
    title: '社交助手',
    href: '/social-assistant',
    icon: <MessageCircle className="h-4 w-4" />,
    description: '改善沟通技巧'
  }
]

export function EnhancedNavigation() {
  const router = useRouter()
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const userMenuRef = useRef<HTMLDivElement>(null)
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

  // 处理点击外部关闭用户菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogin = () => {
    router.push('/login')
  }

  const handleRegister = () => {
    router.push('/register')
  }

  const handleDashboard = () => {
    router.push('/dashboard')
  }

  const isItemActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-lg shadow-lg border-b border-gray-100' : 'bg-white/70 backdrop-blur-md border-b border-white/20'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo区域 */}
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Heart className="h-5 w-5 text-white" fill="currentColor" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                  丘比特AI
                </span>
                <span className="block text-xs text-gray-500 -mt-1">情感互动平台</span>
              </div>
            </Link>
          </div>

          {/* 桌面端主导航 */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={`group relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isItemActive(item.href)
                    ? 'text-rose-600 bg-rose-50'
                    : 'text-gray-600 hover:text-rose-600 hover:bg-rose-50'
                }`}
              >
                <div className="flex items-center space-x-2">
                  {item.icon}
                  <span>{item.title}</span>
                  {item.badge && (
                    <Badge variant="secondary" className="ml-1 text-xs bg-rose-100 text-rose-700">
                      {item.badge}
                    </Badge>
                  )}
                </div>
                
                {/* 悬停时显示描述 */}
                <div className="absolute top-full left-0 mt-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                  {item.description}
                </div>
              </Link>
            ))}
          </div>

          {/* 用户操作区 */}
          <div className="flex items-center space-x-3">
            {/* 搜索按钮 */}
            <Button variant="ghost" size="sm" className="hidden md:flex items-center space-x-2 text-gray-600 hover:text-rose-600">
              <Search className="h-4 w-4" />
              <span>搜索</span>
            </Button>

            {/* 通知按钮 */}
            <Button variant="ghost" size="sm" className="relative text-gray-600 hover:text-rose-600">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </Button>

            {/* 用户菜单 */}
            <div className="relative" ref={userMenuRef}>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 text-gray-600 hover:text-rose-600"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatars/user.png" alt="用户头像" />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
              </Button>

              {/* 用户下拉菜单 */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <Link
                    href="/dashboard"
                    className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <User className="h-4 w-4" />
                    <span>个人中心</span>
                  </Link>
                  <Link
                    href="/achievements"
                    className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Trophy className="h-4 w-4" />
                    <span>我的成就</span>
                  </Link>
                  <Link
                    href="/settings"
                    className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Settings className="h-4 w-4" />
                    <span>设置</span>
                  </Link>
                  <hr className="my-2" />
                  <button className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                    <LogOut className="h-4 w-4" />
                    <span>退出登录</span>
                  </button>
                </div>
              )}
            </div>

            {/* 未登录状态按钮 */}
            <div className="hidden md:flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleLogin}
                className="text-gray-600 hover:text-rose-600 transition-colors"
              >
                登录
              </Button>
              <Button 
                size="sm"
                onClick={handleRegister}
                className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                立即体验
              </Button>
            </div>

            {/* 移动端菜单按钮 */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-gray-600 hover:text-rose-600"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* 移动端菜单 */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-lg border-t border-gray-200">
          <div className="px-4 py-3 space-y-2">
            {navigationItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isItemActive(item.href)
                    ? 'text-rose-600 bg-rose-50'
                    : 'text-gray-600 hover:text-rose-600 hover:bg-rose-50'
                }`}
              >
                {item.icon}
                <span>{item.title}</span>
                {item.badge && (
                  <Badge variant="secondary" className="ml-auto text-xs bg-rose-100 text-rose-700">
                    {item.badge}
                  </Badge>
                )}
              </Link>
            ))}
            
            {/* 移动端用户操作 */}
            <hr className="my-3" />
            <div className="space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-600 hover:text-rose-600"
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  handleLogin()
                }}
              >
                <User className="h-4 w-4 mr-3" />
                登录
              </Button>
              <Button
                className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600"
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  handleRegister()
                }}
              >
                立即体验
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}