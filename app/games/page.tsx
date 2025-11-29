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
  TrendingUp
} from 'lucide-react'
import Link from 'next/link'

export default function GamesPage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const mainGames = [
    {
      id: 'conversation-challenge',
      title: '情景对话挑战',
      description: '测试情商水平，学会应对各种社交情境',
      icon: <MessageCircle className="h-10 w-10 text-white" />,
      color: 'from-blue-500 to-blue-700',
      bgPattern: 'bg-gradient-to-br from-blue-50 to-indigo-100',
      href: '/games/conversation-challenge',
      features: ['情商测试', '分数排行', '每日挑战', '成就系统'],
      difficulty: '中等',
      players: '单人',
      gradient: 'from-blue-400 via-blue-500 to-blue-600',
      shadowColor: 'shadow-blue-200'
    },
    {
      id: 'personality-analysis',
      title: '情感性格分析',
      description: '了解你的情感气质类型和社交风格',
      icon: <Brain className="h-10 w-10 text-white" />,
      color: 'from-purple-500 to-purple-700',
      bgPattern: 'bg-gradient-to-br from-purple-50 to-pink-100',
      href: '/games/personality-analysis',
      features: ['性格测试', '结果分析', '个性化建议', '分享卡片'],
      difficulty: '简单',
      players: '单人',
      gradient: 'from-purple-400 via-purple-500 to-purple-600',
      shadowColor: 'shadow-purple-200'
    }
  ]

  const interactiveGames = [
    {
      id: 'emotion-tree-hole',
      title: '情感树洞',
      description: '匿名分享你的情感故事，获得温暖的回应',
      icon: <TreePine className="h-8 w-8 text-white" />,
      color: 'from-green-500 to-green-700',
      bgPattern: 'bg-gradient-to-br from-green-50 to-emerald-100',
      href: '/games/interactive-games/emotion-tree-hole',
      features: ['匿名分享', '情感交流', '温暖回应', '支持社区'],
      difficulty: '简单',
      players: '单人',
      gradient: 'from-green-400 via-green-500 to-green-600',
      shadowColor: 'shadow-green-200'
    },
    {
      id: 'couple-blind-box',
      title: '情侣盲盒',
      description: '每日开启情侣互动主题盲盒，增进感情',
      icon: <Gift className="h-8 w-8 text-white" />,
      color: 'from-pink-500 to-pink-700',
      bgPattern: 'bg-gradient-to-br from-pink-50 to-rose-100',
      href: '/games/interactive-games/couple-blind-box',
      features: ['每日盲盒', '情侣任务', '感情提升', '惊喜体验'],
      difficulty: '简单',
      players: '双人',
      gradient: 'from-pink-400 via-pink-500 to-pink-600',
      shadowColor: 'shadow-pink-200'
    },
    {
      id: 'collaborative-doodle',
      title: '协作涂鸦',
      description: '双人一起绘画，表达情感，增进默契',
      icon: <Palette className="h-8 w-8 text-white" />,
      color: 'from-blue-500 to-blue-700',
      bgPattern: 'bg-gradient-to-br from-blue-50 to-cyan-100',
      href: '/games/interactive-games/collaborative-doodle',
      features: ['双人绘画', '情感表达', '创意涂鸦', '默契测试'],
      difficulty: '中等',
      players: '双人',
      gradient: 'from-blue-400 via-blue-500 to-blue-600',
      shadowColor: 'shadow-blue-200'
    },
    {
      id: 'complaint-wall',
      title: '吐槽墙',
      description: '匿名吐槽生活烦恼，释放压力',
      icon: <MessageSquare className="h-8 w-8 text-white" />,
      color: 'from-orange-500 to-orange-700',
      bgPattern: 'bg-gradient-to-br from-orange-50 to-amber-100',
      href: '/games/interactive-games/complaint-wall',
      features: ['匿名吐槽', '情绪释放', '压力缓解', '共鸣交流'],
      difficulty: '简单',
      players: '单人',
      gradient: 'from-orange-400 via-orange-500 to-orange-600',
      shadowColor: 'shadow-orange-200'
    },
    {
      id: 'relationship-chess',
      title: '关系飞行棋',
      description: '情侣专属互动棋盘游戏，增进了解',
      icon: <Dice6 className="h-8 w-8 text-white" />,
      color: 'from-purple-500 to-purple-700',
      bgPattern: 'bg-gradient-to-br from-purple-50 to-indigo-100',
      href: '/games/interactive-games/relationship-chess',
      features: ['互动棋盘', '情侣专属', '增进了解', '趣味挑战'],
      difficulty: '中等',
      players: '双人',
      gradient: 'from-purple-400 via-purple-500 to-purple-600',
      shadowColor: 'shadow-purple-200'
    },
    {
      id: 'truth-or-dare',
      title: '真心话大冒险',
      description: '情感深度探索游戏，增进亲密关系',
      icon: <Heart className="h-8 w-8 text-white" />,
      color: 'from-red-500 to-red-700',
      bgPattern: 'bg-gradient-to-br from-red-50 to-rose-100',
      href: '/games/interactive-games/truth-or-dare',
      features: ['真心话', '大冒险', '情感探索', '亲密互动'],
      difficulty: '多样',
      players: '多人',
      gradient: 'from-red-400 via-red-500 to-red-600',
      shadowColor: 'shadow-red-200'
    }
  ]

  const upcomingFeatures = [
    '社交排行榜即将上线',
    '好友对战系统开发中',
    '成就徽章系统',
    '游戏数据统计'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-6xl">
          {/* 页面标题 */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center mb-6 p-3 bg-white rounded-full shadow-lg">
              <Gamepad2 className="h-10 w-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
              情感互动
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 block md:inline">
                游戏世界
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
              通过有趣的游戏和互动，提升情商能力，探索情感世界
            </p>
            
            {/* 统计数据 */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="bg-white rounded-lg px-4 py-2 shadow-sm">
                <div className="text-2xl font-bold text-purple-600">8</div>
                <div className="text-xs text-gray-500">互动游戏</div>
              </div>
              <div className="bg-white rounded-lg px-4 py-2 shadow-sm">
                <div className="text-2xl font-bold text-pink-600">1000+</div>
                <div className="text-xs text-gray-500">趣味任务</div>
              </div>
              <div className="bg-white rounded-lg px-4 py-2 shadow-sm">
                <div className="text-2xl font-bold text-blue-600">4.8</div>
                <div className="text-xs text-gray-500">用户评分</div>
              </div>
            </div>
          </div>

          <Tabs defaultValue="featured" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 bg-white/80 backdrop-blur-sm shadow-md p-1 rounded-lg">
              <TabsTrigger value="featured" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white rounded-md transition-all">
                <Star className="h-4 w-4" />
                精选游戏
              </TabsTrigger>
              <TabsTrigger value="conversation" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white rounded-md transition-all">
                <MessageCircle className="h-4 w-4" />
                对话挑战
              </TabsTrigger>
              <TabsTrigger value="personality" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white rounded-md transition-all">
                <Brain className="h-4 w-4" />
                性格分析
              </TabsTrigger>
              <TabsTrigger value="interactive" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white rounded-md transition-all">
                <Gamepad2 className="h-4 w-4" />
                互动游戏
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="featured" className="space-y-8">
              {/* 主游戏卡片 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {mainGames.map((game, index) => (
                  <div key={game.id} className={`relative group ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                    style={{ transitionDelay: `${index * 150}ms` }}
                  >
                    <div className={`absolute -inset-0.5 bg-gradient-to-r ${game.gradient} rounded-2xl opacity-75 group-hover:opacity-100 blur transition duration-1000 group-hover:duration-200`}></div>
                    <div className="relative bg-white rounded-2xl p-1">
                      <div className={`${game.bgPattern} rounded-2xl p-6 h-full flex flex-col`}>
                        <div className="flex items-center gap-4 mb-4">
                          <div className={`p-3 rounded-xl bg-gradient-to-r ${game.color} shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105`}>
                            {game.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-800 mb-1">{game.title}</h3>
                            <div className="flex gap-2">
                              <Badge variant="outline" className="text-xs bg-white/80">
                                {game.difficulty}
                              </Badge>
                              <Badge variant="outline" className="text-xs bg-white/80">
                                {game.players}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 mb-6 flex-grow">{game.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-6">
                          {game.features.map((feature, i) => (
                            <Badge key={i} variant="secondary" className="text-xs bg-white/80">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                        
                        <Link href={game.href}>
                          <Button className={`w-full bg-gradient-to-r ${game.gradient} hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] text-white font-medium group-hover:shadow-xl`}>
                            开始游戏
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* 互动游戏展示 */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white">
                    <Gamepad2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">互动游戏集合</h3>
                    <p className="text-sm text-gray-600">丰富多样的情感互动小游戏，随时体验情感交流的乐趣</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {interactiveGames.map((game, index) => (
                    <div key={game.id} className={`group relative ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                      style={{ transitionDelay: `${300 + index * 100}ms` }}
                    >
                      <div className={`absolute -inset-0.5 bg-gradient-to-r ${game.gradient} rounded-xl opacity-0 group-hover:opacity-75 blur transition duration-300`}></div>
                      <div className="relative bg-white rounded-xl h-full">
                        <div className={`${game.bgPattern} rounded-xl p-4 h-full flex flex-col`}>
                          <div className="flex items-center gap-3 mb-3">
                            <div className={`p-2 rounded-lg bg-gradient-to-r ${game.color} shadow-md group-hover:shadow-lg transition-all duration-300`}>
                              {game.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-gray-800 truncate">{game.title}</h4>
                            </div>
                          </div>
                          
                          <p className="text-xs text-gray-600 mb-3 line-clamp-2">{game.description}</p>
                          
                          <div className="flex flex-wrap gap-1 mb-3">
                            {game.features.slice(0, 2).map((feature, i) => (
                              <Badge key={i} variant="outline" className="text-xs bg-white/80">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                          
                          <Link href={game.href} className="mt-auto">
                            <Button variant="outline" size="sm" className="w-full group-hover:bg-gradient-to-r group-hover:from-purple-500/10 group-hover:to-pink-500/10 group-hover:border-purple-300 transition-all">
                              <Play className="mr-1 h-3 w-3" />
                              开始游戏
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="conversation" className="space-y-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg">
                    <MessageCircle className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">情景对话挑战</h3>
                    <p className="text-gray-600">测试你的情商水平，学会应对各种社交情境</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-yellow-500" />
                      游戏特色
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3 bg-blue-50 p-3 rounded-lg">
                        <Trophy className="h-4 w-4 text-yellow-500" />
                        <span className="text-gray-700">情商测试评分系统</span>
                      </li>
                      <li className="flex items-center gap-3 bg-blue-50 p-3 rounded-lg">
                        <Users className="h-4 w-4 text-blue-500" />
                        <span className="text-gray-700">好友排行榜竞争</span>
                      </li>
                      <li className="flex items-center gap-3 bg-blue-50 p-3 rounded-lg">
                        <Star className="h-4 w-4 text-purple-500" />
                        <span className="text-gray-700">每日挑战获取成就徽章</span>
                      </li>
                      <li className="flex items-center gap-3 bg-blue-50 p-3 rounded-lg">
                        <MessageCircle className="h-4 w-4 text-green-500" />
                        <span className="text-gray-700">多样化社交情境场景</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Zap className="h-5 w-5 text-blue-500" />
                      游戏场景
                    </h3>
                    <div className="space-y-3">
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-lg border-l-4 border-blue-500">
                        职场人际关系处理
                      </div>
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-lg border-l-4 border-blue-500">
                        恋爱情感交流
                      </div>
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-lg border-l-4 border-blue-500">
                        家庭沟通技巧
                      </div>
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-lg border-l-4 border-blue-500">
                        朋友社交互动
                      </div>
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-lg border-l-4 border-blue-500">
                        冲突解决策略
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <Link href="/games/conversation-challenge">
                    <Button size="lg" className="px-8 bg-gradient-to-r from-blue-500 to-blue-700 hover:shadow-lg transition-all transform hover:scale-105">
                      <Play className="mr-2 h-5 w-5" />
                      开始挑战
                    </Button>
                  </Link>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="personality" className="space-y-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-purple-700 text-white shadow-lg">
                    <Brain className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">情感性格分析</h3>
                    <p className="text-gray-600">了解你的情感气质类型和社交风格</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-purple-500" />
                      分析类型
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3 bg-purple-50 p-3 rounded-lg">
                        <Heart className="h-4 w-4 text-red-500" />
                        <span className="text-gray-700">情感气质类型分析</span>
                      </li>
                      <li className="flex items-center gap-3 bg-purple-50 p-3 rounded-lg">
                        <Users className="h-4 w-4 text-blue-500" />
                        <span className="text-gray-700">社交能量画像测试</span>
                      </li>
                      <li className="flex items-center gap-3 bg-purple-50 p-3 rounded-lg">
                        <MessageCircle className="h-4 w-4 text-green-500" />
                        <span className="text-gray-700">情感语言偏好评估</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Star className="h-5 w-5 text-purple-500" />
                      结果特色
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3 bg-purple-50 p-3 rounded-lg">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="text-gray-700">个性化情感画像</span>
                      </li>
                      <li className="flex items-center gap-3 bg-purple-50 p-3 rounded-lg">
                        <Trophy className="h-4 w-4 text-purple-500" />
                        <span className="text-gray-700">详细结果解析</span>
                      </li>
                      <li className="flex items-center gap-3 bg-purple-50 p-3 rounded-lg">
                        <Gamepad2 className="h-4 w-4 text-pink-500" />
                        <span className="text-gray-700">社交建议指导</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="text-center">
                  <Link href="/games/personality-analysis">
                    <Button size="lg" className="px-8 bg-gradient-to-r from-purple-500 to-purple-700 hover:shadow-lg transition-all transform hover:scale-105">
                      <Play className="mr-2 h-5 w-5" />
                      开始分析
                    </Button>
                  </Link>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="interactive" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {interactiveGames.map((game, index) => (
                  <div key={game.id} className={`relative group ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className={`absolute -inset-0.5 bg-gradient-to-r ${game.gradient} rounded-2xl opacity-75 group-hover:opacity-100 blur transition duration-300 group-hover:duration-200`}></div>
                    <div className="relative bg-white rounded-2xl h-full overflow-hidden">
                      <div className={`${game.bgPattern} rounded-t-2xl p-6 flex items-center justify-center h-32`}>
                        <div className={`p-4 rounded-xl bg-gradient-to-r ${game.color} shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105`}>
                          {game.icon}
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-2">{game.title}</h3>
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{game.description}</p>
                        
                        <div className="flex items-center gap-2 mb-4">
                          <Badge variant="outline" className="text-xs bg-white/80">
                            {game.difficulty}
                          </Badge>
                          <Badge variant="outline" className="text-xs bg-white/80">
                            {game.players}
                          </Badge>
                        </div>
                        
                        <div className="flex flex-wrap gap-1 mb-4">
                          {game.features.slice(0, 3).map((feature, i) => (
                            <Badge key={i} variant="secondary" className="text-xs bg-white/80">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                        
                        <Link href={game.href}>
                          <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-lg transition-all transform hover:scale-105">
                            <Play className="mr-2 h-4 w-4" />
                            开始游戏
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-8">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 px-6 py-3 rounded-full">
                  <Sparkles className="h-5 w-5 text-purple-600" />
                  <span className="text-gray-700 font-medium">更多有趣游戏正在开发中，敬请期待</span>
                  <Sparkles className="h-5 w-5 text-pink-600" />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* 即将上线的功能 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg mt-8">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="h-5 w-5 text-purple-500" />
              <h3 className="text-xl font-bold text-gray-800">即将上线的功能</h3>
            </div>
            <p className="text-gray-600 mb-4">我们正在开发更多有趣的功能，让情感互动更加丰富多样</p>
            <div className="flex flex-wrap gap-2">
              {upcomingFeatures.map((feature, index) => (
                <Badge key={index} variant="outline" className="text-sm bg-white/80">
                  {feature}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}