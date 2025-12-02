'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Play, RotateCcw, Heart, Share2, Star, Clock, Target } from 'lucide-react'

// 拼图卡片类型
interface PuzzleCard {
  id: number
  image: string
  isFlipped: boolean
  isMatched: boolean
}

// 情侣回忆主题
const memoryThemes = [
  {
    name: '初次约会',
    images: ['🍕', '🎬', '🎡', '🌸', '🌙', '✨'],
    description: '记录你们第一次约会的甜蜜时刻'
  },
  {
    name: '旅行回忆', 
    images: ['🏖️', '🏔️', '🚗', '✈️', '🏕️', '🌅'],
    description: '共同旅行的美好时光'
  },
  {
    name: '日常温馨',
    images: ['☕', '🍽️', '📚', '🎵', '🐶', '🌹'],
    description: '平凡生活中的小确幸'
  }
]

export default function MemoryPuzzlePage() {
  const [gameStarted, setGameStarted] = useState(false)
  const [currentTheme, setCurrentTheme] = useState(0)
  const [cards, setCards] = useState<PuzzleCard[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [time, setTime] = useState(0)
  const [timerActive, setTimerActive] = useState(false)
  const [gameCompleted, setGameCompleted] = useState(false)

  // 初始化游戏
  const initializeGame = useCallback(() => {
    const theme = memoryThemes[currentTheme]
    const cardPairs = [...theme.images, ...theme.images]
    
    const shuffledCards = cardPairs
      .map((image, index) => ({
        id: index,
        image,
        isFlipped: false,
        isMatched: false
      }))
      .sort(() => Math.random() - 0.5)
    
    setCards(shuffledCards)
    setFlippedCards([])
    setMoves(0)
    setTime(0)
    setGameCompleted(false)
    setTimerActive(true)
  }, [currentTheme])

  // 处理卡片点击
  const handleCardClick = (clickedCard: PuzzleCard) => {
    if (!gameStarted || gameCompleted || clickedCard.isFlipped || clickedCard.isMatched) {
      return
    }

    if (flippedCards.length < 2) {
      const newFlippedCards = [...flippedCards, clickedCard.id]
      setFlippedCards(newFlippedCards)
      
      setCards(prevCards => 
        prevCards.map(card => 
          card.id === clickedCard.id ? { ...card, isFlipped: true } : card
        )
      )

      if (newFlippedCards.length === 2) {
        setMoves(prev => prev + 1)
        
        setTimeout(() => {
          const [firstId, secondId] = newFlippedCards
          const firstCard = cards.find(card => card.id === firstId)!
          const secondCard = cards.find(card => card.id === secondId)!
          
          if (firstCard.image === secondCard.image) {
            // 匹配成功
            setCards(prevCards =>
              prevCards.map(card =>
                card.id === firstId || card.id === secondId
                  ? { ...card, isMatched: true }
                  : card
              )
            )
          } else {
            // 匹配失败，翻回
            setCards(prevCards =>
              prevCards.map(card =>
                card.id === firstId || card.id === secondId
                  ? { ...card, isFlipped: false }
                  : card
              )
            )
          }
          
          setFlippedCards([])
        }, 1000)
      }
    }
  }

  // 检查游戏是否完成
  useEffect(() => {
    if (gameStarted && cards.length > 0 && cards.every(card => card.isMatched)) {
      setGameCompleted(true)
      setTimerActive(false)
    }
  }, [cards, gameStarted])

  // 计时器
  useEffect(() => {
    let interval: NodeJS.Timeout
    
    if (timerActive) {
      interval = setInterval(() => {
        setTime(prev => prev + 1)
      }, 1000)
    }
    
    return () => clearInterval(interval)
  }, [timerActive])

  // 开始游戏
  const startGame = () => {
    setGameStarted(true)
    initializeGame()
  }

  // 重新开始
  const restartGame = () => {
    initializeGame()
  }

  // 切换主题
  const changeTheme = (themeIndex: number) => {
    setCurrentTheme(themeIndex)
    if (gameStarted) {
      initializeGame()
    }
  }

  const progress = cards.length > 0 
    ? (cards.filter(card => card.isMatched).length / cards.length) * 100 
    : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* 页面标题 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            记忆拼图
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            通过拼图游戏重温你们的美好回忆，考验记忆力的同时增进感情
          </p>
        </div>

        {/* 游戏控制区 */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <CardTitle>游戏控制</CardTitle>
                <CardDescription>
                  选择回忆主题，开始挑战你们的记忆力
                </CardDescription>
              </div>
              
              <div className="flex gap-2">
                {!gameStarted ? (
                  <Button onClick={startGame} className="gap-2">
                    <Play className="h-4 w-4" />
                    开始游戏
                  </Button>
                ) : (
                  <Button onClick={restartGame} variant="outline" className="gap-2">
                    <RotateCcw className="h-4 w-4" />
                    重新开始
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            {/* 主题选择 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {memoryThemes.map((theme, index) => (
                <Card 
                  key={index}
                  className={`cursor-pointer transition-all ${
                    currentTheme === index ? 'ring-2 ring-purple-500' : 'hover:shadow-md'
                  }`}
                  onClick={() => changeTheme(index)}
                >
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl mb-2">{theme.images[0]}</div>
                    <h3 className="font-semibold">{theme.name}</h3>
                    <p className="text-sm text-gray-600">{theme.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* 游戏统计 */}
            {gameStarted && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">时间</span>
                  </div>
                  <div className="text-xl font-bold">{time}秒</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-gray-600">
                    <Target className="h-4 w-4" />
                    <span className="text-sm">步数</span>
                  </div>
                  <div className="text-xl font-bold">{moves}</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-gray-600">
                    <Star className="h-4 w-4" />
                    <span className="text-sm">进度</span>
                  </div>
                  <div className="text-xl font-bold">{Math.round(progress)}%</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-gray-600">
                    <Heart className="h-4 w-4" />
                    <span className="text-sm">评分</span>
                  </div>
                  <div className="text-xl font-bold">
                    {moves > 0 ? Math.max(1, 5 - Math.floor(moves / 10)) : 5}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* 游戏进度 */}
        {gameStarted && (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">游戏进度</span>
              <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        {/* 拼图游戏区 */}
        {gameStarted ? (
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
            {cards.map((card) => (
              <Card
                key={card.id}
                className={`h-24 md:h-32 cursor-pointer transition-all duration-300 ${
                  card.isFlipped || card.isMatched
                    ? 'bg-white transform rotate-0'
                    : 'bg-gradient-to-br from-purple-100 to-pink-100 transform rotate-y-180'
                } ${
                  card.isMatched ? 'border-2 border-green-500' : ''
                }`}
                onClick={() => handleCardClick(card)}
              >
                <CardContent className="p-0 h-full flex items-center justify-center">
                  {card.isFlipped || card.isMatched ? (
                    <span className="text-4xl md:text-6xl">{card.image}</span>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-purple-200 to-pink-200 rounded-lg flex items-center justify-center">
                      <span className="text-2xl text-purple-400">?</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          /* 游戏介绍 */
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>游戏介绍</CardTitle>
              <CardDescription>
                记忆拼图是一款考验情侣记忆力的游戏，通过匹配相同的回忆卡片来增进感情
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-4xl mb-2">🧠</div>
                  <h3 className="font-semibold">锻炼记忆力</h3>
                  <p className="text-sm text-gray-600">通过游戏训练短期记忆能力</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-2">💕</div>
                  <h3 className="font-semibold">增进感情</h3>
                  <p className="text-sm text-gray-600">共同回忆美好时光，加深感情</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-2">🎯</div>
                  <h3 className="font-semibold">挑战自我</h3>
                  <p className="text-sm text-gray-600">不断挑战更高的分数和更快的速度</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 游戏完成提示 */}
        {gameCompleted && (
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <CardHeader>
              <CardTitle className="text-green-600">🎉 恭喜完成！</CardTitle>
              <CardDescription>
                你们成功完成了记忆拼图挑战！
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{time}秒</div>
                  <div className="text-sm text-gray-600">用时</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{moves}步</div>
                  <div className="text-sm text-gray-600">步数</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {Math.max(1, 5 - Math.floor(moves / 10))}星
                  </div>
                  <div className="text-sm text-gray-600">评分</div>
                </div>
              </div>
              
              <div className="flex gap-2 justify-center">
                <Button onClick={restartGame} className="gap-2">
                  <RotateCcw className="h-4 w-4" />
                  再玩一次
                </Button>
                <Button variant="outline" className="gap-2">
                  <Share2 className="h-4 w-4" />
                  分享成绩
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}