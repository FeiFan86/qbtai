'use client'

import React from 'react'
import { UserProfileCard } from '@/components/user-profile'
import { ApiStatus } from '@/components/api-status'
import { useAuth } from '@/components/auth-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { Heart } from 'lucide-react'

export default function DashboardPage() {
  const { isAuthenticated, user } = useAuth()
  const router = useRouter()

  const handleLoginRedirect = () => {
    router.push('/login')
  }

  const handleGamesRedirect = () => {
    router.push('/games')
  }

  const handleInteractiveGamesRedirect = () => {
    router.push('/games/interactive-games')
  }

  const handleAchievementsRedirect = () => {
    router.push('/achievements')
  }

  const handleLeaderboardsRedirect = () => {
    router.push('/leaderboards')
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              用户仪表板
            </CardTitle>
            <CardDescription className="text-center">
              请先登录以查看个人数据
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button onClick={handleLoginRedirect}>
              立即登录
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 relative overflow-hidden">
      {/* 增强背景装饰元素 - 与首页保持一致 */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-100/20 via-pink-100/20 to-purple-100/20"></div>
      <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-rose-300/30 to-pink-300/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-purple-300/30 to-blue-300/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-orange-300/20 to-red-300/20 rounded-full blur-3xl animate-pulse delay-300"></div>
      <div className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-gradient-to-r from-yellow-300/20 to-amber-300/20 rounded-full blur-3xl animate-pulse delay-700"></div>

      {/* 导航栏 - 与首页一致 */}
      <nav className="relative z-10 bg-white/70 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Heart className="h-5 w-5 text-white" fill="currentColor" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                  丘比特AI
                </span>
                <span className="block text-xs text-gray-500 -mt-1">情感互动平台</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                variant="ghost" 
                onClick={() => router.push('/')}
                className="text-gray-600 hover:text-rose-600 transition-colors"
              >
                返回首页
              </Button>
            </div>
          </div>
        </div>
      </nav>
      
      <div className="relative z-10 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              欢迎回来，{user?.username}！
            </h1>
            <p className="text-gray-600 mt-2">
              这是您的个人仪表板，可以查看游戏数据、成就和系统状态
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 用户信息 */}
            <div className="lg:col-span-1">
              <UserProfileCard />
            </div>

            {/* 主要内容 */}
            <div className="lg:col-span-2 space-y-6">
              {/* 系统状态 */}
              <ApiStatus />

              {/* 快速操作 */}
              <Card>
                <CardHeader>
                  <CardTitle>快速操作</CardTitle>
                  <CardDescription>
                    快速访问常用功能
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Button 
                      variant="outline" 
                      className="h-20 flex flex-col items-center justify-center"
                      onClick={handleGamesRedirect}
                    >
                      <span className="text-2xl mb-1">🎮</span>
                      <span className="text-sm">游戏中心</span>
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="h-20 flex flex-col items-center justify-center"
                      onClick={handleInteractiveGamesRedirect}
                    >
                      <span className="text-2xl mb-1">💝</span>
                      <span className="text-sm">互动游戏</span>
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="h-20 flex flex-col items-center justify-center"
                      onClick={handleAchievementsRedirect}
                    >
                      <span className="text-2xl mb-1">🏆</span>
                      <span className="text-sm">成就系统</span>
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="h-20 flex flex-col items-center justify-center"
                      onClick={handleLeaderboardsRedirect}
                    >
                      <span className="text-2xl mb-1">📊</span>
                      <span className="text-sm">排行榜</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* 开发说明 */}
              <Card>
                <CardHeader>
                  <CardTitle>开发说明</CardTitle>
                  <CardDescription>
                    当前系统状态和功能说明
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                    <h4 className="font-semibold text-blue-800 mb-1">✅ 已完成功能</h4>
                    <ul className="text-blue-700 space-y-1">
                      <li>• 用户认证系统（登录/注册）</li>
                      <li>• 基础API架构</li>
                      <li>• 数据模型定义</li>
                      <li>• 错误处理机制</li>
                      <li>• 移动端响应式优化</li>
                    </ul>
                  </div>
                  
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
                    <h4 className="font-semibold text-yellow-800 mb-1">🔄 开发中功能</h4>
                    <ul className="text-yellow-700 space-y-1">
                      <li>• 成就系统API集成</li>
                      <li>• 排行榜数据计算</li>
                      <li>• 游戏数据统计</li>
                      <li>• 实时数据同步</li>
                    </ul>
                  </div>
                  
                  <div className="p-3 bg-green-50 border border-green-200 rounded">
                    <h4 className="font-semibold text-green-800 mb-1">🚀 下一步计划</h4>
                    <ul className="text-green-700 space-y-1">
                      <li>• 游戏功能完整实现</li>
                      <li>• 数据库集成（MongoDB/PostgreSQL）</li>
                      <li>• 实时通信功能（WebSocket）</li>
                      <li>• 性能优化和测试</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* 页脚 - 与首页一致 */}
      <footer className="relative z-10 bg-white/70 backdrop-blur-md border-t border-white/20 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full flex items-center justify-center">
                <Heart className="h-4 w-4 text-white" fill="currentColor" />
              </div>
              <span className="text-lg font-bold text-gray-900">丘比特AI情感助手</span>
            </div>
            <p className="text-gray-600">
              © 2024 专为情侣设计的互动游戏平台. 让爱更美好.
            </p>
            <p className="text-sm text-gray-500">
              当前版本: v2.0.0 | 用心创造每一份感动
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}