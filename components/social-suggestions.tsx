'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from './ui/button'
import { MessageSquare, Users, Lightbulb, ArrowRight } from 'lucide-react'

interface SocialSuggestionsProps {
  result: {
    emotions: Array<{ type: string; score: number }>
    overall: { sentiment: string }
  }
}

export function SocialSuggestions({ result }: SocialSuggestionsProps) {
  // 基于情感分析结果生成建议
  const generateSuggestions = () => {
    const { sentiment } = result.overall
    const dominantEmotion = result.emotions.reduce((prev, current) => 
      prev.score > current.score ? prev : current
    )

    const suggestions = {
      positive: [
        {
          title: "分享积极情绪",
          description: "当前情绪很好，适合与朋友分享好消息",
          icon: <MessageSquare className="h-5 w-5 text-green-500" />,
          tags: ["社交", "分享", "积极"],
          action: "查看分享话术"
        },
        {
          title: "组织社交活动",
          description: "利用当前好心情组织聚会或活动",
          icon: <Users className="h-5 w-5 text-blue-500" />,
          tags: ["组织", "活动", "聚会"],
          action: "获取活动建议"
        }
      ],
      negative: [
        {
          title: "情绪疏导建议",
          description: "当前情绪偏低，建议与信任的人交流",
          icon: <MessageSquare className="h-5 w-5 text-orange-500" />,
          tags: ["疏导", "交流", "支持"],
          action: "查看疏导方法"
        },
        {
          title: "自我关怀技巧",
          description: "学习一些有效的情绪管理技巧",
          icon: <Lightbulb className="h-5 w-5 text-purple-500" />,
          tags: ["自我关怀", "情绪管理", "技巧"],
          action: "学习管理技巧"
        }
      ],
      neutral: [
        {
          title: "社交互动建议",
          description: "当前情绪平稳，适合进行理性对话",
          icon: <Users className="h-5 w-5 text-gray-500" />,
          tags: ["理性", "对话", "平稳"],
          action: "查看对话策略"
        },
        {
          title: "兴趣探索",
          description: "利用平稳状态探索新兴趣爱好",
          icon: <Lightbulb className="h-5 w-5 text-indigo-500" />,
          tags: ["探索", "兴趣", "发展"],
          action: "发现新兴趣"
        }
      ]
    }

    return suggestions[sentiment as keyof typeof suggestions] || suggestions.neutral
  }

  const suggestions = generateSuggestions()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-purple-500" />
          智能社交建议
        </CardTitle>
        <CardDescription>
          基于您的情感状态，为您提供个性化的社交建议
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {suggestions.map((suggestion, index) => (
          <div key={index} className="border rounded-lg p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="mt-0.5">{suggestion.icon}</div>
                <div>
                  <h4 className="font-medium text-sm">{suggestion.title}</h4>
                  <p className="text-xs text-gray-600 mt-1">{suggestion.description}</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="h-8 px-2">
                {suggestion.action}
                <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-1">
              {suggestion.tags.map((tag, tagIndex) => (
                <Badge key={tagIndex} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        ))}
        
        <div className="pt-2 border-t">
          <Button variant="outline" className="w-full">
            获取更多个性化建议
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}