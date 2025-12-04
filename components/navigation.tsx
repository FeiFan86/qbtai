'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from './ui/button'
import { 
  Heart, 
  MessageCircle, 
  Gamepad2, 
  Sparkles, 
  Users, 
  BarChart3, 
  User, 
  Menu, 
  X, 
  Star,
  Target,
  Award
} from 'lucide-react'

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 重新设计的导航项，专注于情侣互动游戏
  const navItems = [
    { 
      href: '/games', 
      label: '互动游戏', 
      icon: <Gamepad2 className="h-4 w-4" />,
      description: '多种有趣的情侣游戏'
    },
    { 
      href: '/emotion-analysis', 
      label: '情感分析', 
      icon: <Heart className="h-4 w-4" />,
      description: 'AI智能情感分析'
    },
    { 
      href: '/social-assistant', 
      label: '社交助手', 
      icon: <MessageCircle className="h-4 w-4" />,
      description: '沟通技巧指导'
    },
    { 
      href: '/content-creation', 
      label: '内容创作', 
      icon: <Sparkles className="h-4 w-4" />,
      description: '情感内容创作'
    },
    { 
      href: '/data-visualization', 
      label: '数据洞察', 
      icon: <BarChart3 className="h-4 w-4" />,
      description: '互动数据分析'
    },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-lg border-b border-rose-100/40 shadow-lg' 
        : 'bg-white/80 backdrop-blur-sm border-b border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* 品牌标识 - 现代化设计 */}
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                  <Heart className="h-5 w-5 lg:h-6 lg:w-6 text-white" fill="currentColor" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div className="hidden sm:block">
                <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                  丘比特AI
                </span>
                <span className="block text-xs text-gray-500 -mt-1">情感互动平台</span>
              </div>
            </Link>
          </div>

          {/* 桌面导航 - 现代化卡片式设计 */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative flex flex-col items-center px-4 py-2 rounded-xl transition-all duration-300 ${
                  isActive(item.href)
                    ? 'bg-gradient-to-r from-rose-50 to-pink-50 text-rose-700 shadow-md'
                    : 'text-gray-600 hover:text-rose-600 hover:bg-white/50'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <div className={`p-2 rounded-lg transition-colors duration-300 ${
                    isActive(item.href) 
                      ? 'bg-rose-100 text-rose-600' 
                      : 'bg-gray-100 text-gray-500 group-hover:bg-rose-100 group-hover:text-rose-600'
                  }`}>
                    {item.icon}
                  </div>
                  <span className="font-medium text-sm">{item.label}</span>
                </div>
                <div className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-rose-500 to-pink-500 transition-all duration-300 ${
                  isActive(item.href) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}></div>
              </Link>
            ))}
          </nav>

          {/* 右侧操作区域 */}
          <div className="flex items-center space-x-3">
            {/* 用户状态指示器 */}
            <div className="hidden sm:flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-50 text-gray-600">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">在线</span>
            </div>
            
            {/* 用户操作按钮 */}
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="sm"
                className="text-gray-600 hover:text-rose-600 hover:bg-rose-50"
                onClick={() => window.location.href = '/login'}
              >
                登录
              </Button>
              <Button 
                size="sm"
                className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white shadow-lg"
                onClick={() => window.location.href = '/register'}
              >
                注册
              </Button>
            </div>

            {/* 移动端菜单按钮 */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* 移动端菜单 - 现代化设计 */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-rose-100/40 bg-white/95 backdrop-blur-lg">
            <div className="py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                    isActive(item.href)
                      ? 'bg-gradient-to-r from-rose-50 to-pink-50 text-rose-700 shadow-sm'
                      : 'text-gray-600 hover:text-rose-600 hover:bg-rose-50'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${
                    isActive(item.href) 
                      ? 'bg-rose-100 text-rose-600' 
                      : 'bg-gray-100 text-gray-500'
                  }`}>
                    {item.icon}
                  </div>
                  <div>
                    <div className="font-medium">{item.label}</div>
                    <div className="text-xs text-gray-500">{item.description}</div>
                  </div>
                </Link>
              ))}
              
              {/* 移动端操作按钮 */}
              <div className="flex space-x-2 pt-2 border-t border-rose-100/40">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex-1 text-gray-600 border-gray-200"
                  onClick={() => {
                    window.location.href = '/login'
                    setIsMobileMenuOpen(false)
                  }}
                >
                  登录
                </Button>
                <Button 
                  size="sm"
                  className="flex-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white"
                  onClick={() => {
                    window.location.href = '/register'
                    setIsMobileMenuOpen(false)
                  }}
                >
                  注册
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}