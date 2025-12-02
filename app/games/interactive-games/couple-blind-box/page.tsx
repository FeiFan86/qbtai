'use client'

import { useState, useEffect } from 'react'

// 安全的 localStorage 访问函数
const safeLocalStorage = {
  getItem: (key: string) => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key)
    }
    return null
  },
  setItem: (key: string, value: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, value)
    }
  },
  removeItem: (key: string) => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key)
    }
  }
}
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
  CheckCircle,
  Lock,
  Unlock,
  TrendingUp,
  Zap,
  Crown,
  Diamond,
  Trophy,
  RefreshCw,
  Share2,
  Download,
  History,
  Target,
  Flame
} from 'lucide-react'
import Link from 'next/link'

// 任务类型定义
interface Task {
  id: string
  category: string
  title: string
  description: string
  difficulty: 'easy' | 'medium' | 'hard'
  timeNeeded: string
  points: number
  icon: JSX.Element
  completed: boolean
  tips: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
}

// 用户数据接口
interface UserData {
  dailyFreeOpens: number
  lastOpenDate: string
  points: number
  currentStreak: number
  completedTasks: string[]
  unlockedAchievements: string[]
  totalTasksCompleted: number
  partnerName?: string
  relationshipStartDate?: string
  favoriteTasks: string[] // 收藏的任务
  recentUnlocks: string[] // 最近解锁的任务
  lastBonusResetDate?: string // 上次重置奖励日期
  monthlyBonusUsed: boolean // 是否已使用月度奖励
  dailyRewardClaimed: boolean // 今日奖励是否已领取
}

// 成就系统
const achievements = [
  { id: 'first_task', name: '初次体验', description: '完成第一个任务', icon: <Star className="h-4 w-4" />, points: 10 },
  { id: 'week_streak', name: '一周坚持', description: '连续一周完成任务', icon: <Flame className="h-4 w-4" />, points: 50 },
  { id: 'month_streak', name: '一月坚持', description: '连续一个月完成任务', icon: <Zap className="h-4 w-4" />, points: 200 },
  { id: 'tasks_10', name: '任务达人', description: '完成10个任务', icon: <Award className="h-4 w-4" />, points: 30 },
  { id: 'points_100', name: '积分大户', description: '累计获得100积分', icon: <Crown className="h-4 w-4" />, points: 40 },
  { id: 'all_categories', name: '全能情侣', description: '完成所有类别的任务', icon: <Diamond className="h-4 w-4" />, points: 100 }
]

// 情侣盲盒任务数据
const coupleTasks: Task[] = [
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
    tips: '尝试使用"我"语句表达感受，避免评判和指责',
    rarity: 'common'
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
    tips: '分享当时的心情和感受，重温那些美好的瞬间',
    rarity: 'rare'
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
    tips: '可以是一张手写卡片、对方喜爱的小零食或一杯热饮',
    rarity: 'rare'
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
    tips: '分享这首歌对你们的意义，一起哼唱或跳舞',
    rarity: 'common'
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
    tips: '尝试新品类，聊聊彼此的梦想和计划',
    rarity: 'rare'
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
    tips: '保持耐心，互相鼓励，享受学习过程中的互动',
    rarity: 'epic'
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
    tips: '分工合作，一人主厨一人帮厨，边做边聊',
    rarity: 'rare'
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
    tips: '可以是一条小路、一个公园或一个有趣的街区',
    rarity: 'epic'
  },
  {
    id: 'daily_009',
    category: 'communication',
    title: '深度对话之夜',
    description: '选择一个有深度的话题，进行一次真诚的对话',
    difficulty: 'hard',
    timeNeeded: '45分钟',
    points: 35,
    icon: <Heart className="h-6 w-6 text-red-500" />,
    completed: false,
    tips: '选择安静的环境，保持开放心态，避免打断',
    rarity: 'epic'
  },
  {
    id: 'daily_010',
    category: 'surprise',
    title: '爱的信件',
    description: '手写一封给对方的信，表达内心的感受',
    difficulty: 'easy',
    timeNeeded: '20分钟',
    points: 20,
    icon: <Heart className="h-6 w-6 text-pink-500" />,
    completed: false,
    tips: '不必文采飞扬，真诚最重要',
    rarity: 'rare'
  }
]

