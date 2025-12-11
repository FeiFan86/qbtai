'use client'

import React, { useState } from 'react'
import { Brain, Target, Share2, RotateCcw } from 'lucide-react'
import UnifiedGameTemplate from '@/components/unified-game-template'

const testQuestions = [
  {
    id: 'q001',
    type: '情感气质',
    question: '当朋友向你倾诉烦恼时，你通常会？',
    options: [
      { text: '立刻设身处地感受他的情绪', dimension: 'empathy', value: 5 },
      { text: '专注分析问题寻找解决方案', dimension: 'rationality', value: 5 },
      { text: '分享类似经历表示理解', dimension: 'experience', value: 3 },
      { text: '提供实际的帮助和支持', dimension: 'action', value: 4 }
    ]
  },
  {
    id: 'q002',
    type: '社交能量',
    question: '在一个大型社交场合中，你更可能？',
    options: [
      { text: '与少数熟悉的朋友深入交谈', dimension: 'introversion', value: 5 },
      { text: '在不同人群中流动，结识新朋友', dimension: 'extroversion', value: 5 },
      { text: '观察和感受整体氛围', dimension: 'observation', value: 3 },
      { text: '寻找安静角落休息一下', dimension: 'recharge', value: 4 }
    ]
  }
]

const personalityTypes = {
  'empathy-rationality': {
    name: '情感理性平衡型',
    description: '既重视情感共鸣，也注重理性分析，善于在情感和理性间找到平衡',
    strengths: ['沟通协调能力强', '决策考虑全面', '人际关系和谐'],
    color: 'from-blue-500 to-cyan-500'
  },
  'extroversion-introversion': {
    name: '内外向平衡型',
    description: '既能享受社交互动，也需要独处时间，适应不同社交环境',
    strengths: ['社交适应性强', '自我调节能力好', '人际关系稳定'],
    color: 'from-green-500 to-emerald-500'
  }
}

export default function PersonalityAnalysisPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: string]: number}>({})
  const [testCompleted, setTestCompleted] = useState(false)
  
  const currentQuestion = testQuestions[currentQuestionIndex]

  const handleAnswerSelect = (dimension: string, value: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [dimension]: (prev[dimension] || 0) + value
    }))
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < testQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    } else {
      setTestCompleted(true)
    }
  }

  const handleRestart = () => {
    setCurrentQuestionIndex(0)
    setSelectedAnswers({})
    setTestCompleted(false)
  }

  const getPersonalityResult = () => {
    const empathyScore = selectedAnswers.empathy || 0
    const rationalityScore = selectedAnswers.rationality || 0
    const extroversionScore = selectedAnswers.extroversion || 0
    const introversionScore = selectedAnswers.introversion || 0
    
    if (empathyScore >= 5 && rationalityScore >= 5) {
      return personalityTypes['empathy-rationality']
    } else if (extroversionScore >= 5 && introversionScore >= 5) {
      return personalityTypes['extroversion-introversion']
    }
    
    return {
      name: '综合平衡型',
      description: '在多个维度上表现出平衡和适应性，能够灵活应对不同情境',
      strengths: ['适应性强', '学习能力强', '成长空间大'],
      color: 'from-purple-500 to-pink-500'
    }
  }

  if (testCompleted) {
    const result = getPersonalityResult()
    
    return (
      <UnifiedGameTemplate
        title="人格分析"
        description="深入了解你的性格特质，发现情感表达模式"
        icon={<Brain className="h-8 w-8 text-white" />}
        feature="games"
      >
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">🎯</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">分析完成！</h2>
            <p className="text-gray-600">你的人格类型分析结果</p>
          </div>
          
          <div className={`bg-gradient-to-r ${result.color} text-white rounded-xl p-6 mb-6 text-center`}>
            <h3 className="text-xl font-bold mb-2">{result.name}</h3>
            <p className="text-white/90">{result.description}</p>
          </div>
          
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-3">优势特点</h4>
            <div className="space-y-2">
              {result.strengths.map((strength, index) => (
                <div key={index} className="flex items-center bg-green-50 p-3 rounded-lg">
                  <Target className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-green-700">{strength}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleRestart}
              className="bg-gray-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-600 transition-colors flex items-center"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              重新测试
            </button>
            <button className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center">
              <Share2 className="h-4 w-4 mr-2" />
              分享结果
            </button>
          </div>
        </div>
      </UnifiedGameTemplate>
    )
  }

  return (
    <UnifiedGameTemplate
      title="人格分析"
      description="深入了解你的性格特质，发现情感表达模式"
      icon={<Brain className="h-8 w-8 text-white" />}
      feature="games"
    >
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        {/* 进度显示 */}
        <div className="flex justify-between items-center mb-6">
          <span className="text-sm text-gray-600">
            第 {currentQuestionIndex + 1} 题 / 共 {testQuestions.length} 题
          </span>
          <span className="text-sm font-medium text-gray-900">
            人格分析测试
          </span>
        </div>

        {/* 问题内容 */}
        <div className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
            <div className="text-sm font-medium text-blue-800 mb-2">
              考察维度：{currentQuestion.type}
            </div>
            <p className="text-gray-700 font-medium">{currentQuestion.question}</p>
          </div>
          
          {/* 选项 */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <div
                key={index}
                onClick={() => handleAnswerSelect(option.dimension, option.value)}
                className="p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-blue-300 hover:bg-blue-50 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center text-sm">
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="text-gray-700">{option.text}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center">
            <button 
              onClick={handleNextQuestion}
              className="bg-blue-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
            >
              {currentQuestionIndex < testQuestions.length - 1 ? '下一题' : '查看结果'}
            </button>
          </div>
        </div>
      </div>
    </UnifiedGameTemplate>
  )
}