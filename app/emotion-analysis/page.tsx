'use client'

import { useState } from 'react'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Brain, MessageCircle, TrendingUp, Zap } from 'lucide-react'
import { EmotionAnalysisResult } from '@/components/emotion-analysis-result'
import { SocialSuggestions } from '@/components/social-suggestions'
import { EmotionTrends } from '@/components/emotion-trends'

export default function EmotionAnalysisPage() {
  const [textInput, setTextInput] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const [activeTab, setActiveTab] = useState('text')

  const handleAnalyze = async () => {
    if (!textInput.trim()) return
    
    setIsAnalyzing(true)
    try {
      const response = await fetch('/api/emotion/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          input: textInput,
          type: 'text'
        }),
      })
      
      if (response.ok) {
        const result = await response.json()
        setAnalysisResult(result.data)
      } else {
        console.error('分析失败')
      }
    } catch (error) {
      console.error('请求错误:', error)
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
              利用先进的AI技术，深入理解文本背后的情感和意图
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 左侧输入区域 */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-pink-500" />
                    输入分析内容
                  </CardTitle>
                  <CardDescription>
                    输入您想分析的文字内容，AI将为您提供详细的情感分析
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="text" className="flex items-center gap-2">
                        <MessageCircle className="h-4 w-4" />
                        文本
                      </TabsTrigger>
                      <TabsTrigger value="voice" className="flex items-center gap-2">
                        <Zap className="h-4 w-4" />
                        语音
                      </TabsTrigger>
                      <TabsTrigger value="image" className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4" />
                        图像
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="text" className="space-y-4">
                      <Textarea
                        placeholder="在这里输入您想要分析的文字内容..."
                        value={textInput}
                        onChange={(e) => setTextInput(e.target.value)}
                        rows={8}
                        className="resize-none"
                      />
                      <div className="flex justify-end">
                        <Button 
                          onClick={handleAnalyze} 
                          disabled={!textInput.trim() || isAnalyzing}
                          variant="pink"
                        >
                          {isAnalyzing ? '分析中...' : '开始分析'}
                        </Button>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="voice" className="space-y-4">
                      <div className="border-2 border-dashed rounded-lg p-8 text-center">
                        <Zap className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                        <p className="text-gray-600">语音分析功能即将上线</p>
                        <Button variant="outline" disabled className="mt-4">
                          上传语音文件
                        </Button>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="image" className="space-y-4">
                      <div className="border-2 border-dashed rounded-lg p-8 text-center">
                        <TrendingUp className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                        <p className="text-gray-600">图像情感分析功能即将上线</p>
                        <Button variant="outline" disabled className="mt-4">
                          上传图像
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* 右侧分析结果区域 */}
            <div className="space-y-6">
              {analysisResult && (
                <>
                  <EmotionAnalysisResult result={analysisResult} />
                  <SocialSuggestions result={analysisResult} />
                  <EmotionTrends result={analysisResult} />
                </>
              )}
              
              {!analysisResult && (
                <Card>
                  <CardHeader>
                    <CardTitle>分析结果</CardTitle>
                    <CardDescription>
                      输入内容后，分析结果将在这里显示
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <Brain className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                      <p className="text-gray-500">等待分析...</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}