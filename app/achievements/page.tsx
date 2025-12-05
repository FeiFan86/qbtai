'use client'

import { useState, useEffect } from 'react'
import GlobalNavbar from '@/components/global-navbar'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Trophy,
  Star,
  Target,
  Flame,
  Zap,
  Heart,
  Users,
  Clock,
  Award,
  Crown,
  Diamond,
  CheckCircle,
  TrendingUp,
  Calendar,
  Filter,
  Search
} from 'lucide-react'
import Link from 'next/link'

// 游戏成就分类
interface GameCategory {
  name: string;
  icon: string;
  description: string;
}

const gameCategories: Record<string, GameCategory> = {
  'memory-puzzle': {
    name: '记忆拼图',
    icon: '🧩',
    description: '通过拼图游戏考验记忆力的情侣游戏'
  },
  'truth-or-dare': {
    name: '真心话大冒险',
    icon: '💬',
    description: '经典游戏情感版，增进朋友间的了解和信任'
  },
  'collaborative-doodle': {
    name: '协作涂鸦板',
    icon: '🎨',
    description: '实时协作绘画，双人猜词游戏，创意无限'
  },
  'relationship-chess': {
    name: '关系飞行棋',
    icon: '♟',
    description: '通过情感话题和挑战增进彼此了解'
  },
  'couple-blind-box': {
    name: '情侣盲盒',
    icon: '🎁',
    description: '每日开启情侣互动任务，让感情升温'
  }
}

// 成就类型
interface AchievementType {
  name: string;
  color: string;
  description: string;
}

const achievementTypes: Record<string, AchievementType> = {
  milestone: {
    name: '里程碑',
    color: 'bg-blue-100 text-blue-800',
    description: '游戏中的重要节点成就'
  },
  skill: {
    name: '技能',
    color: 'bg-green-100 text-green-800',
    description: '展示特定游戏技能的成就'
  },
  dedication: {
    name: '坚持',
    color: 'bg-purple-100 text-purple-800',
    description: '需要长期坚持才能获得的成就'
  },
  special: {
    name: '特殊',
    color: 'bg-yellow-100 text-yellow-800',
    description: '稀有且难以获得的成就'
  }
}

// 模拟成就数据
const allAchievements = [
  // 记忆拼图成就
  {
    id: 'memory_first_win',
    gameId: 'memory-puzzle',
    name: '初次胜利',
    description: '完成第一场记忆拼图',
    icon: <Trophy className="h-6 w-6" />,
    type: 'milestone',
    points: 10,
    unlocked: true
  },
  {
    id: 'memory_perfect',
    gameId: 'memory-puzzle',
    name: '完美记忆',
    description: '一次不翻错完成游戏',
    icon: <Star className="h-6 w-6" />,
    type: 'skill',
    points: 30,
    unlocked: false
  },
  {
    id: 'memory_speed_demon',
    gameId: 'memory-puzzle',
    name: '闪电快手',
    description: '在30秒内完成简单难度',
    icon: <Zap className="h-6 w-6" />,
    type: 'skill',
    points: 20,
    unlocked: true
  },
  {
    id: 'memory_expert',
    gameId: 'memory-puzzle',
    name: '拼图大师',
    description: '完成专家难度拼图',
    icon: <Crown className="h-6 w-6" />,
    type: 'milestone',
    points: 100,
    unlocked: false
  },
  
  // 真心话大冒险成就
  {
    id: 'truth_dare_first',
    gameId: 'truth-or-dare',
    name: '初次体验',
    description: '完成第一场真心话大冒险',
    icon: <Heart className="h-6 w-6" />,
    type: 'milestone',
    points: 10,
    unlocked: true
  },
  {
    id: 'truth_dare_week_streak',
    gameId: 'truth-or-dare',
    name: '一周坚持',
    description: '连续一周完成任务',
    icon: <Flame className="h-6 w-6" />,
    type: 'dedication',
    points: 50,
    unlocked: false
  },
  {
    id: 'truth_dare_social_butterfly',
    gameId: 'truth-or-dare',
    name: '社交达人',
    description: '分享10次游戏结果',
    icon: <Users className="h-6 w-6" />,
    type: 'special',
    points: 40,
    unlocked: false
  },
  
  // 协作涂鸦板成就
  {
    id: 'doodle_collaborator',
    gameId: 'collaborative-doodle',
    name: '创意合作者',
    description: '与3人共同完成一幅画',
    icon: <Target className="h-6 w-6" />,
    type: 'skill',
    points: 30,
    unlocked: false
  },
  {
    id: 'doodle_gallery',
    gameId: 'collaborative-doodle',
    name: '画廊收藏家',
    description: '保存10幅协作作品',
    icon: <Award className="h-6 w-6" />,
    type: 'milestone',
    points: 40,
    unlocked: false
  },
  
  // 关系飞行棋成就
  {
    id: 'chess_communicator',
    gameId: 'relationship-chess',
    name: '情感沟通家',
    description: '完成10个真心话或大冒险任务',
    icon: <Heart className="h-6 w-6" />,
    type: 'skill',
    points: 30,
    unlocked: false
  },
  {
    id: 'chess_winner',
    gameId: 'relationship-chess',
    name: '关系赢家',
    description: '赢得5场关系飞行棋游戏',
    icon: <Trophy className="h-6 w-6" />,
    type: 'dedication',
    points: 50,
    unlocked: false
  },
  
  // 情侣盲盒成就
  {
    id: 'blind_box_collector',
    gameId: 'couple-blind-box',
    name: '盲盒收藏家',
    description: '收藏20个不同的任务',
    icon: <Star className="h-6 w-6" />,
    type: 'skill',
    points: 25,
    unlocked: false
  },
  {
    id: 'blind_box_lover',
    gameId: 'couple-blind-box',
    name: '盲盒达人',
    description: '连续30天开启盲盒',
    icon: <Diamond className="h-6 w-6" />,
    type: 'dedication',
    points: 100,
    unlocked: false
  },
  
  // 通用成就
  {
    id: 'explorer',
    gameId: 'all',
    name: '游戏探索者',
    description: '尝试所有游戏模式',
    icon: <TrendingUp className="h-6 w-6" />,
    type: 'milestone',
    points: 25,
    unlocked: true
  },
  {
    id: 'master',
    gameId: 'all',
    name: '全能大师',
    description: '解锁所有游戏的所有成就',
    icon: <Crown className="h-6 w-6" />,
    type: 'special',
    points: 200,
    unlocked: false
  }
]

