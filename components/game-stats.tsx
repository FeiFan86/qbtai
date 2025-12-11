'use client'

import { ReactNode } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface GameStatsProps {
  title?: string
  description?: string
  stats: Array<{
    value: string | number
    label: string
    icon?: ReactNode
    bgColor?: string
    textColor?: string
  }>
  className?: string
}

export default function GameStats({
  title = "游戏统计",
  description = "实时追踪你的游戏表现",
  stats,
  className = ""
}: GameStatsProps) {
  return (
    <Card className={`mb-8 bg-white/80 backdrop-blur-sm shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${className}`}>
      <CardHeader className="pb-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-b border-purple-200/30">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
            <div className="w-5 h-5 bg-white rounded"></div>
          </div>
          <div>
            <CardTitle className="text-lg font-bold">{title}</CardTitle>
            <CardDescription className="text-sm">{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className={`text-center p-4 rounded-xl border ${
                stat.bgColor || 'bg-gradient-to-br from-purple-50 to-pink-50'
              } ${
                stat.textColor || 'text-purple-600'
              } ${
                stat.bgColor?.includes('purple') ? 'border-purple-200/30' : 
                stat.bgColor?.includes('pink') ? 'border-pink-200/30' :
                stat.bgColor?.includes('blue') ? 'border-blue-200/30' :
                stat.bgColor?.includes('green') ? 'border-green-200/30' :
                'border-purple-200/30'
              }`}
            >
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
                {stat.icon}
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}