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

// 绘画模板
interface DrawingTemplate {
  id: string
  name: string
  description: string
  svgPath: string
  color: string
}

const drawingTemplates: DrawingTemplate[] = [
  {
    id: 'heart',
    name: '爱心',
    description: '绘制一个美丽的爱心',
    svgPath: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.41 2 3 4.23 3 2.91c0 1.11.64 2.08 1.57 2.73L12 22l7.43-7.36c.93-.65 1.57-1.62 1.57-2.73 0-2.31-2.41-4.41-4.57-4.41z',
    color: '#FF69B4'
  },
  {
    id: 'smiley',
    name: '笑脸',
    description: '绘制一个开心的笑脸',
    svgPath: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-9.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm4 0C-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm-2 6.5c-2.33 0-4.31 1.46-4.71 3.5h2.12c.34-1.16 1.42-2 2.59-2s2.25.84 2.59 2h2.12c-.4-2.04-2.38-3.5-4.71-3.5z',
    color: '#FFD700'
  },
  {
    id: 'house',
    name: '房子',
    description: '绘制一个温馨的房子',
    svgPath: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8h5z',
    color: '#8B4513'
  },
  {
    id: 'tree',
    name: '树',
    description: '绘制一棵茂盛的树',
    svgPath: 'M12 1L3 9h4v11h10V9h4z',
    color: '#228B22'
  },
  {
    id: 'star',
    name: '星星',
    description: '绘制一颗闪亮的星星',
    svgPath: 'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L12 17.27z',
    color: '#FFA500'
  },
  {
    id: 'flower',
    name: '花朵',
    description: '绘制一朵美丽的花朵',
    svgPath: 'M12 22c4.97 0 9-4.03 9-9-4.97 0-9 4.03-9 9 4.97 0 9 4.03 9 9zm0-18c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9 4.03-9 9-9zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zm0-12c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5z',
    color: '#FF69B4'
  }
]

// 示例绘画
const exampleDrawings = [
  {
    id: 'rainbow',
    title: '彩虹心情',
    description: '用彩虹色表达快乐的心情',
    colors: ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3'],
    techniques: ['渐变', '色彩搭配', '情感表达']
  },
  {
    id: 'abstract',
    title: '抽象艺术',
    description: '自由发挥，创造独特的抽象作品',
    colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'],
    techniques: ['抽象表现', '色彩理论', '构图平衡']
  },
  {
    id: 'nature',
    title: '自然风光',
    description: '绘制大自然的美景',
    colors: ['#228B22', '#32CD32', '#3CB371', '#8B4513', '#87CEEB', '#F0E68C'],
    techniques: ['自然色彩', '层次感', '透视']
  }
]

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
  }
]

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}

