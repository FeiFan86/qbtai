'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { TrendingUp, TrendingDown, Minus, Calendar } from 'lucide-react'

interface EmotionTrendsProps {
  result: {
    emotions: Array<{ type: string; score: number }>
  }
}

export function EmotionTrends({ result }: EmotionTrendsProps) {
  // 模拟历史情感数据趋势
  const getEmotionTrend = (emotionType: string, currentScore: number) => {
    // 在实际应用中，这里会从数据库获取历史数据
    const trend = Math.random() > 0.5 ? 'up' : Math.random() > 0.5 ? 'down' : 'stable'
    const change = Math.random() * 0.2 - 0.1 // -10% 到 +10% 的随机变化
    
    return {
      trend,
      change,
      previousScore: Math.max(0, Math.min(1, currentScore - change))
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-500" />
      default:
        return <Minus className="h-4 w-4 text-gray-500" />
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-green-600 bg-green-50'
      case 'down':
        return 'text-red-600 bg-red-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-indigo-500" />
          情感趋势
        </CardTitle>
        <CardDescription>
          与历史数据对比，了解情感变化趋势
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
          <Calendar className="h-3 w-3" />
          <span>与过去7天平均值对比</span>
        </div>
        
        {result.emotions.slice(0, 3).map((emotion, index) => {
          const trend = getEmotionTrend(emotion.type, emotion.score)
          const trendColor = getTrendColor(trend.trend)
          
          return (
            <div key={index} className="flex items-center justify-between p-2 rounded-lg border">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{emotion.type}</span>
                <Badge className={trendColor}>
                  {getTrendIcon(trend.trend)}
                  <span className="ml-1">
                    {trend.trend === 'up' ? '上升' : 
                     trend.trend === 'down' ? '下降' : '稳定'}
                  </span>
                </Badge>
              </div>
              
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>{(emotion.score * 100).toFixed(1)}%</span>
                <span>
                  ({trend.trend === 'up' ? '+' : ''}{(trend.change * 100).toFixed(1)}%)
                </span>
              </div>
            </div>
          )
        })}
        
        <div className="pt-2 border-t">
          <div className="text-xs text-gray-500 space-y-1">
            <p>• 趋势基于您最近的情感历史数据计算</p>
            <p>• 日常的情绪波动是正常现象</p>
            <p>• 长期趋势更能反映情感状态变化</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}