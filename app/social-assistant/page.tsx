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
import { MessageCircle, Users, Brain, Lightbulb, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react'
import { ConversationAnalysis } from '@/components/conversation-analysis'
import { SocialStrategies } from '@/components/social-strategies'

export default function SocialAssistantPage() {
  const [conversationText, setConversationText] = useState('')
  const [context, setContext] = useState('')
  const [scenario, setScenario] = useState('casual')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<any>(null)

  const handleAnalyze = async () => {
    if (!conversationText.trim()) return
    
    setIsAnalyzing(true)
    try {
      const response = await fetch('/api/social/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          conversation: conversationText,
          context,
          scenario
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

  const conversationExamples = [
    {
      title: '职场沟通',
      description: '分析工作中的对话，提供专业建议',
      icon: <Users className="h-5 w-5 text-blue-500" />,
      scenario: 'professional',
      example: '老板：项目进度如何了？\n我：目前遇到一些技术难题，可能需要延期。'
    },
    {
      title: '情侣对话',
      description: '改善亲密关系中的沟通方式',
      icon: <MessageCircle className="h-5 w-5 text-pink-500" />,
      scenario: 'romantic',
      example: '伴侣：你最近总是忙工作，都没时间陪我。'
    },
    {
      title: '朋友交流',
      description: '优化与朋友的日常对话',
      icon: <Users className="h-5 w-5 text-green-500" />,
      scenario: 'casual',
      example: '朋友：最近感觉怎么样？\n我：还行，就是工作有点压力。'
    },
    {
      title: '冲突调解',
      description: '提供冲突处理和解决方案',
      icon: <AlertCircle className="h-5 w-5 text-orange-500" />,
      scenario: 'conflict',
      example: 'A：你总是不尊重我的意见！\nB：我没有，只是我们的看法不同。'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold tracking-tight gradient-text mb-4">
              社交互动助手
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              智能分析对话内容，提供专业的社交策略和话术建议，改善您的沟通技巧
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 左侧输入区域 */}
            <div className="lg:col-span-2 space-y-6">
              {/* 场景示例 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-yellow-500" />
                    场景示例
                  </CardTitle>
                  <CardDescription>
                    选择一个场景，快速了解如何优化对话
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {conversationExamples.map((example, index) => (
                      <div 
                        key={index}
                        className="border rounded-lg p-3 cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => {
                          setConversationText(example.example)
                          setScenario(example.scenario)
                        }}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          {example.icon}
                          <span className="font-medium text-sm">{example.title}</span>
                        </div>
                        <p className="text-xs text-gray-600">{example.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 对话分析 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-purple-500" />
                    对话分析
                  </CardTitle>
                  <CardDescription>
                    输入对话内容，获取智能分析和建议
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="scenario">社交场景</Label>
                    <Select value={scenario} onValueChange={setScenario}>
                      <SelectTrigger>
                        <SelectValue placeholder="选择社交场景" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="casual">日常闲聊</SelectItem>
                        <SelectItem value="professional">职场沟通</SelectItem>
                        <SelectItem value="romantic">亲密关系</SelectItem>
                        <SelectItem value="conflict">冲突处理</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="conversation">对话内容 *</Label>
                    <Textarea
                      id="conversation"
                      placeholder="粘贴或输入您想分析的对话内容..."
                      value={conversationText}
                      onChange={(e) => setConversationText(e.target.value)}
                      rows={8}
                      className="resize-none"
                    />
                  </div>

                  <div>
                    <Label htmlFor="context">背景信息（可选）</Label>
                    <Textarea
                      id="context"
                      placeholder="提供相关背景信息，如关系状态、发生场景等..."
                      value={context}
                      onChange={(e) => setContext(e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button 
                      onClick={handleAnalyze} 
                      disabled={!conversationText.trim() || isAnalyzing}
                      variant="pink"
                    >
                      {isAnalyzing ? '分析中...' : '分析对话'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 右侧分析结果区域 */}
            <div className="space-y-6">
              {analysisResult && (
                <>
                  <ConversationAnalysis result={analysisResult} />
                  <SocialStrategies result={analysisResult} />
                </>
              )}
              
              {!analysisResult && (
                <Card>
                  <CardHeader>
                    <CardTitle>分析结果</CardTitle>
                    <CardDescription>
                      对话分析结果和社交建议将在这里显示
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

              {/* 社交技巧提示 */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">社交技巧</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">积极倾听</p>
                      <p className="text-xs text-gray-600">给予对方充分的表达空间</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <TrendingUp className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">情感共鸣</p>
                      <p className="text-xs text-gray-600">理解和回应对方的情感</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">避免评判</p>
                      <p className="text-xs text-gray-600">保持开放和包容的态度</p>
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