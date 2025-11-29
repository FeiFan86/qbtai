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
  Heart
} from 'lucide-react'
import Link from 'next/link'

export default function GamesPage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const games = [
    {
      id: 'conversation-challenge',
      title: '情景对话挑战',
      description: '测试情商水平，学会应对各种社交情境',
      icon: <MessageCircle className="h-8 w-8 text-blue-500" />,
      color: 'from-blue-400 to-blue-600',
      href: '/games/conversation-challenge',
      features: ['情商测试', '分数排行', '每日挑战', '成就系统'],
      difficulty: '中等',
      players: '单人'
    },
    {
      id: 'personality-analysis',
      title: '情感性格分析',
      description: '了解你的情感气质类型和社交风格',
      icon: <Brain className="h-8 w-8 text-purple-500" />,
      color: 'from-purple-400 to-purple-600',
      href: '/games/personality-analysis',
      features: ['性格测试', '结果分析', '个性化建议', '分享卡片'],
      difficulty: '简单',
      players: '单人'
    },
    {
      id: 'interactive-games',
      title: '互动游戏集合',
      description: '多种创意互动游戏，体验情感交流乐趣',
      icon: <Gamepad2 className="h-8 w-8 text-pink-500" />,
      color: 'from-pink-400 to-pink-600',
      href: '/games/interactive-games',
      features: ['情感盲盒', '协作涂鸦', '情感树洞', '真心话大冒险'],
      difficulty: '多样',
      players: '单人/双人'
    }
  ]

  const miniGames = [
    {
      icon: <Gift className="h-6 w-6 text-pink-400" />,
      title: '情感盲盒',
      description: '每日开启情感主题盲盒'
    },
    {
      icon: <Palette className="h-6 w-6 text-blue-400" />,
      title: '协作涂鸦',
      description: '双人绘画猜情感'
    },
    {
      icon: <TreePine className="h-6 w-6 text-green-400" />,
      title: '情感树洞',
      description: '匿名分享情感故事'
    },
    {
      icon: <Dice6 className="h-6 w-6 text-purple-400" />,
      title: '关系飞行棋',
      description: '朋友情侣互动游戏'
    },
    {
      icon: <Heart className="h-6 w-6 text-red-400" />,
      title: '真心话大冒险',
      description: '情感深度探索'
    }
  ]

  const upcomingFeatures = [
    '社交排行榜即将上线',
    '好友对战系统开发中',
    '成就徽章系统',
    '游戏数据统计'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-pink-50 to-purple-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-6xl">
          {/* 页面标题 */}
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              情感互动游戏
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 block md:inline">
                中心
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              通过有趣的游戏和互动，提升情商能力，探索情感世界
            </p>
          </div>

          <Tabs defaultValue="featured" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
              <TabsTrigger value="featured" className="flex items-center gap-2">
                <Star className="h-4 w-4" />
                精选游戏
              </TabsTrigger>
              <TabsTrigger value="conversation" className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                对话挑战
              </TabsTrigger>
              <TabsTrigger value="personality" className="flex items-center gap-2">
                <Brain className="h-4 w-4" />
                性格分析
              </TabsTrigger>
              <TabsTrigger value="interactive" className="flex items-center gap-2">
                <Gamepad2 className="h-4 w-4" />
                互动游戏
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="featured" className="space-y-8">
              {/* 主游戏卡片 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {games.map((game, index) => (
                  <Card key={game.id} className={`group hover:shadow-xl transition-all duration-500 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                    style={{ transitionDelay: `${index * 150}ms` }}
                  >
                    <div className={`h-2 bg-gradient-to-r ${game.color} rounded-t-lg`}></div>
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`p-2 rounded-lg bg-gradient-to-br ${game.color} bg-opacity-10`}>
                          {game.icon}
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-xl">{game.title}</CardTitle>
                          <div className="flex gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {game.difficulty}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {game.players}
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
                        <Link href={game.href}>
                          <Button className="w-full group-hover:shadow-md transition-shadow">
                            开始游戏
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* 迷你游戏展示 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gamepad2 className="h-5 w-5 text-purple-500" />
                    迷你游戏集合
                  </CardTitle>
                  <CardDescription>
                    丰富多样的情感互动小游戏，随时体验情感交流的乐趣
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {miniGames.map((game, index) => (
                      <div key={index} className="text-center p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                        <div className="flex justify-center mb-2">{game.icon}</div>
                        <h3 className="text-sm font-medium">{game.title}</h3>
                        <p className="text-xs text-gray-500 mt-1">{game.description}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 text-center">
                    <Link href="/games/interactive-games">
                      <Button variant="outline" className="px-6">
                        探索全部互动游戏
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="conversation" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-6 w-6 text-blue-500" />
                    情景对话挑战
                  </CardTitle>
                  <CardDescription>
                    测试你的情商水平，学会应对各种社交情境
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">游戏特色</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <Trophy className="h-4 w-4 text-yellow-500" />
                          <span>情商测试评分系统</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-blue-500" />
                          <span>好友排行榜竞争</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-purple-500" />
                          <span>每日挑战获取成就徽章</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <MessageCircle className="h-4 w-4 text-green-500" />
                          <span>多样化社交情境场景</span>
                        </li>
                      </ul>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">游戏场景</h3>
                      <div className="space-y-3">
                        <Badge variant="outline" className="w-full justify-start">职场人际关系处理</Badge>
                        <Badge variant="outline" className="w-full justify-start">恋爱情感交流</Badge>
                        <Badge variant="outline" className="w-full justify-start">家庭沟通技巧</Badge>
                        <Badge variant="outline" className="w-full justify-start">朋友社交互动</Badge>
                        <Badge variant="outline" className="w-full justify-start">冲突解决策略</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <Link href="/games/conversation-challenge">
                      <Button size="lg" className="px-8">
                        开始挑战
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="personality" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-6 w-6 text-purple-500" />
                    情感性格分析
                  </CardTitle>
                  <CardDescription>
                    了解你的情感气质类型和社交风格
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">分析类型</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <Heart className="h-4 w-4 text-red-500" />
                          <span>情感气质类型分析</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-blue-500" />
                          <span>社交能量画像测试</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <MessageCircle className="h-4 w-4 text-green-500" />
                          <span>情感语言偏好评估</span>
                        </li>
                      </ul>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">结果特色</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span>个性化情感画像</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Trophy className="h-4 w-4 text-purple-500" />
                          <span>详细结果解析</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Gamepad2 className="h-4 w-4 text-pink-500" />
                          <span>社交建议指导</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="text-center">
                    <Link href="/games/personality-analysis">
                      <Button size="lg" className="px-8">
                        开始分析
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="interactive" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gamepad2 className="h-6 w-6 text-pink-500" />
                    互动游戏集合
                  </CardTitle>
                  <CardDescription>
                    多种创意互动游戏，体验情感交流乐趣
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {miniGames.map((game, index) => (
                      <div key={index} className="text-center p-4 border rounded-lg hover:shadow-md transition-shadow">
                        <div className="flex justify-center mb-3">{game.icon}</div>
                        <h3 className="font-medium mb-1">{game.title}</h3>
                        <p className="text-xs text-gray-500">{game.description}</p>
                      </div>
                    ))}
                  </div>
                  <div className="text-center">
                    <Link href="/games/interactive-games">
                      <Button size="lg" className="px-8">
                        探索全部游戏
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* 即将上线的功能 */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>即将上线的功能</CardTitle>
              <CardDescription>我们正在开发更多有趣的功能</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {upcomingFeatures.map((feature, index) => (
                  <Badge key={index} variant="outline" className="text-sm">
                    {feature}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}