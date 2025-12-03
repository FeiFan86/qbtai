import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function HomePage() {
  const handleDashboardRedirect = () => {
    window.location.href = '/dashboard'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* 导航栏 */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-purple-600">💝</div>
              <span className="ml-2 text-xl font-bold text-gray-900">丘比特AI情感助手</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="outline">登录</Button>
              </Link>
              <Link href="/register">
                <Button>注册</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* 主要内容 */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 英雄区域 */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            专为情侣设计的
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">互动游戏平台</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            包含多种有趣的互动游戏，帮助情侣增进感情，创造美好回忆。
            从情感树洞到真心话大冒险，让每一次互动都充满惊喜。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/games">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                开始游戏
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline">
                查看仪表板
              </Button>
            </Link>
          </div>
        </div>

        {/* 功能特色 */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card>
            <CardHeader>
              <div className="text-3xl mb-2">🎮</div>
              <CardTitle>多样游戏</CardTitle>
              <CardDescription>10+种精心设计的互动游戏</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                从情感树洞到真心话大冒险，满足不同情侣的互动需求
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="text-3xl mb-2">🏆</div>
              <CardTitle>成就系统</CardTitle>
              <CardDescription>解锁徽章，记录美好时刻</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                完成挑战获得成就，让每一次互动都充满成就感
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="text-3xl mb-2">📊</div>
              <CardTitle>数据分析</CardTitle>
              <CardDescription>了解你们的互动模式</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                详细的数据统计帮助你们更好地了解彼此
              </p>
            </CardContent>
          </Card>
        </div>

        {/* 技术特性 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center">技术特性</CardTitle>
            <CardDescription className="text-center">
              基于现代Web技术栈构建
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">Next.js 14</div>
                <div className="text-sm text-gray-500">React框架</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">TypeScript</div>
                <div className="text-sm text-gray-500">类型安全</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">Tailwind CSS</div>
                <div className="text-sm text-gray-500">样式框架</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-pink-600">shadcn/ui</div>
                <div className="text-sm text-gray-500">组件库</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 开发状态 */}
        <div className="mt-12 text-center">
          <Card>
            <CardHeader>
              <CardTitle>开发状态</CardTitle>
              <CardDescription>当前项目开发进度</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">85%</div>
                    <div className="text-gray-500">前端完成度</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">70%</div>
                    <div className="text-gray-500">后端架构</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">60%</div>
                    <div className="text-gray-500">游戏功能</div>
                  </div>
                </div>
                
                <div className="text-left space-y-2">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm">✅ 用户认证系统已实现</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                    <span className="text-sm">✅ 响应式设计已优化</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                    <span className="text-sm">🔄 游戏功能开发中</span>
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  onClick={handleDashboardRedirect}
                >
                  查看详细开发状态
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 页脚 */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>© 2024 丘比特AI情感助手. 专为情侣设计的互动游戏平台.</p>
            <p className="mt-2 text-sm">当前版本: v1.0.0 (开发版)</p>
          </div>
        </div>
      </footer>
    </div>
  )
}