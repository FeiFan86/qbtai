'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { EnhancedLayout } from '@/components/layout-enhanced'
import { EnhancedCard, CardContentEnhanced } from '@/components/ui-enhanced/card-enhanced'
import { EnhancedButton } from '@/components/ui-enhanced/button-enhanced'
import { 
  Heart, 
  Brain, 
  PenTool, 
  MessageCircle, 
  BarChart3, 
  Gamepad2,
  Users, 
  Sparkles, 
  Star, 
  ArrowRight, 
  TrendingUp,
  Shield,
  Zap
} from 'lucide-react'

export default function HomePage() {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)
  const [activeCategory, setActiveCategory] = useState('all')

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // 六大核心功能栏目
  const coreFeatures = [
    {
      id: 'emotion-analysis',
      title: '情感分析',
      description: 'AI智能分析情感状态，提供个性化建议和洞察',
      icon: <Brain className="h-8 w-8" />,
      color: 'from-rose-400 to-pink-600',
      bgColor: 'bg-rose-50',
      href: '/emotion-analysis',
      features: ['情感识别', '状态分析', '个性化建议', '情感报告'],
      stats: { accuracy: '98%', users: '10K+', satisfaction: '95%' }
    },
    {
      id: 'social-assistant',
      title: '社交助手',
      description: '改善沟通技巧，分析对话模式，增进关系理解',
      icon: <Users className="h-8 w-8" />,
      color: 'from-purple-400 to-indigo-600',
      bgColor: 'bg-purple-50',
      href: '/social-assistant',
      features: ['对话分析', '沟通建议', '社交技巧', '关系改善'],
      stats: { accuracy: '96%', users: '8K+', satisfaction: '93%' }
    },
    {
      id: 'content-creation',
      title: '内容创作',
      description: 'AI生成个性化内容，帮助表达情感和想法',
      icon: <PenTool className="h-8 w-8" />,
      color: 'from-blue-400 to-cyan-600',
      bgColor: 'bg-blue-50',
      href: '/content-creation',
      features: ['文案生成', '创意建议', '情感表达', '多场景模板'],
      stats: { accuracy: '97%', users: '12K+', satisfaction: '94%' }
    },
    {
      id: 'emotion-diary',
      title: '情感日记',
      description: '记录情感历程，追踪情绪变化和成长',
      icon: <MessageCircle className="h-8 w-8" />,
      color: 'from-green-400 to-teal-600',
      bgColor: 'bg-green-50',
      href: '/emotion-diary',
      features: ['日记记录', '情绪追踪', '成长分析', '私密保护'],
      stats: { accuracy: '99%', users: '15K+', satisfaction: '96%' }
    },
    {
      id: 'data-insights',
      title: '数据洞察',
      description: '可视化情感数据，发现模式和趋势',
      icon: <BarChart3 className="h-8 w-8" />,
      color: 'from-orange-400 to-red-600',
      bgColor: 'bg-orange-50',
      href: '/data-insights',
      features: ['数据可视化', '趋势分析', '模式识别', '报告生成'],
      stats: { accuracy: '95%', users: '6K+', satisfaction: '92%' }
    },
    {
      id: 'interactive-games',
      title: '互动游戏',
      description: '情感互动游戏，增进感情和默契度',
      icon: <Gamepad2 className="h-8 w-8" />,
      color: 'from-pink-400 to-purple-600',
      bgColor: 'bg-pink-50',
      href: '/games',
      features: ['情感游戏', '默契测试', '互动挑战', '成就系统'],
      stats: { accuracy: '94%', users: '20K+', satisfaction: '97%' }
    }
  ]

  const testimonials = [
    {
      name: "小明 & 小红",
      content: "通过丘比特AI的情感分析和互动游戏，我们找回了恋爱初期的甜蜜，感情更加深厚了。",
      avatar: "👨‍❤️‍👩",
      feature: "情感分析"
    },
    {
      name: "阿杰 & 小美",
      content: "社交助手功能真的很棒，帮我们解决了不少沟通上的问题，现在我们更加理解彼此了。",
      avatar: "👩‍❤️‍💋‍👨",
      feature: "社交助手"
    },
    {
      name: "大伟 & 小丽",
      content: "情感日记让我们能够记录下每一个美好时刻，数据洞察帮助我们看到了感情的成长轨迹。",
      avatar: "💑",
      feature: "数据洞察"
    }
  ]

  const stats = [
    { value: "50K+", label: "活跃用户", color: "text-rose-600" },
    { value: "6", label: "核心功能", color: "text-purple-600" },
    { value: "98%", label: "用户满意度", color: "text-blue-600" },
    { value: "24/7", label: "AI支持", color: "text-green-600" }
  ]

  return (
    <EnhancedLayout showBreadcrumb={false}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 页面标题区域 */}
        <div className={`text-center py-16 transition-all duration-1000 delay-200 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        }`}>
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-white/20 shadow-sm mb-6">
            <Sparkles className="h-4 w-4 text-rose-500 mr-2" />
            <span className="text-sm font-medium text-gray-700">丘比特AI情感助手</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            <span className="block text-gray-900">让情感更有温度</span>
            <span className="block bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
              用AI守护每一份爱
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
            六大核心功能模块，全方位提升情侣互动体验
          </p>

          {/* 统计数据 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`text-3xl md:text-4xl font-bold ${stat.color} mb-2`}>
                  {stat.value}
                </div>
                <div className="text-gray-600 text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 六大核心功能展示 */}
        <div className={`mb-20 transition-all duration-1000 delay-300 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        }`}>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            核心功能模块
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreFeatures.map((feature, index) => (
              <EnhancedCard
                key={feature.id}
                variant="glass"
                hover
                animation="slide-up"
                delay={index * 100}
              >
                <CardContentEnhanced>
                  {/* 功能图标 */}
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.color} text-white mb-6`}>
                    {feature.icon}
                  </div>
                  
                  {/* 功能标题和描述 */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-6 text-pretty">
                    {feature.description}
                  </p>
                  
                  {/* 功能特性 */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {feature.features.map((item, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                  
                  {/* 统计数据 */}
                  <div className="grid grid-cols-3 gap-2 mb-6 text-center">
                    <div>
                      <div className="text-sm font-semibold text-gray-900">{feature.stats.accuracy}</div>
                      <div className="text-xs text-gray-500">准确率</div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">{feature.stats.users}</div>
                      <div className="text-xs text-gray-500">用户数</div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">{feature.stats.satisfaction}</div>
                      <div className="text-xs text-gray-500">满意度</div>
                    </div>
                  </div>
                  
                  {/* 操作按钮 */}
                  <div className="flex space-x-3">
                    <EnhancedButton
                      variant="primary"
                      className="flex-1"
                      onClick={() => router.push(feature.href)}
                    >
                      立即体验
                    </EnhancedButton>
                    <EnhancedButton
                      variant="ghost"
                      size="sm"
                      icon={<ArrowRight className="h-4 w-4" />}
                    >
                      详情
                    </EnhancedButton>
                  </div>
                </CardContentEnhanced>
              </EnhancedCard>
            ))}
          </div>
        </div>

        {/* 用户评价 */}
        <div className={`mb-20 transition-all duration-1000 delay-500 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        }`}>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            用户真实反馈
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <EnhancedCard
                key={index}
                variant="elevated"
                animation="fade-in"
                delay={index * 150}
              >
                <CardContentEnhanced>
                  <div className="flex items-center mb-4">
                    <div className="text-4xl mr-3">{testimonial.avatar}</div>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-500">{testimonial.feature}用户</div>
                    </div>
                  </div>
                  <p className="text-gray-600 italic text-pretty">
                    "{testimonial.content}"
                  </p>
                </CardContentEnhanced>
              </EnhancedCard>
            ))}
          </div>
        </div>

        {/* CTA 区域 */}
        <div className={`py-20 transition-all duration-1000 delay-700 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        }`}>
          <EnhancedCard variant="gradient" className="text-center">
            <CardContentEnhanced padding="xl">
              <div className="max-w-3xl mx-auto space-y-6">
                <div className="w-20 h-20 mx-auto mb-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Heart className="h-10 w-10 text-white" fill="currentColor" />
                </div>
                
                <h3 className="text-3xl md:text-4xl font-bold text-white">
                  准备好开始你们的甜蜜旅程了吗？
                </h3>
                
                <p className="text-xl text-white/90">
                  加入数万对幸福情侣，一起创造属于你们的独特回忆
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                  <EnhancedButton
                    variant="primary"
                    size="lg"
                    onClick={() => router.push('/register')}
                    className="bg-white text-rose-600 hover:bg-gray-100"
                  >
                    立即注册
                  </EnhancedButton>
                  <EnhancedButton
                    variant="ghost"
                    size="lg"
                    onClick={() => router.push('/login')}
                    className="text-white hover:bg-white/20 border-white/30"
                  >
                    已有账号
                  </EnhancedButton>
                </div>
              </div>
            </CardContentEnhanced>
          </EnhancedCard>
        </div>
      </div>
    </EnhancedLayout>
  )
}