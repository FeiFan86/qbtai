'use client'

import React, { useState, useEffect } from 'react'
import { Brain, MessageCircle, CheckCircle, XCircle, RotateCcw, Share2 } from 'lucide-react'
import UnifiedGameTemplate from '@/components/unified-game-template'

const challenges = [
  {
    id: 'scene_001',
    category: '职场',
    difficulty: '中等',
    scenario: '你的同事因工作压力在办公室情绪失控，大声抱怨并影响其他人。你作为旁边的同事，会如何应对这种情况？',
    question: '作为同事，你会如何回应？',
    options: [
      { id: 'a', text: '立刻走过去，轻声询问是否需要帮助', score: 10, explanation: '直接提供支持展现了高情商，能帮助同事缓解情绪' },
      { id: 'b', text: '通过企业通讯软件发消息，表示关心', score: 8, explanation: '间接表达关心既保持了距离又提供了支持' },
      { id: 'c', text: '假装没注意到，避免卷入冲突', score: 3, explanation: '冷漠回避可能错失提供帮助的机会，缺乏同理心' },
      { id: 'd', text: '向主管报告同事的情绪状态', score: 5, explanation: '上报是负责任的做法，但可能加剧同事的压力' }
    ],
    emotionType: '共情能力'
  },
  {
    id: 'scene_002',
    category: '恋爱',
    difficulty: '困难',
    scenario: '你的伴侣最近工作压力大，经常回家后情绪低落，对你冷淡。你感到被忽视，但同时也想表达关心。',
    question: '你会选择哪种方式处理这种情况？',
    options: [
      { id: 'a', text: '直接表达自己的感受："你最近对我很冷淡，我很受伤"', score: 4, explanation: '表达真实感受是必要的，但方式可能过于直接，缺乏时机' },
      { id: 'b', text: '准备他喜欢的晚餐，创造轻松环境后温和询问近况', score: 10, explanation: '创造安全环境后再沟通，既表达了关心又给予空间' },
      { id: 'c', text: '给他一些空间，等他自己好转', score: 6, explanation: '给予空间是尊重的表现，但可能让伴侣感到被忽视' },
      { id: 'd', text: '建议一起去心理咨询，帮助他缓解压力', score: 8, explanation: '专业建议是好方法，但需要谨慎沟通方式，避免让对方感到被指责' }
    ],
    emotionType: '情感调节'
  }
]

export default function ConversationChallengePage() {
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [gameCompleted, setGameCompleted] = useState(false)
  
  const currentChallenge = challenges[currentChallengeIndex]

  const handleAnswerSelect = (optionId: string) => {
    if (showResult) return
    setSelectedAnswer(optionId)
  }

  const handleSubmitAnswer = () => {
    if (!selectedAnswer) return
    
    const selectedOption = currentChallenge.options.find(opt => opt.id === selectedAnswer)
    if (selectedOption) {
      setScore(prevScore => prevScore + selectedOption.score)
      setShowResult(true)
    }
  }

  const handleNextChallenge = () => {
    if (currentChallengeIndex < challenges.length - 1) {
      setCurrentChallengeIndex(prev => prev + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      setGameCompleted(true)
    }
  }

  const handleRestart = () => {
    setCurrentChallengeIndex(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setGameCompleted(false)
  }

  if (gameCompleted) {
    return (
      <UnifiedGameTemplate
        title="对话挑战"
        description="情商训练游戏，通过不同场景测试你的情感智慧和沟通能力"
        icon={<Brain className="h-8 w-8 text-white" />}
        feature="games"
      >
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <div className="mb-6">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">挑战完成！</h2>
            <p className="text-gray-600">你的情商评估结果</p>
          </div>
          
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl p-6 mb-6">
            <div className="text-4xl font-bold mb-2">{score}/{challenges.length * 10} 分</div>
            <div className="text-lg">
              {score >= 16 ? '情商达人' : score >= 12 ? '情商良好' : score >= 8 ? '情商一般' : '需要提升'}
            </div>
          </div>
          
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleRestart}
              className="bg-gray-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-600 transition-colors flex items-center"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              重新挑战
            </button>
            <button className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center">
              <Share2 className="h-4 w-4 mr-2" />
              分享成绩
            </button>
          </div>
        </div>
      </UnifiedGameTemplate>
    )
  }

  return (
    <UnifiedGameTemplate
      title="对话挑战"
      description="情商训练游戏，通过不同场景测试你的情感智慧和沟通能力"
      icon={<Brain className="h-8 w-8 text-white" />}
      feature="games"
    >
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        {/* 进度显示 */}
        <div className="flex justify-between items-center mb-6">
          <span className="text-sm text-gray-600">
            第 {currentChallengeIndex + 1} 题 / 共 {challenges.length} 题
          </span>
          <span className="text-sm font-medium text-gray-900">
            当前得分: {score}
          </span>
        </div>

        {/* 挑战内容 */}
        <div className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
            <div className="text-sm font-medium text-blue-800 mb-2">情境描述</div>
            <p className="text-gray-700">{currentChallenge.scenario}</p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400">
            <div className="text-sm font-medium text-purple-800 mb-2">考察能力: {currentChallenge.emotionType}</div>
            <p className="text-gray-700 font-medium">{currentChallenge.question}</p>
          </div>
          
          {/* 选项 */}
          <div className="space-y-3">
            {currentChallenge.options.map((option) => (
              <div
                key={option.id}
                onClick={() => handleAnswerSelect(option.id)}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedAnswer === option.id
                    ? 'border-blue-400 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                } ${
                  showResult && option.id === selectedAnswer
                    ? option.score >= 8 
                      ? 'border-green-400 bg-green-50' 
                      : option.score >= 5
                        ? 'border-yellow-400 bg-yellow-50'
                        : 'border-red-400 bg-red-50'
                    : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm ${
                      selectedAnswer === option.id
                        ? 'border-blue-500 bg-blue-500 text-white'
                        : 'border-gray-300'
                    } ${
                      showResult && option.id === selectedAnswer
                        ? option.score >= 8 
                          ? 'border-green-500 bg-green-500 text-white' 
                          : option.score >= 5
                            ? 'border-yellow-500 bg-yellow-500 text-white'
                            : 'border-red-500 bg-red-500 text-white'
                        : ''
                    }`}>
                      {option.id.toUpperCase()}
                    </div>
                    <span className="text-gray-700">{option.text}</span>
                  </div>
                  
                  {showResult && option.id === selectedAnswer && (
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-medium ${
                        option.score >= 8 ? 'text-green-600' : option.score >= 5 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {option.score} 分
                      </span>
                      {option.score >= 8 ? <CheckCircle className="h-5 w-5 text-green-500" /> : <XCircle className="h-5 w-5 text-red-500" />}
                    </div>
                  )}
                </div>
                
                {showResult && option.id === selectedAnswer && (
                  <div className="mt-3 p-3 bg-gray-50 rounded text-sm">
                    <span className="font-medium">解析：</span> {option.explanation}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="flex justify-center">
            {!showResult ? (
              <button 
                onClick={handleSubmitAnswer}
                disabled={!selectedAnswer}
                className="bg-blue-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                提交答案
              </button>
            ) : (
              <button onClick={handleNextChallenge} className="bg-green-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-green-600 transition-colors">
                {currentChallengeIndex < challenges.length - 1 ? '下一题' : '查看结果'}
              </button>
            )}
          </div>
        </div>
      </div>
    </UnifiedGameTemplate>
  )
}