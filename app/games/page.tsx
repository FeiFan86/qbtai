'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  MessageCircle, 
  Brain, 
  Gamepad2, 
  Star, 
  Trophy, 
  Users, 
  Gift,
  Palette,
  TreePine,
  Dice6,
  Heart,
  MessageSquare,
  Mic,
  Shuffle,
  Sparkles,
  Zap,
  ArrowRight,
  Play,
  TrendingUp,
  Flame,
  Clock,
  Calendar,
  Search,
  Filter,
  Heart as HeartIcon
} from 'lucide-react'

// 游戏数据（统一使用粉红色系）
const gameData = [
  {
    id: 'conversation-challenge',
    title: '情景对话挑战',
    description: '测试情商水平，学会应对各种社交情境，提升人际交往能力',
    icon: <MessageCircle className="h-10 w-10 text-white" />,
    color: 'from-rose-500 to-pink-500',
    bgPattern: 'bg-gradient-to-br from-rose-50 to-pink-50',
    href: '/games/conversation-challenge',
    features: ['情商测试', '分数排行', '每日挑战', '成就系统'],
    difficulty: '中等',
    players: '单人',
    gradient: 'from-rose-400 via-rose-500 to-pink-600',
    shadowColor: 'shadow-rose-200',
    tags: ['情商', '社交', '测试', '挑战'],
    rating: 4.8,
    playCount: 1234,
    isNew: true,
    isHot: true
  },
  {
    id: 'personality-analysis',
    title: '情感性格分析',
    description: '深入了解你的情感气质类型和社交风格，获得个性化建议',
    icon: <Brain className="h-10 w-10 text-white" />,
    color: 'from-purple-500 to-pink-500',
    bgPattern: 'bg-gradient-to-br from-purple-50 to-pink-50',
    href: '/games/personality-analysis',
    features: ['性格测试', '结果分析', '个性化建议', '分享卡片'],
    difficulty: '简单',
    players: '单人',
    gradient: 'from-purple-400 via-purple-500 to-pink-600',
    shadowColor: 'shadow-purple-200',
    tags: ['性格', '心理', '分析', '自我认知'],
    rating: 4.7,
    playCount: 987,
    isNew: false,
    isHot: false
  },
  {
    id: 'emotion-tree-hole',
    title: '情感树洞',
    description: '匿名分享你的情感故事，获得温暖的回应和支持，释放情绪',
    icon: <TreePine className="h-10 w-10 text-white" />,
    color: 'from-rose-500 to-pink-500',
    bgPattern: 'bg-gradient-to-br from-rose-50 to-pink-50',
    href: '/games/interactive-games/emotion-tree-hole',
    features: ['匿名分享', '情感交流', '温暖回应', '支持社区'],
    difficulty: '简单',
    players: '单人',
    gradient: 'from-rose-400 via-rose-500 to-pink-600',
    shadowColor: 'shadow-rose-200',
    tags: ['情感', '社区', '匿名', '倾诉'],
    rating: 4.9,
    playCount: 2145,
    isNew: false,
    isHot: true
  },
  {
    id: 'couple-blind-box',
    title: '情侣盲盒',
    description: '每日开启情侣互动主题盲盒，完成甜蜜任务增进感情',
    icon: <Gift className="h-10 w-10 text-white" />,
    color: 'from-pink-500 to-rose-500',
    bgPattern: 'bg-gradient-to-br from-pink-50 to-rose-50',
    href: '/games/interactive-games/couple-blind-box',
    features: ['每日盲盒', '情侣任务', '感情提升', '惊喜体验'],
    difficulty: '简单',
    players: '双人',
    gradient: 'from-pink-400 via-pink-500 to-rose-600',
    shadowColor: 'shadow-pink-200',
    tags: ['情侣', '盲盒', '互动', '任务'],
    rating: 4.6,
    playCount: 1876,
    isNew: true,
    isHot: false
  },
  {
    id: 'collaborative-doodle',
    title: '协作涂鸦',
    description: '双人一起绘画，表达情感，增进默契，创造独特的艺术作品',
    icon: <Palette className="h-10 w-10 text-white" />,
    color: 'from-purple-500 to-pink-500',
    bgPattern: 'bg-gradient-to-br from-purple-50 to-pink-50',
    href: '/games/interactive-games/collaborative-doodle',
    features: ['双人绘画', '情感表达', '创意涂鸦', '实时协作'],
    difficulty: '中等',
    players: '双人',
    gradient: 'from-purple-400 via-purple-500 to-pink-600',
    shadowColor: 'shadow-purple-200',
    tags: ['绘画', '协作', '创意', '艺术'],
    rating: 4.5,
    playCount: 1023,
    isNew: false,
    isHot: false
  },
  {
    id: 'relationship-chess',
    title: '关系飞行棋',
    description: '情侣专属互动棋盘游戏，通过有趣任务增进了解和感情',
    icon: <Dice6 className="h-10 w-10 text-white" />,
    color: 'from-rose-500 to-pink-500',
    bgPattern: 'bg-gradient-to-br from-rose-50 to-pink-50',
    href: '/games/interactive-games/relationship-chess',
    features: ['互动棋盘', '情侣专属', '增进了解', '趣味挑战'],
    difficulty: '中等',
    players: '双人',
    gradient: 'from-rose-400 via-rose-500 to-pink-600',
    shadowColor: 'shadow-rose-200',
    tags: ['棋盘游戏', '情侣', '互动', '任务'],
    rating: 4.7,
    playCount: 987,
    isNew: true,
    isHot: false
  },
  {
    id: 'truth-or-dare',
    title: '真心话大冒险',
    description: '情感深度探索游戏，通过真心话和大冒险增进亲密关系',
    icon: <Heart className="h-10 w-10 text-white" />,
    color: 'from-rose-500 to-pink-500',
    bgPattern: 'bg-gradient-to-br from-rose-50 to-pink-50',
    href: '/games/interactive-games/truth-or-dare',
    features: ['情感探索', '深度交流', '增进了解', '趣味挑战'],
    difficulty: '中等',
    players: '双人',
    gradient: 'from-rose-400 via-rose-500 to-pink-600',
    shadowColor: 'shadow-rose-200',
    tags: ['真心话', '大冒险', '情侣', '互动'],
    rating: 4.8,
    playCount: 1567,
    isNew: false,
    isHot: true
  }
]

