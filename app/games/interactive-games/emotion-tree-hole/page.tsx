'use client'

import { useState, useEffect } from 'react'

// 安全的 localStorage 访问函数
const safeLocalStorage = {
  getItem: (key: string) => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key)
    }
    return null
  },
  setItem: (key: string, value: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, value)
    }
  },
  removeItem: (key: string) => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key)
    }
  }
}
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  ArrowLeft, 
  TreePine, 
  Heart, 
  MessageCircle, 
  ThumbsUp, 
  Send,
  Eye,
  Filter,
  Calendar,
  Clock,
  Smile,
  Frown,
  Meh,
  AlertCircle,
  CheckCircle
} from 'lucide-react'
import Link from 'next/link'

// 定义回复接口
interface Reply {
  id: string
  content: string
  timestamp: Date
  likes: number
}

// 定义帖子接口
interface Post {
  id: string
  emotionType: string
  emotionLabel: string
  content: string
  timestamp: Date
  likes: number
  replies: number
  mood: number
  repliesList: Reply[]
}

// 模拟情感树洞数据
const mockTreeHolePosts: Post[] = [
  {
    id: 'post_001',
    emotionType: 'sadness',
    emotionLabel: '难过',
    content: '今天和朋友吵架了，心里特别难受。我们已经认识五年了，第一次这么严重的分歧。我不知道该怎么办，要不要先道歉，还是等他冷静下来？感觉自己很失败，连最好的朋友关系都处理不好。',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30分钟前
    likes: 23,
    replies: 8,
    mood: 3,
    repliesList: [
      { id: 'r1', content: '五年的友谊很珍贵，也许可以发个消息说你想和他聊聊，不要急着道歉或争论。', timestamp: new Date(Date.now() - 1000 * 60 * 25), likes: 5 },
      { id: 'r2', content: '友谊中有分歧很正常，关键是你们都还珍惜彼此。给彼此一点时间，但也不要让对方等太久。', timestamp: new Date(Date.now() - 1000 * 60 * 20), likes: 3 }
    ]
  },
  {
    id: 'post_002',
    emotionType: 'happiness',
    emotionLabel: '开心',
    content: '今天终于通过了那个重要的考试！准备了三个月，每天熬夜到很晚，现在感觉一切都值了。想和家人朋友分享这个好消息，这是对我努力的最好回报。明天要好好犒劳一下自己！',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2小时前
    likes: 45,
    replies: 12,
    mood: 9,
    repliesList: [
      { id: 'r3', content: '恭喜你！努力终于有了回报，真为你高兴！一定要好好庆祝一下！', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1.5), likes: 8 },
      { id: 'r4', content: '通过考试的感觉太棒了！你的坚持和努力值得被肯定！', timestamp: new Date(Date.now() - 1000 * 60 * 55), likes: 6 }
    ]
  },
  {
    id: 'post_003',
    emotionType: 'anxiety',
    emotionLabel: '焦虑',
    content: '最近工作压力很大，项目deadline接踵而至，每晚都睡不好。感觉自己被压得喘不过气，但又不知道该如何调整。同事们好像都处理得很好，只有我在挣扎。我是不是能力有问题？',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5小时前
    likes: 31,
    replies: 15,
    mood: 4,
    repliesList: [
      { id: 'r5', content: '每个人处理压力的方式不同，不是能力问题。试试把任务分解成小步骤，一次只专注一件事。', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), likes: 10 },
      { id: 'r6', content: '工作压力大是很正常的，不要和别人比。你的感受是真实的，给自己一些喘息的时间。', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), likes: 7 }
    ]
  }
]

