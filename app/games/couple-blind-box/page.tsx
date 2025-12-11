'use client'

import { useState, useEffect } from 'react'
import { GameLayout } from '@/components/game/GameLayout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Gift, Star, Trophy, Clock, Share2, RotateCw, Heart, Zap, Users } from 'lucide-react'

interface Task {
  id: string
  title: string
  description: string
  category: 'romantic' | 'funny' | 'challenge' | 'creative' | 'intimate'
  difficulty: 'easy' | 'medium' | 'hard'
  points: number
  timeLimit?: number // 秒
  completed: boolean
  completedAt?: string
}

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlocked: boolean
  unlockedAt?: string
}

interface GameStats {
  totalTasks: number
  completedTasks: number
  totalPoints: number
  currentStreak: number
  bestStreak: number
  favoriteCategory: string
}

export default function CoupleBlindBox() {
  const [currentTask, setCurrentTask] = useState<Task | null>(null)
  const [showTask, setShowTask] = useState(false)
  const [taskHistory, setTaskHistory] = useState<Task[]>([])
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [gameStats, setGameStats] = useState<GameStats>({
    totalTasks: 0,
    completedTasks: 0,
    totalPoints: 0,
    currentStreak: 0,
    bestStreak: 0,
    favoriteCategory: 'romantic'
  })
  const [timeLeft, setTimeLeft] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(false)

  // 初始化任务库
  const taskLibrary: Omit<Task, 'id' | 'completed' | 'completedAt'>[] = [
    // 浪漫类
    {
      title: '深情对视',
      description: '与伴侣对视3分钟，不许笑场',
      category: 'romantic',
      difficulty: 'easy',
      points: 10,
      timeLimit: 180
    },
    {
      title: '回忆初遇',
      description: '各自讲述第一次见面的场景和感受',
      category: 'romantic',
      difficulty: 'easy',
      points: 15
    },
    {
      title: '浪漫晚餐',
      description: '为对方准备一顿浪漫的烛光晚餐',
      category: 'romantic',
      difficulty: 'hard',
      points: 50
    },

    // 趣味类
    {
      title: '模仿挑战',
      description: '模仿对方的习惯动作或口头禅',
      category: 'funny',
      difficulty: 'easy',
      points: 10
    },
    {
      title: '角色互换',
      description: '互换角色生活1小时，体验对方日常',
      category: 'funny',
      difficulty: 'medium',
      points: 30,
      timeLimit: 3600
    },
    {
      title: '搞笑自拍',
      description: '一起拍一组搞怪的自拍照',
      category: 'funny',
      difficulty: 'easy',
      points: 15
    },

    // 挑战类
    {
      title: '信任背摔',
      description: '完成信任背摔练习（确保安全）',
      category: 'challenge',
      difficulty: 'medium',
      points: 25
    },
    {
      title: '默契测试',
      description: '同时说出对方最喜欢的3样东西',
      category: 'challenge',
      difficulty: 'medium',
      points: 20
    },
    {
      title: '24小时不吵架',
      description: '保持24小时和谐相处，不争吵',
      category: 'challenge',
      difficulty: 'hard',
      points: 100,
      timeLimit: 86400
    },

    // 创意类
    {
      title: '情书创作',
      description: '为对方写一封手写情书',
      category: 'creative',
      difficulty: 'medium',
      points: 30
    },
    {
      title: '合作绘画',
      description: '一起完成一幅合作绘画作品',
      category: 'creative',
      difficulty: 'medium',
      points: 35
    },
    {
      title: '定制歌曲',
      description: '为对方改编或创作一首歌曲',
      category: 'creative',
      difficulty: 'hard',
      points: 60
    },

    // 亲密类
    {
      title: '拥抱时刻',
      description: '给予对方一个至少30秒的温暖拥抱',
      category: 'intimate',
      difficulty: 'easy',
      points: 10,
      timeLimit: 30
    },
    {
      title: '感谢清单',
      description: '列出5件感谢对方的事情并分享',
      category: 'intimate',
      difficulty: 'easy',
      points: 15
    },
    {
      title: '未来规划',
      description: '一起讨论并写下未来的共同目标',
      category: 'intimate',
      difficulty: 'medium',
      points: 40
    }
  ]

  // 初始化成就系统
  const initialAchievements: Achievement[] = [
    {
      id: 'first_task',
      title: '初次尝试',
      description: '完成第一个盲盒任务',
      icon: '🎯',
      unlocked: false
    },
    {
      id: 'romantic_master',
      title: '浪漫大师',
      description: '完成10个浪漫类任务',
      icon: '💖',
      unlocked: false
    },
    {
      id: 'funny_bone',
      title: '开心果',
      description: '完成10个趣味类任务',
      icon: '😂',
      unlocked: false
    },
    {
      id: 'challenge_champion',
      title: '挑战冠军',
      description: '完成5个高难度挑战任务',
      icon: '🏆',
      unlocked: false
    },
    {
      id: 'creative_genius',
      title: '创意天才',
      description: '完成8个创意类任务',
      icon: '🎨',
      unlocked: false
    },
    {
      id: 'intimate_connection',
      title: '亲密连接',
      description: '完成所有亲密类任务',
      icon: '💑',
      unlocked: false
    },
    {
      id: 'streak_7',
      title: '持之以恒',
      description: '连续7天完成任务',
      icon: '🔥',
      unlocked: false
    },
    {
      id: 'points_500',
      title: '高分玩家',
      description: '累计获得500积分',
      icon: '⭐',
      unlocked: false
    }
  ]

  useEffect(() => {
    // 加载保存的数据
    const savedData = localStorage.getItem('coupleBlindBoxData')
    if (savedData) {
      const data = JSON.parse(savedData)
      setTaskHistory(data.taskHistory || [])
      setAchievements(data.achievements || initialAchievements)
      setGameStats(data.gameStats || gameStats)
    } else {
      setAchievements(initialAchievements)
    }
  }, [])

  useEffect(() => {
    // 保存数据到本地存储
    const data = {
      taskHistory,
      achievements,
      gameStats
    }
    localStorage.setItem('coupleBlindBoxData', JSON.stringify(data))
  }, [taskHistory, achievements, gameStats])

  useEffect(() => {
    let timer: NodeJS.Timeout
    
    if (isTimerRunning && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
    } else if (timeLeft === 0 && isTimerRunning) {
      setIsTimerRunning(false)
      // 时间到，自动完成任务
      if (currentTask) {
        completeTask(currentTask)
      }
    }

    return () => clearTimeout(timer)
  }, [isTimerRunning, timeLeft, currentTask])

  const openBlindBox = () => {
    // 随机选择一个任务
    const randomTask = taskLibrary[Math.floor(Math.random() * taskLibrary.length)]
    const newTask: Task = {
      ...randomTask,
      id: Date.now().toString(),
      completed: false
    }
    
    setCurrentTask(newTask)
    setShowTask(true)
    
    // 如果有时间限制，启动计时器
    if (newTask.timeLimit) {
      setTimeLeft(newTask.timeLimit)
      setIsTimerRunning(true)
    }
  }

  const completeTask = (task: Task) => {
    const completedTask: Task = {
      ...task,
      completed: true,
      completedAt: new Date().toISOString()
    }

    // 更新任务历史
    setTaskHistory(prev => [completedTask, ...prev])

    // 更新游戏统计
    setGameStats(prev => ({
      ...prev,
      totalTasks: prev.totalTasks + 1,
      completedTasks: prev.completedTasks + 1,
      totalPoints: prev.totalPoints + task.points,
      currentStreak: prev.currentStreak + 1,
      bestStreak: Math.max(prev.bestStreak, prev.currentStreak + 1)
    }))

    // 检查成就解锁
    checkAchievements(completedTask)

    // 重置状态
    setShowTask(false)
    setCurrentTask(null)
    setIsTimerRunning(false)
    setTimeLeft(0)
  }

  const skipTask = () => {
    if (currentTask) {
      // 跳过任务，重置连续天数
      setGameStats(prev => ({
        ...prev,
        currentStreak: 0
      }))
    }
    
    setShowTask(false)
    setCurrentTask(null)
    setIsTimerRunning(false)
    setTimeLeft(0)
  }

  const checkAchievements = (completedTask: Task) => {
    const updatedAchievements = [...achievements]
    
    // 检查初次尝试成就
    if (gameStats.completedTasks === 0) {
      const achievement = updatedAchievements.find(a => a.id === 'first_task')
      if (achievement && !achievement.unlocked) {
        achievement.unlocked = true
        achievement.unlockedAt = new Date().toISOString()
      }
    }

    // 检查分类成就
    const categoryCount = taskHistory.filter(t => 
      t.category === completedTask.category && t.completed
    ).length + 1

    if (categoryCount >= 10) {
      const achievementId = `${completedTask.category}_master`
      const achievement = updatedAchievements.find(a => a.id === achievementId)
      if (achievement && !achievement.unlocked) {
        achievement.unlocked = true
        achievement.unlockedAt = new Date().toISOString()
      }
    }

    // 检查高分成就
    if (gameStats.totalPoints + completedTask.points >= 500) {
      const achievement = updatedAchievements.find(a => a.id === 'points_500')
      if (achievement && !achievement.unlocked) {
        achievement.unlocked = true
        achievement.unlockedAt = new Date().toISOString()
      }
    }

    // 检查连续天数成就
    if (gameStats.currentStreak + 1 >= 7) {
      const achievement = updatedAchievements.find(a => a.id === 'streak_7')
      if (achievement && !achievement.unlocked) {
        achievement.unlocked = true
        achievement.unlockedAt = new Date().toISOString()
      }
    }

    setAchievements(updatedAchievements)
  }

  const shareTask = (task: Task) => {
    const text = `刚刚完成了情侣盲盒任务：${task.title} - ${task.description}`
    if (navigator.share) {
      navigator.share({
        title: '情侣盲盒',
        text: text
      })
    } else {
      navigator.clipboard.writeText(text)
      alert('任务内容已复制到剪贴板！')
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'romantic': return 'bg-pink-100 text-pink-800'
      case 'funny': return 'bg-yellow-100 text-yellow-800'
      case 'challenge': return 'bg-red-100 text-red-800'
      case 'creative': return 'bg-blue-100 text-blue-800'
      case 'intimate': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'hard': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <GameLayout title="情侣盲盒" description="随机抽取惊喜任务，增进感情">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* 游戏统计 */}
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{gameStats.completedTasks}</div>
                <div className="text-sm text-muted-foreground">完成任务</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{gameStats.totalPoints}</div>
                <div className="text-sm text-muted-foreground">总积分</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{gameStats.currentStreak}</div>
                <div className="text-sm text-muted-foreground">连续天数</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{gameStats.bestStreak}</div>
                <div className="text-sm text-muted-foreground">最佳记录</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* 盲盒区域 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gift className="h-5 w-5" />
                开启盲盒
              </CardTitle>
              <CardDescription>点击下方按钮随机抽取一个任务</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-pink-400 to-red-400 rounded-2xl flex items-center justify-center shadow-lg">
                  <Gift className="h-16 w-16 text-white" />
                </div>
                <Button 
                  onClick={openBlindBox} 
                  size="lg" 
                  className="mt-6 w-full"
                  disabled={showTask}
                >
                  <Zap className="h-4 w-4 mr-2" />
                  开启盲盒
                </Button>
              </div>

              {/* 当前任务显示 */}
              {showTask && currentTask && (
                <Card className="border-primary">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{currentTask.title}</h3>
                        <div className="flex gap-2 mt-1">
                          <Badge className={getCategoryColor(currentTask.category)}>
                            {currentTask.category === 'romantic' ? '浪漫' :
                             currentTask.category === 'funny' ? '趣味' :
                             currentTask.category === 'challenge' ? '挑战' :
                             currentTask.category === 'creative' ? '创意' : '亲密'}
                          </Badge>
                          <Badge className={getDifficultyColor(currentTask.difficulty)}>
                            {currentTask.difficulty === 'easy' ? '简单' :
                             currentTask.difficulty === 'medium' ? '中等' : '困难'}
                          </Badge>
                          <Badge variant="secondary">
                            <Star className="h-3 w-3 mr-1" />
                            {currentTask.points}分
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-4">{currentTask.description}</p>
                    
                    {/* 计时器 */}
                    {currentTask.timeLimit && (
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            剩余时间
                          </span>
                          <span>{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
                        </div>
                        <Progress value={(timeLeft / currentTask.timeLimit) * 100} />
                      </div>
                    )}
                    
                    <div className="flex gap-2">
                      <Button 
                        onClick={() => completeTask(currentTask)} 
                        className="flex-1"
                      >
                        <Heart className="h-4 w-4 mr-2" />
                        完成任务
                      </Button>
                      <Button 
                        onClick={skipTask} 
                        variant="outline"
                        className="flex-1"
                      >
                        跳过
                      </Button>
                      <Button 
                        onClick={() => shareTask(currentTask)} 
                        variant="ghost" 
                        size="icon"
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>

          {/* 成就系统 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                成就系统
              </CardTitle>
              <CardDescription>解锁成就，记录你们的成长</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 max-h-96 overflow-y-auto">
              {achievements.map(achievement => (
                <Card 
                  key={achievement.id} 
                  className={achievement.unlocked ? 'border-green-200 bg-green-50' : 'opacity-60'}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <div className="font-medium">{achievement.title}</div>
                        <div className="text-sm text-muted-foreground">{achievement.description}</div>
                      </div>
                      {achievement.unlocked && (
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          已解锁
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* 任务历史 */}
        <Card>
          <CardHeader>
            <CardTitle>任务历史</CardTitle>
            <CardDescription>最近完成的任务记录</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 max-h-64 overflow-y-auto">
            {taskHistory.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                还没有完成任务记录，快去开启盲盒吧！
              </div>
            ) : (
              taskHistory.slice(0, 10).map(task => (
                <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      task.difficulty === 'easy' ? 'bg-green-500' :
                      task.difficulty === 'medium' ? 'bg-yellow-500' : 'bg-red-500'
                    }`} />
                    <div>
                      <div className="font-medium">{task.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(task.completedAt!).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <Badge variant="secondary">+{task.points}</Badge>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </GameLayout>
  )
}