export default function GamesPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('popular')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const filteredGames = useMemo(() => {
    return gameData.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          game.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || game.tags.includes(selectedCategory)
      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  const sortedGames = useMemo(() => {
    return [...filteredGames].sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating
        case 'newest':
          return b.isNew ? 1 : -1
        case 'popular':
        default:
          return b.playCount - a.playCount
      }
    })
  }, [filteredGames, sortBy])

  const categories = ['all', '情商', '性格', '情感', '情侣', '互动', '测试', '任务']

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 relative overflow-hidden">
      {/* 增强背景装饰元素 - 与首页保持一致 */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-100/20 via-pink-100/20 to-purple-100/20"></div>
      <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-rose-300/30 to-pink-300/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-purple-300/30 to-blue-300/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-orange-300/20 to-red-300/20 rounded-full blur-3xl animate-pulse delay-300"></div>
      <div className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-gradient-to-r from-yellow-300/20 to-amber-300/20 rounded-full blur-3xl animate-pulse delay-700"></div>

      {/* 导航栏 - 与首页一致 */}
      <nav className={`relative z-10 bg-white/70 backdrop-blur-md border-b border-white/20 transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full flex items-center justify-center">
                  <HeartIcon className="h-5 w-5 text-white" fill="currentColor" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                  丘比特AI
                </span>
                <span className="block text-xs text-gray-500 -mt-1">情感互动平台</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                variant="ghost" 
                onClick={() => router.push('/login')}
                className="text-gray-600 hover:text-rose-600 transition-colors"
              >
                登录
              </Button>
              <Button 
                onClick={() => router.push('/register')}
                className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                立即体验
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* 主要内容区域 */}
      <div className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 transition-all duration-700 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <div className="text-center mb-16">
          {/* 标签 */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-white/20 shadow-sm mb-6">
            <Gamepad2 className="h-4 w-4 text-rose-500 mr-2" />
            <span className="text-sm font-medium text-gray-700">发现有趣的互动游戏</span>
          </div>

          {/* 主标题 */}
          <div className="space-y-4 mb-8">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="block text-gray-900">游戏中心</span>
              <span className="block bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                探索无限乐趣
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              从情感交流到趣味互动，我们为情侣准备了全方位的游戏和活动，
              <span className="text-rose-600 font-medium">让每一次互动都充满惊喜</span>
            </p>
          </div>

          {/* 搜索和筛选 */}
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="搜索游戏名称或描述..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/80 backdrop-blur-sm border-white/20"
              />
            </div>
            
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={`${selectedCategory === category ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white' : 'border-gray-200 text-gray-600'}`}
                >
                  {category === 'all' ? '全部' : category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* 游戏列表 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedGames.map((game, index) => (
            <Card 
              key={game.id} 
              className={`group relative overflow-hidden border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
              style={{
                transitionDelay: isVisible ? `${index * 100}ms` : '0ms'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-rose-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* 游戏图标和标题 */}
              <CardHeader className="relative z-10 pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 shadow-lg">
                    {game.icon}
                  </div>
                  <div className="flex items-center space-x-2">
                    {game.isNew && (
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        新
                      </Badge>
                    )}
                    {game.isHot && (
                      <Badge variant="secondary" className="bg-red-100 text-red-800">
                        热门
                      </Badge>
                    )}
                  </div>
                </div>
                
                <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-rose-700 transition-colors duration-300">
                  {game.title}
                </CardTitle>
                <CardDescription className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                  {game.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="relative z-10 space-y-4">
                {/* 游戏信息 */}
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" fill="currentColor" />
                      {game.rating}
                    </span>
                    <span className="flex items-center">
                      <Users className="h-4 w-4 text-blue-500 mr-1" />
                      {game.playCount} 次游玩
                    </span>
                  </div>
                  <Badge variant="outline">{game.difficulty}</Badge>
                </div>

                {/* 功能标签 */}
                <div className="flex flex-wrap gap-1">
                  {game.features.slice(0, 3).map((feature, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs bg-rose-100 text-rose-800">
                      {feature}
                    </Badge>
                  ))}
                </div>

                {/* 开始游戏按钮 */}
                <Link href={game.href}>
                  <Button 
                    className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    开始游戏
                  </Button>
                </Link>
              </CardContent>
              
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-rose-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </Card>
          ))}
        </div>

        {/* 没有游戏时的提示 */}
        {sortedGames.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-rose-100 to-pink-100 rounded-full flex items-center justify-center">
              <Search className="h-12 w-12 text-rose-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">没有找到相关游戏</h3>
            <p className="text-gray-600 mb-6">请尝试调整搜索关键词或筛选条件</p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('all')
              }}
              className="border-rose-200 text-rose-600 hover:bg-rose-50"
            >
              重置筛选条件
            </Button>
          </div>
        )}
      </div>

      {/* 页脚 - 与首页一致 */}
      <footer className={`relative z-10 bg-white/70 backdrop-blur-md border-t border-white/20 mt-16 transition-all duration-500 delay-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full flex items-center justify-center">
                <HeartIcon className="h-4 w-4 text-white" fill="currentColor" />
              </div>
              <span className="text-lg font-bold text-gray-900">丘比特AI情感助手</span>
            </div>
            <p className="text-gray-600">
              © 2024 专为情侣设计的互动游戏平台. 让爱更美好.
            </p>
            <p className="text-sm text-gray-500">
              当前版本: v2.0.0 | 用心创造每一份感动
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}