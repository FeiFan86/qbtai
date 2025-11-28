'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Brain, MessageCircle, TrendingUp, Zap, MessageSquare } from 'lucide-react'
import { ChatEmotionAnalysis } from '@/components/chat-emotion-analysis'
import { EmotionAnalysisResult } from '@/components/emotion-analysis-result'
import { SocialSuggestions } from '@/components/social-suggestions'
import { EmotionTrends } from '@/components/emotion-trends'

const EMOTION_ANALYSIS_ID = 'emotion-analysis-center'

export default function EmotionAnalysisPage() {
  const [activeTab, setActiveTab] = useState('chat')
  const [latestAnalysis, setLatestAnalysis] = useState<any>(null)
  const [shouldScroll, setShouldScroll] = useState(false)

  // 处理页面加载时的滚动定位
  useEffect(() => {
    const scrollToCenter = () => {
      // 延迟执行以确保页面已完全渲染
      setTimeout(() => {
        const element = document.getElementById(EMOTION_ANALYSIS_ID)
        if (element) {
          // 考虑导航栏高度，设置滚动偏移
          const offset = 80 // 导航栏高度
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
          const offsetPosition = elementPosition - offset
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })
        }
      }, 300) // 增加延迟时间，确保页面完全加载
    }

    // 页面加载时总是滚动到情感分析中心
    scrollToCenter()
  }, [])

  const handleNewMessage = (message: any) => {
    if (message.analysis) {
      setLatestAnalysis(message.analysis)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-4xl">
          {/* 情感分析中心标题区域 */}
          <div id={EMOTION_ANALYSIS_ID} className="text-center mb-10">
            <h1 className="text-4xl font-bold tracking-tight gradient-text mb-4">
              情感分析中心
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              深入理解文本背后的情感和意图，获取专业的分析结果
            </p>
          </div>

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
        </div>
      </main>
      
      <Footer />
    </div>
  )
}