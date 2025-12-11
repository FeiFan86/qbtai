'use client'

import { ReactNode } from 'react'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import GlobalNavbar from '@/components/global-navbar'
import { Footer } from '@/components/footer'

interface GamePageTemplateProps {
  title: string
  description: string
  icon: ReactNode
  bgGradient?: string
  children: ReactNode
  showBackButton?: boolean
  backButtonText?: string
  showFooter?: boolean
}

export default function GamePageTemplate({
  title,
  description,
  icon,
  bgGradient = "bg-gradient-to-br from-purple-50/80 via-pink-50/80 to-indigo-50/80",
  children,
  showBackButton = true,
  backButtonText = "返回游戏中心",
  showFooter = true
}: GamePageTemplateProps) {
  return (
    <div className={`min-h-screen ${bgGradient} relative overflow-hidden`}>
      {/* 背景装饰元素 - 统一的样式 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-purple-300/30 to-pink-300/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-indigo-300/30 to-blue-300/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-300/20 to-violet-300/20 rounded-full blur-3xl animate-pulse delay-300"></div>
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-gradient-to-r from-pink-300/20 to-rose-300/20 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>
      
      <GlobalNavbar />
      
      <main className="container mx-auto px-4 py-8 relative z-10">
        <div className="mx-auto max-w-6xl">
          {/* 返回按钮 */}
          {showBackButton && (
            <div className="mb-8">
              <Link 
                href="/games" 
                className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 transition-all duration-300 transform hover:scale-105 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm hover:shadow-md border border-white/30"
              >
                <ArrowLeft className="h-4 w-4" />
                {backButtonText}
              </Link>
            </div>
          )}
          
          {/* 页面标题区域 */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center mb-6 p-6 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 rounded-full shadow-2xl animate-bounce hover:animate-pulse transition-all duration-300 hover:shadow-3xl">
              {icon}
            </div>
            
            <div className="relative inline-block mb-4">
              <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 mb-2 tracking-tight animate-fade-in-up">
                {title}
              </h1>
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 rounded-lg blur-lg opacity-30 animate-pulse"></div>
            </div>
            
            <p className="text-lg text-gray-700 max-w-2xl mx-auto bg-white/80 backdrop-blur-md px-8 py-4 rounded-xl shadow-lg border border-white/30">
              {description}
            </p>
          </div>

          {/* 页面内容 */}
          <div className="w-full">
            {children}
          </div>
        </div>
      </main>
      
      {showFooter && <Footer />}
    </div>
  )
}