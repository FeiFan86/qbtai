'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Heart, Brain, PenTool, MessageCircle, BarChart3, Gamepad2, ArrowRight } from 'lucide-react'

export default function HomePage() {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // 六大核心功能栏目
  const coreFeatures = [
    {
      title: '情感分析',
      description: 'AI智能分析你的情感状态',
      icon: <Brain className="h-6 w-6" />,
      href: '/emotion-analysis',
      color: 'from-rose-400 to-pink-600'
    },
    {
      title: '社交助手',
      description: '改善沟通技巧，增进关系理解',
      icon: <MessageCircle className="h-6 w-6" />,
      href: '/social-assistant',
      color: 'from-purple-400 to-indigo-600'
    },
    {
      title: '内容创作',
      description: 'AI生成个性化内容，表达情感',
      icon: <PenTool className="h-6 w-6" />,
      href: '/content-creation',
      color: 'from-blue-400 to-cyan-600'
    },
    {
      title: '情感日记',
      description: '记录情感历程，追踪情绪变化',
      icon: <MessageCircle className="h-6 w-6" />,
      href: '/emotion-diary',
      color: 'from-green-400 to-teal-600'
    },
    {
      title: '数据洞察',
      description: '可视化情感数据，发现模式和趋势',
      icon: <BarChart3 className="h-6 w-6" />,
      href: '/data-insights',
      color: 'from-orange-400 to-red-600'
    },
    {
      title: '互动游戏',
      description: '情感互动游戏，增进感情和默契',
      icon: <Gamepad2 className="h-6 w-6" />,
      href: '/games',
      color: 'from-pink-400 to-purple-600'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      {/* 导航栏 */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="container">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full flex items-center justify-center">
                <Heart className="h-4 w-4 text-white" fill="currentColor" />
              </div>
              <span className="text-lg font-bold text-gray-900">丘比特AI</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link 
                href="/login" 
                className="text-gray-600 hover:text-rose-600 transition-colors"
              >
                登录
              </Link>
              <Link 
                href="/register" 
                className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:from-rose-600 hover:to-pink-600 transition-all"
              >
                立即体验
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* 主要内容 */}
      <main className="pt-16">
        {/* 标题区域 */}
        <div className="container py-20 text-center">
          <div className={`transition-all duration-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              让情感更有温度
              <span className="block text-2xl md:text-3xl text-rose-600 mt-2">用AI守护每一份爱</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              专为情侣设计的情感助手，通过AI技术增进理解和感情
            </p>
          </div>
        </div>

        {/* 六大功能栏目 */}
        <div className="container pb-20">
          <div className={`transition-all duration-1000 delay-300 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coreFeatures.map((feature, index) => (
                <Link
                  key={index}
                  href={feature.href}
                  className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${feature.color} text-white mb-4`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {feature.description}
                  </p>
                  <div className="flex items-center text-rose-600 text-sm font-medium">
                    立即体验
                    <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* CTA 区域 */}
        <div className="container pb-20">
          <div className={`bg-gradient-to-r from-rose-500 to-pink-500 rounded-2xl p-12 text-center text-white ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}>
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">
                准备好开始你们的甜蜜旅程了吗？
              </h2>
              <p className="text-xl text-white/90 mb-8">
                加入数万对幸福情侣，一起创造属于你们的独特回忆
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/register"
                  className="bg-white text-rose-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  立即注册
                </Link>
                <Link 
                  href="/login"
                  className="bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/30 transition-colors"
                >
                  已有账号
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 页脚 */}
      <footer className="bg-gray-50 border-t border-gray-200">
        <div className="container py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-6 h-6 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full flex items-center justify-center">
                <Heart className="h-3 w-3 text-white" fill="currentColor" />
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
  )
}