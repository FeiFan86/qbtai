'use client'

import React, { useState, useEffect } from 'react'
import { GameLayout } from '@/components/game/GameLayout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  MessageCircle, 
  Play, 
  RotateCw, 
  Timer, 
  Users,
  Heart,
  Star,
  ChevronRight,
  CheckCircle
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Question {
  id: string
  type: 'truth' | 'dare'
  content: string
  category: 'romantic' | 'funny' | 'deep' | 'challenging'
  difficulty: 'easy' | 'medium' | 'hard'
}

const QUESTIONS: Question[] = [
  // 真心话问题
  { id: 't1', type: 'truth', content: '你最喜欢我哪一点？', category: 'romantic', difficulty: 'easy' },
  { id: 't2', type: 'truth', content: '我们第一次见面时，你对我的第一印象是什么？', category: 'romantic', difficulty: 'easy' },
  { id: 't3', type: 'truth', content: '你最想和我一起实现的梦想是什么？', category: 'deep', difficulty: 'medium' },
  { id: 't4', type: 'truth', content: '你最近一次因为我而感动是什么时候？', category: 'romantic', difficulty: 'medium' },
  { id: 't5', type: 'truth', content: '如果可以选择，你希望我们如何度过一个完美的周末？', category: 'funny', difficulty: 'easy' },
  
  // 大冒险任务
  { id: 'd1', type: 'dare', content: '给我一个真诚的拥抱，并说出你此刻的感受', category: 'romantic', difficulty: 'easy' },
  { id: 'd2', type: 'dare', content: '模仿一个你喜欢的电影角色向我表白', category: 'funny', difficulty: 'medium' },
  { id: 'd3', type: 'dare', content: '写下三个你希望我改进的地方，并温柔地告诉我', category: 'deep', difficulty: 'hard' },
  { id: 'd4', type: 'dare', content: '用三种不同的方式夸赞我', category: 'romantic', difficulty: 'easy' },
  { id: 'd5', type: 'dare', content: '分享一个你从未告诉过任何人的小秘密', category: 'deep', difficulty: 'hard' }
]

