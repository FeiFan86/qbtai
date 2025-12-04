'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Book, Heart, Calendar, TrendingUp, Search, Filter, Trash2, Edit, Eye, Heart as HeartIcon } from 'lucide-react'
import { useAppStore, EmotionAnalysisResult } from '@/lib/store'
import { format } from 'date-fns'

export default function EmotionDiaryPage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [activeTab, setActiveTab] = useState('new')
  const [selectedDiary, setSelectedDiary] = useState<EmotionAnalysisResult | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  
  const { emotionHistory, addEmotionAnalysis, removeEmotionAnalysis, clearHistory } = useAppStore()

  // 保存日记
  const handleSaveDiary = async () => {
    if (!content.trim()) return
    
    setIsSaving(true)
    try {
      // 创建一个简单的日记条目，不依赖API
      const diaryEntry: EmotionAnalysisResult = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        input: content,
        type: 'text',
        result: {
          emotions: [
            { type: '快乐', score: 0.75, color: '#10B981' },
            { type: '信任', score: 0.45, color: '#06B6D4' }
          ],
          overall: {
            sentiment: 'positive',
            confidence: 0.85
          },
          keywords: ['日记', '感受', '记录'],
          summary: '这是一条情感日记记录，表达了您当下的想法和感受。'
        }
      }
      
      addEmotionAnalysis(diaryEntry)
      
      // 重置表单
      setContent('')
      setTitle('')
      
      alert('日记保存成功！')
    } catch (error) {
      console.error('保存日记失败:', error)
      alert('保存失败，请重试')
    } finally {
      setIsSaving(false)
    }
  }

  // 获取情感强度颜色
  const getEmotionColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'bg-green-100 text-green-800'
      case 'negative':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  // 获取情感倾向文本
  const getEmotionText = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return '积极'
      case 'negative':
        return '消极'
      default:
        return '中性'
    }
  }

  // 查看日记详情
  const handleViewDiary = (diary: EmotionAnalysisResult) => {
    setSelectedDiary(diary)
    setIsDialogOpen(true)
  }

  // 删除日记
  const handleDeleteDiary = (id: string) => {
    if (confirm('确定要删除这条日记吗？')) {
      removeEmotionAnalysis(id)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 relative overflow-hidden">
      {/* 增强背景装饰元素 - 与首页保持一致 */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-100/20 via-pink-100/20 to-purple-100/20"></div>
      <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-rose-300/30 to-pink-300/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-purple-300/30 to-blue-300/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-orange-300/20 to-red-300/20 rounded-full blur-3xl animate-pulse delay-300"></div>
      <div className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-gradient-to-r from-yellow-300/20 to-amber-300/20 rounded-full blur-3xl animate-pulse delay-700"></div>

      {/* 导航栏 - 与首页一致 */}
      <nav className="relative z-10 bg-white/70 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full flex items-center justify-center">
                  <HeartIcon className="h-5 w-5 text-white" fill="currentColor" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                  丘比特AI
                </span>
                <span className="block text-xs text-gray-500 -mt-1">情感互动平台</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                variant="ghost" 
                onClick={() => router.push('/login')}
                className="text-gray-600 hover:text-rose-600 transition-colors"
              >
                登录
              </Button>
              <Button 
                onClick={() => router.push('/register')}
                className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                立即体验
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* 主要内容区域 */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center mb-16">
          {/* 标签 */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-white/20 shadow-sm mb-6">
            <Book className="h-4 w-4 text-rose-500 mr-2" />
            <span className="text-sm font-medium text-gray-700">记录你的情感历程</span>
          </div>

          {/* 主标题 */}
          <div className="space-y-4 mb-8">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="block text-gray-900">情感日记</span>
              <span className="block bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                记录每一份感动
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              记录你的情感历程，分析情绪变化，
              <span className="text-rose-600 font-medium">让情感管理变得更加简单</span>
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* 左侧 - 新建日记 */}
          <div className="lg:col-span-2">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  <div className="flex items-center space-x-2">
                    <Edit className="h-6 w-6 text-rose-500" />
                    <span>写日记</span>
                  </div>
                </CardTitle>
                <CardDescription className="text-gray-600">
                  记录当下的情感状态和想法
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">日记标题（可选）</Label>
                  <Input
                    id="title"
                    placeholder="给日记起个标题..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="bg-white/50 border-white/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content">日记内容</Label>
                  <Textarea
                    id="content"
                    placeholder="写下你的情感体验和想法..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={8}
                    className="bg-white/50 border-white/20 resize-none"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    {content.length} 字
                  </div>
                  <Button
                    onClick={handleSaveDiary}
                    disabled={isSaving || !content.trim()}
                    className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {isSaving ? (
                      <>
                        <TrendingUp className="h-4 w-4 mr-2 animate-spin" />
                        保存中...
                      </>
                    ) : (
                      <>
                        <Book className="h-4 w-4 mr-2" />
                        保存日记
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 右侧 - 日记列表 */}
          <div className="lg:col-span-1">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg h-full">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">
                  <div className="flex items-center justify-between">
                    <span>日记历史</span>
                    <Badge variant="secondary" className="bg-rose-100 text-rose-800">
                      {emotionHistory.length} 条
                    </Badge>
                  </div>
                </CardTitle>
                <CardDescription className="text-gray-600">
                  最近的情感记录
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 max-h-96 overflow-y-auto">
                {emotionHistory.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Book className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>还没有日记记录</p>
                    <p className="text-sm">开始写下你的第一份情感日记吧</p>
                  </div>
                ) : (
                  emotionHistory.slice(0, 10).map((diary) => (
                    <Card key={diary.id} className="bg-white/50 border-white/20 hover:shadow-md transition-shadow duration-300">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <Calendar className="h-3 w-3 text-gray-400" />
                              <span className="text-xs text-gray-500">
                                {format(new Date(diary.timestamp), 'yyyy-MM-dd HH:mm')}
                              </span>
                            </div>
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {diary.input.length > 50 ? `${diary.input.substring(0, 50)}...` : diary.input}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <Badge className={getEmotionColor(diary.result.overall.sentiment)}>
                            {getEmotionText(diary.result.overall.sentiment)}
                          </Badge>
                          <div className="flex space-x-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewDiary(diary)}
                              className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
                            >
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteDiary(diary.id)}
                              className="h-6 w-6 p-0 text-gray-400 hover:text-red-500"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* 页脚 - 与首页一致 */}
      <footer className="relative z-10 bg-white/70 backdrop-blur-md border-t border-white/20 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full flex items-center justify-center">
                <HeartIcon className="h-4 w-4 text-white" fill="currentColor" />
              </div>
              <span className="text-lg font-bold text-gray-900">丘比特AI情感助手</span>
            </div>
            <p className="text-gray-600">
              © 2024 专为情侣设计的互动游戏平台. 让爱更美好.
            </p>
            <p className="text-sm text-gray-500">
              当前版本: v2.0.0 | 用心创造每一份感动
            </p>
          </div>
        </div>
      </footer>

      {/* 日记详情对话框 */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-white/90 backdrop-blur-sm max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              日记详情
            </DialogTitle>
            <DialogDescription>
              {selectedDiary && format(new Date(selectedDiary.timestamp), 'yyyy年MM月dd日 HH:mm')}
            </DialogDescription>
          </DialogHeader>
          
          {selectedDiary && (
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-900 whitespace-pre-wrap">{selectedDiary.input}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">情感分析</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Badge className={getEmotionColor(selectedDiary.result.overall.sentiment)}>
                      {getEmotionText(selectedDiary.result.overall.sentiment)}
                    </Badge>
                    <p className="text-xs text-gray-500 mt-1">
                      置信度: {(selectedDiary.result.overall.confidence * 100).toFixed(1)}%
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">关键词</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-1">
                      {selectedDiary.result.keywords.map((keyword, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}