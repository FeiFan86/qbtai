'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { MessageSquare, Mic, Image, Brain, CheckCircle, TrendingUp, AlertCircle, Heart as HeartIcon } from 'lucide-react'
import { ChatEmotionAnalysisEnhanced } from '@/components/chat-emotion-analysis-enhanced'
import { EmotionAnalysisResult } from '@/components/emotion-analysis-result'
import { SocialSuggestions } from '@/components/social-suggestions'

export default function EmotionAnalysisPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('chat')
  const [latestAnalysis, setLatestAnalysis] = useState<any>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const resultRef = useRef<HTMLDivElement>(null)
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // 组件卸载时清理定时器
  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
    }
  }, [])

  const handleNewMessage = (message: any) => {
    // 新实现中不在消息中包含分析结果，所以这里不需要处理
    // 所有分析结果都通过 handleAnalysisComplete 回调处理
  }

  const handleAnalysisStart = () => {
    setIsAnalyzing(true)
    setAnalysisProgress(0)
    
    // 清除之前的定时器
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current)
    }
    
    // 模拟分析进度
    progressIntervalRef.current = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 90) {
          if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current)
            progressIntervalRef.current = null
          }
          return 90
        }
        return prev + 10
      })
    }, 200)
    
    // 2秒后完成进度
    setTimeout(() => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
        progressIntervalRef.current = null
      }
      setAnalysisProgress(100)
      setTimeout(() => setIsAnalyzing(false), 1000)
    }, 2000)
  }

  const handleAnalysisComplete = (analysis: any) => {
    setAnalysisProgress(100)
    setLatestAnalysis(analysis)
    setTimeout(() => {
      setIsAnalyzing(false)
      setAnalysisProgress(0)
      // 自动滚动到结果区域
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }, 500)
  }

  const upcomingFeatures = [
    {
      title: '语音情感分析',
      description: '通过语音识别分析情感状态',
      icon: <Mic className="h-5 w-5 text-blue-500" />,
      status: '即将上线'
    },
    {
      title: '图片情感分析', 
      description: '基于图像内容的情感识别',
      icon: <Image className="h-5 w-5 text-purple-500" />,
      status: '即将上线'
    }
  ]

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
                  <HeartIcon className="h-5 w-5 text-white" fill="currentColor" />
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

      {/* 主要内容区域 */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center mb-16">
          {/* 标签 */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-white/20 shadow-sm mb-6">
            <Brain className="h-4 w-4 text-rose-500 mr-2" />
            <span className="text-sm font-medium text-gray-700">AI智能情感分析</span>
          </div>

          {/* 主标题 */}
          <div className="space-y-4 mb-8">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="block text-gray-900">情感分析</span>
              <span className="block bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                洞察内心世界
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              使用先进的AI技术深度分析您的情感状态，
              <span className="text-rose-600 font-medium">提供专业的心理洞察和建议</span>
            </p>
          </div>
        </div>

        {/* 主要功能区域 */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* 左侧 - 分析输入区 */}
          <div className="lg:col-span-2">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  <div className="flex items-center space-x-2">
                    <Brain className="h-6 w-6 text-rose-500" />
                    <span>情感分析工具</span>
                  </div>
                </CardTitle>
                <CardDescription className="text-gray-600">
                  输入文字内容，AI将为您分析其中的情感信息
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-3 bg-white/50 border-white/20">
                    <TabsTrigger value="chat" className="data-[state=active]:bg-rose-100 data-[state=active]:text-rose-700">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      文本分析
                    </TabsTrigger>
                    <TabsTrigger value="voice" disabled className="data-[state=active]:bg-rose-100 data-[state=active]:text-rose-700">
                      <Mic className="h-4 w-4 mr-2" />
                      语音分析
                    </TabsTrigger>
                    <TabsTrigger value="image" disabled className="data-[state=active]:bg-rose-100 data-[state=active]:text-rose-700">
                      <Image className="h-4 w-4 mr-2" />
                      图片分析
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="chat" className="mt-6">
                    <ChatEmotionAnalysisEnhanced 
                      onNewMessage={handleNewMessage}
                      onAnalysisStart={handleAnalysisStart}
                      onAnalysisComplete={handleAnalysisComplete}
                    />
                  </TabsContent>
                  
                  <TabsContent value="voice" className="mt-6">
                    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50">
                      <CardContent className="flex flex-col items-center justify-center py-12">
                        <Mic className="h-16 w-16 text-blue-500 mb-4" />
                        <h3 className="text-xl font-bold text-gray-900 mb-2">语音情感分析</h3>
                        <p className="text-gray-600 text-center mb-4">
                          即将推出语音分析功能，可通过语音识别技术分析情感状态
                        </p>
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          即将上线
                        </Badge>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="image" className="mt-6">
                    <Card className="bg-gradient-to-br from-purple-50 to-pink-50">
                      <CardContent className="flex flex-col items-center justify-center py-12">
                        <Image className="h-16 w-16 text-purple-500 mb-4" />
                        <h3 className="text-xl font-bold text-gray-900 mb-2">图片情感分析</h3>
                        <p className="text-gray-600 text-center mb-4">
                          即将推出图片分析功能，可通过计算机视觉技术分析图片中的情感信息
                        </p>
                        <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          即将上线
                        </Badge>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
                
                {/* 分析进度条 */}
                {isAnalyzing && (
                  <div className="mt-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">正在分析...</span>
                      <span className="text-sm text-gray-500">{analysisProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-rose-500 to-pink-500 rounded-full transition-all duration-300 ease-out"
                        style={{ width: `${analysisProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* 右侧 - 功能介绍和结果 */}
          <div className="lg:col-span-1 space-y-6">
            {/* 功能特色 */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">功能特色</CardTitle>
                <CardDescription>强大的AI分析能力</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900">多维度分析</h4>
                    <p className="text-sm text-gray-600">全面分析情感的多个维度</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <TrendingUp className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900">实时反馈</h4>
                    <p className="text-sm text-gray-600">快速获得分析结果</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Brain className="h-5 w-5 text-purple-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900">智能洞察</h4>
                    <p className="text-sm text-gray-600">提供专业的心理建议</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 即将推出 */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">即将推出</CardTitle>
                <CardDescription>更多强大功能</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="p-2 bg-white rounded-lg">
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{feature.title}</h4>
                      <p className="text-xs text-gray-600">{feature.description}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {feature.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 分析结果区域 */}
        {latestAnalysis && (
          <div ref={resultRef} className={`mt-12 transition-all duration-500 ${latestAnalysis ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <EmotionAnalysisResult analysis={latestAnalysis} />
          </div>
        )}

        {/* 社交建议 */}
        {latestAnalysis && (
          <div className="mt-8">
            <SocialSuggestions analysis={latestAnalysis} />
          </div>
        )}
      </div>

      {/* 页脚 - 与首页一致 */}
      <footer className="relative z-10 bg-white/70 backdrop-blur-md border-t border-white/20 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full flex items-center justify-center">
                <HeartIcon className="h-4 w-4 text-white" fill="currentColor" />
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