'use client'

import React, { useState, useEffect, useRef } from 'react'
import GlobalNavbar from '@/components/global-navbar'
import { useAuth } from '@/components/auth-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert } from '@/components/ui/alert'
import { FormInput } from '@/components/ui/form-input'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { 
  ArrowLeft,
  Heart,
  MessageCircle,
  Send,
  Users,
  Clock,
  ThumbsUp,
  Smile,
  Laugh,
  Frown,
  Meh,
  TreePine,
  Leaf,
  Star
} from 'lucide-react'
import Link from 'next/link'
import { databaseService } from '@/lib/database-service'
import { EmotionPost, EmotionReply } from '@/lib/types'

const emotionColors = {
  happy: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  sad: 'bg-blue-100 text-blue-800 border-blue-200',
  neutral: 'bg-gray-100 text-gray-800 border-gray-200',
  anxious: 'bg-purple-100 text-purple-800 border-purple-200',
  excited: 'bg-red-100 text-red-800 border-red-200'
}

const emotionIcons = {
  happy: <Smile className="h-5 w-5" />,
  sad: <Frown className="h-5 w-5" />,
  neutral: <Meh className="h-5 w-5" />,
  anxious: <Heart className="h-5 w-5" />,
  excited: <Laugh className="h-5 w-5" />
}

const emotionLabels = {
  happy: '开心',
  sad: '难过',
  neutral: '平静',
  anxious: '焦虑',
  excited: '兴奋'
}

// 将 EmotionPost 的 category 映射到 emotion 显示
const getEmotionFromCategory = (category: string) => {
  const emotionMap: Record<string, 'happy' | 'sad' | 'neutral' | 'anxious' | 'excited'> = {
    happy: 'happy',
    sad: 'sad',
    angry: 'sad',
    anxious: 'anxious',
    confused: 'anxious',
    love: 'happy',
    excited: 'excited',
    other: 'neutral'
  }
  return emotionMap[category] || 'neutral'
}

