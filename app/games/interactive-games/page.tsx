'use client'

import { useState, useEffect } from 'react'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowLeft, 
  Gift, 
  Palette, 
  TreePine, 
  Dice6,
  Heart,
  Star,
  Users,
  MessageCircle,
  Clock,
  Sparkles
} from 'lucide-react'
import Link from 'next/link'

const miniGames = [
  {
    id: 'emotion-box',
    title: '情感盲盒',
    description: '每日开启情感主题盲盒，收集精美内容和奖励',
    icon: <Gift className="h-10 w-10 text-pink-500" />,
    color: 'from-pink-400 to-pink-600',
    bgClass: 'bg-gradient-to-br from-pink-50 to-pink-100',
    features: ['每日免费开启', '稀有度收集', '内容分享', '成就系统'],
    players: '单人',
    time: '5分钟',
    status: 'coming-soon'
  },
  {
    id: 'collaborative-doodle',
    title: '协作涂鸦板',
    description: '与好友一起绘画猜情感，体验艺术与情感的结合',
    icon: <Palette className="h-10 w-10 text-blue-500" />,
    color: 'from-blue-400 to-blue-600',
    bgClass: 'bg-gradient-to-br from-blue-50 to-blue-100',
    features: ['实时绘画', '好友互动', '作品展示', '情感主题'],
    players: '双人',
    time: '10-20分钟',
    status: 'coming-soon'
  },
  {
    id: 'emotion-tree-hole',
    title: '情感树洞',
    description: '匿名分享情感故事，获得温暖回应和支持',
    icon: <TreePine className="h-10 w-10 text-green-500" />,
    color: 'from-green-400 to-green-600',
    bgClass: 'bg-gradient-to-br from-green-50 to-green-100',
    features: ['匿名分享', '温暖回应', '情感分类', '安全空间'],
    players: '单人',
    time: '不限',
    status: 'available'
  },
  {
    id: 'relationship-snakes',
    title: '关系飞行棋',
    description: '朋友或情侣一起玩的情感主题棋盘游戏',
    icon: <Dice6 className="h-10 w-10 text-purple-500" />,
    color: 'from-purple-400 to-purple-600',
    bgClass: 'bg-gradient-to-br from-purple-50 to-purple-100',
    features: ['双人游戏', '情感话题', '互动任务', '增进关系'],
    players: '双人',
    time: '20-30分钟',
    status: 'coming-soon'
  },
  {
    id: 'truth-dare-emotion',
    title: '真心话大冒险情感版',
    description: '情感深度探索，增进彼此了解的趣味游戏',
    icon: <Heart className="h-10 w-10 text-red-500" />,
    color: 'from-red-400 to-red-600',
    bgClass: 'bg-gradient-to-br from-red-50 to-red-100',
    features: ['情感探索', '深度对话', '多级难度', '自定义卡片'],
    players: '2-6人',
    time: '30-60分钟',
    status: 'coming-soon'
  }
]

export default function InteractiveGamesPage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return <Badge className="bg-green-100 text-green-800 border-green-200">已上线</Badge>
      case 'coming-soon':
        return <Badge variant="outline" className="text-gray-500">即将上线</Badge>
      default:
        return <Badge variant="secondary">开发中</Badge>
    }
  }

  const getActionButton = (status: string, id: string) => {
    switch (status) {
      case 'available':
        return (
          <Link href={`/games/interactive-games/${id}`}>
            <Button className="w-full">
              开始游戏
            </Button>
          </Link>
        )
      case 'coming-soon':
        return (
          <Button disabled className="w-full">
            即将上线
          </Button>
        )
      default:
        return (
          <Button variant="outline" disabled className="w-full">
            开发中
          </Button>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-pink-50 to-purple-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6">
            <Link href="/games">
              <Button variant="outline" className="mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                返回游戏中心
              </Button>
            </Link>
          </div>
          
          {/* 页面标题 */}
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              互动游戏集合
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 block md:inline">
                中心
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              丰富多样的情感互动游戏，让你在趣味中提升情商，增进人际关系
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* 游戏统计 */}
            <Card className="bg-gradient-to-br from-purple-50 to-indigo-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-purple-500" />
                  游戏统计
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>总游戏数</span>
                  <span className="font-bold text-purple-600">{miniGames.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>已上线</span>
                  <span className="font-bold text-green-600">
                    {miniGames.filter(g => g.status === 'available').length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>即将上线</span>
                  <span className="font-bold text-blue-600">
                    {miniGames.filter(g => g.status === 'coming-soon').length}
                  </span>
                </div>
              </CardContent>
            </Card>
            
            {/* 游戏说明 */}
            <Card className="bg-gradient-to-br from-pink-50 to-purple-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-pink-500" />
                  游戏特色
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">单人/多人模式</p>
                    <p className="text-xs text-gray-600">支持独自体验或好友互动</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MessageCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">情感主题设计</p>
                    <p className="text-xs text-gray-600">基于情商理论科学设计</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-purple-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">灵活时间安排</p>
                    <p className="text-xs text-gray-600">5分钟到1小时不等的游戏时长</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* 游戏列表 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {miniGames.map((game, index) => (
              <Card key={game.id} className={`group hover:shadow-xl transition-all duration-500 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className={`h-2 bg-gradient-to-r ${game.color} rounded-t-lg`}></div>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-3 rounded-lg ${game.bgClass}`}>
                      {game.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle className="text-xl">{game.title}</CardTitle>
                        {getStatusBadge(game.status)}
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="outline" className="text-xs">
                          {game.players}
                        </Badge>
                        <Badge variant="outline" className="text-xs flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {game.time}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <CardDescription>{game.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {game.features.map((feature, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    {getActionButton(game.status, game.id)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* 即将上线的功能说明 */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle>即将上线的游戏功能</CardTitle>
              <CardDescription>
                我们正在努力开发更多有趣的功能，敬请期待
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="font-semibold">游戏体验优化</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <span>好友对战系统</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                      <span>成就徽章收集</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-pink-500"></div>
                      <span>游戏排行榜</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold">社交功能增强</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span>游戏分享功能</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                      <span>协作模式</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      <span>游戏社区</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}