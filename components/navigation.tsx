'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from './ui/button'
import { Heart, MessageCircle, BarChart3, User, Menu, X, Sparkles } from 'lucide-react'

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
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive(item.href)
                  ? 'bg-pink-50 text-pink-700 shadow-sm'
                  : 'text-foreground/70 hover:text-foreground hover:bg-accent'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* 右侧操作区域 */}
        <div className="flex flex-1 items-center justify-end space-x-3">
          <Button variant="pink" size="lg" className="btn-glow hidden sm:flex" asChild>
            <Link href="/emotion-analysis" className="flex items-center space-x-2">
              <MessageCircle className="h-4 w-4" />
              <span>开始分析</span>
            </Link>
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
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-all ${
                  isActive(item.href)
                    ? 'bg-pink-50 text-pink-700'
                    : 'text-foreground/70 hover:text-foreground hover:bg-accent'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
            <div className="pt-2 border-t border-border/40">
              <Button variant="pink" className="w-full btn-glow" asChild>
                <Link href="/emotion-analysis" onClick={() => setIsMobileMenuOpen(false)}>
                  <MessageCircle className="h-4 w-4 mr-2" />
                  开始情感分析
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}