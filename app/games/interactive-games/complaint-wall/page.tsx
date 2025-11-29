'use client'

import { useState, useEffect } from 'react'
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
  ShoppingBag
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
    name: '人际',
    icon: <Users className="h-5 w-5 text-purple-500" />,
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
    icon: <ShoppingBag className="h-5 w-5 text-pink-500" />,
    color: 'bg-pink-100 text-pink-800 border-pink-200'
  },
  {
    id: 'other',
    name: '其他',
    icon: <Coffee className="h-5 w-5 text-gray-500" />,
    color: 'bg-gray-100 text-gray-800 border-gray-200'
  }
]

// 模拟吐槽数据
const mockComplaints = [
  {
    id: 'complaint_001',
    category: 'work',
    title: '今天又被老板画大饼了',
    content: '老板今天又开了一个"重要"会议，说我们项目完成后会有丰厚奖励。但是上个月的项目奖励到现在还没影，真的厌倦了这种空头承诺。',
    mood: 'frustrated',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30分钟前
    likes: 23,
    comments: 8,
    replies: [
      { id: 'r1', content: '同感！我们老板也总是这样，画的饼比吃的还多', timestamp: new Date(Date.now() - 1000 * 60 * 25), likes: 5 },
      { id: 'r2', content: '建议记录下来，到时候当面核对', timestamp: new Date(Date.now() - 1000 * 60 * 20), likes: 3 }
    ]
  },
  {
    id: 'complaint_002',
    category: 'life',
    title: '邻居半夜三点还在开派对',
    content: '我已经连续三晚没睡好了，邻居每到周末就开派对到凌晨，音乐声震天响。明天要上班真的很困，但又不好意思直接去说。',
    mood: 'angry',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2小时前
    likes: 45,
    comments: 12,
    replies: [
      { id: 'r3', content: '可以考虑买个耳塞，或者直接去提醒一下', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1.5), likes: 8 },
      { id: 'r4', content: '这种情况建议直接找物业，影响正常休息了', timestamp: new Date(Date.now() - 1000 * 60 * 55), likes: 10 }
    ]
  },
  {
    id: 'complaint_003',
    category: 'traffic',
    title: '地铁安检队伍长得像贪吃蛇',
    content: '今天早上地铁站安检队伍排到站外了，每个人都要背过身安检，效率极低。迟到了15分钟，被领导说了一顿，真的很无语。',
    mood: 'helpless',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5小时前
    likes: 67,
    comments: 23,
    replies: [
      { id: 'r5', content: '地铁安检确实越来越慢了，感觉形式大于内容', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), likes: 15 },
      { id: 'r6', content: '我们这边的地铁也开始这样了，希望有人能反映一下', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), likes: 12 }
    ]
  },
  {
    id: 'complaint_004',
    category: 'shopping',
    title: '网购的食品被物流放了三天',
    content: '买了一箱新鲜水果，结果物流在中转站放了三天，收到的时候一半都坏掉了。客服只愿意退款一半，真的气死我了。',
    mood: 'angry',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8小时前
    likes: 31,
    comments: 15,
    replies: [
      { id: 'r7', content: '生鲜产品真的不应该这样，建议投诉到底', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 7), likes: 9 },
      { id: 'r8', content: '可以找消费者协会，这种明显是物流责任', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), likes: 7 }
    ]
  },
  {
    id: 'complaint_005',
    category: 'relationship',
    title: '朋友总是迟到，从不守时',
    content: '约好的下午两点见面，结果朋友三点才到，还一脸无所谓。每次都这样，真的让人很失望。守时不是基本的尊重吗？',
    mood: 'disappointed',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12小时前
    likes: 58,
    comments: 19,
    replies: [
      { id: 'r9', content: '我也有这样的朋友，后来我故意自己也迟到，她就不高兴了', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 11), likes: 20 },
      { id: 'r10', content: '可以考虑直接跟她谈谈，如果真的在意这段友情', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 10), likes: 15 }
    ]
  }
]

