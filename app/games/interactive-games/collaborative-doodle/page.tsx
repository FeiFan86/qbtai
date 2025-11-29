'use client'

import { useState, useEffect, useRef } from 'react'
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
  Trophy
} from 'lucide-react'
import Link from 'next/link'

// 情感主题和提示词
const emotionThemes = [
  {
    id: 'happiness',
    name: '快乐',
    color: '#FFD700',
    prompts: [
      '画出让你感到最开心的一刻',
      '用色彩表达快乐的情绪',
      '创作一个代表快乐的符号',
      '画出阳光和彩虹'
    ]
  },
  {
    id: 'love',
    name: '爱',
    color: '#FF69B4',
    prompts: [
      '画出你们第一次见面的场景',
      '创作一个代表你们爱情的符号',
      '画出一起度过的美好时光',
      '用色彩表达爱的感觉'
    ]
  },
  {
    id: 'surprise',
    name: '惊喜',
    color: '#9370DB',
    prompts: [
      '画出令人惊喜的时刻',
      '创作一个神秘的盒子',
      '画出突然出现的彩虹',
      '表达惊讶的表情'
    ]
  },
  {
    id: 'adventure',
    name: '冒险',
    color: '#20B2AA',
    prompts: [
      '画出你们梦想的旅行地',
      '创作一个冒险地图',
      '画出一起探索未知',
      '创造新的世界'
    ]
  },
  {
    id: 'calm',
    name: '宁静',
    color: '#87CEEB',
    prompts: [
      '画出最宁静的地方',
      '创作一个和平的符号',
      '画出安静的时刻',
      '用色彩表达宁静'
    ]
  },
  {
    id: 'nostalgia',
    name: '回忆',
    color: '#DEB887',
    prompts: [
      '画出童年的回忆',
      '创作一个怀旧的场景',
      '画出珍贵的记忆',
      '用色彩表达怀旧感'
    ]
  }
]

