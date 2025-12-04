'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { UnifiedLayout } from '@/components/layout-unified'
import { MessageCircle, Users, Brain, Lightbulb, CheckCircle, AlertCircle, TrendingUp, Heart as HeartIcon, Mic, HeadphonesIcon, BookOpen, Stethoscope } from 'lucide-react'
import { ConversationAnalysis } from '@/components/conversation-analysis'
import { SocialStrategies } from '@/components/social-strategies'

export default function SocialAssistantPage() {
  const router = useRouter()
  const [conversationText, setConversationText] = useState('')
  const [context, setContext] = useState('')
  const [scenario, setScenario] = useState('casual')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const resultRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    setIsVisible(true)
  }, [])
  
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
      example: '老板: 这个项目为什么延期了？\n我: 是因为技术上遇到了一些挑战...\n老板: 这些挑战之前没有考虑到吗？\n我: 我觉得这些风险评估可能有些不足...',
      scenario: 'work',
      icon: <BookOpen className="h-5 w-5 text-blue-500" />
    },
    {
      title: '情侣交流',
      description: '分析情侣间的对话，改善沟通方式',
      example: 'A: 你最近工作好像很忙，都没时间陪我\nB: 我知道，最近项目太忙了，我也不想这样\nA: 我理解，但我们需要时间在一起\nB: 这个项目完成后，我一定多陪你好吗？',
      scenario: 'couple',
      icon: <HeartIcon className="h-5 w-5 text-rose-500" />
    },
    {
      title: '家庭关系',
      description: '分析家庭成员间的沟通问题',
      example: '妈妈: 你怎么又不做家务？\n我: 今天太累了，明天再做吧\n妈妈: 你总是说明天，明天...\n我: 我知道这让你失望了，但我真的很累',
      scenario: 'family',
      icon: <Users className="h-5 w-5 text-green-500" />
    },
    {
      title: '朋友间沟通',
      description: '分析朋友间的交流，改善友谊',
      example: '朋友: 你怎么最近都不回我消息？\n我: 最近真的很忙，事情太多了\n朋友: 再忙也有时间回个消息吧\n我: 你说得对，我应该多联系你',
      scenario: 'friends',
      icon: <MessageCircle className="h-5 w-5 text-purple-500" />
    }
  ]

  const socialScenarios = [
    { id: 'casual', label: '日常交流' },
    { id: 'work', label: '职场沟通' },
    { id: 'couple', label: '情侣交流' },
    { id: 'family', label: '家庭关系' },
    { id: 'friends', label: '朋友交流' },
    { id: 'conflict', label: '冲突解决' }
  ]

  return (
    <UnifiedLayout 
      title="社交助手"
      subtitle="提升人际沟通"
      icon={<MessageCircle className="h-4 w-4 text-rose-500" />}
    >
      {/* 主要功能区域 */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* 左侧 - 分析输入区 */}
        <div className="lg:col-span-2">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900">
                <div className="flex items-center space-x-2">
                  <MessageCircle className="h-6 w-6 text-rose-500" />
                  <span>社交对话分析</span>
                </div>
              </CardTitle>
              <CardDescription className="text-gray-600">
                输入对话内容，AI将为您分析沟通模式和提供改善建议
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="scenario">场景类型</Label>
                <Select value={scenario} onValueChange={setScenario}>
                  <SelectTrigger className="bg-white/50 border-white/20">
                    <SelectValue placeholder="选择对话场景" />
                  </SelectTrigger>
                  <SelectContent>
                    {socialScenarios.map(s => (
                      <SelectItem key={s.id} value={s.id}>{s.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="conversation">对话内容</Label>
                <Textarea
                  id="conversation"
                  placeholder="输入需要分析的对话内容，请按顺序包含各方发言..."
                  value={conversationText}
                  onChange={(e) => setConversationText(e.target.value)}
                  rows={8}
                  className="bg-white/50 border-white/20 resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="context">背景信息（可选）</Label>
                <Textarea
                  id="context"
                  placeholder="提供对话的背景信息，帮助AI更好地理解情境..."
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  rows={3}
                  className="bg-white/50 border-white/20 resize-none"
                />
              </div>

              {/* 分析进度条 */}
              {isAnalyzing && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">正在分析...</span>
                    <span className="text-sm text-gray-500">{analysisProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-rose-500 to-pink-500 rounded-full transition-all duration-300 ease-out"
                      style={{ width: `${analysisProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* 分析按钮 */}
              <div className="flex justify-center">
                <Button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || !conversationText.trim()}
                  className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-3 text-lg"
                  size="lg"
                >
                  {isAnalyzing ? (
                    <>
                      <Brain className="h-5 w-5 mr-2 animate-pulse" />
                      分析中...
                    </>
                  ) : (
                    <>
                      <TrendingUp className="h-5 w-5 mr-2" />
                      开始分析
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 右侧 - 示例和功能介绍 */}
        <div className="lg:col-span-1 space-y-6">
          {/* 对话示例 */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900">对话示例</CardTitle>
              <CardDescription>点击加载示例文本</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {conversationExamples.map((example, index) => (
                <div 
                  key={index}
                  className="p-3 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleExampleSelect(example)}
                >
                  <div className="flex items-start space-x-2">
                    <div className="p-1 rounded bg-white">
                      {example.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 text-sm">{example.title}</h4>
                      <p className="text-xs text-gray-600 mt-1">{example.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* 功能特色 */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900">功能特色</CardTitle>
              <CardDescription>强大的社交分析能力</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-gray-900">多场景分析</h4>
                  <p className="text-sm text-gray-600">支持各种社交场景的对话分析</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Lightbulb className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-gray-900">智能建议</h4>
                  <p className="text-sm text-gray-600">提供个性化的沟通改善建议</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Brain className="h-5 w-5 text-purple-500 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-gray-900">深度分析</h4>
                  <p className="text-sm text-gray-600">分析对话中的情感和沟通模式</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 分析结果区域 */}
      {analysisResult && (
        <div ref={resultRef} className={`mt-12 transition-all duration-500 ${analysisResult ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <ConversationAnalysis result={analysisResult.result || analysisResult} />
        </div>
      )}

      {/* 社交策略建议 */}
      {analysisResult && (
        <div className="mt-8">
          <SocialStrategies result={analysisResult.result || analysisResult} />
        </div>
      )}
    </UnifiedLayout>
  )
}