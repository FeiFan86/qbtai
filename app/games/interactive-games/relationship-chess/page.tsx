'use client'

import { useState, useEffect } from 'react'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  ArrowLeft,
  Dice6,
  Users,
  Heart,
  Star,
  RotateCcw,
  MessageCircle,
  Gift,
  Camera,
  Coffee,
  Music,
  Book,
  Sparkles,
  Award,
  Clock,
  Play,
  Settings,
  Trophy,
  Pause,
  Save,
  Share2,
  History,
  SkipForward,
  Volume2,
  VolumeX,
  Zap
} from 'lucide-react'
import Link from 'next/link'

// 游戏地图格子内容
const boardSpaces = [
  { id: 0, type: 'start', label: '起点', color: 'bg-green-400', description: '游戏开始的地方' },
  { id: 1, type: 'question', label: '真心话', color: 'bg-blue-300', description: '回答一个关于你们关系的问题' },
  { id: 2, type: 'normal', label: '', color: 'bg-gray-200', description: '安全地带' },
  { id: 3, type: 'challenge', label: '大冒险', color: 'bg-red-300', description: '完成一个有趣的挑战' },
  { id: 4, type: 'normal', label: '', color: 'bg-gray-200', description: '安全地带' },
  { id: 5, type: 'gift', label: '礼物', color: 'bg-purple-300', description: '给对方一个甜蜜的礼物' },
  { id: 6, type: 'normal', label: '', color: 'bg-gray-200', description: '安全地带' },
  { id: 7, type: 'question', label: '真心话', color: 'bg-blue-300', description: '回答一个关于你们关系的问题' },
  { id: 8, type: 'normal', label: '', color: 'bg-gray-200', description: '安全地带' },
  { id: 9, type: 'challenge', label: '大冒险', color: 'bg-red-300', description: '完成一个有趣的挑战' },
  { id: 10, type: 'normal', label: '', color: 'bg-gray-200', description: '安全地带' },
  { id: 11, type: 'gift', label: '礼物', color: 'bg-purple-300', description: '给对方一个甜蜜的礼物' },
  { id: 12, type: 'normal', label: '', color: 'bg-gray-200', description: '安全地带' },
  { id: 13, type: 'question', label: '真心话', color: 'bg-blue-300', description: '回答一个关于你们关系的问题' },
  { id: 14, type: 'normal', label: '', color: 'bg-gray-200', description: '安全地带' },
  { id: 15, type: 'challenge', label: '大冒险', color: 'bg-red-300', description: '完成一个有趣的挑战' },
  { id: 16, type: 'normal', label: '', color: 'bg-gray-200', description: '安全地带' },
  { id: 17, type: 'gift', label: '礼物', color: 'bg-purple-300', description: '给对方一个甜蜜的礼物' },
  { id: 18, type: 'normal', label: '', color: 'bg-gray-200', description: '安全地带' },
  { id: 19, type: 'question', label: '真心话', color: 'bg-blue-300', description: '回答一个关于你们关系的问题' },
  { id: 20, type: 'normal', label: '', color: 'bg-gray-200', description: '安全地带' },
  { id: 21, type: 'challenge', label: '大冒险', color: 'bg-red-300', description: '完成一个有趣的挑战' },
  { id: 22, type: 'normal', label: '', color: 'bg-gray-200', description: '安全地带' },
  { id: 23, type: 'gift', label: '礼物', color: 'bg-purple-300', description: '给对方一个甜蜜的礼物' },
  { id: 24, type: 'normal', label: '', color: 'bg-gray-200', description: '安全地带' },
  { id: 25, type: 'question', label: '真心话', color: 'bg-blue-300', description: '回答一个关于你们关系的问题' },
  { id: 26, type: 'normal', label: '', color: 'bg-gray-200', description: '安全地带' },
  { id: 27, type: 'challenge', label: '大冒险', color: 'bg-red-300', description: '完成一个有趣的挑战' },
  { id: 28, type: 'normal', label: '', color: 'bg-gray-200', description: '安全地带' },
  { id: 29, type: 'gift', label: '礼物', color: 'bg-purple-300', description: '给对方一个甜蜜的礼物' },
  { id: 30, type: 'finish', label: '终点', color: 'bg-yellow-400', description: '到达终点，游戏胜利！' }
]

