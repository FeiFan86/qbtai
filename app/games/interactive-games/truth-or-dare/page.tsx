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
  Flame
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
    "打电话给朋友说\"我爱你\"",
    "发一条朋友圈说\"我今天太帅了\"",
    "跳一段奇怪的舞蹈",
    "给陌生人一个拥抱",
    "用嘴叼着笔写字",
    "头顶一本书走一圈",
    "跪地求婚给在场任意一人",
    "用三种语言说"我饿了"",
    "唱一首儿歌",
    "做10个俯卧撑"
  ],
  hard: [
    "在社交媒体上发布一张奇怪的自拍",
    "给前任发一条\"最近好吗\"的消息",
    "脱掉上衣（如果合适的话）",
    "让在场的人在你脸上画画",
    "模仿超级英雄的招牌动作",
    "喝一杯奇怪的混合饮料",
    "穿着睡衣在房间里走一圈",
    "给父母发一条\"我爱你\"",
    "模仿婴儿哭泣",
    "在窗户前大声唱一首歌"
  ]
}

// 情侣专属真心话问题
const coupleTruthQuestions = {
  easy: [
    "你最喜欢对方的哪个笑容？",
    "你最喜欢和对方一起做什么？",
    "你最喜欢对方的哪个习惯？",
    "你最想念对方的哪个时刻？",
    "你最想和对方去哪里旅行？",
    "你最喜欢对方的哪件衣服？",
    "你最想和对方一起看什么电影？",
    "你最欣赏对方的哪个品质？",
    "你最想和对方一起吃什么？",
    "你最喜欢的和对方的回忆是什么？"
  ],
  medium: [
    "你第一次见到对方时想了什么？",
    "你最想改变对方的哪个习惯？",
    "你最害怕和对方吵架的原因是什么？",
    "你最想对但没对对方说的话是什么？",
    "你最希望对方为你做什么？",
    "你最想在什么场景下向对方求婚？",
    "你最想和对方一起实现的梦想是什么？",
    "你最害怕失去对方的什么？",
    "你最想和对方一起变老的场景是什么？",
    "你最想对对方的父母说什么？"
  ],
  hard: [
    "你和对方在一起最大的恐惧是什么？",
    "你能为对方做出的最大牺牲是什么？",
    "你和对方在一起最大的秘密是什么？",
    "你最想和对方一起面对的挑战是什么？",
    "你能原谅对方的最大错误是什么？",
    "你和对方在一起最脆弱的时刻是什么？",
    "你最想和对方一起改变的缺点是什么？",
    "你和对方在一起最大的遗憾是什么？",
    "你能为对方做出的最大承诺是什么？",
    "你最想和对方一起度过的人生阶段是什么？"
  ]
}

// 情侣专属大冒险挑战
const coupleDareChallenges = {
  easy: [
    "给对方一个拥抱",
    "夸奖对方三个优点",
    "为对方倒一杯水",
    "和对方牵手一分钟",
    "对对方说"我爱你"",
    "为对方唱一首歌",
    "给对方按摩肩膀",
    "和对方一起跳一支舞",
    "给对方一个吻",
    "为对方做一个小手工"
  ],
  medium: [
    "用口红在对方脸上画心",
    "背对方绕房间走一圈",
    "为对方洗脚",
    "穿对方的衣服拍照",
    "在社交媒体上发对方的美照",
    "为对方准备一顿简单的饭",
    "给对方写一封情书",
    "为对方画一幅肖像",
    "和对方一起看日落",
    "为对方做一次全身按摩"
  ],
  hard: [
    "在公共场所向对方求婚",
    "纹身对方的名字或符号",
    "和对方一起裸奔",
    "在社交媒体上公开恋情",
    "和对方一起搬到陌生城市",
    "为对方放弃自己的工作",
    "和对方一起见父母",
    "和对方一起买房子",
    "和对方一起结婚",
    "和对方一起生孩子"
  ]
}

