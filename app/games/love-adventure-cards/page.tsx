'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Heart, Sparkles, Trophy, Share2,
  RotateCcw, Users, Clock, Star, Zap, CheckCircle
} from 'lucide-react'
import GlobalNavbar from '@/components/global-navbar'
import UsageGuard, { UsageStatus } from '@/components/usage-guard'
import GamePageTemplate from '@/components/game-page-template'
import GameCard from '@/components/game-card'
import GameStats from '@/components/game-stats'

type TaskType = 'romantic' | 'fun' | 'growth' | 'social'

interface TaskCard {
  id: number
  type: TaskType
  title: string
  description: string
  difficulty: 'easy' | 'medium' | 'hard'
  time: string
  points: number
  shareable: boolean
}

export default function LoveAdventureCards() {
  const router = useRouter()
  const [currentCard, setCurrentCard] = useState<TaskCard | null>(null)
  const [completedTasks, setCompletedTasks] = useState<number[]>([])
  const [totalPoints, setTotalPoints] = useState(0)
  const [showShareModal, setShowShareModal] = useState(false)

  const taskCards: TaskCard[] = [
    // 浪漫任务
    {
      id: 1,
      type: 'romantic',
      title: '写一封情书',
      description: '给对方写一封真诚的情书，表达你的爱意',
      difficulty: 'easy',
      time: '15分钟',
      points: 10,
      shareable: true
    },
    {
      id: 2,
      type: 'romantic',
      title: '惊喜晚餐',
      description: '为对方准备一顿惊喜的浪漫晚餐',
      difficulty: 'medium',
      time: '1-2小时',
      points: 20,
      shareable: true
    },
    {
      id: 3,
      type: 'romantic',
      title: '日出约会',
      description: '一起看日出，享受浪漫的清晨时光',
      difficulty: 'hard',
      time: '清晨',
      points: 30,
      shareable: true
    },
    
    // 趣味挑战
    {
      id: 4,
      type: 'fun',
      title: '角色互换',
      description: '模仿对方最喜欢的电影角色一天',
      difficulty: 'medium',
      time: '全天',
      points: 25,
      shareable: true
    },
    {
      id: 5,
      type: 'fun',
      title: '搞笑视频',
      description: '一起完成一个搞笑短视频创作',
      difficulty: 'easy',
      time: '30分钟',
      points: 15,
      shareable: true
    },
    
    // 成长任务
    {
      id: 6,
      type: 'growth',
      title: '学习新技能',
      description: '共同学习一项新技能（烹饪、舞蹈等）',
      difficulty: 'medium',
      time: '1-2小时',
      points: 20,
      shareable: false
    },
    
    // 社交任务
    {
      id: 7,
      type: 'social',
      title: '好友挑战',
      description: '邀请好友一起完成双人任务',
      difficulty: 'easy',
      time: '灵活',
      points: 15,
      shareable: true
    }
  ]

  const drawCard = () => {
    const availableCards = taskCards.filter(card => !completedTasks.includes(card.id))
    if (availableCards.length === 0) {
      alert('所有任务卡都已完成！太棒了！')
      return
    }
    
    const randomIndex = Math.floor(Math.random() * availableCards.length)
    setCurrentCard(availableCards[randomIndex])
  }

  const completeTask = async (onUse: () => Promise<void>) => {
    if (!currentCard) return
    
    await onUse()
    setCompletedTasks(prev => [...prev, currentCard.id])
    setTotalPoints(prev => prev + currentCard.points)
    setCurrentCard(null)
  }

  const shareTask = () => {
    if (!currentCard) return
    
    const shareText = `🎴 我抽到了爱情冒险卡牌：${currentCard.title}

${currentCard.description}

难度：${currentCard.difficulty === 'easy' ? '简单' : currentCard.difficulty === 'medium' ? '中等' : '困难'}
积分：${currentCard.points}分

快来和我一起挑战吧！💕`
    
    if (navigator.share) {
      navigator.share({
        title: '爱情冒险卡牌挑战',
        text: shareText
      })
    } else {
      navigator.clipboard.writeText(shareText)
      alert('任务信息已复制到剪贴板，可以分享给朋友！')
    }
  }

  const getTypeIcon = (type: TaskType) => {
    switch (type) {
      case 'romantic': return <Heart className="h-4 w-4" />
      case 'fun': return <Sparkles className="h-4 w-4" />
      case 'growth': return <Trophy className="h-4 w-4" />
      case 'social': return <Users className="h-4 w-4" />
      default: return <Star className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: TaskType) => {
    switch (type) {
      case 'romantic': return 'bg-pink-100 text-pink-700'
      case 'fun': return 'bg-yellow-100 text-yellow-700'
      case 'growth': return 'bg-green-100 text-green-700'
      case 'social': return 'bg-blue-100 text-blue-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700'
      case 'medium': return 'bg-yellow-100 text-yellow-700'
      case 'hard': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <UsageGuard feature="games">
      {({ canUse, remainingUses, onUse, isLoading, usageText }) => (
        <GamePageTemplate
          title="爱情冒险卡牌"
          description="抽取冒险任务卡牌，与伴侣一起完成有趣的挑战，增进感情"
          icon={<Heart className="h-8 w-8 text-white" />}
          bgGradient="bg-gradient-to-br from-purple-50/80 via-white to-pink-50/80"
        >
          {/* 使用状态提示 */}
          <div className="max-w-md mx-auto mb-8">
            <div className="bg-white/80 backdrop-blur-md px-6 py-3 rounded-xl shadow-lg border border-white/30 text-center">
              <span className="text-sm text-gray-600">
                {usageText}
              </span>
            </div>
          </div>

          {/* 积分统计 */}
          <GameStats
            title="游戏统计"
            description="追踪你的冒险任务完成情况"
            stats={[
              {
                value: totalPoints,
                label: "总积分",
                icon: <Trophy className="h-3 w-3" />,
                bgColor: "bg-gradient-to-br from-purple-50 to-pink-50",
                textColor: "text-purple-600"
              },
              {
                value: completedTasks.length,
                label: "完成数",
                icon: <CheckCircle className="h-3 w-3" />,
                bgColor: "bg-gradient-to-br from-green-50 to-emerald-50",
                textColor: "text-green-600"
              },
              {
                value: taskCards.length - completedTasks.length,
                label: "剩余卡牌",
                icon: <Heart className="h-3 w-3" />,
                bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50",
                textColor: "text-blue-600"
              }
            ]}
          />

          {/* 主游戏区域 */}
          <div className="max-w-2xl mx-auto">
            {!currentCard ? (
              // 抽卡界面
              <GameCard
                title="准备抽取任务卡牌"
                description="点击下方按钮，随机抽取一张爱情冒险任务卡"
                icon={<Heart className="h-6 w-6 text-white" />}
                button={{
                  text: "抽取任务卡",
                  onClick: drawCard,
                  disabled: !canUse
                }}
              >
                <div className="text-center py-8">
                  <div className="w-32 h-48 mx-auto mb-6 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl shadow-lg flex items-center justify-center animate-pulse">
                    <Heart className="h-12 w-12 text-white" />
                  </div>
                </div>
              </GameCard>
            ) : (
              // 任务卡展示
              <GameCard
                title={currentCard.title}
                badge={{
                  text: currentCard.type === 'romantic' ? '浪漫任务' :
                       currentCard.type === 'fun' ? '趣味挑战' :
                       currentCard.type === 'growth' ? '成长任务' : '社交任务',
                  variant: 'secondary'
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(currentCard.type)}`}>
                    {getTypeIcon(currentCard.type)}
                    <span className="ml-1">
                      {currentCard.type === 'romantic' ? '浪漫任务' :
                       currentCard.type === 'fun' ? '趣味挑战' :
                       currentCard.type === 'growth' ? '成长任务' : '社交任务'}
                    </span>
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(currentCard.difficulty)}`}>
                    {currentCard.difficulty === 'easy' ? '简单' :
                     currentCard.difficulty === 'medium' ? '中等' : '困难'}
                  </span>
                </div>
                
                <p className="text-gray-700 mb-4">
                  {currentCard.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    预计时间：{currentCard.time}
                  </span>
                  <span className="flex items-center">
                    <Trophy className="h-4 w-4 mr-1" />
                    积分：{currentCard.points}分
                  </span>
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={() => completeTask(onUse)}
                    disabled={!canUse}
                    className="flex-1 bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 rounded-lg font-medium hover:from-green-600 hover:to-teal-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    完成任务
                  </button>
                  
                  {currentCard.shareable && (
                    <button
                      onClick={shareTask}
                      className="flex items-center justify-center px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      <Share2 className="h-4 w-4" />
                    </button>
                  )}
                  
                  <button
                    onClick={() => setCurrentCard(null)}
                    className="flex items-center justify-center px-4 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </button>
                </div>
              </GameCard>
            )}

            {!canUse && (
              <div className="text-center text-amber-600 mt-4">
                <p>使用次数已用完，请登录或等待重置</p>
              </div>
            )}

            {/* 任务完成记录 */}
            {completedTasks.length > 0 && (
              <div className="max-w-2xl mx-auto mt-8">
                <GameCard
                  title="已完成任务"
                  icon={<CheckCircle className="h-5 w-5 text-white" />}
                >
                  <div className="grid gap-3">
                    {completedTasks.map(taskId => {
                      const task = taskCards.find(t => t.id === taskId)
                      if (!task) return null
                      return (
                        <div key={task.id} className="bg-green-50 border border-green-200 rounded-lg p-3">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-green-800">{task.title}</span>
                            <span className="text-green-600 font-semibold">+{task.points}分</span>
                          </div>
                          <p className="text-green-700 text-sm mt-1">{task.description}</p>
                        </div>
                      )
                    })}
                  </div>
                </GameCard>
              </div>
            )}
          </div>
        </GamePageTemplate>
      )}
    </UsageGuard>
  )
}