// 周度特殊任务
const weeklyTasks: Task[] = [
  {
    id: 'weekly_001',
    category: 'special',
    title: '时光胶囊',
    description: '写下对彼此的期望和承诺，封存在一个盒子里，约定一年后打开',
    difficulty: 'hard',
    timeNeeded: '45分钟',
    points: 50,
    icon: <Clock className="h-6 w-6 text-blue-500" />,
    completed: false,
    tips: '真诚表达，不要害怕展现脆弱的一面',
    rarity: 'legendary'
  },
  {
    id: 'weekly_002',
    category: 'special',
    title: '感恩日记',
    description: '连续七天，每天写下三件感谢对方的事情',
    difficulty: 'medium',
    timeNeeded: '每天10分钟',
    points: 45,
    icon: <Heart className="h-6 w-6 text-red-500" />,
    completed: false,
    tips: '小事也可以，比如"谢谢你今天帮我倒水"',
    rarity: 'epic'
  },
  {
    id: 'weekly_003',
    category: 'special',
    title: '关系体检',
    description: '一起评估你们的关系状态，讨论改善空间',
    difficulty: 'hard',
    timeNeeded: '1小时',
    points: 55,
    icon: <Target className="h-6 w-6 text-purple-500" />,
    completed: false,
    tips: '诚实但温和，关注如何改进而非指责',
    rarity: 'legendary'
  }
]

// 月度挑战任务
const monthlyTasks: Task[] = [
  {
    id: 'monthly_001',
    category: 'special',
    title: '关系深度对话',
    description: '就一个重要话题进行深度对话，如未来规划、价值观等',
    difficulty: 'hard',
    timeNeeded: '2小时',
    points: 60,
    icon: <Users className="h-6 w-6 text-purple-500" />,
    completed: false,
    tips: '选择轻松的环境，提前思考，保持开放心态',
    rarity: 'legendary'
  },
  {
    id: 'monthly_002',
    category: 'special',
    title: '创意纪念日',
    description: '创造一个专属于你们的纪念日和庆祝方式',
    difficulty: 'hard',
    timeNeeded: '2小时',
    points: 65,
    icon: <Sparkles className="h-6 w-6 text-yellow-500" />,
    completed: false,
    tips: '可以是对你们有特殊意义的日子或事件',
    rarity: 'legendary'
  }
]

