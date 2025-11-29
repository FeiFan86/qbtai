'use client'

import { useState, useEffect } from 'react'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  ArrowLeft,
  Gift,
  Heart,
  Users,
  Calendar,
  Star,
  Clock,
  MessageCircle,
  Sparkles,
  Award,
  Camera,
  Music,
  Coffee,
  Book,
  Utensils,
  MapPin,
  Sun,
  Moon,
  CheckCircle
} from 'lucide-react'
import Link from 'next/link'

// 任务类型定义
interface Task {
  id: string
  category: string
  title: string
  description: string
  difficulty: string
  timeNeeded: string
  points: number
  icon: JSX.Element
  completed: boolean
  tips: string
}

// 情侣盲盒任务数据
const coupleTasks = [
  {
    id: 'daily_001',
    category: 'communication',
    title: '三分钟真心对话',
    description: '放下手机，面对面交流三分钟，分享今天最开心的事',
    difficulty: 'easy',
    timeNeeded: '5分钟',
    points: 10,
    icon: <MessageCircle className="h-6 w-6 text-blue-500" />,
    completed: false,
    tips: '尝试使用"我"语句表达感受，避免评判和指责'
  },
  {
    id: 'daily_002',
    category: 'activities',
    title: '共同回忆之旅',
    description: '一起翻看旧照片，回忆第一次见面的情景',
    difficulty: 'medium',
    timeNeeded: '15分钟',
    points: 20,
    icon: <Camera className="h-6 w-6 text-purple-500" />,
    completed: false,
    tips: '分享当时的心情和感受，重温那些美好的瞬间'
  },
  {
    id: 'daily_003',
    category: 'surprise',
    title: '小惊喜计划',
    description: '为对方准备一个小惊喜，不一定要贵重但要用心',
    difficulty: 'medium',
    timeNeeded: '30分钟',
    points: 25,
    icon: <Gift className="h-6 w-6 text-pink-500" />,
    completed: false,
    tips: '可以是一张手写卡片、对方喜爱的小零食或一杯热饮'
  },
  {
    id: 'daily_004',
    category: 'activities',
    title: '音乐时光',
    description: '一起听一首对你们有特殊意义的歌曲',
    difficulty: 'easy',
    timeNeeded: '10分钟',
    points: 15,
    icon: <Music className="h-6 w-6 text-green-500" />,
    completed: false,
    tips: '分享这首歌对你们的意义，一起哼唱或跳舞'
  },
  {
    id: 'daily_005',
    category: 'relaxation',
    title: '咖啡馆约会',
    description: '一起去一家没去过的咖啡馆，享受悠闲时光',
    difficulty: 'medium',
    timeNeeded: '1小时',
    points: 30,
    icon: <Coffee className="h-6 w-6 text-amber-600" />,
    completed: false,
    tips: '尝试新品类，聊聊彼此的梦想和计划'
  },
  {
    id: 'daily_006',
    category: 'learning',
    title: '共同学习新事物',
    description: '一起学习一项新技能，哪怕是简单的菜谱或手工',
    difficulty: 'hard',
    timeNeeded: '1.5小时',
    points: 40,
    icon: <Book className="h-6 w-6 text-indigo-500" />,
    completed: false,
    tips: '保持耐心，互相鼓励，享受学习过程中的互动'
  },
  {
    id: 'daily_007',
    category: 'activities',
    title: '晚餐时光',
    description: '一起准备晚餐，享受烹饪的乐趣',
    difficulty: 'medium',
    timeNeeded: '1小时',
    points: 30,
    icon: <Utensils className="h-6 w-6 text-orange-500" />,
    completed: false,
    tips: '分工合作，一人主厨一人帮厨，边做边聊'
  },
  {
    id: 'daily_008',
    category: 'adventure',
    title: '城市探索',
    description: '一起去一个你们都没去过的附近地方',
    difficulty: 'medium',
    timeNeeded: '2小时',
    points: 35,
    icon: <MapPin className="h-6 w-6 text-teal-500" />,
    completed: false,
    tips: '可以是一条小路、一个公园或一个有趣的街区'
  }
]

// 周度特殊任务
const weeklyTasks = [
  {
    id: 'weekly_001',
    title: '时光胶囊',
    description: '写下对彼此的期望和承诺，封存在一个盒子里，约定一年后打开',
    difficulty: 'hard',
    timeNeeded: '45分钟',
    points: 50,
    icon: <Clock className="h-6 w-6 text-blue-500" />,
    completed: false,
    tips: '真诚表达，不要害怕展现脆弱的一面'
  },
  {
    id: 'weekly_002',
    title: '感恩日记',
    description: '连续七天，每天写下三件感谢对方的事情',
    difficulty: 'medium',
    timeNeeded: '每天10分钟',
    points: 45,
    icon: <Heart className="h-6 w-6 text-red-500" />,
    completed: false,
    tips: '小事也可以，比如"谢谢你今天帮我倒水"'
  }
]

