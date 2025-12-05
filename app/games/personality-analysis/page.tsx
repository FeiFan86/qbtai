'use client'

import { useState, useEffect } from 'react'
import GlobalNavbar from '@/components/global-navbar'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Brain, 
  ArrowLeft, 
  Share2, 
  Star,
  Users,
  Heart,
  MessageCircle,
  Target,
  CheckCircle
} from 'lucide-react'
import Link from 'next/link'

// 测试题目数据
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
  },
  {
    id: 'q003',
    type: '情感表达',
    question: '你通常如何表达自己的情感？',
    options: [
      { text: '直接且诚实地表达感受', dimension: 'directness', value: 5 },
      { text: '通过行动而非言语表达', dimension: 'action-oriented', value: 4 },
      { text: '用艺术或创作方式表达', dimension: 'creative', value: 3 },
      { text: '只在信任的人面前表达', dimension: 'selective', value: 5 }
    ]
  },
  {
    id: 'q004',
    type: '情感气质',
    question: '当你感到压力时，你通常？',
    options: [
      { text: '寻求朋友的安慰和支持', dimension: 'external', value: 5 },
      { text: '独处反思和自我调节', dimension: 'internal', value: 5 },
      { text: '通过运动或活动释放', dimension: 'physical', value: 4 },
      { text: '专注于理性分析问题', dimension: 'analytical', value: 3 }
    ]
  },
  {
    id: 'q005',
    type: '社交能量',
    question: '一天中精力最充沛的时候，你倾向于？',
    options: [
      { text: '计划社交活动和聚会', dimension: 'social', value: 5 },
      { text: '深入思考个人兴趣和爱好', dimension: 'individual', value: 5 },
      { text: '处理实际工作和任务', dimension: 'task-oriented', value: 3 },
      { text: '与亲密伴侣共度时光', dimension: 'intimate', value: 4 }
    ]
  },
  {
    id: 'q006',
    type: '情感表达',
    question: '在争论中，你通常会？',
    options: [
      { text: '保持冷静，尝试理解对方观点', dimension: 'understanding', value: 5 },
      { text: '明确表达自己的立场和感受', dimension: 'assertive', value: 4 },
      { text: '寻找折中方案和共识', dimension: 'compromise', value: 5 },
      { text: '避免冲突，暂时退让', dimension: 'avoidance', value: 3 }
    ]
  },
  {
    id: 'q007',
    type: '情感气质',
    question: '面对他人的成功，你通常？',
    options: [
      { text: '真诚为他们高兴并庆祝', dimension: 'empathetic', value: 5 },
      { text: '反思自己的目标和成就', dimension: 'self-focused', value: 3 },
      { text: '寻求学习他们的成功经验', dimension: 'learning', value: 4 },
      { text: '感到轻微的嫉妒或竞争', dimension: 'competitive', value: 2 }
    ]
  },
  {
    id: 'q008',
    type: '社交能量',
    question: '你的理想周末通常是？',
    options: [
      { text: '参加各种社交活动', dimension: 'social-intensive', value: 5 },
      { text: '与几位好友深度交流', dimension: 'intimate-social', value: 4 },
      { text: '独处充电和个人时间', dimension: 'solitude', value: 5 },
      { text: '平衡社交和独处时间', dimension: 'balanced', value: 4 }
    ]
  },
  {
    id: 'q009',
    type: '情感表达',
    question: '当你收到意外的礼物时，你的第一反应是？',
    options: [
      { text: '立即表达感谢和喜悦', dimension: 'expressive', value: 5 },
      { text: '思考礼物的意义和用心', dimension: 'reflective', value: 4 },
      { text: '感到不好意思或不知所措', dimension: 'reserved', value: 3 },
      { text: '考虑如何回礼或回报', dimension: 'reciprocal', value: 4 }
    ]
  },
  {
    id: 'q010',
    type: '情感气质',
    question: '面对重要决定时，你更依赖？',
    options: [
      { text: '内心的直觉和感觉', dimension: 'intuitive', value: 5 },
      { text: '逻辑分析和事实依据', dimension: 'logical', value: 5 },
      { text: '他人的建议和意见', dimension: 'collaborative', value: 3 },
      { text: '过去的经验和教训', dimension: 'experiential', value: 4 }
    ]
  },
  {
    id: 'q011',
    type: '社交能量',
    question: '在团队合作中，你通常扮演什么角色？',
    options: [
      { text: '协调者和组织者', dimension: 'coordinator', value: 5 },
      { text: '创意提供者和灵感来源', dimension: 'creative', value: 4 },
      { text: '执行者和实干家', dimension: 'executor', value: 4 },
      { text: '观察者和支持者', dimension: 'supporter', value: 3 }
    ]
  },
  {
    id: 'q012',
    type: '情感表达',
    question: '当你感到快乐时，你倾向于？',
    options: [
      { text: '立即与朋友分享喜悦', dimension: 'sharing', value: 5 },
      { text: '独自享受这份美好', dimension: 'savoring', value: 4 },
      { text: '通过创作表达情感', dimension: 'creative-expression', value: 3 },
      { text: '将快乐转化为行动力', dimension: 'action-oriented', value: 4 }
    ]
  },
  {
    id: 'q013',
    type: '情感气质',
    question: '面对陌生环境，你的第一反应是？',
    options: [
      { text: '主动探索和适应', dimension: 'adaptive', value: 5 },
      { text: '观察和熟悉环境', dimension: 'observant', value: 4 },
      { text: '感到紧张和不安', dimension: 'anxious', value: 2 },
      { text: '寻找熟悉的人或事物', dimension: 'security-seeking', value: 3 }
    ]
  },
  {
    id: 'q014',
    type: '社交能量',
    question: '你如何维持长期友谊？',
    options: [
      { text: '定期联系和见面', dimension: 'consistent', value: 5 },
      { text: '深度交流和心灵沟通', dimension: 'deep', value: 4 },
      { text: '通过共同兴趣和活动', dimension: 'shared-interests', value: 4 },
      { text: '在需要时互相支持', dimension: 'supportive', value: 3 }
    ]
  },
  {
    id: 'q015',
    type: '情感表达',
    question: '当你感到被误解时，你会？',
    options: [
      { text: '立即澄清和解释', dimension: 'clarifying', value: 5 },
      { text: '感到受伤但选择沉默', dimension: 'withdrawn', value: 3 },
      { text: '通过行动证明自己', dimension: 'proving', value: 4 },
      { text: '寻求第三方帮助沟通', dimension: 'mediating', value: 4 }
    ]
  }
]