export default function TruthOrDarePage() {
  const [gameStarted, setGameStarted] = useState(false)
  const [gameMode, setGameMode] = useState('normal') // normal, couple, spicy
  const [currentPlayer, setCurrentPlayer] = useState(1)
  const [totalPlayers, setTotalPlayers] = useState(2)
  const [difficulty, setDifficulty] = useState('medium') // easy, medium, hard
  const [currentTask, setCurrentTask] = useState(null)
  const [taskType, setTaskType] = useState('truth') // truth, dare
  const [showTaskModal, setShowTaskModal] = useState(false)
  const [isSpinning, setIsSpinning] = useState(false)
  const [completedTasks, setCompletedTasks] = useState([])
  const [skippedTasks, setSkippedTasks] = useState(0)
  const [gameTime, setGameTime] = useState(0)
  const [timerActive, setTimerActive] = useState(false)
  const [playerScores, setPlayerScores] = useState({})
  const [maxScore, setMaxScore] = useState(5) // 5分获胜

  // 计时器
  useEffect(() => {
    let interval
    if (timerActive && gameStarted) {
      interval = setInterval(() => {
        setGameTime(prevTime => prevTime + 1)
      }, 1000)
    } else if (!timerActive) {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [timerActive, gameStarted])

  // 格式化时间
  const formatTime = (seconds) => {
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
    setCurrentTask(null)
    setShowTaskModal(false)
    setCompletedTasks([])
    setSkippedTasks(0)
    setPlayerScores({})
    
    // 初始化玩家分数
    const scores = {}
    for (let i = 1; i <= totalPlayers; i++) {
      scores[i] = 0
    }
    setPlayerScores(scores)
  }

  // 重置游戏
  const resetGame = () => {
    setGameStarted(false)
    setGameTime(0)
    setTimerActive(false)
    setCurrentPlayer(1)
    setCurrentTask(null)
    setShowTaskModal(false)
    setCompletedTasks([])
    setSkippedTasks(0)
    setPlayerScores({})
  }

  // 获取随机任务
  const getRandomTask = () => {
    if (isSpinning) return
    
    setIsSpinning(true)
    setCurrentTask(null)
    
    // 模拟转盘动画
    setTimeout(() => {
      let questions = []
      
      // 根据游戏模式和类型选择问题库
      if (gameMode === 'couple') {
        if (taskType === 'truth') {
          questions = coupleTruthQuestions[difficulty]
        } else {
          questions = coupleDareChallenges[difficulty]
        }
      } else {
        if (taskType === 'truth') {
          questions = truthQuestions[difficulty]
        } else {
          questions = dareChallenges[difficulty]
        }
      }
      
      // 随机选择一个问题
      const randomIndex = Math.floor(Math.random() * questions.length)
      const selectedTask = questions[randomIndex]
      
      setIsSpinning(false)
      setCurrentTask({
        type: taskType,
        content: selectedTask,
        difficulty: difficulty,
        player: currentPlayer
      })
      setShowTaskModal(true)
    }, 1500)
  }

  // 完成任务
  const completeTask = () => {
    if (currentTask) {
      // 增加玩家分数
      let score = 1
      if (currentTask.difficulty === 'medium') score = 2
      if (currentTask.difficulty === 'hard') score = 3
      
      const newScores = {...playerScores}
      newScores[currentPlayer] = (newScores[currentPlayer] || 0) + score
      setPlayerScores(newScores)
      
      // 记录完成的任务
      setCompletedTasks([...completedTasks, currentTask])
      setShowTaskModal(false)
      setCurrentTask(null)
      
      // 检查是否有人达到获胜分数
      if (newScores[currentPlayer] >= maxScore) {
        handleWin(currentPlayer)
      } else {
        // 切换玩家
        setCurrentPlayer(currentPlayer >= totalPlayers ? 1 : currentPlayer + 1)
      }
    }
  }

  // 跳过任务
  const skipTask = () => {
    if (currentTask) {
      setSkippedTasks(skippedTasks + 1)
      setShowTaskModal(false)
      setCurrentTask(null)
      
      // 切换玩家
      setCurrentPlayer(currentPlayer >= totalPlayers ? 1 : currentPlayer + 1)
    }
  }

  // 处理获胜
  const handleWin = (player) => {
    setTimerActive(false)
    setCurrentTask({
      type: 'winner',
      content: `玩家 ${player} 获得胜利！`,
      player: player
    })
    setShowTaskModal(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-purple-50">
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
              真心话大冒险
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500 block md:inline">
                情感探索
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              通过真心话和大冒险挑战，增进彼此了解，探索情感深度
            </p>
          </div>

          {!gameStarted ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {/* 游戏设置 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-purple-500" />
                    游戏设置
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* 游戏模式 */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">游戏模式</label>
                    <div className="space-y-2">
                      {[
                        { id: 'normal', name: '经典模式', desc: '适合朋友聚会' },
                        { id: 'couple', name: '情侣模式', desc: '增进情侣感情' },
                        { id: 'spicy', name: '激情模式', desc: '更大胆的挑战' }
                      ].map(mode => (
                        <button
                          key={mode.id}
                          onClick={() => setGameMode(mode.id)}
                          className={`w-full p-3 rounded-lg border text-left transition-colors ${
                            gameMode === mode.id 
                              ? 'bg-purple-50 border-purple-300' 
                              : 'border-gray-200 hover:bg-gray-50'
                          }`}
                        >
                          <div className="font-medium">{mode.name}</div>
                          <div className="text-xs text-gray-500">{mode.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* 游戏难度 */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">游戏难度</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'easy', name: '简单', color: 'bg-green-100 text-green-800 border-green-200' },
                        { id: 'medium', name: '中等', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
                        { id: 'hard', name: '困难', color: 'bg-red-100 text-red-800 border-red-200' }
                      ].map(level => (
                        <button
                          key={level.id}
                          onClick={() => setDifficulty(level.id)}
                          className={`p-2 rounded-lg border text-center transition-colors ${
                            difficulty === level.id 
                              ? level.color 
                              : 'border-gray-200'
                          }`}
                        >
                          {level.name}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* 玩家数量 */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">玩家数量</label>
                    <div className="flex gap-2">
                      {[2, 3, 4, 5].map(num => (
                        <button
                          key={num}
                          onClick={() => setTotalPlayers(num)}
                          className={`w-12 h-12 rounded-lg border flex items-center justify-center transition-colors ${
                            totalPlayers === num 
                              ? 'bg-purple-50 border-purple-300 text-purple-700' 
                              : 'border-gray-200'
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* 获胜分数 */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">获胜分数：{maxScore}</label>
                    <input
                      type="range"
                      min="3"
                      max="10"
                      value={maxScore}
                      onChange={(e) => setMaxScore(parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </CardContent>
              </Card>
              
              {/* 游戏规则 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-red-500" />
                    游戏规则
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <h3 className="font-semibold">游戏玩法</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-red-600">1</span>
                        </div>
                        <span>玩家轮流选择真心话或大冒险，然后随机获取任务</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-red-600">2</span>
                        </div>
                        <span>完成任务获得相应分数，简单1分，中等2分，困难3分</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-red-600">3</span>
                        </div>
                        <span>可以选择跳过任务，但不得分</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-red-600">4</span>
                        </div>
                        <span>第一个达到获胜分数的玩家获胜</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="pt-4">
                    <Button 
                      onClick={startGame} 
                      size="lg" 
                      className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
                    >
                      <Flame className="h-4 w-4 mr-2" />
                      开始游戏
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
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
                      <Badge variant="default">玩家 {currentPlayer}</Badge>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">已完成任务</span>
                      <span className="text-sm font-bold">{completedTasks.length}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">跳过任务</span>
                      <span className="text-sm font-bold">{skippedTasks}</span>
                    </div>
                  </CardContent>
                </Card>
                
                {/* 玩家分数 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-yellow-500" />
                      玩家分数
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {Array.from({ length: totalPlayers }, (_, i) => i + 1).map(player => (
                        <div key={player} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className={`w-4 h-4 rounded-full ${
                              player === 1 ? 'bg-blue-500' : 
                              player === 2 ? 'bg-pink-500' : 
                              player === 3 ? 'bg-green-500' : 
                              player === 4 ? 'bg-purple-500' : 'bg-orange-500'
                            }`}></div>
                            <span className="text-sm font-medium">玩家 {player}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold">{playerScores[player] || 0}</span>
                            <span className="text-xs text-gray-500">/ {maxScore}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                {/* 任务选择 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-red-500" />
                      选择任务
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant={taskType === 'truth' ? 'default' : 'outline'}
                        onClick={() => setTaskType('truth')}
                        className="flex items-center justify-center gap-2"
                        disabled={isSpinning || showTaskModal}
                      >
                        <MessageCircle className="h-4 w-4" />
                        真心话
                      </Button>
                      <Button
                        variant={taskType === 'dare' ? 'default' : 'outline'}
                        onClick={() => setTaskType('dare')}
                        className="flex items-center justify-center gap-2"
                        disabled={isSpinning || showTaskModal}
                      >
                        <Sparkles className="h-4 w-4" />
                        大冒险
                      </Button>
                    </div>
                    
                    <Button
                      onClick={getRandomTask}
                      disabled={isSpinning || showTaskModal}
                      className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
                    >
                      {isSpinning ? (
                        <>
                          <Shuffle className="h-4 w-4 mr-2 animate-spin" />
                          随机选择中...
                        </>
                      ) : (
                        <>
                          <Shuffle className="h-4 w-4 mr-2" />
                          随机获取任务
                        </>
                      )}
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
                          <div key={index} className="text-xs p-2 bg-gray-50 rounded">
                            <div className="flex items-center gap-2 mb-1">
                              {task.type === 'truth' ? (
                                <MessageCircle className="h-3 w-3 text-blue-500" />
                              ) : (
                                <Sparkles className="h-3 w-3 text-red-500" />
                              )}
                              <span className="font-medium">玩家 {task.player}</span>
                              <Badge variant="outline" className="text-xs">
                                {task.difficulty === 'easy' ? '简单' : task.difficulty === 'medium' ? '中等' : '困难'}
                              </Badge>
                            </div>
                            <p className="text-gray-600 truncate">{task.content}</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-gray-500 text-center">暂无已完成任务</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* 右侧游戏区域 */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Flame className="h-5 w-5 text-red-500" />
                      游戏区域
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center justify-center py-12">
                      {isSpinning ? (
                        <div className="text-center">
                          <div className="w-32 h-32 mb-6 rounded-full bg-gradient-to-br from-red-200 to-pink-200 flex items-center justify-center animate-pulse">
                            <Shuffle className="h-16 w-16 text-red-600 animate-spin" />
                          </div>
                          <h3 className="text-xl font-semibold mb-2">正在随机选择任务...</h3>
                          <p className="text-gray-500">请稍等，为玩家 {currentPlayer} 准备挑战</p>
                        </div>
                      ) : (
                        <div className="text-center">
                          <div className="w-32 h-32 mb-6 rounded-full bg-gradient-to-br from-red-100 to-pink-100 flex items-center justify-center">
                            {taskType === 'truth' ? (
                              <MessageCircle className="h-16 w-16 text-blue-500" />
                            ) : (
                              <Sparkles className="h-16 w-16 text-red-500" />
                            )}
                          </div>
                          <h3 className="text-xl font-semibold mb-2">
                            玩家 {currentPlayer} 的回合
                          </h3>
                          <p className="text-gray-500 mb-6">
                            已选择：<span className="font-medium">{taskType === 'truth' ? '真心话' : '大冒险'}</span> | 
                            难度：<span className="font-medium">{difficulty === 'easy' ? '简单' : difficulty === 'medium' ? '中等' : '困难'}</span>
                          </p>
                          <p className="text-gray-400 text-sm">点击"随机获取任务"开始挑战</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
          
          {/* 任务弹窗 */}
          {showTaskModal && currentTask && currentTask.type !== 'winner' && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <Card className="max-w-md w-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {currentTask.type === 'truth' ? (
                      <MessageCircle className="h-6 w-6 text-blue-500" />
                    ) : (
                      <Sparkles className="h-6 w-6 text-red-500" />
                    )}
                    {currentTask.type === 'truth' ? '真心话' : '大冒险'}
                  </CardTitle>
                  <CardDescription>
                    玩家 {currentTask.player} 的挑战任务
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <Badge variant="outline" className="mb-2">
                      {currentTask.difficulty === 'easy' ? '简单' : currentTask.difficulty === 'medium' ? '中等' : '困难'} 
                      - {currentTask.difficulty === 'easy' ? '1分' : currentTask.difficulty === 'medium' ? '2分' : '3分'}
                    </Badge>
                  </div>
                  <p className="text-gray-700 mb-6 text-center">{currentTask.content}</p>
                  <div className="flex gap-2">
                    <Button onClick={completeTask} className="flex-1">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      完成任务
                    </Button>
                    <Button onClick={skipTask} variant="outline" className="flex-1">
                      <SkipForward className="h-4 w-4 mr-2" />
                      跳过任务
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          
          {/* 获胜弹窗 */}
          {showTaskModal && currentTask && currentTask.type === 'winner' && (
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
                    <div className={`w-16 h-16 rounded-full mx-auto mb-4 bg-yellow-100 flex items-center justify-center`}>
                      <Trophy className="h-8 w-8 text-yellow-500" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{currentTask.content}</h3>
                    <p className="text-gray-600 mb-4">游戏用时：{formatTime(gameTime)}</p>
                    <p className="text-gray-600 mb-4">完成任务数：{completedTasks.length}</p>
                  </div>
                  <div className="flex gap-2 justify-center">
                    <Button onClick={resetGame} variant="outline">
                      再来一局
                    </Button>
                    <Button onClick={() => setShowTaskModal(false)}>
                      查看结果
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