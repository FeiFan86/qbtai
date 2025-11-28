'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from './ui/button'
import { Lightbulb, MessageSquare, ArrowRight, CheckCircle, TrendingUp } from 'lucide-react'
import { LoadingSkeleton } from './loading-skeleton'
import { LoadingSpinner } from './loading-spinner'

interface SocialStrategiesProps {
  result?: {
    conversationAnalysis: {
      overallSentiment: string
      communicationStyle: string
      emotionalIntelligence: number
      conflictLevel: number
      empathyScore: number
    }
    participantAnalysis: {
      user: {
        emotionalState: string
        communicationStyle: string
        needs: string[]
        strengths: string[]
      }
      other: {
        emotionalState: string
        communicationStyle: string
        needs: string[]
        strengths: string[]
      }
    }
    improvementSuggestions: string[]
    responseTemplates: string[]
  }
  loading?: boolean
  error?: string
  onRetry?: () => void
}

export function SocialStrategiesEnhanced({ result, loading = false, error, onRetry }: SocialStrategiesProps) {
  // 基于分析结果生成策略建议
  const getCommunicationStrategies = () => {
    if (!result) return []
    const strategies = []
    
    // 基于情感倾向的策略
    if (result.conversationAnalysis.overallSentiment === 'positive') {
      strategies.push('继续保持积极态度，增强双方的信任关系')
      strategies.push('适时表达赞赏和肯定，强化积极氛围')
    } else if (result.conversationAnalysis.overallSentiment === 'negative') {
      strategies.push('先处理情绪，再处理问题，避免情绪升级')
      strategies.push('使用"我"开头的表达方式，减少指责性语言')
    }
    
    // 基于沟通风格的策略
    if (result.conversationAnalysis.communicationStyle === 'assertive') {
      strategies.push('平衡自信表达与尊重对方感受')
    } else if (result.conversationAnalysis.communicationStyle === 'defensive') {
      strategies.push('尝试开放心态，减少防御性反应')
    }
    
    // 基于冲突程度的策略
    if (result.conversationAnalysis.conflictLevel > 0.5) {
      strategies.push('先暂停对话，等情绪平复后再继续')
      strategies.push('寻找共同点，建立共识基础')
    }
    
    return strategies
  }

  // 生成行动建议
  const getActionSteps = () => {
    if (!result) return []
    const steps = []
    
    if (result.conversationAnalysis.empathyScore < 0.6) {
      steps.push('练习换位思考，理解对方立场')
    }
    
    if (result.conversationAnalysis.emotionalIntelligence < 0.7) {
      steps.push('提高情绪觉察能力，识别双方情绪变化')
    }
    
    if (result.conversationAnalysis.conflictLevel > 0.3) {
      steps.push('学习非暴力沟通技巧，减少冲突')
    }
    
    steps.push('定期回顾对话，总结经验教训')
    steps.push('保持开放心态，持续改进沟通方式')
    
    return steps
  }

  const strategies = getCommunicationStrategies()
  const actionSteps = getActionSteps()

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <LoadingSkeleton className="h-6 w-48" />
          <LoadingSkeleton className="h-4 w-64" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <LoadingSkeleton className="h-4 w-32 mb-3" />
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center gap-2 mb-2">
                <LoadingSkeleton className="h-4 w-4 rounded-full" />
                <LoadingSkeleton className="h-4 flex-1" />
              </div>
            ))}
          </div>
          <div>
            <LoadingSkeleton className="h-4 w-32 mb-3" />
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3].map(i => (
                <LoadingSkeleton key={i} className="h-6 w-16 rounded-full" />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600">
            <Lightbulb className="h-5 w-5" />
            加载失败
          </CardTitle>
          <CardDescription className="text-red-500">
            {error}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={onRetry} variant="outline" className="w-full">
            <Lightbulb className="h-4 w-4 mr-2" />
            重试加载
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (!result) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-8 text-center">
          <Lightbulb className="h-12 w-12 text-gray-300 mb-4" />
          <p className="text-gray-500">暂无分析数据</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-yellow-500" />
          社交策略建议
        </CardTitle>
        <CardDescription>
          基于对话分析的个性化社交建议
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 沟通策略 */}
        <div>
          <h4 className="text-sm font-medium mb-3">推荐沟通策略</h4>
          <div className="space-y-2">
            {strategies.map((strategy, index) => (
              <div key={index} className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <p className="text-sm">{strategy}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 对方需求分析 */}
        <div>
          <h4 className="text-sm font-medium mb-3">对方需求分析</h4>
          <div className="flex flex-wrap gap-2">
            {result.participantAnalysis.other.needs.map((need, index) => (
              <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                {need}
              </Badge>
            ))}
          </div>
        </div>

        {/* 用户优势分析 */}
        <div>
          <h4 className="text-sm font-medium mb-3">您的沟通优势</h4>
          <div className="flex flex-wrap gap-2">
            {result.participantAnalysis.user.strengths.map((strength, index) => (
              <Badge key={index} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                {strength}
              </Badge>
            ))}
          </div>
        </div>

        {/* 改进建议 */}
        {result.improvementSuggestions.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-3">具体改进建议</h4>
            <div className="space-y-2">
              {result.improvementSuggestions.map((suggestion, index) => (
                <div key={index} className="border rounded-lg p-2 bg-purple-50">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-purple-500" />
                    <p className="text-sm">{suggestion}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 下一步行动 */}
        <div>
          <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-indigo-500" />
            下一步行动
          </h4>
          <div className="space-y-2">
            {actionSteps.map((step, index) => (
              <div key={index} className="flex items-center justify-between border rounded-lg p-2">
                <p className="text-sm">{step}</p>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}