export default function TruthOrDarePage() {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const [gameMode, setGameMode] = useState<'truth' | 'dare' | 'random'>('random')
  const [players, setPlayers] = useState(['玩家1', '玩家2'])
  const [currentPlayer, setCurrentPlayer] = useState(0)
  const [timer, setTimer] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [usedQuestions, setUsedQuestions] = useState<Set<string>>(new Set())
  const [gameHistory, setGameHistory] = useState<Array<{
    question: Question
    player: string
    timestamp: Date
  }>>([])

  const getRandomQuestion = (): Question | null => {
    const availableQuestions = QUESTIONS.filter(q => 
      (gameMode === 'random' || q.type === gameMode) &&
      !usedQuestions.has(q.id)
    )
    
    if (availableQuestions.length === 0) {
      // 如果所有问题都用完了，重置使用记录
      setUsedQuestions(new Set())
      return getRandomQuestion()
    }
    
    const randomIndex = Math.floor(Math.random() * availableQuestions.length)
    return availableQuestions[randomIndex]
  }

  const startNewQuestion = () => {
    const question = getRandomQuestion()
    if (question) {
      setCurrentQuestion(question)
      setUsedQuestions(prev => {
        const newSet = new Set(prev)
        newSet.add(question.id)
        return newSet
      })
      setTimer(30) // 30秒倒计时
      setIsTimerRunning(true)
      
      // 记录游戏历史
      setGameHistory(prev => [{
        question,
        player: players[currentPlayer],
        timestamp: new Date()
      }, ...prev.slice(0, 9)]) // 保留最近10条记录
    }
  }

  const nextPlayer = () => {
    setCurrentPlayer((prev) => (prev + 1) % players.length)
  }

  const skipQuestion = () => {
    setIsTimerRunning(false)
    startNewQuestion()
  }

  const completeQuestion = () => {
    setIsTimerRunning(false)
    nextPlayer()
  }

  // 计时器效果
  useEffect(() => {
    let interval: NodeJS.Timeout
    
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
            setIsTimerRunning(false)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    
    return () => clearInterval(interval)
  }, [isTimerRunning, timer])

  const categoryColors = {
    romantic: 'bg-pink-100 text-pink-800',
    funny: 'bg-yellow-100 text-yellow-800',
    deep: 'bg-blue-100 text-blue-800',
    challenging: 'bg-red-100 text-red-800'
  }

  const difficultyColors = {
    easy: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    hard: 'bg-red-100 text-red-800'
  }

  return (
    <GameLayout
      title="真心话大冒险"
      description="增进了解的互动游戏"
      showSettings
      showShare
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左侧 - 游戏控制 */}
        <div className="lg:col-span-2 space-y-6">
          {/* 游戏模式选择 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageCircle className="h-5 w-5 text-purple-500" />
                <span>游戏设置</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  游戏模式
                </label>
                <div className="flex space-x-2">
                  {[
                    { value: 'random' as const, label: '随机', icon: Star },
                    { value: 'truth' as const, label: '真心话', icon: Heart },
                    { value: 'dare' as const, label: '大冒险', icon: Users }
                  ].map((mode) => (
                    <Button
                      key={mode.value}
                      variant={gameMode === mode.value ? "default" : "outline"}
                      onClick={() => setGameMode(mode.value)}
                      className="flex-1"
                    >
                      <mode.icon className="h-4 w-4 mr-2" />
                      {mode.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* 玩家设置 */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  当前玩家
                </label>
                <div className="flex items-center space-x-4">
                  <span className="text-lg font-semibold text-pink-600">
                    {players[currentPlayer]}
                  </span>
                  <Button variant="outline" size="sm" onClick={nextPlayer}>
                    切换玩家
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 当前问题 */}
          <AnimatePresence mode="wait">
            {currentQuestion ? (
              <motion.div
                key={currentQuestion.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="relative">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="flex items-center space-x-2">
                        {currentQuestion.type === 'truth' ? (
                          <Heart className="h-5 w-5 text-red-500" />
                        ) : (
                          <Users className="h-5 w-5 text-blue-500" />
                        )}
                        <span>
                          {currentQuestion.type === 'truth' ? '真心话' : '大冒险'}
                        </span>
                      </CardTitle>
                      
                      {/* 计时器 */}
                      <div className="flex items-center space-x-2">
                        <Timer className="h-4 w-4 text-gray-500" />
                        <span className={`text-lg font-mono ${
                          timer <= 10 ? 'text-red-500' : 'text-gray-700'
                        }`}>
                          {timer}s
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* 问题内容 */}
                    <div className="text-center py-8">
                      <p className="text-2xl font-medium text-gray-900 leading-relaxed">
                        {currentQuestion.content}
                      </p>
                    </div>

                    {/* 分类和难度标签 */}
                    <div className="flex justify-center space-x-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColors[currentQuestion.category]}`}>
                        {currentQuestion.category === 'romantic' ? '浪漫' :
                         currentQuestion.category === 'funny' ? '趣味' :
                         currentQuestion.category === 'deep' ? '深度' : '挑战'}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${difficultyColors[currentQuestion.difficulty]}`}>
                        {currentQuestion.difficulty === 'easy' ? '简单' :
                         currentQuestion.difficulty === 'medium' ? '中等' : '困难'}
                      </span>
                    </div>

                    {/* 操作按钮 */}
                    <div className="flex space-x-3">
                      <Button
                        variant="outline"
                        onClick={skipQuestion}
                        className="flex-1"
                      >
                        <ChevronRight className="h-4 w-4 mr-2" />
                        跳过
                      </Button>
                      <Button
                        onClick={completeQuestion}
                        className="flex-1 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        完成
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <MessageCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg mb-2">准备开始游戏</p>
                  <p className="text-gray-400 text-sm mb-6">点击开始按钮获取第一个问题</p>
                  <Button
                    onClick={startNewQuestion}
                    className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
                    size="lg"
                  >
                    <Play className="h-5 w-5 mr-2" />
                    开始游戏
                  </Button>
                </CardContent>
              </Card>
            )}
          </AnimatePresence>
        </div>

        {/* 右侧 - 游戏历史 */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900">游戏历史</h3>
          
          {gameHistory.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">还没有游戏记录</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3 max-h-[500px] overflow-y-auto">
              {gameHistory.map((record, index) => (
                <Card key={index} className="relative">
                  <CardContent className="p-3">
                    <div className="flex items-start space-x-2">
                      {record.question.type === 'truth' ? (
                        <Heart className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                      ) : (
                        <Users className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-700 line-clamp-2">
                          {record.question.content}
                        </p>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-xs text-gray-500">{record.player}</span>
                          <span className="text-xs text-gray-400">
                            {record.timestamp.toLocaleTimeString('zh-CN', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </GameLayout>
  )
}