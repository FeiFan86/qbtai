'use client'

import { useState, useRef, useEffect } from 'react'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { MessageSquare, Mic, Image, Brain, CheckCircle, TrendingUp, AlertCircle } from 'lucide-react'
import { ChatEmotionAnalysisEnhanced } from '@/components/chat-emotion-analysis-enhanced'
import { EmotionAnalysisResult } from '@/components/emotion-analysis-result'
import { SocialSuggestions } from '@/components/social-suggestions'

export default function EmotionAnalysisPage() {
  const [activeTab, setActiveTab] = useState('chat')
  const [latestAnalysis, setLatestAnalysis] = useState<any>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const resultRef = useRef<HTMLDivElement>(null)
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)

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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-6xl">
          {/* 页面标题 */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold tracking-tight gradient-text mb-4">
              情感分析中心
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              多模态情感分析平台，深度理解您的情感状态
            </p>
          </div>

          <div className="space-y-6">
            {/* 功能标签页 */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="chat" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  对话分析
                  <Badge className="ml-2 bg-green-100 text-green-700 border-green-200">当前可用</Badge>
                </TabsTrigger>
                <TabsTrigger value="voice" className="flex items-center gap-2" disabled>
                  <Mic className="h-4 w-4" />
                  语音分析
                  <Badge variant="outline" className="ml-2 text-gray-500">即将上线</Badge>
                </TabsTrigger>
                <TabsTrigger value="image" className="flex items-center gap-2" disabled>
                  <Image className="h-4 w-4" />
                  图片分析
                  <Badge variant="outline" className="ml-2 text-gray-500">即将上线</Badge>
                </TabsTrigger>
              </TabsList>
              
              {/* 对话分析标签页 */}
              <TabsContent value="chat" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-purple-500" />
                      对话分析
                    </CardTitle>
                    <CardDescription>
                      输入对话内容，获取智能分析和建议
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChatEmotionAnalysisEnhanced 
                      onNewMessage={handleNewMessage} 
                      onAnalysisStart={handleAnalysisStart}
                      onAnalysisComplete={handleAnalysisComplete}
                      showTitle={false} 
                    />
                  </CardContent>
                </Card>

                {/* 分析进度条 */}
                {isAnalyzing && (
                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">正在分析您的情感...</span>
                          <span className="text-sm font-medium text-purple-600">{analysisProgress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full transition-all duration-300 ease-out"
                            style={{ width: `${analysisProgress}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-500 space-y-1">
                          {analysisProgress < 30 && <div>🧠 正在解析您的情感表达...</div>}
                          {analysisProgress >= 30 && analysisProgress < 60 && <div>💭 正在分析情感倾向...</div>}
                          {analysisProgress >= 60 && analysisProgress < 90 && <div>📊 正在生成情感报告...</div>}
                          {analysisProgress >= 90 && <div>✨ 分析完成，正在生成建议...</div>}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
                
                {/* 实时分析结果 */}
                {latestAnalysis && (
                  <div ref={resultRef} className="space-y-4 scroll-mt-20">
                    <div className="text-center mb-4">
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full">
                        <CheckCircle className="h-5 w-5" />
                        <span className="font-medium">分析完成</span>
                      </div>
                    </div>
                    <EmotionAnalysisResult result={latestAnalysis} />
                    <SocialSuggestions result={latestAnalysis} />
                  </div>
                )}
              </TabsContent>
              
              {/* 语音分析标签页（即将上线） */}
              <TabsContent value="voice" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Mic className="h-5 w-5 text-blue-500" />
                      语音情感分析
                    </CardTitle>
                    <CardDescription>
                      通过语音识别技术分析您的声音情感特征
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center py-8">
                    <Mic className="h-12 w-12 text-blue-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">语音分析功能即将上线</h3>
                    <p className="text-gray-500">我们正在努力开发语音情感分析功能</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* 图片分析标签页（即将上线） */}
              <TabsContent value="image" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Image className="h-5 w-5 text-purple-500" />
                      图片情感分析
                    </CardTitle>
                    <CardDescription>
                      基于图像内容识别情感特征
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center py-8">
                    <Image className="h-12 w-12 text-purple-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">图片分析功能即将上线</h3>
                    <p className="text-gray-500">我们正在开发基于图像的情感分析功能</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* 情感分析技巧提示 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">情感分析技巧</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">真实表达</p>
                    <p className="text-xs text-gray-600">诚实地表达您的真实感受和想法</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <TrendingUp className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">详细描述</p>
                    <p className="text-xs text-gray-600">提供具体的情境和感受细节</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">保持自然</p>
                    <p className="text-xs text-gray-600">像与朋友聊天一样自然交流</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}