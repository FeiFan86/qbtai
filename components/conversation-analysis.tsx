'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from './ui/progress'
import { MessageCircle, Users, TrendingUp, AlertTriangle } from 'lucide-react'

interface ConversationAnalysisProps {
  result: {
    emotionAnalysis: {
      participants: string[]
      emotions: Array<{
        participant: string
        emotions: string[]
        score: number
      }>
      overallTone: string
    }
    communicationPatterns: {
      pattern: string
      effectiveness: number
      issues: string[]
    }
  }
}

export function ConversationAnalysis({ result }: ConversationAnalysisProps) {
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
        {/* 整体基调 */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">对话基调</span>
            <Badge className={getToneColor(result.emotionAnalysis.overallTone)}>
              {getToneText(result.emotionAnalysis.overallTone)}
            </Badge>
          </div>
        </div>

        {/* 参与者情感状态 */}
        <div>
          <h4 className="text-sm font-medium mb-3">参与者情感状态</h4>
          <div className="space-y-3">
            {result.emotionAnalysis.emotions.map((emotion, index) => (
              <div key={index} className="border rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm">{emotion.participant}</span>
                  <span className="text-xs text-gray-500">
                    情感强度: {(emotion.score * 100).toFixed(0)}%
                  </span>
                </div>
                <Progress value={emotion.score * 100} className="h-1.5 mb-2" />
                <div className="flex flex-wrap gap-1">
                  {emotion.emotions.map((emotionName, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {emotionName}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 沟通模式 */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">沟通模式</span>
            <Badge className={getPatternColor(result.communicationPatterns.pattern)}>
              {getPatternText(result.communicationPatterns.pattern)}
            </Badge>
          </div>
          <div className="mb-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-500">沟通效果</span>
              <span className="text-xs text-gray-500">
                {(result.communicationPatterns.effectiveness * 100).toFixed(0)}%
              </span>
            </div>
            <Progress 
              value={result.communicationPatterns.effectiveness * 100} 
              className="h-2"
              // 这里无法直接使用动态类名，需要改进
            />
          </div>
        </div>

        {/* 存在的问题 */}
        {result.communicationPatterns.issues.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-orange-500" />
              潜在问题
            </h4>
            <div className="space-y-2">
              {result.communicationPatterns.issues.map((issue, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5"></div>
                  <p className="text-xs text-gray-600">{issue}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}