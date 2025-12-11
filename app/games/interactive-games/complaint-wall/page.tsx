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
import GlobalNavbar from '@/components/global-navbar'
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
  empathyLevel?: number
  emotionIntensity?: number
  anonymousId?: string
  viewCount: number
  shareCount: number
  isFeatured: boolean
  moodScore: number
  supportTips: string[]
}

// 回复数据接口
interface Reply {
  id: string
  content: string
  timestamp: number
  likes: number
  isAnonymous: boolean
  empathyScore: number
  isHelpful: boolean
  anonymousId?: string
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
            isAnonymous: true,
            empathyScore: 3,
            isHelpful: true
          },
          {
            id: 'r2',
            content: '我理解你的感受，希望事情能尽快好转',
            timestamp: Date.now() - 1000 * 60 * 20,
            likes: 3,
            isAnonymous: true,
            empathyScore: 2,
            isHelpful: true
          }
        ],
        isAnonymous: true,
        tags: ['加班', '老板', '爽约'],
        isHot: true,
        empathyLevel: 2,
        emotionIntensity: 3,
        viewCount: 156,
        shareCount: 12,
        isFeatured: false,
        moodScore: -2,
        supportTips: ['尝试深呼吸，让自己冷静下来', '可以适当运动来释放负面情绪']
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
        isHot: false,
        empathyLevel: 1,
        emotionIntensity: 2,
        viewCount: 89,
        shareCount: 5,
        isFeatured: false,
        moodScore: -1,
        supportTips: ['和朋友聊聊天，转移注意力', '尝试换个角度看问题，可能会有新发现']
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
            isAnonymous: true,
            empathyScore: 3,
            isHelpful: true
          }
        ],
        isAnonymous: true,
        tags: ['减肥', '身材焦虑', '困难'],
        isHot: true,
        empathyLevel: 3,
        emotionIntensity: 3,
        viewCount: 234,
        shareCount: 28,
        isFeatured: true,
        moodScore: -3,
        supportTips: ['听听喜欢的音乐，让自己放松', '写日记或画画，表达内心的感受', '给自己一些独处的时间，但要记得寻求支持']
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
      isHot: false,
      viewCount: 0,
      shareCount: 0,
      isFeatured: false,
      moodScore: 0,
      supportTips: []
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

  // 点赞 - 使用情感共鸣功能
  const likeComplaint = (id: string) => {
    const updatedComplaints = complaints.map(complaint => {
      if (complaint.id === id) {
        // 增加点赞数
        const newLikes = complaint.likes + 1
        
        // 根据点赞数判断是否成为热议
        const isHot = newLikes >= 10 || complaint.replies.length >= 5
        
        // 分析情感共鸣级别
        const empathyLevel = analyzeEmpathyLevel(complaint.content)
        
        return { 
          ...complaint, 
          likes: newLikes,
          isHot,
          empathyLevel
        }
      }
      return complaint
    })
    
    saveComplaints(updatedComplaints)
    
    // 根据共鸣级别显示不同的提示
    const complaint = complaints.find(c => c.id === id)
    if (complaint) {
      const empathyLevel = analyzeEmpathyLevel(complaint.content)
      let message = ''
      
      switch (empathyLevel) {
        case 3:
          message = '💝 高度共鸣！你的支持让吐槽者感受到了强烈的理解和温暖。'
          break
        case 2:
          message = '💝 中度共鸣！你的点赞传递了温暖和支持。'
          break
        case 1:
          message = '💝 轻度共鸣！你的支持让吐槽者感受到了理解。'
          break
        default:
          message = '💝 感谢你的共鸣！你的支持让吐槽者感受到了温暖和理解。'
      }
      
      setTimeout(() => {
        alert(message)
      }, 300)
    }
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
      isAnonymous: true,
      empathyScore: 0,
      isHelpful: false
    }
    
    const updatedComplaints = complaints.map(complaint => {
      if (complaint.id === complaintId) {
        // 检查是否需要升级为热议
        const newReplies = [...complaint.replies, newReplyData]
        const isHot = complaint.likes >= 10 || newReplies.length >= 5
        
        return { 
          ...complaint, 
          replies: newReplies,
          isHot
        }
      }
      return complaint
    })
    
    saveComplaints(updatedComplaints)
    setNewReply('')
    setShowReplyForm(null)
    
    // 显示回复成功提示
    setTimeout(() => {
      alert('💬 你的回复已发布！感谢你的温暖回应。')
    }, 500)
  }

  // 分析回复的情感共鸣级别
  const analyzeEmpathyLevel = (content: string): number => {
    const empathyWords = [
      '理解', '感受', '体会', '共情', '同理',
      '支持', '鼓励', '温暖', '关心', '陪伴',
      '帮助', '安慰', '倾听', '尊重', '接纳'
    ]
    
    let empathyScore = 0
    empathyWords.forEach(word => {
      if (content.includes(word)) empathyScore += 1
    })
    
    // 根据情感词数量分级
    if (empathyScore >= 3) return 3 // 高度共鸣
    if (empathyScore >= 2) return 2 // 中度共鸣
    if (empathyScore >= 1) return 1 // 轻度共鸣
    return 0 // 无共鸣
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

  // 添加情感共鸣功能
  const addEmpathy = (complaintId: string) => {
    const updatedComplaints = complaints.map(complaint => {
      if (complaint.id === complaintId) {
        // 增加点赞数
        const newLikes = complaint.likes + 1
        
        // 根据点赞数判断是否成为热议
        const isHot = newLikes >= 10 || complaint.replies.length >= 5
        
        // 分析情感共鸣级别
        const empathyLevel = analyzeEmpathyLevel(complaint.content)
        
        return { 
          ...complaint, 
          likes: newLikes,
          isHot,
          empathyLevel
        }
      }
      return complaint
    })
    
    saveComplaints(updatedComplaints)
    
    // 显示共鸣提示
    setTimeout(() => {
      alert('💝 感谢你的共鸣！你的支持让吐槽者感受到了温暖和理解。')
    }, 300)
  }

  // 增强匿名保护功能
  const enhanceAnonymity = () => {
    // 添加更严格的匿名保护
    const anonymousIds = ['匿名用户A', '匿名用户B', '匿名用户C', '匿名用户D', '匿名用户E', '匿名用户F', '匿名用户G', '匿名用户H']
    
    // 为每个吐槽生成随机的匿名ID
    const updatedComplaints = complaints.map(complaint => {
      if (complaint.isAnonymous) {
        const randomId = anonymousIds[Math.floor(Math.random() * anonymousIds.length)]
        return {
          ...complaint,
          anonymousId: randomId,
          // 隐藏敏感信息
          content: complaint.content.replace(/(\d{11})/g, '***') // 隐藏手机号
        }
      }
      return complaint
    })
    
    return updatedComplaints
  }

  // 添加情感分析功能
  const analyzeEmotionIntensity = (content: string) => {
    // 情感强度分析
    const intensityWords = [
      { word: '非常', score: 3 }, { word: '极其', score: 4 }, { word: '特别', score: 3 },
      { word: '超级', score: 3 }, { word: '极度', score: 4 }, { word: '格外', score: 2 },
      { word: '十分', score: 3 }, { word: '异常', score: 3 }, { word: '极度', score: 4 }
    ]
    
    let intensityScore = 0
    intensityWords.forEach(item => {
      if (content.includes(item.word)) intensityScore += item.score
    })
    
    // 根据标点符号判断情感强度
    if (content.includes('！！！') || content.includes('!!!')) intensityScore += 3
    if (content.includes('！！') || content.includes('!!')) intensityScore += 2
    if (content.includes('！') || content.includes('!')) intensityScore += 1
    
    if (intensityScore >= 5) return 3 // 高强度
    if (intensityScore >= 3) return 2 // 中强度
    if (intensityScore >= 1) return 1 // 低强度
    return 0 // 无强度
  }

  // 添加情感支持建议
  const getEmotionSupportTips = (emotion: string, intensity: number) => {
    const tips = {
      angry: {
        low: '尝试深呼吸，让自己冷静下来',
        medium: '可以适当运动来释放负面情绪',
        high: '建议寻求专业心理咨询师的帮助'
      },
      frustrated: {
        low: '和朋友聊聊天，转移注意力',
        medium: '尝试换个角度看问题，可能会有新发现',
        high: '给自己一些时间，情绪会慢慢平复的'
      },
      helpless: {
        low: '列出自己能做的事情，从小事做起',
        medium: '寻求朋友或家人的支持和建议',
        high: '不要害怕寻求专业帮助，这很正常'
      },
      sad: {
        low: '听听喜欢的音乐，让自己放松',
        medium: '写日记或画画，表达内心的感受',
        high: '给自己一些独处的时间，但要记得寻求支持'
      }
    }
    
    const emotionTips = tips[emotion as keyof typeof tips]
    if (!emotionTips) return '保持积极心态，一切都会好起来的'
    
    if (intensity >= 3) return emotionTips.high
    if (intensity >= 2) return emotionTips.medium
    return emotionTips.low
  }

  // 情感分析功能
  const analyzeEmotion = (content: string) => {
    // 简单的情感关键词分析
    const positiveWords = ['开心', '喜欢', '爱', '温暖', '感动', '感恩', '幸福']
    const negativeWords = ['生气', '愤怒', '难过', '痛苦', '失望', '讨厌', '恨']
    
    let emotionScore = 0
    
    positiveWords.forEach(word => {
      if (content.includes(word)) emotionScore += 1
    })
    
    negativeWords.forEach(word => {
      if (content.includes(word)) emotionScore -= 1
    })
    
    return emotionScore
  }

  // 举报吐槽
  const reportComplaint = (complaint: Complaint) => {
    alert('举报已收到，我们会尽快处理')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50/80 via-pink-50/80 to-purple-50/80 relative overflow-hidden">
      {/* 增强背景装饰元素 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-rose-300/30 to-pink-300/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-purple-300/30 to-blue-300/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-gradient-to-r from-orange-300/20 to-red-300/20 rounded-full blur-3xl animate-pulse delay-300"></div>
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-gradient-to-r from-yellow-300/20 to-amber-300/20 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-20 right-20 w-40 h-40 bg-red-200/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-20 w-32 h-32 bg-blue-200/20 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>
      
      <GlobalNavbar />
      
      <main className="container mx-auto px-4 py-8 relative z-10">
        <div className="mb-6">
          <Link href="/games/interactive-games" className="inline-flex items-center gap-2 text-rose-600 hover:text-rose-800 transition-all duration-300 transform hover:scale-105 mb-6 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm hover:shadow-md border border-white/30">
            <ArrowLeft className="h-4 w-4" />
            返回互动游戏
          </Link>
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center mb-6 p-6 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-full shadow-2xl animate-bounce hover:animate-pulse transition-all duration-300 hover:shadow-3xl">
              <MessageSquare className="h-12 w-12 text-white" />
            </div>
            <div className="relative inline-block">
              <h1 className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 mb-2 tracking-tight animate-fade-in-up">
                吐槽墙
              </h1>
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 rounded-lg blur-lg opacity-30 animate-pulse"></div>
            </div>
            <p className="text-gray-700 max-w-2xl mx-auto text-xl bg-white/80 backdrop-blur-md px-8 py-4 rounded-xl shadow-lg border border-white/30 mt-4">
              💬 匿名吐槽释放压力，获得共鸣和建议，这里是你的情绪出口
            </p>
            
            {/* 特色标签 */}
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              <Badge variant="secondary" className="bg-orange-100 text-orange-800 border-orange-200 shadow-sm">
                <Shield className="h-3 w-3 mr-1" />匿名保护
              </Badge>
              <Badge variant="secondary" className="bg-red-100 text-red-800 border-red-200 shadow-sm">
                <Heart className="h-3 w-3 mr-1" />情感共鸣
              </Badge>
              <Badge variant="secondary" className="bg-pink-100 text-pink-800 border-pink-200 shadow-sm">
                <Users className="h-3 w-3 mr-1" />社区支持
              </Badge>
              <Badge variant="secondary" className="bg-purple-100 text-purple-800 border-purple-200 shadow-sm">
                <MessageCircle className="h-3 w-3 mr-1" />实时互动
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 左侧发布区域 */}
          <div className="lg:col-span-1">
            <Card className="bg-white/90 backdrop-blur-md shadow-xl sticky top-6 border-0">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4">
                <CardHeader className="text-white p-0">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <MessageSquare className="h-5 w-5" />
                    💬 发表吐槽
                  </CardTitle>
                  <CardDescription className="text-orange-100">
                    匿名发表，尽情释放你的情绪
                  </CardDescription>
                </CardHeader>
              </div>
              <CardContent className="space-y-4 p-6">
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
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  <Send className="h-4 w-4 mr-2" />
                  ✨ 发布吐槽
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
            <Card className="bg-white/90 backdrop-blur-md shadow-xl border-0 mb-6">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4">
                <CardHeader className="text-white p-0">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Filter className="h-5 w-5" />
                    🔍 筛选和排序
                  </CardTitle>
                </CardHeader>
              </div>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* 筛选 */}
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-3 text-gray-700">筛选分类</label>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setActiveFilter('all')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 shadow-sm hover:shadow-md ${
                          activeFilter === 'all' 
                            ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg' 
                            : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                        }`}
                      >
                        🔮 全部
                      </button>
                      {complaintCategories.map(category => (
                        <button
                          key={category.id}
                          onClick={() => setActiveFilter(category.id)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 shadow-sm hover:shadow-md ${
                            activeFilter === category.id 
                              ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg' 
                              : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                          }`}
                        >
                          {category.icon}
                          {category.name}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* 排序 */}
                  <div>
                    <label className="block text-sm font-medium mb-3 text-gray-700">排序方式</label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSortBy('latest')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 shadow-sm hover:shadow-md ${
                          sortBy === 'latest' 
                            ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg' 
                            : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                        }`}
                      >
                        <Clock className="h-4 w-4 inline mr-1" />
                        最新
                      </button>
                      <button
                        onClick={() => setSortBy('popular')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 shadow-sm hover:shadow-md ${
                          sortBy === 'popular' 
                            ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg' 
                            : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                        }`}
                      >
                        <ThumbsUp className="h-4 w-4 inline mr-1" />
                        热门
                      </button>
                      <button
                        onClick={() => setSortBy('hot')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 shadow-sm hover:shadow-md ${
                          sortBy === 'hot' 
                            ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg' 
                            : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                        }`}
                      >
                        <Flame className="h-4 w-4 inline mr-1" />
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