'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from './ui/button'
import { Lightbulb, MessageSquare, ArrowRight, CheckCircle, TrendingUp } from 'lucide-react'

interface SocialStrategiesProps {
  result: {
    suggestions: {
      strategies: string[]
      phraseSuggestions: string[]
      improvements: string[]
    }
    outcome: {
      currentTrajectory: string
      idealOutcome: string
      nextSteps: string[]
    }
  }
}

export function SocialStrategies({ result }: SocialStrategiesProps) {
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
            {result.suggestions.strategies.map((strategy, index) => (
              <div key={index} className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <p className="text-sm">{strategy}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 话术建议 */}
        <div>
          <h4 className="text-sm font-medium mb-3">话术建议</h4>
          <div className="space-y-2">
            {result.suggestions.phraseSuggestions.map((phrase, index) => (
              <div key={index} className="border rounded-lg p-2 bg-blue-50">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-blue-500" />
                  <p className="text-sm italic">"{phrase}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 改进方向 */}
        <div>
          <h4 className="text-sm font-medium mb-3">改进方向</h4>
          <div className="flex flex-wrap gap-2">
            {result.suggestions.improvements.map((improvement, index) => (
              <Badge key={index} variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                {improvement}
              </Badge>
            ))}
          </div>
        </div>

        {/* 预测结果 */}
        <div className="pt-2 border-t">
          <div className="grid grid-cols-1 gap-3">
            <div>
              <h4 className="text-sm font-medium mb-1">当前发展趋势</h4>
              <div className="border rounded-lg p-3 bg-orange-50">
                <p className="text-sm text-orange-800">{result.outcome.currentTrajectory}</p>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-1">理想结果</h4>
              <div className="border rounded-lg p-3 bg-green-50">
                <p className="text-sm text-green-800">{result.outcome.idealOutcome}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 下一步行动 */}
        <div>
          <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-indigo-500" />
            下一步行动
          </h4>
          <div className="space-y-2">
            {result.outcome.nextSteps.map((step, index) => (
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