'use client'

import { useState } from 'react'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { MessageSquare, Mic, Image, Heart, Brain, Zap, CheckCircle, TrendingUp, AlertCircle } from 'lucide-react'
import { ChatEmotionAnalysisEnhanced } from '@/components/chat-emotion-analysis-enhanced'
import { EmotionAnalysisResult } from '@/components/emotion-analysis-result'
import { SocialSuggestions } from '@/components/social-suggestions'

export default function EmotionAnalysisPage() {
  const [activeTab, setActiveTab] = useState('chat')
  const [latestAnalysis, setLatestAnalysis] = useState<any>(null)

  const handleNewMessage = (message: any) => {
    if (message.analysis) {
      setLatestAnalysis(message.analysis)
    }
  }

  // 情感分析场景示例
  const emotionScenarios = [
    {
      title: '个人情感表达',
      description: '分享个人情感体验和内心感受',
      icon: <Heart className="h-5 w-5 text-pink-500" />,
      example: '今天我感到特别开心，因为完成了重要的项目。'
    },
    {
      title: '关系情感分析',
      description: '分析人际关系中的情感互动',
      icon: <Brain className="h-5 w-5 text-blue-500" />,
      example: '和伴侣最近有些小矛盾，感觉沟通不太顺畅。'
    },
    {
      title: '职场情感表达',
      description: '工作环境中的情感体验',
      icon: <Zap className="h-5 w-5 text-yellow-500" />,
      example: '团队合作很愉快，但最近工作压力有点大。'
    },
    {
      title: '生活情感分享',
      description: '日常生活中的情感波动',
      icon: <MessageSquare className="h-5 w-5 text-green-500" />,
      example: '最近生活很充实，但偶尔会感到一些迷茫。'
    }
  ]

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
            {/* 场景示例 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-500" />
                  情感分析场景
                </CardTitle>
                <CardDescription>
                  选择一个场景，快速开始情感分析体验
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {emotionScenarios.map((scenario, index) => (
                    <div 
                      key={index}
                      className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => {
                        // 这里可以添加填充示例文本的逻辑
                        console.log('选择场景:', scenario.title)
                      }}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        {scenario.icon}
                        <span className="font-medium">{scenario.title}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{scenario.description}</p>
                      <div className="text-xs text-gray-500 bg-gray-100 p-2 rounded">
                        点击开始分析
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

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
                <ChatEmotionAnalysisEnhanced onNewMessage={handleNewMessage} showTitle={false} />
                
                {/* 实时分析结果 */}
                {latestAnalysis && (
                  <div className="space-y-4">
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