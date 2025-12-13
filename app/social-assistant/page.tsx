'use client'

import React from 'react'
import GlobalNavbar from '@/components/global-navbar'

export default function SocialAssistantPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      <GlobalNavbar />
      
      <main className="pt-16">
        <div className="container py-12">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 mb-4">
              <span className="text-sm font-medium text-gray-700">社交助手</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              AI社交沟通分析
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              分析对话内容，提供改善建议，增进人际沟通技巧
            </p>
          </div>
          
          <div className="text-center py-12">
            <p className="text-gray-500">功能正在开发中...</p>
          </div>
        </div>
      </main>
    </div>
  )
}