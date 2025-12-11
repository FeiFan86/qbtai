'use client'

import { useState, useRef, useCallback } from 'react'
import { GameLayout } from '@/components/game/GameLayout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Calendar, Image, Puzzle, Heart, Share2, Download, Trash2 } from 'lucide-react'

interface Memory {
  id: string
  title: string
  description: string
  date: string
  images: string[]
  tags: string[]
  puzzleCompleted: boolean
  favorite: boolean
}

interface PuzzlePiece {
  id: number
  x: number
  y: number
  correctX: number
  correctY: number
  isCorrect: boolean
}

export default function EmotionalMemoryPuzzle() {
  const [memories, setMemories] = useState<Memory[]>([])
  const [currentMemory, setCurrentMemory] = useState<Memory | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [puzzlePieces, setPuzzlePieces] = useState<PuzzlePiece[]>([])
  const [puzzleCompleted, setPuzzleCompleted] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string>('')
  const [draggingPiece, setDraggingPiece] = useState<number | null>(null)
  
  const fileInputRef = useRef<HTMLInputElement>(null)
  const puzzleContainerRef = useRef<HTMLDivElement>(null)

  // 初始化记忆数据
  const initialMemories: Memory[] = [
    {
      id: '1',
      title: '第一次约会',
      description: '我们在公园里散步，聊了很多很多...',
      date: '2024-01-15',
      images: [],
      tags: ['约会', '浪漫', '初次'],
      puzzleCompleted: false,
      favorite: true
    },
    {
      id: '2',
      title: '情人节惊喜',
      description: '你为我准备了浪漫的烛光晚餐',
      date: '2024-02-14',
      images: [],
      tags: ['情人节', '惊喜', '浪漫'],
      puzzleCompleted: false,
      favorite: true
    }
  ]

  // 添加新记忆
  const addMemory = (memory: Omit<Memory, 'id' | 'puzzleCompleted' | 'favorite'>) => {
    const newMemory: Memory = {
      ...memory,
      id: Date.now().toString(),
      puzzleCompleted: false,
      favorite: false
    }
    setMemories(prev => [newMemory, ...prev])
    setShowAddForm(false)
  }

  // 删除记忆
  const deleteMemory = (id: string) => {
    setMemories(prev => prev.filter(m => m.id !== id))
    if (currentMemory?.id === id) {
      setCurrentMemory(null)
    }
  }

  // 切换收藏状态
  const toggleFavorite = (id: string) => {
    setMemories(prev => prev.map(m => 
      m.id === id ? { ...m, favorite: !m.favorite } : m
    ))
    if (currentMemory?.id === id) {
      setCurrentMemory(prev => prev ? { ...prev, favorite: !prev.favorite } : null)
    }
  }

  // 创建拼图
  const createPuzzle = useCallback((imageUrl: string) => {
    if (!puzzleContainerRef.current) return
    
    const container = puzzleContainerRef.current
    const containerWidth = container.clientWidth
    const pieceSize = containerWidth / 4
    
    const pieces: PuzzlePiece[] = []
    
    for (let y = 0; y < 4; y++) {
      for (let x = 0; x < 4; x++) {
        pieces.push({
          id: y * 4 + x,
          x: Math.random() * (containerWidth - pieceSize),
          y: Math.random() * (containerWidth - pieceSize),
          correctX: x * pieceSize,
          correctY: y * pieceSize,
          isCorrect: false
        })
      }
    }
    
    setPuzzlePieces(pieces)
    setSelectedImage(imageUrl)
    setPuzzleCompleted(false)
  }, [])

  // 开始拼图游戏
  const startPuzzle = (memory: Memory) => {
    setCurrentMemory(memory)
    if (memory.images.length > 0) {
      createPuzzle(memory.images[0])
    }
  }

  // 处理图片上传
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string
        setSelectedImage(imageUrl)
        createPuzzle(imageUrl)
      }
      reader.readAsDataURL(file)
    }
  }

  // 拖拽开始
  const handleDragStart = (pieceId: number) => {
    setDraggingPiece(pieceId)
  }

  // 拖拽结束
  const handleDragEnd = () => {
    if (draggingPiece === null) return
    
    const piece = puzzlePieces.find(p => p.id === draggingPiece)
    if (!piece || !puzzleContainerRef.current) return
    
    const container = puzzleContainerRef.current
    const pieceSize = container.clientWidth / 4
    
    const correctX = piece.correctX
    const correctY = piece.correctY
    
    // 检查是否放置到正确位置
    const isCorrect = 
      Math.abs(piece.x - correctX) < pieceSize * 0.3 && 
      Math.abs(piece.y - correctY) < pieceSize * 0.3
    
    if (isCorrect) {
      setPuzzlePieces(prev => prev.map(p => 
        p.id === draggingPiece 
          ? { ...p, x: correctX, y: correctY, isCorrect: true }
          : p
      ))
      
      // 检查是否完成拼图
      const updatedPieces = puzzlePieces.map(p => 
        p.id === draggingPiece ? { ...p, isCorrect: true } : p
      )
      
      if (updatedPieces.every(p => p.isCorrect)) {
        setPuzzleCompleted(true)
        if (currentMemory) {
          setMemories(prev => prev.map(m => 
            m.id === currentMemory.id ? { ...m, puzzleCompleted: true } : m
          ))
        }
      }
    }
    
    setDraggingPiece(null)
  }

  // 导出记忆数据
  const exportMemories = () => {
    const data = JSON.stringify(memories, null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = '情感记忆.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <GameLayout title="情感记忆拼图" description="记录和重温美好回忆">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* 控制面板 */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div className="flex items-center gap-2">
                <Puzzle className="h-5 w-5" />
                <span className="text-lg font-semibold">情感记忆拼图</span>
              </div>
              
              <div className="flex gap-2">
                <Button onClick={() => setShowAddForm(true)}>
                  <Image className="h-4 w-4 mr-2" />
                  添加记忆
                </Button>
                <Button onClick={exportMemories} variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  导出数据
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* 记忆列表 */}
          <Card>
            <CardHeader>
              <CardTitle>记忆列表</CardTitle>
              <CardDescription>点击记忆开始拼图游戏</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 max-h-96 overflow-y-auto">
              {memories.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  还没有任何记忆，点击"添加记忆"开始记录
                </div>
              ) : (
                memories.map(memory => (
                  <Card 
                    key={memory.id} 
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      currentMemory?.id === memory.id ? 'ring-2 ring-primary' : ''
                    } ${memory.favorite ? 'border-yellow-200 bg-yellow-50' : ''}`}
                    onClick={() => startPuzzle(memory)}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{memory.title}</h3>
                            {memory.favorite && <Heart className="h-4 w-4 text-red-500 fill-current" />}
                            {memory.puzzleCompleted && <Puzzle className="h-4 w-4 text-green-500" />}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{memory.description}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Calendar className="h-3 w-3" />
                            <span className="text-xs">{memory.date}</span>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {memory.tags.map(tag => (
                              <span key={tag} className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleFavorite(memory.id)
                            }}
                          >
                            <Heart className={`h-4 w-4 ${memory.favorite ? 'fill-red-500 text-red-500' : ''}`} />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation()
                              deleteMemory(memory.id)
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </CardContent>
          </Card>

          {/* 拼图区域 */}
          <Card>
            <CardHeader>
              <CardTitle>
                {currentMemory ? `${currentMemory.title} - 拼图游戏` : '选择记忆开始拼图'}
              </CardTitle>
              <CardDescription>
                {puzzleCompleted ? '🎉 拼图完成！' : '拖动拼图碎片到正确位置'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!currentMemory ? (
                <div className="text-center py-12 text-muted-foreground">
                  请从左侧选择记忆开始拼图游戏
                </div>
              ) : (
                <div className="space-y-4">
                  {/* 拼图容器 */}
                  <div 
                    ref={puzzleContainerRef}
                    className="relative w-full h-64 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 overflow-hidden"
                  >
                    {selectedImage && (
                      <div 
                        className="absolute inset-0 bg-cover bg-center opacity-20"
                        style={{ backgroundImage: `url(${selectedImage})` }}
                      />
                    )}
                    
                    {puzzlePieces.map(piece => (
                      <div
                        key={piece.id}
                        className={`absolute cursor-move transition-all ${
                          piece.isCorrect ? 'opacity-100' : 'opacity-80'
                        } ${draggingPiece === piece.id ? 'z-10 shadow-lg' : ''}`}
                        style={{
                          left: piece.x,
                          top: piece.y,
                          width: '25%',
                          height: '25%',
                          backgroundImage: selectedImage ? `url(${selectedImage})` : 'none',
                          backgroundSize: '400% 400%',
                          backgroundPosition: `${-piece.correctX / (puzzleContainerRef.current?.clientWidth || 1) * 100}% ${-piece.correctY / (puzzleContainerRef.current?.clientWidth || 1) * 100}%`,
                          border: piece.isCorrect ? '2px solid #10b981' : '1px solid #ddd',
                          borderRadius: '4px'
                        }}
                        draggable
                        onDragStart={() => handleDragStart(piece.id)}
                        onDragEnd={handleDragEnd}
                      />
                    ))}
                    
                    {puzzleCompleted && (
                      <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
                        <div className="text-2xl font-bold text-green-600">🎉 拼图完成！</div>
                      </div>
                    )}
                  </div>

                  {/* 控制按钮 */}
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => fileInputRef.current?.click()}
                      variant="outline"
                      className="flex-1"
                    >
                      <Image className="h-4 w-4 mr-2" />
                      上传图片
                    </Button>
                    <Button 
                      onClick={() => createPuzzle(selectedImage)} 
                      variant="outline"
                      className="flex-1"
                    >
                      重新拼图
                    </Button>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />

                  {/* 记忆详情 */}
                  {currentMemory && (
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold">{currentMemory.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{currentMemory.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Calendar className="h-3 w-3" />
                          <span className="text-xs">{currentMemory.date}</span>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* 添加记忆表单 */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="max-w-md w-full mx-4">
              <CardHeader>
                <CardTitle>添加新记忆</CardTitle>
                <CardDescription>记录你们的美好时刻</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">记忆标题</Label>
                  <Input id="title" placeholder="例如：第一次约会" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">记忆描述</Label>
                  <Textarea id="description" placeholder="详细描述这个美好时刻..." rows={3} />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="date">日期</Label>
                  <Input id="date" type="date" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="tags">标签（用逗号分隔）</Label>
                  <Input id="tags" placeholder="浪漫,约会,惊喜" />
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    onClick={() => {
                      const title = (document.getElementById('title') as HTMLInputElement).value
                      const description = (document.getElementById('description') as HTMLTextAreaElement).value
                      const date = (document.getElementById('date') as HTMLInputElement).value
                      const tags = (document.getElementById('tags') as HTMLInputElement).value.split(',').map(t => t.trim())
                      
                      if (title && description && date) {
                        addMemory({ title, description, date, images: [], tags })
                      }
                    }}
                    className="flex-1"
                  >
                    保存记忆
                  </Button>
                  <Button 
                    onClick={() => setShowAddForm(false)} 
                    variant="outline"
                    className="flex-1"
                  >
                    取消
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </GameLayout>
  )
}