'use client'

import { useState, useEffect, useCallback } from 'react'
import Navigation from '../../../../components/navigation'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Play, 
  RotateCcw, 
  Heart, 
  Share2, 
  Star, 
  Clock, 
  Target, 
  Users,
  CheckCircle,
  Brain,
  Sparkles,
  Trophy,
  ArrowLeft
} from 'lucide-react'
import Link from 'next/link'

// 默契测试问题类型
interface TacitQuestion {
  id: number
  question: string
  options: string[]
  category: '日常习惯' | '情感偏好' | '未来规划' | '价值观'
  difficulty: '简单' | '中等' | '困难'
}

// 测试结果类型
interface TestResult {
  score: number
  matchingRate: number
  categoryScores: Record<string, number>
  strengths: string[]
  suggestions: string[]
  personalityMatch: string
}

// 默契测试问题库
const tacitQuestions: TacitQuestion[] = [
  {
    id: 1,
    question: "对方最喜欢吃什么水果？",
    options: ["苹果", "香蕉", "橙子", "草莓", "葡萄"],
    category: '日常习惯',
    difficulty: '简单'
  },
  {
    id: 2,
    question: "对方理想的周末是什么样的？",
    options: ["在家休息", "外出旅游", "朋友聚会", "运动健身", "学习充电"],
    category: '日常习惯',
    difficulty: '简单'
  },
  {
    id: 3,
    question: "对方在生气时会有什么表现？",
    options: ["沉默不语", "大声说话", "独自冷静", "找人倾诉", "立即沟通"],
    category: '情感偏好',
    difficulty: '中等'
  },
  {
    id: 4,
    question: "对方最看重伴侣的什么品质？",
    options: ["诚实可靠", "幽默风趣", "体贴入微", "上进心强", "善解人意"],
    category: '价值观',
    difficulty: '中等'
  },
  {
    id: 5,
    question: "对方对未来五年有什么规划？",
    options: ["事业晋升", "组建家庭", "旅行探索", "学习深造", "投资理财"],
    category: '未来规划',
    difficulty: '困难'
  },
  {
    id: 6,
    question: "对方最不能忍受的行为是什么？",
    options: ["欺骗背叛", "不守承诺", "自私自利", "邋遢懒惰", "控制欲强"],
    category: '价值观',
    difficulty: '困难'
  },
  {
    id: 7,
    question: "对方最喜欢的电影类型是什么？",
    options: ["爱情片", "动作片", "喜剧片", "科幻片", "悬疑片"],
    category: '日常习惯',
    difficulty: '简单'
  },
  {
    id: 8,
    question: "对方在压力大时最需要什么？",
    options: ["独处空间", "陪伴支持", "鼓励安慰", "实际帮助", "幽默缓解"],
    category: '情感偏好',
    difficulty: '中等'
  }
]

// 默契度评估逻辑
const evaluateMatching = (player1Answers: string[], player2Answers: string[]): TestResult => {
  let totalScore = 0
  const categoryScores: Record<string, { correct: number, total: number }> = {}
  
  // 计算匹配分数
  player1Answers.forEach((answer, index) => {
    if (answer === player2Answers[index]) {
      totalScore += 10
      const category = tacitQuestions[index].category
      if (!categoryScores[category]) {
        categoryScores[category] = { correct: 0, total: 0 }
      }
      categoryScores[category].correct += 1
    }
    
    if (categoryScores[tacitQuestions[index].category]) {
      categoryScores[tacitQuestions[index].category].total += 1
    } else {
      categoryScores[tacitQuestions[index].category] = { correct: 0, total: 1 }
    }
  })
  
  const matchingRate = Math.round((totalScore / (tacitQuestions.length * 10)) * 100)
  
  // 生成评估结果
  const strengths: string[] = []
  const suggestions: string[] = []
  
  Object.entries(categoryScores).forEach(([category, scores]) => {
    const categoryRate = Math.round((scores.correct / scores.total) * 100)
    if (categoryRate >= 80) {
      strengths.push(`${category}默契度极高`)
    } else if (categoryRate <= 50) {
      suggestions.push(`建议加强${category}方面的沟通`)
    }
  })
  
  let personalityMatch = "需要更多了解"
  if (matchingRate >= 90) personalityMatch = "天作之合"
  else if (matchingRate >= 80) personalityMatch = "高度契合"
  else if (matchingRate >= 70) personalityMatch = "比较默契"
  else if (matchingRate >= 60) personalityMatch = "基本了解"
  
  return {
    score: totalScore,
    matchingRate,
    categoryScores: Object.fromEntries(
      Object.entries(categoryScores).map(([k, v]) => [k, Math.round((v.correct / v.total) * 100)])
    ),
    strengths,
    suggestions,
    personalityMatch
  }
}

