'use client'

import { useState, useEffect } from 'react'

// 安全的 localStorage 访问函数
const safeLocalStorage = {
  getItem: (key: string) => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key)
    }
    return null
  },
  setItem: (key: string, value: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, value)
    }
  },
  removeItem: (key: string) => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key)
    }
  }
}
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  ArrowLeft,
  Heart,
  Sparkles,
  Shuffle,
  MessageCircle,
  Zap,
  Users,
  Clock,
  Star,
  Trophy,
  RotateCcw,
  CheckCircle,
  SkipForward,
  Settings,
  Award,
  Target,
  Flame,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Eye,
  EyeOff,
  Lightbulb
} from 'lucide-react'
import Link from 'next/link'

// 真心话问题库 - 按难度分类
const truthQuestions = {
  easy: [
    "你最喜欢的电影是什么？",
    "你小时候最喜欢的卡通片是什么？",
    "你最喜欢的食物是什么？",
    "你最喜欢的季节是哪个？",
    "你最想去哪个国家旅行？",
    "你最害怕的动物是什么？",
    "你最喜欢的颜色是什么？",
    "你最擅长的技能是什么？",
    "你最喜欢的音乐类型是什么？",
    "你最想拥有的超能力是什么？"
  ],
  medium: [
    "你曾经撒过最大的谎是什么？",
    "你最尴尬的经历是什么？",
    "你暗恋过的人有几个？",
    "你做过的最疯狂的梦是什么？",
    "你最想改变过去的哪件事？",
    "你最不好意思的爱好是什么？",
    "你最讨厌的特质是什么？",
    "你最想对初恋说什么？",
    "你最害怕失去什么？",
    "你最大的秘密是什么？"
  ],
  hard: [
    "你最想和谁共度一生？",
    "你曾经为爱做过最疯狂的事是什么？",
    "你最深刻的记忆是什么？",
    "你最想弥补的遗憾是什么？",
    "你最脆弱的时候是什么时候？",
    "你最想对父母说什么？",
    "你最害怕的未来是什么？",
    "你最想改变自己的哪一点？",
    "你最大的恐惧是什么？",
    "你最想对全世界说什么？"
  ]
}

// 大冒险挑战库 - 按难度分类
const dareChallenges = {
  easy: [
    "模仿一种动物的叫声",
    "用腹语说一段话",
    "做一个鬼脸并保持30秒",
    "单脚站立并唱歌",
    "闭着眼睛转三圈后走路",
    "用脚写字",
    "学机器人走路",
    "倒着走10步",
    "用鼻子写字",
    "用手比划心形"
  ],
  medium: [
    "打电话给朋友说'我爱你'",
    "发一条朋友圈说'我今天太帅了'",
    "跳一段奇怪的舞蹈",
    "给陌生人一个拥抱",
    "用嘴叼着笔写字",
    "头顶一本书走一圈",
    "跪地求婚给在场任意一人",
    "用三种语言说'我饿了'",
    "唱一首儿歌",
    "做10个俯卧撑"
  ],
  hard: [
    "在社交媒体上发布一张奇怪的自拍",
    "给前任发一条'最近好吗'的消息",
    "脱掉上衣（如果合适的话）",
    "在街上大声唱一首歌",
    "向陌生人借10块钱",
    "穿着睡衣去便利店买东西",
    "在电梯里做俯卧撑",
    "给陌生人讲一个冷笑话",
    "在公园里模仿雕像",
    "用牙齿咬开一瓶饮料"
  ]
}

// 游戏统计
interface GameStats {
  totalGames: number
  truthCount: number
  dareCount: number
  favoriteDifficulty: string
  longestStreak: number
  achievements: string[]
}

// 自定义卡片
interface CustomCard {
  id: string
  type: 'truth' | 'dare'
  difficulty: 'easy' | 'medium' | 'hard'
  content: string
  isPublic: boolean
  likes: number
}

