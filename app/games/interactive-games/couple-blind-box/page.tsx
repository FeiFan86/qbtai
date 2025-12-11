'use client'

import React, { useState, useEffect } from 'react'
import GlobalNavbar from '@/components/global-navbar'
import { Footer } from '@/components/footer'
import { useAuth } from '@/components/auth-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert } from '@/components/ui/alert'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { Progress } from '@/components/ui/progress'
import { 
  ArrowLeft,
  Gift,
  Heart,
  Star,
  Users,
  Lock,
  Unlock,
  Sparkles,
  Calendar,
  CheckCircle,
  Trophy,
  Target,
  Zap
} from 'lucide-react'
import Link from 'next/link'

interface BlindBox {
  id: string
  title: string
  description: string
  category: 'romantic' | 'adventure' | 'creative' | 'communication'
  difficulty: 'easy' | 'medium' | 'hard'
  tasks: string[]
  reward: string
  isLocked: boolean
  unlockDate?: string // 解锁日期
  completedAt?: Date
  lastOpenedDate?: string // 上次开启日期
}

const categoryColors = {
  romantic: 'bg-pink-100 text-pink-800 border-pink-200',
  adventure: 'bg-blue-100 text-blue-800 border-blue-200',
  creative: 'bg-purple-100 text-purple-800 border-purple-200',
  communication: 'bg-yellow-100 text-yellow-800 border-yellow-200'
}

const categoryLabels = {
  romantic: '浪漫',
  adventure: '冒险',
  creative: '创意',
  communication: '沟通'
}

const difficultyColors = {
  easy: 'bg-green-100 text-green-800 border-green-200',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  hard: 'bg-red-100 text-red-800 border-red-200'
}

const difficultyLabels = {
  easy: '简单',
  medium: '中等',
  hard: '困难'
}