export default function TacitChallengePage() {
  const [gameStarted, setGameStarted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [player1Answers, setPlayer1Answers] = useState<string[]>([])
  const [player2Answers, setPlayer2Answers] = useState<string[]>([])
  const [currentPlayer, setCurrentPlayer] = useState<'player1' | 'player2'>('player1')
  const [time, setTime] = useState(0)
  const [timerActive, setTimerActive] = useState(false)
  const [testCompleted, setTestCompleted] = useState(false)
  const [testResult, setTestResult] = useState<TestResult | null>(null)

  // 初始化测试
  const initializeTest = useCallback(() => {
    setPlayer1Answers([])
    setPlayer2Answers([])
    setCurrentQuestion(0)
    setCurrentPlayer('player1')
    setTime(0)
    setTestCompleted(false)
    setTestResult(null)
    setTimerActive(true)
  }, [])

  // 处理答案选择
  const handleAnswerSelect = (answer: string) => {
    if (currentPlayer === 'player1') {
      setPlayer1Answers(prev => [...prev, answer])
    } else {
      setPlayer2Answers(prev => [...prev, answer])
    }
    
    // 切换到下一个问题或下一个玩家
    if (currentQuestion < tacitQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else if (currentPlayer === 'player1') {
      setCurrentPlayer('player2')
      setCurrentQuestion(0)
    } else {
      setTestCompleted(true)
      setTimerActive(false)
      
      // 计算测试结果
      setTimeout(() => {
        const result = evaluateMatching(player1Answers, player2Answers)
        setTestResult(result)
      }, 500)
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

  // 开始测试
  const startTest = () => {
    setGameStarted(true)
    initializeTest()
  }

  // 重新开始
  const restartTest = () => {
    initializeTest()
  }

  const progress = gameStarted 
    ? ((player1Answers.length + player2Answers.length) / (tacitQuestions.length * 2)) * 100 
    : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-100">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/games" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 transition-colors mb-6">
            <ArrowLeft className="h-4 w-4" />
            返回游戏中心
          </Link>
          
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
              默契挑战
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              测试你们之间的默契程度，发现彼此的了解和关心，让感情更加深厚
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">

        {/* 游戏控制区 */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <CardTitle>默契测试</CardTitle>
                <CardDescription>
                  两人分别回答相同的问题，看看你们的默契度有多高
                </CardDescription>
              </div>
              
              <div className="flex gap-2">
                {!gameStarted ? (
                  <Button onClick={startTest} className="gap-2">
                    <Play className="h-4 w-4" />
                    开始测试
                  </Button>
                ) : (
                  <Button onClick={restartTest} variant="outline" className="gap-2">
                    <RotateCcw className="h-4 w-4" />
                    重新开始
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            {/* 当前玩家和进度 */}
            {gameStarted && !testCompleted && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">用时</span>
                  </div>
                  <div className="text-xl font-bold">{time}秒</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-gray-600">
                    <Users className="h-4 w-4" />
                    <span className="text-sm">当前玩家</span>
                  </div>
                  <div className="text-xl font-bold">
                    {currentPlayer === 'player1' ? '玩家1' : '玩家2'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-gray-600">
                    <Target className="h-4 w-4" />
                    <span className="text-sm">进度</span>
                  </div>
                  <div className="text-xl font-bold">{Math.round(progress)}%</div>
                </div>
              </div>
            )}
            
            {/* 测试统计（完成时显示） */}
            {testCompleted && testResult && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">用时</span>
                  </div>
                  <div className="text-xl font-bold">{time}秒</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-gray-600">
                    <Star className="h-4 w-4" />
                    <span className="text-sm">分数</span>
                  </div>
                  <div className="text-xl font-bold">{testResult.score}</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-gray-600">
                    <Heart className="h-4 w-4" />
                    <span className="text-sm">默契度</span>
                  </div>
                  <div className="text-xl font-bold">{testResult.matchingRate}%</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-gray-600">
                    <Sparkles className="h-4 w-4" />
                    <span className="text-sm">匹配度</span>
                  </div>
                  <div className="text-xl font-bold">{testResult.personalityMatch}</div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* 测试进度 */}
        {gameStarted && (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">测试进度</span>
              <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        {/* 测试内容区域 */}
        {gameStarted && !testCompleted && (
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">
                    问题 {currentQuestion + 1} / {tacitQuestions.length}
                  </CardTitle>
                  <CardDescription>
                    {currentPlayer === 'player1' ? '玩家1请回答' : '玩家2请回答'}
                  </CardDescription>
                </div>
                <Badge variant="secondary">
                  {tacitQuestions[currentQuestion].category}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent>
              <h3 className="text-lg font-semibold mb-6 text-center">
                {tacitQuestions[currentQuestion].question}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tacitQuestions[currentQuestion].options.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="h-auto py-4 text-left justify-start hover:bg-purple-50 hover:border-purple-300 transition-colors"
                    onClick={() => handleAnswerSelect(option)}
                  >
                    <span className="font-semibold text-purple-600 mr-2">
                      {String.fromCharCode(65 + index)}.
                    </span>
                    {option}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* 测试结果展示 */}
        {testCompleted && testResult && (
          <div className="space-y-6">
            {/* 总体结果 */}
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
              <CardHeader>
                <CardTitle className="text-green-600 flex items-center gap-2">
                  <Trophy className="h-6 w-6" />
                  默契测试结果
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-4xl font-bold text-green-600 mb-2">
                    {testResult.matchingRate}%
                  </div>
                  <div className="text-lg text-gray-700">你们的默契度</div>
                  <div className="text-sm text-gray-600 mt-1">
                    {testResult.personalityMatch}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(testResult.categoryScores).map(([category, score]) => (
                    <div key={category} className="text-center">
                      <div className="text-sm text-gray-600">{category}</div>
                      <div className="text-xl font-bold text-blue-600">{score}%</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 优势分析 */}
            {testResult.strengths.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    你们的优势
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {testResult.strengths.map((strength, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>{strength}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* 改进建议 */}
            {testResult.suggestions.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-blue-600" />
                    改进建议
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {testResult.suggestions.map((suggestion, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <span className="text-blue-500 font-semibold">💡</span>
                        <span>{suggestion}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* 操作按钮 */}
            <div className="flex gap-2 justify-center">
              <Button onClick={restartTest} className="gap-2">
                <RotateCcw className="h-4 w-4" />
                再测一次
              </Button>
              <Button variant="outline" className="gap-2">
                <Share2 className="h-4 w-4" />
                分享结果
              </Button>
            </div>
          </div>
        )}

        {/* 游戏介绍（未开始时显示） */}
        {!gameStarted && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>游戏介绍</CardTitle>
              <CardDescription>
                默契挑战是一款专门为情侣设计的默契度测试游戏，通过问答了解彼此，增进感情
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-4xl mb-2">💕</div>
                  <h3 className="font-semibold">增进了解</h3>
                  <p className="text-sm text-gray-600">通过问题了解对方的想法和喜好</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-2">🧠</div>
                  <h3 className="font-semibold">测试默契</h3>
                  <p className="text-sm text-gray-600">看看你们对彼此的了解程度</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-2">🎯</div>
                  <h3 className="font-semibold">专业分析</h3>
                  <p className="text-sm text-gray-600">获得专业的默契度分析和建议</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        </div>
      </main>
      
      <Footer />
    </div>
  )
}