'use client'

import React from 'react'
import { useAuth } from '@/components/auth-provider'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const { isAuthenticated, user } = useAuth()
  const router = useRouter()

  if (!isAuthenticated) {
    router.push('/login')
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* 标题 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            欢迎回来，{user?.username}！
          </h1>
          <p className="text-gray-600">个人仪表板</p>
        </div>

        {/* 快速操作 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div 
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all cursor-pointer"
            onClick={() => router.push('/games')}
          >
            <div className="text-3xl mb-3">🎮</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">游戏中心</h3>
            <p className="text-gray-600 text-sm">体验有趣的互动游戏</p>
          </div>
          
          <div 
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all cursor-pointer"
            onClick={() => router.push('/games/interactive-games')}
          >
            <div className="text-3xl mb-3">💝</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">互动游戏</h3>
            <p className="text-gray-600 text-sm">增进感情的趣味互动</p>
          </div>
        </div>

        {/* 系统状态 */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">系统状态</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">正常</div>
              <div className="text-sm text-gray-600">认证系统</div>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">正常</div>
              <div className="text-sm text-gray-600">游戏功能</div>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">开发中</div>
              <div className="text-sm text-gray-600">成就系统</div>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">开发中</div>
              <div className="text-sm text-gray-600">排行榜</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}