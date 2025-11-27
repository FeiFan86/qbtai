'use client'

import { useState } from 'react'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Brain, MessageCircle, TrendingUp, Zap, MessageSquare } from 'lucide-react'
import { ChatEmotionAnalysis } from '@/components/chat-emotion-analysis'
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold tracking-tight gradient-text mb-4">
              情感分析中心
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              与AI进行实时对话，深入理解文本背后的情感和意图
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="chat" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                对话分析
              </TabsTrigger>
              <TabsTrigger value="advanced" className="flex items-center gap-2">
                <Brain className="h-4 w-4" />
                高级功能
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="chat" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 对话区域 */}
                <div className="lg:col-span-2">
                  <ChatEmotionAnalysis onNewMessage={handleNewMessage} />
                </div>
                
                {/* 实时分析结果 */}
                <div className="space-y-6">
                  {latestAnalysis ? (
                    <>
                      <EmotionAnalysisResult result={latestAnalysis} compact />
                      <SocialSuggestions result={latestAnalysis} />
                      <EmotionTrends result={latestAnalysis} />
                    </>
                  ) : (
                    <Card>
                      <CardHeader>
                        <CardTitle>实时分析</CardTitle>
                        <CardDescription>
                          开始对话后，分析结果将在这里实时显示
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center py-8">
                          <Brain className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                          <p className="text-gray-500">等待对话开始...</p>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="advanced" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 语音分析 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-blue-500" />
                      语音情感分析
                    </CardTitle>
                    <CardDescription>
                      通过语音分析情感变化（即将上线）
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="border-2 border-dashed rounded-lg p-8 text-center">
                      <Zap className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                      <p className="text-gray-600">语音分析功能即将上线</p>
                      <p className="text-sm text-gray-400 mt-2">
                        支持语音输入和语调分析
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                {/* 图像分析 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-green-500" />
                      图像情感分析
                    </CardTitle>
                    <CardDescription>
                      分析图像中的情感表达（即将上线）
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="border-2 border-dashed rounded-lg p-8 text-center">
                      <TrendingUp className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                      <p className="text-gray-600">图像情感分析功能即将上线</p>
                      <p className="text-sm text-gray-400 mt-2">
                        支持表情识别和情感趋势分析
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}