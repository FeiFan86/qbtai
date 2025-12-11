// 游戏卡片组件 - 用于游戏列表展示
import React from 'react'
import { Play, Star, Users, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { GAME_CONFIGS, GameId } from '@/lib/game-engine'

interface GameCardProps {
  gameId: GameId
  popularity?: number
  rating?: number
  onPlay?: (gameId: GameId) => void
  className?: string
}

export function GameCard({
  gameId,
  popularity = 0,
  rating = 0,
  onPlay,
  className
}: GameCardProps) {
  const config = GAME_CONFIGS[gameId]
  
  if (!config) return null

  const handlePlay = () => {
    onPlay?.(gameId)
  }

  return (
    <div className={cn(
      "group relative bg-white rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:scale-105",
      className
    )}>
      {/* 游戏信息 */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{config.name}</h3>
          <p className="text-sm text-gray-600 mb-3">{config.description}</p>
          
          {/* 游戏属性 */}
          <div className="flex items-center space-x-4 text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <Users className="h-3 w-3" />
              <span>{config.players}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>{config.duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="h-3 w-3" />
              <span>{config.difficulty}</span>
            </div>
          </div>
        </div>
        
        {/* 评分和热度 */}
        <div className="text-right">
          <div className="flex items-center space-x-1 mb-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium">{rating.toFixed(1)}</span>
          </div>
          <div className="text-xs text-gray-500">
            {popularity}% 热度
          </div>
        </div>
      </div>

      {/* 功能标签 */}
      <div className="flex flex-wrap gap-1 mb-4">
        {config.features.slice(0, 3).map((feature, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-pink-100 text-pink-700 text-xs rounded-full"
          >
            {feature}
          </span>
        ))}
      </div>

      {/* 操作按钮 */}
      <Button
        onClick={handlePlay}
        className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
      >
        <Play className="h-4 w-4 mr-2" />
        开始游戏
      </Button>
    </div>
  )
}