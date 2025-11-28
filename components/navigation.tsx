'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from './ui/button'
import { Heart, MessageCircle, BarChart3, User, Menu, X, Sparkles, History } from 'lucide-react'
import { HistoryViewer } from './history-viewer'

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isHistoryOpen, setIsHistoryOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: '/emotion-analysis', label: '情感分析', icon: <Heart className="h-4 w-4" /> },
    { href: '/social-assistant', label: '社交助手', icon: <MessageCircle className="h-4 w-4" /> },
    { href: '/emotion-diary', label: '情感日记', icon: <BarChart3 className="h-4 w-4" /> },
    { href: '/content-creation', label: '内容创作', icon: <Sparkles className="h-4 w-4" /> },
    { href: '/data-visualization', label: '数据洞察', icon: <BarChart3 className="h-4 w-4" /> },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      isScrolled 
        ? 'bg-background/95 backdrop-blur-md border-b border-border/40 shadow-sm' 
        : 'bg-background/80 backdrop-blur-sm border-b border-transparent'
    }`}>
      <div className="container flex h-16 max-w-screen-2xl items-center">
        {/* 品牌标识 */}
        <div className="flex items-center space-x-2 mr-8">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <Heart className="h-7 w-7 text-pink-500 transition-transform group-hover:scale-110" />
              <div className="absolute -inset-1 bg-pink-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
            </div>
            <span className="font-bold text-xl gradient-text hidden sm:block">
              丘比特AI
            </span>
          </Link>
        </div>

        {/* 桌面导航 */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => {
            // 处理情感分析页面的直接定位
            const handleClick = (e: React.MouseEvent) => {
              if (item.href === '/emotion-analysis') {
                e.preventDefault()
                
                // 使用路由跳转而不是锚点
                if (pathname === '/emotion-analysis') {
                  // 如果已经在情感分析页面，直接滚动到目标区域
                  const element = document.getElementById('emotion-analysis-center')
                  if (element) {
                    const offset = 80 // 导航栏高度
                    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
                    const offsetPosition = elementPosition - offset
                    
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    })
                  }
                } else {
                  // 导航到情感分析页面，使用URL参数标记需要滚动
                  window.location.href = '/emotion-analysis?scrollToCenter=true'
                }
              }
            }
            
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleClick}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(item.href)
                    ? 'bg-pink-50 text-pink-700 shadow-sm'
                    : 'text-foreground/70 hover:text-foreground hover:bg-accent'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* 右侧操作区域 */}
        <div className="flex flex-1 items-center justify-end space-x-3">
          {/* GitHub 链接 */}
          <Button variant="ghost" size="icon" asChild>
            <a href="https://github.com/FeiFan86/qbtai" target="_blank" rel="noopener noreferrer">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span className="sr-only">GitHub 仓库</span>
            </a>
          </Button>
          
          {/* 历史记录按钮 */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsHistoryOpen(true)}
            title="查看历史记录"
          >
            <History className="h-5 w-5" />
            <span className="sr-only">历史记录</span>
          </Button>
          
          <Button variant="ghost" size="icon" className="relative">
            <User className="h-5 w-5" />
            <span className="sr-only">用户中心</span>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-background"></div>
          </Button>

          {/* 移动端菜单按钮 */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* 移动端菜单 */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-md">
          <div className="container py-4 space-y-2">
            {navItems.map((item) => {
              // 处理情感分析页面的直接定位（移动端）
              const handleClick = (e: React.MouseEvent) => {
                if (item.href === '/emotion-analysis') {
                  e.preventDefault()
                  
                  // 使用路由跳转而不是锚点
                  if (pathname === '/emotion-analysis') {
                    // 如果已经在情感分析页面，直接滚动到目标区域
                    const element = document.getElementById('emotion-analysis-center')
                    if (element) {
                      const offset = 80 // 导航栏高度
                      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
                      const offsetPosition = elementPosition - offset
                      
                      window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                      })
                    }
                  } else {
                    // 导航到情感分析页面，使用URL参数标记需要滚动
                    window.location.href = '/emotion-analysis?scrollToCenter=true'
                  }
                }
                setIsMobileMenuOpen(false)
              }
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handleClick}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-all ${
                    isActive(item.href)
                      ? 'bg-pink-50 text-pink-700'
                      : 'text-foreground/70 hover:text-foreground hover:bg-accent'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </div>
        </div>
      )}

      {/* 历史记录弹窗 */}
      <HistoryViewer 
        isOpen={isHistoryOpen} 
        onClose={() => setIsHistoryOpen(false)}
      />
    </header>
  )
}