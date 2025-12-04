'use client'

import { useState, useEffect, useMemo } from 'react'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { GameCard } from '@/components/game-card'
import { GameFilters } from '@/components/game-filters'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
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

// 游戏数据
const gameData = [
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
  },
  {
    id: 'memory-puzzle',
    title: '记忆拼图',
    description: '共同回忆收集，通过拼图游戏重温美好时光',
    icon: <Brain className="h-10 w-10 text-white" />,
    color: 'from-cyan-500 to-blue-700',
    bgPattern: 'bg-gradient-to-br from-cyan-50 to-blue-100',
    href: '/games/interactive-games/memory-puzzle',
    features: ['回忆收集', '记忆力挑战', '情侣互动', '情感增进', '美好时光'],
    difficulty: '中等',
    players: '单人',
    gradient: 'from-cyan-400 via-cyan-500 to-cyan-600',
    shadowColor: 'shadow-cyan-200',
    tags: ['记忆', '情侣', '互动', '情感'],
    rating: 4.7,
    playCount: 3250,
    isNew: true,
    isHot: true
  },
  {
    id: 'tacit-challenge',
    title: '默契挑战',
    description: '情侣默契度测试，发现彼此的了解和关心',
    icon: <Heart className="h-10 w-10 text-white" />,
    color: 'from-pink-500 to-rose-700',
    bgPattern: 'bg-gradient-to-br from-pink-50 to-rose-100',
    href: '/games/interactive-games/tacit-challenge',
    features: ['默契测试', '情感分析', '个性化建议', '情侣互动', '关系增进'],
    difficulty: '中等',
    players: '双人',
    gradient: 'from-pink-400 via-pink-500 to-pink-600',
    shadowColor: 'shadow-pink-200',
    tags: ['默契', '测试', '情侣', '情感分析'],
    rating: 4.8,
    playCount: 4560,
    isNew: true,
    isHot: true
  }
]

