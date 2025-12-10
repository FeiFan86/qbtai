'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Gamepad2, Heart, MessageCircle, Users, Trophy, Star, 
  Search, Filter, Play, Award, Clock, TrendingUp, 
  Share2, Download, ThumbsUp, Users2, Lock, Gift,
  Utensils
} from 'lucide-react'
import GlobalNavbar from '@/components/global-navbar'
interface Game {
  id: number;
  title: string;
  description: string;
  icon: JSX.Element;
  color: string;
  players: string;
  difficulty: string;
  category: 'communication' | 'fun' | 'emotional' | 'challenge';
  duration: string;
  popularity: number;
  rating: number;
  features: string[];
}

export default function GamesPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')
  
  const games: Game[] = [
    {
      id: 1,
      title: '情感树洞',
      description: '安全私密的情感分享空间，增进彼此理解与信任',
      icon: <Heart className="h-6 w-6" />,
      color: 'from-rose-400 to-pink-600',
      players: '2人+',
      difficulty: '简单',
      category: 'emotional',
      duration: '15-30分钟',
      popularity: 95,
      rating: 4.8,
      features: ['情感分享', '隐私保护', '深度交流']
    },
    {
      id: 2,
      title: '真心话大冒险',
      description: '增进了解的互动游戏，突破沟通障碍',
      icon: <MessageCircle className="h-6 w-6" />,
      color: 'from-purple-400 to-indigo-600',
      players: '2人',
      difficulty: '中等',
      category: 'communication',
      duration: '20-45分钟',
      popularity: 92,
      rating: 4.7,
      features: ['深度了解', '趣味挑战', '关系突破']
    },
    {
      id: 3,
      title: '默契挑战',
      description: '测试情侣默契度，发现彼此的相似之处',
      icon: <Users className="h-6 w-6" />,
      color: 'from-blue-400 to-cyan-600',
      players: '2人',
      difficulty: '中等',
      category: 'challenge',
      duration: '25-40分钟',
      popularity: 88,
      rating: 4.6,
      features: ['默契测试', '相似度分析', '关系评估']
    },
    {
      id: 4,
      title: '情感记忆拼图',
      description: '重温美好回忆，强化情感连接',
      icon: <Trophy className="h-6 w-6" />,
      color: 'from-green-400 to-teal-600',
      players: '2人',
      difficulty: '简单',
      category: 'emotional',
      duration: '30-60分钟',
      popularity: 90,
      rating: 4.9,
      features: ['回忆重温', '情感强化', '美好时光']
    },
    {
      id: 5,
      title: '协作涂鸦板',
      description: '共同创作艺术作品，培养协作精神',
      icon: <Star className="h-6 w-6" />,
      color: 'from-orange-400 to-red-600',
      players: '2人+',
      difficulty: '简单',
      category: 'fun',
      duration: '20-50分钟',
      popularity: 85,
      rating: 4.5,
      features: ['创意协作', '艺术表达', '团队配合']
    },
    {
      id: 6,
      title: '关系飞行棋',
      description: '情感话题棋盘游戏，深度探索彼此内心',
      icon: <Gamepad2 className="h-6 w-6" />,
      color: 'from-pink-400 to-purple-600',
      players: '2人',
      difficulty: '中等',
      category: 'challenge',
      duration: '40-90分钟',
      popularity: 87,
      rating: 4.7,
      features: ['深度话题', '棋盘游戏', '情感探索']
    },
    {
      id: 7,
      title: '抱怨墙',
      description: '安全发泄负面情绪，建立健康沟通渠道',
      icon: <TrendingUp className="h-6 w-6" />,
      color: 'from-red-400 to-orange-600',
      players: '2人',
      difficulty: '简单',
      category: 'communication',
      duration: '15-30分钟',
      popularity: 82,
      rating: 4.4,
      features: ['情绪宣泄', '健康沟通', '关系修复']
    },
    {
      id: 8,
      title: '情侣盲盒',
      description: '随机抽取惊喜任务，增加生活趣味性',
      icon: <Award className="h-6 w-6" />,
      color: 'from-teal-400 to-green-600',
      players: '2人',
      difficulty: '简单',
      category: 'fun',
      duration: '20-40分钟',
      popularity: 89,
      rating: 4.6,
      features: ['随机惊喜', '趣味互动', '创意挑战']
    },
    {
      id: 9,
      title: '性格分析',
      description: '深度了解彼此性格特点，优化相处方式',
      icon: <ThumbsUp className="h-6 w-6" />,
      color: 'from-indigo-400 to-purple-600',
      players: '2人',
      difficulty: '中等',
      category: 'challenge',
      duration: '25-45分钟',
      popularity: 84,
      rating: 4.5,
      features: ['性格测试', '匹配分析', '关系优化']
    },
    {
      id: 10,
      title: '对话挑战',
      description: '通过不同场景对话练习，提升沟通技巧',
      icon: <Users2 className="h-6 w-6" />,
      color: 'from-yellow-400 to-amber-600',
      players: '2人',
      difficulty: '中等',
      category: 'communication',
      duration: '30-60分钟',
      popularity: 86,
      rating: 4.7,
      features: ['对话练习', '沟通技巧', '情景模拟']
    },
    {
      id: 11,
      title: '秘密情书',
      description: '创建加密情书，生成专属链接分享给TA',
      icon: <Lock className="h-6 w-6" />,
      color: 'from-pink-400 to-purple-600',
      players: '1-2人',
      difficulty: '简单',
      category: 'emotional',
      duration: '10-30分钟',
      popularity: 92,
      rating: 4.8,
      features: ['加密链接', '阅后即焚', '密码保护']
    },
    {
      id: 12,
      title: '时光胶囊',
      description: '写下对未来想说的话，设置开启时间与好友分享',
      icon: <Gift className="h-6 w-6" />,
      color: 'from-blue-400 to-teal-600',
      players: '1-多人',
      difficulty: '简单',
      category: 'emotional',
      duration: '15-45分钟',
      popularity: 88,
      rating: 4.7,
      features: ['定时开启', '多人协作', '回忆封存']
    },
    {
      id: 13,
      title: '爱情冒险卡牌',
      description: '随机抽取任务卡，完成挑战获得积分增进感情',
      icon: <Heart className="h-6 w-6" />,
      color: 'from-purple-400 to-pink-600',
      players: '2人',
      difficulty: '中等',
      category: 'fun',
      duration: '15-45分钟',
      popularity: 91,
      rating: 4.8,
      features: ['随机任务', '积分系统', '分享挑战']
    },
    {
      id: 14,
      title: '今天吃什么',
      description: '解决情侣美食选择困难，智能推荐适合的餐厅',
      icon: <Utensils className="h-6 w-6" />,
      color: 'from-orange-400 to-red-600',
      players: '2人',
      difficulty: '简单',
      category: 'fun',
      duration: '10-30分钟',
      popularity: 93,
      rating: 4.9,
      features: ['智能推荐', '筛选条件', '美食分享']
    }
  ]

  const categories = [
    { value: 'all', label: '全部类型' },
    { value: 'communication', label: '沟通交流' },
    { value: 'emotional', label: '情感表达' },
    { value: 'fun', label: '趣味游戏' },
    { value: 'challenge', label: '挑战任务' }
  ]

  const difficulties = [
    { value: 'all', label: '全部难度' },
    { value: 'simple', label: '简单' },
    { value: 'medium', label: '中等' },
    { value: 'hard', label: '困难' }
  ]

  const filteredGames = games.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         game.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         game.features.some(feature => feature.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesCategory = selectedCategory === 'all' || game.category === selectedCategory
    
    const matchesDifficulty = selectedDifficulty === 'all' || 
      (selectedDifficulty === 'simple' && game.difficulty === '简单') ||
      (selectedDifficulty === 'medium' && game.difficulty === '中等') ||
      (selectedDifficulty === 'hard' && game.difficulty === '困难')
    
    return matchesSearch && matchesCategory && matchesDifficulty
  })

  const startGame = async (gameId: number) => {
    // 根据游戏ID启动对应的游戏
    const gameRoutes = {
      1: '/games/interactive-games/emotion-tree-hole',
      2: '/games/interactive-games/truth-or-dare',
      3: '/games/interactive-games/tacit-challenge',
      4: '/games/interactive-games/memory-puzzle',
      5: '/games/interactive-games/collaborative-doodle',
      6: '/games/interactive-games/relationship-chess',
      7: '/games/interactive-games/complaint-wall',
      8: '/games/interactive-games/couple-blind-box',
      9: '/games/personality-analysis',
      10: '/games/conversation-challenge',
      11: '/games/secret-love-letter',
      12: '/games/time-capsule',
      13: '/games/love-adventure-cards',
      14: '/games/what-to-eat-today'
    }
    
    const route = gameRoutes[gameId as keyof typeof gameRoutes]
    if (route) {
      router.push(route)
    } else {
      // 如果路由不存在，显示游戏预览
      const gameTitle = games.find(g => g.id === gameId)?.title || '未知游戏'
      alert('即将开始游戏: ' + gameTitle)
    }
  }

  const shareGame = (game: Game) => {
    let shareText = '🎮 推荐一个好玩的游戏：' + game.title + '\n\n'
    shareText += game.description + '\n\n'
    shareText += '适合：' + game.players + ' | 时长：' + game.duration + '\n'
    shareText += '难度：' + game.difficulty + ' | 评分：' + game.rating + '/5\n\n'
    shareText += '#丘比特AI #情感游戏'
    
    if (navigator.share) {
      navigator.share({
        title: game.title,
        text: shareText
      })
    } else {
      navigator.clipboard.writeText(shareText)
      alert('游戏信息已复制到剪贴板，可以分享给朋友！')
    }
  }

  const generateGamesReport = () => {
    // 计算统计数据
    const totalGames = games.length
    const averageRating = (games.reduce((sum, g) => sum + g.rating, 0) / games.length).toFixed(1)
    const mostPopular = games.sort((a, b) => b.popularity - a.popularity)[0].title
    const highestRated = games.sort((a, b) => b.rating - a.rating)[0].title
    
    // 生成游戏列表
    const gameList = games.map(game => {
      let categoryText = '挑战任务'
      if (game.category === 'communication') categoryText = '沟通交流'
      else if (game.category === 'emotional') categoryText = '情感表达'
      else if (game.category === 'fun') categoryText = '趣味游戏'
      
      let gameInfo = '### ' + game.title + '\n'
      gameInfo += '**类型**: ' + categoryText + '\n'
      gameInfo += '**难度**: ' + game.difficulty + ' | **时长**: ' + game.duration + '\n'
      gameInfo += '**评分**: ' + game.rating + '/5 | **热度**: ' + game.popularity + '%\n\n'
      gameInfo += game.description + '\n\n'
      gameInfo += '特色功能: ' + game.features.join(', ') + '\n\n'
      gameInfo += '---'
      
      return gameInfo
    }).join('\n')
    
    // 组装完整报告
    let reportContent = '# 情感游戏推荐报告\n\n'
    reportContent += '## 游戏概览\n'
    reportContent += '- 总游戏数: ' + totalGames + '\n'
    reportContent += '- 平均评分: ' + averageRating + '/5\n'
    reportContent += '- 最受欢迎: ' + mostPopular + '\n'
    reportContent += '- 最高评分: ' + highestRated + '\n\n'
    reportContent += '## 推荐游戏\n'
    reportContent += gameList + '\n\n'
    reportContent += '分析时间: ' + new Date().toLocaleString() + '\n'
    reportContent += '工具: 丘比特AI情感游戏'
    
    reportContent = reportContent.trim()

    const blob = new Blob([reportContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = '情感游戏推荐报告_' + new Date().getTime() + '.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      <GlobalNavbar />

      <main className="pt-16">
        <div className="container py-12">
          {/* 页面标题 */}
          <div className="text-center mb-12 relative">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-rose-200 mb-4 shadow-sm">
              <Gamepad2 className="h-5 w-5 text-rose-500 mr-2" />
              <span className="text-sm font-medium text-rose-700">互动游戏</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
              情感互动游戏
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              🎯 通过精心设计的互动游戏，增进感情深度，创造美好回忆
            </p>
            
            {/* 装饰元素 */}
            <div className="absolute -top-8 -left-8 w-16 h-16 bg-gradient-to-r from-rose-200 to-pink-200 rounded-full blur-xl opacity-60"></div>
            <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-gradient-to-r from-purple-200 to-blue-200 rounded-full blur-xl opacity-60"></div>
          </div>

              {/* 搜索和筛选 */}
              <div className="max-w-4xl mx-auto mb-8">
                <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-rose-100 p-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-rose-50 to-pink-50 opacity-30"></div>
                  <div className="relative z-10">
                    <div className="grid md:grid-cols-4 gap-4">
                      <div className="md:col-span-2 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-rose-400" />
                        <input
                          type="text"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          placeholder="搜索游戏名称、描述或功能..."
                          className="w-full pl-10 pr-4 py-3 border border-rose-200 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-300 transition-all"
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Filter className="h-4 w-4 text-rose-500" />
                        <select
                          value={selectedCategory}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="w-full border border-rose-200 rounded-lg px-3 py-3 bg-white/80 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-300 transition-all"
                        >
                          {categories.map(cat => (
                            <option key={cat.value} value={cat.value}>{cat.label}</option>
                          ))}
                        </select>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Filter className="h-4 w-4 text-rose-500" />
                        <select
                          value={selectedDifficulty}
                          onChange={(e) => setSelectedDifficulty(e.target.value)}
                          className="w-full border border-rose-200 rounded-lg px-3 py-3 bg-white/80 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-300 transition-all"
                        >
                          {difficulties.map(diff => (
                            <option key={diff.value} value={diff.value}>{diff.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 游戏统计概览 */}
              <div className="max-w-4xl mx-auto grid md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
                  <div className="text-2xl font-bold text-rose-600 mb-2">{games.length}</div>
                  <div className="text-sm text-gray-500">游戏总数</div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-2">
                    {(games.reduce((sum, g) => sum + g.rating, 0) / games.length).toFixed(1)}/5
                  </div>
                  <div className="text-sm text-gray-500">平均评分</div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-2">
                    {Math.max(...games.map(g => g.popularity))}%
                  </div>
                  <div className="text-sm text-gray-500">最高热度</div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
                  <div className="text-2xl font-bold text-green-600 mb-2">
                    {games.filter(g => g.difficulty === '简单').length}
                  </div>
                  <div className="text-sm text-gray-500">简单游戏</div>
                </div>
              </div>

              {/* 游戏列表 */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {filteredGames.map((game) => (
                  <div
                    key={game.id}
                    className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-rose-100 p-6 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group relative overflow-hidden"
                  >
                    {/* 渐变背景 */}
                    <div className="absolute inset-0 bg-gradient-to-br from-rose-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className={'inline-flex p-3 rounded-lg bg-gradient-to-r ' + game.color + ' text-white'}>
                        {game.icon}
                      </div>
                      <button
                        onClick={() => shareGame(game)}
                        className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
                        title="分享游戏"
                      >
                        <Share2 className="h-4 w-4" />
                      </button>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {game.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {game.description}
                    </p>
                    
                    {/* 游戏信息 */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span className="flex items-center">
                          <Users2 className="h-3 w-3 mr-1" />
                          {game.players}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {game.duration}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className={'px-2 py-1 rounded-full ' + (
                          game.difficulty === '简单' ? 'bg-green-100 text-green-700' :
                          game.difficulty === '中等' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        )}>
                          {game.difficulty}
                        </span>
                        <span className="flex items-center text-gray-600">
                          <ThumbsUp className="h-3 w-3 mr-1" />
                          {game.rating}/5
                        </span>
                      </div>
                    </div>
                    
                    {/* 特色功能 */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {game.features.map((feature, index) => (
                        <span key={index} className="px-2 py-1 bg-rose-50 text-rose-700 rounded-full text-xs">
                          {feature}
                        </span>
                      ))}
                    </div>
                    
                    {/* 开始游戏按钮 */}
                    <button 
                      onClick={() => startGame(game.id)}
                      className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3 rounded-lg font-medium hover:from-rose-600 hover:to-pink-600 transition-all group-hover:shadow-lg flex items-center justify-center relative overflow-hidden group/btn"
                    >
                      {/* 按钮特效 */}
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                      <Play className="h-4 w-4 mr-2 relative z-10" />
                      <span className="relative z-10">开始游戏</span>
                    </button>
                  </div>
                ))}
              </div>

              {filteredGames.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <Search className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>没有找到匹配的游戏</p>
                  <p className="text-sm">尝试调整搜索条件</p>
                </div>
              )}

        </div>
      </main>

      {/* 页脚 */}
      <footer className="bg-gray-50 border-t border-gray-200">
        <div className="container py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-6 h-6 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full flex items-center justify-center">
                <Gamepad2 className="h-3 w-3 text-white" />
              </div>
              <span className="text-gray-900 font-semibold">丘比特AI情感助手</span>
            </div>
            <p className="text-gray-600 text-sm">
              © 2024 专为情侣设计的情感助手平台. 让爱更美好.
            </p>
          </div>
        </div>
      </footer>
    </div>
    </UsageGuard>
  )
}