export default function CollaborativeDoodlePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [currentColor, setCurrentColor] = useState('#000000')
  const [brushSize, setBrushSize] = useState(5)
  const [drawingHistory, setDrawingHistory] = useState([])
  const [historyStep, setHistoryStep] = useState(-1)
  const [selectedTheme, setSelectedTheme] = useState(emotionThemes[0])
  const [currentPrompt, setCurrentPrompt] = useState('')
  const [isEraser, setIsEraser] = useState(false)
  const [showCompleted, setShowCompleted] = useState(false)
  const [sessionTime, setSessionTime] = useState(0)
  const [timerActive, setTimerActive] = useState(false)
  const [completedSessions, setCompletedSessions] = useState(0)
  const [totalPoints, setTotalPoints] = useState(0)

  // 预设颜色
  const presetColors = [
    '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#FFFF00',
    '#FF00FF', '#00FFFF', '#FFA500', '#800080', '#FFC0CB', '#A52A2A',
    '#808080', '#FFD700', '#4B0082', '#00CED1', '#FF1493', '#32CD32'
  ]

  // 初始化画布
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    
    // 设置白色背景
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    // 保存初始状态
    saveCanvasState()
  }, [])

  // 计时器
  useEffect(() => {
    let interval
    if (timerActive) {
      interval = setInterval(() => {
        setSessionTime(prevTime => prevTime + 1)
      }, 1000)
    } else if (!timerActive && sessionTime !== 0) {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [timerActive, sessionTime])

  // 格式化时间
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // 随机选择提示词
  useEffect(() => {
    const randomPrompt = selectedTheme.prompts[Math.floor(Math.random() * selectedTheme.prompts.length)]
    setCurrentPrompt(randomPrompt)
  }, [selectedTheme])

  // 保存画布状态
  const saveCanvasState = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const dataURL = canvas.toDataURL()
    const newHistory = drawingHistory.slice(0, historyStep + 1)
    newHistory.push(dataURL)
    setDrawingHistory(newHistory)
    setHistoryStep(newHistory.length - 1)
  }

  // 开始绘画
  const startDrawing = (e) => {
    if (!timerActive) setTimerActive(true)
    setIsDrawing(true)
    
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const ctx = canvas.getContext('2d')
    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  // 绘画中
  const draw = (e) => {
    if (!isDrawing) return
    
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const ctx = canvas.getContext('2d')
    ctx.globalCompositeOperation = isEraser ? 'destination-out' : 'source-over'
    ctx.strokeStyle = isEraser ? 'rgba(0,0,0,1)' : currentColor
    ctx.lineWidth = brushSize
    ctx.lineTo(x, y)
    ctx.stroke()
  }

  // 结束绘画
  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false)
      saveCanvasState()
    }
  }

  // 撤销
  const undo = () => {
    if (historyStep <= 0) return
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const canvasPic = new Image()
    
    canvasPic.src = drawingHistory[historyStep - 1]
    canvasPic.onload = function() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(canvasPic, 0, 0)
    }
    
    setHistoryStep(historyStep - 1)
  }

  // 重做
  const redo = () => {
    if (historyStep >= drawingHistory.length - 1) return
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const canvasPic = new Image()
    
    canvasPic.src = drawingHistory[historyStep + 1]
    canvasPic.onload = function() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(canvasPic, 0, 0)
    }
    
    setHistoryStep(historyStep + 1)
  }

  // 清空画布
  const clearCanvas = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    saveCanvasState()
  }

  // 下载画作
  const downloadDrawing = () => {
    const canvas = canvasRef.current
    const link = document.createElement('a')
    link.download = `collaborative-doodle-${selectedTheme.name}-${Date.now()}.png`
    link.href = canvas.toDataURL()
    link.click()
  }

  // 完成绘画会话
  const completeSession = () => {
    setTimerActive(false)
    setShowCompleted(true)
    
    // 计算得分
    const timeBonus = Math.max(0, 300 - sessionTime) // 最多5分钟时间奖励
    const sessionPoints = 50 + timeBonus
    setTotalPoints(totalPoints + sessionPoints)
    setCompletedSessions(completedSessions + 1)
    
    // 3秒后隐藏完成消息
    setTimeout(() => {
      setShowCompleted(false)
      resetSession()
    }, 5000)
  }

  // 重置会话
  const resetSession = () => {
    setSessionTime(0)
    setTimerActive(false)
    clearCanvas()
    
    // 选择新的随机主题
    const newTheme = emotionThemes[Math.floor(Math.random() * emotionThemes.length)]
    setSelectedTheme(newTheme)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
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
              协作涂鸦
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 block md:inline">
                情感表达
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              双人一起绘画，通过色彩和形状表达情感，增进彼此理解和默契
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* 左侧控制面板 */}
            <div className="lg:col-span-1">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="h-5 w-5 text-purple-500" />
                    绘画工具
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* 主题选择 */}
                  <div>
                    <h3 className="text-sm font-medium mb-2">情感主题</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {emotionThemes.map(theme => (
                        <Button
                          key={theme.id}
                          variant={selectedTheme.id === theme.id ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedTheme(theme)}
                          className="flex items-center gap-1"
                        >
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: theme.color }}
                          ></div>
                          {theme.name}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  {/* 当前提示 */}
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <h3 className="text-sm font-medium mb-1 flex items-center gap-1">
                      <Lightbulb className="h-4 w-4 text-yellow-500" />
                      今日提示
                    </h3>
                    <p className="text-sm text-gray-700">{currentPrompt}</p>
                  </div>
                  
                  {/* 画笔工具 */}
                  <div>
                    <h3 className="text-sm font-medium mb-2">绘画模式</h3>
                    <div className="flex gap-2">
                      <Button
                        variant={!isEraser ? "default" : "outline"}
                        size="sm"
                        onClick={() => setIsEraser(false)}
                        className="flex items-center gap-1"
                      >
                        <Brush className="h-4 w-4" />
                        画笔
                      </Button>
                      <Button
                        variant={isEraser ? "default" : "outline"}
                        size="sm"
                        onClick={() => setIsEraser(true)}
                        className="flex items-center gap-1"
                      >
                        <Eraser className="h-4 w-4" />
                        橡皮擦
                      </Button>
                    </div>
                  </div>
                  
                  {/* 画笔大小 */}
                  <div>
                    <h3 className="text-sm font-medium mb-2">画笔大小: {brushSize}px</h3>
                    <input
                      type="range"
                      min="1"
                      max="50"
                      value={brushSize}
                      onChange={(e) => setBrushSize(parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  
                  {/* 颜色选择 */}
                  <div>
                    <h3 className="text-sm font-medium mb-2">颜色选择</h3>
                    <div className="grid grid-cols-6 gap-1 mb-2">
                      {presetColors.map(color => (
                        <button
                          key={color}
                          className={`w-8 h-8 rounded border-2 ${currentColor === color ? 'border-gray-800' : 'border-gray-300'}`}
                          style={{ backgroundColor: color }}
                          onClick={() => setCurrentColor(color)}
                        />
                      ))}
                    </div>
                    <input
                      type="color"
                      value={currentColor}
                      onChange={(e) => setCurrentColor(e.target.value)}
                      className="w-full h-10 cursor-pointer"
                    />
                  </div>
                  
                  {/* 操作按钮 */}
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={undo} disabled={historyStep <= 0}>
                        <Undo2 className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={redo} disabled={historyStep >= drawingHistory.length - 1}>
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={clearCanvas}>
                        清空
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* 会话状态 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-500" />
                    会话状态
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">会话时间</span>
                    <span className="text-sm font-bold">{formatTime(sessionTime)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">完成会话</span>
                    <span className="text-sm font-bold">{completedSessions}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">总积分</span>
                    <span className="text-sm font-bold">{totalPoints}</span>
                  </div>
                  
                  <Button 
                    onClick={completeSession} 
                    className="w-full mt-4"
                    disabled={sessionTime < 30} // 至少30秒才能完成
                  >
                    <Trophy className="h-4 w-4 mr-2" />
                    完成绘画
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            {/* 右侧画布区域 */}
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Palette className="h-5 w-5 text-purple-500" />
                      绘画画布
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={downloadDrawing}>
                        <Download className="h-4 w-4 mr-1" />
                        下载
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="h-4 w-4 mr-1" />
                        分享
                      </Button>
                    </div>
                  </CardTitle>
                  <CardDescription>
                    在画布上自由绘画，表达你的情感和创意
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative bg-white rounded-lg overflow-hidden border">
                    <canvas
                      ref={canvasRef}
                      width={800}
                      height={600}
                      className="w-full cursor-crosshair"
                      onMouseDown={startDrawing}
                      onMouseMove={draw}
                      onMouseUp={stopDrawing}
                      onMouseLeave={stopDrawing}
                    />
                  </div>
                  
                  {showCompleted && (
                    <div className="mt-4 bg-green-50 border border-green-200 p-4 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Trophy className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="text-green-800 font-medium">绘画完成！</p>
                          <p className="text-green-600 text-sm">
                            获得 {50 + Math.max(0, 300 - sessionTime)} 积分，继续创作吧！
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}