'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
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
          content: '今天工作遇到了挫折，感觉有点沮丧。但和朋友聊了聊后，心情好多了。有时候倾诉真的很有用。',
          emotion: 'sad',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          replies: [
            {
              id: '1-1',
              content: '抱抱你，工作挫折是难免的，你已经很棒了！',
              timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000),
              isSupportive: true
            },
            {
              id: '1-2',
              content: '我也是，每次和朋友聊天后都感觉好很多。',
              timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
              isSupportive: true
            }
          ],
          likes: 12
        },
        {
          id: '2',
          content: '今天和另一半一起做饭，虽然厨房弄得一团糟，但过程超级开心！简单的生活也可以很幸福。',
          emotion: 'happy',
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
          replies: [
            {
              id: '2-1',
              content: '这种日常的小幸福最珍贵了！',
              timestamp: new Date(Date.now() - 3.5 * 60 * 60 * 1000),
              isSupportive: true
            }
          ],
          likes: 25
        },
        {
          id: '3',
          content: '最近总是睡不好，对未来的不确定性让我感到焦虑。希望大家都能找到内心的平静。',
          emotion: 'anxious',
          timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
          replies: [],
          likes: 8
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
        userId: user.id,
        username: user.username,
        avatar: user.avatar || '',
        title: newPost.content.substring(0, 50) + (newPost.content.length > 50 ? '...' : ''),
        content: newPost.content,
        category: newPost.category,
        tags: [newPost.category],
        isAnonymous: false
      })

      // 更新本地状态
      setPosts(prev => [savedPost, ...prev])
      setNewPost({ content: '', emotion: 'neutral' })
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

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(hours / 24)
    
    if (days > 0) return `${days}天前`
    if (hours > 0) return `${hours}小时前`
    return '刚刚'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-4xl">
          {/* 页面标题 */}
          <div className="text-center mb-8">
            <Link href="/games" className="inline-flex items-center text-purple-600 hover:text-purple-800 mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              返回游戏中心
            </Link>
            <div className="inline-flex items-center justify-center mb-6 p-4 bg-white rounded-full shadow-lg">
              <TreePine className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              情感<span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-500">树洞</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              匿名分享你的情感故事，获得温暖的回应和支持，释放内心的情绪
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
            <Card className="mb-8 border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-green-600" />
                  分享你的情感
                </CardTitle>
                <CardDescription>
                  匿名分享你的心情，会有人在这里倾听和支持你
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitPost} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">当前情绪</label>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(emotionLabels).map(([key, label]) => (
                        <button
                          key={key}
                          type="button"
                          className={`px-3 py-2 rounded-lg border flex items-center gap-2 transition-colors ${
                            getEmotionFromCategory(newPost.category) === key
                              ? emotionColors[key as keyof typeof emotionColors]
                              : 'bg-white border-gray-200 hover:bg-gray-50'
                          }`}
                          onClick={() => setNewPost(prev => ({ ...prev, category: key as EmotionPost['category'] }))}
                        >
                          {emotionIcons[key as keyof typeof emotionIcons]}
                          <span className="text-sm">{label}</span>
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
                    rows={4}
                  />
                  
                  <Button 
                    type="submit" 
                    disabled={isSubmitting || !newPost.content.trim()}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    {isSubmitting ? (
                      <>
                        <LoadingSpinner size="sm" className="mr-2" />
                        分享中...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
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
            <Card className="mb-8 border-yellow-200">
              <CardContent className="text-center py-6">
                <Leaf className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">登录后分享你的情感</h3>
                <p className="text-gray-600 mb-4">
                  登录后可以在情感树洞匿名分享你的心情，获得他人的支持和建议
                </p>
                <Link href="/login">
                  <Button className="bg-green-600 hover:bg-green-700">
                    立即登录
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}

          {/* 情感帖子列表 */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <Heart className="h-6 w-6 text-green-500" />
              树洞中的情感
              <Badge variant="secondary">{posts.length} 条分享</Badge>
            </h2>
            
            <div className="space-y-6">
              {posts.map((post) => (
                <Card key={post.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    {/* 帖子头部 */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className={`p-2 rounded-full ${emotionColors[getEmotionFromCategory(post.category)]}`}>
                          {emotionIcons[getEmotionFromCategory(post.category)]}
                        </div>
                        <span className="text-sm text-gray-500">匿名用户</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatTime(post.timestamp)}
                        </div>
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="h-3 w-3" />
                          {post.likes}
                        </div>
                      </div>
                    </div>
                    
                    {/* 帖子内容 */}
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      {post.content}
                    </p>
                    
                    {/* 操作按钮 */}
                    <div className="flex items-center gap-2 text-sm">
                      <Button variant="ghost" size="sm">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        支持
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        回复
                      </Button>
                    </div>
                    
                    {/* 回复列表 */}
                    {post.replies.length > 0 && (
                      <div className="mt-4 pl-4 border-l-2 border-green-200">
                        <h4 className="text-sm font-medium text-gray-600 mb-2">温暖回应</h4>
                        <div className="space-y-3">
                          {post.replies.map((reply) => (
                            <div key={reply.id} className="bg-green-50 p-3 rounded-lg">
                              <div className="flex items-center gap-2 mb-1">
                                <Star className="h-3 w-3 text-green-500" />
                                <span className="text-xs text-gray-500">
                                  {formatTime(reply.timestamp)}
                                </span>
                              </div>
                              <p className="text-sm text-gray-700">
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
      
      <Footer />
    </div>
  )
}