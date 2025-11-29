'use client'

import { useState, useEffect } from 'react'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  MessageCircle, 
  ArrowLeft, 
  Share2, 
  Trophy, 
  Star,
  CheckCircle,
  XCircle,
  RotateCcw,
  Target,
  Brain
} from 'lucide-react'
import Link from 'next/link'

// 模拟挑战数据
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
  },
  {
    id: 'scene_003',
    category: '友谊',
    difficulty: '简单',
    scenario: '你最好的朋友突然告诉你他要搬家到另一个城市，你感到震惊和难过。',
    question: '你会如何回应这个消息？',
    options: [
      { id: 'a', text: '表达理解和祝福，并计划保持联系', score: 10, explanation: '成熟应对变化，既表达了情感又保持了积极态度' },
      { id: 'b', text: '表示失望并尝试说服他留下', score: 5, explanation: '表达了真实感受，但可能给朋友增加负担' },
      { id: 'c', text: '开玩笑说"太好了，以后有地方免费旅游了"', score: 3, explanation: '幽默可能被视为回避真实感受，缺乏情感深度' },
      { id: 'd', text: '立即生气，指责他不够重视友谊', score: 2, explanation: '愤怒反应反映了自我中心，缺乏对朋友处境的理解' }
    ],
    emotionType: '情感表达'
  }
]