export default function EmotionTreeHolePage() {
  const { isAuthenticated, user } = useAuth()
  const [posts, setPosts] = useState<EmotionPost[]>([])
  const [newPost, setNewPost] = useState({ content: '', category: 'other' as EmotionPost['category'] })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [replyInputs, setReplyInputs] = useState<Record<string, string>>({})
  const [activeTab, setActiveTab] = useState<'all' | 'happy' | 'sad' | 'anxious' | 'excited'>('all')
  const [sortBy, setSortBy] = useState<'latest' | 'popular'>('latest')
  const postsEndRef = useRef<HTMLDivElement>(null)

  // 加载真实数据
  useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = async () => {
    try {
      setLoading(true)
      // 从数据库加载帖子
      const postsData = await databaseService.getEmotionPosts('emotion-tree-hole', 20)
      setPosts(postsData)
    } catch (error) {
      console.error('加载帖子失败:', error)
      // 如果API失败，使用模拟数据
      const mockPosts: EmotionPost[] = [
        {
          id: '1',
          gameType: 'emotion-tree-hole',
          userId: 'user_mock_1',
          username: '匿名用户',
          avatar: '',
          title: '今天工作遇到了挫折...',
          content: '今天工作遇到了挫折，感觉有点沮丧。但和朋友聊了聊后，心情好多了。有时候倾诉真的很有用。',
          category: 'sad',
          tags: ['sad'],
          isAnonymous: true,
          likes: [],
          replies: [
            {
              id: '1-1',
              userId: 'user_mock_2',
              username: '支持者',
              avatar: '',
              content: '抱抱你，工作挫折是难免的，你已经很棒了！',
              likes: [],
              isAnonymous: true,
              timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000).toISOString(),
            },
            {
              id: '1-2',
              userId: 'user_mock_3',
              username: '共鸣者',
              avatar: '',
              content: '我也是，每次和朋友聊天后都感觉好很多。',
              likes: [],
              isAnonymous: true,
              timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
            }
          ],
          replyCount: 2,
          isFeatured: false,
          imageUrl: '',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          likeCount: 12
        },
        {
          id: '2',
          gameType: 'emotion-tree-hole',
          userId: 'user_mock_4',
          username: '匿名用户',
          avatar: '',
          title: '今天和另一半一起做饭...',
          content: '今天和另一半一起做饭，虽然厨房弄得一团糟，但过程超级开心！简单的生活也可以很幸福。',
          category: 'happy',
          tags: ['happy'],
          isAnonymous: true,
          likes: [],
          replies: [
            {
              id: '2-1',
              userId: 'user_mock_5',
              username: '欣赏者',
              avatar: '',
              content: '这种日常的小幸福最珍贵了！',
              likes: [],
              isAnonymous: true,
              timestamp: new Date(Date.now() - 3.5 * 60 * 60 * 1000).toISOString(),
            }
          ],
          replyCount: 1,
          isFeatured: false,
          imageUrl: '',
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
          likeCount: 25
        },
        {
          id: '3',
          gameType: 'emotion-tree-hole',
          userId: 'user_mock_6',
          username: '匿名用户',
          avatar: '',
          title: '最近总是睡不好...',
          content: '最近总是睡不好，对未来的不确定性让我感到焦虑。希望大家都能找到内心的平静。',
          category: 'anxious',
          tags: ['anxious'],
          isAnonymous: true,
          likes: [],
          replies: [],
          replyCount: 0,
          isFeatured: false,
          imageUrl: '',
          timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
          likeCount: 8
        }
      ]
      setPosts(mockPosts)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitPost = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!newPost.content.trim()) {
      return
    }

    if (!isAuthenticated || !user) {
      alert('请先登录再分享你的情感')
      return
    }

    setIsSubmitting(true)

    try {
      // 保存到数据库
      const savedPost = await databaseService.createEmotionPost('emotion-tree-hole', {
        gameType: 'emotion-tree-hole',
        userId: user.id,
        username: user.username,
        avatar: user.avatar || '',
        title: newPost.content.substring(0, 50) + (newPost.content.length > 50 ? '...' : ''),
        content: newPost.content,
        category: newPost.category,
        tags: [newPost.category],
        isAnonymous: false,
        likes: [],
        replies: [],
        replyCount: 0,
        isFeatured: false,
        imageUrl: ''
      })

      // 更新本地状态
      setPosts(prev => [savedPost, ...prev])
      setNewPost({ content: '', category: 'other' })
      setSuccessMessage('你的情感已成功分享到树洞！')
      
      // 保存游戏进度
      await databaseService.saveGameProgress('emotion-tree-hole', user.id, { postsCount: posts.length + 1 })
      
      // 3秒后清除成功消息
      setTimeout(() => setSuccessMessage(''), 3000)
      
      // 滚动到顶部
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (error) {
      console.error('提交失败:', error)
      alert('提交失败，请稍后重试')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleLikePost = async (postId: string) => {
    if (!isAuthenticated || !user) {
      alert('请先登录再支持他人')
      return
    }

    try {
      const updatedPost = await databaseService.likeEmotionPost('emotion-tree-hole', postId)
      setPosts(prev => prev.map(post => 
        post.id === postId ? { ...post, likes: updatedPost.likes } : post
      ))
    } catch (error) {
      console.error('点赞失败:', error)
    }
  }

  const handleAddReply = async (postId: string, content: string) => {
    if (!isAuthenticated || !user) {
      alert('请先登录再回复')
      return
    }

    try {
      const newReply = await databaseService.addEmotionReply('emotion-tree-hole', postId, {
        userId: user.id,
        username: user.username,
        avatar: user.avatar || '',
        content,
        likes: [],
        isAnonymous: false
      })

      setPosts(prev => prev.map(post => 
        post.id === postId 
          ? { ...post, replies: [...post.replies, newReply] }
          : post
      ))
    } catch (error) {
      console.error('回复失败:', error)
    }
  }

  const formatTime = (timestamp: string | Date) => {
    const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(hours / 24)
    
    if (days > 0) return `${days}天前`
    if (hours > 0) return `${hours}小时前`
    return '刚刚'
  }

  // 过滤和排序帖子
  const filteredPosts = posts.filter(post => {
    if (activeTab === 'all') return true
    const emotion = getEmotionFromCategory(post.category)
    return emotion === activeTab
  }).sort((a, b) => {
    if (sortBy === 'latest') {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    } else {
      return b.likeCount - a.likeCount
    }
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-purple-50 to-blue-50">
      <GlobalNavbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-5xl">
          {/* 页面标题 */}
          <div className="text-center mb-12">
            <Link href="/games" className="inline-flex items-center text-purple-600 hover:text-purple-800 mb-6 transition-all duration-300 hover:scale-105">
              <ArrowLeft className="h-5 w-5 mr-2" />
              返回游戏中心
            </Link>
            <div className="inline-flex items-center justify-center mb-6 p-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300">
              <TreePine className="h-16 w-16 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              情感<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-rose-500">树洞</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              在这里，你可以匿名分享你的情感故事，获得温暖的回应和支持，释放内心的情绪
            </p>
          </div>

          {/* 成功提示 */}
          {successMessage && (
            <Alert variant="success" onDismiss={() => setSuccessMessage('')} className="mb-6">
              {successMessage}
            </Alert>
          )}

          {/* 发布新情感 */}
          {isAuthenticated && (
            <Card className="mb-8 border-0 bg-gradient-to-br from-white/80 to-purple-50/50 backdrop-blur-sm shadow-2xl rounded-3xl overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500"></div>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-2xl font-bold text-gray-800">
                  <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                    <MessageCircle className="h-6 w-6 text-white" />
                  </div>
                  分享你的情感
                </CardTitle>
                <CardDescription className="text-lg text-gray-600">
                  匿名分享你的心情，会有人在这里倾听和支持你
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitPost} className="space-y-6">
                  <div className="space-y-3">
                    <label className="text-lg font-semibold text-gray-700">当前情绪</label>
                    <div className="flex flex-wrap gap-3">
                      {Object.entries(emotionLabels).map(([key, label]) => (
                        <button
                          key={key}
                          type="button"
                          className={`px-4 py-3 rounded-xl border-2 flex items-center gap-2 transition-all duration-300 transform hover:scale-105 ${
                            getEmotionFromCategory(newPost.category) === key
                              ? emotionColors[key as keyof typeof emotionColors] + ' shadow-lg'
                              : 'bg-white/80 border-gray-200 hover:bg-white hover:border-purple-300'
                          }`}
                          onClick={() => setNewPost(prev => ({ ...prev, category: key as EmotionPost['category'] }))}
                        >
                          {emotionIcons[key as keyof typeof emotionIcons]}
                          <span className="text-base font-medium">{label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <FormInput
                    label="分享你的情感故事"
                    placeholder="在这里倾诉你的心情，无论开心还是难过，都会有人倾听..."
                    value={newPost.content}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                    multiline={true}
                    rows={5}
                  />
                  
                  <Button 
                    type="submit" 
                    disabled={isSubmitting || !newPost.content.trim()}
                    className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                  >
                    {isSubmitting ? (
                      <>
                        <LoadingSpinner size="sm" className="mr-3" />
                        分享中...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-3" />
                        分享到树洞
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          {/* 未登录提示 */}
          {!isAuthenticated && (
            <Card className="mb-8 border-0 bg-gradient-to-br from-yellow-50/80 to-orange-50/50 backdrop-blur-sm shadow-2xl rounded-3xl overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 to-orange-500"></div>
              <CardContent className="text-center py-8 px-6">
                <div className="inline-flex items-center justify-center mb-6 p-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full">
                  <Leaf className="h-16 w-16 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">登录后分享你的情感</h3>
                <p className="text-lg text-gray-600 mb-6 max-w-md mx-auto leading-relaxed">
                  登录后可以在情感树洞匿名分享你的心情，获得他人的支持和建议
                </p>
                <Link href="/login">
                  <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold text-lg px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                    立即登录
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}

          {/* 情感帖子列表 */}
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">树洞中的情感</h2>
                  <Badge variant="secondary" className="mt-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-purple-200">
                    {filteredPosts.length} 条分享
                  </Badge>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-base font-medium text-gray-700">筛选:</span>
                  <select 
                    value={activeTab}
                    onChange={(e) => setActiveTab(e.target.value as any)}
                    className="text-base border-2 border-gray-200 rounded-lg px-4 py-2 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="all">全部情绪</option>
                    <option value="happy">开心</option>
                    <option value="sad">难过</option>
                    <option value="anxious">焦虑</option>
                    <option value="excited">兴奋</option>
                  </select>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="text-base font-medium text-gray-700">排序:</span>
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="text-base border-2 border-gray-200 rounded-lg px-4 py-2 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="latest">最新发布</option>
                    <option value="popular">最受欢迎</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="space-y-8">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden border-0 bg-gradient-to-br from-white/90 to-purple-50/50 backdrop-blur-sm shadow-2xl hover:shadow-3xl rounded-3xl transition-all duration-500 transform hover:scale-[1.02]">
                  <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-purple-500 via-pink-500 to-rose-500"></div>
                  <CardContent className="p-8">
                    {/* 帖子头部 */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className={`p-4 rounded-2xl shadow-lg ${emotionColors[getEmotionFromCategory(post.category)]} transform hover:scale-110 transition-transform duration-300`}>
                          {emotionIcons[getEmotionFromCategory(post.category)]}
                        </div>
                        <div>
                          <div className="font-bold text-xl text-gray-900">匿名用户</div>
                          <div className="text-base text-gray-500">
                            <span className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              {formatTime(post.timestamp)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full text-base font-medium text-purple-700 border border-purple-200">
                          <ThumbsUp className="h-4 w-4" />
                          {post.likeCount}
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full text-base font-medium text-blue-700 border border-blue-200">
                          <MessageCircle className="h-4 w-4" />
                          {post.replyCount}
                        </div>
                      </div>
                    </div>
                    
                    {/* 帖子内容 */}
                    <div className="bg-gradient-to-r from-purple-50/80 to-pink-50/80 rounded-2xl p-6 mb-6 border border-purple-100/50">
                      <p className="text-gray-800 leading-relaxed text-xl font-light">
                        {post.content}
                      </p>
                    </div>
                    
                    {/* 操作按钮 */}
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => handleLikePost(post.id)}
                        className="flex items-center gap-3 px-5 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold text-base shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                      >
                        <ThumbsUp className="h-5 w-5" />
                        支持 ({post.likeCount})
                      </button>
                      
                      <div className="flex-1 flex items-center gap-3">
                        <input 
                          type="text" 
                          placeholder="写下温暖的回应..."
                          value={replyInputs[post.id] || ''}
                          onChange={(e) => setReplyInputs(prev => ({...prev, [post.id]: e.target.value}))}
                          className="flex-1 px-4 py-3 border-2 border-purple-200 rounded-xl text-base bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                        />
                        <button 
                          onClick={() => replyInputs[post.id] && handleAddReply(post.id, replyInputs[post.id])}
                          disabled={!replyInputs[post.id]}
                          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold text-base rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          回复
                        </button>
                      </div>
                    </div>
                    
                    {/* 回复列表 */}
                    {post.replies.length > 0 && (
                      <div className="mt-6 pl-6 border-l-4 border-purple-300">
                        <h4 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                          <div className="p-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg">
                            <Star className="h-4 w-4 text-white" />
                          </div>
                          温暖回应 ({post.replies.length})
                        </h4>
                        <div className="space-y-4">
                          {post.replies.map((reply) => (
                            <div key={reply.id} className="bg-gradient-to-r from-blue-50/80 to-cyan-50/80 p-4 rounded-2xl border-2 border-blue-100/50 hover:border-blue-200 transition-all duration-300 transform hover:scale-[1.02]">
                              <div className="flex items-center justify-between mb-3">
                                <span className="text-base font-medium text-blue-700">匿名支持者</span>
                                <span className="text-sm text-gray-500">
                                  {formatTime(reply.timestamp)}
                                </span>
                              </div>
                              <p className="text-base text-gray-700 leading-relaxed">
                                {reply.content}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      {/* 页脚 */}
      <footer className="bg-gray-50 border-t border-gray-200">
        <div className="container py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-6 h-6 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full flex items-center justify-center">
                <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
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
  )
}