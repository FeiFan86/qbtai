'use client'

import { useState, useEffect, useCallback } from 'react'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { useAuth } from '@/components/auth-provider'
import { dataService } from '@/lib/data-service'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Play, RotateCcw, Heart, Share2, Star, Clock, Target, ArrowLeft, User, Award } from 'lucide-react'
import Link from 'next/link'

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
    description: '记录你们第一次约会的甜蜜时刻',
    difficulty: 'easy'
  },
  {
    name: '旅行回忆', 
    images: ['🏖️', '🏔️', '🚗', '✈️', '🏕️', '🌅'],
    description: '共同旅行的美好时光',
    difficulty: 'easy'
  },
  {
    name: '日常温馨',
    images: ['☕', '🍽️', '📚', '🎵', '🐶', '🌹'],
    description: '平凡生活中的小确幸',
    difficulty: 'easy'
  },
  {
    name: '美食记忆',
    images: ['🍜', '🍰', '🍣', '🍔', '🍕', '🥘'],
    description: '一起品尝的各种美味',
    difficulty: 'medium'
  },
  {
    name: '节日庆典',
    images: ['🎂', '🎄', '🎃', '🎆', '🧧', '🎊'],
    description: '共同度过的节日时光',
    difficulty: 'medium'
  },
  {
    name: '户外探险',
    images: ['⛺', '🧗', '🏄', '🚴', '🪂', '🏞️'],
    description: '一起探索大自然的美好',
    difficulty: 'hard'
  },
  {
    name: '艺术文化',
    images: ['🎭', '🖼️', '🎪', '🎨', '🏛️', '🎻'],
    description: '共同欣赏的艺术与文化',
    difficulty: 'hard'
  },
  {
    name: '生活技能',
    images: ['🔨', '🪴', '🧺', '🪡', '🧹', '🔧'],
    description: '一起学习的生活技能',
    difficulty: 'expert'
  }
]

// 成就系统
const achievements = [
  { id: 'first_win', name: '初次胜利', description: '完成第一场记忆拼图', icon: '🎉', points: 10 },
  { id: 'speed_demon', name: '闪电快手', description: '在30秒内完成简单难度', icon: '⚡', points: 20 },
  { id: 'perfect_memory', name: '完美记忆', description: '一次不翻错完成游戏', icon: '🧠', points: 30 },
  { id: 'theme_collector', name: '主题收集家', description: '完成所有主题的拼图', icon: '📚', points: 40 },
  { id: 'difficulty_master', name: '难度大师', description: '完成所有难度级别', icon: '👑', points: 50 },
  { id: 'streak_champion', name: '连胜冠军', description: '连续赢得5场游戏', icon: '🏆', points: 60 },
  { id: 'time_warrior', name: '时间战士', description: '在困难难度下1分钟内完成', icon: '⏱️', points: 70 },
  { id: 'puzzle_legend', name: '拼图传说', description: '解锁所有成就', icon: '🌟', points: 100 }
]

// 难度级别配置
const difficultyLevels = {
  easy: {
    name: '简单',
    gridSize: 3, // 3x2 网格，6张卡片
    cardBackStyle: 'bg-gradient-to-br from-blue-100 to-blue-200',
    timeBonus: 60, // 时间奖励（秒）
    pointsMultiplier: 1
  },
  medium: {
    name: '中等',
    gridSize: 4, // 4x4 网格，16张卡片
    cardBackStyle: 'bg-gradient-to-br from-purple-100 to-purple-200',
    timeBonus: 90,
    pointsMultiplier: 2
  },
  hard: {
    name: '困难',
    gridSize: 6, // 6x4 网格，24张卡片
    cardBackStyle: 'bg-gradient-to-br from-red-100 to-red-200',
    timeBonus: 120,
    pointsMultiplier: 3
  },
  expert: {
    name: '专家',
    gridSize: 8, // 6x6 网格，36张卡片
    cardBackStyle: 'bg-gradient-to-br from-gray-700 to-gray-900',
    timeBonus: 150,
    pointsMultiplier: 5
  }
}

