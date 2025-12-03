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

interface EmotionPost {
  id: string
  content: string
  emotion: 'happy' | 'sad' | 'neutral' | 'anxious' | 'excited'
  timestamp: Date
  replies: EmotionReply[]
  likes: number
}

interface EmotionReply {
  id: string
  content: string
  timestamp: Date
  isSupportive: boolean
}

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

export default function EmotionTreeHolePage() {
  const { isAuthenticated, user } = useAuth()
  const [posts, setPosts] = useState<EmotionPost[]>([])
  const [newPost, setNewPost] = useState({ content: '', emotion: 'neutral' as EmotionPost['emotion'] })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const postsEndRef = useRef<HTMLDivElement>(null)

  // 模拟数据加载
  useEffect(() => {
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
  }, [])

  const handleSubmitPost = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!newPost.content.trim()) {
      return
    }

    if (!isAuthenticated) {
      alert('请先登录再分享你的情感')
      return
    }

    setIsSubmitting(true)

    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const post: EmotionPost = {
        id: Date.now().toString(),
        content: newPost.content,
        emotion: newPost.emotion,
        timestamp: new Date(),
        replies: [],
        likes: 0
      }

      setPosts(prev => [post, ...prev])
      setNewPost({ content: '', emotion: 'neutral' })
      setSuccessMessage('你的情感已成功分享到树洞！')
      
      // 3秒后清除成功消息
      setTimeout(() => setSuccessMessage(''), 3000)
      
      // 滚动到顶部
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (error) {
      console.error('提交失败:', error)
    } finally {
      setIsSubmitting(false)
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
                            newPost.emotion === key
                              ? emotionColors[key as keyof typeof emotionColors]
                              : 'bg-white border-gray-200 hover:bg-gray-50'
                          }`}
                          onClick={() => setNewPost(prev => ({ ...prev, emotion: key as EmotionPost['emotion'] }))}
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
                        <div className={`p-2 rounded-full ${emotionColors[post.emotion]}`}>
                          {emotionIcons[post.emotion]}
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