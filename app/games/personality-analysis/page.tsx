'use client'

import React, { useState } from 'react'
import { GameLayout } from '@/components/game/GameLayout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { 
  User, 
  Play, 
  Star, 
  Heart,
  Brain,
  Zap,
  Users,
  BarChart3,
  Target,
  Lightbulb
} from 'lucide-react'
import { motion } from 'framer-motion'

interface Question {
  id: string
  question: string
  dimension: 'extraversion' | 'agreeableness' | 'conscientiousness' | 'neuroticism' | 'openness'
  positive: boolean
}

const QUESTIONS: Question[] = [
  // 外向性 (Extraversion)
  { id: 'e1', question: '在社交场合中，我通常很活跃', dimension: 'extraversion', positive: true },
  { id: 'e2', question: '我喜欢成为关注的焦点', dimension: 'extraversion', positive: true },
  { id: 'e3', question: '我更喜欢独处而不是参加聚会', dimension: 'extraversion', positive: false },
  
  // 宜人性 (Agreeableness)
  { id: 'a1', question: '我经常考虑他人的感受', dimension: 'agreeableness', positive: true },
  { id: 'a2', question: '我倾向于信任他人', dimension: 'agreeableness', positive: true },
  { id: 'a3', question: '我容易与他人发生争执', dimension: 'agreeableness', positive: false },
  
  // 尽责性 (Conscientiousness)
  { id: 'c1', question: '我做事有条理、有计划', dimension: 'conscientiousness', positive: true },
  { id: 'c2', question: '我注重细节，追求完美', dimension: 'conscientiousness', positive: true },
  { id: 'c3', question: '我经常拖延任务', dimension: 'conscientiousness', positive: false },
  
  // 神经质 (Neuroticism)
  { id: 'n1', question: '我容易感到焦虑和紧张', dimension: 'neuroticism', positive: true },
  { id: 'n2', question: '我情绪波动较大', dimension: 'neuroticism', positive: true },
  { id: 'n3', question: '我通常保持冷静和镇定', dimension: 'neuroticism', positive: false },
  
  // 开放性 (Openness)
  { id: 'o1', question: '我喜欢尝试新事物', dimension: 'openness', positive: true },
  { id: 'o2', question: '我有丰富的想象力', dimension: 'openness', positive: true },
  { id: 'o3', question: '我更喜欢熟悉的事物', dimension: 'openness', positive: false }
]

const DIMENSION_CONFIG = {
  extraversion: {
    label: '外向性', 
    description: '社交活跃程度和能量来源',
    icon: Users,
    color: 'bg-orange-100 text-orange-800',
    low: '内向',
    high: '外向'
  },
  agreeableness: {
    label: '宜人性',
    description: '合作性和对他人的关怀',
    icon: Heart,
    color: 'bg-green-100 text-green-800',
    low: '理性',
    high: '亲和'
  },
  conscientiousness: {
    label: '尽责性',
    description: '组织性、可靠性和自律性',
    icon: Target,
    color: 'bg-blue-100 text-blue-800',
    low: '随性',
    high: '严谨'
  },
  neuroticism: {
    label: '情绪稳定性',
    description: '情绪波动和压力应对能力',
    icon: Zap,
    color: 'bg-purple-100 text-purple-800',
    low: '稳定',
    high: '敏感'
  },
  openness: {
    label: '开放性',
    description: '对新体验的接受程度',
    icon: Lightbulb,
    color: 'bg-yellow-100 text-yellow-800',
    low: '传统',
    high: '创新'
  }
} as const

