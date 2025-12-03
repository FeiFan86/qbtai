'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Play, 
  Star, 
  Users, 
  Clock, 
  Trophy, 
  Heart, 
  Gamepad2,
  ArrowRight,
  Lock,
  Flame,
  Sparkles
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface GameCardProps {
  game: {
    id: string
    title: string
    description: string
    icon: React.ReactNode
    difficulty: '简单' | '中等' | '困难'
    players: '单人' | '双人' | '多人'
    rating: number
    playCount: number
    isNew?: boolean
    isHot?: boolean
    isLocked?: boolean
    progress?: number
    features: string[]
    href: string
    gradient: string
    bgPattern: string
  }
  className?: string
  size?: 'default' | 'compact'
}

export function GameCard({ game, className, size = 'default' }: GameCardProps) {
  const difficultyColors = {
    '简单': 'bg-green-100 text-green-800',
    '中等': 'bg-yellow-100 text-yellow-800',
    '困难': 'bg-red-100 text-red-800'
  }

  const playerIcons = {
    '单人': <Users className="h-3 w-3" />,
    '双人': <Heart className="h-3 w-3" />,
    '多人': <Gamepad2 className="h-3 w-3" />
  }

  const isCompact = size === 'compact'

  return (
    <Card className={cn(
      'group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02]',
      className
    )}>
      {/* 渐变背景效果 */}
      <div className={`absolute inset-0 bg-gradient-to-br ${game.gradient} opacity-5 group-hover:opacity-10 transition-opacity`} />
      
      {/* 锁定状态遮罩 */}
      {game.isLocked && (
        <div className="absolute inset-0 bg-black/50 z-10 flex items-center justify-center">
          <Lock className="h-8 w-8 text-white" />
        </div>
      )}
      
      <CardHeader className={cn(
        "relative",
        isCompact ? "pb-2" : "pb-4"
      )}>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className={cn(
              "flex items-center justify-center rounded-lg p-2",
              game.isLocked ? "bg-gray-200" : `${game.bgPattern}`
            )}>
              {game.icon}
            </div>
            <div className="flex-1">
              <CardTitle className={cn(
                "text-gray-900 group-hover:text-purple-700 transition-colors",
                isCompact ? "text-base" : "text-lg"
              )}>
                {game.title}
              </CardTitle>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="outline" className={difficultyColors[game.difficulty]}>
                  {game.difficulty}
                </Badge>
                <Badge variant="outline" className="flex items-center space-x-1">
                  {playerIcons[game.players]}
                  <span>{game.players}</span>
                </Badge>
                {game.isNew && (
                  <Badge className="bg-green-500 hover:bg-green-600">
                    <Sparkles className="h-3 w-3 mr-1" />
                    新
                  </Badge>
                )}
                {game.isHot && (
                  <Badge className="bg-red-500 hover:bg-red-600">
                    <Flame className="h-3 w-3 mr-1" />
                    热
                  </Badge>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-end space-y-1">
            <div className="flex items-center text-sm">
              <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
              <span className="font-medium">{game.rating}</span>
            </div>
            {!isCompact && (
              <div className="flex items-center text-sm text-gray-500">
                <Play className="h-3 w-3 mr-1" />
                <span>{game.playCount.toLocaleString()}</span>
              </div>
            )}
          </div>
        </div>
        
        {!isCompact && (
          <CardDescription className="mt-2">
            {game.description}
          </CardDescription>
        )}
      </CardHeader>
      
      <CardContent className={cn(
        "relative space-y-3",
        isCompact ? "pt-0" : "pt-0"
      )}>
        {!isCompact && game.progress !== undefined && (
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>游戏进度</span>
              <span>{game.progress}%</span>
            </div>
            <Progress value={game.progress} className="h-2" />
          </div>
        )}
        
        {!isCompact && game.features.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {game.features.slice(0, 3).map((feature, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {feature}
              </Badge>
            ))}
            {game.features.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{game.features.length - 3}
              </Badge>
            )}
          </div>
        )}
        
        <Button 
          className="w-full group/btn" 
          disabled={game.isLocked}
          onClick={() => window.location.href = game.href}
        >
          {game.isLocked ? (
            <>已锁定</>
          ) : (
            <>
              开始游戏
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}