export default function TruthOrDarePage() {
  const [gameMode, setGameMode] = useState<'truth' | 'dare'>('truth')
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy')
  const [currentCard, setCurrentCard] = useState<string>('')
  const [isPlaying, setIsPlaying] = useState(false)
  const [showAnswer, setShowAnswer] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [gameStats, setGameStats] = useState<GameStats>({
    totalGames: 0,
    truthCount: 0,
    dareCount: 0,
    favoriteDifficulty: 'easy',
    longestStreak: 0,
    achievements: []
  })
  const [customCards, setCustomCards] = useState<CustomCard[]>([])
  const [showCustomForm, setShowCustomForm] = useState(false)
  const [newCardContent, setNewCardContent] = useState('')
  const [newCardType, setNewCardType] = useState<'truth' | 'dare'>('truth')
  const [newCardDifficulty, setNewCardDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy')
  const [currentStreak, setCurrentStreak] = useState(0)
  const [history, setHistory] = useState<Array<{type: 'truth' | 'dare', content: string, timestamp: number}>>([])
  
  // 多人游戏增强功能
  const [players, setPlayers] = useState([
    { id: 1, name: '玩家1', score: 0, isActive: true, avatar: '👤' },
    { id: 2, name: '玩家2', score: 0, isActive: true, avatar: '👤' },
    { id: 3, name: '玩家3', score: 0, isActive: false, avatar: '👤' },
    { id: 4, name: '玩家4', score: 0, isActive: false, avatar: '👤' }
  ])
  const [currentPlayer, setCurrentPlayer] = useState<number>(1)
  const [playerTurnOrder, setPlayerTurnOrder] = useState<number[]>([1, 2])
  const [currentTurnIndex, setCurrentTurnIndex] = useState(0)
  const [teamMode, setTeamMode] = useState<'individual' | 'teams'>('individual')
  const [teams, setTeams] = useState([
    { id: 1, name: '红队', players: [1], score: 0, color: '#FF6B6B' },
    { id: 2, name: '蓝队', players: [2], score: 0, color: '#4ECDC4' }
  ])
  const [gameRound, setGameRound] = useState(1)
  const [maxRounds, setMaxRounds] = useState(10)
  const [gamePhase, setGamePhase] = useState<'setup' | 'playing' | 'results'>('setup')
  const [showPlayerManager, setShowPlayerManager] = useState(false)

  useEffect(() => {
    // 加载保存的数据
    const savedStats = safeLocalStorage.getItem('truthOrDareStats')
    if (savedStats) {
      try {
        setGameStats(JSON.parse(savedStats))
      } catch (error) {
        console.error('Failed to load game stats:', error)
      }
    }

    const savedCards = safeLocalStorage.getItem('customTruthOrDareCards')
    if (savedCards) {
      try {
        setCustomCards(JSON.parse(savedCards))
      } catch (error) {
        console.error('Failed to load custom cards:', error)
      }
    }

    const savedHistory = safeLocalStorage.getItem('truthOrDareHistory')
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory))
      } catch (error) {
        console.error('Failed to load game history:', error)
      }
    }
  }, [])

  const getRandomCard = () => {
    const questionPool = gameMode === 'truth' ? truthQuestions[difficulty] : dareChallenges[difficulty]
    const customPool = customCards.filter(card => 
      card.type === gameMode && 
      card.difficulty === difficulty
    ).map(card => card.content)
    
    const allCards = [...questionPool, ...customPool]
    const randomIndex = Math.floor(Math.random() * allCards.length)
    return allCards[randomIndex]
  }

  const startGame = () => {
    const card = getRandomCard()
    setCurrentCard(card)
    setIsPlaying(true)
    setShowAnswer(false)
    
    if (soundEnabled) {
      // 播放开始音效（这里可以添加实际的音效）
      playSound('start')
    }
  }

  const revealAnswer = () => {
    setShowAnswer(true)
    
    // 更新统计
    const newStats = {
      ...gameStats,
      totalGames: gameStats.totalGames + 1,
      truthCount: gameMode === 'truth' ? gameStats.truthCount + 1 : gameStats.truthCount,
      dareCount: gameMode === 'dare' ? gameStats.dareCount + 1 : gameStats.dareCount,
      longestStreak: Math.max(gameStats.longestStreak, currentStreak + 1)
    }
    setGameStats(newStats)
    setCurrentStreak(prev => prev + 1)
    safeLocalStorage.setItem('truthOrDareStats', JSON.stringify(newStats))
    
    // 添加到历史记录
    const newHistoryItem = {
      type: gameMode,
      content: currentCard,
      timestamp: Date.now()
    }
    const updatedHistory = [newHistoryItem, ...history].slice(0, 20) // 保留最近20条
    setHistory(updatedHistory)
    safeLocalStorage.setItem('truthOrDareHistory', JSON.stringify(updatedHistory))
    
    if (soundEnabled) {
      playSound('reveal')
    }
  }

  const nextCard = () => {
    startGame()
  }

  const skipCard = () => {
    setCurrentStreak(0)
    startGame()
  }

  const resetGame = () => {
    setCurrentCard('')
    setIsPlaying(false)
    setShowAnswer(false)
    setCurrentStreak(0)
  }

  const addCustomCard = () => {
    if (!newCardContent.trim()) return
    
    const newCard: CustomCard = {
      id: Date.now().toString(),
      type: newCardType,
      difficulty: newCardDifficulty,
      content: newCardContent.trim(),
      isPublic: false,
      likes: 0
    }
    
    const updatedCards = [...customCards, newCard]
    setCustomCards(updatedCards)
    safeLocalStorage.setItem('customTruthOrDareCards', JSON.stringify(updatedCards))
    
    // 重置表单
    setNewCardContent('')
    setShowCustomForm(false)
  }

  const playSound = (type: string) => {
    // 这里可以添加实际的音效播放逻辑
    console.log(`Playing sound: ${type}`)
  }

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'easy': return 'bg-green-100 text-green-800 border-green-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'hard': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getDifficultyIcon = (level: string) => {
    switch (level) {
      case 'easy': return <Star className="h-4 w-4" />
      case 'medium': return <Flame className="h-4 w-4" />
      case 'hard': return <Zap className="h-4 w-4" />
      default: return <Target className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
            <Link href="/games" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 transition-colors mb-6">
              <ArrowLeft className="h-4 w-4" />
              返回游戏中心
            </Link>
          
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-pink-600 mb-4">
              真心话大冒险
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              经典游戏情感版，增进朋友间的了解和信任，创造美好回忆
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* 左侧控制面板 */}
          <div className="lg:col-span-1 space-y-4">
            {/* 游戏模式选择 */}
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="h-5 w-5 text-red-500" />
                  游戏模式
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <button
                  onClick={() => setGameMode('truth')}
                  className={`w-full p-3 rounded-lg border transition-all flex items-center gap-3 ${
                    gameMode === 'truth' 
                      ? 'border-red-500 bg-red-50 text-red-700' 
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <Heart className="h-5 w-5" />
                  <div className="text-left">
                    <div className="font-medium">真心话</div>
                    <div className="text-xs text-gray-500">分享真实想法</div>
                  </div>
                </button>
                
                <button
                  onClick={() => setGameMode('dare')}
                  className={`w-full p-3 rounded-lg border transition-all flex items-center gap-3 ${
                    gameMode === 'dare' 
                      ? 'border-orange-500 bg-orange-50 text-orange-700' 
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <Zap className="h-5 w-5" />
                  <div className="text-left">
                    <div className="font-medium">大冒险</div>
                    <div className="text-xs text-gray-500">接受挑战任务</div>
                  </div>
                </button>
              </CardContent>
            </Card>

            {/* 难度选择 */}
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  难度等级
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {(['easy', 'medium', 'hard'] as const).map(level => (
                  <button
                    key={level}
                    onClick={() => setDifficulty(level)}
                    className={`w-full p-3 rounded-lg border transition-all ${
                      difficulty === level 
                        ? 'border-purple-500 bg-purple-50 text-purple-700' 
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getDifficultyIcon(level)}
                        <span className="font-medium">
                          {level === 'easy' ? '简单' : level === 'medium' ? '中等' : '困难'}
                        </span>
                      </div>
                      <Badge className={getDifficultyColor(level)}>
                        {level === 'easy' ? truthQuestions.easy.length : level === 'medium' ? truthQuestions.medium.length : truthQuestions.hard.length}
                      </Badge>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* 游戏统计 */}
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Award className="h-5 w-5 text-purple-500" />
                  游戏统计
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="bg-gray-50 rounded-lg p-2">
                    <div className="text-xl font-bold text-purple-600">{gameStats.totalGames}</div>
                    <div className="text-xs text-gray-600">总局数</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2">
                    <div className="text-xl font-bold text-red-600">{currentStreak}</div>
                    <div className="text-xs text-gray-600">连胜</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">真心话</span>
                    <span className="text-sm font-medium">{gameStats.truthCount}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">大冒险</span>
                    <span className="text-sm font-medium">{gameStats.dareCount}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">最高连胜</span>
                    <span className="text-sm font-medium">{gameStats.longestStreak}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 自定义卡片 */}
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-blue-500" />
                  自定义卡片
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button 
                  onClick={() => setShowCustomForm(true)}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  创建自定义卡片
                </Button>
                
                {customCards.length > 0 && (
                  <div className="text-sm text-gray-600 text-center">
                    已创建 {customCards.length} 张自定义卡片
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* 中间游戏区域 */}
          <div className="lg:col-span-2">
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg min-h-[500px]">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {gameMode === 'truth' ? <Heart className="h-5 w-5 text-red-500" /> : <Zap className="h-5 w-5 text-orange-500" />}
                      {gameMode === 'truth' ? '真心话' : '大冒险'}
                    </CardTitle>
                    <CardDescription>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={getDifficultyColor(difficulty)}>
                          {getDifficultyIcon(difficulty)}
                          {difficulty === 'easy' ? '简单' : difficulty === 'medium' ? '中等' : '困难'}
                        </Badge>
                        {currentStreak > 0 && (
                          <Badge className="bg-purple-100 text-purple-800 border-0">
                            <Flame className="h-3 w-3 mr-1" />
                            连胜 {currentStreak}
                          </Badge>
                        )}
                      </div>
                    </CardDescription>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSoundEnabled(!soundEnabled)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="flex flex-col items-center justify-center min-h-[400px]">
                {!isPlaying ? (
                  <div className="text-center space-y-6">
                    <div className="w-24 h-24 mx-auto bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                      {gameMode === 'truth' ? <Heart className="h-12 w-12 text-red-500" /> : <Zap className="h-12 w-12 text-orange-500" />}
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-gray-800">准备开始游戏</h3>
                      <p className="text-gray-600">点击下方按钮获取你的{gameMode === 'truth' ? '真心话' : '大冒险'}挑战</p>
                    </div>
                    
                    <Button 
                      onClick={startGame}
                      size="lg"
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3"
                    >
                      <Play className="h-5 w-5 mr-2" />
                      开始游戏
                    </Button>
                  </div>
                ) : (
                  <div className="w-full space-y-6">
                    {/* 卡片内容 */}
                    <div className={`relative bg-gradient-to-br ${
                      gameMode === 'truth' 
                        ? 'from-red-50 to-pink-50 border-red-200' 
                        : 'from-orange-50 to-yellow-50 border-orange-200'
                    } rounded-xl border-2 p-6 transition-all duration-300 ${
                      showAnswer ? 'scale-100 opacity-100' : 'scale-95 opacity-80'
                    }`}>
                      <div className="text-center">
                        <div className="mb-4">
                          {gameMode === 'truth' ? (
                            <MessageCircle className="h-8 w-8 text-red-500 mx-auto" />
                          ) : (
                            <Target className="h-8 w-8 text-orange-500 mx-auto" />
                          )}
                        </div>
                        
                        <div className={`text-lg font-medium mb-4 ${
                          showAnswer ? 'text-gray-800' : 'text-transparent'
                        }`}>
                          {showAnswer ? currentCard : '???'}
                        </div>
                        
                        {!showAnswer && (
                          <div className="text-sm text-gray-500">
                            点击显示答案
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* 控制按钮 */}
                    <div className="flex flex-wrap gap-3 justify-center">
                      {!showAnswer ? (
                        <Button 
                          onClick={revealAnswer}
                          size="lg"
                          className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600"
                        >
                          <Eye className="h-5 w-5 mr-2" />
                          显示答案
                        </Button>
                      ) : (
                        <>
                          <Button 
                            onClick={nextCard}
                            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                          >
                            <Shuffle className="h-4 w-4 mr-2" />
                            下一题
                          </Button>
                          
                          <Button 
                            onClick={skipCard}
                            variant="outline"
                          >
                            <SkipForward className="h-4 w-4 mr-2" />
                            跳过
                          </Button>
                          
                          <Button 
                            onClick={resetGame}
                            variant="outline"
                          >
                            <RotateCcw className="h-4 w-4 mr-2" />
                            重新开始
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* 右侧历史记录 */}
          <div className="lg:col-span-1 space-y-4">
            {history.length > 0 && (
              <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-500" />
                    游戏历史
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {history.map((item, index) => (
                      <div key={`${item.timestamp}-${index}`} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          {item.type === 'truth' ? (
                            <Heart className="h-4 w-4 text-red-500" />
                          ) : (
                            <Zap className="h-4 w-4 text-orange-500" />
                          )}
                          <span className="text-sm font-medium">
                            {item.type === 'truth' ? '真心话' : '大冒险'}
                          </span>
                        </div>
                        <div className="text-sm text-gray-700">{item.content}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          {new Date(item.timestamp).toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
            
            {/* 游戏提示 */}
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-yellow-500" />
                  游戏提示
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-1">诚实回答</h4>
                  <p className="text-sm text-blue-700">真心话环节请诚实回答，增进彼此了解</p>
                </div>
                
                <div className="p-3 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-800 mb-1">安全第一</h4>
                  <p className="text-sm text-green-700">大冒险挑战请在安全范围内进行</p>
                </div>
                
                <div className="p-3 bg-purple-50 rounded-lg">
                  <h4 className="font-medium text-purple-800 mb-1">尊重他人</h4>
                  <p className="text-sm text-purple-700">尊重每个人的选择和界限</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
      
      {/* 自定义卡片表单模态框 */}
      {showCustomForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-blue-500" />
                创建自定义卡片
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">卡片类型</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setNewCardType('truth')}
                    className={`p-2 rounded-lg border ${
                      newCardType === 'truth' 
                        ? 'border-red-500 bg-red-50 text-red-700' 
                        : 'border-gray-200'
                    }`}
                  >
                    <Heart className="h-4 w-4 inline mr-1" />
                    真心话
                  </button>
                  <button
                    onClick={() => setNewCardType('dare')}
                    className={`p-2 rounded-lg border ${
                      newCardType === 'dare' 
                        ? 'border-orange-500 bg-orange-50 text-orange-700' 
                        : 'border-gray-200'
                    }`}
                  >
                    <Zap className="h-4 w-4 inline mr-1" />
                    大冒险
                  </button>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">难度等级</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['easy', 'medium', 'hard'] as const).map(level => (
                    <button
                      key={level}
                      onClick={() => setNewCardDifficulty(level)}
                      className={`p-2 rounded-lg border text-sm ${
                        newCardDifficulty === level 
                          ? 'border-purple-500 bg-purple-50 text-purple-700' 
                          : 'border-gray-200'
                      }`}
                    >
                      {level === 'easy' ? '简单' : level === 'medium' ? '中等' : '困难'}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">卡片内容</label>
                <textarea
                  value={newCardContent}
                  onChange={(e) => setNewCardContent(e.target.value)}
                  className="w-full p-3 border rounded-lg resize-none"
                  rows={4}
                  placeholder={newCardType === 'truth' ? '输入真心话问题...' : '输入大冒险挑战...'}
                />
              </div>
              
              <div className="flex gap-2">
                <Button 
                  onClick={addCustomCard}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                  disabled={!newCardContent.trim()}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  创建
                </Button>
                <Button 
                  onClick={() => setShowCustomForm(false)}
                  variant="outline"
                >
                  取消
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}