export default function CoupleBlindBoxPage() {
  const { isAuthenticated, user } = useAuth()
  const [blindBoxes, setBlindBoxes] = useState<BlindBox[]>([])
  const [selectedBox, setSelectedBox] = useState<BlindBox | null>(null)
  const [isOpening, setIsOpening] = useState(false)
  const [completedTasks, setCompletedTasks] = useState<string[]>([])
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0)
  const [showReward, setShowReward] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    // 模拟盲盒数据
    const mockBoxes: BlindBox[] = [
      {
        id: '1',
        title: '甜蜜时光',
        description: '一起回忆美好的过去，创造甜蜜的现在',
        category: 'romantic',
        difficulty: 'easy',
        tasks: [
          '分享一个你们第一次相遇的故事',
          '为对方准备一个惊喜',
          '一起看一张老照片并回忆当时的心情',
          '写一封给未来你们的信'
        ],
        reward: '爱情积分 +50，解锁"甜蜜回忆"徽章',
        isLocked: false
      },
      {
        id: '2',
        title: '冒险之旅',
        description: '探索未知的领域，增加彼此的信任',
        category: 'adventure',
        difficulty: 'medium',
        tasks: [
          '计划一次短途旅行',
          '尝试一种新的食物',
          '学习一项对方喜欢的技能',
          '完成一次户外挑战'
        ],
        reward: '冒险积分 +80，解锁"勇敢探索者"徽章',
        isLocked: false
      },
      {
        id: '3',
        title: '创意工坊',
        description: '发挥创造力，共同制作特别的东西',
        category: 'creative',
        difficulty: 'hard',
        tasks: [
          '合作创作一首歌或画',
          '制作一个共同的回忆视频',
          '设计你们的专属情侣标志',
          '创建一个只属于你们的节日传统'
        ],
        reward: '创意积分 +120，解锁"创意大师"徽章',
        isLocked: true
      },
      {
        id: '4',
        title: '心灵对话',
        description: '深入交流，增进灵魂的连接',
        category: 'communication',
        difficulty: 'medium',
        tasks: [
          '分享一个深藏的秘密',
          '讨论5年后的共同目标',
          '询问对方一个从未问过的问题',
          '创建一个只属于你们的暗号'
        ],
        reward: '沟通积分 +80，解锁"心灵知己"徽章',
        isLocked: false
      }
    ]

    setBlindBoxes(mockBoxes)
  }, [])

  const handleOpenBox = (box: BlindBox) => {
    if (!isAuthenticated) {
      alert('请先登录才能开启情侣盲盒')
      return
    }

    if (box.isLocked) {
      alert('这个盲盒需要完成前面的任务才能解锁')
      return
    }

    setSelectedBox(box)
    setCurrentTaskIndex(0)
    setCompletedTasks([])
    setShowReward(false)
  }

  const handleCompleteTask = () => {
    if (!selectedBox) return

    const taskId = selectedBox.tasks[currentTaskIndex]
    setCompletedTasks(prev => [...prev, taskId])
    
    if (currentTaskIndex < selectedBox.tasks.length - 1) {
      setCurrentTaskIndex(prev => prev + 1)
    } else {
      // 所有任务完成
      setIsOpening(true)
      
      setTimeout(() => {
        setIsOpening(false)
        setShowReward(true)
        setSuccessMessage(`恭喜完成"${selectedBox.title}"盲盒！${selectedBox.reward}`)
        
        // 3秒后清除成功消息
        setTimeout(() => setSuccessMessage(''), 5000)
      }, 2000)
    }
  }

  const handleCloseReward = () => {
    setSelectedBox(null)
    setCompletedTasks([])
    setCurrentTaskIndex(0)
    setShowReward(false)
  }

  const progress = selectedBox 
    ? (completedTasks.length / selectedBox.tasks.length) * 100 
    : 0

  if (selectedBox) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100">
        <GlobalNavbar />
        
        <main className="container mx-auto px-4 py-8">
          <div className="mx-auto max-w-4xl">
            {/* 成功提示 */}
            {successMessage && (
              <Alert variant="success" onDismiss={() => setSuccessMessage('')} className="mb-6">
                {successMessage}
              </Alert>
            )}

            {/* 盲盒任务界面 */}
            <Card className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-pink-500 to-rose-500 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-2xl">
                      <Gift className="h-6 w-6" />
                      {selectedBox.title}
                    </CardTitle>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className={categoryColors[selectedBox.category]}>
                        {categoryLabels[selectedBox.category]}
                      </Badge>
                      <Badge className={difficultyColors[selectedBox.difficulty]}>
                        {difficultyLabels[selectedBox.difficulty]}
                      </Badge>
                    </div>
                  </div>
                  <Button variant="ghost" onClick={handleCloseReward} className="text-white hover:bg-white/20">
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                </div>
                <CardDescription className="text-pink-50">
                  {selectedBox.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="p-6">
                {!showReward ? (
                  <div className="space-y-6">
                    {/* 任务进度 */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm font-medium">
                        <span>任务进度</span>
                        <span>{completedTasks.length}/{selectedBox.tasks.length}</span>
                      </div>
                      <Progress value={progress} className="h-3" />
                    </div>
                    
                    {/* 当前任务 */}
                    <div className="bg-pink-50 p-6 rounded-xl border border-pink-200">
                      <h3 className="text-lg font-semibold text-pink-800 mb-2">
                        任务 {currentTaskIndex + 1}: {selectedBox.tasks[currentTaskIndex]}
                      </h3>
                      
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-pink-700">
                          完成这个任务，增进你们的感情
                        </p>
                        <Button 
                          onClick={handleCompleteTask}
                          disabled={isOpening}
                          className="bg-pink-600 hover:bg-pink-700"
                        >
                          {isOpening ? (
                            <>
                              <LoadingSpinner size="sm" className="mr-2" />
                              开启中...
                            </>
                          ) : (
                            <>
                              <CheckCircle className="h-4 w-4 mr-2" />
                              完成任务
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                    
                    {/* 已完成的任务 */}
                    {completedTasks.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-gray-700">已完成的任务</h4>
                        <div className="space-y-1">
                          {completedTasks.map((task, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm text-green-700">
                              <CheckCircle className="h-4 w-4" />
                              {task}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  /* 奖励展示 */
                  <div className="text-center space-y-6">
                    <div className="mx-auto w-24 h-24 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
                      <Trophy className="h-12 w-12 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-800">恭喜完成！</h3>
                    <p className="text-lg text-gray-600 mb-6">
                      你已经完成了"{selectedBox.title}"盲盒的所有任务
                    </p>
                    
                    <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-6 rounded-xl border border-pink-200">
                      <h4 className="text-lg font-semibold text-pink-800 mb-2">获得奖励</h4>
                      <p className="text-pink-700">{selectedBox.reward}</p>
                    </div>
                    
                    <div className="flex gap-4">
                      <Button 
                        onClick={handleCloseReward}
                        className="flex-1"
                      >
                        继续探索
                      </Button>
                      <Link href="/games">
                        <Button variant="outline" className="flex-1">
                          返回游戏
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
        
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50/80 via-rose-50/80 to-red-50/80 relative overflow-hidden">
      {/* 背景装饰元素 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-pink-300/30 to-rose-300/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-red-300/30 to-orange-300/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-gradient-to-r from-pink-300/20 to-purple-300/20 rounded-full blur-3xl animate-pulse delay-300"></div>
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-gradient-to-r from-yellow-300/20 to-amber-300/20 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>
      
      <GlobalNavbar />
      
      <main className="container mx-auto px-4 py-8 relative z-10">
        <div className="mx-auto max-w-6xl">
          {/* 页面标题 */}
          <div className="text-center mb-8">
            <Link href="/games" className="inline-flex items-center gap-2 text-pink-600 hover:text-pink-800 transition-all duration-300 transform hover:scale-105 mb-6 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm hover:shadow-md border border-white/30">
              <ArrowLeft className="h-4 w-4" />
              返回游戏中心
            </Link>
            
            <div className="inline-flex items-center justify-center mb-6 p-6 bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 rounded-full shadow-2xl animate-bounce hover:animate-pulse transition-all duration-300 hover:shadow-3xl">
              <Gift className="h-12 w-12 text-white" />
            </div>
            
            <div className="relative inline-block mb-4">
              <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-rose-600 to-red-600 mb-2 tracking-tight animate-fade-in-up">
                情侣盲盒
              </h1>
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 via-rose-600 to-red-600 rounded-lg blur-lg opacity-30 animate-pulse"></div>
            </div>
            
            <p className="text-lg text-gray-700 max-w-2xl mx-auto bg-white/80 backdrop-blur-md px-8 py-4 rounded-xl shadow-lg border border-white/30">
              💝 每日开启情侣互动主题盲盒，完成甜蜜任务增进感情，解锁专属奖励
            </p>
            
            {/* 特色标签 */}
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              <Badge variant="secondary" className="bg-pink-100 text-pink-800 border-pink-200 shadow-sm">
                <Gift className="h-3 w-3 mr-1" />每日更新
              </Badge>
              <Badge variant="secondary" className="bg-rose-100 text-rose-800 border-rose-200 shadow-sm">
                <Heart className="h-3 w-3 mr-1" />增进感情
              </Badge>
              <Badge variant="secondary" className="bg-red-100 text-red-800 border-red-200 shadow-sm">
                <Trophy className="h-3 w-3 mr-1" />专属奖励
              </Badge>
              <Badge variant="secondary" className="bg-orange-100 text-orange-800 border-orange-200 shadow-sm">
                <Sparkles className="h-3 w-3 mr-1" />惊喜不断
              </Badge>
            </div>
          </div>

          {/* 未登录提示 */}
          {!isAuthenticated && (
            <Card className="mb-8 border-yellow-200">
              <CardContent className="text-center py-6">
                <Lock className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">登录后开启盲盒</h3>
                <p className="text-gray-600 mb-4">
                  登录后可以开启情侣盲盒，完成甜蜜任务增进你们的感情
                </p>
                <Link href="/login">
                  <Button className="bg-pink-600 hover:bg-pink-700">
                    立即登录
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}

          {/* 盲盒列表 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blindBoxes.map((box) => (
              <Card 
                key={box.id} 
                className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white/80 backdrop-blur-sm border border-white/20"
              >
                <CardHeader className="pb-4 bg-gradient-to-r from-pink-500/10 to-rose-500/10 border-b border-pink-200/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-lg shadow-lg transition-all duration-300 hover:scale-110 ${
                        box.isLocked 
                          ? 'bg-gray-200/80' 
                          : 'bg-gradient-to-r from-pink-500 to-rose-500 animate-pulse'
                      }`}>
                        {box.isLocked ? (
                          <Lock className="h-6 w-6 text-gray-500" />
                        ) : (
                          <Unlock className="h-6 w-6 text-white" />
                        )}
                      </div>
                      <div>
                        <CardTitle className="text-xl font-bold text-gray-800">{box.title}</CardTitle>
                        <CardDescription className="text-gray-600">{box.description}</CardDescription>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Badge className={`${categoryColors[box.category]} shadow-sm`}>
                        {categoryLabels[box.category]}
                      </Badge>
                      <Badge className={`${difficultyColors[box.difficulty]} shadow-sm`}>
                        {difficultyLabels[box.difficulty]}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-6">
                  <div className="space-y-5">
                    {/* 任务预览 */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                        <Target className="h-4 w-4 text-pink-500" />
                        包含任务 ({box.tasks.length}个)
                      </h4>
                      <div className="space-y-2 bg-pink-50/50 rounded-lg p-3 border border-pink-200/30">
                        {box.tasks.slice(0, 3).map((task, index) => (
                          <div key={index} className="flex items-center gap-3 text-sm text-gray-700">
                            <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                            <span className="flex-1">{task}</span>
                          </div>
                        ))}
                        {box.tasks.length > 3 && (
                          <div className="text-sm text-pink-600 font-medium text-center">
                            ...还有 {box.tasks.length - 3} 个惊喜任务
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* 奖励预览 */}
                    <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-4 rounded-xl border border-pink-200 shadow-sm">
                      <h4 className="text-sm font-semibold text-pink-800 mb-2 flex items-center gap-2">
                        <Trophy className="h-4 w-4" />
                        完成奖励
                      </h4>
                      <p className="text-sm text-pink-700 font-medium">{box.reward}</p>
                    </div>
                    
                    {/* 开启按钮 */}
                    <Button 
                      onClick={() => handleOpenBox(box)}
                      disabled={box.isLocked || !isAuthenticated}
                      className={`w-full transition-all duration-300 transform hover:scale-105 ${
                        box.isLocked 
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                          : 'bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 shadow-lg hover:shadow-xl'
                      }`}
                    >
                      {box.isLocked ? (
                        <>
                          <Lock className="h-4 w-4 mr-2" />
                          需要解锁
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-4 w-4 mr-2 animate-spin-slow" />
                          ✨ 开启盲盒
                        </>
                      )}
                    </Button>
                    
                    {/* 解锁提示 */}
                    {box.isLocked && (
                      <div className="text-xs text-gray-500 text-center">
                        💡 完成前面的盲盒任务可解锁此盲盒
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}