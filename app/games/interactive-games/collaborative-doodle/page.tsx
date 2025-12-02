'use client'

import { useState, useRef, useEffect } from 'react'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  ArrowLeft,
  Pencil,
  Eraser,
  Palette,
  Users,
  MessageSquare,
  Timer,
  Check,
  X,
  RotateCcw,
  Download,
  Share2,
  Volume2,
  VolumeX,
  Eye,
  EyeOff,
  Zap,
  Star,
  Trophy,
  Crown,
  Heart,
  Smile,
  Laugh,
  ThumbsUp,
  Target,
  Brush,
  Circle,
  Square,
  Triangle,
  Type,
  Image,
  Layers,
  Grid3x3,
  Minus,
  Plus,
  Settings,
  UserPlus,
  Copy,
  QrCode,
  Bell,
  BellOff,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Phone,
  PhoneOff,
  MessageCircle,
  Send,
  MoreHorizontal,
  Filter,
  Search,
  Bookmark,
  Flag,
  AlertCircle,
  Info,
  HelpCircle,
  Clock,
  Calendar,
  TrendingUp,
  BarChart3,
  PieChart,
  Activity,
  Coffee,
  Music,
  Camera,
  Gift,
  Sparkles,
  Rocket,
  Moon,
  Sun,
  Cloud,
  Wind,
  Droplets,
  Flame,
  Leaf,
  Mountain,
  TreePine,
  Flower2,
  Cat,
  Dog,
  Bird,
  Fish,
  Car,
  Train,
  Plane,
  Ship,
  Bike,
  Bus,
  Truck,
  Home,
  Building,
  Castle,
  Church,
  School,
  Hospital,
  Store,
  Factory,
  Pyramid,
  Globe,
  Map,
  Compass,
  Anchor,
  Sailboat
} from 'lucide-react'
import Link from 'next/link'

// 绘画工具类型
type DrawingTool = 'pen' | 'eraser' | 'brush' | 'spray' | 'line' | 'rectangle' | 'circle' | 'triangle' | 'text'

// 颜色预设
const colorPalette = [
  '#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FFFFFF',
  '#FFA500', '#800080', '#FFC0CB', '#A52A2A', '#808080', '#008000', '#000080', '#FFD700'
]

// 画笔大小选项
const brushSizes = [1, 3, 5, 8, 12, 16, 20, 24]

// 游戏模式
type GameMode = 'free-draw' | 'guess-word' | 'collaborative'

// 用户状态
interface User {
  id: string
  name: string
  color: string
  isOnline: boolean
  isDrawing: boolean
}

// 绘画数据
interface DrawingData {
  tool: DrawingTool
  color: string
  size: number
  points: { x: number; y: number }[]
  timestamp: number
  userId: string
}

// 聊天消息
interface ChatMessage {
  id: string
  userId: string
  content: string
  timestamp: number
  isGuess: boolean
  isCorrect: boolean
}

// 游戏房间
interface GameRoom {
  id: string
  name: string
  mode: GameMode
  users: User[]
  currentWord?: string
  round: number
  maxRounds: number
  timer: number
  isStarted: boolean
  isPaused: boolean
}