// 真心话问题库
const truthQuestions = [
  "你最欣赏对方的哪个特点？",
  "分享一个你们之间的甜蜜回忆",
  "如果只能用一个词形容对方，你会用什么？",
  "对方做什么事情会让你最心动？",
  "你们第一次见面时你的第一印象是什么？",
  "你最想和对方一起实现的一个梦想是什么？",
  "分享一件对方不知道的关于你的小事",
  "你认为什么样的关系最理想？",
  "你最喜欢对方的哪个笑容？",
  "如果明天就是世界末日，你想和对方做什么？",
  "描述一下你想象中和对方一起变老的场景",
  "你最想为对方改变的一个缺点是什么？",
  "分享一个你觉得对方很可爱的小习惯",
  "如果可以给对方一项超能力，你会给什么？",
  "你认为你们关系中最重要的三个品质是什么？"
]

// 大冒险挑战库
const dareChallenges = [
  "模仿对方的一个表情或动作",
  "给对方讲一个冷笑话",
  "用三种语言说'我爱你'",
  "表演你最喜欢的浪漫电影场景",
  "为对方唱一小段歌",
  "用身体语言表演一个你们共同的经历",
  "给对方做一次简单的按摩",
  "分享一个童年时的尴尬经历",
  "对着窗户大声说一句对对方的赞美",
  "闭着眼睛走到对方身边",
  "用手势比划你们未来十年想做的事",
  "背对方绕房间走一圈",
  "和对方一起完成一段即兴舞蹈",
  "描述对方今天的穿搭但要用夸张的语言"
]

// 礼物任务库
const giftTasks = [
  "为对方画一幅简单的画",
  "写一张小纸条给对方",
  "给对方一个拥抱",
  "分享一个对方可能感兴趣的新知识",
  "为对方倒一杯水",
  "夸奖对方三个优点",
  "告诉对方一件今天让你开心的事",
  "为对方准备一个小惊喜",
  "和对方分享一个喜欢的歌单",
  "给对方拍一张好看的照片"
]

// 游戏记录接口
interface GameRecord {
  id: string
  date: string
  duration: number
  winner: number
  tasksCompleted: number
  player1Name: string
  player2Name: string
}

// 任务接口
interface Task {
  type: 'question' | 'challenge' | 'gift'
  title: string
  content: string
  icon: JSX.Element
}

