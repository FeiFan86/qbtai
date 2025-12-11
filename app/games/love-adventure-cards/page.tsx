'use client'

import React, { useState } from 'react'
import { Heart, Share2, RotateCcw } from 'lucide-react'
import UnifiedGameTemplate from '@/components/unified-game-template'

const adventureCards = [
  {
    id: 1,
    title: '浪漫晚餐',
    description: '为对方准备一顿特别的晚餐，创造浪漫氛围',
    category: '日常浪漫',
    difficulty: '简单',
    duration: '2小时',
    materials: ['蜡烛', '音乐', '美食']
  },
  {
    id: 2,
    title: '回忆之旅',
    description: '重访你们第一次约会的地方，重温美好时光',
    category: '情感回忆',
    difficulty: '中等',
    duration: '半天',
    materials: ['照片', '纪念品']
  },
  {
    id: 3,
    title: '惊喜约会',
    description: '为对方策划一次完全保密的惊喜约会',
    category: '创意惊喜',
    difficulty: '困难',
    duration: '全天',
    materials: ['创意', '准备时间']
  }
]

export default function LoveAdventureCardsPage() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [completedCards, setCompletedCards] = useState<number[]>([])
  
  const currentCard = adventureCards[currentCardIndex]

  const handleNextCard = () => {
    if (currentCardIndex < adventureCards.length - 1) {
      setCurrentCardIndex(prev => prev + 1)
    }
  }

  const handlePreviousCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(prev => prev - 1)
    }
  }

  const handleCompleteCard = () => {
    if (!completedCards.includes(currentCard.id)) {
      setCompletedCards(prev => [...prev, currentCard.id])
    }
  }

  const handleRestart = () => {
    setCurrentCardIndex(0)
    setCompletedCards([])
  }

  return (
    <UnifiedGameTemplate
      title="爱情冒险卡片"
      description="通过有趣的挑战任务增进感情，创造美好回忆"
      icon={<Heart className="h-8 w-8 text-white" />}
      feature="games"
    >
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        {/* 进度显示 */}
        <div className="flex justify-between items-center mb-6">
          <span className="text-sm text-gray-600">
            卡片 {currentCardIndex + 1} / {adventureCards.length}
          </span>
          <span className="text-sm font-medium text-gray-900">
            已完成: {completedCards.length} 项
          </span>
        </div>

        {/* 卡片内容 */}
        <div className="space-y-6">
          <div className="text-center">
            <div className="text-6xl mb-4">💖</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{currentCard.title}</h3>
            <p className="text-gray-600">{currentCard.description}</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="text-sm font-medium text-blue-800 mb-1">类别</div>
              <div className="text-gray-700">{currentCard.category}</div>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <div className="text-sm font-medium text-green-800 mb-1">难度</div>
              <div className="text-gray-700">{currentCard.difficulty}</div>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <div className="text-sm font-medium text-purple-800 mb-1">时长</div>
              <div className="text-gray-700">{currentCard.duration}</div>
            </div>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h4 className="font-semibold text-yellow-800 mb-2">准备材料</h4>
            <div className="flex flex-wrap gap-2">
              {currentCard.materials.map((material, index) => (
                <span key={index} className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                  {material}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <button
              onClick={handlePreviousCard}
              disabled={currentCardIndex === 0}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              上一张
            </button>
            
            <div className="flex gap-2">
              <button
                onClick={handleCompleteCard}
                disabled={completedCards.includes(currentCard.id)}
                className="bg-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {completedCards.includes(currentCard.id) ? '已完成' : '标记完成'}
              </button>
              
              <button
                onClick={handleNextCard}
                disabled={currentCardIndex === adventureCards.length - 1}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                下一张
              </button>
            </div>
          </div>
        </div>
      </div>
    </UnifiedGameTemplate>
  )
}