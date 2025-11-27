'use client'

import Link from 'next/link'
import { Button } from './ui/button'
import { Heart, MessageCircle, BarChart3, User } from 'lucide-react'

export function Navigation() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Heart className="h-6 w-6 text-pink-500" />
            <span className="hidden font-bold sm:inline-block gradient-text">
              丘比特AI
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/emotion-analysis"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              情感分析
            </Link>
            <Link
              href="/social-assistant"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              社交助手
            </Link>
            <Link
              href="/emotion-diary"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              情感日记
            </Link>
            <Link
              href="/content-creation"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              内容创作
            </Link>
            <Link
              href="/data-visualization"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              数据洞察
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Button variant="pink" asChild>
              <Link href="/emotion-analysis">
                <MessageCircle className="mr-2 h-4 w-4" />
                开始分析
              </Link>
            </Button>
          </div>
          <nav className="flex items-center">
            <Button variant="ghost" size="icon">
              <User className="h-4 w-4" />
              <span className="sr-only">用户中心</span>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}