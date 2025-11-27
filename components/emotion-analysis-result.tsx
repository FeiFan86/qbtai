'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from './ui/progress'
import { Heart, Frown, Meh, Smile, Laugh } from 'lucide-react'

interface Emotion {
  type: string
  score: number
  color: string
  icon: React.ReactNode
}

interface EmotionAnalysisResultProps {
  result: {
    emotions: Emotion[]
    overall: {
      sentiment: string
      confidence: number
    }
    keywords: string[]
    summary: string
  }
}

export function EmotionAnalysisResult({ result }: EmotionAnalysisResultProps) {
  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return <Laugh className="h-5 w-5 text-green-500" />
      case 'negative':
        return <Frown className="h-5 w-5 text-red-500" />
      default:
        return <Meh className="h-5 w-5 text-gray-500" />
    }
  }

  const getSentimentBadgeVariant = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'default'
      case 'negative':
        return 'destructive'
      default:
        return 'secondary'
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-pink-500" />
          情感分析结果
        </CardTitle>
        <CardDescription>
          AI对您输入内容的情感分析结果
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 整体情感倾向 */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">整体情感倾向</span>
            <Badge variant={getSentimentBadgeVariant(result.overall.sentiment)}>
              {getSentimentIcon(result.overall.sentiment)}
              <span className="ml-1">
                {result.overall.sentiment === 'positive' ? '积极' : 
                 result.overall.sentiment === 'negative' ? '消极' : '中性'}
              </span>
            </Badge>
          </div>
          <Progress value={result.overall.confidence * 100} className="h-2" />
          <p className="text-xs text-gray-500 mt-1">
            置信度: {(result.overall.confidence * 100).toFixed(1)}%
          </p>
        </div>

        {/* 详细情感分析 */}
        <div>
          <h4 className="text-sm font-medium mb-3">情感细分</h4>
          <div className="space-y-3">
            {result.emotions.map((emotion, index) => (
              <div key={index} className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {emotion.icon}
                    <span className="text-sm">{emotion.type}</span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {(emotion.score * 100).toFixed(1)}%
                  </span>
                </div>
                <Progress value={emotion.score * 100} className="h-1.5" />
              </div>
            ))}
          </div>
        </div>

        {/* 关键词提取 */}
        <div>
          <h4 className="text-sm font-medium mb-2">关键词</h4>
          <div className="flex flex-wrap gap-2">
            {result.keywords.map((keyword, index) => (
              <Badge key={index} variant="outline">
                {keyword}
              </Badge>
            ))}
          </div>
        </div>

        {/* 分析摘要 */}
        <div>
          <h4 className="text-sm font-medium mb-2">分析摘要</h4>
          <p className="text-sm text-gray-600">{result.summary}</p>
        </div>
      </CardContent>
    </Card>
  )
}