// 月度挑战任务
const monthlyTasks = [
  {
    id: 'monthly_001',
    title: '关系深度对话',
    description: '就一个重要话题进行深度对话，如未来规划、价值观等',
    difficulty: 'hard',
    timeNeeded: '2小时',
    points: 60,
    icon: <Users className="h-6 w-6 text-purple-500" />,
    completed: false,
    tips: '选择轻松的环境，提前思考，保持开放心态'
  }
]

export default function CoupleBlindBoxPage() {
  const [isUnboxing, setIsUnboxing] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [completedTasks, setCompletedTasks] = useState<string[]>([])
  const [userPoints, setUserPoints] = useState(120)
  const [currentStreak, setCurrentStreak] = useState(3)
  const [showCompletionMessage, setShowCompletionMessage] = useState(false)
  const [activeTab, setActiveTab] = useState('daily')

  // 获取难度标签颜色
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'hard': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  // 获取难度文本
  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '简单'
      case 'medium': return '中等'
      case 'hard': return '挑战'
      default: return '未知'
    }
  }

  // 打开盲盒
  const openBlindBox = () => {
    setIsUnboxing(true)
    
    // 模拟开盲盒动画
    setTimeout(() => {
      // 随机选择一个未完成的每日任务
      const availableTasks = coupleTasks.filter(task => !completedTasks.includes(task.id))
      if (availableTasks.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableTasks.length)
        setSelectedTask(availableTasks[randomIndex])
      }
      setIsUnboxing(false)
    }, 2000)
  }

  // 完成任务
  const completeTask = () => {
    if (selectedTask) {
      setCompletedTasks([...completedTasks, selectedTask.id])
      setUserPoints(userPoints + selectedTask.points)
      setShowCompletionMessage(true)
      
      // 3秒后隐藏完成消息
      setTimeout(() => {
        setShowCompletionMessage(false)
        setSelectedTask(null)
      }, 3000)
    }
  }

  // 获取当前任务列表
  const getTaskList = () => {
    switch (activeTab) {
      case 'daily': return coupleTasks
      case 'weekly': return weeklyTasks
      case 'monthly': return monthlyTasks
      default: return coupleTasks
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6">
            <Link href="/games">
              <Button variant="outline" className="mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                返回互动游戏
              </Button>
            </Link>
          </div>
          
          {/* 页面标题 */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              情侣盲盒
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 block md:inline">
                增进感情
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              每日开启情侣互动任务，让感情升温，创造美好回忆
            </p>
          </div>

          {/* 用户状态 */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-yellow-500" />
                你的情侣成就
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{userPoints}</div>
                  <div className="text-sm text-gray-500">积分</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-pink-600">{completedTasks.length}</div>
                  <div className="text-sm text-gray-500">已完成任务</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{currentStreak}</div>
                  <div className="text-sm text-gray-500">连续天数</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {userPoints >= 100 ? '甜蜜' : userPoints >= 50 ? '温馨' : '新手'}
                  </div>
                  <div className="text-sm text-gray-500">情侣等级</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 盲盒区域 */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gift className="h-5 w-5 text-pink-500" />
                今日盲盒
              </CardTitle>
              <CardDescription>
                每天可以开启一个情侣互动任务盲盒，完成即可获得积分奖励
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!selectedTask ? (
                <div className="text-center">
                  {isUnboxing ? (
                    <div className="flex flex-col items-center justify-center py-12">
                      <div className="relative w-32 h-32 mb-4">
                        <div className="absolute inset-0 bg-pink-200 rounded-full animate-pulse"></div>
                        <Gift className="absolute inset-0 m-auto h-16 w-16 text-pink-600 animate-bounce" />
                      </div>
                      <p className="text-lg font-medium text-gray-700">正在开启盲盒...</p>
                      <p className="text-sm text-gray-500 mt-2">期待今日的情侣任务</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12">
                      <div className="relative w-32 h-32 mb-4 cursor-pointer group" onClick={openBlindBox}>
                        <div className="absolute inset-0 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full group-hover:from-pink-300 group-hover:to-purple-300 transition-all duration-300 shadow-lg"></div>
                        <Gift className="absolute inset-0 m-auto h-16 w-16 text-pink-600" />
                        <Sparkles className="absolute -top-2 -right-2 h-6 w-6 text-yellow-500" />
                      </div>
                      <Button onClick={openBlindBox} className="mt-4 px-8 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
                        <Gift className="h-4 w-4 mr-2" />
                        开启今日盲盒
                      </Button>
                      <p className="text-sm text-gray-500 mt-2">每日限开一次，获得情侣互动任务</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-lg">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-white rounded-full shadow-sm">
                        {selectedTask.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-1">{selectedTask.title}</h3>
                        <div className="flex flex-wrap gap-2 mb-2">
                          <Badge className={getDifficultyColor(selectedTask.difficulty)}>
                            {getDifficultyText(selectedTask.difficulty)}
                          </Badge>
                          <Badge variant="outline">
                            <Clock className="h-3 w-3 mr-1" />
                            {selectedTask.timeNeeded}
                          </Badge>
                          <Badge variant="outline">
                            <Star className="h-3 w-3 mr-1" />
                            {selectedTask.points} 积分
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      {selectedTask.description}
                    </p>
                    
                    {selectedTask.tips && (
                      <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
                        <div className="flex items-start gap-2">
                          <Sparkles className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-blue-700">小贴士</p>
                            <p className="text-sm text-blue-600">{selectedTask.tips}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-center">
                    <Button 
                      onClick={completeTask} 
                      className="px-8 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      完成任务
                    </Button>
                  </div>
                </div>
              )}
              
              {showCompletionMessage && (
                <div className="mt-6 bg-green-50 border border-green-200 p-4 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-green-800 font-medium">任务完成！</p>
                      <p className="text-green-600 text-sm">获得 {selectedTask.points} 积分，继续努力吧！</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* 任务历史和浏览 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-500" />
                任务库
              </CardTitle>
              <CardDescription>
                浏览所有可用的情侣互动任务，选择你们喜欢的挑战
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="daily" className="flex items-center gap-2">
                    <Sun className="h-4 w-4" />
                    每日任务
                  </TabsTrigger>
                  <TabsTrigger value="weekly" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    周度任务
                  </TabsTrigger>
                  <TabsTrigger value="monthly" className="flex items-center gap-2">
                    <Moon className="h-4 w-4" />
                    月度任务
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="daily" className="mt-6">
                  <div className="space-y-4">
                    {getTaskList().map((task) => (
                      <div key={task.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-gray-50 rounded-lg">
                            {task.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium mb-1">{task.title}</h3>
                            <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                            <div className="flex flex-wrap gap-2">
                              <Badge className={getDifficultyColor(task.difficulty)}>
                                {getDifficultyText(task.difficulty)}
                              </Badge>
                              <Badge variant="outline">
                                <Clock className="h-3 w-3 mr-1" />
                                {task.timeNeeded}
                              </Badge>
                              <Badge variant="outline">
                                <Star className="h-3 w-3 mr-1" />
                                {task.points} 积分
                              </Badge>
                              {completedTasks.includes(task.id) && (
                                <Badge className="bg-green-100 text-green-800">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  已完成
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="weekly" className="mt-6">
                  <div className="space-y-4">
                    {weeklyTasks.map((task) => (
                      <div key={task.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-gray-50 rounded-lg">
                            {task.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium mb-1">{task.title}</h3>
                            <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                            <div className="flex flex-wrap gap-2">
                              <Badge className={getDifficultyColor(task.difficulty)}>
                                {getDifficultyText(task.difficulty)}
                              </Badge>
                              <Badge variant="outline">
                                <Clock className="h-3 w-3 mr-1" />
                                {task.timeNeeded}
                              </Badge>
                              <Badge variant="outline">
                                <Star className="h-3 w-3 mr-1" />
                                {task.points} 积分
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="monthly" className="mt-6">
                  <div className="space-y-4">
                    {monthlyTasks.map((task) => (
                      <div key={task.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-gray-50 rounded-lg">
                            {task.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium mb-1">{task.title}</h3>
                            <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                            <div className="flex flex-wrap gap-2">
                              <Badge className={getDifficultyColor(task.difficulty)}>
                                {getDifficultyText(task.difficulty)}
                              </Badge>
                              <Badge variant="outline">
                                <Clock className="h-3 w-3 mr-1" />
                                {task.timeNeeded}
                              </Badge>
                              <Badge variant="outline">
                                <Star className="h-3 w-3 mr-1" />
                                {task.points} 积分
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}