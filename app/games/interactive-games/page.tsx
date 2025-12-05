'use client'

import { useState, useEffect } from 'react'
import GlobalNavbar from '@/components/global-navbar'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  ArrowLeft,
  TreePine,
  Gift,
  Palette,
  Dice6,
  Heart,
  MessageCircle,
  Users,
  Sparkles,
  Zap,
  Clock,
  Star,
  Trophy,
  Play,
  Target,
  Flame,
  Lock,
  CheckCircle,
  BarChart,
  Gamepad2,
  Eye,
  ThumbsUp,
  TrendingUp,
  Grid3X3,
  List,
  Filter,
  Search,
  Brain
} from 'lucide-react'
import Link from 'next/link'

export default function InteractiveGamesPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeTab, setActiveTab] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // 互动游戏数据
  const interactiveGames = [
    {
      id: 'emotion-tree-hole',
      title: '情感树洞',
      description: '匿名分享你的情感故事，获得温暖的回应和支持',
      longDescription: '在这个安全的情感空间中，你可以自由表达内心的喜怒哀乐，不需要担心被评判。这里有温暖的社区氛围，专业的情感建议，帮助你找到情感出口。',
      icon: <TreePine className="h-10 w-10 text-white" />,
      color: 'from-green-400 to-emerald-600',
      bgPattern: 'bg-gradient-to-br from-green-50 to-emerald-100',
      href: '/games/interactive-games/emotion-tree-hole',
      features: ['匿名分享', '情感交流', '温暖回应', '支持社区', '专业建议'],
      difficulty: '简单',
      players: '单人',
      status: 'completed',
      likes: 2340,
      plays: 5820,
      rating: 4.8,
      tags: ['情感', '匿名', '支持', '心理健康'],
      isNew: false,
      isHot: true,
      lastUpdated: '2024-01-15',
      author: 'AI情感助手团队'
    },
    {
      id: 'collaborative-doodle',
      title: '协作涂鸦板',
      description: '与朋友一起创作艺术作品，猜词游戏增进默契',
      longDescription: '通过绘画表达情感，与伴侣或朋友一起创作独特的艺术作品。多种绘画工具和情感主题选择，让创作过程充满乐趣和意义。',
      icon: <Palette className="h-10 w-10 text-white" />,
      color: 'from-purple-400 to-pink-600',
      bgPattern: 'bg-gradient-to-br from-purple-50 to-pink-100',
      href: '/games/interactive-games/collaborative-doodle',
      features: ['实时协作', '猜词游戏', '作品展示', '创意互动', '情感主题'],
      difficulty: '中等',
      players: '双人',
      status: 'completed',
      likes: 1890,
      plays: 3420,
      rating: 4.6,
      tags: ['创意', '协作', '艺术', '情侣互动'],
      isNew: false,
      isHot: false,
      lastUpdated: '2024-01-20',
      author: '创意开发团队'
    },
    {
      id: 'truth-or-dare',
      title: '真心话大冒险',
      description: '经典游戏情感版，增进朋友间的了解和信任',
      longDescription: '重新设计的真心话大冒险，融入情感元素。通过精心设计的问题和挑战，帮助你更深入了解朋友和伴侣，增进彼此的情感连接。',
      icon: <Heart className="h-10 w-10 text-white" />,
      color: 'from-red-400 to-rose-600',
      bgPattern: 'bg-gradient-to-br from-red-50 to-rose-100',
      href: '/games/interactive-games/truth-or-dare',
      features: ['多级难度', '自定义卡片', '多人游戏', '趣味挑战', '情感增进'],
      difficulty: '中等',
      players: '多人',
      status: 'completed',
      likes: 2150,
      plays: 4890,
      rating: 4.7,
      tags: ['社交', '挑战', '趣味', '团队建设'],
      isNew: false,
      isHot: true,
      lastUpdated: '2024-01-22',
      author: '社交游戏团队'
    },
    {
      id: 'relationship-chess',
      title: '关系飞行棋',
      description: '情感话题与挑战的棋盘游戏，深化关系互动',
      longDescription: '创新的飞行棋游戏，融入情感话题和关系挑战。每一步都是一次情感交流的机会，让游戏过程充满惊喜和深度对话。',
      icon: <Gamepad2 className="h-10 w-10 text-white" />,
      color: 'from-blue-400 to-indigo-600',
      bgPattern: 'bg-gradient-to-br from-blue-50 to-indigo-100',
      href: '/games/interactive-games/relationship-chess',
      features: ['双人游戏', '情感话题', '进度保存', '成就系统', '深度对话'],
      difficulty: '中等',
      players: '双人',
      status: 'completed',
      likes: 1420,
      plays: 2180,
      rating: 4.5,
      tags: ['策略', '关系', '互动', '深度交流'],
      isNew: false,
      isHot: false,
      lastUpdated: '2024-01-10',
      author: '关系研究团队'
    },
    {
      id: 'couple-blind-box',
      title: '情侣盲盒',
      description: '每日开启情侣互动主题盲盒，增进感情',
      longDescription: '专为情侣设计的互动盲盒游戏。每日精心准备的互动主题和任务，帮助你们发现彼此的新一面，创造更多美好回忆。',
      icon: <Gift className="h-10 w-10 text-white" />,
      color: 'from-pink-400 to-rose-600',
      bgPattern: 'bg-gradient-to-br from-pink-50 to-rose-100',
      href: '/games/interactive-games/couple-blind-box',
      features: ['每日盲盒', '情侣任务', '感情提升', '惊喜体验', '回忆创造'],
      difficulty: '简单',
      players: '双人',
      status: 'completed',
      likes: 2670,
      plays: 5430,
      rating: 4.9,
      tags: ['情侣', '日常', '惊喜', '感情培养'],
      isNew: false,
      isHot: true,
      lastUpdated: '2024-01-25',
      author: '情侣关系团队'
    },
    {
      id: 'memory-puzzle',
      title: '记忆拼图',
      description: '共同回忆收集，通过拼图游戏重温美好时光',
      longDescription: '通过有趣的拼图游戏收集和重温你们的美好回忆。考验记忆力的同时增进感情，让每一个回忆都成为你们感情的珍贵财富。',
      icon: <Brain className="h-10 w-10 text-white" />,
      color: 'from-cyan-400 to-blue-600',
      bgPattern: 'bg-gradient-to-br from-cyan-50 to-blue-100',
      href: '/games/interactive-games/memory-puzzle',
      features: ['回忆收集', '记忆力挑战', '情侣互动', '情感增进', '美好时光'],
      difficulty: '中等',
      players: '单人',
      status: 'completed',
      likes: 1980,
      plays: 3250,
      rating: 4.7,
      tags: ['记忆', '情侣', '互动', '情感'],
      isNew: true,
      isHot: true,
      lastUpdated: '2024-01-30',
      author: '情感记忆团队'
    },
    {
      id: 'tacit-challenge',
      title: '默契挑战',
      description: '情侣默契度测试，发现彼此的了解和关心',
      longDescription: '专门为情侣设计的默契度测试游戏，通过问答了解彼此，增进感情。专业的默契度分析和个性化建议，帮助你们更好地理解对方。',
      icon: <Heart className="h-10 w-10 text-white" />,
      color: 'from-pink-400 to-rose-600',
      bgPattern: 'bg-gradient-to-br from-pink-50 to-rose-100',
      href: '/games/interactive-games/tacit-challenge',
      features: ['默契测试', '情感分析', '个性化建议', '情侣互动', '关系增进'],
      difficulty: '中等',
      players: '双人',
      status: 'completed',
      likes: 2230,
      plays: 4560,
      rating: 4.8,
      tags: ['默契', '测试', '情侣', '情感分析'],
      isNew: true,
      isHot: true,
      lastUpdated: '2024-01-30',
      author: '关系研究团队'
    },
    {
      id: 'complaint-wall',
      title: '吐槽墙',
      description: '匿名吐槽释放压力，获得共鸣和建议',
      longDescription: '一个可以自由表达不满和压力的匿名空间。在这里你可以畅所欲言，获得理解、共鸣和实用的应对建议。',
      icon: <MessageCircle className="h-10 w-10 text-white" />,
      color: 'from-orange-400 to-amber-600',
      bgPattern: 'bg-gradient-to-br from-orange-50 to-amber-100',
      href: '/games/interactive-games/complaint-wall',
      features: ['匿名吐槽', '压力释放', '情感共鸣', '建议支持', '社区互助'],
      difficulty: '简单',
      players: '单人',
      status: 'coming-soon',
      likes: 0,
      plays: 0,
      rating: 0,
      tags: ['情感', '匿名', '支持', '压力管理'],
      isNew: true,
      isHot: false,
      lastUpdated: '2024-01-28',
      author: '心理健康团队'
    }
  ]

  // 分类筛选
  const filteredGames = interactiveGames.filter(game => {
    const matchesTab = activeTab === 'all' 
      ? true
      : activeTab === 'completed'
      ? game.status === 'completed'
      : activeTab === 'coming-soon'
      ? game.status === 'coming-soon'
      : activeTab === 'single'
      ? game.players === '单人'
      : activeTab === 'multi'
      ? game.players !== '单人'
      : activeTab === 'hot'
      ? game.isHot
      : true

    const matchesSearch = searchTerm === '' || 
      game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      game.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      game.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    return matchesTab && matchesSearch
  })

  const renderGameCard = (game: any, index: number) => {
    if (viewMode === 'list') {
      return (
        <Card 
          key={game.id} 
          className={`overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 mb-4 ${isLoaded ? 'animate-fadeIn' : 'opacity-0'}`}
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <div className="flex">
            <div className={`w-32 bg-gradient-to-r ${game.color} p-4 flex items-center justify-center`}>
              {game.icon}
            </div>
            <div className="flex-1 p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{game.title}</h3>
                  <p className="text-sm text-gray-600">{game.description}</p>
                </div>
                <div className="flex gap-2">
                  {game.isHot && (
                    <Badge className="bg-red-500 text-white border-0 text-xs">
                      <Flame className="h-3 w-3 mr-1" />
                      热门
                    </Badge>
                  )}
                  {game.isNew && (
                    <Badge className="bg-green-500 text-white border-0 text-xs">
                      <Sparkles className="h-3 w-3 mr-1" />
                      新品
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  <span>{game.players}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Target className="h-3 w-3" />
                  <span>{game.difficulty}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 text-yellow-500" />
                  <span>{game.rating.toFixed(1)}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-1 mb-3">
                {game.tags.slice(0, 3).map((tag: string, tagIndex: number) => (
                  <Badge key={tagIndex} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="h-3 w-3" />
                    <span>{game.likes > 0 ? game.likes.toLocaleString() : '-'}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Play className="h-3 w-3" />
                    <span>{game.plays > 0 ? game.plays.toLocaleString() : '-'}</span>
                  </div>
                </div>
                
                {game.status === 'completed' ? (
                  <Link href={game.href}>
                    <Button className={`bg-gradient-to-r ${game.color} hover:opacity-90 text-white border-0 text-sm px-4 py-1`}>
                      开始游戏
                    </Button>
                  </Link>
                ) : (
                  <Button disabled className="bg-gray-100 text-gray-400 border-0 text-sm px-4 py-1">
                    <Lock className="h-3 w-3 mr-1" />
                    即将上线
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Card>
      )
    } else {
      return (
        <Card 
          key={game.id} 
          className={`overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${isLoaded ? 'animate-fadeIn' : 'opacity-0'}`}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <CardHeader className={`bg-gradient-to-r ${game.color} p-6 relative`}>
            <div className="absolute top-4 right-4 flex gap-2">
              {game.isHot && (
                <Badge className="bg-red-500 text-white border-0 text-xs">
                  <Flame className="h-3 w-3 mr-1" />
                  热门
                </Badge>
              )}
              {game.isNew && (
                <Badge className="bg-green-500 text-white border-0 text-xs">
                  <Sparkles className="h-3 w-3 mr-1" />
                  新品
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                {game.icon}
              </div>
              <div className="flex-1">
                <CardTitle className="text-white text-xl">{game.title}</CardTitle>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-1 text-white/80 text-sm">
                    <Users className="h-3 w-3" />
                    <span>{game.players}</span>
                  </div>
                  <div className="flex items-center gap-1 text-white/80 text-sm">
                    <Target className="h-3 w-3" />
                    <span>{game.difficulty}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className={`p-6 ${game.bgPattern}`}>
            <CardDescription className="text-gray-700 mb-4 text-sm leading-relaxed">
              {game.description}
            </CardDescription>
            
            <div className="flex flex-wrap gap-1 mb-4">
              {game.tags.map((tag: string, tagIndex: number) => (
                <Badge key={tagIndex} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <div className="grid grid-cols-3 gap-2 mb-4 text-center text-sm">
              <div className="bg-white/50 backdrop-blur-sm rounded-lg p-2">
                <div className="flex items-center justify-center gap-1 text-pink-600">
                  <ThumbsUp className="h-3 w-3" />
                  <span className="font-semibold">{game.likes > 0 ? game.likes.toLocaleString() : '-'}</span>
                </div>
                <div className="text-xs text-gray-600">点赞</div>
              </div>
              <div className="bg-white/50 backdrop-blur-sm rounded-lg p-2">
                <div className="flex items-center justify-center gap-1 text-blue-600">
                  <Play className="h-3 w-3" />
                  <span className="font-semibold">{game.plays > 0 ? game.plays.toLocaleString() : '-'}</span>
                </div>
                <div className="text-xs text-gray-600">游戏次数</div>
              </div>
              <div className="bg-white/50 backdrop-blur-sm rounded-lg p-2">
                <div className="flex items-center justify-center gap-1 text-yellow-600">
                  <Star className="h-3 w-3" />
                  <span className="font-semibold">{game.rating > 0 ? game.rating.toFixed(1) : '-'}</span>
                </div>
                <div className="text-xs text-gray-600">评分</div>
              </div>
            </div>
            
            {game.status === 'completed' ? (
              <Link href={game.href}>
                <Button className={`w-full bg-gradient-to-r ${game.color} hover:opacity-90 text-white border-0 shadow-md`}>
                  <Play className="h-4 w-4 mr-2" />
                  开始游戏
                </Button>
              </Link>
            ) : (
              <Button disabled className="w-full bg-gray-100 text-gray-400 border-0">
                <Lock className="h-4 w-4 mr-2" />
                即将上线
              </Button>
            )}
          </CardContent>
        </Card>
      )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* 增强背景装饰元素 */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-100/20 via-purple-100/20 to-pink-100/20"></div>
      <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-violet-300/30 to-purple-300/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-pink-300/30 to-rose-300/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-r from-blue-300/20 to-cyan-300/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-gradient-to-r from-green-300/20 to-emerald-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 relative z-10">
        <div className="mb-8">
          <Link href="/games" className="inline-flex items-center gap-2 text-violet-600 hover:text-violet-800 transition-colors mb-6 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm">
            <ArrowLeft className="h-4 w-4" />
            🎮 返回游戏中心
          </Link>
          
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center mb-6 p-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-2xl">
              <Gamepad2 className="h-14 w-14 text-white" />
            </div>
            <h1 className="text-6xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent">
              互动游戏集合
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto bg-white/80 backdrop-blur-sm px-8 py-4 rounded-xl shadow-lg">
              🎯 探索精心设计的情感互动游戏，与朋友或伴侣一起创造美好回忆，深化彼此的情感连接
            </p>
          </div>
        </div>

        {/* 统计数据展示 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          <Card className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-xl border-0 hover:scale-105 transition-all duration-300">
            <CardContent className="p-0 text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">{interactiveGames.filter(g => g.status === 'completed').length}</div>
              <div className="text-sm font-medium text-gray-700">🎯 已上线游戏</div>
              <div className="text-xs text-gray-500 mt-1">持续更新中</div>
            </CardContent>
          </Card>
          <Card className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-xl border-0 hover:scale-105 transition-all duration-300">
            <CardContent className="p-0 text-center">
              <div className="text-4xl font-bold text-pink-600 mb-2">{interactiveGames.filter(g => g.isHot).length}</div>
              <div className="text-sm font-medium text-gray-700">🔥 热门游戏</div>
              <div className="text-xs text-gray-500 mt-1">用户最爱</div>
            </CardContent>
          </Card>
          <Card className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-xl border-0 hover:scale-105 transition-all duration-300">
            <CardContent className="p-0 text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">
                {interactiveGames.reduce((sum, game) => sum + game.likes, 0).toLocaleString()}
              </div>
              <div className="text-sm font-medium text-gray-700">❤️ 总点赞数</div>
              <div className="text-xs text-gray-500 mt-1">社区认可</div>
            </CardContent>
          </Card>
          <Card className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-xl border-0 hover:scale-105 transition-all duration-300">
            <CardContent className="p-0 text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">
                {interactiveGames.reduce((sum, game) => sum + game.plays, 0).toLocaleString()}
              </div>
              <div className="text-sm font-medium text-gray-700">👥 总游戏次数</div>
              <div className="text-xs text-gray-500 mt-1">活跃参与</div>
            </CardContent>
          </Card>
        </div>

        {/* 搜索和筛选控制 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-2 flex-1">
              <Search className="h-4 w-4 text-gray-500" />
              <input
                type="text"
                placeholder="搜索游戏名称、描述或标签..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">视图:</span>
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="p-2"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="p-2"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* 游戏分类标签 */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-6 bg-white/80 backdrop-blur-sm">
            <TabsTrigger value="all" className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700">
              全部
            </TabsTrigger>
            <TabsTrigger value="completed" className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700">
              已上线
            </TabsTrigger>
            <TabsTrigger value="coming-soon" className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700">
              即将上线
            </TabsTrigger>
            <TabsTrigger value="single" className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700">
              单人
            </TabsTrigger>
            <TabsTrigger value="multi" className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700">
              多人
            </TabsTrigger>
            <TabsTrigger value="hot" className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700">
              🔥 热门
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* 游戏展示区域 */}
        <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8" : "mb-8"}>
          {filteredGames.length > 0 ? (
            filteredGames.map((game, index) => renderGameCard(game, index))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-xl font-medium text-gray-600 mb-2">没有找到相关游戏</h3>
              <p className="text-gray-500">尝试调整搜索词或筛选条件</p>
            </div>
          )}
        </div>

        {/* 特色功能介绍 */}
        <Card className="bg-gradient-to-r from-purple-100 to-pink-100 border-0 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-center text-2xl text-purple-800">
              <Sparkles className="inline-block h-6 w-6 mr-2" />
              特色功能
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-200 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Trophy className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-purple-800 mb-2">成就系统</h3>
                <p className="text-sm text-gray-700">完成游戏挑战，解锁专属成就徽章，记录你的成长历程</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-pink-200 rounded-full flex items-center justify-center mx-auto mb-3">
                  <BarChart className="h-8 w-8 text-pink-600" />
                </div>
                <h3 className="font-semibold text-pink-800 mb-2">数据分析</h3>
                <p className="text-sm text-gray-700">深入了解你的情感模式，获得个性化的改善建议</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-200 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="font-semibold text-indigo-800 mb-2">社交互动</h3>
                <p className="text-sm text-gray-700">与朋友一起玩游戏，增进彼此了解，建立更深的情感连接</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      
      <Footer />
      
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  )
}