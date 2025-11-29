'use client'

import { useState } from 'react'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { MessageSquare, Mic, Image, Heart } from 'lucide-react'
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
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* 页面标题 */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              情感分析中心
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              多模态情感分析平台，深度理解您的情感状态
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 左侧 - 主要分析区域 */}
            <div className="lg:col-span-2 space-y-6">
              {/* 功能标签页 */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="chat" className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    对话分析
                    <Badge className="ml-2">当前可用</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="voice" className="flex items-center gap-2" disabled>
                    <Mic className="h-4 w-4" />
                    语音分析
                    <Badge variant="outline" className="ml-2">即将上线</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="image" className="flex items-center gap-2" disabled>
                    <Image className="h-4 w-4" />
                    图片分析
                    <Badge variant="outline" className="ml-2">即将上线</Badge>
                  </TabsTrigger>
                </TabsList>
                
                {/* 对话分析标签页 */}
                <TabsContent value="chat" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MessageSquare className="h-5 w-5 text-blue-500" />
                        对话情感分析
                      </CardTitle>
                      <CardDescription>
                        与AI进行自然对话，实时分析您的情感状态
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ChatEmotionAnalysisEnhanced onNewMessage={handleNewMessage} />
                    </CardContent>
                  </Card>
                  
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
            </div>

            {/* 右侧 - 功能信息 */}
            <div className="space-y-6">
              {/* 即将上线的功能 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    即将上线的功能
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg border">
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
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-pink-500" />
                    情感分析指南
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
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