'use client'

import React, { useState } from 'react'
import { GameLayout } from '@/components/game/GameLayout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { 
  Users, 
  Play, 
  Star, 
  Heart,
  CheckCircle,
  XCircle,
  TrendingUp,
  BarChart3
} from 'lucide-react'
import { motion } from 'framer-motion'

interface Question {
  id: string
  question: string
  options: string[]
  category: 'values' | 'habits' | 'preferences' | 'relationship'
}

const QUESTIONS: Question[] = [
  {
    id: '1',
    question: '理想的周末活动是？',
    options: ['宅在家里看电影', '户外运动或旅行', '和朋友聚会', '各自做喜欢的事'],
    category: 'habits'
  },
  {
    id: '2', 
    question: '处理矛盾的方式？',
    options: ['立即沟通解决', '冷静后再谈', '避免冲突', '寻求第三方帮助'],
    category: 'relationship'
  },
  {
    id: '3',
    question: '金钱观念更接近？',
    options: ['及时行乐', '精打细算', '理性投资', '随性消费'],
    category: 'values'
  },
  {
    id: '4',
    question: '对未来的规划？',
    options: ['详细计划', '大致方向', '随遇而安', '还没想过'],
    category: 'values'
  },
  {
    id: '5',
    question: '喜欢的约会方式？',
    options: ['浪漫餐厅', '户外活动', '宅家放松', '新奇体验'],
    category: 'preferences'
  }
]

