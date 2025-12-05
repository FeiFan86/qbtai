'use client'

import React from 'react'
import { useAuth } from '@/components/auth-provider'
import { useRouter } from 'next/navigation'
import { Brain, MessageCircle, PenTool, Heart, BarChart3, Gamepad2, User } from 'lucide-react'

export default function DashboardPage() {
  const { isAuthenticated, user } = useAuth()
  const router = useRouter()

  if (!isAuthenticated) {
    router.push('/login')
    return null
  }

  const quickActions = [
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
      title: '互动游戏',
      description: '情感互动游戏，增进感情和默契',
      icon: <Gamepad2 className="h-6 w-6" />,
      href: '/games',
      color: 'from-green-400 to-teal-600'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* 标题 */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            欢迎回来，{user?.username}！
          </h1>
          <p className="text-gray-600">快速访问常用功能</p>
        </div>

        {/* 快速操作 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {quickActions.map((action, index) => (
            <div 
              key={index}
              className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer"
              onClick={() => router.push(action.href)}
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className={`p-2 rounded-lg bg-gradient-to-r ${action.color} text-white`}>
                  {action.icon}
                </div>
                <h3 className="text-base font-semibold text-gray-900">{action.title}</h3>
              </div>
              <p className="text-gray-600 text-sm">{action.description}</p>
            </div>
          ))}
        </div>

        {/* 个人中心入口 */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-1">个人中心</h3>
              <p className="text-gray-600 text-sm">查看详细统计和设置</p>
            </div>
            <button 
              onClick={() => router.push('/profile')}
              className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-rose-600 hover:to-pink-600 transition-all flex items-center space-x-2"
            >
              <User className="h-4 w-4" />
              <span>查看详情</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}