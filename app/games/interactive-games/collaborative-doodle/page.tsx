'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  ArrowLeft,
  Palette,
  Brush,
  Eraser,
  Undo2,
  RotateCcw,
  Download,
  Share2,
  Heart,
  Users,
  Clock,
  Star,
  Lightbulb,
  Sparkles,
  Send,
  Trophy,
  PenTool,
  Circle,
  Square,
  Triangle,
  Zap,
  ImageIcon,
  Eye,
  Target,
  Timer,
  Share,
  Play,
  Pause,
  CheckCircle,
  Wifi,
  WifiOff,
  Video,
  VideoOff,
  MessageSquare,
  UserPlus,
  Settings,
  Mic,
  MicOff,
  Volume2,
  Save,
  RefreshCw,
  Grid3X3,
  Maximize2,
  Copy,
  Trash2
} from 'lucide-react'
import Link from 'next/link'

// 绘画工具类型
type DrawingTool = 'pen' | 'brush' | 'eraser' | 'circle' | 'square' | 'triangle'

// 绘画工具配置
const drawingTools: Array<{
  id: DrawingTool
  name: string
  icon: React.ReactNode
  description: string
}> = [
  {
    id: 'pen',
    name: '钢笔',
    icon: <PenTool className="h-4 w-4" />,
    description: '精确绘画工具'
  },
  {
    id: 'brush',
    name: '画笔',
    icon: <Brush className="h-4 w-4" />,
    description: '柔和绘画效果'
  },
  {
    id: 'eraser',
    name: '橡皮擦',
    icon: <Eraser className="h-4 w-4" />,
    description: '擦除内容'
  },
  {
    id: 'circle',
    name: '圆形',
    icon: <Circle className="h-4 w-4" />,
    description: '绘制圆形'
  },
  {
    id: 'square',
    name: '方形',
    icon: <Square className="h-4 w-4" />,
    description: '绘制方形'
  },
  {
    id: 'triangle',
    name: '三角形',
    icon: <Triangle className="h-4 w-4" />,
    description: '绘制三角形'
  }
]

// 颜色调色板
const colorPalette = [
  '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', 
  '#FF00FF', '#00FFFF', '#FFA500', '#800080', '#FFC0CB', '#A52A2A',
  '#808080', '#90EE90', '#ADD8E6', '#FFB6C1', '#FFD700', '#4B0082',
  '#F0E68C', '#DDA0DD', '#B0C4DE', '#FF6347', '#40E0D0', '#EE82EE'
]

// 情感主题
const emotionThemes = [
  {
    id: 'happiness',
    name: '快乐时光',
    color: '#FFD700',
    icon: <Star className="h-5 w-5" />,
    description: '用明亮的色彩表达快乐',
    prompts: [
      '画出让你最开心的时刻',
      '用色彩表达今天的快乐心情',
      '创作一个代表快乐的符号',
      '画出阳光和彩虹的场景'
    ],
    recommendedColors: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4']
  },
  {
    id: 'love',
    name: '甜蜜爱意',
    color: '#FF69B4',
    icon: <Heart className="h-5 w-5" />,
    description: '用温暖的色彩表达爱意',
    prompts: [
      '画出你们第一次见面的场景',
      '创作一个代表你们爱情的符号',
      '画出一起度过的美好时光',
      '用色彩表达心中的爱意'
    ],
    recommendedColors: ['#FF69B4', '#FF6B9D', '#C44569', '#F8B195', '#F67280']
  },
  {
    id: 'peace',
    name: '平静心境',
    color: '#87CEEB',
    icon: <Sparkles className="h-5 w-5" />,
    description: '用柔和的色彩表达平静',
    prompts: [
      '画出让你感到平静的场景',
      '用色彩表达内心的宁静',
      '创作一个代表平和的符号',
      '画出自然的美景'
    ],
    recommendedColors: ['#87CEEB', '#6C5CE7', '#74B9FF', '#A29BFE', '#81ECEC']
  },
  {
    id: 'dream',
    name: '梦想憧憬',
    color: '#9370DB',
    icon: <Lightbulb className="h-5 w-5" />,
    description: '用梦幻的色彩表达憧憬',
    prompts: [
      '画出你的梦想场景',
      '用色彩表达对未来的憧憬',
      '创作一个代表梦想的符号',
      '画出你理想中的世界'
    ],
    recommendedColors: ['#9370DB', '#6C5CE7', '#A55EEA', '#8854D0', '#5F3DC4']
  }
]