export default function CompatibilityChallengePage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [player1Answers, setPlayer1Answers] = useState<number[]>([])
  const [player2Answers, setPlayer2Answers] = useState<number[]>([])
  const [currentPlayer, setCurrentPlayer] = useState(1)
  const [showResults, setShowResults] = useState(false)

  const currentQ = QUESTIONS[currentQuestion]
  const progress = ((currentQuestion + 1) / QUESTIONS.length) * 100

  const handleAnswer = (answerIndex: number) => {
    if (currentPlayer === 1) {
      setPlayer1Answers(prev => [...prev, answerIndex])
      setCurrentPlayer(2)
    } else {
      setPlayer2Answers(prev => [...prev, answerIndex])
      
      if (currentQuestion < QUESTIONS.length - 1) {
        setCurrentQuestion(prev => prev + 1)
        setCurrentPlayer(1)
      } else {
        setShowResults(true)
      }
    }
  }

  const calculateCompatibility = () => {
    if (player1Answers.length !== player2Answers.length) return 0
    
    let sameAnswers = 0
    player1Answers.forEach((answer, index) => {
      if (answer === player2Answers[index]) {
        sameAnswers++
      }
    })
    
    return Math.round((sameAnswers / player1Answers.length) * 100)
  }

  const getCategoryCompatibility = (category: Question['category']) => {
    const categoryQuestions = QUESTIONS
      .map((q, index) => ({ ...q, index }))
      .filter(q => q.category === category)
    
    let sameAnswers = 0
    categoryQuestions.forEach(q => {
      if (player1Answers[q.index] === player2Answers[q.index]) {
        sameAnswers++
      }
    })
    
    return categoryQuestions.length > 0 ? 
      Math.round((sameAnswers / categoryQuestions.length) * 100) : 0
  }

  const restartGame = () => {
    setCurrentQuestion(0)
    setPlayer1Answers([])
    setPlayer2Answers([])
    setCurrentPlayer(1)
    setShowResults(false)
  }

  const compatibilityScore = calculateCompatibility()
  const getCompatibilityLevel = (score: number) => {
    if (score >= 90) return { level: '灵魂伴侣', color: 'text-green-600', emoji: '💕' }
    if (score >= 70) return { level: '高度契合', color: 'text-blue-600', emoji: '✨' }
    if (score >= 50) return { level: '中等契合', color: 'text-yellow-600', emoji: '👍' }
    return { level: '需要磨合', color: 'text-orange-600', emoji: '🤝' }
  }

  const compatibilityLevel = getCompatibilityLevel(compatibilityScore)

  return (
    <GameLayout
      title="默契挑战"
      description="测试情侣默契度，发现彼此的相似之处"
      showSettings
      showShare
    >
      {!showResults ? (
        <div className="max-w-2xl mx-auto space-y-6">
          {/* 进度和玩家信息 */}
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-4">
                  <div className={`flex items-center space-x-2 ${
                    currentPlayer === 1 ? 'text-pink-600' : 'text-gray-400'
                  }`}>
                    <Users className="h-5 w-5" />
                    <span className="font-medium">玩家1</span>
                    {currentPlayer === 1 && (
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="w-2 h-2 bg-pink-500 rounded-full"
                      />
                    )}
                  </div>
                  
                  <div className={`flex items-center space-x-2 ${
                    currentPlayer === 2 ? 'text-blue-600' : 'text-gray-400'
                  }`}>
                    <Users className="h-5 w-5" />
                    <span className="font-medium">玩家2</span>
                    {currentPlayer === 2 && (
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="w-2 h-2 bg-blue-500 rounded-full"
                      />
                    )}
                  </div>
                </div>
                
                <div className="text-sm text-gray-500">
                  第 {currentQuestion + 1} / {QUESTIONS.length} 题
                </div>
              </div>
              
              <Progress value={progress} className="h-2" />
            </CardContent>
          </Card>

          {/* 问题卡片 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-center">
                <div className="text-sm text-gray-500 mb-2">
                  玩家{currentPlayer}请回答：
                </div>
                <div className="text-xl text-gray-900">
                  {currentQ.question}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {currentQ.options.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  onClick={() => handleAnswer(index)}
                  className="w-full justify-start h-auto py-3 text-left whitespace-normal"
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center">
                      <span className="text-sm font-medium">{String.fromCharCode(65 + index)}</span>
                    </div>
                    <span className="flex-1">{option}</span>
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto space-y-6">
          {/* 总体默契度 */}
          <Card>
            <CardContent className="p-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="mb-6"
              >
                <div className="text-6xl mb-2">{compatibilityLevel.emoji}</div>
                <div className={`text-4xl font-bold ${compatibilityLevel.color} mb-2`}>
                  {compatibilityScore}%
                </div>
                <div className={`text-xl font-medium ${compatibilityLevel.color}`}>
                  {compatibilityLevel.level}
                </div>
              </motion.div>
              
              <p className="text-gray-600 mb-6">
                你们在 {QUESTIONS.length} 个问题中有 {player1Answers.filter((a, i) => a === player2Answers[i]).length} 个相同答案
              </p>
              
              <Button onClick={restartGame} className="bg-gradient-to-r from-purple-500 to-pink-600">
                <Play className="h-4 w-4 mr-2" />
                重新测试
              </Button>
            </CardContent>
          </Card>

          {/* 分类分析 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-blue-500" />
                  <span>分类分析</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {['values', 'habits', 'preferences', 'relationship'].map((category) => {
                  const score = getCategoryCompatibility(category as Question['category'])
                  const config = {
                    values: { label: '价值观', color: 'bg-green-100 text-green-800' },
                    habits: { label: '生活习惯', color: 'bg-blue-100 text-blue-800' },
                    preferences: { label: '兴趣爱好', color: 'bg-yellow-100 text-yellow-800' },
                    relationship: { label: '关系处理', color: 'bg-pink-100 text-pink-800' }
                  }[category]
                  
                  return (
                    <div key={category} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{config.label}</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={score} className="w-20 h-2" />
                        <span className="text-sm font-medium w-8">{score}%</span>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            {/* 建议 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  <span>关系建议</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {compatibilityScore >= 70 ? (
                  <div className="space-y-2 text-green-700">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4" />
                      <span>继续保持良好的沟通</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4" />
                      <span>你们的价值观高度契合</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4" />
                      <span>多创造共同的回忆</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 text-orange-700">
                    <div className="flex items-center space-x-2">
                      <XCircle className="h-4 w-4" />
                      <span>需要加强彼此的了解</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <XCircle className="h-4 w-4" />
                      <span>尝试理解对方的观点</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <XCircle className="h-4 w-4" />
                      <span>多进行深度交流</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* 答案对比 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Heart className="h-5 w-5 text-red-500" />
                <span>答案对比</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {QUESTIONS.map((question, index) => {
                const player1Answer = question.options[player1Answers[index]]
                const player2Answer = question.options[player2Answers[index]]
                const isSame = player1Answers[index] === player2Answers[index]
                
                return (
                  <div key={question.id} className="border rounded-lg p-4">
                    <div className="font-medium mb-2">{question.question}</div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-pink-600 font-medium">玩家1:</div>
                        <div>{player1Answer}</div>
                      </div>
                      <div>
                        <div className="text-blue-600 font-medium">玩家2:</div>
                        <div>{player2Answer}</div>
                      </div>
                    </div>
                    <div className={`text-xs mt-2 ${
                      isSame ? 'text-green-600' : 'text-orange-600'
                    }`}>
                      {isSame ? '✅ 答案一致' : '❌ 答案不同'}
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </div>
      )}
    </GameLayout>
  )
}