export default function AchievementsPage() {
  const [selectedGame, setSelectedGame] = useState<string>('all')
  const [selectedType, setSelectedType] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<'points' | 'unlocked'>('points')
  const [totalPoints, setTotalPoints] = useState(0)
  const [unlockedCount, setUnlockedCount] = useState(0)

  useEffect(() => {
    // 计算总积分和解锁成就数量
    const unlocked = allAchievements.filter(a => a.unlocked)
    setUnlockedCount(unlocked.length)
    setTotalPoints(unlocked.reduce((total, achievement) => total + achievement.points, 0))
  }, [])

  // 过滤成就
  const filteredAchievements = allAchievements.filter(achievement => {
    const matchesGame = selectedGame === 'all' || achievement.gameId === selectedGame
    const matchesType = selectedType === 'all' || achievement.type === selectedType
    const matchesSearch = searchTerm === '' || 
      achievement.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      achievement.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesGame && matchesType && matchesSearch
  })

  // 排序成就
  const sortedAchievements = [...filteredAchievements].sort((a, b) => {
    if (sortBy === 'points') {
      return b.points - a.points
    } else {
      return (a.unlocked === b.unlocked) ? 0 : a.unlocked ? -1 : 1
    }
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/games" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 transition-colors mb-6">
            <Trophy className="h-4 w-4" />
            返回游戏中心
          </Link>
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
            成就系统
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            解锁各种游戏成就，记录你的成长历程，成为全能大师
          </p>
        </div>

        {/* 统计概览 */}
        <Card className="mb-8 bg-white/80 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-yellow-500" />
              成就总览
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">{totalPoints}</div>
                <div className="text-sm text-gray-500">总积分</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{unlockedCount}</div>
                <div className="text-sm text-gray-500">已解锁</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">{allAchievements.length - unlockedCount}</div>
                <div className="text-sm text-gray-500">待解锁</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 过滤和排序选项 */}
        <Card className="mb-8 bg-white/80 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle>筛选和排序</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">游戏类别</label>
                <select 
                  value={selectedGame}
                  onChange={(e) => setSelectedGame(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="all">全部游戏</option>
                  {Object.entries(gameCategories).map(([key, category]) => (
                    <option key={key} value={key}>
                      {category.icon} {category.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">成就类型</label>
                <select 
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="all">全部类型</option>
                  {Object.entries(achievementTypes).map(([key, type]) => (
                    <option key={key} value={key}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">排序方式</label>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'points' | 'unlocked')}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="points">按积分</option>
                  <option value="unlocked">按解锁状态</option>
                </select>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="搜索成就..."
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <Button 
                variant="outline"
                onClick={() => setSearchTerm('')}
                disabled={searchTerm === ''}
              >
                清除
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 成就列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedAchievements.map((achievement) => (
            <Card 
              key={achievement.id} 
              className={`transition-all hover:shadow-md ${
                achievement.unlocked 
                  ? 'border-2 border-green-200 bg-green-50' 
                  : 'border border-gray-200 opacity-80'
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`text-4xl ${achievement.unlocked ? '' : 'grayscale'}`}>
                      {achievement.icon}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{achievement.name}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={achievementTypes[achievement.type]?.color}>
                          {achievementTypes[achievement.type]?.name}
                        </Badge>
                        <Badge className="bg-purple-100 text-purple-800 border-0">
                          {gameCategories[achievement.gameId]?.icon} {gameCategories[achievement.gameId]?.name}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  {achievement.unlocked && (
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="font-medium">{achievement.points} 积分</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {achievement.unlocked ? '已解锁' : '未解锁'}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 进度提示 */}
        {unlockedCount < allAchievements.length && (
          <Card className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardContent className="text-center">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">
                继续探索，解锁更多成就！
              </h3>
              <p className="text-blue-700">
                你已解锁 {unlockedCount}/{allAchievements.length} 个成就，
                再接再厉成为全能大师！
              </p>
              <div className="mt-4">
                <Link href="/games">
                  <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                    继续游戏
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
      
      <Footer />
    </div>
  )
}