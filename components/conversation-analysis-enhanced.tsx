'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { MessageCircle, Users, TrendingUp, AlertTriangle, RefreshCw } from 'lucide-react'
import { LoadingSkeleton } from './loading-skeleton'
import { LoadingSpinner } from './loading-spinner'

// 临时替代 cn 函数
const cn = (...classes: (string | undefined)[]) => {
  return classes.filter(Boolean).join(' ')
}

interface ConversationAnalysisProps {
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

export function ConversationAnalysisEnhanced({ result, loading = false, error, onRetry }: ConversationAnalysisProps) {
  const getToneColor = (tone: string) => {
    switch (tone.toLowerCase()) {
      case 'positive':
        return 'text-green-600 bg-green-50'
      case 'negative':
        return 'text-red-600 bg-red-50'
      case 'mixed':
        return 'text-yellow-600 bg-yellow-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  const getPatternColor = (pattern: string) => {
    switch (pattern.toLowerCase()) {
      case 'cooperative':
        return 'text-green-600 bg-green-50'
      case 'conflict':
        return 'text-red-600 bg-red-50'
      case 'defensive':
        return 'text-orange-600 bg-orange-50'
      case 'open':
        return 'text-blue-600 bg-blue-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  const getEffectivenessColor = (score: number) => {
    if (score >= 0.8) return 'bg-green-500'
    if (score >= 0.5) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const getToneText = (tone: string) => {
    switch (tone.toLowerCase()) {
      case 'positive':
        return '积极'
      case 'negative':
        return '消极'
      case 'mixed':
        return '混合'
      default:
        return '中性'
    }
  }

  const getPatternText = (pattern: string) => {
    switch (pattern.toLowerCase()) {
      case 'cooperative':
        return '合作型'
      case 'conflict':
        return '冲突型'
      case 'defensive':
        return '防御型'
      case 'open':
        return '开放型'
      default:
        return '混合型'
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <LoadingSkeleton className="h-6 w-32" />
          <LoadingSkeleton className="h-4 w-48" />
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 情感分析骨架屏 */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <LoadingSkeleton className="h-4 w-24" />
              <LoadingSkeleton className="h-6 w-12 rounded-full" />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <LoadingSkeleton className="h-3 w-16 mb-1" />
                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <LoadingSkeleton className="h-2 w-full" />
                  </div>
                  <LoadingSkeleton className="h-3 w-8" />
                </div>
              </div>
              <div>
                <LoadingSkeleton className="h-3 w-16 mb-1" />
                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <LoadingSkeleton className="h-2 w-full" />
                  </div>
                  <LoadingSkeleton className="h-3 w-8" />
                </div>
              </div>
            </div>
          </div>

          {/* 参与者分析骨架屏 */}
          <div>
            <LoadingSkeleton className="h-4 w-20 mb-3" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2].map(i => (
                <div key={i} className="border rounded-lg p-3">
                  <LoadingSkeleton className="h-4 w-12 mb-2" />
                  <div className="space-y-2">
                    <div>
                      <LoadingSkeleton className="h-3 w-16 mb-1" />
                      <LoadingSkeleton className="h-5 w-20 rounded-full" />
                    </div>
                    <div>
                      <LoadingSkeleton className="h-3 w-16 mb-1" />
                      <div className="flex flex-wrap gap-1">
                        {[1, 2, 3].map(j => (
                          <LoadingSkeleton key={j} className="h-4 w-12 rounded-full" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
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
            <MessageCircle className="h-5 w-5" />
            分析失败
          </CardTitle>
          <CardDescription className="text-red-500">
            {error}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={onRetry} variant="outline" className="w-full">
            <RefreshCw className="h-4 w-4 mr-2" />
            重试分析
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (!result) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-8 text-center">
          <MessageCircle className="h-12 w-12 text-gray-300 mb-4" />
          <p className="text-gray-500">暂无分析数据</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-blue-500" />
          对话分析
        </CardTitle>
        <CardDescription>
          对话内容的情感和沟通模式分析
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 整体情感分析 */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">整体情感倾向</span>
            <Badge className={getToneColor(result.conversationAnalysis.overallSentiment)}>
              {getToneText(result.conversationAnalysis.overallSentiment)}
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <span className="text-xs text-gray-500">情商得分</span>
              <div className="flex items-center gap-2">
                <Progress 
                  value={result.conversationAnalysis.emotionalIntelligence * 100} 
                  className="h-2 flex-1"
                />
                <span className="text-xs text-gray-500">
                  {(result.conversationAnalysis.emotionalIntelligence * 100).toFixed(0)}%
                </span>
              </div>
            </div>
            
            <div>
              <span className="text-xs text-gray-500">同理心得分</span>
              <div className="flex items-center gap-2">
                <Progress 
                  value={result.conversationAnalysis.empathyScore * 100} 
                  className="h-2 flex-1"
                />
                <span className="text-xs text-gray-500">
                  {(result.conversationAnalysis.empathyScore * 100).toFixed(0)}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 参与者分析 */}
        <div>
          <h4 className="text-sm font-medium mb-3">参与者分析</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 用户分析 */}
            <div className="border rounded-lg p-3 bg-blue-50">
              <h5 className="font-medium text-sm mb-2">用户</h5>
              <div className="space-y-2">
                <div>
                  <span className="text-xs text-gray-500">情感状态</span>
                  <Badge variant="outline" className="text-xs mt-1">
                    {result.participantAnalysis.user.emotionalState}
                  </Badge>
                </div>
                <div>
                  <span className="text-xs text-gray-500">沟通风格</span>
                  <Badge variant="outline" className="text-xs mt-1">
                    {result.participantAnalysis.user.communicationStyle}
                  </Badge>
                </div>
                <div>
                  <span className="text-xs text-gray-500">需求</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {result.participantAnalysis.user.needs.map((need, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {need}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 对方分析 */}
            <div className="border rounded-lg p-3 bg-green-50">
              <h5 className="font-medium text-sm mb-2">对方</h5>
              <div className="space-y-2">
                <div>
                  <span className="text-xs text-gray-500">情感状态</span>
                  <Badge variant="outline" className="text-xs mt-1">
                    {result.participantAnalysis.other.emotionalState}
                  </Badge>
                </div>
                <div>
                  <span className="text-xs text-gray-500">沟通风格</span>
                  <Badge variant="outline" className="text-xs mt-1">
                    {result.participantAnalysis.other.communicationStyle}
                  </Badge>
                </div>
                <div>
                  <span className="text-xs text-gray-500">需求</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {result.participantAnalysis.other.needs.map((need, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {need}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 改进建议 */}
        {result.improvementSuggestions.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-orange-500" />
              改进建议
            </h4>
            <div className="space-y-2">
              {result.improvementSuggestions.map((suggestion, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5"></div>
                  <p className="text-sm text-gray-600">{suggestion}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 回应模板 */}
        {result.responseTemplates.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2">回应模板</h4>
            <div className="space-y-2">
              {result.responseTemplates.map((template, index) => (
                <div key={index} className="border rounded-lg p-3 bg-blue-50">
                  <p className="text-sm italic">"{template}"</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}