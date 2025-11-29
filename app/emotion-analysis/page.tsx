'use client'

import { useState } from 'react'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { MessageSquare, Mic, Image, Zap, Brain, Heart, Users, TrendingUp, Clock } from 'lucide-react'
import { ChatEmotionAnalysisEnhanced } from '@/components/chat-emotion-analysis-enhanced'
import { EmotionAnalysisResult } from '@/components/emotion-analysis-result'
import { SocialSuggestions } from '@/components/social-suggestions'
import { EmotionTrends } from '@/components/emotion-trends'

export default function EmotionAnalysisPage() {
  const [activeTab, setActiveTab] = useState('chat')
  const [latestAnalysis, setLatestAnalysis] = useState<any>(null)

  const handleNewMessage = (message: any) => {
    if (message.analysis) {
      setLatestAnalysis(message.analysis)
    }
  }

  const upcomingFeatures = [
    {
      title: '语音情感分析',
      description: '通过语音识别分析情感状态',
      icon: <Mic className="h-6 w-6 text-blue-500" />,
      status: '即将上线',
      color: 'blue'
    },
    {
      title: '图片情感分析', 
      description: '基于图像内容的情感识别',
      icon: <Image className="h-6 w-6 text-purple-500" />,
      status: '即将上线',
      color: 'purple'
    }
  ]

  const analysisStats = [
    { label: '分析准确率', value: '95%', icon: <Zap className="h-4 w-4" /> },
    { label: '情感维度', value: '8个', icon: <Brain className="h-4 w-4" /> },
    { label: '响应时间', value: '<2秒', icon: <Clock className="h-4 w-4" /> }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-7xl">
          {/* 页面标题和统计信息 */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              智能情感分析
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              多模态情感分析平台，深度理解您的情感状态，提供专业的心理洞察和改善建议
            </p>
            
            {/* 统计数据 */}
            <div className="flex justify-center gap-8 mb-6">
              {analysisStats.map((stat, index) => (
                <div key={index} className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-sm">
                  <div className="text-blue-500">{stat.icon}</div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 左侧 - 主要分析区域 */}
            <div className="lg:col-span-2 space-y-6">
              {/* 功能标签页 */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="chat" className="flex items-center gap-3 py-4">
                    <MessageSquare className="h-5 w-5" />
                    对话分析
                    <Badge variant="secondary" className="ml-2">当前可用</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="voice" className="flex items-center gap-3 py-4" disabled>
                    <Mic className="h-5 w-5" />
                    语音分析
                    <Badge variant="outline" className="ml-2">即将上线</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="image" className="flex items-center gap-3 py-4" disabled>
                    <Image className="h-5 w-5" />
                    图片分析
                    <Badge variant="outline" className="ml-2">即将上线</Badge>
                  </TabsTrigger>
                </TabsList>
                
                {/* 对话分析标签页 */}
                <TabsContent value="chat" className="space-y-6">
                  <Card className="border-0 shadow-xl">
                    <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-t-lg">
                      <CardTitle className="flex items-center gap-3 text-white">
                        <MessageSquare className="h-6 w-6" />
                        对话情感分析
                      </CardTitle>
                      <CardDescription className="text-blue-100">
                        与AI进行自然对话，实时分析您的情感状态并提供专业建议
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                      <ChatEmotionAnalysisEnhanced onNewMessage={handleNewMessage} />
                    </CardContent>
                  </Card>
                  
                  {/* 实时分析结果 */}
                  {latestAnalysis && (
                    <div className="space-y-6">
                      <EmotionAnalysisResult result={latestAnalysis} />
                      <SocialSuggestions result={latestAnalysis} />
                      <EmotionTrends result={latestAnalysis} />
                    </div>
                  )}
                </TabsContent>
                
                {/* 语音分析标签页（即将上线） */}
                <TabsContent value="voice" className="space-y-6">
                  <Card className="border-0 shadow-xl">
                    <CardHeader className="bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-t-lg">
                      <CardTitle className="flex items-center gap-3 text-white">
                        <Mic className="h-6 w-6" />
                        语音情感分析
                      </CardTitle>
                      <CardDescription className="text-blue-100">
                        通过语音识别技术分析您的声音情感特征（即将上线）
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-8 text-center">
                      <div className="flex flex-col items-center justify-center py-12">
                        <Mic className="h-16 w-16 text-blue-300 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">语音分析功能即将上线</h3>
                        <p className="text-gray-500">我们正在努力开发语音情感分析功能，敬请期待！</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* 图片分析标签页（即将上线） */}
                <TabsContent value="image" className="space-y-6">
                  <Card className="border-0 shadow-xl">
                    <CardHeader className="bg-gradient-to-r from-purple-400 to-purple-600 text-white rounded-t-lg">
                      <CardTitle className="flex items-center gap-3 text-white">
                        <Image className="h-6 w-6" />
                        图片情感分析
                      </CardTitle>
                      <CardDescription className="text-purple-100">
                        基于图像内容识别情感特征（即将上线）
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-8 text-center">
                      <div className="flex flex-col items-center justify-center py-12">
                        <Image className="h-16 w-16 text-purple-300 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">图片分析功能即将上线</h3>
                        <p className="text-gray-500">我们正在开发基于图像的情感分析功能，敬请期待！</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* 右侧 - 功能信息和即将上线的功能 */}
            <div className="space-y-6">
              {/* 即将上线的功能 */}
              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-orange-500" />
                    即将上线的功能
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-r from-gray-50 to-white border">
                      <div className="mt-1">{feature.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-gray-900">{feature.title}</h4>
                          <Badge variant="outline" className="text-xs">{feature.status}</Badge>
                        </div>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* 使用指南 */}
              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-pink-500" />
                    情感分析指南
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                      <div>
                        <p className="font-medium text-sm">真实表达</p>
                        <p className="text-xs text-gray-600">诚实地表达您的真实感受和想法</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
                      <div>
                        <p className="font-medium text-sm">详细描述</p>
                        <p className="text-xs text-gray-600">提供具体的情境和感受细节</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-purple-500 mt-2"></div>
                      <div>
                        <p className="font-medium text-sm">保持自然</p>
                        <p className="text-xs text-gray-600">像与朋友聊天一样自然交流</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}