export default function CoupleBlindBoxPage() {
  const [isUnboxing, setIsUnboxing] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [userData, setUserData] = useState<UserData>({
    dailyFreeOpens: 1,
    lastOpenDate: new Date().toDateString(),
    points: 120,
    currentStreak: 3,
    completedTasks: [],
    unlockedAchievements: [],
    totalTasksCompleted: 0,
    favoriteTasks: [],
    recentUnlocks: [],
    dailyRewardClaimed: false,
    monthlyBonusUsed: false
  })
  const [showCompletionMessage, setShowCompletionMessage] = useState(false)
  const [activeTab, setActiveTab] = useState('daily')
  const [showAchievements, setShowAchievements] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [taskHistory, setTaskHistory] = useState<Array<{taskId: string, completedDate: string, title: string}>>([])

  // 加载用户数据
  useEffect(() => {
    const savedUserData = safeLocalStorage.getItem('coupleBlindBoxUserData')
    const today = new Date().toDateString()
    
    if (savedUserData) {
      try {
        const parsedData = JSON.parse(savedUserData)
        let showResetMessage: string | null = null
        
        // 检查是否是新的一天
        if (parsedData.lastOpenDate !== today) {
          // 新的一天，重置免费开启次数
          const previousDay = parsedData.lastOpenDate
          parsedData.dailyFreeOpens = 1
          parsedData.lastOpenDate = today
          
          // 检查是否连续完成
          const lastCompletedDate = new Date(parsedData.lastCompletedDate || '')
          const todayDate = new Date()
          const diffDays = Math.floor((todayDate.getTime() - lastCompletedDate.getTime()) / (1000 * 60 * 60 * 24))
          
          if (diffDays === 1) {
            parsedData.currentStreak += 1
            
            // 连续完成奖励
            if (parsedData.currentStreak % 7 === 0) {
              parsedData.points += 50 // 每周连续奖励
              showResetMessage = `🎉 恭喜！你已经连续${parsedData.currentStreak}天完成任务！获得50积分奖励！`
            } else if (parsedData.currentStreak % 30 === 0) {
              parsedData.points += 200 // 每月连续奖励
              showResetMessage = `🎉 太棒了！连续${parsedData.currentStreak}天！获得200积分奖励！`
            }
          } else if (diffDays > 1) {
            parsedData.currentStreak = 1
          }
          
          // 显示每日重置消息
          setTimeout(() => {
            if (showResetMessage) {
              alert(showResetMessage)
            } else {
              alert(`🎊 新的一天开始啦！\n\n每日免费开启次数已重置为1次。\n\n昨天${previousDay}你完成了${parsedData.lastCompletedTasksCount || 0}个任务，继续加油！`)
            }
          }, 1000)
        }
        
        setUserData(parsedData)
      } catch (error) {
        console.error('Failed to load user data:', error)
      }
    } else {
      // 首次使用，初始化数据
      const initialData: UserData = {
        dailyFreeOpens: 1,
        lastOpenDate: today,
        points: 120,
        currentStreak: 0,
        completedTasks: [],
        unlockedAchievements: [],
        totalTasksCompleted: 0,
        favoriteTasks: [],
        recentUnlocks: [],
        monthlyBonusUsed: false,
        dailyRewardClaimed: false
      }
      setUserData(initialData)
      safeLocalStorage.setItem('coupleBlindBoxUserData', JSON.stringify(initialData))
    }

    // 加载任务历史
    const savedHistory = safeLocalStorage.getItem('coupleBlindBoxHistory')
    if (savedHistory) {
      try {
        setTaskHistory(JSON.parse(savedHistory))
      } catch (error) {
        console.error('Failed to load task history:', error)
      }
    }
  }, [])

  // 保存用户数据
  const saveUserData = (newUserData: UserData) => {
    setUserData(newUserData)
    safeLocalStorage.setItem('coupleBlindBoxUserData', JSON.stringify(newUserData))
  }

  // 获取难度标签颜色
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800 border-green-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'hard': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
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

  // 获取稀有度颜色
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-100 text-gray-800 border-gray-200'
      case 'rare': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'epic': return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'legendary': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  // 获取稀有度文本
  const getRarityText = (rarity: string) => {
    switch (rarity) {
      case 'common': return '普通'
      case 'rare': return '稀有'
      case 'epic': return '史诗'
      case 'legendary': return '传说'
      default: return '未知'
    }
  }

  // 获取稀有度图标
  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case 'common': return null
      case 'rare': return <Diamond className="h-3 w-3" />
      case 'epic': return <Zap className="h-3 w-3" />
      case 'legendary': return <Crown className="h-3 w-3" />
      default: return null
    }
  }

  // 检查成就解锁
  const checkAchievements = (newUserData: UserData) => {
    const newlyUnlocked = []
    
    // 检查各种成就条件
    if (newUserData.totalTasksCompleted >= 1 && !newUserData.unlockedAchievements.includes('first_task')) {
      newlyUnlocked.push('first_task')
    }
    
    if (newUserData.currentStreak >= 7 && !newUserData.unlockedAchievements.includes('week_streak')) {
      newlyUnlocked.push('week_streak')
    }
    
    if (newUserData.currentStreak >= 30 && !newUserData.unlockedAchievements.includes('month_streak')) {
      newlyUnlocked.push('month_streak')
    }
    
    if (newUserData.totalTasksCompleted >= 10 && !newUserData.unlockedAchievements.includes('tasks_10')) {
      newlyUnlocked.push('tasks_10')
    }
    
    if (newUserData.points >= 100 && !newUserData.unlockedAchievements.includes('points_100')) {
      newlyUnlocked.push('points_100')
    }
    
    // 检查是否完成所有类别的任务
    const completedCategories = new Set()
    newUserData.completedTasks.forEach(taskId => {
      const task = [...coupleTasks, ...weeklyTasks, ...monthlyTasks].find(t => t.id === taskId)
      if (task) {
        completedCategories.add(task.category)
      }
    })
    
    if (completedCategories.size >= 5 && !newUserData.unlockedAchievements.includes('all_categories')) {
      newlyUnlocked.push('all_categories')
    }
    
    if (newlyUnlocked.length > 0) {
      const updatedUserData = {
        ...newUserData,
        unlockedAchievements: [...newUserData.unlockedAchievements, ...newlyUnlocked]
      }
      
      // 计算成就奖励积分
      const achievementPoints = newlyUnlocked.reduce((total, achievementId) => {
        const achievement = achievements.find(a => a.id === achievementId)
        return total + (achievement?.points || 0)
      }, 0)
      
      updatedUserData.points += achievementPoints
      
      return { userData: updatedUserData, newlyUnlocked }
    }
    
    return { userData: newUserData, newlyUnlocked: [] }
  }

  // 打开盲盒
  const openBlindBox = () => {
    // 检查是否有免费开启次数
    if (userData.dailyFreeOpens > 0) {
      setIsUnboxing(true)
      
      // 模拟开盲盒动画
      setTimeout(() => {
        // 根据稀有度权重随机选择一个任务
        const availableTasks = getTaskList().filter(task => !userData.completedTasks.includes(task.id))
        
        if (availableTasks.length > 0) {
          // 稀有度权重：common(40%), rare(35%), epic(20%), legendary(5%)
          // 提高稀有任务的概率，让用户更有成就感
          const random = Math.random()
          let filteredTasks = availableTasks.filter(task => task.rarity === 'common')
          
          if (random > 0.4) {
            filteredTasks = availableTasks.filter(task => task.rarity === 'rare')
          }
          if (random > 0.75) {
            filteredTasks = availableTasks.filter(task => task.rarity === 'epic')
          }
          if (random > 0.95) {
            filteredTasks = availableTasks.filter(task => task.rarity === 'legendary')
          }
          
          if (filteredTasks.length === 0) {
            filteredTasks = availableTasks
          }
          
          const randomIndex = Math.floor(Math.random() * filteredTasks.length)
          const selectedTask = filteredTasks[randomIndex]
          setSelectedTask(selectedTask)
          
          // 显示稀有度提示
          setTimeout(() => {
            if (selectedTask.rarity === 'legendary') {
              alert(`🎉 恭喜！你获得了传说中的任务！\n\n这是极其稀有的任务，完成它将获得丰厚的奖励！`)
            } else if (selectedTask.rarity === 'epic') {
              alert(`✨ 太棒了！你获得了史诗任务！\n\n这是非常难得的任务，好好享受吧！`)
            }
          }, 1000)
        }
        
        setIsUnboxing(false)
        
        // 更新免费开启次数
        const newUserData = {
          ...userData,
          dailyFreeOpens: userData.dailyFreeOpens - 1
        }
        saveUserData(newUserData)
      }, 2000)
    }
  }

  // 使用积分开启盲盒
  const openBlindBoxWithPoints = () => {
    if (userData.points >= 20) {
      setIsUnboxing(true)
      
      setTimeout(() => {
        // 使用积分开启时，稀有度权重提高
        const availableTasks = getTaskList().filter(task => !userData.completedTasks.includes(task.id))
        
        if (availableTasks.length > 0) {
          // 稀有度权重：common(20%), rare(35%), epic(30%), legendary(15%)
          const random = Math.random()
          let filteredTasks = availableTasks.filter(task => task.rarity === 'rare')
          
          if (random > 0.35) {
            filteredTasks = availableTasks.filter(task => task.rarity === 'epic')
          }
          if (random > 0.65) {
            filteredTasks = availableTasks.filter(task => task.rarity === 'legendary')
          }
          if (random <= 0.2) {
            filteredTasks = availableTasks.filter(task => task.rarity === 'common')
          }
          
          if (filteredTasks.length === 0) {
            filteredTasks = availableTasks
          }
          
          const randomIndex = Math.floor(Math.random() * filteredTasks.length)
          setSelectedTask(filteredTasks[randomIndex])
        }
        
        setIsUnboxing(false)
        
        // 扣除积分
        const newUserData = {
          ...userData,
          points: userData.points - 20
        }
        saveUserData(newUserData)
      }, 2000)
    }
  }

  // 收藏任务
  const favoriteTask = () => {
    if (selectedTask && !userData.favoriteTasks.includes(selectedTask.id)) {
      const newFavorites = [...userData.favoriteTasks, selectedTask.id]
      const updatedUserData = {
        ...userData,
        favoriteTasks: newFavorites
      }
      saveUserData(updatedUserData)
      alert(`✨ 已将"${selectedTask.title}"添加到收藏！`)
    } else if (selectedTask && userData.favoriteTasks.includes(selectedTask.id)) {
      const newFavorites = userData.favoriteTasks.filter(id => id !== selectedTask.id)
      const updatedUserData = {
        ...userData,
        favoriteTasks: newFavorites
      }
      saveUserData(updatedUserData)
      alert(`已将"${selectedTask.title}"从收藏中移除`)
    }
  }
  
  // 领取每日登录奖励
  const claimDailyReward = () => {
    if (!userData.dailyRewardClaimed) {
      const rewardPoints = 10 + Math.floor(userData.currentStreak / 7) * 5 // 连续奖励
      const updatedUserData = {
        ...userData,
        points: userData.points + rewardPoints,
        dailyRewardClaimed: true
      }
      saveUserData(updatedUserData)
      alert(`🎁 领取每日登录成功！\n\n获得 ${rewardPoints} 积分\n连续登录${userData.currentStreak}天，额外获得${Math.floor(userData.currentStreak / 7) * 5}积分！`)
    }
  }
  
  // 领取月度奖励
  const claimMonthlyBonus = () => {
    if (!userData.monthlyBonusUsed && userData.currentStreak >= 7) {
      const bonusPoints = 100
      const updatedUserData = {
        ...userData,
        points: userData.points + bonusPoints,
        monthlyBonusUsed: true
      }
      saveUserData(updatedUserData)
      alert(`🏆 领取月度奖励成功！\n\n连续打卡${userData.currentStreak}天，获得${bonusPoints}积分！`)
    }
  }
  
  // 查看收藏任务
  const viewFavoriteTasks = () => {
    const favoriteTasksList = coupleTasks.filter(task => userData.favoriteTasks.includes(task.id))
    if (favoriteTasksList.length === 0) {
      alert('你还没有收藏任何任务！\n\n完成任务时可以点击收藏按钮添加到收藏。')
    } else {
      alert(`你有${favoriteTasksList.length}个收藏的任务：\n\n${favoriteTasksList.map((task, index) => `${index+1}. ${task.title}`).join('\n')}`)
    }
  }

  // 完成任务
  const completeTask = () => {
    if (selectedTask) {
      const today = new Date().toDateString()
      const newCompletedTasks = [...userData.completedTasks, selectedTask.id]
      const newRecentUnlocks = [selectedTask.id, ...userData.recentUnlocks].slice(0, 5) // 保留最近5个
      
      // 统计今天的完成数量
      const todayTasks = taskHistory.filter(entry => 
        new Date(entry.completedDate).toDateString() === today
      )
      
      const newUserData = {
        ...userData,
        completedTasks: newCompletedTasks,
        recentUnlocks: newRecentUnlocks,
        points: userData.points + selectedTask.points,
        totalTasksCompleted: userData.totalTasksCompleted + 1,
        lastCompletedDate: new Date().toISOString(),
        lastCompletedTasksCount: todayTasks.length + 1
      }
      
      // 检查成就
      const { userData: updatedUserData, newlyUnlocked } = checkAchievements(newUserData)
      saveUserData(updatedUserData)
      
      // 添加到任务历史
      const newHistoryEntry = {
        taskId: selectedTask.id,
        completedDate: new Date().toISOString(),
        title: selectedTask.title,
        points: selectedTask.points,
        rarity: selectedTask.rarity
      }
      const updatedHistory = [newHistoryEntry, ...taskHistory].slice(0, 50) // 保留最近50条
      setTaskHistory(updatedHistory)
      safeLocalStorage.setItem('coupleBlindBoxHistory', JSON.stringify(updatedHistory))
      
      setShowCompletionMessage(true)
      
      // 显示成就解锁消息
      if (newlyUnlocked.length > 0) {
        setTimeout(() => {
          alert(`🎉 恭喜解锁新成就: ${newlyUnlocked.map(id => achievements.find(a => a.id === id)?.name).join(', ')}\n\n这些成就将帮助你更好地维护感情关系！`)
        }, 1000)
      }
      
      // 3秒后隐藏完成消息
      setTimeout(() => {
        setShowCompletionMessage(false)
        setSelectedTask(null)
      }, 3000)
      
      // 显示完成奖励信息
      setTimeout(() => {
        alert(`✅ 任务完成！\n\n你获得了：\n• ${selectedTask.points} 积分\n• 新的感情体验\n• 美好回忆\n\n继续努力，解锁更多成就！`)
      }, 500)
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

  // 分享结果
  const shareResult = () => {
    const text = `我们在情侣盲盒完成了${userData.totalTasksCompleted}个任务，当前连续${userData.currentStreak}天！`
    
    if (navigator.share) {
      navigator.share({
        title: '情侣盲盒成就',
        text: text
      })
    } else {
      navigator.clipboard.writeText(text)
      alert('成就已复制到剪贴板！')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6">
            <Link href="/games" className="inline-flex items-center gap-2 text-pink-600 hover:text-pink-800 transition-colors mb-6">
              <ArrowLeft className="h-4 w-4" />
              返回游戏中心
            </Link>
          </div>
          
          {/* 页面标题 */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-4">
              情侣盲盒
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              每日开启情侣互动任务，让感情升温，创造美好回忆
            </p>
          </div>

          {/* 用户状态 */}
          <Card className="mb-8 bg-white/80 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-yellow-500" />
                你的情侣成就
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{userData.points}</div>
                  <div className="text-sm text-gray-500">积分</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-pink-600">{userData.currentStreak}</div>
                  <div className="text-sm text-gray-500">连续天数</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{userData.totalTasksCompleted}</div>
                  <div className="text-sm text-gray-500">完成任务</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{userData.unlockedAchievements.length}</div>
                  <div className="text-sm text-gray-500">成就解锁</div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3 mt-4">
                <Button 
                  onClick={() => setShowAchievements(!showAchievements)}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Trophy className="h-4 w-4" />
                  查看成就
                </Button>
                <Button 
                  onClick={viewFavoriteTasks}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Heart className="h-4 w-4" />
                  查看收藏
                </Button>
                <Button 
                  onClick={claimDailyReward}
                  variant="outline"
                  disabled={userData.dailyRewardClaimed}
                  className="flex items-center gap-2"
                >
                  <Gift className="h-4 w-4" />
                  {userData.dailyRewardClaimed ? '今日奖励已领取' : '领取每日奖励'}
                </Button>
                <Button 
                  onClick={claimMonthlyBonus}
                  variant="outline"
                  disabled={userData.monthlyBonusUsed || userData.currentStreak < 7}
                  className="flex items-center gap-2"
                >
                  <Crown className="h-4 w-4" />
                  {userData.monthlyBonusUsed ? '月度奖励已领取' : userData.currentStreak < 7 ? '需连续7天' : '领取月度奖励'}
                </Button>
                <Button 
                  onClick={() => setShowHistory(!showHistory)}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <History className="h-4 w-4" />
                  任务历史
                </Button>
                <Button 
                  onClick={shareResult}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Share2 className="h-4 w-4" />
                  分享成就
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 成就展示 */}
          {showAchievements && (
            <Card className="mb-8 bg-white/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  成就系统
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {achievements.map(achievement => {
                    const isUnlocked = userData.unlockedAchievements.includes(achievement.id)
                    return (
                      <div 
                        key={achievement.id} 
                        className={`p-4 rounded-lg border ${isUnlocked ? 'bg-yellow-50 border-yellow-200' : 'bg-gray-50 border-gray-200 opacity-60'}`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-full ${isUnlocked ? 'bg-yellow-200 text-yellow-700' : 'bg-gray-200 text-gray-500'}`}>
                            {achievement.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className={`font-medium ${isUnlocked ? 'text-yellow-800' : 'text-gray-600'}`}>
                              {achievement.name}
                            </h3>
                            <p className={`text-sm mt-1 ${isUnlocked ? 'text-yellow-700' : 'text-gray-500'}`}>
                              {achievement.description}
                            </p>
                            <div className="flex items-center gap-1 mt-2">
                              <Star className="h-3 w-3 text-yellow-500" />
                              <span className="text-xs">{achievement.points} 积分</span>
                            </div>
                          </div>
                        </div>
                        {isUnlocked && <CheckCircle className="h-5 w-5 text-green-500" />}
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {/* 任务历史 */}
          {showHistory && (
            <Card className="mb-8 bg-white/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="h-5 w-5 text-blue-500" />
                  任务历史
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {taskHistory.length > 0 ? (
                    taskHistory.map((entry, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg flex justify-between items-center">
                        <div>
                          <div className="font-medium">{entry.title}</div>
                          <div className="text-sm text-gray-600">
                            {new Date(entry.completedDate).toLocaleDateString()}
                          </div>
                        </div>
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      还没有完成的任务，快去开启盲盒吧！
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* 盲盒开启区域 */}
          <Card className="mb-8 bg-white/80 backdrop-blur-sm shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl flex items-center justify-center gap-2">
                <Gift className="h-6 w-6 text-pink-500" />
                每日盲盒
              </CardTitle>
              <CardDescription>
                每日免费开启一次，或使用20积分额外开启
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="flex justify-center items-center gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{userData.dailyFreeOpens}</div>
                  <div className="text-sm text-gray-600">今日免费次数</div>
                </div>
                <div className="text-gray-400">/</div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">1</div>
                  <div className="text-sm text-gray-600">每日上限</div>
                </div>
              </div>
              
              <div className="flex justify-center gap-4">
                {userData.dailyFreeOpens > 0 ? (
                  <Button 
                    onClick={openBlindBox}
                    disabled={isUnboxing}
                    className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 px-8 py-3"
                  >
                    <Unlock className="h-5 w-5 mr-2" />
                    免费开启
                  </Button>
                ) : (
                  <Button disabled className="bg-gray-300 text-gray-500 px-8 py-3">
                    <Lock className="h-5 w-5 mr-2" />
                    今日免费次数已用完
                  </Button>
                )}
                
                <Button 
                  onClick={openBlindBoxWithPoints}
                  disabled={isUnboxing || userData.points < 20}
                  variant="outline"
                >
                  <Diamond className="h-5 w-5 mr-2" />
                  积分开启 (20)
                </Button>
              </div>
              
              <div className="text-sm text-gray-500">
                明天 {new Date(new Date().setDate(new Date().getDate() + 1)).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} 免费次数将重置
                {userData.currentStreak > 0 && (
                  <div className="mt-1 text-green-600">
                    当前连续{userData.currentStreak}天完成任务！
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* 任务分类标签 */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm">
              <TabsTrigger value="daily" className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700">
                日常任务
              </TabsTrigger>
              <TabsTrigger value="weekly" className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700">
                周度任务
              </TabsTrigger>
              <TabsTrigger value="monthly" className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700">
                月度挑战
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* 当前任务展示 */}
          {selectedTask && (
            <Card className="mb-8 bg-white/80 backdrop-blur-sm shadow-lg border-2 border-purple-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    {selectedTask.icon}
                    {selectedTask.title}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge className={getRarityColor(selectedTask.rarity)}>
                      {getRarityIcon(selectedTask.rarity)}
                      {getRarityText(selectedTask.rarity)}
                    </Badge>
                    <Badge className={getDifficultyColor(selectedTask.difficulty)}>
                      {getDifficultyText(selectedTask.difficulty)}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">{selectedTask.description}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span>{selectedTask.timeNeeded}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>{selectedTask.points} 积分</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-blue-500" />
                    <span>{getDifficultyText(selectedTask.difficulty)}</span>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles className="h-4 w-4 text-blue-500" />
                    <span className="font-medium text-blue-800">小贴士</span>
                  </div>
                  <p className="text-sm text-blue-700">{selectedTask.tips}</p>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    onClick={favoriteTask}
                    variant="outline"
                    className="flex-1"
                  >
                    <Heart className={`h-4 w-4 mr-2 ${userData.favoriteTasks.includes(selectedTask?.id || '') ? 'text-red-500 fill-red-500' : ''}`} />
                    {userData.favoriteTasks.includes(selectedTask?.id || '') ? '已收藏' : '收藏'}
                  </Button>
                  <Button 
                    onClick={completeTask}
                    className="flex-1 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    完成任务
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* 任务列表 */}
          <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle>任务列表</CardTitle>
              <CardDescription>
                已完成 {userData.completedTasks.filter(id => getTaskList().some(task => task.id === id)).length} / {getTaskList().length}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {getTaskList().map((task) => {
                  const isCompleted = userData.completedTasks.includes(task.id)
                  return (
                    <div 
                      key={task.id} 
                      className={`p-4 rounded-lg border ${isCompleted ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <div className="mt-1">{task.icon}</div>
                          <div className="flex-1">
                            <h3 className={`font-medium ${isCompleted ? 'text-green-800 line-through' : 'text-gray-800'}`}>
                              {task.title}
                            </h3>
                            <p className={`text-sm mt-1 ${isCompleted ? 'text-green-600' : 'text-gray-600'}`}>
                              {task.description}
                            </p>
                            <div className="flex items-center gap-4 mt-2 text-xs">
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3 text-gray-500" />
                                <span>{task.timeNeeded}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 text-yellow-500" />
                                <span>{task.points} 积分</span>
                              </div>
                              <Badge className={`text-xs ${getDifficultyColor(task.difficulty)}`}>
                                {getDifficultyText(task.difficulty)}
                              </Badge>
                              <Badge className={`text-xs ${getRarityColor(task.rarity)}`}>
                                {getRarityIcon(task.rarity)}
                                {getRarityText(task.rarity)}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        {isCompleted && (
                          <CheckCircle className="h-5 w-5 text-green-500 ml-2" />
                        )}
                        {userData.favoriteTasks.includes(task.id) && !isCompleted && (
                          <Heart className="h-5 w-5 text-red-500 ml-2" />
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* 开盲盒动画 */}
        {isUnboxing && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-xl text-center">
              <div className="mb-4">
                <Gift className="h-16 w-16 text-pink-500 animate-bounce mx-auto" />
              </div>
              <h3 className="text-xl font-semibold mb-2">开启盲盒中...</h3>
              <div className="flex justify-center gap-2">
                <div className="w-3 h-3 bg-pink-500 rounded-full animate-pulse"></div>
                <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-3 h-3 bg-indigo-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        {/* 完成任务消息 */}
        {showCompletionMessage && (
          <div className="fixed top-4 right-4 bg-green-100 border border-green-200 text-green-800 p-4 rounded-lg shadow-lg z-50">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              <div>
                <div className="font-medium">任务完成！</div>
                <div className="text-sm">获得 {selectedTask?.points} 积分</div>
              </div>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  )
}