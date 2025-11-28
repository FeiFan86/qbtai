'use client'

import { useState, useEffect } from 'react'
import { Navigation } from '@/components/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Brain, MessageCircle, TrendingUp, Sparkles, Heart, Users, FileText, Zap } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const features = [
    {
      title: '情感分析',
      description: '深入理解文本情感，提供多维度情感分析',
      icon: <Heart className="h-8 w-8 text-pink-500" />,
      href: '/emotion-analysis',
      color: 'from-pink-500 to-rose-500',
      capabilities: ['文本情感识别', '多维度分析', '情感趋势追踪', '智能建议']
    },
    {
      title: '社交助手',
      description: '智能分析对话内容，优化社交互动策略',
      icon: <Users className="h-8 w-8 text-blue-500" />,
      href: '/social-assistant',
      color: 'from-blue-500 to-cyan-500',
      capabilities: ['对话分析', '社交策略', '沟通建议', '场景适配']
    },
    {
      title: '内容创作',
      description: 'AI辅助创作个性化内容，表达真实情感',
      icon: <FileText className="h-8 w-8 text-purple-500" />,
      href: '/content-creation',
      color: 'from-purple-500 to-indigo-500',
      capabilities: ['情感内容', '个性化生成', '多种风格', '一键分享']
    },
    {
      title: '智能对话',
      description: '与AI进行自然对话，获得情感支持和建议',
      icon: <MessageCircle className="h-8 w-8 text-green-500" />,
      href: '/chat',
      color: 'from-green-500 to-emerald-500',
      capabilities: ['自然对话', '情感支持', '智能回复', '实时互动']
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <Navigation />
      
      {/* 主要内容区域 */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* 标题区域 */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 mb-6">
              情感智能
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
                分析平台
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              运用先进的AI技术，深入理解和分析情感内容，为您提供个性化的社交互动建议和情感支持
            </p>
          </div>

          {/* 功能卡片区域 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {features.map((feature, index) => (
              <Link 
                key={index} 
                href={feature.href}
                className="group block transition-all duration-300 hover:-translate-y-1"
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${feature.color}`}></div>
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-full bg-gradient-to-r ${feature.color} bg-opacity-10 group-hover:bg-opacity-20 transition-all duration-300`}>
                        {feature.icon}
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        Beta
                      </Badge>
                    </div>
                    <CardTitle className="text-2xl font-bold text-gray-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-purple-500 transition-all duration-300">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="text-base text-gray-600 mt-2">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        {feature.capabilities.map((capability, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {capability}
                          </Badge>
                        ))}
                      </div>
                      <Button 
                        variant="outline" 
                        className="w-full group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-purple-500 group-hover:text-white group-hover:border-0 transition-all duration-300"
                      >
                        立即体验
                        <Zap className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* 技术特性区域 */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">核心技术与优势</h2>
              <p className="text-lg text-gray-600">
                基于最新的深度学习模型，为您提供最精准的情感分析体验
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">深度学习模型</h3>
                <p className="text-gray-600">
                  基于先进的大语言模型，理解复杂情感和语境
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">实时分析</h3>
                <p className="text-gray-600">
                  快速处理和反馈，提供即时的情感分析结果
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">个性化体验</h3>
                <p className="text-gray-600">
                  根据用户需求提供定制化的分析和建议
                </p>
              </div>
            </div>
          </div>

          {/* 开始使用区域 */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">开始您的情感智能之旅</h2>
            <p className="text-lg text-gray-600 mb-8">
              选择一个功能，立即体验AI情感分析的魅力
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/emotion-analysis">
                <Button size="lg" className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white">
                  体验情感分析
                  <Heart className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/social-assistant">
                <Button size="lg" variant="outline">
                  使用社交助手
                  <Users className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}