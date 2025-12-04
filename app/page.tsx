'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import { Heart, Sparkles, Users, MessageCircle, Star, Zap, Target, Award } from 'lucide-react'

export default function HomePage() {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleDashboardRedirect = () => {
    router.push('/dashboard')
  }

  const features = [
    {
      icon: <Heart className="h-8 w-8 text-pink-500" />,
      title: "情感树洞",
      description: "安全私密的情感分享空间，让情侣自由表达内心感受"
    },
    {
      icon: <MessageCircle className="h-8 w-8 text-purple-500" />,
      title: "真心话大冒险",
      description: "经典互动游戏，增进了解，创造有趣回忆"
    },
    {
      icon: <Users className="h-8 w-8 text-blue-500" />,
      title: "协作涂鸦",
      description: "共同创作艺术作品，培养默契和合作精神"
    },
    {
      icon: <Target className="h-8 w-8 text-green-500" />,
      title: "关系棋局",
      description: "策略性互动游戏，学习更好的沟通方式"
    },
    {
      icon: <Award className="h-8 w-8 text-yellow-500" />,
      title: "成就系统",
      description: "解锁徽章，记录你们的美好时刻和成长"
    },
    {
      icon: <Zap className="h-8 w-8 text-orange-500" />,
      title: "情感分析",
      description: "AI智能分析互动数据，提供个性化建议"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 relative overflow-hidden">
      {/* 增强背景装饰元素 */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-100/20 via-pink-100/20 to-purple-100/20"></div>
      <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-rose-300/30 to-pink-300/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-purple-300/30 to-blue-300/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-orange-300/20 to-red-300/20 rounded-full blur-3xl animate-pulse delay-300"></div>
      <div className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-gradient-to-r from-yellow-300/20 to-amber-300/20 rounded-full blur-3xl animate-pulse delay-700"></div>

      {/* 导航栏 */}
      <nav className={`relative z-10 bg-white/70 backdrop-blur-md border-b border-white/20 transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}>
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
                onClick={() => router.push('/login')}
                className="text-gray-600 hover:text-rose-600 transition-colors"
              >
                登录
              </Button>
              <Button 
                onClick={() => router.push('/register')}
                className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                立即体验
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* 英雄区域 */}
      <div className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 transition-all duration-700 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <div className="text-center space-y-8">
          {/* 标签 */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-white/20 shadow-sm">
            <Sparkles className="h-4 w-4 text-rose-500 mr-2" />
            <span className="text-sm font-medium text-gray-700">专为情侣设计的互动游戏平台</span>
          </div>

          {/* 主标题 */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="block text-gray-900">让每一次互动</span>
              <span className="block bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                都充满惊喜
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              专为情侣打造的情感互动平台，通过精心设计的游戏和活动，
              <span className="text-rose-600 font-medium">增进感情深度，创造美好回忆</span>
            </p>
          </div>

          {/* 行动按钮 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/games">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-3 text-lg font-semibold"
              >
                <Heart className="mr-2 h-5 w-5" />
                开始甜蜜之旅
              </Button>
            </Link>
            <Link href="/features">
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-gray-200 hover:border-rose-200 hover:bg-rose-50 text-gray-700 hover:text-rose-700 transition-all duration-300 px-8 py-3 text-lg"
              >
                了解更多
              </Button>
            </Link>
          </div>

          {/* 统计数据 */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-rose-600">10+</div>
              <div className="text-sm text-gray-600">互动游戏</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-600">5000+</div>
              <div className="text-sm text-gray-600">幸福情侣</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">99%</div>
              <div className="text-sm text-gray-600">满意度</div>
            </div>
          </div>
        </div>
      </div>

      {/* 功能特色区域 */}
      <div className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 transition-all duration-700 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            丰富多样的
            <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">互动体验</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            从情感交流到趣味互动，我们为情侣准备了全方位的游戏和活动
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group relative overflow-hidden border-0 bg-white/70 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-rose-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardHeader className="relative z-10 pb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-rose-100 to-pink-100 group-hover:from-rose-200 group-hover:to-pink-200 transition-colors duration-300">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-rose-700 transition-colors duration-300">
                    {feature.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                <CardDescription className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                  {feature.description}
                </CardDescription>
              </CardContent>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-rose-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA 区域 */}
      <div className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 text-center transition-all duration-700 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <Card className="bg-gradient-to-r from-rose-500 to-pink-500 border-0 shadow-2xl">
          <CardContent className="p-12">
            <Star className="h-12 w-12 text-white mx-auto mb-6" fill="currentColor" />
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              准备好开始你们的甜蜜旅程了吗？
            </h3>
            <p className="text-rose-100 text-xl mb-8 max-w-2xl mx-auto">
              加入数千对幸福情侣，一起创造属于你们的独特回忆
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-rose-600 hover:bg-rose-50 border-0 font-semibold px-8 py-3 text-lg"
                onClick={() => router.push('/register')}
              >
                立即注册
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-white text-white hover:bg-white/20 font-semibold px-8 py-3 text-lg"
                onClick={() => router.push('/login')}
              >
                已有账号
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 页脚 */}
      <footer className={`relative z-10 bg-white/70 backdrop-blur-md border-t border-white/20 mt-16 transition-all duration-500 delay-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
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