export default function EmotionTreeHolePage() {
  const [posts, setPosts] = useState<Post[]>([])
  
  // 从本地存储加载数据
  useEffect(() => {
    const savedPosts = safeLocalStorage.getItem('emotionTreeHolePosts')
    if (savedPosts) {
      const parsedPosts = JSON.parse(savedPosts)
      // 将字符串时间戳转换为Date对象
      const postsWithDates = parsedPosts.map((post: any): Post => ({
        ...post,
        timestamp: new Date(post.timestamp)
      }))
      setPosts(postsWithDates)
    } else {
      // 如果没有保存的数据，使用模拟数据
      setPosts(mockTreeHolePosts)
    }
  }, [])
  
  // 保存数据到本地存储
  const savePostsToLocalStorage = (updatedPosts: Post[]) => {
    safeLocalStorage.setItem('emotionTreeHolePosts', JSON.stringify(updatedPosts))
  }
  const [newPostContent, setNewPostContent] = useState('')
  const [selectedEmotion, setSelectedEmotion] = useState('neutral')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSubmitSuccess, setShowSubmitSuccess] = useState(false)
  const [activeTab, setActiveTab] = useState('all')

  const emotionOptions = [
    { value: 'happiness', label: '开心', icon: <Smile className="h-5 w-5 text-yellow-500" />, color: 'border-yellow-200 bg-yellow-50' },
    { value: 'sadness', label: '难过', icon: <Frown className="h-5 w-5 text-blue-500" />, color: 'border-blue-200 bg-blue-50' },
    { value: 'anxiety', label: '焦虑', icon: <AlertCircle className="h-5 w-5 text-purple-500" />, color: 'border-purple-200 bg-purple-50' },
    { value: 'anger', label: '生气', icon: <AlertCircle className="h-5 w-5 text-red-500" />, color: 'border-red-200 bg-red-50' },
    { value: 'neutral', label: '平静', icon: <Meh className="h-5 w-5 text-gray-500" />, color: 'border-gray-200 bg-gray-50' }
  ]

  const handleSubmit = () => {
    if (!newPostContent.trim()) return

    setIsSubmitting(true)
    
      // 模拟提交过程
      setTimeout(() => {
        const selectedEmotionOption = emotionOptions.find(opt => opt.value === selectedEmotion)
        const newPost = {
          id: `post_${Date.now()}`,
          emotionType: selectedEmotion,
          emotionLabel: selectedEmotionOption?.label || '平静',
          content: newPostContent.trim(),
          timestamp: new Date(),
          likes: 0,
          replies: 0,
          mood: 5,
          repliesList: []
        }
        
        const updatedPosts = [newPost, ...posts]
        setPosts(updatedPosts)
        savePostsToLocalStorage(updatedPosts)
        setNewPostContent('')
        setSelectedEmotion('neutral')
        setIsSubmitting(false)
        setShowSubmitSuccess(true)
        
        // 3秒后隐藏成功提示
        setTimeout(() => {
          setShowSubmitSuccess(false)
        }, 3000)
      }, 1000)
  }

  const formatTimestamp = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)
    
    if (minutes < 60) return `${minutes}分钟前`
    if (hours < 24) return `${hours}小时前`
    return `${days}天前`
  }

  // 点赞功能
  const handleLikePost = (postId: string) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return { ...post, likes: post.likes + 1 }
      }
      return post
    })
    setPosts(updatedPosts)
    savePostsToLocalStorage(updatedPosts)
  }

  // 点赞回复功能
  const handleLikeReply = (postId: string, replyId: string) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        const updatedReplies = post.repliesList.map(reply => {
          if (reply.id === replyId) {
            return { ...reply, likes: reply.likes + 1 }
          }
          return reply
        })
        return { ...post, repliesList: updatedReplies }
      }
      return post
    })
    setPosts(updatedPosts)
    savePostsToLocalStorage(updatedPosts)
  }

  const getMoodIcon = (mood: number) => {
    if (mood >= 8) return <Smile className="h-4 w-4 text-yellow-500" />
    if (mood >= 6) return <Meh className="h-4 w-4 text-green-500" />
    if (mood >= 4) return <Meh className="h-4 w-4 text-gray-500" />
    return <Frown className="h-4 w-4 text-blue-500" />
  }

  const filteredPosts = posts.filter(post => {
    if (activeTab === 'all') return true
    if (activeTab === 'happiness') return post.emotionType === 'happiness'
    if (activeTab === 'sadness') return post.emotionType === 'sadness' || post.emotionType === 'anxiety'
    return true
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6">
            <Link href="/games">
              <Button variant="outline" className="mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                返回游戏中心
              </Button>
            </Link>
          </div>
          
          {/* 页面标题 */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              情感树洞
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500 block md:inline">
                分享空间
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              匿名分享你的情感故事，获得温暖的回应和支持
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 发布新内容 */}
            <div className="lg:col-span-1">
              <Card className="sticky top-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TreePine className="h-5 w-5 text-green-500" />
                    发布情感
                  </CardTitle>
                  <CardDescription>
                    匿名分享你的心情和故事
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* 情感选择 */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">当前情感</label>
                    <div className="grid grid-cols-3 gap-2">
                      {emotionOptions.map((emotion) => (
                        <button
                          key={emotion.value}
                          onClick={() => setSelectedEmotion(emotion.value)}
                          className={`p-2 rounded-lg border flex flex-col items-center gap-1 transition-colors ${
                            selectedEmotion === emotion.value ? emotion.color : 'border-gray-200'
                          }`}
                        >
                          {emotion.icon}
                          <span className="text-xs">{emotion.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* 内容输入 */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">你的故事</label>
                    <Textarea
                      placeholder="分享你的情感故事，无论开心还是难过，这里都是你的安全空间..."
                      value={newPostContent}
                      onChange={(e) => setNewPostContent(e.target.value)}
                      rows={6}
                      className="resize-none"
                    />
                  </div>
                  
                  {/* 提交按钮 */}
                  <Button 
                    onClick={handleSubmit}
                    disabled={!newPostContent.trim() || isSubmitting}
                    className="w-full"
                  >
                    {isSubmitting ? '发布中...' : '发布到树洞'}
                  </Button>
                  
                  {showSubmitSuccess && (
                    <div className="bg-green-50 border border-green-200 text-green-700 p-3 rounded-lg text-sm">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        <span>发布成功！你的故事已经分享到情感树洞</span>
                      </div>
                    </div>
                  )}
                  
                  {/* 温馨提示 */}
                  <div className="bg-blue-50 border border-blue-200 text-blue-700 p-3 rounded-lg text-sm">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">温馨提示</p>
                        <p>所有内容都是匿名发布，请勿分享个人隐私信息。保持友善和尊重的交流氛围。</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* 内容展示区 */}
            <div className="lg:col-span-2">
              {/* 筛选标签 */}
              <Card className="mb-6">
                <CardContent className="pt-6">
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="all" className="flex items-center gap-2">
                        <Filter className="h-4 w-4" />
                        全部
                      </TabsTrigger>
                      <TabsTrigger value="happiness" className="flex items-center gap-2">
                        <Smile className="h-4 w-4" />
                        开心
                      </TabsTrigger>
                      <TabsTrigger value="sadness" className="flex items-center gap-2">
                        <Frown className="h-4 w-4" />
                        难过
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </CardContent>
              </Card>
              
              {/* 帖子列表 */}
              <div className="space-y-6">
                {filteredPosts.map((post: Post) => (
                  <Card key={post.id} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`p-2 rounded-lg border ${
                            emotionOptions.find(opt => opt.value === post.emotionType)?.color || 'border-gray-200'
                          }`}>
                            {emotionOptions.find(opt => opt.value === post.emotionType)?.icon}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">{post.emotionLabel}</Badge>
                              <div className="flex items-center gap-1 text-sm text-gray-500">
                                <Calendar className="h-3 w-3" />
                                {formatTimestamp(post.timestamp)}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {getMoodIcon(post.mood)}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <p className="text-gray-700 mb-4 leading-relaxed">{post.content}</p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                        <button 
                          onClick={() => handleLikePost(post.id)}
                          className="flex items-center gap-1 text-gray-500 hover:text-blue-600 transition-colors"
                        >
                          <ThumbsUp className="h-4 w-4" />
                          <span>{post.likes}</span>
                        </button>
                        <div className="flex items-center gap-1 text-gray-500">
                          <MessageCircle className="h-4 w-4" />
                          <span>{post.replies}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          <span>{Math.floor(post.likes * 5 + 20)}</span>
                        </div>
                      </div>
                      
                      {/* 评论区 */}
                      {post.repliesList && post.repliesList.length > 0 && (
                        <div className="border-t pt-3">
                          <h4 className="text-sm font-medium mb-3 flex items-center gap-1">
                            <MessageCircle className="h-4 w-4" />
                            温暖回应
                          </h4>
                          <div className="space-y-3">
                            {post.repliesList.map((reply: Reply) => (
                              <div key={reply.id} className="bg-gray-50 p-3 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                                    <Heart className="h-3 w-3 text-green-600" />
                                  </div>
                                  <span className="text-xs text-gray-500">
                                    {formatTimestamp(reply.timestamp)}
                                  </span>
                                  <button 
                                    onClick={() => handleLikeReply(post.id, reply.id)}
                                    className="ml-auto flex items-center gap-1 text-xs text-gray-500 hover:text-blue-600 transition-colors"
                                  >
                                    <ThumbsUp className="h-3 w-3" />
                                    <span>{reply.likes}</span>
                                  </button>
                                </div>
                                <p className="text-sm text-gray-700">{reply.content}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* 回复输入框 - 暂时禁用，等待功能完善 */}
                      <div className="border-t pt-3 mt-4">
                        <div className="flex gap-2">
                          <Textarea
                            placeholder="回复功能正在开发中..."
                            rows={2}
                            className="resize-none"
                            disabled
                          />
                          <Button size="sm" className="px-3" disabled>
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">回复功能即将上线，敬请期待！</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}