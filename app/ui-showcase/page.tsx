'use client'

import React, { useState } from 'react'
import { EnhancedLayout } from '@/components/layout-enhanced'
import { EnhancedCard, CardHeaderEnhanced, CardContentEnhanced } from '@/components/ui-enhanced/card-enhanced'
import { EnhancedButton } from '@/components/ui-enhanced/button-enhanced'
import { Badge } from '@/components/ui/badge'
import { 
  Heart, 
  Sparkles, 
  Users, 
  MessageCircle, 
  Star, 
  Zap, 
  Target, 
  Award,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Download,
  Share2
} from 'lucide-react'

export default function UIShowcasePage() {
  const [selectedDemo, setSelectedDemo] = useState('all')

  const features = [
    {
      id: 'navigation',
      title: '增强导航栏',
      description: '完整的功能导航，支持桌面和移动端',
      icon: <Target className="h-6 w-6 text-rose-500" />,
      tags: ['导航', '响应式', '用户体验'],
      status: 'completed'
    },
    {
      id: 'cards',
      title: '增强卡片组件',
      description: '多种变体，支持悬停效果和动画',
      icon: <Award className="h-6 w-6 text-purple-500" />,
      tags: ['组件', '交互', '动画'],
      status: 'completed'
    },
    {
      id: 'buttons',
      title: '增强按钮组件',
      description: '统一的设计风格，支持加载状态',
      icon: <Zap className="h-6 w-6 text-blue-500" />,
      tags: ['按钮', '交互', '状态'],
      status: 'completed'
    },
    {
      id: 'layout',
      title: '增强布局组件',
      description: '统一的页面结构，包含导航和页脚',
      icon: <Sparkles className="h-6 w-6 text-green-500" />,
      tags: ['布局', '结构', '一致性'],
      status: 'completed'
    }
  ]

  const cardVariants = [
    { variant: 'default', title: '默认卡片' },
    { variant: 'glass', title: '玻璃卡片' },
    { variant: 'elevated', title: '立体卡片' },
    { variant: 'gradient', title: '渐变卡片' }
  ]

  const buttonVariants = [
    { variant: 'primary', title: '主要按钮' },
    { variant: 'secondary', title: '次要按钮' },
    { variant: 'outline', title: '轮廓按钮' },
    { variant: 'ghost', title: '幽灵按钮' },
    { variant: 'gradient', title: '渐变按钮' }
  ]

  return (
    <EnhancedLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* 页面标题 */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-white/20 shadow-sm mb-6">
            <Sparkles className="h-4 w-4 text-rose-500 mr-2" />
            <span className="text-sm font-medium text-gray-700">UI组件展示</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            <span className="block text-gray-900">增强UI组件</span>
            <span className="block bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
              提升用户体验
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mt-6">
            展示新开发的增强UI组件，提供更丰富的交互体验和视觉效果
          </p>
        </div>

        {/* 功能特性展示 */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">核心功能特性</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <EnhancedCard
                key={feature.id}
                variant="glass"
                hover
                animation="slide-up"
                delay={index * 100}
              >
                <CardContentEnhanced>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-white rounded-lg">
                      {feature.icon}
                    </div>
                    <Badge className={
                      feature.status === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }>
                      {feature.status === 'completed' ? '已完成' : '开发中'}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {feature.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {feature.tags.map((tag, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContentEnhanced>
              </EnhancedCard>
            ))}
          </div>
        </div>

        {/* 卡片组件展示 */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">卡片组件变体</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cardVariants.map((card, index) => (
              <EnhancedCard
                key={card.variant}
                variant={card.variant as any}
                hover
                animation="scale-up"
                delay={index * 100}
              >
                <CardHeaderEnhanced>
                  <h3 className="text-lg font-semibold text-gray-900">{card.title}</h3>
                </CardHeaderEnhanced>
                <CardContentEnhanced>
                  <p className="text-gray-600 text-sm mb-4">
                    这是{card.title}的示例展示，展示不同的视觉效果和交互体验。
                  </p>
                  <EnhancedButton 
                    variant="primary" 
                    size="sm"
                    icon={<CheckCircle className="h-4 w-4" />}
                  >
                    查看详情
                  </EnhancedButton>
                </CardContentEnhanced>
              </EnhancedCard>
            ))}
          </div>
        </div>

        {/* 按钮组件展示 */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">按钮组件变体</h2>
          <div className="space-y-8">
            {buttonVariants.map((button) => (
              <div key={button.variant} className="flex flex-col items-center space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">{button.title}</h3>
                <div className="flex flex-wrap gap-4">
                  <EnhancedButton variant={button.variant as any} size="sm">
                    小尺寸
                  </EnhancedButton>
                  <EnhancedButton 
                    variant={button.variant as any} 
                    icon={<Download className="h-4 w-4" />}
                  >
                    带图标
                  </EnhancedButton>
                  <EnhancedButton 
                    variant={button.variant as any} 
                    loading
                  >
                    加载中
                  </EnhancedButton>
                  <EnhancedButton 
                    variant={button.variant as any} 
                    size="lg"
                    icon={<Share2 className="h-4 w-4" />}
                    iconPosition="right"
                  >
                    右侧图标
                  </EnhancedButton>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 交互效果展示 */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">交互效果展示</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <EnhancedCard variant="glass" hover animation="slide-up">
              <CardContentEnhanced>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full flex items-center justify-center">
                    <Heart className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">滑动进入动画</h3>
                  <p className="text-gray-600 text-sm">
                    页面加载时从下方滑入，营造流畅的进入体验
                  </p>
                </div>
              </CardContentEnhanced>
            </EnhancedCard>

            <EnhancedCard variant="elevated" hover animation="fade-in">
              <CardContentEnhanced>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                    <Sparkles className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">淡入动画</h3>
                  <p className="text-gray-600 text-sm">
                    渐变透明度，从不可见到完全可见的平滑过渡
                  </p>
                </div>
              </CardContentEnhanced>
            </EnhancedCard>

            <EnhancedCard variant="gradient" hover animation="scale-up">
              <CardContentEnhanced>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center">
                    <Zap className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">缩放进入动画</h3>
                  <p className="text-gray-600 text-sm">
                    从小到大的缩放效果，增强视觉吸引力
                  </p>
                </div>
              </CardContentEnhanced>
            </EnhancedCard>
          </div>
        </div>

        {/* 实施建议 */}
        <div className="mt-16">
          <EnhancedCard variant="elevated" animation="slide-up">
            <CardHeaderEnhanced gradient>
              <h2 className="text-2xl font-bold text-gray-900">实施建议</h2>
            </CardHeaderEnhanced>
            <CardContentEnhanced>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">立即实施</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span className="text-gray-600">替换现有的导航栏为增强版本</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span className="text-gray-600">使用增强布局组件统一页面结构</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span className="text-gray-600">更新关键页面的卡片和按钮组件</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">后续优化</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2">
                      <TrendingUp className="h-5 w-5 text-blue-500 mt-0.5" />
                      <span className="text-gray-600">添加更多的微交互动画</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <TrendingUp className="h-5 w-5 text-blue-500 mt-0.5" />
                      <span className="text-gray-600">优化移动端体验</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <TrendingUp className="h-5 w-5 text-blue-500 mt-0.5" />
                      <span className="text-gray-600">增强无障碍支持</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <EnhancedButton 
                  variant="gradient" 
                  size="lg"
                  icon={<ArrowRight className="h-5 w-5" />}
                  iconPosition="right"
                  onClick={() => window.open('/games', '_blank')}
                >
                  查看实施示例
                </EnhancedButton>
              </div>
            </CardContentEnhanced>
          </EnhancedCard>
        </div>
      </div>
    </EnhancedLayout>
  )
}