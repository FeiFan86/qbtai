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
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

export default function EmotionAnalysisPage() {
  const [activeTab, setActiveTab] = useState('chat')
  const [latestAnalysis, setLatestAnalysis] = useState<any>(null)
  const [text, setText] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<any>(null)

  const handleNewMessage = (message: any) => {
    if (message.analysis) {
      setLatestAnalysis(message.analysis)
    }
  }

  const handleAnalyze = async () => {
    if (!text.trim()) return
    
    setIsAnalyzing(true)
    try {
      const response = await fetch('/api/emotion/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          input: text,
          type: 'text',
          context: []
        }),
      })
      
      if (response.ok) {
        const result = await response.json()
        console.log('情感分析结果:', result)
        if (result.success && result.data) {
          setAnalysisResult(result.data)
        } else {
          console.error('API返回错误:', result.error)
          alert('分析失败：' + (result.error || '未知错误'))
        }
      } else {
        const errorText = await response.text()
        console.error('API请求失败:', response.status, errorText)
        alert(`请求失败 (${response.status}): ${errorText}`)
      }
    } catch (error) {
      console.error('请求错误:', error)
      alert('网络错误，请检查连接后重试')
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold tracking-tight gradient-text mb-4">
              情感分析中心
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              深入理解文本背后的情感和意图，获取专业的分析结果
            </p>
          </div>

          <div className="space-y-6">
            {/* 文本分析卡片 */}
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
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="text">文本内容 *</Label>
                  <Textarea
                    id="text"
                    placeholder="请输入需要分析的文本内容..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows={6}
                  />
                </div>

                <div className="flex justify-end">
                  <Button 
                    onClick={handleAnalyze} 
                    disabled={!text.trim() || isAnalyzing}
                    className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                  >
                    {isAnalyzing ? '分析中...' : '分析情感'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* 分析结果 */}
            {analysisResult && (
              <EmotionAnalysisResult result={analysisResult} />
            )}

            {/* 社交建议 */}
            {analysisResult && (
              <SocialSuggestions result={analysisResult} />
            )}
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6 mt-10">
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
              {/* 对话区域 */}
              <div className="mb-6">
                <ChatEmotionAnalysis onNewMessage={handleNewMessage} />
              </div>
              
              {/* 实时分析结果 */}
              {latestAnalysis && (
                <div className="space-y-6">
                  <EmotionAnalysisResult result={latestAnalysis} />
                  <SocialSuggestions result={latestAnalysis} />
                  <EmotionTrends result={latestAnalysis} />
                </div>
              )}
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