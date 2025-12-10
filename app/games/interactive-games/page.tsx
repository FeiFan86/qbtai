'use client'

import { useState, useEffect } from 'react'
import GlobalNavbar from '@/components/global-navbar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import UsageGuard, { UsageStatus } from '@/components/usage-guard'
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

  return (
    <UsageGuard feature="games">
      {({ canUse, remainingUses, onUse, isLoading, usageText }) => {
        // 在内部定义渲染游戏卡片的函数，可以访问canUse
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
                          <Button disabled={!canUse} className={'bg-gradient-to-r ' + game.color + ' hover:opacity-90 text-white border-0 text-sm px-4 py-1 disabled:opacity-50 disabled:cursor-not-allowed'}>
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
            // 网格视图
            return (
              <Card 
                key={game.id} 
                className={`overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group ${isLoaded ? 'animate-fadeIn' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`h-40 bg-gradient-to-r ${game.color} p-6 flex items-center justify-center relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10 transform scale-100 group-hover:scale-110 transition-transform duration-300">
                    {game.icon}
                  </div>
                  <div className="absolute top-2 right-2 flex gap-2">
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
                
                <CardContent className="p-5">
                  <CardHeader className="p-0 pb-3 mb-3">
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-lg text-gray-800 group-hover:text-purple-600 transition-colors duration-300">
                        {game.title}
                      </CardTitle>
                    </div>
                    <CardDescription className="text-sm text-gray-600">
                      {game.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        <span>{game.players}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Target className="h-3 w-3" />
                        <span>{game.difficulty}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-500" />
                      <span>{game.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {game.tags.slice(0, 2).map((tag: string, tagIndex: number) => (
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
                        <Button disabled={!canUse} className={'w-full bg-gradient-to-r ' + game.color + ' hover:opacity-90 text-white border-0 shadow-md disabled:opacity-50 disabled:cursor-not-allowed'}>
                          开始游戏
                        </Button>
                      </Link>
                    ) : (
                      <Button disabled className="w-full bg-gray-100 text-gray-400 border-0 shadow-md">
                        <Lock className="h-3 w-3 mr-1" />
                        即将上线
                      </Button>
                    )}
                  </div>
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
            
            <GlobalNavbar />
            
            <div className="relative z-10">
              {/* 页面头部 */}
              <div className="pt-20 pb-8 px-4 md:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <Link href="/games" className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors">
                        <ArrowLeft className="h-5 w-5" />
                        <span>返回游戏列表</span>
                      </Link>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <Button
                        variant={viewMode === 'grid' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setViewMode('grid')}
                        className="flex items-center gap-2"
                      >
                        <Grid3X3 className="h-4 w-4" />
                        <span className="hidden sm:inline">网格</span>
                      </Button>
                      <Button
                        variant={viewMode === 'list' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setViewMode('list')}
                        className="flex items-center gap-2"
                      >
                        <List className="h-4 w-4" />
                        <span className="hidden sm:inline">列表</span>
                      </Button>
                    </div>
                  </div>
                  
                  <div className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 mb-4">
                      互动游戏中心
                    </h1>
                    <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                      通过精心设计的互动游戏，增进感情深度，创造美好回忆。每一个游戏都融合了心理学原理和趣味体验。
                    </p>
                  </div>
                  
                  <div className="flex justify-center mb-8">
                    <UsageStatus feature="games" className="justify-center" />
                  </div>
                </div>
              </div>
              
              <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
                {/* 搜索和筛选区域 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-4 mb-6 border border-purple-100">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-purple-500" />
                      <input
                        type="text"
                        placeholder="搜索游戏名称、描述或标签..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4 text-purple-500" />
                      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
                        <TabsList className="grid grid-cols-4 sm:grid-cols-6 w-full sm:w-auto">
                          <TabsTrigger value="all" className="text-xs px-2 py-1">全部</TabsTrigger>
                          <TabsTrigger value="completed" className="text-xs px-2 py-1">已上线</TabsTrigger>
                          <TabsTrigger value="coming-soon" className="text-xs px-2 py-1">即将上线</TabsTrigger>
                          <TabsTrigger value="hot" className="text-xs px-2 py-1 hidden sm:flex">热门</TabsTrigger>
                          <TabsTrigger value="single" className="text-xs px-2 py-1 hidden md:flex">单人</TabsTrigger>
                          <TabsTrigger value="multi" className="text-xs px-2 py-1 hidden md:flex">多人</TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </div>
                  </div>
                </div>
                
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
                      <p className="text-gray-500">尝试调整搜索条件或筛选标签</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <style jsx>{`
              .animate-fadeIn {
                animation: fadeIn 0.6s ease-out forwards;
              }
              
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
            `}</style>
          </div>
        )
      }}
    </UsageGuard>
  )
}