export default function ComplaintWallPage() {
  const [complaints, setComplaints] = useState(mockComplaints)
  const [newComplaint, setNewComplaint] = useState('')
  const [complaintTitle, setComplaintTitle] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('work')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSubmitSuccess, setShowSubmitSuccess] = useState(false)
  const [activeTab, setActiveTab] = useState('hot')
  const [selectedMood, setSelectedMood] = useState('frustrated')

  // 获取心情图标
  const getMoodIcon = (mood: string) => {
    switch (mood) {
      case 'angry':
        return <Frown className="h-5 w-5 text-red-500" />
      case 'frustrated':
        return <AlertCircle className="h-5 w-5 text-orange-500" />
      case 'disappointed':
        return <Meh className="h-5 w-5 text-yellow-500" />
      case 'helpless':
        return <Meh className="h-5 w-5 text-blue-500" />
      default:
        return <Meh className="h-5 w-5 text-gray-500" />
    }
  }

  // 获取心情文本
  const getMoodText = (mood: string) => {
    switch (mood) {
      case 'angry':
        return '生气'
      case 'frustrated':
        return '沮丧'
      case 'disappointed':
        return '失望'
      case 'helpless':
        return '无助'
      default:
        return '复杂'
    }
  }

  // 格式化时间戳
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

  // 提交吐槽
  const submitComplaint = (): void => {
    if (!complaintTitle.trim() || !newComplaint.trim()) return

    setIsSubmitting(true)
    
    // 模拟提交过程
    setTimeout(() => {
      const categoryInfo = complaintCategories.find(cat => cat.id === selectedCategory)
      const newPost = {
        id: `complaint_${Date.now()}`,
        category: selectedCategory,
        title: complaintTitle.trim(),
        content: newComplaint.trim(),
        mood: selectedMood,
        timestamp: new Date(),
        likes: 0,
        comments: 0,
        replies: []
      }
      
      setComplaints(prev => [newPost, ...prev])
      setComplaintTitle('')
      setNewComplaint('')
      setIsSubmitting(false)
      setShowSubmitSuccess(true)
      
      // 3秒后隐藏成功提示
      setTimeout(() => {
        setShowSubmitSuccess(false)
      }, 3000)
    }, 1000)
  }

  // 过滤吐槽
  const filteredComplaints = (): any[] => {
    if (activeTab === 'hot') {
      // 按点赞数排序
      return [...complaints].sort((a, b) => b.likes - a.likes)
    } else if (activeTab === 'latest') {
      // 按时间排序
      return [...complaints].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    } else {
      // 按分类筛选
      return complaints.filter(complaint => complaint.category === activeTab)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6">
            <Link href="/games">
              <Button variant="outline" className="mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                返回互动游戏
              </Button>
            </Link>
          </div>
          
          {/* 页面标题 */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              吐槽墙
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500 block md:inline">
                情绪释放
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              匿名分享你的烦恼和不爽，获得共鸣和理解，释放压力
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 发布吐槽 */}
            <div className="lg:col-span-1">
              <Card className="sticky top-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-orange-500" />
                    发布吐槽
                  </CardTitle>
                  <CardDescription>
                    匿名分享你的烦恼，释放不快情绪
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* 分类选择 */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">吐槽分类</label>
                    <div className="grid grid-cols-3 gap-2">
                      {complaintCategories.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => setSelectedCategory(category.id)}
                          className={`p-2 rounded-lg border flex flex-col items-center gap-1 transition-colors ${
                            selectedCategory === category.id ? category.color : 'border-gray-200'
                          }`}
                        >
                          {category.icon}
                          <span className="text-xs">{category.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* 心情选择 */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">当前心情</label>
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { mood: 'angry', icon: <Frown className="h-5 w-5 text-red-500" />, text: '生气' },
                        { mood: 'frustrated', icon: <AlertCircle className="h-5 w-5 text-orange-500" />, text: '沮丧' },
                        { mood: 'disappointed', icon: <Meh className="h-5 w-5 text-yellow-500" />, text: '失望' },
                        { mood: 'helpless', icon: <Meh className="h-5 w-5 text-blue-500" />, text: '无助' }
                      ].map((item) => (
                        <button
                          key={item.mood}
                          onClick={() => setSelectedMood(item.mood)}
                          className={`p-2 rounded-lg border flex flex-col items-center gap-1 transition-colors ${
                            selectedMood === item.mood ? 'bg-gray-100 border-gray-400' : 'border-gray-200'
                          }`}
                        >
                          {item.icon}
                          <span className="text-xs">{item.text}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* 标题输入 */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">吐槽标题</label>
                    <input
                      type="text"
                      placeholder="一句话概括你的不满..."
                      value={complaintTitle}
                      onChange={(e) => setComplaintTitle(e.target.value)}
                      className="w-full p-2 border rounded-lg resize-none"
                    />
                  </div>
                  
                  {/* 内容输入 */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">详细内容</label>
                    <Textarea
                      placeholder="详细说说你的遭遇和不爽，这里是你发泄情绪的安全空间..."
                      value={newComplaint}
                      onChange={(e) => setNewComplaint(e.target.value)}
                      rows={6}
                      className="resize-none"
                    />
                  </div>
                  
                  {/* 提交按钮 */}
                  <Button 
                    onClick={submitComplaint}
                    disabled={!complaintTitle.trim() || !newComplaint.trim() || isSubmitting}
                    className="w-full"
                  >
                    {isSubmitting ? '发布中...' : '发布吐槽'}
                  </Button>
                  
                  {showSubmitSuccess && (
                    <div className="bg-green-50 border border-green-200 text-green-700 p-3 rounded-lg text-sm">
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4" />
                        <span>吐槽发布成功！情绪释放完毕，感觉好些了吗？</span>
                      </div>
                    </div>
                  )}
                  
                  {/* 温馨提示 */}
                  <div className="bg-blue-50 border border-blue-200 text-blue-700 p-3 rounded-lg text-sm">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">温馨提示</p>
                        <p>吐槽可以释放情绪，但请避免人身攻击和泄露他人隐私。保持理性，给自己和他人留一些空间。</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* 吐槽列表 */}
            <div className="lg:col-span-2">
              {/* 筛选标签 */}
              <Card className="mb-6">
                <CardContent className="pt-6">
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="hot" className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4" />
                        热门吐槽
                      </TabsTrigger>
                      <TabsTrigger value="latest" className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        最新吐槽
                      </TabsTrigger>
                      <TabsTrigger value="work" className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4" />
                        工作相关
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </CardContent>
              </Card>
              
              {/* 吐槽列表 */}
              <div className="space-y-6">
                {filteredComplaints().map((complaint) => (
                  <Card key={complaint.id} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`p-2 rounded-lg border ${
                            complaintCategories.find(cat => cat.id === complaint.category)?.color || 'border-gray-200'
                          }`}>
                            {complaintCategories.find(cat => cat.id === complaint.category)?.icon}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">
                                {complaintCategories.find(cat => cat.id === complaint.category)?.name}
                              </Badge>
                              <div className="flex items-center gap-1 text-sm text-gray-500">
                                {getMoodIcon(complaint.mood)}
                                <span>{getMoodText(complaint.mood)}</span>
                              </div>
                              <div className="flex items-center gap-1 text-sm text-gray-500">
                                <Calendar className="h-3 w-3" />
                                {formatTimestamp(complaint.timestamp)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <h3 className="text-lg font-semibold mb-2">{complaint.title}</h3>
                      <p className="text-gray-700 mb-4 leading-relaxed">{complaint.content}</p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                        <button className="flex items-center gap-1 hover:text-red-600 transition-colors">
                          <ThumbsUp className="h-4 w-4" />
                          <span>{complaint.likes}</span>
                        </button>
                        <button className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                          <MessageSquare className="h-4 w-4" />
                          <span>{complaint.comments}</span>
                        </button>
                        <button className="flex items-center gap-1 hover:text-green-600 transition-colors">
                          <Laugh className="h-4 w-4" />
                          <span>感同身受</span>
                        </button>
                      </div>
                      
                      {/* 评论区 */}
                      {complaint.replies && complaint.replies.length > 0 && (
                        <div className="border-t pt-3">
                          <h4 className="text-sm font-medium mb-3 flex items-center gap-1">
                            <MessageSquare className="h-4 w-4" />
                            共鸣回应
                          </h4>
                          <div className="space-y-3">
                            {complaint.replies.map((reply) => (
                              <div key={reply.id} className="bg-gray-50 p-3 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                  <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center">
                                    <Heart className="h-3 w-3 text-orange-600" />
                                  </div>
                                  <span className="text-xs text-gray-500">
                                    {formatTimestamp(reply.timestamp)}
                                  </span>
                                  <button className="ml-auto flex items-center gap-1 text-xs text-gray-500 hover:text-blue-600">
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
                      
                      {/* 回复输入框 */}
                      <div className="border-t pt-3 mt-4">
                        <div className="flex gap-2">
                          <Textarea
                            placeholder="写下你的共鸣..."
                            rows={2}
                            className="resize-none"
                          />
                          <Button size="sm" className="px-3">
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
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