'use client'

import { useState, useEffect } from 'react'
import { Navigation } from '@/components/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Brain, MessageCircle, TrendingUp, Sparkles, Heart, Users, FileText, Zap, ArrowRight, Star, Check, Play } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const features = [
    {
      title: '情感分析',
      description: '深入理解文本情感，提供多维度分析',
      icon: <Heart className="h-10 w-10 text-white" />,
      href: '/emotion-analysis',
      bgClass: 'bg-gradient-to-br from-pink-500 to-rose-500',
      hoverClass: 'hover:shadow-pink-200',
      stats: { number: '98%', label: '准确率' }
    },
    {
      title: '社交助手',
      description: '智能分析对话内容，优化社交策略',
      icon: <Users className="h-10 w-10 text-white" />,
      href: '/social-assistant',
      bgClass: 'bg-gradient-to-br from-blue-500 to-cyan-500',
      hoverClass: 'hover:shadow-blue-200',
      stats: { number: '1000+', label: '场景模板' }
    },
    {
      title: '内容创作',
      description: 'AI辅助创作个性化内容，表达真实情感',
      icon: <FileText className="h-10 w-10 text-white" />,
      href: '/content-creation',
      bgClass: 'bg-gradient-to-br from-purple-500 to-indigo-500',
      hoverClass: 'hover:shadow-purple-200',
      stats: { number: '50+', label: '内容风格' }
    }
  ]

  const benefits = [
    {
      title: '智能分析',
      description: '基于先进的AI模型，精准识别文本中的情感色彩和隐含意图'
    },
    {
      title: '即时响应',
      description: '毫秒级处理速度，提供即时的情感分析和建议反馈'
    },
    {
      title: '个性化定制',
      description: '根据您的需求和应用场景，提供定制化的分析和创作服务'
    },
    {
      title: '数据安全',
      description: '采用加密技术保护您的隐私，所有数据处理均在安全环境中进行'
    },
    {
      title: '多场景适配',
      description: '支持职场、社交、情感、学习等多种应用场景'
    },
    {
      title: '持续优化',
      description: '模型不断学习和优化，提供越来越精准的分析结果'
    }
  ]

  const testimonials = [
    {
      name: '张经理',
      role: '企业HR',
      content: '情感分析帮助我更好地理解员工需求，提升团队沟通效率。',
      rating: 5
    },
    {
      name: '李同学',
      role: '大学生',
      content: '内容创作功能让我在社交媒体上表达更加得体，收获了更多朋友。',
      rating: 5
    },
    {
      name: '王老师',
      role: '教育工作者',
      content: '社交助手为我提供了与学生沟通的宝贵建议，课堂氛围明显改善。',
      rating: 5
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <Navigation />
      
      {/* 主要内容区域 */}
      <main className="relative">
        {/* 装饰性背景元素 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-pink-200 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-purple-200 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
        </div>

        {/* Hero区域 */}
        <section className="relative container mx-auto px-4 py-20">
          <div className={`max-w-6xl mx-auto text-center transition-all duration-1000 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <Badge className="mb-4 bg-white text-purple-700 border-purple-200 px-3 py-1">
              <Sparkles className="w-3 h-3 mr-1" />
              AI驱动的情感智能平台
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6">
              理解情感，
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 block md:inline">
                连接世界
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-10">
              运用先进的AI技术，深入理解和分析情感内容，为您提供个性化的社交互动建议和情感支持
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/emotion-analysis">
                <Button size="lg" className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-8 py-3 text-lg">
                  立即开始
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="#features">
                <Button size="lg" variant="outline" className="px-8 py-3 text-lg">
                  了解更多
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* 功能卡片区域 */}
        <section id="features" className="relative container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">强大的情感智能功能</h2>
              <p className="text-xl text-gray-600">从分析到创作，全方位满足您的情感表达需求</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className={`group relative rounded-2xl overflow-hidden transition-all duration-500 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <Link href={feature.href} className="block h-full">
                    <div className={`${feature.bgClass} h-48 flex items-center justify-center relative overflow-hidden ${feature.hoverClass} hover:shadow-xl transition-all duration-300`}>
                      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                      {feature.icon}
                    </div>
                    
                    <CardContent className="p-6 bg-white">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                      <p className="text-gray-600 mb-4">{feature.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-900">{feature.stats.number}</div>
                          <div className="text-sm text-gray-500">{feature.stats.label}</div>
                        </div>
                        <div className="flex items-center text-pink-600 group-hover:text-pink-700 transition-colors">
                          <span className="mr-1">立即体验</span>
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </CardContent>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 优势特点区域 */}
        <section className="relative bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">为什么选择我们的平台</h2>
                <p className="text-xl text-gray-600">基于最新技术，为您提供卓越的体验</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {benefits.map((benefit, index) => (
                  <div 
                    key={index} 
                    className={`flex gap-4 transition-all duration-500 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <Check className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 开始使用区域 */}
        <section className="relative container mx-auto px-4 py-20">
          <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 transform ${isLoaded ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              开启您的情感智能之旅
            </h2>
            <p className="text-xl text-gray-600 mb-10">
              与AI一同探索情感的世界，体验前所未有的智能交流
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/emotion-analysis">
                <Button size="lg" className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-8 py-3 text-lg">
                  免费试用
                  <Heart className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/social-assistant">
                <Button size="lg" variant="outline" className="px-8 py-3 text-lg">
                  查看演示
                  <Play className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}