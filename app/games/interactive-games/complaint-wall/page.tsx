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
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  ArrowLeft,
  MessageSquare,
  ThumbsUp,
  Laugh,
  Frown,
  Meh,
  AlertCircle,
  Send,
  Filter,
  TrendingUp,
  Calendar,
  Clock,
  Heart,
  Zap,
  Coffee,
  Briefcase,
  Users,
  Home,
  Car,
  ShoppingBag,
  Shield,
  Eye,
  EyeOff,
  Flame,
  Star,
  MessageCircle,
  CheckCircle,
  MoreHorizontal,
  Share2,
  Bookmark,
  Flag,
  User,
  Volume2,
  VolumeX,
  Book
} from 'lucide-react'
import Link from 'next/link'

// 吐槽分类
const complaintCategories = [
  {
    id: 'work',
    name: '工作',
    icon: <Briefcase className="h-5 w-5 text-blue-500" />,
    color: 'bg-blue-100 text-blue-800 border-blue-200'
  },
  {
    id: 'life',
    name: '生活',
    icon: <Home className="h-5 w-5 text-green-500" />,
    color: 'bg-green-100 text-green-800 border-green-200'
  },
  {
    id: 'relationship',
    name: '情感',
    icon: <Heart className="h-5 w-5 text-pink-500" />,
    color: 'bg-pink-100 text-pink-800 border-pink-200'
  },
  {
    id: 'study',
    name: '学习',
    icon: <Book className="h-5 w-5 text-purple-500" />,
    color: 'bg-purple-100 text-purple-800 border-purple-200'
  },
  {
    id: 'traffic',
    name: '交通',
    icon: <Car className="h-5 w-5 text-orange-500" />,
    color: 'bg-orange-100 text-orange-800 border-orange-200'
  },
  {
    id: 'shopping',
    name: '消费',
    icon: <ShoppingBag className="h-5 w-5 text-amber-500" />,
    color: 'bg-amber-100 text-amber-800 border-amber-200'
  },
  {
    id: 'health',
    name: '健康',
    icon: <Zap className="h-5 w-5 text-red-500" />,
    color: 'bg-red-100 text-red-800 border-red-200'
  },
  {
    id: 'other',
    name: '其他',
    icon: <MessageCircle className="h-5 w-5 text-gray-500" />,
    color: 'bg-gray-100 text-gray-800 border-gray-200'
  }
]

// 情绪类型
const emotionTypes = [
  {
    id: 'angry',
    name: '生气',
    icon: <Frown className="h-5 w-5 text-red-500" />,
    color: 'bg-red-100 text-red-800 border-red-200'
  },
  {
    id: 'frustrated',
    name: '郁闷',
    icon: <Meh className="h-5 w-5 text-orange-500" />,
    color: 'bg-orange-100 text-orange-800 border-orange-200'
  },
  {
    id: 'helpless',
    name: '无奈',
    icon: <AlertCircle className="h-5 w-5 text-yellow-500" />,
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200'
  },
  {
    id: 'sad',
    name: '难过',
    icon: <Frown className="h-5 w-5 text-blue-500" />,
    color: 'bg-blue-100 text-blue-800 border-blue-200'
  }
]

// 吐槽回复模板
const replyTemplates = [
  "抱抱你，这种情况确实很让人烦恼",
  "我理解你的感受，希望事情能尽快好转",
  "你的感受很重要，不要忽视自己的情绪",
  "有时候适当的发泄也是一种自我保护",
  "这确实很难受，你已经做得很好了",
  "希望你能找到解决问题的方法",
  "你的坚强值得赞赏，但也要照顾好自己",
  "每个人的情绪都值得被尊重和理解",
  "这段经历会让你变得更强大",
  "你的感受很真实，不需要压抑自己"
]

// 吐槽数据接口
interface Complaint {
  id: string
  content: string
  category: string
  emotion: string
  timestamp: number
  likes: number
  replies: Reply[]
  isAnonymous: boolean
  tags: string[]
  isHot: boolean
}

// 回复数据接口
interface Reply {
  id: string
  content: string
  timestamp: number
  likes: number
  isAnonymous: boolean
}