// 绘画挑战
const drawingChallenges = [
  {
    id: 'blind_drawing',
    name: '盲画挑战',
    description: '不看画布，凭感觉作画',
    difficulty: '简单',
    timeLimit: 60,
    icon: <Eye className="h-5 w-5" />
  },
  {
    id: 'speed_drawing',
    name: '速画挑战',
    description: '在限定时间内完成作品',
    difficulty: '中等',
    timeLimit: 120,
    icon: <Timer className="h-5 w-5" />
  },
  {
    id: 'color_limit',
    name: '色彩限制',
    description: '仅使用3种颜色创作',
    difficulty: '困难',
    timeLimit: 180,
    icon: <Palette className="h-5 w-5" />
  }
]

// 画布历史记录
interface DoodleHistory {
  id: string
  theme: string
  prompt: string
  timestamp: number
  imageData: string
  duration: number
  challenge?: string
  collaborators: string[]
}

// 协作用户
interface Collaborator {
  id: string
  name: string
  color: string
  isOnline: boolean
  cursor?: { x: number, y: number }
  currentTool?: DrawingTool
}

// 聊天消息
interface ChatMessage {
  id: string
  userId: string
  userName: string
  content: string
  timestamp: number
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}

function formatTimestamp(timestamp: number): string {
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

export default function CollaborativeDoodlePage() {
  const [selectedTheme, setSelectedTheme] = useState('happiness')
  const [currentPrompt, setCurrentPrompt] = useState('')
  const [selectedTool, setSelectedTool] = useState<DrawingTool>('pen')
  const [selectedColor, setSelectedColor] = useState('#000000')
  const [brushSize, setBrushSize] = useState(5)
  const [isDrawing, setIsDrawing] = useState(false)
  const [drawTime, setDrawTime] = useState(0)
  const [doodleHistory, setDoodleHistory] = useState<DoodleHistory[]>([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [activeChallenge, setActiveChallenge] = useState<string | null>(null)
  const [remainingTime, setRemainingTime] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showGrid, setShowGrid] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  
  // 协作功能状态
  const [isConnected, setIsConnected] = useState(false)
  const [collaborators, setCollaborators] = useState<Collaborator[]>([])
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [isVideoCall, setIsVideoCall] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [inviteLink, setInviteLink] = useState('')
  const [canvasHistory, setCanvasHistory] = useState<ImageData[]>([])
  const [historyStep, setHistoryStep] = useState(-1)
  
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const contextRef = useRef<CanvasRenderingContext2D | null>(null)
  const drawTimeIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const challengeIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 })

  useEffect(() => {
    // 初始化画布
    if (canvasRef.current) {
      const canvas = canvasRef.current
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
      
      const context = canvas.getContext('2d')
      if (context) {
        context.lineCap = 'round'
        context.lineJoin = 'round'
        contextRef.current = context
      }
    }
    
    // 响应式调整画布大小
    const handleResize = () => {
      if (canvasRef.current && contextRef.current) {
        const canvas = canvasRef.current
        const rect = canvas.getBoundingClientRect()
        const imageData = contextRef.current.getImageData(0, 0, canvas.width, canvas.height)
        
        canvas.width = rect.width
        canvas.height = rect.height
        
        contextRef.current.putImageData(imageData, 0, 0)
        contextRef.current.lineCap = 'round'
        contextRef.current.lineJoin = 'round'
      }
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    // 设置当前主题的随机提示
    if (selectedTheme) {
      const theme = emotionThemes.find(t => t.id === selectedTheme)
      if (theme && theme.prompts.length > 0) {
        const randomPrompt = theme.prompts[Math.floor(Math.random() * theme.prompts.length)]
        setCurrentPrompt(randomPrompt)
      }
    }
  }, [selectedTheme])

  useEffect(() => {
    // 加载历史记录
    const savedHistory = safeLocalStorage.getItem('doodleHistory')
    if (savedHistory) {
      try {
        setDoodleHistory(JSON.parse(savedHistory))
      } catch (error) {
        console.error('Failed to load doodle history:', error)
      }
    }

    // 模拟协作用户
    const mockCollaborators: Collaborator[] = [
      {
        id: 'user1',
        name: '小明',
        color: '#FF6B6B',
        isOnline: true,
        cursor: { x: 100, y: 150 },
        currentTool: 'brush'
      },
      {
        id: 'user2',
        name: '小红',
        color: '#4ECDC4',
        isOnline: false,
        currentTool: 'pen'
      }
    ]
    setCollaborators(mockCollaborators)

    // 生成邀请链接
    setInviteLink(`${window.location.origin}${window.location.pathname}?room=${Date.now()}`)
  }, [])

  useEffect(() => {
    // 绘画计时器
    if (isDrawing) {
      drawTimeIntervalRef.current = setInterval(() => {
        setDrawTime(prev => prev + 1)
      }, 1000)
    } else {
      if (drawTimeIntervalRef.current) {
        clearInterval(drawTimeIntervalRef.current)
      }
    }
    
    return () => {
      if (drawTimeIntervalRef.current) {
        clearInterval(drawTimeIntervalRef.current)
      }
    }
  }, [isDrawing])

  useEffect(() => {
    // 挑战计时器
    if (activeChallenge && remainingTime > 0) {
      challengeIntervalRef.current = setInterval(() => {
        setRemainingTime(prev => prev - 1)
      }, 1000)
    } else if (remainingTime === 0 && activeChallenge) {
      endChallenge()
    }
    
    return () => {
      if (challengeIntervalRef.current) {
        clearInterval(challengeIntervalRef.current)
      }
    }
  }, [activeChallenge, remainingTime])

  const startDrawing = () => {
    setIsDrawing(true)
    setDrawTime(0)
    if (contextRef.current) {
      contextRef.current.strokeStyle = selectedColor
      contextRef.current.lineWidth = brushSize
    }
    
    // 保存当前画布状态
    if (canvasRef.current && contextRef.current) {
      const imageData = contextRef.current.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height)
      setCanvasHistory([...canvasHistory.slice(0, historyStep + 1), imageData])
      setHistoryStep(historyStep + 1)
    }
  }

  const stopDrawing = () => {
    setIsDrawing(false)
    saveToHistory()
  }

  const startChallenge = (challengeId: string) => {
    const challenge = drawingChallenges.find(c => c.id === challengeId)
    if (challenge) {
      setActiveChallenge(challengeId)
      setRemainingTime(challenge.timeLimit)
      startDrawing()
    }
  }

  const endChallenge = () => {
    if (activeChallenge) {
      stopDrawing()
      setActiveChallenge(null)
      setRemainingTime(0)
    }
  }

  const saveToHistory = () => {
    if (canvasRef.current) {
      const imageData = canvasRef.current.toDataURL()
      const newDoodle: DoodleHistory = {
        id: Date.now().toString(),
        theme: selectedTheme,
        prompt: currentPrompt,
        timestamp: Date.now(),
        imageData,
        duration: drawTime,
        challenge: activeChallenge || undefined,
        collaborators: collaborators.filter(c => c.isOnline).map(c => c.name)
      }
      
      const updatedHistory = [newDoodle, ...doodleHistory].slice(0, 10) // 保留最近10个作品
      setDoodleHistory(updatedHistory)
      safeLocalStorage.setItem('doodleHistory', JSON.stringify(updatedHistory))
    }
  }

  const clearCanvas = () => {
    if (canvasRef.current && contextRef.current) {
      contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    }
  }

  const saveDoodle = () => {
    if (canvasRef.current) {
      const link = document.createElement('a')
      link.download = `doodle-${Date.now()}.png`
      link.href = canvasRef.current.toDataURL()
      link.click()
    }
  }

  const undo = () => {
    if (historyStep > 0 && canvasHistory.length > 0) {
      const previousState = canvasHistory[historyStep - 1]
      if (contextRef.current && canvasRef.current) {
        contextRef.current.putImageData(previousState, 0, 0)
      }
      setHistoryStep(historyStep - 1)
    }
  }

  const redo = () => {
    if (historyStep < canvasHistory.length - 1) {
      const nextState = canvasHistory[historyStep + 1]
      if (contextRef.current && canvasRef.current) {
        contextRef.current.putImageData(nextState, 0, 0)
      }
      setHistoryStep(historyStep + 1)
    }
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const copyInviteLink = () => {
    navigator.clipboard.writeText(inviteLink)
    alert('邀请链接已复制到剪贴板！')
    setShowInviteModal(false)
  }

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message: ChatMessage = {
        id: Date.now().toString(),
        userId: 'current_user',
        userName: '我',
        content: newMessage.trim(),
        timestamp: Date.now()
      }
      
      setChatMessages([...chatMessages, message])
      setNewMessage('')
    }
  }

  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return
    
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect || !contextRef.current) return
    
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    contextRef.current.beginPath()
    contextRef.current.moveTo(x, y)
  }

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return
    
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    // 更新当前用户光标位置（模拟）
    if (isConnected) {
      // 这里可以发送光标位置到其他协作者
    }
    
    if (!isDrawing) return
    
    if (!contextRef.current) return
    
    if (selectedTool === 'eraser') {
      contextRef.current.globalCompositeOperation = 'destination-out'
    } else {
      contextRef.current.globalCompositeOperation = 'source-over'
      contextRef.current.strokeStyle = selectedColor
    }
    
    contextRef.current.lineWidth = brushSize
    
    if (selectedTool === 'pen' || selectedTool === 'brush' || selectedTool === 'eraser') {
      contextRef.current.lineTo(x, y)
      contextRef.current.stroke()
    }
  }

  const handleCanvasMouseUp = () => {
    if (!contextRef.current) return
    contextRef.current.closePath()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/games/interactive-games" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 transition-colors mb-6">
            <ArrowLeft className="h-4 w-4" />
            返回互动游戏
          </Link>
          
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
              协作涂鸦板
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              选择情感主题，与朋友一起创作独特的艺术作品，实时协作，共享创作乐趣
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* 左侧工具栏 */}
          <div className="lg:col-span-1 space-y-4">
            {/* 协作状态 */}
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-500" />
                  协作状态
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">连接状态</span>
                  <Badge className={isConnected ? "bg-green-100 text-green-800 border-0" : "bg-gray-100 text-gray-800 border-0"}>
                    {isConnected ? <Wifi className="h-3 w-3 mr-1" /> : <WifiOff className="h-3 w-3 mr-1" />}
                    {isConnected ? '已连接' : '离线'}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">在线用户</span>
                  <Badge className="bg-blue-100 text-blue-800 border-0">
                    {collaborators.filter(c => c.isOnline).length}
                  </Badge>
                </div>
                
                <Button 
                  onClick={() => setShowInviteModal(true)}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  邀请好友
                </Button>
                
                <Button 
                  onClick={() => setIsVideoCall(!isVideoCall)}
                  variant="outline"
                  className="w-full"
                >
                  {isVideoCall ? <VideoOff className="h-4 w-4 mr-2" /> : <Video className="h-4 w-4 mr-2" />}
                  {isVideoCall ? '结束视频' : '开始视频'}
                </Button>
                
                <Button 
                  onClick={() => setIsMuted(!isMuted)}
                  variant="outline"
                  className="w-full"
                >
                  {isMuted ? <MicOff className="h-4 w-4 mr-2" /> : <Mic className="h-4 w-4 mr-2" />}
                  {isMuted ? '取消静音' : '静音'}
                </Button>
              </CardContent>
            </Card>

            {/* 情感主题选择 */}
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Heart className="h-5 w-5 text-pink-500" />
                  情感主题
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {emotionThemes.map(theme => (
                  <button
                    key={theme.id}
                    onClick={() => setSelectedTheme(theme.id)}
                    className={`w-full p-3 rounded-lg border transition-all ${
                      selectedTheme === theme.id 
                        ? 'border-purple-500 bg-purple-50 text-purple-700' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-1 rounded-full bg-opacity-20`} style={{ backgroundColor: theme.color }}>
                        {theme.icon}
                      </div>
                      <div className="text-left">
                        <div className="font-medium">{theme.name}</div>
                        <div className="text-xs text-gray-500">{theme.description}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* 绘画工具 */}
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Palette className="h-5 w-5 text-purple-500" />
                  绘画工具
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-3 gap-2">
                  {drawingTools.map(tool => (
                    <button
                      key={tool.id}
                      onClick={() => setSelectedTool(tool.id)}
                      className={`p-3 rounded-lg border transition-all ${
                        selectedTool === tool.id 
                          ? 'border-purple-500 bg-purple-50 text-purple-700' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      title={tool.description}
                    >
                      {tool.icon}
                    </button>
                  ))}
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">画笔大小: {brushSize}px</label>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={brushSize}
                    onChange={(e) => setBrushSize(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
              </CardContent>
            </Card>

            {/* 颜色选择 */}
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-purple-500" />
                  颜色调色板
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-8 h-8 rounded-full border-2 border-gray-300"
                    style={{ backgroundColor: selectedColor }}
                  />
                  <input
                    type="color"
                    value={selectedColor}
                    onChange={(e) => setSelectedColor(e.target.value)}
                    className="w-full h-8"
                  />
                </div>
                
                <div className="grid grid-cols-6 gap-1">
                  {colorPalette.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded border-2 transition-all ${
                        selectedColor === color ? 'border-purple-500 scale-110' : 'border-gray-200'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                
                {/* 推荐颜色 */}
                <div className="pt-2 border-t">
                  <div className="text-sm font-medium mb-2">推荐颜色</div>
                  <div className="flex gap-1">
                    {emotionThemes.find(t => t.id === selectedTheme)?.recommendedColors.map(color => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`w-6 h-6 rounded border transition-all ${
                          selectedColor === color ? 'border-purple-500 scale-110' : 'border-gray-200'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 中间画布区域 */}
          <div className="lg:col-span-2">
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Brush className="h-5 w-5 text-purple-500" />
                      协作画布
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {currentPrompt && (
                        <div className="flex items-center gap-2">
                          <Target className="h-4 w-4 text-pink-500" />
                          <span>{currentPrompt}</span>
                        </div>
                      )}
                    </CardDescription>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {activeChallenge && (
                      <Badge className="bg-orange-100 text-orange-800 border-0">
                        <Timer className="h-3 w-3 mr-1" />
                        {formatTime(remainingTime)}
                      </Badge>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowGrid(!showGrid)}
                      title="显示网格"
                    >
                      <Grid3X3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={toggleFullscreen}
                      title="全屏"
                    >
                      <Maximize2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSoundEnabled(!soundEnabled)}
                      title="音效"
                    >
                      <Volume2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* 协作者光标指示 */}
                <div className="relative">
                  {collaborators.filter(c => c.isOnline && c.cursor).map(collaborator => (
                    <div
                      key={collaborator.id}
                      className="absolute pointer-events-none"
                      style={{
                        left: `${collaborator.cursor?.x}px`,
                        top: `${collaborator.cursor?.y}px`,
                        transform: 'translate(-50%, -50%)'
                      }}
                    >
                      <div className="flex flex-col items-center">
                        <div 
                          className="w-4 h-4 rounded-full border-2 border-white shadow-md"
                          style={{ backgroundColor: collaborator.color }}
                        />
                        <span className="text-xs bg-black bg-opacity-50 text-white px-1 rounded">
                          {collaborator.name}
                        </span>
                      </div>
                    </div>
                  ))}
                  
                  {/* 画布 */}
                  <div className={`relative bg-white rounded-lg border-2 border-gray-200 overflow-hidden ${
                    showGrid ? 'bg-grid' : ''
                  }`}>
                    <canvas
                      ref={canvasRef}
                      onMouseDown={handleCanvasMouseDown}
                      onMouseMove={handleCanvasMouseMove}
                      onMouseUp={handleCanvasMouseUp}
                      onMouseLeave={handleCanvasMouseUp}
                      className="w-full cursor-crosshair"
                      style={{ height: '400px' }}
                    />
                    
                    {!isDrawing && !activeChallenge && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="text-center text-gray-400">
                          <Brush className="h-12 w-12 mx-auto mb-2" />
                          <p>选择工具和颜色，点击开始创作</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* 控制按钮 */}
                <div className="flex flex-wrap gap-2">
                  {!isDrawing ? (
                    <Button onClick={startDrawing} className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                      <Play className="h-4 w-4 mr-2" />
                      开始绘画
                    </Button>
                  ) : (
                    <Button onClick={stopDrawing} variant="outline">
                      <Pause className="h-4 w-4 mr-2" />
                      暂停绘画
                    </Button>
                  )}
                  
                  <Button onClick={clearCanvas} variant="outline">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    清空画布
                  </Button>
                  
                  <Button onClick={undo} variant="outline" disabled={historyStep <= 0}>
                    <Undo2 className="h-4 w-4 mr-2" />
                    撤销
                  </Button>
                  
                  <Button onClick={redo} variant="outline" disabled={historyStep >= canvasHistory.length - 1}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    重做
                  </Button>
                  
                  <Button onClick={saveDoodle} variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    保存作品
                  </Button>
                  
                  <Button onClick={() => {}} variant="outline">
                    <Share className="h-4 w-4 mr-2" />
                    分享
                  </Button>
                </div>
                
                {/* 绘画信息 */}
                <div className="flex items-center justify-between text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>绘画时间: {formatTime(drawTime)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Brush className="h-4 w-4" />
                      <span>当前工具: {drawingTools.find(t => t.id === selectedTool)?.name}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-4 rounded border border-gray-300" style={{ backgroundColor: selectedColor }} />
                    <span>当前颜色</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* 绘画挑战 */}
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg mt-4">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Zap className="h-5 w-5 text-orange-500" />
                  绘画挑战
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {drawingChallenges.map(challenge => (
                  <button
                    key={challenge.id}
                    onClick={() => startChallenge(challenge.id)}
                    disabled={activeChallenge !== null}
                    className={`w-full p-3 rounded-lg border transition-all text-left ${
                      activeChallenge === challenge.id 
                        ? 'border-orange-500 bg-orange-50 text-orange-700' 
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {challenge.icon}
                        <div>
                          <div className="font-medium">{challenge.name}</div>
                          <div className="text-xs text-gray-500">{challenge.description}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="text-xs">
                          {challenge.difficulty}
                        </Badge>
                        <div className="text-xs text-gray-500 mt-1">
                          {formatTime(challenge.timeLimit)}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* 右侧功能区域 */}
          <div className="lg:col-span-1 space-y-4">
            {/* 协作者列表 */}
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-500" />
                  协作者
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {collaborators.map(collaborator => (
                    <div key={collaborator.id} className="flex items-center gap-3 p-2 rounded-lg">
                      <div className="relative">
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium"
                          style={{ backgroundColor: collaborator.color }}
                        >
                          {collaborator.name.charAt(0)}
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                          collaborator.isOnline ? 'bg-green-500' : 'bg-gray-400'
                        }`}></div>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{collaborator.name}</div>
                        <div className="text-xs text-gray-500">
                          {collaborator.currentTool && `使用 ${drawingTools.find(t => t.id === collaborator.currentTool)?.name}`}
                        </div>
                      </div>
                      {collaborator.isOnline && (
                        <Badge className="bg-green-100 text-green-800 border-0 text-xs">
                          在线
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 聊天窗口 */}
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-blue-500" />
                  协作聊天
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {/* 消息列表 */}
                  <div className="h-48 overflow-y-auto bg-gray-50 rounded-lg p-3 space-y-2">
                    {chatMessages.length > 0 ? (
                      chatMessages.map(message => (
                        <div key={message.id} className="flex items-start gap-2">
                          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">
                            {message.userName.charAt(0)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-sm">{message.userName}</span>
                              <span className="text-xs text-gray-500">
                                {formatTimestamp(message.timestamp)}
                              </span>
                            </div>
                            <div className="text-sm text-gray-700 bg-white rounded-lg p-2">
                              {message.content}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center text-gray-500 text-sm">
                        还没有消息，开始聊天吧！
                      </div>
                    )}
                  </div>
                  
                  {/* 消息输入 */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      placeholder="输入消息..."
                      className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Button 
                      onClick={sendMessage}
                      disabled={!newMessage.trim()}
                      size="sm"
                      className="bg-blue-500 hover:bg-blue-600"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 作品历史 */}
            {doodleHistory.length > 0 && (
              <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                    作品历史
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {doodleHistory.map(doodle => (
                      <div key={doodle.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                        <div className="w-12 h-12 bg-white rounded border border-gray-200 overflow-hidden">
                          <img src={doodle.imageData} alt="Doodle" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="text-xs">
                              {emotionThemes.find(t => t.id === doodle.theme)?.name}
                            </Badge>
                            {doodle.challenge && (
                              <Badge variant="secondary" className="text-xs">
                                {drawingChallenges.find(c => c.id === doodle.challenge)?.name}
                              </Badge>
                            )}
                          </div>
                          <div className="text-xs text-gray-500">
                            {formatTime(doodle.duration)} · {new Date(doodle.timestamp).toLocaleDateString()}
                          </div>
                          {doodle.collaborators.length > 0 && (
                            <div className="text-xs text-gray-500">
                              协作者: {doodle.collaborators.join(', ')}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* 绘画技巧 */}
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-yellow-500" />
                  绘画技巧
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-purple-50 rounded-lg">
                  <h4 className="font-medium text-purple-800 mb-1">色彩搭配</h4>
                  <p className="text-sm text-purple-700">使用互补色创造和谐的画面，推荐使用主题推荐的颜色</p>
                </div>
                
                <div className="p-3 bg-pink-50 rounded-lg">
                  <h4 className="font-medium text-pink-800 mb-1">层次感</h4>
                  <p className="text-sm text-pink-700">通过不同的画笔大小和透明度创造立体感</p>
                </div>
                
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-1">协作技巧</h4>
                  <p className="text-sm text-blue-700">通过聊天交流创意，分工完成不同部分</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      {/* 邀请模态框 */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="h-5 w-5 text-blue-500" />
                邀请好友
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">邀请链接</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inviteLink}
                    readOnly
                    className="flex-1 px-3 py-2 border rounded-lg bg-gray-50"
                  />
                  <Button onClick={copyInviteLink} variant="outline">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="text-sm text-gray-600">
                分享此链接给好友，邀请他们一起协作绘画！
              </div>
              
              <div className="flex gap-2">
                <Button onClick={() => setShowInviteModal(false)} className="flex-1">
                  关闭
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      
      <Footer />
      
      <style jsx>{`
        .bg-grid {
          background-image: 
            linear-gradient(to right, #e5e7eb 1px, transparent 1px),
            linear-gradient(to bottom, #e5e7eb 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </div>
  )
}