// 性格类型定义
const personalityTypes = [
  {
    name: '共情型情感者',
    description: '你天生具有强烈的共情能力，能够敏锐感知他人情绪，善于提供情感支持。你是朋友心中的"情感港湾"。',
    strengths: ['高度共情能力', '优秀的倾听者', '情感支持专家', '直觉敏锐'],
    weaknesses: ['容易受他人情绪影响', '难以下定界限', '过度自我牺牲'],
    socialStyle: '温暖亲和型',
    compatibility: ['理性型', '稳定型'],
    color: '#8B5CF6',
    icon: <Heart className="h-8 w-8" />,
    emoji: '💜'
  },
  {
    name: '理性分析者',
    description: '你善于逻辑思考，遇到情感问题会先分析原因，寻找解决方案。你是团队中的"问题解决者"。',
    strengths: ['逻辑清晰', '冷静理性', '善于解决复杂问题', '不易情绪化'],
    weaknesses: ['情感表达不足', '可能显得冷漠', '难理解情感细微差别'],
    socialStyle: '实用效率型',
    compatibility: ['共情型', '创意型'],
    color: '#3B82F6',
    icon: <Target className="h-8 w-8" />,
    emoji: '💙'
  },
  {
    name: '社交能量型',
    description: '你从社交中获取能量，善于在人群中建立联系。你是聚会中的"焦点人物"和"连接者"。',
    strengths: ['社交能力强', '人脉广泛', '善于活跃气氛', '适应性强'],
    weaknesses: ['容易感到孤独', '可能依赖他人', '难以独处'],
    socialStyle: '活泼外向型',
    compatibility: ['内向型', '稳定型'],
    color: '#EC4899',
    icon: <Users className="h-8 w-8" />,
    emoji: '💗'
  },
  {
    name: '内省深沉型',
    description: '你从独处中获取能量，有着丰富的内心世界和深度思考。你是朋友心中的"智慧顾问"。',
    strengths: ['深度思考', '自我认知清晰', '专注力强', '不易受干扰'],
    weaknesses: ['社交可能费力', '表达有限', '可能被误解'],
    socialStyle: '深度思考型',
    compatibility: ['外向型', '共情型'],
    color: '#06B6D4',
    icon: <Brain className="h-8 w-8" />,
    emoji: '💚'
  }
]

