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
  Trophy
} from 'lucide-react'
import Link from 'next/link'

// 游戏地图格子内容
const boardSpaces = [
  { id: 0, type: 'start', label: '起点', color: 'bg-green-400' },
  { id: 1, type: 'question', label: '真心话', color: 'bg-blue-300' },
  { id: 2, type: 'normal', label: '', color: 'bg-gray-200' },
  { id: 3, type: 'challenge', label: '大冒险', color: 'bg-red-300' },
  { id: 4, type: 'normal', label: '', color: 'bg-gray-200' },
  { id: 5, type: 'gift', label: '礼物', color: 'bg-purple-300' },
  { id: 6, type: 'normal', label: '', color: 'bg-gray-200' },
  { id: 7, type: 'question', label: '真心话', color: 'bg-blue-300' },
  { id: 8, type: 'normal', label: '', color: 'bg-gray-200' },
  { id: 9, type: 'challenge', label: '大冒险', color: 'bg-red-300' },
  { id: 10, type: 'normal', label: '', color: 'bg-gray-200' },
  { id: 11, type: 'gift', label: '礼物', color: 'bg-purple-300' },
  { id: 12, type: 'normal', label: '', color: 'bg-gray-200' },
  { id: 13, type: 'question', label: '真心话', color: 'bg-blue-300' },
  { id: 14, type: 'normal', label: '', color: 'bg-gray-200' },
  { id: 15, type: 'challenge', label: '大冒险', color: 'bg-red-300' },
  { id: 16, type: 'normal', label: '', color: 'bg-gray-200' },
  { id: 17, type: 'gift', label: '礼物', color: 'bg-purple-300' },
  { id: 18, type: 'normal', label: '', color: 'bg-gray-200' },
  { id: 19, type: 'question', label: '真心话', color: 'bg-blue-300' },
  { id: 20, type: 'normal', label: '', color: 'bg-gray-200' },
  { id: 21, type: 'challenge', label: '大冒险', color: 'bg-red-300' },
  { id: 22, type: 'normal', label: '', color: 'bg-gray-200' },
  { id: 23, type: 'gift', label: '礼物', color: 'bg-purple-300' },
  { id: 24, type: 'normal', label: '', color: 'bg-gray-200' },
  { id: 25, type: 'question', label: '真心话', color: 'bg-blue-300' },
  { id: 26, type: 'normal', label: '', color: 'bg-gray-200' },
  { id: 27, type: 'challenge', label: '大冒险', color: 'bg-red-300' },
  { id: 28, type: 'normal', label: '', color: 'bg-gray-200' },
  { id: 29, type: 'gift', label: '礼物', color: 'bg-purple-300' },
  { id: 30, type: 'finish', label: '终点', color: 'bg-yellow-400' }
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

export default function RelationshipChessPage() {
  const [gameStarted, setGameStarted] = useState(false)
  const [currentPlayer, setCurrentPlayer] = useState(1)
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

  // 计时器
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (timerActive && !winner) {
      interval = setInterval(() => {
        setGameTime(prevTime => prevTime + 1)
      }, 1000)
    } else if (!timerActive) {
      if (interval) {
        clearInterval(interval)
      }
    }
    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [timerActive, winner])

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
    setCurrentPlayer(1)
    setPlayer1Position(0)
    setPlayer2Position(0)
    setDiceValue(0)
    setCurrentTask(null)
    setShowTaskModal(false)
    setCompletedTasks([])
    setWinner(null)
  }

  // 掷骰子
  const rollDice = () => {
    if (isRolling) return
    
    setIsRolling(true)
    setDiceValue(0)
    
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
  interface Task {
    type: 'question' | 'challenge' | 'gift'
    title: string
    content: string
    icon: JSX.Element
  }
  
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

  // 切换玩家
  const switchPlayer = () => {
    setCurrentPlayer(currentPlayer === 1 ? 2 : 1)
  }

  // 处理获胜
  const handleWin = (player: number) => {
    setWinner(player)
    setTimerActive(false)
  }

  // 重置游戏
  const resetGame = () => {
    setGameStarted(false)
    setGameTime(0)
    setTimerActive(false)
    setCurrentPlayer(1)
    setPlayer1Position(0)
    setPlayer2Position(0)
    setDiceValue(0)
    setCurrentTask(null)
    setShowTaskModal(false)
    setCompletedTasks([])
    setWinner(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6">
            <Link href="/games">
              <Button variant="outline" className="mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                返回互动游戏
              </Button>
            </Link>
          </div>
          
          {/* 页面标题 */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              关系飞行棋
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 block md:inline">
                增进了解
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              两人专属互动棋盘游戏，通过完成任务增进彼此了解和感情
            </p>
          </div>

          {!gameStarted ? (
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Dice6 className="h-5 w-5 text-purple-500" />
                  游戏规则
                </CardTitle>
                <CardDescription>
                  了解规则，准备开始你们的关系探索之旅
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <h3 className="font-semibold">游戏玩法</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-purple-600">1</span>
                      </div>
                      <span>两人轮流掷骰子，根据点数前进相应步数</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-purple-600">2</span>
                      </div>
                      <span>落在特殊格子需要完成相应任务：真心话、大冒险或甜蜜任务</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-purple-600">3</span>
                      </div>
                      <span>完成任务后轮到下一位玩家，先到达终点者获胜</span>
                    </li>
                  </ul>
                </div>
                
                <div className="grid grid-cols-3 gap-4 pt-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <MessageCircle className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                    <h4 className="font-medium">真心话</h4>
                    <p className="text-xs text-gray-600">分享内心真实的想法</p>
                  </div>
                  <div className="text-center p-3 bg-red-50 rounded-lg">
                    <Sparkles className="h-8 w-8 text-red-500 mx-auto mb-2" />
                    <h4 className="font-medium">大冒险</h4>
                    <p className="text-xs text-gray-600">完成有趣的小挑战</p>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <Gift className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                    <h4 className="font-medium">甜蜜任务</h4>
                    <p className="text-xs text-gray-600">表达爱意的小互动</p>
                  </div>
                </div>
                
                <div className="text-center pt-4">
                  <Button onClick={startGame} size="lg" className="px-8 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                    <Play className="h-4 w-4 mr-2" />
                    开始游戏
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* 左侧游戏控制区 */}
              <div className="lg:col-span-1 space-y-6">
                {/* 游戏状态 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>游戏状态</span>
                      <Button variant="outline" size="sm" onClick={resetGame}>
                        <RotateCcw className="h-4 w-4 mr-1" />
                        重置
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">游戏时间</span>
                      <span className="text-sm font-bold">{formatTime(gameTime)}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">当前玩家</span>
                      <Badge variant={currentPlayer === 1 ? "default" : "secondary"}>
                        玩家 {currentPlayer}
                      </Badge>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">已完成任务</span>
                      <span className="text-sm font-bold">{completedTasks.length}</span>
                    </div>
                  </CardContent>
                </Card>
                
                {/* 玩家位置 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-blue-500" />
                      玩家位置
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                        <span className="text-sm font-medium">玩家 1</span>
                      </div>
                      <span className="text-sm font-bold">{player1Position} / 30</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-pink-500"></div>
                        <span className="text-sm font-medium">玩家 2</span>
                      </div>
                      <span className="text-sm font-bold">{player2Position} / 30</span>
                    </div>
                  </CardContent>
                </Card>
                
                {/* 骰子 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Dice6 className="h-5 w-5 text-purple-500" />
                      掷骰子
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 bg-white rounded-lg shadow-md flex items-center justify-center">
                      <div className={`text-4xl font-bold ${isRolling ? 'animate-pulse' : ''}`}>
                        {diceValue > 0 ? diceValue : '?'}
                      </div>
                    </div>
                    <Button 
                      onClick={rollDice} 
                      disabled={isRolling || showTaskModal || winner !== null}
                      className="w-full"
                    >
                      {isRolling ? '掷骰中...' : '掷骰子'}
                    </Button>
                  </CardContent>
                </Card>
                
                {/* 任务历史 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-yellow-500" />
                      任务历史
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {completedTasks.length > 0 ? (
                        completedTasks.map((task, index) => (
                          <div key={index} className="text-xs p-2 bg-gray-50 rounded flex items-center gap-2">
                            {task.icon}
                            <span className="truncate">{task.content}</span>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-gray-500 text-center">暂无已完成任务</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* 右侧游戏棋盘 */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5 text-purple-500" />
                      游戏棋盘
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-6 gap-1">
                      {boardSpaces.map((space) => (
                        <div
                          key={space.id}
                          className={`aspect-square rounded-lg flex flex-col items-center justify-center text-xs font-medium ${space.color} relative ${
                            space.id === player1Position ? 'ring-2 ring-blue-500' : ''
                          } ${
                            space.id === player2Position ? 'ring-2 ring-pink-500' : ''
                          }`}
                        >
                          {space.label && <span className="text-xs">{space.label}</span>}
                          
                          {/* 玩家标记 */}
                          {space.id === player1Position && (
                            <div className="absolute top-0 right-0 w-3 h-3 rounded-full bg-blue-500 border-2 border-white"></div>
                          )}
                          {space.id === player2Position && (
                            <div className="absolute bottom-0 left-0 w-3 h-3 rounded-full bg-pink-500 border-2 border-white"></div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
          
          {/* 任务弹窗 */}
          {showTaskModal && currentTask && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <Card className="max-w-md w-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {currentTask.icon}
                    {currentTask.title}
                  </CardTitle>
                  <CardDescription>
                    玩家 {currentPlayer} 的挑战任务
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-6">{currentTask.content}</p>
                  <div className="text-center">
                    <Button onClick={completeTask} className="px-8">
                      完成任务
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          
          {/* 获胜弹窗 */}
          {winner && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <Card className="max-w-md w-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-center justify-center">
                    <Trophy className="h-6 w-6 text-yellow-500" />
                    游戏结束
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="mb-4">
                    <div className={`w-16 h-16 rounded-full mx-auto mb-4 ${
                      winner === 1 ? 'bg-blue-100' : 'bg-pink-100'
                    } flex items-center justify-center`}>
                      <Users className={`h-8 w-8 ${
                        winner === 1 ? 'text-blue-500' : 'text-pink-500'
                      }`} />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">玩家 {winner} 获胜！</h3>
                    <p className="text-gray-600 mb-4">游戏用时：{formatTime(gameTime)}</p>
                    <p className="text-gray-600 mb-4">完成任务数：{completedTasks.length}</p>
                  </div>
                  <div className="flex gap-2 justify-center">
                    <Button onClick={resetGame} variant="outline">
                      再来一局
                    </Button>
                    <Button onClick={() => setWinner(null)}>
                      查看棋盘
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  )
}