export default function ComplaintWallPage() {
  const [complaints, setComplaints] = useState<Complaint[]>([])
  const [newComplaint, setNewComplaint] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('work')
  const [selectedEmotion, setSelectedEmotion] = useState('angry')
  const [isAnonymous, setIsAnonymous] = useState(true)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [activeFilter, setActiveFilter] = useState('all')
  const [sortBy, setSortBy] = useState<'latest' | 'popular' | 'hot'>('latest')
  const [showReplyForm, setShowReplyForm] = useState<string | null>(null)
  const [newReply, setNewReply] = useState('')
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null)

  // 初始化数据
  useEffect(() => {
    // 加载保存的吐槽
    const savedComplaints = safeLocalStorage.getItem('complaintWallData')
    if (savedComplaints) {
      try {
        const parsedComplaints = JSON.parse(savedComplaints)
        setComplaints(parsedComplaints)
      } catch (error) {
        console.error('Failed to load complaints:', error)
        loadMockData()
      }
    } else {
      loadMockData()
    }
  }, [])

  // 加载模拟数据
  const loadMockData = () => {
    const mockComplaints: Complaint[] = [
      {
        id: '1',
        content: '今天又被老板临时加了工作，本来约好和朋友的聚会又泡汤了，真的烦死了！',
        category: 'work',
        emotion: 'angry',
        timestamp: Date.now() - 1000 * 60 * 30,
        likes: 23,
        replies: [
          {
            id: 'r1',
            content: '抱抱你，这种情况确实很让人烦恼',
            timestamp: Date.now() - 1000 * 60 * 25,
            likes: 5,
            isAnonymous: true
          },
          {
            id: 'r2',
            content: '我理解你的感受，希望事情能尽快好转',
            timestamp: Date.now() - 1000 * 60 * 20,
            likes: 3,
            isAnonymous: true
          }
        ],
        isAnonymous: true,
        tags: ['加班', '老板', '爽约'],
        isHot: true
      },
      {
        id: '2',
        content: '地铁上有人大声打电话，还说了一路，真的能理解在公共场合要小声一点吗？',
        category: 'traffic',
        emotion: 'frustrated',
        timestamp: Date.now() - 1000 * 60 * 60,
        likes: 18,
        replies: [],
        isAnonymous: true,
        tags: ['地铁', '公共场合', '素质'],
        isHot: false
      },
      {
        id: '3',
        content: '减肥太难了，控制饮食一个月就瘦了一斤，感觉人生失去了意义...',
        category: 'health',
        emotion: 'sad',
        timestamp: Date.now() - 1000 * 60 * 120,
        likes: 32,
        replies: [
          {
            id: 'r3',
            content: '你的感受很真实，不需要压抑自己',
            timestamp: Date.now() - 1000 * 60 * 100,
            likes: 8,
            isAnonymous: true
          }
        ],
        isAnonymous: true,
        tags: ['减肥', '身材焦虑', '困难'],
        isHot: true
      }
    ]
    
    setComplaints(mockComplaints)
    safeLocalStorage.setItem('complaintWallData', JSON.stringify(mockComplaints))
  }

  // 保存吐槽数据
  const saveComplaints = (updatedComplaints: Complaint[]) => {
    setComplaints(updatedComplaints)
    safeLocalStorage.setItem('complaintWallData', JSON.stringify(updatedComplaints))
  }

  // 格式化时间
  const formatTime = (timestamp: number) => {
    const now = Date.now()
    const diff = now - timestamp
    
    if (diff < 1000 * 60) {
      return '刚刚'
    } else if (diff < 1000 * 60 * 60) {
      return `${Math.floor(diff / (1000 * 60))}分钟前`
    } else if (diff < 1000 * 60 * 60 * 24) {
      return `${Math.floor(diff / (1000 * 60 * 60))}小时前`
    } else {
      return `${Math.floor(diff / (1000 * 60 * 60 * 24))}天前`
    }
  }

  // 提交吐槽
  const submitComplaint = () => {
    if (!newComplaint.trim()) return
    
    const tags = extractTags(newComplaint)
    
    const newComplaintData: Complaint = {
      id: Date.now().toString(),
      content: newComplaint.trim(),
      category: selectedCategory,
      emotion: selectedEmotion,
      timestamp: Date.now(),
      likes: 0,
      replies: [],
      isAnonymous,
      tags,
      isHot: false
    }
    
    const updatedComplaints = [newComplaintData, ...complaints]
    saveComplaints(updatedComplaints)
    
    // 重置表单
    setNewComplaint('')
    setSelectedCategory('work')
    setSelectedEmotion('angry')
    
    if (soundEnabled) {
      // 播放提交成功音效
    }
  }

  // 提取标签
  const extractTags = (content: string): string[] => {
    const tagRegex = /#([^#\s]+)#/g
    const matches = content.match(tagRegex)
    if (matches) {
      return matches.map(tag => tag.replace(/#/g, ''))
    }
    return []
  }

  // 点赞
  const likeComplaint = (id: string) => {
    const updatedComplaints = complaints.map(complaint => 
      complaint.id === id 
        ? { ...complaint, likes: complaint.likes + 1 }
        : complaint
    )
    saveComplaints(updatedComplaints)
  }

  // 点赞回复
  const likeReply = (complaintId: string, replyId: string) => {
    const updatedComplaints = complaints.map(complaint => {
      if (complaint.id === complaintId) {
        const updatedReplies = complaint.replies.map(reply => 
          reply.id === replyId 
            ? { ...reply, likes: reply.likes + 1 }
            : reply
        )
        return { ...complaint, replies: updatedReplies }
      }
      return complaint
    })
    saveComplaints(updatedComplaints)
  }

  // 添加回复
  const addReply = (complaintId: string) => {
    if (!newReply.trim()) return
    
    const newReplyData: Reply = {
      id: Date.now().toString(),
      content: newReply.trim(),
      timestamp: Date.now(),
      likes: 0,
      isAnonymous: true
    }
    
    const updatedComplaints = complaints.map(complaint => {
      if (complaint.id === complaintId) {
        return { 
          ...complaint, 
          replies: [...complaint.replies, newReplyData]
        }
      }
      return complaint
    })
    
    saveComplaints(updatedComplaints)
    setNewReply('')
    setShowReplyForm(null)
  }

  // 获取筛选后的吐槽
  const getFilteredComplaints = () => {
    let filtered = [...complaints]
    
    // 按分类筛选
    if (activeFilter !== 'all') {
      filtered = filtered.filter(complaint => complaint.category === activeFilter)
    }
    
    // 排序
    switch (sortBy) {
      case 'latest':
        filtered.sort((a, b) => b.timestamp - a.timestamp)
        break
      case 'popular':
        filtered.sort((a, b) => b.likes - a.likes)
        break
      case 'hot':
        filtered.sort((a, b) => {
          const aScore = a.likes + (a.isHot ? 100 : 0) + a.replies.length * 2
          const bScore = b.likes + (b.isHot ? 100 : 0) + b.replies.length * 2
          return bScore - aScore
        })
        break
    }
    
    return filtered
  }

  // 分享吐槽
  const shareComplaint = (complaint: Complaint) => {
    const text = `${complaint.content}\n\n来自吐槽墙 - 一个可以发泄情绪的地方`
    
    if (navigator.share) {
      navigator.share({
        title: '吐槽分享',
        text: text
      })
    } else {
      navigator.clipboard.writeText(text)
      alert('吐槽内容已复制到剪贴板！')
    }
  }

  // 举报吐槽
  const reportComplaint = (complaint: Complaint) => {
    alert('举报已收到，我们会尽快处理')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/games/interactive-games" className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-800 transition-colors mb-6">
            <ArrowLeft className="h-4 w-4" />
            返回互动游戏
          </Link>
          
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600 mb-4">
              吐槽墙
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              匿名吐槽释放压力，获得共鸣和建议，这里是你的情绪出口
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 左侧发布区域 */}
          <div className="lg:col-span-1">
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg sticky top-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-orange-500" />
                  发表吐槽
                </CardTitle>
                <CardDescription>
                  匿名发表，尽情释放你的情绪
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* 选择分类 */}
                <div>
                  <label className="block text-sm font-medium mb-2">吐槽分类</label>
                  <div className="grid grid-cols-2 gap-2">
                    {complaintCategories.map(category => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`p-2 rounded-lg border transition-all flex items-center gap-2 ${
                          selectedCategory === category.id 
                            ? 'border-orange-500 bg-orange-50 text-orange-700' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {category.icon}
                        <span className="text-xs">{category.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* 选择情绪 */}
                <div>
                  <label className="block text-sm font-medium mb-2">当前情绪</label>
                  <div className="grid grid-cols-2 gap-2">
                    {emotionTypes.map(emotion => (
                      <button
                        key={emotion.id}
                        onClick={() => setSelectedEmotion(emotion.id)}
                        className={`p-2 rounded-lg border transition-all flex items-center gap-2 ${
                          selectedEmotion === emotion.id 
                            ? 'border-red-500 bg-red-50 text-red-700' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {emotion.icon}
                        <span className="text-xs">{emotion.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* 匿名设置 */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <Shield className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">匿名发布</span>
                  </label>
                  <button
                    onClick={() => setIsAnonymous(!isAnonymous)}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      isAnonymous ? 'bg-orange-500' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                      isAnonymous ? 'translate-x-6' : 'translate-x-0.5'
                    }`}></div>
                  </button>
                </div>
                
                {/* 吐槽内容 */}
                <div>
                  <label className="block text-sm font-medium mb-2">吐槽内容</label>
                  <Textarea
                    value={newComplaint}
                    onChange={(e) => setNewComplaint(e.target.value)}
                    placeholder="把你想吐槽的事情说出来吧，可以用#话题#来标记关键词"
                    className="resize-none"
                    rows={4}
                  />
                </div>
                
                {/* 提交按钮 */}
                <Button 
                  onClick={submitComplaint}
                  disabled={!newComplaint.trim()}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                >
                  <Send className="h-4 w-4 mr-2" />
                  发布吐槽
                </Button>
                
                {/* 提示 */}
                <div className="text-xs text-gray-500 space-y-1">
                  <p>• 匿名发布，保护你的隐私</p>
                  <p>• 支持#话题#标记关键词</p>
                  <p>• 请勿发布违法或不当内容</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 右侧吐槽列表 */}
          <div className="lg:col-span-2">
            {/* 筛选和排序 */}
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg mb-6">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  {/* 筛选 */}
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-2">筛选分类</label>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setActiveFilter('all')}
                        className={`px-3 py-1 rounded-full text-sm transition-colors ${
                          activeFilter === 'all' 
                            ? 'bg-orange-100 text-orange-800 border-orange-200' 
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        全部
                      </button>
                      {complaintCategories.map(category => (
                        <button
                          key={category.id}
                          onClick={() => setActiveFilter(category.id)}
                          className={`px-3 py-1 rounded-full text-sm transition-colors ${
                            activeFilter === category.id 
                              ? 'bg-orange-100 text-orange-800 border-orange-200' 
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {category.name}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* 排序 */}
                  <div>
                    <label className="block text-sm font-medium mb-2">排序方式</label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSortBy('latest')}
                        className={`px-3 py-1 rounded-full text-sm transition-colors ${
                          sortBy === 'latest' 
                            ? 'bg-orange-100 text-orange-800 border-orange-200' 
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        <Clock className="h-3 w-3 inline mr-1" />
                        最新
                      </button>
                      <button
                        onClick={() => setSortBy('popular')}
                        className={`px-3 py-1 rounded-full text-sm transition-colors ${
                          sortBy === 'popular' 
                            ? 'bg-orange-100 text-orange-800 border-orange-200' 
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        <ThumbsUp className="h-3 w-3 inline mr-1" />
                        热门
                      </button>
                      <button
                        onClick={() => setSortBy('hot')}
                        className={`px-3 py-1 rounded-full text-sm transition-colors ${
                          sortBy === 'hot' 
                            ? 'bg-orange-100 text-orange-800 border-orange-200' 
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        <Flame className="h-3 w-3 inline mr-1" />
                        热议
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 吐槽列表 */}
            <div className="space-y-4">
              {getFilteredComplaints().length > 0 ? (
                getFilteredComplaints().map((complaint) => {
                  const category = complaintCategories.find(c => c.id === complaint.category)
                  const emotion = emotionTypes.find(e => e.id === complaint.emotion)
                  
                  return (
                    <Card key={complaint.id} className="bg-white/80 backdrop-blur-sm shadow-lg overflow-hidden">
                      <CardContent className="p-6">
                        {/* 吐槽头部 */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <Badge className={category?.color}>
                              {category?.icon}
                              <span className="ml-1">{category?.name}</span>
                            </Badge>
                            <Badge className={emotion?.color}>
                              {emotion?.icon}
                              <span className="ml-1">{emotion?.name}</span>
                            </Badge>
                            {complaint.isHot && (
                              <Badge className="bg-red-100 text-red-800 border-red-200">
                                <Flame className="h-3 w-3 mr-1" />
                                热议
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500">{formatTime(complaint.timestamp)}</span>
                            <button className="text-gray-400 hover:text-gray-600">
                              <MoreHorizontal className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        
                        {/* 吐槽内容 */}
                        <div className="mb-4">
                          <p className="text-gray-800 leading-relaxed">{complaint.content}</p>
                          {complaint.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                              {complaint.tags.map((tag, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  #{tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                        
                        {/* 操作按钮 */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-4">
                            <button
                              onClick={() => likeComplaint(complaint.id)}
                              className="flex items-center gap-1 text-gray-600 hover:text-orange-600 transition-colors"
                            >
                              <ThumbsUp className="h-4 w-4" />
                              <span className="text-sm">{complaint.likes}</span>
                            </button>
                            <button
                              onClick={() => setShowReplyForm(showReplyForm === complaint.id ? null : complaint.id)}
                              className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors"
                            >
                              <MessageCircle className="h-4 w-4" />
                              <span className="text-sm">{complaint.replies.length}</span>
                            </button>
                            <button
                              onClick={() => shareComplaint(complaint)}
                              className="flex items-center gap-1 text-gray-600 hover:text-green-600 transition-colors"
                            >
                              <Share2 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => reportComplaint(complaint)}
                              className="flex items-center gap-1 text-gray-600 hover:text-red-600 transition-colors"
                            >
                              <Flag className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="flex items-center gap-2">
                            {complaint.isAnonymous ? (
                              <div className="flex items-center gap-1 text-xs text-gray-500">
                                <User className="h-3 w-3" />
                                匿名用户
                              </div>
                            ) : (
                              <div className="flex items-center gap-1 text-xs text-gray-500">
                                <User className="h-3 w-3" />
                                用户
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {/* 回复区域 */}
                        {showReplyForm === complaint.id && (
                          <div className="bg-gray-50 p-4 rounded-lg mb-4">
                            <div className="flex gap-2">
                              <Textarea
                                value={newReply}
                                onChange={(e) => setNewReply(e.target.value)}
                                placeholder="写下你的回复..."
                                className="resize-none flex-1"
                                rows={2}
                              />
                              <Button 
                                onClick={() => addReply(complaint.id)}
                                disabled={!newReply.trim()}
                                size="sm"
                                className="bg-blue-500 hover:bg-blue-600"
                              >
                                <Send className="h-4 w-4" />
                              </Button>
                            </div>
                            
                            {/* 快速回复模板 */}
                            <div className="mt-2">
                              <p className="text-xs text-gray-500 mb-2">快速回复：</p>
                              <div className="flex flex-wrap gap-1">
                                {replyTemplates.slice(0, 3).map((template, index) => (
                                  <button
                                    key={index}
                                    onClick={() => setNewReply(template)}
                                    className="text-xs bg-white px-2 py-1 rounded border hover:bg-gray-50 transition-colors"
                                  >
                                    {template}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {/* 回复列表 */}
                        {complaint.replies.length > 0 && (
                          <div className="space-y-3 border-t pt-4">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <MessageCircle className="h-4 w-4" />
                              <span>回复 ({complaint.replies.length})</span>
                            </div>
                            {complaint.replies.map((reply) => (
                              <div key={reply.id} className="bg-gray-50 p-3 rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                                      <User className="h-3 w-3 text-white" />
                                    </div>
                                    <span className="text-xs text-gray-500">
                                      {reply.isAnonymous ? '匿名用户' : '用户'}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                      {formatTime(reply.timestamp)}
                                    </span>
                                  </div>
                                  <button
                                    onClick={() => likeReply(complaint.id, reply.id)}
                                    className="flex items-center gap-1 text-gray-500 hover:text-blue-600 transition-colors"
                                  >
                                    <ThumbsUp className="h-3 w-3" />
                                    <span className="text-xs">{reply.likes}</span>
                                  </button>
                                </div>
                                <p className="text-sm text-gray-700">{reply.content}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )
                })
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <MessageSquare className="h-12 w-12 mx-auto" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-600 mb-2">还没有吐槽</h3>
                  <p className="text-gray-500">快来发布第一个吐槽吧！</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}