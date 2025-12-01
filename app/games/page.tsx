'use client'

import { useState, useEffect } from 'react'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
  Settings,
  Volume2,
  Award,
  Target,
  Crown,
  CheckCircle,
  RefreshCw,
  Filter,
  Search,
  Eye,
  Share2,
  Bookmark,
  MoreHorizontal,
  BarChart3,
  CalendarDays,
  Timer,
  Activity,
  Lightbulb,
  Download,
  Shield,
  Flag,
  Lock,
  Unlock,
  Wifi,
  WifiOff,
  UserPlus
} from 'lucide-react'
import Link from 'next/link'

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

export default function GamesPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [filterCategory, setFilterCategory] = useState('all')

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const allGames = [
    {
      id: 'conversation-challenge',
      title: '情景对话挑战',
      description: '测试情商水平，学会应对各种社交情境，提升人际交往能力',
      icon: <MessageCircle className="h-10 w-10 text-white" />,
      color: 'from-blue-500 to-blue-700',
      bgPattern: 'bg-gradient-to-br from-blue-50 to-indigo-100',
      href: '/games/conversation-challenge',
      features: ['情商测试', '分数排行', '每日挑战', '成就系统'],
      difficulty: '中等',
      players: '单人',
      gradient: 'from-blue-400 via-blue-500 to-blue-600',
      shadowColor: 'shadow-blue-200',
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
      color: 'from-purple-500 to-purple-700',
      bgPattern: 'bg-gradient-to-br from-purple-50 to-pink-100',
      href: '/games/personality-analysis',
      features: ['性格测试', '结果分析', '个性化建议', '分享卡片'],
      difficulty: '简单',
      players: '单人',
      gradient: 'from-purple-400 via-purple-500 to-purple-600',
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
      color: 'from-green-500 to-green-700',
      bgPattern: 'bg-gradient-to-br from-green-50 to-emerald-100',
      href: '/games/interactive-games/emotion-tree-hole',
      features: ['匿名分享', '情感交流', '温暖回应', '支持社区'],
      difficulty: '简单',
      players: '单人',
      gradient: 'from-green-400 via-green-500 to-green-600',
      shadowColor: 'shadow-green-200',
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
      color: 'from-pink-500 to-pink-700',
      bgPattern: 'bg-gradient-to-br from-pink-50 to-rose-100',
      href: '/games/interactive-games/couple-blind-box',
      features: ['每日盲盒', '情侣任务', '感情提升', '惊喜体验'],
      difficulty: '简单',
      players: '双人',
      gradient: 'from-pink-400 via-pink-500 to-pink-600',
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
      color: 'from-teal-500 to-teal-700',
      bgPattern: 'bg-gradient-to-br from-teal-50 to-cyan-100',
      href: '/games/interactive-games/collaborative-doodle',
      features: ['双人绘画', '情感表达', '创意涂鸦', '实时协作'],
      difficulty: '中等',
      players: '双人',
      gradient: 'from-teal-400 via-teal-500 to-teal-600',
      shadowColor: 'shadow-teal-200',
      tags: ['绘画', '协作', '创意', '艺术'],
      rating: 4.5,
      playCount: 1023,
      isNew: false,
      isHot: false
    },
    {
      id: 'complaint-wall',
      title: '吐槽墙',
      description: '匿名吐槽生活烦恼，释放压力，获得共鸣和建议',
      icon: <MessageSquare className="h-10 w-10 text-white" />,
      color: 'from-orange-500 to-orange-700',
      bgPattern: 'bg-gradient-to-br from-orange-50 to-amber-100',
      href: '/games/interactive-games/complaint-wall',
      features: ['匿名吐槽', '情绪释放', '压力缓解', '共鸣交流'],
      difficulty: '简单',
      players: '单人',
      gradient: 'from-orange-400 via-orange-500 to-orange-600',
      shadowColor: 'shadow-orange-200',
      tags: ['吐槽', '压力释放', '情绪管理', '社区'],
      rating: 4.4,
      playCount: 1432,
      isNew: false,
      isHot: false
    },
    {
      id: 'relationship-chess',
      title: '关系飞行棋',
      description: '情侣专属互动棋盘游戏，通过有趣任务增进了解和感情',
      icon: <Dice6 className="h-10 w-10 text-white" />,
      color: 'from-purple-500 to-purple-700',
      bgPattern: 'bg-gradient-to-br from-purple-50 to-indigo-100',
      href: '/games/interactive-games/relationship-chess',
      features: ['互动棋盘', '情侣专属', '增进了解', '趣味挑战'],
      difficulty: '中等',
      players: '双人',
      gradient: 'from-purple-400 via-purple-500 to-purple-600',
      shadowColor: 'shadow-purple-200',
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
      color: 'from-red-500 to-red-700',
      bgPattern: 'bg-gradient-to-br from-red-50 to-rose-100',
      href: '/games/interactive-games/truth-or-dare',
      features: ['真心话', '大冒险', '情感探索', '亲密互动'],
      difficulty: '多样',
      players: '多人',
      gradient: 'from-red-400 via-red-500 to-red-600',
      shadowColor: 'shadow-red-200',
      tags: ['派对游戏', '亲密关系', '社交', '挑战'],
      rating: 4.8,
      playCount: 1543,
      isNew: false,
      isHot: true
    }
  ]

  const filteredGames = allGames.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         game.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         game.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesCategory = filterCategory === 'all' ||
                           (filterCategory === 'new' && game.isNew) ||
                           (filterCategory === 'hot' && game.isHot) ||
                           (filterCategory === 'single' && game.players === '单人') ||
                           (filterCategory === 'multi' && game.players === '双人') ||
                           (filterCategory === 'simple' && game.difficulty === '简单') ||
                           (filterCategory === 'medium' && game.difficulty === '中等') ||
                           (filterCategory === 'hard' && game.difficulty === '多样')
    
    return matchesSearch && matchesCategory
  })

  const totalGames = allGames.length
  const newGames = allGames.filter(game => game.isNew).length
  const hotGames = allGames.filter(game => game.isHot).length
  const totalPlayCount = allGames.reduce((sum, game) => sum + game.playCount, 0)
  const avgRating = (allGames.reduce((sum, game) => sum + game.rating, 0) / allGames.length).toFixed(1)

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-7xl">
          {/* 页面标题区域 */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center mb-6 p-4 bg-white rounded-full shadow-lg">
              <Gamepad2 className="h-12 w-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">
              情感互动
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 block md:inline">
                游戏中心
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              探索丰富多彩的情感互动游戏，提升情商能力，增进亲密关系，享受游戏的乐趣
            </p>
            
            {/* 统计数据 */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="bg-white rounded-xl px-6 py-4 shadow-md">
                <div className="text-3xl font-bold text-purple-600">{totalGames}</div>
                <div className="text-sm text-gray-500">精选游戏</div>
              </div>
              <div className="bg-white rounded-xl px-6 py-4 shadow-md">
                <div className="text-3xl font-bold text-pink-600">{newGames}</div>
                <div className="text-sm text-gray-500">最新上线</div>
              </div>
              <div className="bg-white rounded-xl px-6 py-4 shadow-md">
                <div className="text-3xl font-bold text-blue-600">{hotGames}</div>
                <div className="text-sm text-gray-500">热门推荐</div>
              </div>
              <div className="bg-white rounded-xl px-6 py-4 shadow-md">
                <div className="text-3xl font-bold text-green-600">{totalPlayCount.toLocaleString()}</div>
                <div className="text-sm text-gray-500">总游戏次数</div>
              </div>
              <div className="bg-white rounded-xl px-6 py-4 shadow-md">
                <div className="text-3xl font-bold text-yellow-600">{avgRating}</div>
                <div className="text-sm text-gray-500">平均评分</div>
              </div>
            </div>
          </div>

          {/* 搜索和筛选区域 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="搜索游戏名称、描述或标签..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  onClick={() => setViewMode('grid')}
                  className="px-4 py-2"
                >
                  <div className="grid grid-cols-2 gap-1 h-4 w-4">
                    <div className="col-span-2 bg-current h-1"></div>
                    <div className="bg-current h-1"></div>
                    <div className="bg-current h-1"></div>
                    <div className="col-span-2 bg-current h-1"></div>
                  </div>
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  onClick={() => setViewMode('list')}
                  className="px-4 py-2"
                >
                  <div className="flex flex-col gap-1 h-4 w-4">
                    <div className="bg-current h-0.5"></div>
                    <div className="bg-current h-0.5"></div>
                    <div className="bg-current h-0.5"></div>
                  </div>
                </Button>
              </div>
            </div>
            
            {/* 分类筛选 */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={filterCategory === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterCategory('all')}
                className="px-4 py-2"
              >
                全部游戏
              </Button>
              <Button
                variant={filterCategory === 'new' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterCategory('new')}
                className="px-4 py-2"
              >
                <Sparkles className="w-4 h-4 mr-1" />
                最新上线
              </Button>
              <Button
                variant={filterCategory === 'hot' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterCategory('hot')}
                className="px-4 py-2"
              >
                <Flame className="w-4 h-4 mr-1" />
                热门推荐
              </Button>
              <Button
                variant={filterCategory === 'single' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterCategory('single')}
                className="px-4 py-2"
              >
                <Users className="w-4 h-4 mr-1" />
                单人游戏
              </Button>
              <Button
                variant={filterCategory === 'multi' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterCategory('multi')}
                className="px-4 py-2"
              >
                <UserPlus className="w-4 h-4 mr-1" />
                双人游戏
              </Button>
            </div>
          </div>

          {/* 游戏展示区域 */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Gamepad2 className="h-6 w-6 text-purple-500" />
              所有游戏
              <Badge variant="secondary" className="ml-2">
                {filteredGames.length} 个游戏
              </Badge>
            </h2>
            
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredGames.map((game, index) => (
                  <div key={game.id} className={`relative group ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className={`absolute -inset-0.5 bg-gradient-to-r ${game.gradient} rounded-2xl opacity-75 group-hover:opacity-100 blur transition duration-300 group-hover:duration-200`}></div>
                    <div className="relative bg-white rounded-2xl h-full overflow-hidden">
                      <div className={`${game.bgPattern} p-6 h-32 flex items-center justify-center relative`}>
                        <div className={`p-4 rounded-xl bg-gradient-to-r ${game.color} shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105`}>
                          {game.icon}
                        </div>
                        {game.isNew && (
                          <Badge className="absolute top-4 right-4 bg-green-500 hover:bg-green-600">
                            <Sparkles className="w-3 h-3 mr-1" />
                            新
                          </Badge>
                        )}
                        {game.isHot && (
                          <Badge className="absolute top-4 left-4 bg-red-500 hover:bg-red-600">
                            <Flame className="w-3 h-3 mr-1" />
                            热
                          </Badge>
                        )}
                      </div>
                      
                      <div className="p-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-2">{game.title}</h3>
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{game.description}</p>
                        
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="outline" className="text-xs">
                            {game.difficulty}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {game.players}
                          </Badge>
                          <div className="flex items-center ml-auto text-xs text-yellow-600">
                            <Star className="w-3 h-3 mr-1 fill-current" />
                            {game.rating}
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-1 mb-4">
                          {game.tags.slice(0, 2).map((tag, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {game.tags.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{game.tags.length - 2}
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                          <div className="flex items-center">
                            <Play className="w-3 h-3 mr-1" />
                            {game.playCount.toLocaleString()}
                          </div>
                          <Button variant="ghost" size="sm" className="h-auto p-0 text-xs">
                            <MoreHorizontal className="w-3 h-3" />
                          </Button>
                        </div>
                        
                        <Link href={game.href}>
                          <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-lg transition-all transform hover:scale-[1.02] text-white font-medium">
                            <Play className="mr-2 h-4 w-4" />
                            开始游戏
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredGames.map((game, index) => (
                  <div key={game.id} className={`relative group ${isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 opacity-75 group-hover:opacity-100 blur transition duration-300"></div>
                    <div className="relative bg-white rounded-xl overflow-hidden">
                      <div className={`${game.bgPattern} p-6 flex items-center gap-6`}>
                        <div className={`p-4 rounded-xl bg-gradient-to-r ${game.color} shadow-lg`}>
                          {game.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-xl font-bold text-gray-800">{game.title}</h3>
                            {game.isNew && (
                              <Badge className="bg-green-500 hover:bg-green-600">
                                <Sparkles className="w-3 h-3 mr-1" />
                                新
                              </Badge>
                            )}
                            {game.isHot && (
                              <Badge className="bg-red-500 hover:bg-red-600">
                                <Flame className="w-3 h-3 mr-1" />
                                热
                              </Badge>
                            )}
                          </div>
                          <p className="text-gray-600 mb-3">{game.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {game.features.slice(0, 4).map((feature, i) => (
                              <Badge key={i} variant="secondary" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-2 mb-3">
                            <Badge variant="outline" className="text-sm">
                              {game.difficulty}
                            </Badge>
                            <Badge variant="outline" className="text-sm">
                              {game.players}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                            <div className="flex items-center">
                              <Star className="w-4 h-4 mr-1 text-yellow-600 fill-current" />
                              {game.rating}
                            </div>
                            <div className="flex items-center">
                              <Play className="w-4 h-4 mr-1" />
                              {game.playCount.toLocaleString()}
                            </div>
                          </div>
                          <Link href={game.href}>
                            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-lg transition-all text-white">
                              开始游戏
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 特色功能区域 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-800">
                  <Trophy className="h-5 w-5" />
                  成就系统
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">完成游戏挑战，解锁精美成就徽章，展示你的情感互动技能</p>
                <div className="flex gap-2">
                  <Badge variant="secondary">徽章收集</Badge>
                  <Badge variant="secondary">排行榜</Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-800">
                  <BarChart3 className="h-5 w-5" />
                  数据分析
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">深入分析你的情感互动数据，了解进步轨迹和情感特点</p>
                <div className="flex gap-2">
                  <Badge variant="secondary">数据可视化</Badge>
                  <Badge variant="secondary">成长追踪</Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-pink-800">
                  <Users className="h-5 w-5" />
                  社交互动
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">与朋友一起游戏，分享经验，建立更深的情感连接</p>
                <div className="flex gap-2">
                  <Badge variant="secondary">好友系统</Badge>
                  <Badge variant="secondary">分享功能</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}