export default function RelationshipChessPage() {
  const [gameStarted, setGameStarted] = useState(false)
  const [currentPlayer, setCurrentPlayer] = useState(1)
  const [player1Name, setPlayer1Name] = useState('玩家1')
  const [player2Name, setPlayer2Name] = useState('玩家2')
  const [player1Position, setPlayer1Position] = useState(0)
  const [player2Position, setPlayer2Position] = useState(0)
  const [diceValue, setDiceValue] = useState(0)
  const [isRolling, setIsRolling] = useState(false)
  const [currentTask, setCurrentTask] = useState<Task | null>(null)
  const [showTaskModal, setShowTaskModal] = useState(false)
  const [completedTasks, setCompletedTasks] = useState<Task[]>([])
  const [gameTime, setGameTime] = useState(0)
  const [timerActive, setTimerActive] = useState(false)
  const [winner, setWinner] = useState<number | null>(null)
  const [showSettings, setShowSettings] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [gameHistory, setGameHistory] = useState<GameRecord[]>([])
  const [showHistory, setShowHistory] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  // 计时器
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (timerActive && !winner && !isPaused) {
      interval = setInterval(() => {
        setGameTime(prevTime => prevTime + 1)
      }, 1000)
    } else if (!timerActive || isPaused) {
      if (interval) {
        clearInterval(interval)
      }
    }
    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [timerActive, winner, isPaused])

  // 加载游戏历史
  useEffect(() => {
    const savedHistory = localStorage.getItem('relationshipChessHistory')
    if (savedHistory) {
      try {
        setGameHistory(JSON.parse(savedHistory))
      } catch (error) {
        console.error('Failed to load game history:', error)
      }
    }
  }, [])

  // 格式化时间
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // 开始游戏
  const startGame = () => {
    setGameStarted(true)
    setGameTime(0)
    setTimerActive(true)
    setIsPaused(false)
    setCurrentPlayer(1)
    setPlayer1Position(0)
    setPlayer2Position(0)
    setDiceValue(0)
    setCurrentTask(null)
    setShowTaskModal(false)
    setCompletedTasks([])
    setWinner(null)
  }

  // 暂停游戏
  const pauseGame = () => {
    setIsPaused(!isPaused)
  }

  // 保存游戏
  const saveGame = () => {
    const gameState = {
      currentPlayer,
      player1Position,
      player2Position,
      gameTime,
      completedTasks,
      player1Name,
      player2Name
    }
    localStorage.setItem('relationshipChessSave', JSON.stringify(gameState))
    alert('游戏已保存！')
  }

  // 加载游戏
  const loadGame = () => {
    const savedGame = localStorage.getItem('relationshipChessSave')
    if (savedGame) {
      try {
        const gameState = JSON.parse(savedGame)
        setCurrentPlayer(gameState.currentPlayer)
        setPlayer1Position(gameState.player1Position)
        setPlayer2Position(gameState.player2Position)
        setGameTime(gameState.gameTime)
        setCompletedTasks(gameState.completedTasks || [])
        setPlayer1Name(gameState.player1Name)
        setPlayer2Name(gameState.player2Name)
        setGameStarted(true)
        setTimerActive(true)
        alert('游戏已加载！')
      } catch (error) {
        console.error('Failed to load game:', error)
        alert('加载游戏失败！')
      }
    } else {
      alert('没有找到保存的游戏！')
    }
  }

  // 分享游戏结果
  const shareResult = () => {
    if (winner) {
      const winnerName = winner === 1 ? player1Name : player2Name
      const text = `${winnerName}赢得了关系飞行棋游戏！用时${formatTime(gameTime)}，完成了${completedTasks.length}个任务。`
      
      if (navigator.share) {
        navigator.share({
          title: '关系飞行棋游戏结果',
          text: text
        })
      } else {
        navigator.clipboard.writeText(text)
        alert('游戏结果已复制到剪贴板！')
      }
    }
  }

  // 掷骰子
  const rollDice = () => {
    if (isRolling || isPaused) return
    
    setIsRolling(true)
    setDiceValue(0)
    
    // 播放掷骰子音效
    if (soundEnabled) {
      // 这里可以添加音效
    }
    
    // 模拟掷骰子动画
    let rollCount = 0
    const rollInterval = setInterval(() => {
      setDiceValue(Math.floor(Math.random() * 6) + 1)
      rollCount++
      
      if (rollCount > 10) {
        clearInterval(rollInterval)
        const finalValue = Math.floor(Math.random() * 6) + 1
        setDiceValue(finalValue)
        setIsRolling(false)
        
        // 移动棋子
        if (currentPlayer === 1) {
          const newPosition = Math.min(player1Position + finalValue, 30)
          setPlayer1Position(newPosition)
          
          // 检查是否到达终点
          if (newPosition === 30) {
            handleWin(1)
          } else {
            // 检查当前格子类型
            const currentSpace = boardSpaces[newPosition]
            if (currentSpace.type !== 'normal' && currentSpace.type !== 'start' && currentSpace.type !== 'finish') {
              generateTask(currentSpace.type as 'question' | 'challenge' | 'gift')
            } else {
              // 普通格子，切换玩家
              switchPlayer()
            }
          }
        } else {
          const newPosition = Math.min(player2Position + finalValue, 30)
          setPlayer2Position(newPosition)
          
          // 检查是否到达终点
          if (newPosition === 30) {
            handleWin(2)
          } else {
            // 检查当前格子类型
            const currentSpace = boardSpaces[newPosition]
            if (currentSpace.type !== 'normal' && currentSpace.type !== 'start' && currentSpace.type !== 'finish') {
              generateTask(currentSpace.type as 'question' | 'challenge' | 'gift')
            } else {
              // 普通格子，切换玩家
              switchPlayer()
            }
          }
        }
      }
    }, 100)
  }

  // 生成任务
  const generateTask = (type: 'question' | 'challenge' | 'gift') => {
    let task: Task | null = null
    
    switch (type) {
      case 'question':
        task = {
          type: 'question',
          title: '真心话',
          content: truthQuestions[Math.floor(Math.random() * truthQuestions.length)],
          icon: <MessageCircle className="h-6 w-6 text-blue-500" />
        }
        break
      case 'challenge':
        task = {
          type: 'challenge',
          title: '大冒险',
          content: dareChallenges[Math.floor(Math.random() * dareChallenges.length)],
          icon: <Sparkles className="h-6 w-6 text-red-500" />
        }
        break
      case 'gift':
        task = {
          type: 'gift',
          title: '甜蜜任务',
          content: giftTasks[Math.floor(Math.random() * giftTasks.length)],
          icon: <Gift className="h-6 w-6 text-purple-500" />
        }
        break
    }
    
    setCurrentTask(task)
    setShowTaskModal(true)
  }

  // 完成任务
  const completeTask = () => {
    if (currentTask) {
      setCompletedTasks([...completedTasks, currentTask])
      setShowTaskModal(false)
      switchPlayer()
    }
  }

  // 跳过任务
  const skipTask = () => {
    setShowTaskModal(false)
    switchPlayer()
  }

  // 切换玩家
  const switchPlayer = () => {
    setCurrentPlayer(currentPlayer === 1 ? 2 : 1)
  }

  // 处理获胜
  const handleWin = (player: number) => {
    setWinner(player)
    setTimerActive(false)
    
    // 保存游戏记录
    const record: GameRecord = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      duration: gameTime,
      winner: player,
      tasksCompleted: completedTasks.length,
      player1Name,
      player2Name
    }
    
    const updatedHistory = [record, ...gameHistory].slice(0, 10) // 保留最近10条记录
    setGameHistory(updatedHistory)
    localStorage.setItem('relationshipChessHistory', JSON.stringify(updatedHistory))
  }

  // 重置游戏
  const resetGame = () => {
    setGameStarted(false)
    setGameTime(0)
    setTimerActive(false)
    setIsPaused(false)
    setCurrentPlayer(1)
    setPlayer1Position(0)
    setPlayer2Position(0)
    setDiceValue(0)
    setCurrentTask(null)
    setShowTaskModal(false)
    setCompletedTasks([])
    setWinner(null)
  }

  // 渲染骰子
  const renderDice = () => {
    if (isRolling) {
      return <Dice6 className="h-16 w-16 text-purple-600 animate-spin" />
    } else if (diceValue > 0) {
      return (
        <div className="h-16 w-16 bg-white border-2 border-purple-600 rounded-lg flex items-center justify-center text-3xl font-bold text-purple-600">
          {diceValue}
        </div>
      )
    } else {
      return <Dice6 className="h-16 w-16 text-gray-400" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/games/interactive-games" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors mb-6">
            <ArrowLeft className="h-4 w-4" />
            返回互动游戏
          </Link>
          
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
              关系飞行棋
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              通过情感话题和挑战增进彼此了解，在游戏中深化感情连接
            </p>
          </div>
        </div>

        {!gameStarted ? (
          // 游戏开始界面
          <div className="max-w-2xl mx-auto">
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl flex items-center justify-center gap-2">
                  <Heart className="h-6 w-6 text-red-500" />
                  准备开始游戏
                </CardTitle>
                <CardDescription>
                  设置玩家名称，开始你们的关系探索之旅
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">玩家1名称</label>
                    <input
                      type="text"
                      value={player1Name}
                      onChange={(e) => setPlayer1Name(e.target.value)}
                      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="输入玩家1名称"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">玩家2名称</label>
                    <input
                      type="text"
                      value={player2Name}
                      onChange={(e) => setPlayer2Name(e.target.value)}
                      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="输入玩家2名称"
                    />
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Button onClick={startGame} className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white">
                    <Play className="h-4 w-4 mr-2" />
                    开始游戏
                  </Button>
                  {localStorage.getItem('relationshipChessSave') && (
                    <Button onClick={loadGame} variant="outline">
                      <Save className="h-4 w-4 mr-2" />
                      加载游戏
                    </Button>
                  )}
                </div>
                
                {gameHistory.length > 0 && (
                  <div className="text-center">
                    <Button
                      onClick={() => setShowHistory(!showHistory)}
                      variant="ghost"
                      className="text-blue-600"
                    >
                      <History className="h-4 w-4 mr-2" />
                      查看游戏历史
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {showHistory && (
              <Card className="mt-6 bg-white/80 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">游戏历史</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {gameHistory.map((record) => (
                      <div key={record.id} className="p-3 bg-gray-50 rounded-lg flex justify-between items-center">
                        <div>
                          <div className="font-medium">
                            {record.player1Name} vs {record.player2Name}
                          </div>
                          <div className="text-sm text-gray-600">
                            {new Date(record.date).toLocaleDateString()} · {formatTime(record.duration)}
                          </div>
                        </div>
                        <Badge className="bg-green-100 text-green-800 border-0">
                          {record.winner === 1 ? record.player1Name : record.player2Name} 获胜
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        ) : (
          // 游戏进行界面
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* 左侧游戏面板 */}
            <div className="lg:col-span-3">
              <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-yellow-500" />
                      游戏进行中
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge className={currentPlayer === 1 ? "bg-blue-100 text-blue-800 border-0" : "bg-purple-100 text-purple-800 border-0"}>
                        当前玩家: {currentPlayer === 1 ? player1Name : player2Name}
                      </Badge>
                      <Badge className="bg-green-100 text-green-800 border-0">
                        {formatTime(gameTime)}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* 游戏棋盘 */}
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl">
                    <div className="grid grid-cols-6 gap-2">
                      {boardSpaces.map((space) => (
                        <div
                          key={space.id}
                          className={`aspect-square ${space.color} rounded-lg flex flex-col items-center justify-center text-xs p-2 relative border-2 border-white`}
                          title={space.description}
                        >
                          {space.label && <div className="font-semibold">{space.label}</div>}
                          
                          {/* 玩家棋子 */}
                          {player1Position === space.id && (
                            <div className="absolute top-0 right-0 w-4 h-4 bg-blue-600 rounded-full border-2 border-white transform translate-x-1 -translate-y-1"></div>
                          )}
                          {player2Position === space.id && (
                            <div className="absolute bottom-0 left-0 w-4 h-4 bg-purple-600 rounded-full border-2 border-white transform -translate-x-1 translate-y-1"></div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* 游戏控制 */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* 骰子 */}
                      <div className="flex flex-col items-center">
                        {renderDice()}
                        <div className="text-sm text-gray-600 mt-2">骰子</div>
                      </div>
                      
                      {/* 掷骰子按钮 */}
                      <Button
                        onClick={rollDice}
                        disabled={isRolling || isPaused || winner !== null}
                        className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                      >
                        {isRolling ? '掷骰子中...' : '掷骰子'}
                      </Button>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {winner === null && (
                        <Button onClick={pauseGame} variant="outline" size="sm">
                          {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                        </Button>
                      )}
                      <Button onClick={saveGame} variant="outline" size="sm">
                        <Save className="h-4 w-4" />
                      </Button>
                      <Button onClick={resetGame} variant="outline" size="sm">
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* 右侧信息面板 */}
            <div className="space-y-4">
              {/* 玩家信息 */}
              <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-500" />
                    玩家信息
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className={`p-3 rounded-lg ${currentPlayer === 1 ? 'bg-blue-50 border-2 border-blue-200' : 'bg-gray-50'}`}>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                      <div className="font-medium">{player1Name}</div>
                    </div>
                    <div className="text-sm text-gray-600">位置: {player1Position}/30</div>
                  </div>
                  
                  <div className={`p-3 rounded-lg ${currentPlayer === 2 ? 'bg-purple-50 border-2 border-purple-200' : 'bg-gray-50'}`}>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-purple-600 rounded-full"></div>
                      <div className="font-medium">{player2Name}</div>
                    </div>
                    <div className="text-sm text-gray-600">位置: {player2Position}/30</div>
                  </div>
                </CardContent>
              </Card>
              
              {/* 任务进度 */}
              <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Award className="h-5 w-5 text-yellow-500" />
                    任务进度
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <div className="text-2xl font-bold text-purple-600">{completedTasks.length}</div>
                    <div className="text-sm text-gray-600">已完成任务</div>
                  </div>
                  
                  {completedTasks.length > 0 && (
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {completedTasks.map((task, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded text-sm">
                          {task.icon}
                          <span className="truncate">{task.title}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* 游戏说明 */}
              <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Zap className="h-5 w-5 text-orange-500" />
                    游戏说明
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-2">
                    <div className="w-4 h-4 bg-blue-300 rounded-full mt-0.5"></div>
                    <div className="text-sm">
                      <div className="font-medium">真心话</div>
                      <div className="text-gray-600">回答关于你们关系的问题</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <div className="w-4 h-4 bg-red-300 rounded-full mt-0.5"></div>
                    <div className="text-sm">
                      <div className="font-medium">大冒险</div>
                      <div className="text-gray-600">完成有趣的挑战任务</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <div className="w-4 h-4 bg-purple-300 rounded-full mt-0.5"></div>
                    <div className="text-sm">
                      <div className="font-medium">甜蜜任务</div>
                      <div className="text-gray-600">给对方准备小惊喜</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
        
        {/* 任务模态框 */}
        {showTaskModal && currentTask && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md">
              <CardHeader className="text-center">
                <div className="mx-auto mb-2">{currentTask.icon}</div>
                <CardTitle className="text-xl">{currentTask.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-center text-lg">{currentTask.content}</p>
                
                <div className="flex gap-3">
                  <Button 
                    onClick={completeTask}
                    className="flex-1 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    完成任务
                  </Button>
                  <Button 
                    onClick={skipTask}
                    variant="outline"
                  >
                    <SkipForward className="h-4 w-4 mr-2" />
                    跳过
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        
        {/* 游戏结束模态框 */}
        {winner !== null && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md">
              <CardHeader className="text-center">
                <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                <CardTitle className="text-2xl">游戏结束！</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-xl font-semibold mb-2">
                    🎉 {winner === 1 ? player1Name : player2Name} 获胜！
                  </div>
                  <div className="text-gray-600">
                    用时: {formatTime(gameTime)} · 完成任务: {completedTasks.length}
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Button 
                    onClick={shareResult}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    分享结果
                  </Button>
                  <Button 
                    onClick={resetGame}
                    variant="outline"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    再来一局
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  )
}