export default function GamesPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [filterCategory, setFilterCategory] = useState('all')

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // 过滤游戏
  const filteredGames = useMemo(() => {
    return gameData.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           game.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           game.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      
      const matchesCategory = filterCategory === 'all' ||
                             (filterCategory === 'new' && game.isNew) ||
                             (filterCategory === 'hot' && game.isHot) ||
                             (filterCategory === 'single' && game.players === '单人') ||
                             (filterCategory === 'multi' && game.players === '双人') ||
                             (filterCategory === 'rated' && game.rating >= 4.7)
      
      return matchesSearch && matchesCategory
    })
  }, [searchTerm, filterCategory])

  // 统计数据
  const gameStats = useMemo(() => ({
    total: gameData.length,
    new: gameData.filter(game => game.isNew).length,
    hot: gameData.filter(game => game.isHot).length,
    filtered: filteredGames.length
  }), [filteredGames])

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* 增强背景装饰元素 */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-100/20 via-purple-100/20 to-pink-100/20"></div>
      <div className="absolute top-20 left-10 w-80 h-80 bg-gradient-to-r from-violet-300/30 to-purple-300/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-pink-300/30 to-rose-300/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-blue-300/20 to-cyan-300/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      <div className="absolute bottom-1/3 left-1/3 w-72 h-72 bg-gradient-to-r from-green-300/20 to-emerald-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 relative z-10">
        <div className="mx-auto max-w-7xl">
          {/* 页面标题区域 */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center mb-8 p-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-2xl">
              <Gamepad2 className="h-16 w-16 text-white" />
            </div>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent">
              情感互动
              <span className="block md:inline">游戏中心</span>
            </h1>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto mb-10 bg-white/80 backdrop-blur-sm px-8 py-4 rounded-xl shadow-lg">
              🎮 探索丰富多彩的情感互动游戏，提升情商能力，增进亲密关系，享受游戏的乐趣
            </p>
            
            {/* 统计数据 */}
            <div className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-5 gap-4 mb-10">
              <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/50">
                <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-1">{gameStats.total}</div>
                <div className="text-sm font-medium text-gray-600">🎯 精选游戏</div>
              </div>
              <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/50">
                <div className="text-3xl md:text-4xl font-bold text-pink-600 mb-1">{gameStats.new}</div>
                <div className="text-sm font-medium text-gray-600">✨ 最新上线</div>
              </div>
              <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/50">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-1">{gameStats.hot}</div>
                <div className="text-sm font-medium text-gray-600">🔥 热门推荐</div>
              </div>
              <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/50">
                <div className="text-3xl md:text-4xl font-bold text-green-600 mb-1">
                  {gameData.reduce((sum, game) => sum + game.playCount, 0).toLocaleString()}
                </div>
                <div className="text-sm font-medium text-gray-600">👥 总游戏次数</div>
              </div>
              <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/50">
                <div className="text-3xl md:text-4xl font-bold text-yellow-600 mb-1">
                  {(gameData.reduce((sum, game) => sum + game.rating, 0) / gameData.length).toFixed(1)}
                </div>
                <div className="text-sm font-medium text-gray-600">⭐ 平均评分</div>
              </div>
            </div>
          </div>

          {/* 游戏筛选器 */}
          <GameFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            filterCategory={filterCategory}
            onFilterChange={setFilterCategory}
            gameStats={gameStats}
          />

          {/* 游戏列表/网格 */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
                  <Gamepad2 className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800">
                  🎲 游戏列表
                </h2>
                <Badge variant="secondary" className="ml-3 px-3 py-1 text-base font-medium bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border-purple-200">
                  {filteredGames.length} 个游戏
                </Badge>
              </div>
            </div>
            
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredGames.map((game, index) => (
                  <div 
                    key={game.id} 
                    className={`transition-all duration-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <GameCard game={{...game, difficulty: game.difficulty as '简单' | '中等' | '困难', players: game.players as '单人' | '双人' | '多人'}} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredGames.map((game, index) => (
                  <div 
                    key={game.id} 
                    className={`transition-all duration-300 ${isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    <GameCard game={{...game, difficulty: game.difficulty as '简单' | '中等' | '困难', players: game.players as '单人' | '双人' | '多人'}} size="compact" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 特色功能区域 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="bg-white/90 backdrop-blur-md shadow-2xl border-0">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6">
                <CardHeader className="text-white p-0">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <Trophy className="h-6 w-6" />
                    🏆 成就系统
                  </CardTitle>
                </CardHeader>
              </div>
              <CardContent className="p-6">
                <p className="text-gray-700 mb-6 text-lg leading-relaxed">完成游戏挑战，解锁精美成就徽章，展示你的情感互动技能</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-purple-100 text-purple-800 border-purple-200 px-3 py-1">徽章收集</Badge>
                  <Badge variant="secondary" className="bg-pink-100 text-pink-800 border-pink-200 px-3 py-1">排行榜</Badge>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200 px-3 py-1">进度追踪</Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/90 backdrop-blur-md shadow-2xl border-0">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-6">
                <CardHeader className="text-white p-0">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <BarChart3 className="h-6 w-6" />
                    📊 数据分析
                  </CardTitle>
                </CardHeader>
              </div>
              <CardContent className="p-6">
                <p className="text-gray-700 mb-6 text-lg leading-relaxed">深入分析你的情感互动数据，了解进步轨迹和情感特点</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200 px-3 py-1">数据可视化</Badge>
                  <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200 px-3 py-1">成长追踪</Badge>
                  <Badge variant="secondary" className="bg-cyan-100 text-cyan-800 border-cyan-200 px-3 py-1">智能建议</Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/90 backdrop-blur-md shadow-2xl border-0">
              <div className="bg-gradient-to-r from-green-500 to-teal-500 p-6">
                <CardHeader className="text-white p-0">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <Users className="h-6 w-6" />
                    👥 社交互动
                  </CardTitle>
                </CardHeader>
              </div>
              <CardContent className="p-6">
                <p className="text-gray-700 mb-6 text-lg leading-relaxed">与朋友一起游戏，分享经验，建立更深的情感连接</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200 px-3 py-1">好友系统</Badge>
                  <Badge variant="secondary" className="bg-teal-100 text-teal-800 border-teal-200 px-3 py-1">分享功能</Badge>
                  <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 border-emerald-200 px-3 py-1">社区互动</Badge>
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