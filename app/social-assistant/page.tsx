'use client'

import { useState, useRef, useEffect } from 'react'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { MessageCircle, Users, Brain, Lightbulb, CheckCircle, AlertCircle, TrendingUp, Home, HeadphonesIcon, BookOpen, Stethoscope } from 'lucide-react'
import { ConversationAnalysis } from '@/components/conversation-analysis'
import { SocialStrategies } from '@/components/social-strategies'

export default function SocialAssistantPage() {
  const [conversationText, setConversationText] = useState('')
  const [context, setContext] = useState('')
  const [scenario, setScenario] = useState('casual')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const resultRef = useRef<HTMLDivElement>(null)
  
  // 处理示例选择
  const handleExampleSelect = (example: any) => {
    setConversationText(example.example)
    setScenario(example.scenario)
  }

  const handleAnalyze = async () => {
    if (!conversationText.trim()) return
    
    setIsAnalyzing(true)
    setAnalysisResult(null) // 重置之前的分析结果
    setAnalysisProgress(0)
    
    // 模拟分析进度
    const progressInterval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval)
          return 90
        }
        return prev + 10
      })
    }, 200)
    
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
      
      const result = await response.json()
      console.log('社交分析结果:', result)
      
      if (response.ok && result.success && result.data) {
        clearInterval(progressInterval)
        setAnalysisProgress(100)
        
        // 短暂延迟后设置结果并跳转
        setTimeout(() => {
          setAnalysisResult(result.data)
          // 自动滚动到结果区域
          setTimeout(() => {
            resultRef.current?.scrollIntoView({ behavior: 'smooth' })
          }, 100)
        }, 300)
      } else {
        clearInterval(progressInterval)
        console.error('API返回错误:', result.error)
        const errorMessage = result.error || '分析失败，请稍后重试'
        alert(errorMessage)
      }
    } catch (error) {
      clearInterval(progressInterval)
      console.error('请求错误:', error)
      alert('网络错误，请检查连接后重试')
    } finally {
      // 确保进度条完成
      setTimeout(() => {
        setIsAnalyzing(false)
        setAnalysisProgress(0)
      }, 2000)
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
    },
    {
      title: '家庭关系',
      description: '改善家庭成员之间的沟通',
      icon: <Home className="h-5 w-5 text-purple-500" />,
      scenario: 'family',
      example: '父母：你怎么又这么晚回来？\n我：公司加班，没办法。'
    },
    {
      title: '客户服务',
      description: '提升客户服务沟通技巧',
      icon: <HeadphonesIcon className="h-5 w-5 text-cyan-500" />,
      scenario: 'service',
      example: '客户：你们的产品质量太差了！\n客服：非常抱歉给您带来不便，请详细说明问题。'
    },
    {
      title: '教育场景',
      description: '师生沟通技巧提升',
      icon: <BookOpen className="h-5 w-5 text-indigo-500" />,
      scenario: 'education',
      example: '学生：这个概念太难了，我完全听不懂。\n老师：没关系，我们换个方式解释。'
    },
    {
      title: '医疗沟通',
      description: '医患沟通技巧优化',
      icon: <Stethoscope className="h-5 w-5 text-red-500" />,
      scenario: 'medical',
      example: '患者：医生，我检查结果怎么样？\n医生：根据检查结果，您的身体状况总体良好。'
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

          <div className="space-y-6">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {conversationExamples.map((example, index) => (
                    <div 
                      key={index}
                      className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => handleExampleSelect(example)}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        {example.icon}
                        <span className="font-medium">{example.title}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{example.description}</p>
                      <div className="text-xs text-gray-500 bg-gray-100 p-2 rounded">
                        点击填充示例对话
                      </div>
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
                    输入对话内容，获取专业的社交分析和个性化改进建议
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
                        <SelectItem value="family">家庭关系</SelectItem>
                        <SelectItem value="service">客户服务</SelectItem>
                        <SelectItem value="education">教育场景</SelectItem>
                        <SelectItem value="medical">医疗沟通</SelectItem>
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

                  {/* 分析进度条 */}
                  {isAnalyzing && (
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">正在分析对话内容...</span>
                        <span className="text-sm font-medium text-purple-600">{analysisProgress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full transition-all duration-300 ease-out"
                          style={{ width: `${analysisProgress}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500 space-y-1">
                        {analysisProgress < 30 && <div>📝 正在解析对话内容...</div>}
                        {analysisProgress >= 30 && analysisProgress < 60 && <div>🔍 正在分析情感倾向...</div>}
                        {analysisProgress >= 60 && analysisProgress < 90 && <div>🧠 正在生成社交策略...</div>}
                        {analysisProgress >= 90 && <div>✨ 分析完成，正在生成报告...</div>}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end">
                    <Button 
                      onClick={handleAnalyze} 
                      disabled={!conversationText.trim() || isAnalyzing}
                      variant="pink"
                      className="relative"
                    >
                      {isAnalyzing ? (
                        <>
                          <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
                          分析中...
                          <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-400 rounded-md opacity-20 animate-pulse"></div>
                        </>
                      ) : (
                        '分析对话'
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

            {/* 分析结果区域 */}
            {analysisResult && (
              <div ref={resultRef} className="space-y-6 scroll-mt-20">
                <div className="text-center mb-4">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-medium">分析完成</span>
                  </div>
                </div>
                <ConversationAnalysis result={analysisResult} />
                <SocialStrategies result={analysisResult} />
              </div>
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
      </main>
      
      <Footer />
    </div>
  )
}