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
  ThumbsUp
} from 'lucide-react'
import Link from 'next/link'

export default function InteractiveGamesPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeTab, setActiveTab] = useState('all')

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // 互动游戏数据
  const interactiveGames = [
    {
      id: 'emotion-tree-hole',
      title: '情感树洞',
      description: '匿名分享你的情感故事，获得温暖的回应和支持',
      icon: <TreePine className="h-10 w-10 text-white" />,
      color: 'from-green-400 to-emerald-600',
      bgPattern: 'bg-gradient-to-br from-green-50 to-emerald-100',
      href: '/games/interactive-games/emotion-tree-hole',
      features: ['匿名分享', '情感交流', '温暖回应', '支持社区'],
      difficulty: '简单',
      players: '单人',
      status: 'completed',
      likes: 2340,
      plays: 5820,
      rating: 4.8,
      tags: ['情感', '匿名', '支持'],
      isNew: false,
      isHot: true
    },
    {
      id: 'collaborative-doodle',
      title: '协作涂鸦板',
      description: '与朋友一起创作艺术作品，猜词游戏增进默契',
      icon: <Palette className="h-10 w-10 text-white" />,
      color: 'from-purple-400 to-pink-600',
      bgPattern: 'bg-gradient-to-br from-purple-50 to-pink-100',
      href: '/games/interactive-games/collaborative-doodle',
      features: ['实时协作', '猜词游戏', '作品展示', '创意互动'],
      difficulty: '中等',
      players: '双人',
      status: 'completed',
      likes: 1890,
      plays: 3420,
      rating: 4.6,
      tags: ['创意', '协作', '艺术'],
      isNew: false,
      isHot: false
    },
    {
      id: 'truth-or-dare',
      title: '真心话大冒险',
      description: '经典游戏情感版，增进朋友间的了解和信任',
      icon: <Heart className="h-10 w-10 text-white" />,
      color: 'from-red-400 to-rose-600',
      bgPattern: 'bg-gradient-to-br from-red-50 to-rose-100',
      href: '/games/interactive-games/truth-or-dare',
      features: ['多级难度', '自定义卡片', '多人游戏', '趣味挑战'],
      difficulty: '中等',
      players: '多人',
      status: 'completed',
      likes: 2150,
      plays: 4890,
      rating: 4.7,
      tags: ['社交', '挑战', '趣味'],
      isNew: false,
      isHot: true
    },
    {
      id: 'relationship-chess',
      title: '关系飞行棋',
      description: '情感话题与挑战的棋盘游戏，深化关系互动',
      icon: <Gamepad2 className="h-10 w-10 text-white" />,
      color: 'from-blue-400 to-indigo-600',
      bgPattern: 'bg-gradient-to-br from-blue-50 to-indigo-100',
      href: '/games/interactive-games/relationship-chess',
      features: ['双人游戏', '情感话题', '进度保存', '成就系统'],
      difficulty: '中等',
      players: '双人',
      status: 'completed',
      likes: 1420,
      plays: 2180,
      rating: 4.5,
      tags: ['策略', '关系', '互动'],
      isNew: false,
      isHot: false
    },
    {
      id: 'couple-blind-box',
      title: '情侣盲盒',
      description: '每日开启情侣互动主题盲盒，增进感情',
      icon: <Gift className="h-10 w-10 text-white" />,
      color: 'from-pink-400 to-rose-600',
      bgPattern: 'bg-gradient-to-br from-pink-50 to-rose-100',
      href: '/games/interactive-games/couple-blind-box',
      features: ['每日盲盒', '情侣任务', '感情提升', '惊喜体验'],
      difficulty: '简单',
      players: '双人',
      status: 'completed',
      likes: 2670,
      plays: 5430,
      rating: 4.9,
      tags: ['情侣', '日常', '惊喜'],
      isNew: false,
      isHot: true
    },
    {
      id: 'complaint-wall',
      title: '吐槽墙',
      description: '匿名吐槽释放压力，获得共鸣和建议',
      icon: <MessageCircle className="h-10 w-10 text-white" />,
      color: 'from-orange-400 to-amber-600',
      bgPattern: 'bg-gradient-to-br from-orange-50 to-amber-100',
      href: '/games/interactive-games/complaint-wall',
      features: ['匿名吐槽', '压力释放', '情感共鸣', '建议支持'],
      difficulty: '简单',
      players: '单人',
      status: 'coming-soon',
      likes: 0,
      plays: 0,
      rating: 0,
      tags: ['情感', '匿名', '支持'],
      isNew: true,
      isHot: false
    }
  ]

  // 分类筛选
  const filteredGames = activeTab === 'all' 
    ? interactiveGames 
    : activeTab === 'completed'
    ? interactiveGames.filter(game => game.status === 'completed')
    : activeTab === 'coming-soon'
    ? interactiveGames.filter(game => game.status === 'coming-soon')
    : activeTab === 'single'
    ? interactiveGames.filter(game => game.players === '单人')
    : activeTab === 'multi'
    ? interactiveGames.filter(game => game.players !== '单人')
    : interactiveGames

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/games" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 transition-colors mb-6">
            <ArrowLeft className="h-4 w-4" />
            返回游戏中心
          </Link>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
              互动游戏集合
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              探索精心设计的情感互动游戏，与朋友或伴侣一起创造美好回忆，深化彼此的情感连接
            </p>
          </div>
        </div>

        {/* 统计数据展示 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{interactiveGames.filter(g => g.status === 'completed').length}</div>
              <div className="text-sm text-gray-600">已上线游戏</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-pink-600">{interactiveGames.filter(g => g.isHot).length}</div>
              <div className="text-sm text-gray-600">热门游戏</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-indigo-600">
                {interactiveGames.reduce((sum, game) => sum + game.likes, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">总点赞数</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {interactiveGames.reduce((sum, game) => sum + game.plays, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">总游戏次数</div>
            </CardContent>
          </Card>
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

        {/* 游戏卡片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredGames.map((game, index) => (
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
                  {game.tags.map((tag, tagIndex) => (
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
          ))}
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