export default function CollaborativeDoodlePage() {
  // 绘画状态
  const [tool, setTool] = useState<DrawingTool>('pen')
  const [color, setColor] = useState('#000000')
  const [brushSize, setBrushSize] = useState(5)
  const [isDrawing, setIsDrawing] = useState(false)
  const [canvasHistory, setCanvasHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  
  // 游戏状态
  const [gameMode, setGameMode] = useState<GameMode>('free-draw')
  const [room, setRoom] = useState<GameRoom | null>(null)
  const [users, setUsers] = useState<User[]>([])
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [currentWord, setCurrentWord] = useState('')
  const [guessInput, setGuessInput] = useState('')
  const [roundTime, setRoundTime] = useState(60)
  
  // 画布引用
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // 初始化画布
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // 设置画布大小
    const resizeCanvas = () => {
      if (containerRef.current) {
        canvas.width = containerRef.current.clientWidth
        canvas.height = containerRef.current.clientHeight - 100
      }
      
      // 清除画布并设置白色背景
      ctx.fillStyle = '#FFFFFF'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // 保存初始状态
      saveCanvasState()
    }
    
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    
    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  // 保存画布状态
  const saveCanvasState = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const dataURL = canvas.toDataURL()
    setCanvasHistory(prev => {
      const newHistory = prev.slice(0, historyIndex + 1)
      newHistory.push(dataURL)
      return newHistory.slice(-50) // 限制历史记录数量
    })
    setHistoryIndex(prev => Math.min(prev + 1, 49))
  }

  // 开始绘画
  const startDrawing = (e: React.MouseEvent) => {
    if (!canvasRef.current) return
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    setIsDrawing(true)
    
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    ctx.beginPath()
    ctx.moveTo(x, y)
    
    // 设置画笔样式
    ctx.strokeStyle = color
    ctx.lineWidth = brushSize
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    
    if (tool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out'
    } else {
      ctx.globalCompositeOperation = 'source-over'
    }
  }

  // 绘画中
  const draw = (e: React.MouseEvent) => {
    if (!isDrawing || !canvasRef.current) return
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    ctx.lineTo(x, y)
    ctx.stroke()
  }

  // 结束绘画
  const stopDrawing = () => {
    if (!isDrawing) return
    
    setIsDrawing(false)
    saveCanvasState()
    
    // 重置合成模式
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (ctx) {
      ctx.globalCompositeOperation = 'source-over'
    }
  }

  // 撤销
  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(prev => prev - 1)
      loadCanvasState(historyIndex - 1)
    }
  }

  // 重做
  const redo = () => {
    if (historyIndex < canvasHistory.length - 1) {
      setHistoryIndex(prev => prev + 1)
      loadCanvasState(historyIndex + 1)
    }
  }

  // 加载画布状态
  const loadCanvasState = (index: number) => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx || index < 0 || index >= canvasHistory.length) return
    
    const img = new window.Image()
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0)
    }
    img.src = canvasHistory[index]
  }

  // 清除画布
  const clearCanvas = () => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    
    ctx.fillStyle = '#FFFFFF'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    saveCanvasState()
  }

  // 保存作品
  const saveDrawing = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const link = document.createElement('a')
    link.download = 'collaborative-drawing.png'
    link.href = canvas.toDataURL()
    link.click()
  }

  // 创建游戏房间
  const createRoom = (mode: GameMode) => {
    const newRoom: GameRoom = {
      id: Date.now().toString(),
      name: `${mode} Room`,
      mode,
      users: [
        {
          id: 'user1',
          name: 'Player 1',
          color: '#FF6B6B',
          isOnline: true,
          isDrawing: false
        }
      ],
      round: 1,
      maxRounds: 3,
      timer: 60,
      isStarted: false,
      isPaused: false
    }
    
    if (mode === 'guess-word') {
      newRoom.currentWord = getRandomWord()
    }
    
    setRoom(newRoom)
    setGameMode(mode)
  }

  // 获取随机词汇
  const getRandomWord = () => {
    const words = [
      '太阳', '月亮', '星星', '云朵', '彩虹', '花朵', '树木', '动物',
      '房子', '汽车', '飞机', '轮船', '食物', '饮料', '水果', '蔬菜',
      '人物', '动物', '风景', '建筑', '工具', '乐器', '运动', '游戏'
    ]
    return words[Math.floor(Math.random() * words.length)]
  }

  // 发送消息
  const sendMessage = () => {
    if (!guessInput.trim()) return
    
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      userId: 'user1',
      content: guessInput,
      timestamp: Date.now(),
      isGuess: gameMode === 'guess-word',
      isCorrect: gameMode === 'guess-word' && guessInput === currentWord
    }
    
    setMessages(prev => [...prev, newMessage])
    setGuessInput('')
    
    // 如果是猜词模式且猜对了
    if (newMessage.isCorrect) {
      // 处理猜对逻辑
    }
  }

  // 格式化时间
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/games/interactive-games" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors mb-6">
            <ArrowLeft className="h-4 w-4" />
            返回互动游戏
          </Link>
          
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
              协作涂鸦板
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              实时协作绘画，双人猜词游戏，创意无限，乐趣无穷
            </p>
          </div>
        </div>

        <Tabs defaultValue="free-draw" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="free-draw" onClick={() => setGameMode('free-draw')}>
              <Pencil className="h-4 w-4 mr-2" />
              自由绘画
            </TabsTrigger>
            <TabsTrigger value="guess-word" onClick={() => setGameMode('guess-word')}>
              <Target className="h-4 w-4 mr-2" />
              猜词游戏
            </TabsTrigger>
            <TabsTrigger value="collaborative" onClick={() => setGameMode('collaborative')}>
              <Users className="h-4 w-4 mr-2" />
              协作模式
            </TabsTrigger>
          </TabsList>

          <TabsContent value="free-draw" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* 工具栏 */}
              <Card className="lg:col-span-1 bg-white/80 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="h-5 w-5 text-blue-500" />
                    绘画工具
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* 工具选择 */}
                  <div>
                    <label className="block text-sm font-medium mb-2">绘画工具</label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => setTool('pen')}
                        className={`p-2 rounded-lg border transition-all ${
                          tool === 'pen' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Pencil className="h-4 w-4 mx-auto" />
                        <span className="text-xs mt-1">画笔</span>
                      </button>
                      <button
                        onClick={() => setTool('eraser')}
                        className={`p-2 rounded-lg border transition-all ${
                          tool === 'eraser' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Eraser className="h-4 w-4 mx-auto" />
                        <span className="text-xs mt-1">橡皮</span>
                      </button>
                      <button
                        onClick={() => setTool('brush')}
                        className={`p-2 rounded-lg border transition-all ${
                          tool === 'brush' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Brush className="h-4 w-4 mx-auto" />
                        <span className="text-xs mt-1">刷子</span>
                      </button>
                    </div>
                  </div>

                  {/* 颜色选择 */}
                  <div>
                    <label className="block text-sm font-medium mb-2">颜色</label>
                    <div className="grid grid-cols-4 gap-2">
                      {colorPalette.map((colorOption) => (
                        <button
                          key={colorOption}
                          onClick={() => setColor(colorOption)}
                          className={`w-8 h-8 rounded border transition-transform ${
                            color === colorOption ? 'border-blue-500 scale-110' : 'border-gray-300 hover:scale-105'
                          }`}
                          style={{ backgroundColor: colorOption }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* 画笔大小 */}
                  <div>
                    <label className="block text-sm font-medium mb-2">画笔大小</label>
                    <div className="flex flex-wrap gap-2">
                      {brushSizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setBrushSize(size)}
                          className={`px-3 py-1 rounded-full text-sm transition-colors ${
                            brushSize === size ? 'bg-blue-100 text-blue-800 border-blue-200' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {size}px
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 操作按钮 */}
                  <div className="space-y-2">
                    <Button onClick={undo} variant="outline" className="w-full" disabled={historyIndex <= 0}>
                      <RotateCcw className="h-4 w-4 mr-2" />
                      撤销
                    </Button>
                    <Button onClick={redo} variant="outline" className="w-full" disabled={historyIndex >= canvasHistory.length - 1}>
                      <RotateCcw className="h-4 w-4 mr-2 rotate-180" />
                      重做
                    </Button>
                    <Button onClick={clearCanvas} variant="outline" className="w-full">
                      <X className="h-4 w-4 mr-2" />
                      清空
                    </Button>
                    <Button onClick={saveDrawing} className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                      <Download className="h-4 w-4 mr-2" />
                      保存作品
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* 画布区域 */}
              <div className="lg:col-span-3">
                <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Pencil className="h-5 w-5 text-blue-500" />
                      画布区域
                    </CardTitle>
                    <CardDescription>
                      使用鼠标或触摸屏进行绘画，支持撤销重做功能
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div 
                      ref={containerRef}
                      className="border-2 border-dashed border-gray-300 rounded-lg bg-white overflow-hidden"
                      style={{ height: '500px' }}
                    >
                      <canvas
                        ref={canvasRef}
                        onMouseDown={startDrawing}
                        onMouseMove={draw}
                        onMouseUp={stopDrawing}
                        onMouseLeave={stopDrawing}
                        className="cursor-crosshair w-full h-full"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="guess-word" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* 游戏信息 */}
              <Card className="lg:col-span-1 bg-white/80 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-green-500" />
                    游戏信息
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 mb-2">
                      {formatTime(roundTime)}
                    </div>
                    <div className="text-sm text-gray-600">剩余时间</div>
                  </div>
                  
                  <div className="space-y-2">
                    <Button 
                      onClick={() => createRoom('guess-word')}
                      className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600"
                    >
                      <UserPlus className="h-4 w-4 mr-2" />
                      创建房间
                    </Button>
                    <Button variant="outline" className="w-full">
                      <UserPlus className="h-4 w-4 mr-2" />
                      加入房间
                    </Button>
                  </div>

                  {/* 游戏规则 */}
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>• 一人画图，其他人猜词</p>
                    <p>• 每轮60秒时间</p>
                    <p>• 猜对得分，画图者获得奖励</p>
                    <p>• 支持2-4人游戏</p>
                  </div>
                </CardContent>
              </Card>

              {/* 画布区域 */}
              <div className="lg:col-span-2">
                <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Pencil className="h-5 w-5 text-green-500" />
                      画板区域
                    </CardTitle>
                    <CardDescription>
                      {room?.currentWord ? `当前词汇：${room.currentWord}` : '等待游戏开始...'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg bg-white overflow-hidden" style={{ height: '400px' }}>
                      <canvas
                        ref={canvasRef}
                        onMouseDown={startDrawing}
                        onMouseMove={draw}
                        onMouseUp={stopDrawing}
                        onMouseLeave={stopDrawing}
                        className="cursor-crosshair w-full h-full"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* 聊天区域 */}
                <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-green-500" />
                      聊天和猜词
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* 消息列表 */}
                      <div className="h-32 overflow-y-auto space-y-2 p-2 bg-gray-50 rounded-lg">
                        {messages.map((message) => (
                          <div key={message.id} className="flex items-start gap-2">
                            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                              <Users className="h-3 w-3 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-medium">玩家</div>
                              <div className={`text-sm ${
                                message.isGuess 
                                  ? message.isCorrect 
                                    ? 'text-green-600 font-bold' 
                                    : 'text-red-600'
                                  : 'text-gray-700'
                              }`}>
                                {message.content}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* 输入区域 */}
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={guessInput}
                          onChange={(e) => setGuessInput(e.target.value)}
                          placeholder="输入你的猜测..."
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        />
                        <Button onClick={sendMessage} className="bg-green-500 hover:bg-green-600">
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="collaborative" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* 协作面板 */}
              <Card className="lg:col-span-1 bg-white/80 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-purple-500" />
                    协作面板
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* 在线用户 */}
                  <div>
                    <label className="block text-sm font-medium mb-2">在线用户</label>
                    <div className="space-y-2">
                      {users.map((user) => (
                        <div key={user.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                          <div 
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: user.color }}
                          />
                          <span className="text-sm font-medium">{user.name}</span>
                          {user.isOnline && (
                            <Badge variant="secondary" className="ml-auto">在线</Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 协作工具 */}
                  <div className="space-y-2">
                    <Button 
                      onClick={() => createRoom('collaborative')}
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    >
                      <UserPlus className="h-4 w-4 mr-2" />
                      创建协作房间
                    </Button>
                    <Button variant="outline" className="w-full">
                      <UserPlus className="h-4 w-4 mr-2" />
                      加入房间
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Copy className="h-4 w-4 mr-2" />
                      复制房间链接
                    </Button>
                  </div>

                  {/* 协作功能 */}
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>• 多人实时协作绘画</p>
                    <p>• 不同颜色区分用户</p>
                    <p>• 实时聊天交流</p>
                    <p>• 作品保存和分享</p>
                  </div>
                </CardContent>
              </Card>

              {/* 协作画布 */}
              <div className="lg:col-span-3">
                <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Pencil className="h-5 w-5 text-purple-500" />
                      协作画布
                    </CardTitle>
                    <CardDescription>
                      多人实时协作，共同创作精美作品
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg bg-white overflow-hidden" style={{ height: '500px' }}>
                      <canvas
                        ref={canvasRef}
                        onMouseDown={startDrawing}
                        onMouseMove={draw}
                        onMouseUp={stopDrawing}
                        onMouseLeave={stopDrawing}
                        className="cursor-crosshair w-full h-full"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* 协作聊天 */}
                <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-purple-500" />
                      协作聊天
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="h-24 overflow-y-auto space-y-2 p-2 bg-gray-50 rounded-lg">
                        {messages.map((message) => (
                          <div key={message.id} className="flex items-start gap-2">
                            <div 
                              className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs"
                              style={{ backgroundColor: '#9CA3AF' }}
                            >
                              {message.userId.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-medium">用户{message.userId}</div>
                              <div className="text-sm text-gray-700">{message.content}</div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={guessInput}
                          onChange={(e) => setGuessInput(e.target.value)}
                          placeholder="发送消息..."
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        />
                        <Button onClick={sendMessage} className="bg-purple-500 hover:bg-purple-600">
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  )
}