export default function PersonalityAnalysisPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<{ [key: string]: { dimension: string, value: number } }>({})
  const [showResult, setShowResult] = useState(false)
  const [personalityType, setPersonalityType] = useState<typeof personalityTypes[0]>()
  const [showShareModal, setShowShareModal] = useState(false)
  const [testStarted, setTestStarted] = useState(false)

  const currentQuestion = testQuestions[currentQuestionIndex]
  
  const handleAnswerSelect = (option: { dimension: string, value: number }) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: option
    }))
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < testQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    } else {
      // 计算结果
      calculateResult()
    }
  }

  const calculateResult = () => {
    // 简化的计算逻辑，实际可以根据更多维度进行复杂计算
    const dimensionScores: { [key: string]: number } = {}
    
    Object.values(answers).forEach(answer => {
      dimensionScores[answer.dimension] = (dimensionScores[answer.dimension] || 0) + answer.value
    })
    
    // 根据得分确定主要性格类型
    let maxScore = 0
    let dominantType = 0
    
    // 这里简化逻辑，实际可以用更复杂的算法
    Object.values(dimensionScores).forEach((score, index) => {
      if (score > maxScore) {
        maxScore = score
        dominantType = index % personalityTypes.length
      }
    })
    
    setPersonalityType(personalityTypes[dominantType])
    setShowResult(true)
  }

  const handleStartTest = () => {
    setTestStarted(true)
  }

  const handleRestart = () => {
    setCurrentQuestionIndex(0)
    setAnswers({})
    setShowResult(false)
    setPersonalityType(undefined)
    setTestStarted(false)
  }

  const getProgress = () => {
    if (showResult) return 100
    return testStarted ? ((Object.keys(answers).length / testQuestions.length) * 100) : 0
  }

  if (!testStarted) {
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
                  <div className="p-4 rounded-full bg-purple-100">
                    <Brain className="h-12 w-12 text-purple-500" />
                  </div>
                </div>
                <CardTitle className="text-3xl font-bold mb-4">
                  情感性格分析
                </CardTitle>
                <CardDescription className="text-lg max-w-2xl mx-auto">
                  通过一系列精心设计的问题，探索你的情感气质类型和社交风格
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                  <div className="text-center">
                    <div className="text-3xl mb-2">💜</div>
                    <h3 className="font-semibold mb-1">情感气质分析</h3>
                    <p className="text-sm text-gray-600">了解你处理情感的方式</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl mb-2">💙</div>
                    <h3 className="font-semibold mb-1">社交能量画像</h3>
                    <p className="text-sm text-gray-600">识别你的社交能量类型</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl mb-2">💚</div>
                    <h3 className="font-semibold mb-1">情感表达偏好</h3>
                    <p className="text-sm text-gray-600">发现你表达情感的特点</p>
                  </div>
                </div>
                
                <div className="bg-purple-50 p-6 rounded-lg max-w-lg mx-auto">
                  <h4 className="font-semibold mb-2">测试说明</h4>
                  <ul className="text-left space-y-1 text-sm text-gray-700">
                    <li>• 共有8道问题，测试约需3-5分钟</li>
                    <li>• 根据真实感受选择最符合的选项</li>
                    <li>• 没有对错之分，选择最自然的反应</li>
                    <li>• 结果基于情商理论和心理学研究</li>
                  </ul>
                </div>
                
                <Button onClick={handleStartTest} size="lg" className="px-8">
                  开始测试
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
        
        <Footer />
      </div>
    )
  }

  if (showResult && personalityType) {
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
            
            <Card>
              <CardHeader className="text-center pb-2">
                <div className="flex justify-center mb-4">
                  <div className="p-4 rounded-full" style={{ backgroundColor: `${personalityType.color}20` }}>
                    <div style={{ color: personalityType.color }}>
                      {personalityType.icon}
                    </div>
                  </div>
                </div>
                <CardTitle className="text-3xl font-bold mb-2">
                  {personalityType.emoji} {personalityType.name}
                </CardTitle>
                <CardDescription className="text-lg max-w-2xl mx-auto">
                  {personalityType.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Star className="h-5 w-5 text-yellow-500" />
                      你的优势
                    </h3>
                    <ul className="space-y-2">
                      {personalityType.strengths.map((strength, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span>{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Target className="h-5 w-5 text-orange-500" />
                      成长空间
                    </h3>
                    <ul className="space-y-2">
                      {personalityType.weaknesses.map((weakness, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full border-2 border-orange-400 flex-shrink-0"></div>
                          <span>{weakness}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-1">社交风格</h4>
                      <Badge variant="outline" className="text-sm">
                        <Users className="h-3 w-3 mr-1" />
                        {personalityType.socialStyle}
                      </Badge>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">最搭配类型</h4>
                      <div className="flex gap-2">
                        {personalityType.compatibility.map((type, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {type}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <h3 className="font-semibold mb-3">个性化建议</h3>
                  <p className="text-sm text-gray-600 max-w-lg mx-auto mb-4">
                    基于你的情感气质类型，建议你发挥自身优势，同时关注成长空间。
                    在社交中尝试与互补型的人建立联系，可以获得更丰富的视角和经验。
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button onClick={() => setShowShareModal(true)} variant="outline">
                    <Share2 className="h-4 w-4 mr-2" />
                    分享结果
                  </Button>
                  <Button onClick={handleRestart}>
                    重新测试
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
                <CardTitle>分享你的性格类型</CardTitle>
                <CardDescription>
                  让朋友们了解你的情感气质
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-4 border rounded-lg bg-gray-50">
                  <div className="text-lg font-bold">
                    我的情感性格类型是：{personalityType.emoji} {personalityType.name}！
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    你呢？一起来测试吧！
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
                <span className="text-sm font-medium">测试进度</span>
                <span className="text-sm text-gray-500">
                  {currentQuestionIndex + 1} / {testQuestions.length}
                </span>
              </div>
              <Progress value={getProgress()} className="mb-4" />
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="flex items-center gap-1">
                  <Brain className="h-3 w-3" />
                  {currentQuestion.type}
                </Badge>
                <Badge variant="outline">
                  已回答: {Object.keys(answers).length}
                </Badge>
              </div>
            </CardContent>
          </Card>
          
          {/* 问题内容 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-purple-500" />
                情感性格测试
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400">
                <div className="text-lg font-medium text-purple-800 mb-2">
                  问题 {currentQuestionIndex + 1}
                </div>
                <p className="text-gray-700">{currentQuestion.question}</p>
              </div>
              
              {/* 选项 */}
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <div
                    key={index}
                    onClick={() => handleAnswerSelect(option)}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      answers[currentQuestion.id]?.dimension === option.dimension &&
                      answers[currentQuestion.id]?.value === option.value
                        ? 'border-purple-400 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm ${
                        answers[currentQuestion.id]?.dimension === option.dimension &&
                        answers[currentQuestion.id]?.value === option.value
                          ? 'border-purple-500 bg-purple-500 text-white'
                          : 'border-gray-300'
                      }`}>
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="text-gray-700">{option.text}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-center">
                <Button 
                  onClick={handleNextQuestion}
                  disabled={!answers[currentQuestion.id]}
                  size="lg"
                  className="px-8"
                >
                  {currentQuestionIndex < testQuestions.length - 1 ? '下一题' : '查看结果'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}