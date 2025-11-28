'use client'

import { useState } from 'react'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Heart, Brain, MessageSquare, Lightbulb, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react'
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

  const emotionExamples = [
    {
      title: '积极情感',
      description: '表达快乐、感激等积极情绪',
      icon: <Heart className="h-5 w-5 text-green-500" />,
      example: '今天天气真好，心情特别愉快！'
    },
    {
      title: '消极情感',
      description: '表达悲伤、愤怒等消极情绪',
      icon: <AlertCircle className="h-5 w-5 text-red-500" />,
      example: '今天工作压力很大，感觉有点沮丧。'
    },
    {
      title: '中性情感',
      description: '表达平静、客观的情感状态',
      icon: <Brain className="h-5 w-5 text-blue-500" />,
      example: '今天按部就班完成了工作，感觉比较平静。'
    },
    {
      title: '复杂情感',
      description: '表达混合的复杂情感状态',
      icon: <TrendingUp className="h-5 w-5 text-purple-500" />,
      example: '虽然工作很累，但看到成果还是很开心。'
    }
  ]

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
              深入理解文本背后的情感和意图，获取专业的分析结果
            </p>
          </div>

          <div className="space-y-6">
            {/* 情感示例 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-yellow-500" />
                  情感示例
                </CardTitle>
                <CardDescription>
                  选择一个示例，快速了解情感分析的效果
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {emotionExamples.map((example, index) => (
                    <div 
                      key={index}
                      className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => {
                        // 这里可以设置示例文本，但需要对应组件支持
                        console.log('示例选择:', example.title)
                      }}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        {example.icon}
                        <span className="font-medium">{example.title}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{example.description}</p>
                      <div className="text-xs text-gray-500 bg-gray-100 p-2 rounded">
                        {example.example}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 主要分析功能 - 标签页形式 */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="chat" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  对话分析
                </TabsTrigger>
                <TabsTrigger value="text" className="flex items-center gap-2">
                  <Brain className="h-4 w-4" />
                  文本分析
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
                      通过对话形式进行情感分析，获得实时反馈和建议
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChatEmotionAnalysis onNewMessage={handleNewMessage} />
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
              
              {/* 文本分析标签页 */}
              <TabsContent value="text" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="h-5 w-5 text-purple-500" />
                      文本情感分析
                    </CardTitle>
                    <CardDescription>
                      输入文本内容，获取详细的情感分析结果
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChatEmotionAnalysis onNewMessage={handleNewMessage} />
                  </CardContent>
                </Card>
                
                {/* 分析结果 */}
                {latestAnalysis && (
                  <div className="space-y-6">
                    <EmotionAnalysisResult result={latestAnalysis} />
                    <SocialSuggestions result={latestAnalysis} />
                  </div>
                )}
              </TabsContent>
            </Tabs>

            {/* 情感分析技巧 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">情感分析技巧</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">表达真实</p>
                    <p className="text-xs text-gray-600">诚实地表达您的真实感受和想法</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <TrendingUp className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">描述细节</p>
                    <p className="text-xs text-gray-600">提供具体的情境和感受细节</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">避免抑制</p>
                    <p className="text-xs text-gray-600">不要刻意隐藏或压抑负面情绪</p>
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