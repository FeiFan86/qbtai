'use client'

import React from 'react'
import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BreadcrumbItem {
  title: string
  href?: string
  icon?: React.ReactNode
}

interface BreadcrumbNavigationProps {
  items: BreadcrumbItem[]
  className?: string
}

export function BreadcrumbNavigation({ items, className }: BreadcrumbNavigationProps) {
  return (
    <nav className={cn("flex items-center space-x-2 text-sm text-gray-600 py-4", className)}>
      {/* 首页链接 */}
      <Link
        href="/"
        className="flex items-center space-x-1 text-gray-600 hover:text-rose-600 transition-colors"
      >
        <Home className="h-4 w-4" />
        <span>首页</span>
      </Link>

      {/* 面包屑项目 */}
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="h-4 w-4 text-gray-400" />
          {item.href ? (
            <Link
              href={item.href}
              className="flex items-center space-x-1 text-gray-600 hover:text-rose-600 transition-colors"
            >
              {item.icon && <span>{item.icon}</span>}
              <span>{item.title}</span>
            </Link>
          ) : (
            <div className="flex items-center space-x-1 text-gray-900 font-medium">
              {item.icon && <span>{item.icon}</span>}
              <span>{item.title}</span>
            </div>
          )}
        </React.Fragment>
      ))}
    </nav>
  )
}

// 预定义的面包屑配置
export const breadcrumbConfig: Record<string, BreadcrumbItem[]> = {
  '/games': [
    { title: '游戏中心' }
  ],
  '/emotion-analysis': [
    { title: '情感分析' }
  ],
  '/content-creation': [
    { title: '内容创作' }
  ],
  '/emotion-diary': [
    { title: '情感日记' }
  ],
  '/social-assistant': [
    { title: '社交助手' }
  ],
  '/dashboard': [
    { title: '个人中心' }
  ],
  '/achievements': [
    { title: '成就系统' }
  ]
}

// 获取当前页面的面包屑
export function getBreadcrumbForPath(pathname: string): BreadcrumbItem[] {
  // 精确匹配
  if (breadcrumbConfig[pathname]) {
    return breadcrumbConfig[pathname]
  }
  
  // 模糊匹配
  for (const [key, items] of Object.entries(breadcrumbConfig)) {
    if (pathname.startsWith(key)) {
      return items
    }
  }
  
  // 默认返回空数组
  return []
}