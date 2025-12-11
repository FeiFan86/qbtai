'use client'

import React from 'react'
import { Gamepad2, Palette, Gift, TreePine, MessageCircle } from 'lucide-react'
import UnifiedGameTemplate from '@/components/unified-game-template'

const interactiveGames = [
  {
    id: 'collaborative-doodle',
    title: '协作涂鸦',
    description: '一起创作艺术作品，增进默契',
    icon: <Palette className="h-6 w-6" />,
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'couple-blind-box',
    title: '情侣盲盒',
    description: '随机抽取有趣的互动任务',
    icon: <Gift className="h-6 w-6" />,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'emotion-tree-hole',
    title: '情感树洞',
    description: '倾诉心声，互相理解',
    icon: <TreePine className="h-6 w-6" />,
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'complaint-wall',
    title: '吐槽墙',
    description: '以轻松的方式表达不满',
    icon: <MessageCircle className="h-6 w-6" />,
    color: 'from-orange-500 to-red-500'
  }
]

export default function InteractiveGamesPage() {
  return (
    <UnifiedGameTemplate
      title="互动游戏"
      description="多种有趣的互动方式，增进感情和默契"
      icon={<Gamepad2 className="h-8 w-8 text-white" />}
      feature="games"
    >
      <div className="grid md:grid-cols-2 gap-6">
        {interactiveGames.map((game) => (
          <div
            key={game.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            onClick={() => window.location.href = `/games/interactive-games/${game.id}`}
          >
            <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${game.color} text-white mb-4`}>
              {game.icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {game.title}
            </h3>
            <p className="text-gray-600 text-sm">
              {game.description}
            </p>
          </div>
        ))}
      </div>
    </UnifiedGameTemplate>
  )
}