'use client'

import React, { ReactNode } from 'react'
import GlobalNavbar from '@/components/global-navbar'
import UsageGuard, { UsageStatus } from '@/components/usage-guard'

interface UnifiedGameTemplateProps {
  title: string
  description: string
  icon: ReactNode
  children: ReactNode
  feature: string
  bgGradient?: string
}

export default function UnifiedGameTemplate({
  title,
  description,
  icon,
  children,
  feature,
  bgGradient = 'bg-gradient-to-br from-rose-50 via-white to-pink-50'
}: UnifiedGameTemplateProps) {
  return (
    <UsageGuard feature={feature}>
      {({ canUse, remainingUses, onUse, isLoading, usageText }) => (
        <div className={`min-h-screen ${bgGradient}`}>
          <GlobalNavbar />

          <main className="pt-16">
            <div className="container py-12">
              {/* 页面标题 */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 mb-4">
                  {icon}
                  <span className="text-sm font-medium text-gray-700 ml-2">{title}</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {title}
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  {description}
                </p>
              </div>

              {/* 使用状态提示 */}
              <div className="max-w-4xl mx-auto mb-6">
                <UsageStatus feature={feature} className="justify-center" />
              </div>

              {/* 游戏内容 */}
              <div className="max-w-4xl mx-auto">
                {children}
              </div>
            </div>
          </main>

          <footer className="bg-gray-50 border-t border-gray-200">
            <div className="container py-8">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <div className="w-6 h-6 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full flex items-center justify-center">
                    {React.cloneElement(icon as React.ReactElement, { className: "h-3 w-3 text-white" })}
                  </div>
                  <span className="text-gray-900 font-semibold">丘比特AI情感助手</span>
                </div>
                <p className="text-gray-600 text-sm">
                  © 2024 专为情侣设计的情感助手平台. 让爱更美好.
                </p>
              </div>
            </div>
          </footer>
        </div>
      )}
    </UsageGuard>
  )
}