// 模板选择对话框
const TemplateDialog = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (templateId: string) => void
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">选择绘画模板</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drawingTemplates.map(template => (
            <div 
              key={template.id}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex justify-center mb-3">
                <svg width="60" height="60" viewBox="0 0 24 24" className="text-gray-400">
                  <path d={template.svgPath} fill={template.color} />
                </svg>
              </div>
              <h3 className="font-medium text-center">{template.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-2">{template.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">绘画示例</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {exampleDrawings.map(example => (
              <div key={example.id} className="border rounded-lg p-3">
                <h4 className="font-medium mb-1">{example.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                <div className="flex gap-1 mb-2">
                  {example.colors.map(color => (
                    <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {example.techniques.map(tech => (
                    <span key={tech} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}

export default function CollaborativeDoodlePage() {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('')
  const [showTemplateDialog, setShowTemplateDialog] = useState(false)
  const [selectedTheme, setSelectedTheme] = useState<string>('happiness')
  const [currentPrompt, setCurrentPrompt] = useState<string>('')
  const [doodleHistory, setDoodleHistory] = useState<Array<{id: string, theme: string, prompt: string, timestamp: number}>>([])
  const [isDrawing, setIsDrawing] = useState(false)
  const [drawTime, setDrawTime] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const drawTimeIntervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (selectedTheme) {
      const theme = emotionThemes.find(t => t.id === selectedTheme)
      if (theme && theme.prompts.length > 0) {
        const randomPrompt = theme.prompts[Math.floor(Math.random() * theme.prompts.length)]
        setCurrentPrompt(randomPrompt)
      }
    }
  }, [selectedTheme])

  useEffect(() => {
    // 从localStorage加载历史记录
    const savedHistory = localStorage.getItem('doodleHistory')
    if (savedHistory) {
      try {
        setDoodleHistory(JSON.parse(savedHistory))
      } catch (error) {
        console.error('Failed to load doodle history:', error)
      }
    }
  }, [])

  useEffect(() => {
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

  const startDrawing = () => {
    if (!selectedTemplate) {
      setShowTemplateDialog(true)
      return
    }
    setIsDrawing(true)
    setDrawTime(0)
    // 这里可以初始化画布
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d')
      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
        ctx.strokeStyle = '#000000'
        ctx.lineWidth = 2
        ctx.lineCap = 'round'
      }
    }
  }

  const stopDrawing = () => {
    setIsDrawing(false)
    // 保存到历史记录
    const newDoodle = {
      id: Date.now().toString(),
      theme: selectedTheme,
      prompt: currentPrompt,
      timestamp: Date.now()
    }
    const updatedHistory = [newDoodle, ...doodleHistory]
    setDoodleHistory(updatedHistory)
    localStorage.setItem('doodleHistory', JSON.stringify(updatedHistory))
  }

  const clearCanvas = () => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d')
      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
      }
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/games/interactive-games" className="inline-flex items-center text-purple-600 hover:text-purple-800 mb-6">
            <ArrowLeft className="mr-2" size={20} />
            返回互动游戏
          </Link>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-2">协作涂鸦</h1>
          <p className="text-gray-600">选择一个模板，与伴侣一起创作美丽的画作</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Palette className="mr-2" size={20} />
                  画布
                </CardTitle>
                <CardDescription>
                  {currentPrompt ? `当前主题：${currentPrompt}` : '选择一个情感主题开始创作'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-white border-2 border-gray-300 rounded-lg p-2 mb-4">
                  <canvas
                    ref={canvasRef}
                    width={600}
                    height={400}
                    className="w-full border border-gray-200 rounded cursor-crosshair"
                  />
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <Button onClick={startDrawing} disabled={isDrawing}>
                    {isDrawing ? (
                      <>
                        <Clock className="mr-2" size={16} />
                        {formatTime(drawTime)}
                      </>
                    ) : (
                      <>
                        <Brush className="mr-2" size={16} />
                        开始绘画
                      </>
                    )}
                  </Button>
                  <Button onClick={stopDrawing} disabled={!isDrawing} variant="outline">
                    完成作品
                  </Button>
                  <Button onClick={clearCanvas} variant="outline">
                    <Eraser className="mr-2" size={16} />
                    清空画布
                  </Button>
                  <Button onClick={saveDoodle} variant="outline">
                    <Download className="mr-2" size={16} />
                    保存作品
                  </Button>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="mr-2" size={16} />
                  <span>当前模板: {selectedTemplate ? drawingTemplates.find(t => t.id === selectedTemplate)?.name : '未选择'}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="mr-2" size={20} />
                  情感主题
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {emotionThemes.map(theme => (
                    <button
                      key={theme.id}
                      onClick={() => setSelectedTheme(theme.id)}
                      className={`w-full text-left p-3 rounded-lg border transition-colors ${
                        selectedTheme === theme.id 
                          ? 'border-purple-500 bg-purple-50 text-purple-700' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center">
                        <div 
                          className="w-4 h-4 rounded-full mr-3" 
                          style={{ backgroundColor: theme.color }}
                        />
                        <span className="font-medium">{theme.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="mr-2" size={20} />
                  绘画技巧
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <Lightbulb className="mr-2 text-yellow-500 mt-1" size={16} />
                    <div>
                      <h4 className="font-medium">色彩搭配</h4>
                      <p className="text-sm text-gray-600">使用互补色创造和谐的画面</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Sparkles className="mr-2 text-purple-500 mt-1" size={16} />
                    <div>
                      <h4 className="font-medium">层次感</h4>
                      <p className="text-sm text-gray-600">通过深浅变化创造立体感</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Send className="mr-2 text-blue-500 mt-1" size={16} />
                    <div>
                      <h4 className="font-medium">情感表达</h4>
                      <p className="text-sm text-gray-600">用色彩表达内心的感受</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {doodleHistory.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Trophy className="mr-2" size={20} />
                作品历史
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {doodleHistory.map(doodle => (
                  <div key={doodle.id} className="border rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">
                        {emotionThemes.find(t => t.id === doodle.theme)?.name}
                      </Badge>
                      <span className="text-sm text-gray-500">
                        {new Date(doodle.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{doodle.prompt}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <Footer />
      
      <TemplateDialog 
        isOpen={showTemplateDialog}
        onClose={() => setShowTemplateDialog(false)}
        onSelectTemplate={(templateId) => {
          setSelectedTemplate(templateId)
          setShowTemplateDialog(false)
        }}
      />
    </div>
  )
}