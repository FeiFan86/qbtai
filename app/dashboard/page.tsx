'use client'

import React from 'react'
import { UserProfile } from '@/components/user-profile'
import { ApiStatus } from '@/components/api-status'
import { useAuth } from '@/components/auth-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function DashboardPage() {
  const { isAuthenticated, user } = useAuth()

  const handleLoginRedirect = () => {
    window.location.href = '/login'
  }

  const handleGamesRedirect = () => {
    window.location.href = '/games'
  }

  const handleInteractiveGamesRedirect = () => {
    window.location.href = '/games/interactive-games'
  }

  const handleAchievementsRedirect = () => {
    window.location.href = '/achievements'
  }

  const handleLeaderboardsRedirect = () => {
    window.location.href = '/leaderboards'
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
    <div className="min-h-screen p-4 bg-gray-50">
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
            <UserProfile />
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
  )
}