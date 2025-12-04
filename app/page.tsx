'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Heart, Sparkles, Users, MessageCircle, Star, Zap, Target, Award, ArrowRight, Shield, Trophy, HeadphonesIcon } from 'lucide-react'

export default function HomePage() {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0)

  useEffect(() => {
    setIsVisible(true)
    
    // 自动轮播功能展示
    const interval = setInterval(() => {
      setActiveFeatureIndex((prevIndex) => (prevIndex + 1) % features.length)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [])

  const handleDashboardRedirect = () => {
    router.push('/dashboard')
  }

  const features = [
    {
      icon: <Heart className="h-8 w-8 text-rose-500" />,
      title: "情感树洞",
      description: "安全私密的情感分享空间，让情侣自由表达内心感受",
      gradient: "from-rose-400 to-pink-600",
      bgColor: "bg-rose-50"
    },
    {
      icon: <MessageCircle className="h-8 w-8 text-purple-500" />,
      title: "真心话大冒险",
      description: "经典互动游戏，增进了解，创造有趣回忆",
      gradient: "from-purple-400 to-indigo-600",
      bgColor: "bg-purple-50"
    },
    {
      icon: <Users className="h-8 w-8 text-blue-500" />,
      title: "协作涂鸦",
      description: "共同创作艺术作品，培养默契和合作精神",
      gradient: "from-blue-400 to-cyan-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: <Target className="h-8 w-8 text-green-500" />,
      title: "关系棋局",
      description: "策略性互动游戏，学习更好的沟通方式",
      gradient: "from-green-400 to-teal-600",
      bgColor: "bg-green-50"
    },
    {
      icon: <Award className="h-8 w-8 text-yellow-500" />,
      title: "成就系统",
      description: "解锁徽章，记录你们的美好时刻和成长",
      gradient: "from-yellow-400 to-orange-600",
      bgColor: "bg-yellow-50"
    },
    {
      icon: <Zap className="h-8 w-8 text-orange-500" />,
      title: "情感分析",
      description: "AI智能分析互动数据，提供个性化建议",
      gradient: "from-orange-400 to-red-600",
      bgColor: "bg-orange-50"
    }
  ]

  const stats = [
    { value: "10+", label: "互动游戏", color: "text-rose-600" },
    { value: "5000+", label: "幸福情侣", color: "text-purple-600" },
    { value: "99%", label: "满意度", color: "text-blue-600" },
    { value: "24/7", label: "AI支持", color: "text-green-600" }
  ]

  const testimonials = [
    {
      name: "小明 & 小红",
      content: "通过丘比特AI的游戏，我们找回了恋爱初期的甜蜜，感情更加深厚了。",
      avatar: "👨‍❤️‍👩"
    },
    {
      name: "阿杰 & 小美",
      content: "情感分析功能真的很棒，帮我们解决了不少沟通上的问题。",
      avatar: "👩‍❤️‍💋‍👨"
    },
    {
      name: "小李 & 小张",
      content: "成就系统让我们更有动力一起完成任务，创造了好多美好回忆！",
      avatar: "💑"
    }
  ]

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 动态背景 */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-100 via-white to-secondary-100"></div>
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-primary-300 to-secondary-300 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-secondary-300 to-primary-300 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-r from-primary-200 to-pink-200 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-gradient-to-r from-pink-200 to-secondary-200 rounded-full blur-3xl animate-float"></div>
      </div>

      {/* 导航栏 */}
      <nav className={`navbar safe-top transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'}`}>
        <div className="container">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center shadow-lg">
                  <Heart className="h-5 w-5 text-white" fill="currentColor" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div>
                <span className="text-xl font-bold text-gradient">丘比特AI</span>
                <span className="block text-xs text-gray-500 -mt-1">情感互动平台</span>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#features" className="text-gray-600 hover:text-primary-600 transition-colors">功能</a>
              <a href="#testimonials" className="text-gray-600 hover:text-primary-600 transition-colors">评价</a>
              <a href="#pricing" className="text-gray-600 hover:text-primary-600 transition-colors">价格</a>
            </div>
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => router.push('/login')}
                className="text-gray-600 hover:text-primary-600 transition-colors font-medium"
              >
                登录
              </button>
              <button 
                onClick={() => router.push('/register')}
                className="btn-primary text-white px-6 py-2 text-base font-medium"
              >
                立即体验
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 英雄区域 */}
      <section className={`relative z-10 pt-20 pb-32 transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
        <div className="container">
          <div className="text-center max-w-4xl mx-auto space-y-8">
            {/* 标签 */}
            <div className="inline-flex items-center px-4 py-2 rounded-full glass">
              <Sparkles className="h-4 w-4 text-primary-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">专为情侣设计的互动游戏平台</span>
            </div>

            {/* 主标题 */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance">
                <span className="block text-gray-900">让每一次互动</span>
                <span className="block text-gradient mt-2">都充满惊喜</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 text-pretty leading-relaxed">
                专为情侣打造的情感互动平台，通过精心设计的游戏和活动，
                <span className="text-primary-600 font-semibold">增进感情深度，创造美好回忆</span>
              </p>
            </div>

            {/* 行动按钮 */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <button 
                onClick={() => router.push('/register')}
                className="btn-primary text-white text-lg font-semibold shadow-glow"
              >
                开始甜蜜之旅
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button 
                onClick={() => {
                  const featuresElement = document.getElementById('features');
                  featuresElement?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-ghost text-gray-700 text-lg font-semibold"
              >
                了解更多
              </button>
            </div>

            {/* 统计数据 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto pt-12">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className={`text-3xl md:text-4xl font-bold ${stat.color}`}>{stat.value}</div>
                  <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 功能特色区域 */}
      <section id="features" className={`relative z-10 py-20 transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              丰富多样的
              <span className="text-gradient block">互动体验</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto text-pretty">
              从情感交流到趣味互动，我们为情侣准备了全方位的游戏和活动
            </p>
          </div>

          <div className="relative">
            {/* 主要展示的功能 */}
            <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
              <div className="card p-8 md:p-12">
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${features[activeFeatureIndex].gradient} text-white mb-6`}>
                  {features[activeFeatureIndex].icon}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  {features[activeFeatureIndex].title}
                </h3>
                <p className="text-lg text-gray-600 text-pretty mb-6">
                  {features[activeFeatureIndex].description}
                </p>
                <button className="text-primary-600 font-medium flex items-center hover:text-primary-700 transition-colors">
                  了解更多
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
              <div className="hidden md:grid grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveFeatureIndex(index)}
                    className={`card p-4 text-left transition-all duration-300 ${
                      index === activeFeatureIndex ? 'ring-2 ring-rose-400 transform scale-105' : 'hover:transform hover:scale-102'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${feature.bgColor}`}>
                        {feature.icon}
                      </div>
                      <div className="font-medium text-gray-900">{feature.title}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 移动端功能轮播指示器 */}
            <div className="flex justify-center md:hidden space-x-2 mb-8">
              {features.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveFeatureIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === activeFeatureIndex ? 'w-8 bg-rose-400' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 用户评价区域 */}
      <section id="testimonials" className={`relative z-10 py-20 transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              用户
              <span className="text-gradient block">真实评价</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto text-pretty">
              听听其他情侣是如何通过丘比特AI增进感情的
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card p-6 md:p-8">
                <div className="text-4xl mb-4">{testimonial.avatar}</div>
                <p className="text-gray-600 mb-6 text-pretty italic">
                  "{testimonial.content}"
                </p>
                <div className="font-semibold text-gray-900">{testimonial.name}</div>
                <div className="flex text-yellow-400 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA 区域 */}
      <section className={`relative z-10 py-20 transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
        <div className="container">
          <div className="card p-12 md:p-16 bg-gradient-to-r from-rose-400 to-pink-400 text-white">
            <div className="text-center max-w-3xl mx-auto space-y-6">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto">
                <Heart className="h-10 w-10 text-white" fill="currentColor" />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold">
                准备好开始你们的甜蜜旅程了吗？
              </h3>
              <p className="text-xl text-white/90 text-pretty">
                加入数千对幸福情侣，一起创造属于你们的独特回忆
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <button 
                  onClick={() => router.push('/register')}
                  className="bg-white text-rose-500 hover:bg-gray-100 border-0 font-semibold px-8 py-3 text-lg transition-colors"
                >
                  立即注册
                </button>
                <button 
                  onClick={() => router.push('/login')}
                  className="glass text-white hover:bg-white/20 font-semibold px-8 py-3 text-lg transition-colors"
                >
                  已有账号
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 功能亮点区域 */}
      <section className={`relative z-10 py-20 transition-all duration-1000 delay-900 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              为什么选择
              <span className="text-gradient block">丘比特AI</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-primary-100 to-primary-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">隐私安全</h3>
              <p className="text-gray-600 text-pretty">
                采用端到端加密技术，保护你们的私密对话和情感数据
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-secondary-100 to-secondary-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <HeadphonesIcon className="h-8 w-8 text-secondary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">24/7 支持</h3>
              <p className="text-gray-600 text-pretty">
                AI助手全天候在线，随时为你们的关系问题提供建议
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">成就系统</h3>
              <p className="text-gray-600 text-pretty">
                通过完成挑战解锁成就，共同见证你们感情的成长
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className={`footer relative z-10 transition-all duration-1000 delay-1100 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
        <div className="container py-12">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                <Heart className="h-5 w-5 text-white" fill="currentColor" />
              </div>
              <span className="text-xl font-bold text-gray-900">丘比特AI情感助手</span>
            </div>
            <p className="text-gray-600 max-w-md mx-auto text-pretty">
              © 2024 专为情侣设计的互动游戏平台. 让爱更美好.
            </p>
            <div className="flex justify-center space-x-6">
              <a href="#" className="text-gray-500 hover:text-primary-600 transition-colors">隐私政策</a>
              <a href="#" className="text-gray-500 hover:text-primary-600 transition-colors">服务条款</a>
              <a href="#" className="text-gray-500 hover:text-primary-600 transition-colors">联系我们</a>
            </div>
            <p className="text-sm text-gray-500">
              当前版本: v2.0.0 | 用心创造每一份感动
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}