export default function ConversationChallengePage() {
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([])
  const [showShareModal, setShowShareModal] = useState(false)
  const [totalPossibleScore, setTotalPossibleScore] = useState(0)
  const [gameCompleted, setGameCompleted] = useState(false)
  
  const currentChallenge = challenges[currentChallengeIndex]
  
  // 计算总可能的分数
  useEffect(() => {
    const total = challenges.length * 10
    setTotalPossibleScore(total)
  }, [])

  const handleAnswerSelect = (optionId: string) => {
    if (showResult) return
    setSelectedAnswer(optionId)
  }

  const handleSubmitAnswer = () => {
    if (!selectedAnswer) return
    
    const selectedOption = currentChallenge.options.find(opt => opt.id === selectedAnswer)
    if (selectedOption) {
      setScore(prevScore => prevScore + selectedOption.score)
      setCompletedChallenges(prev => [...prev, currentChallenge.id])
      setShowResult(true)
    }
  }

  const handleNextChallenge = () => {
    if (currentChallengeIndex < challenges.length - 1) {
      setCurrentChallengeIndex(prev => prev + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      // 游戏完成
      setGameCompleted(true)
    }
  }

  const handleRestart = () => {
    setCurrentChallengeIndex(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setCompletedChallenges([])
    setGameCompleted(false)
  }

  const getScoreLevel = () => {
    const percentage = (score / totalPossibleScore) * 100
    if (percentage >= 80) return { text: '情商达人', color: 'text-green-600', badge: 'bg-green-100' }
    if (percentage >= 60) return { text: '情商良好', color: 'text-blue-600', badge: 'bg-blue-100' }
    if (percentage >= 40) return { text: '情商一般', color: 'text-yellow-600', badge: 'bg-yellow-100' }
    return { text: '需要提升', color: 'text-red-600', badge: 'bg-red-100' }
  }

  const getEmotionIcon = (type: string) => {
    switch (type) {
      case '共情能力': return <Brain className="h-4 w-4 text-purple-500" />
      case '情感调节': return <Target className="h-4 w-4 text-blue-500" />
      case '情感表达': return <MessageCircle className="h-4 w-4 text-green-500" />
      default: return <Star className="h-4 w-4 text-yellow-500" />
    }
  }

  const scoreLevel = getScoreLevel()

  if (gameCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-pink-50 to-purple-50">
        <Navigation />
        
        <main className="container mx-auto px-4 py-8">
          <div className="mx-auto max-w-4xl">
            <div className="mb-6">
              <Link href="/games">
                <Button variant="outline" className="mb-4">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  返回游戏中心
                </Button>
              </Link>
            </div>
            
            <Card className="text-center py-12">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className={`p-4 rounded-full ${scoreLevel.badge}`}>
                    <Trophy className="h-12 w-12" />
                  </div>
                </div>
                <CardTitle className="text-3xl font-bold mb-2">
                  挑战完成！
                </CardTitle>
                <CardDescription className="text-lg">
                  你的情商评估结果
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className={`text-4xl font-bold mb-2 ${scoreLevel.color}`}>
                    {score}/{totalPossibleScore} 分
                  </div>
                  <Badge className={`${scoreLevel.badge} ${scoreLevel.color} px-4 py-2 text-lg`}>
                    {scoreLevel.text}
                  </Badge>
                </div>
                
                <div className="w-full max-w-md mx-auto">
                  <Progress value={(score / totalPossibleScore) * 100} className="h-3" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{challenges.length}</div>
                    <div className="text-sm text-gray-500">挑战完成</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{Math.round((score / totalPossibleScore) * 100)}%</div>
                    <div className="text-sm text-gray-500">正确率</div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button onClick={handleRestart} variant="outline">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    重新挑战
                  </Button>
                  <Button onClick={() => setShowShareModal(true)}>
                    <Share2 className="h-4 w-4 mr-2" />
                    分享成绩
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        
        <Footer />
        
        {/* 分享模态框 */}
        {showShareModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="max-w-md w-full">
              <CardHeader>
                <CardTitle>分享你的成绩</CardTitle>
                <CardDescription>
                  让朋友们知道你的情商水平
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-4 border rounded-lg bg-gray-50">
                  <div className="text-lg font-bold">
                    我在情景对话挑战中获得了 {score} 分！
                  </div>
                  <div className="text-sm text-gray-500">
                    情商等级：{scoreLevel.text}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    复制文本
                  </Button>
                  <Button className="flex-1">
                    分享到社交媒体
                  </Button>
                </div>
                <Button variant="ghost" onClick={() => setShowShareModal(false)} className="w-full">
                  关闭
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-pink-50 to-purple-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6">
            <Link href="/games">
              <Button variant="outline" className="mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                返回游戏中心
              </Button>
            </Link>
          </div>
          
          {/* 进度指示器 */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">挑战进度</span>
                <span className="text-sm text-gray-500">
                  {currentChallengeIndex + 1} / {challenges.length}
                </span>
              </div>
              <Progress value={((currentChallengeIndex + 1) / challenges.length) * 100} className="mb-4" />
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="flex items-center gap-1">
                  <Star className="h-3 w-3" />
                  当前得分: {score}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Target className="h-3 w-3" />
                  可能得分: {totalPossibleScore}
                </Badge>
              </div>
            </CardContent>
          </Card>
          
          {/* 挑战内容 */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-blue-500" />
                  情景对话挑战
                </CardTitle>
                <div className="flex gap-2">
                  <Badge variant="outline">{currentChallenge.category}</Badge>
                  <Badge variant="outline">{currentChallenge.difficulty}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                <div className="text-sm font-medium text-blue-800 mb-2">情境描述</div>
                <p className="text-gray-700">{currentChallenge.scenario}</p>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400">
                <div className="text-sm font-medium text-purple-800 mb-2 flex items-center gap-2">
                  {getEmotionIcon(currentChallenge.emotionType)}
                  考察能力: {currentChallenge.emotionType}
                </div>
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
                          <Badge variant={option.score >= 8 ? 'default' : option.score >= 5 ? 'secondary' : 'destructive'}>
                            {option.score} 分
                          </Badge>
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
                  <Button 
                    onClick={handleSubmitAnswer}
                    disabled={!selectedAnswer}
                    size="lg"
                    className="px-8"
                  >
                    提交答案
                  </Button>
                ) : (
                  <Button onClick={handleNextChallenge} size="lg" className="px-8">
                    {currentChallengeIndex < challenges.length - 1 ? '下一题' : '查看结果'}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}