export default function PersonalityAnalysisPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)

  const currentQ = QUESTIONS[currentQuestion]
  const progress = ((currentQuestion + 1) / QUESTIONS.length) * 100

  const handleAnswer = (score: number) => {
    setAnswers(prev => [...prev, score])
    
    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      setShowResults(true)
    }
  }

  const calculateScores = () => {
    const scores = {
      extraversion: 0,
      agreeableness: 0,
      conscientiousness: 0,
      neuroticism: 0,
      openness: 0
    }
    
    QUESTIONS.forEach((question, index) => {
      const answer = answers[index]
      let score = answer
      
      // 如果是反向计分的问题，需要转换
      if (!question.positive) {
        score = 6 - answer // 1->5, 2->4, 3->3, 4->2, 5->1
      }
      
      scores[question.dimension] += score
    })
    
    // 计算平均分（每个维度3个问题，总分15）
    Object.keys(scores).forEach(key => {
      scores[key as keyof typeof scores] = Math.round((scores[key as keyof typeof scores] / 3) * 20) // 转换为百分比
    })
    
    return scores
  }

  const getPersonalityType = (scores: ReturnType<typeof calculateScores>) => {
    const traits = []
    
    if (scores.extraversion >= 60) traits.push('外向型')
    else traits.push('内向型')
    
    if (scores.agreeableness >= 60) traits.push('亲和型')
    else traits.push('理性型')
    
    if (scores.conscientiousness >= 60) traits.push('严谨型')
    else traits.push('随性型')
    
    if (scores.neuroticism >= 60) traits.push('敏感型')
    else traits.push('稳定型')
    
    if (scores.openness >= 60) traits.push('创新型')
    else traits.push('传统型')
    
    return traits.join(' · ')
  }

  const getCompatibilityAdvice = (scores: ReturnType<typeof calculateScores>) => {
    const advice = []
    
    // 外向性差异建议
    if (scores.extraversion >= 70) {
      advice.push('你充满活力，适合带领伴侣体验丰富多彩的生活')
    } else if (scores.extraversion <= 30) {
      advice.push('你享受宁静，需要理解伴侣对社交的需求')
    }
    
    // 宜人性建议
    if (scores.agreeableness >= 70) {
      advice.push('你善解人意，是很好的倾听者和支持者')
    }
    
    // 尽责性建议
    if (scores.conscientiousness >= 70) {
      advice.push('你做事有计划，能为关系带来稳定感')
    }
    
    // 情绪稳定性建议
    if (scores.neuroticism >= 70) {
      advice.push('你情感丰富，需要学会有效管理情绪')
    }
    
    // 开放性建议
    if (scores.openness >= 70) {
      advice.push('你思维开放，能为关系带来新鲜感')
    }
    
    return advice.length > 0 ? advice : [
      '你的性格相对均衡，适应性强',
      '继续保持良好的沟通和相互理解'
    ]
  }

  const restartTest = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setShowResults(false)
  }

  const scores = calculateScores()
  const personalityType = getPersonalityType(scores)
  const advice = getCompatibilityAdvice(scores)

  return (
    <GameLayout
      title="性格分析"
      description="专业的人格测试与分析"
      showSettings
      showShare
    >
      {!showResults ? (
        <div className="max-w-2xl mx-auto space-y-6">
          {/* 进度条 */}
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-purple-500" />
                  <span className="font-medium">性格测试</span>
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
                <div className="text-xl text-gray-900 leading-relaxed">
                  {currentQ.question}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center text-sm text-gray-500 mb-4">
                请选择符合你情况的选项（1-非常不符合，5-非常符合）
              </div>
              
              <div className="grid grid-cols-5 gap-2">
                {[1, 2, 3, 4, 5].map((score) => (
                  <Button
                    key={score}
                    variant="outline"
                    onClick={() => handleAnswer(score)}
                    className="h-16 flex-col space-y-1"
                  >
                    <span className="text-lg font-semibold">{score}</span>
                    <span className="text-xs">
                      {score === 1 ? '非常不符合' : 
                       score === 2 ? '不太符合' :
                       score === 3 ? '一般' :
                       score === 4 ? '比较符合' : '非常符合'}
                    </span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto space-y-6">
          {/* 总体结果 */}
          <Card>
            <CardContent className="p-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="mb-6"
              >
                <User className="h-16 w-16 text-purple-500 mx-auto mb-4" />
                <div className="text-2xl font-bold text-gray-900 mb-2">
                  {personalityType}
                </div>
                <div className="text-gray-600">
                  基于大五人格模型的性格分析结果
                </div>
              </motion.div>
              
              <Button onClick={restartTest} className="bg-gradient-to-r from-purple-500 to-pink-600">
                <Play className="h-4 w-4 mr-2" />
                重新测试
              </Button>
            </CardContent>
          </Card>

          {/* 维度分析 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-blue-500" />
                <span>性格维度分析</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.entries(DIMENSION_CONFIG).map(([dimension, config]) => {
                const score = scores[dimension as keyof typeof scores]
                const IconComponent = config.icon
                
                return (
                  <div key={dimension} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <IconComponent className="h-5 w-5" />
                        <div>
                          <div className="font-medium">{config.label}</div>
                          <div className="text-sm text-gray-500">{config.description}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg">{score}%</div>
                        <div className="text-sm text-gray-500">
                          {score >= 60 ? config.high : config.low}
                        </div>
                      </div>
                    </div>
                    
                    <Progress value={score} className="h-3" />
                  </div>
                )
              })}
            </CardContent>
          </Card>

          {/* 关系建议 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Heart className="h-5 w-5 text-red-500" />
                <span>关系建议</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {advice.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                    <Brain className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-blue-800">{item}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                <div className="text-sm text-purple-800">
                  💡 <strong>小贴士：</strong> 性格没有好坏之分，了解自己和他人的性格特点，
                  能够帮助你们更好地理解和包容彼此，建立更和谐的关系。
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </GameLayout>
  )
}