export default function MemoryPuzzlePage() {
  const { user, isAuthenticated } = useAuth()
  const [gameStarted, setGameStarted] = useState(false)
  const [currentTheme, setCurrentTheme] = useState(0)
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard' | 'expert'>('easy')
  const [cards, setCards] = useState<PuzzleCard[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [time, setTime] = useState(0)
  const [timerActive, setTimerActive] = useState(false)
  const [gameCompleted, setGameCompleted] = useState(false)
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([])
  const [totalPoints, setTotalPoints] = useState(0)
  const [currentStreak, setCurrentStreak] = useState(0)
  const [bestTimes, setBestTimes] = useState<Record<string, number>>({})
  const [showAchievements, setShowAchievements] = useState(false)
  const [newAchievement, setNewAchievement] = useState<typeof achievements[0] | null>(null)
  const [mistakes, setMistakes] = useState(0) // 记录翻错次数
  const [currentScore, setCurrentScore] = useState(0) // 当前游戏得分
  const [isLoading, setIsLoading] = useState(false) // 加载状态

  // 初始化游戏
  const initializeGame = useCallback(() => {
    const theme = memoryThemes[currentTheme]
    const gridSize = difficultyLevels[difficulty].gridSize
    // 根据网格大小选择合适的图像数量
    const imageCount = Math.min(gridSize * gridSize / 2, theme.images.length)
    const selectedImages = theme.images.slice(0, imageCount)
    const cardPairs = [...selectedImages, ...selectedImages]
    
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
    setMistakes(0)
    setCurrentScore(0)
  }, [currentTheme, difficulty])

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
            
            // 计算得分
            const matchScore = 10 * difficultyLevels[difficulty].pointsMultiplier
            setCurrentScore(prev => prev + matchScore)
          } else {
            // 匹配失败，翻回
            setCards(prevCards =>
              prevCards.map(card =>
                card.id === firstId || card.id === secondId
                  ? { ...card, isFlipped: false }
                  : card
              )
            )
            setMistakes(prev => prev + 1)
          }
          
          setFlippedCards([])
        }, 1000)
      }
    }
  }

  // 检查游戏是否完成
  useEffect(() => {
    const handleGameCompletion = async () => {
      if (gameStarted && cards.length > 0 && cards.every(card => card.isMatched)) {
        setGameCompleted(true)
        setTimerActive(false)
        
        // 计算最终得分
        const baseScore = 50 * difficultyLevels[difficulty].pointsMultiplier
        const timeBonus = Math.max(0, difficultyLevels[difficulty].timeBonus - time) * difficultyLevels[difficulty].pointsMultiplier
        const mistakePenalty = mistakes * 5
        const finalScore = Math.max(0, baseScore + timeBonus - mistakePenalty)
        
        // 更新总得分
        setTotalPoints(prev => prev + finalScore)
        
        // 更新最佳时间
        const themeName = memoryThemes[currentTheme].name
        const currentBest = bestTimes[`${difficulty}-${themeName}`] || Infinity
        if (time < currentBest) {
          setBestTimes(prev => ({
            ...prev,
            [`${difficulty}-${themeName}`]: time
          }))
        }
        
        // 更新连胜
        setCurrentStreak(prev => prev + 1)
        
        // 检查成就
        checkAchievements(time, finalScore)
        
        // 保存游戏进度
        await saveGameProgress()
      }
    }
    
    handleGameCompletion()
  }, [cards, gameStarted, difficulty, currentTheme, time, mistakes, bestTimes, user, isAuthenticated])
  
  // 检查成就
  const checkAchievements = (completionTime: number, finalScore: number) => {
    const newAchievements: string[] = []
    
    // 首次胜利
    if (!unlockedAchievements.includes('first_win')) {
      newAchievements.push('first_win')
    }
    
    // 闪电快手
    if (difficulty === 'easy' && completionTime <= 30 && !unlockedAchievements.includes('speed_demon')) {
      newAchievements.push('speed_demon')
    }
    
    // 完美记忆
    if (mistakes === 0 && !unlockedAchievements.includes('perfect_memory')) {
      newAchievements.push('perfect_memory')
    }
    
    // 时间战士
    if ((difficulty === 'hard' || difficulty === 'expert') && completionTime <= 60 && !unlockedAchievements.includes('time_warrior')) {
      newAchievements.push('time_warrior')
    }
    
    // 连胜冠军
    if (currentStreak >= 4 && !unlockedAchievements.includes('streak_champion')) {
      newAchievements.push('streak_champion')
    }
    
    // 解锁新成就
    if (newAchievements.length > 0) {
      const updatedAchievements = [...unlockedAchievements, ...newAchievements]
      setUnlockedAchievements(updatedAchievements)
      
      // 保存成就到服务器
      if (user && isAuthenticated) {
        newAchievements.forEach(async (achievementId) => {
          try {
            await dataService.saveAchievement(user.id, achievementId)
          } catch (error) {
            console.error('保存成就失败:', error)
          }
        })
      }
      
      // 显示第一个新成就
      const achievementToShow = achievements.find(a => a.id === newAchievements[0])
      if (achievementToShow) {
        setNewAchievement(achievementToShow)
        
        // 3秒后隐藏成就提示
        setTimeout(() => {
          setNewAchievement(null)
        }, 3000)
      }
      
      // 检查是否解锁所有成就
      if (updatedAchievements.length === achievements.length && !unlockedAchievements.includes('puzzle_legend')) {
        setTimeout(() => {
          setNewAchievement(achievements.find(a => a.id === 'puzzle_legend')!)
        }, 3500)
      }
    }
  }

  // 保存游戏进度
  const saveGameProgress = async () => {
    if (!user || !isAuthenticated) return
    
    try {
      setIsLoading(true)
      
      // 保存游戏进度
      await dataService.saveGameProgress(
        'memory-puzzle',
        user.id,
        {
          currentTheme,
          difficulty,
          cards,
          flippedCards,
          moves,
          time,
          mistakes,
          currentScore,
          gameCompleted
        },
        currentScore,
        time
      )
      
      // 保存游戏得分
      if (gameCompleted) {
        await dataService.saveGameScore('memory-puzzle', user.id, currentScore, time)
      }
    } catch (error) {
      console.error('保存游戏进度失败:', error)
    } finally {
      setIsLoading(false)
    }
  }

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

  // 如果用户未登录，显示登录提示
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-100 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-purple-500" />
              需要登录
            </CardTitle>
            <CardDescription>
              请先登录以保存游戏进度和成就
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-4">登录后，您的游戏进度和成就将自动保存到云端</p>
            <Button 
              onClick={() => window.location.href = '/login'}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              前往登录
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-100">
      <Navigation />
      
      {/* 加载状态提示 */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-sm">
            <CardContent className="p-4 text-center">
              <div className="mb-2">正在保存游戏进度...</div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div className="h-full bg-purple-500 animate-pulse" style={{ width: '60%' }}></div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/games" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 transition-colors mb-6">
            <ArrowLeft className="h-4 w-4" />
            返回游戏中心
          </Link>
          
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
              记忆拼图
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              通过拼图游戏重温你们的美好回忆，考验记忆力的同时增进感情
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">

        {/* 游戏统计 */}
        <Card className="mb-8 bg-white/80 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-yellow-500" />
              游戏统计
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{totalPoints}</div>
                <div className="text-sm text-gray-500">总积分</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-600">{currentStreak}</div>
                <div className="text-sm text-gray-500">连胜</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{gameStarted ? currentScore : 0}</div>
                <div className="text-sm text-gray-500">当前得分</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{unlockedAchievements.length}/{achievements.length}</div>
                <div className="text-sm text-gray-500">成就解锁</div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3 mt-4">
              <Button 
                onClick={() => setShowAchievements(!showAchievements)}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Trophy className="h-4 w-4" />
                查看成就
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 成就展示 */}
        {showAchievements && (
          <Card className="mb-8 bg-white/80 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                成就系统
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {achievements.map(achievement => {
                  const isUnlocked = unlockedAchievements.includes(achievement.id)
                  return (
                    <div 
                      key={achievement.id} 
                      className={`p-4 rounded-lg border ${isUnlocked ? 'bg-yellow-50 border-yellow-200' : 'bg-gray-50 border-gray-200 opacity-60'}`}
                    >
                      <div className="text-center mb-2">
                        <div className={`text-4xl ${isUnlocked ? '' : 'grayscale'}`}>{achievement.icon}</div>
                      </div>
                      <h3 className={`font-medium text-center mb-1 ${isUnlocked ? 'text-yellow-800' : 'text-gray-600'}`}>
                        {achievement.name}
                      </h3>
                      <p className={`text-sm text-center ${isUnlocked ? 'text-yellow-700' : 'text-gray-500'}`}>
                        {achievement.description}
                      </p>
                      <div className="text-center mt-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${isUnlocked ? 'bg-yellow-200 text-yellow-800' : 'bg-gray-200 text-gray-600'}`}>
                          {achievement.points} 积分
                        </span>
                      </div>
                      {isUnlocked && <CheckCircle className="h-5 w-5 text-green-500 mt-2" />}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* 游戏控制区 */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <CardTitle>游戏控制</CardTitle>
                <CardDescription>
                  选择难度和回忆主题，开始挑战你们的记忆力
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
            {/* 难度选择 */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">选择难度</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {Object.entries(difficultyLevels).map(([key, level]) => (
                  <button
                    key={key}
                    onClick={() => setDifficulty(key as 'easy' | 'medium' | 'hard' | 'expert')}
                    className={`p-3 rounded-lg border transition-all ${
                      difficulty === key 
                        ? 'border-purple-500 bg-purple-50 text-purple-700' 
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="text-center">
                      <div className="font-medium">{level.name}</div>
                      <div className="text-xs text-gray-500">
                        {level.gridSize * level.gridSize / 2} 对卡片
                      </div>
                      <div className="text-xs text-purple-600">
                        {level.pointsMultiplier}x 积分
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            {/* 主题选择 */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">选择主题</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                      <div className="mt-2">
                        <Badge className={
                          theme.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                          theme.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          theme.difficulty === 'hard' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }>
                          {theme.difficulty === 'easy' ? '简单' :
                           theme.difficulty === 'medium' ? '中等' :
                           theme.difficulty === 'hard' ? '困难' : '专家'}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
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
              {/* 得分计算 */}
              <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">得分详情</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="text-center">
                    <div className="text-xl font-bold text-blue-600">{50 * difficultyLevels[difficulty].pointsMultiplier}</div>
                    <div className="text-sm text-gray-600">基础得分</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-green-600">
                      {Math.max(0, difficultyLevels[difficulty].timeBonus - time) * difficultyLevels[difficulty].pointsMultiplier}
                    </div>
                    <div className="text-sm text-gray-600">时间奖励</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-red-600">-{mistakes * 5}</div>
                    <div className="text-sm text-gray-600">失误惩罚</div>
                  </div>
                </div>
                <div className="text-center mt-2 pt-2 border-t border-blue-200">
                  <div className="text-2xl font-bold text-purple-600">
                    总计: {currentScore} 积分
                  </div>
                </div>
              </div>
              
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

        {/* 成就解锁提示 */}
        {newAchievement && (
          <div className="fixed top-4 right-4 bg-yellow-100 border border-yellow-300 text-yellow-800 p-4 rounded-lg shadow-lg z-50 max-w-sm">
            <div className="flex items-start gap-3">
              <div className="text-3xl">{newAchievement.icon}</div>
              <div>
                <div className="font-semibold">🎉 解锁新成就！</div>
                <div className="font-medium">{newAchievement.name}</div>
                <div className="text-sm">{newAchievement.description}</div>
                <div className="text-xs mt-1">+{newAchievement.points} 积分</div>
              </div>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  )
}