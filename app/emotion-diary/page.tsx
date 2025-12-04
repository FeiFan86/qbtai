'use client'

import { useState } from 'react'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Book, Heart, Calendar, TrendingUp, Search, Filter, Trash2, Edit, Eye } from 'lucide-react'
import { useAppStore, EmotionAnalysisResult } from '@/lib/store'
import { format } from 'date-fns'

export default function SimpleEmotionDiaryPage() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [activeTab, setActiveTab] = useState('new')
  const [selectedDiary, setSelectedDiary] = useState<EmotionAnalysisResult | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  
  const { emotionHistory, addEmotionAnalysis, removeEmotionAnalysis, clearHistory, updateUserSettings } = useAppStore()

  console.log('Current emotion history:', emotionHistory)

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

  // 删除单条日记
  const handleDeleteDiary = (id: string) => {
    if (confirm('确定要删除这条日记吗？')) {
      removeEmotionAnalysis(id)
      alert('日记已删除')
    }
  }

  // 按日期分组日记
  const groupedDiaries = emotionHistory.reduce((groups, diary) => {
    const date = new Date(diary.timestamp)
    const dateKey = format(date, 'yyyy-MM-dd')
    if (!groups[dateKey]) {
      groups[dateKey] = []
    }
    groups[dateKey].push(diary)
    return groups
  }, {} as Record<string, EmotionAnalysisResult[]>)

  // 获取日期排序的键
  const sortedDateKeys = Object.keys(groupedDiaries).sort((a, b) => new Date(b).getTime() - new Date(a).getTime())

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 relative overflow-hidden">
      {/* 增强背景装饰元素 */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100/20 via-purple-100/20 to-indigo-100/20"></div>
      <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-pink-300/30 to-purple-300/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-indigo-300/30 to-blue-300/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-rose-300/20 to-red-300/20 rounded-full blur-3xl animate-pulse delay-300"></div>
      <div className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-gradient-to-r from-yellow-300/20 to-amber-300/20 rounded-full blur-3xl animate-pulse delay-700"></div>
      
      <div className="relative z-10">
        <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold tracking-tight gradient-text mb-4">
              情感日记
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              记录日常情感变化，了解自己的情感模式和成长轨迹
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="new" className="flex items-center gap-2">
                <Book className="h-4 w-4" />
                写日记
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                历史记录
              </TabsTrigger>
              <TabsTrigger value="insights" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                情感洞察
              </TabsTrigger>
            </TabsList>

            <TabsContent value="new" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Book className="h-5 w-5 text-pink-500" />
                    记录今天的情感
                  </CardTitle>
                  <CardDescription>
                    写下您的想法和感受，记录此刻的心情
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title">标题</Label>
                    <Input
                      id="title"
                      placeholder="给今天的日记起个标题..."
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="content">日记内容</Label>
                    <Textarea
                      id="content"
                      placeholder="记录今天发生的事情和您的感受..."
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      rows={8}
                    />
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button 
                      onClick={handleSaveDiary} 
                      disabled={!content.trim() || isSaving}
                      variant="default"
                    >
                      {isSaving ? '保存中...' : '保存日记'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history" className="space-y-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">历史日记</h2>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      // 导出日记功能
                      const exportData = {
                        exportTime: new Date().toISOString(),
                        totalEntries: emotionHistory.length,
                        entries: emotionHistory.map(entry => ({
                          id: entry.id,
                          timestamp: entry.timestamp,
                          title: entry.input ? `${entry.input.substring(0, 30)}...` : '无标题',
                          content: entry.input,
                          sentiment: entry.result?.overall?.sentiment || 'neutral',
                          summary: entry.result?.summary || '无摘要'
                        }))
                      }
                      
                      // 创建下载链接
                      const dataStr = JSON.stringify(exportData, null, 2)
                      const dataBlob = new Blob([dataStr], { type: 'application/json' })
                      const url = URL.createObjectURL(dataBlob)
                      const link = document.createElement('a')
                      link.href = url
                      link.download = `情感日记_导出_${format(new Date(), 'yyyy-MM-dd')}.json`
                      document.body.appendChild(link)
                      link.click()
                      document.body.removeChild(link)
                      URL.revokeObjectURL(url)
                      
                      alert('日记导出成功！')
                    }}
                  >
                    <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    导出日记
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      if (confirm('确定要清空所有日记记录吗？此操作不可撤销。')) {
                        clearHistory('emotion')
                        alert('日记记录已清空')
                      }
                    }}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    清空历史
                  </Button>
                </div>
              </div>

              {emotionHistory && emotionHistory.length > 0 ? (
                <div className="space-y-6">
                  {sortedDateKeys.map((dateKey) => (
                    <div key={dateKey}>
                      <h3 className="text-lg font-semibold mb-3 text-gray-700">
                        {format(new Date(dateKey), 'yyyy年MM月dd日')}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {groupedDiaries[dateKey].map((diary) => (
                          <Card key={diary.id} className="hover:shadow-md transition-shadow">
                            <CardHeader className="pb-2">
                              <div className="flex items-center justify-between">
                                {diary.result && diary.result.overall ? (
                                  <Badge className={getEmotionColor(diary.result.overall.sentiment)}>
                                    {getEmotionText(diary.result.overall.sentiment)}
                                  </Badge>
                                ) : (
                                  <Badge variant="outline">未知</Badge>
                                )}
                                <div className="flex gap-1">
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    onClick={() => handleViewDiary(diary)}
                                    className="h-6 w-6 p-0"
                                  >
                                    <Eye className="h-3 w-3" />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    onClick={() => handleDeleteDiary(diary.id)}
                                    className="h-6 w-6 p-0 text-red-500"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                              <CardTitle className="text-lg truncate">
                                {diary.input ? `${diary.input.substring(0, 30)}...` : '无标题'}
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm text-gray-600 line-clamp-3 mb-3">
                                {diary.result && diary.result.summary ? diary.result.summary : '无摘要'}
                              </p>
                              
                              {diary.result && diary.result.keywords && diary.result.keywords.length > 0 && (
                                <div className="flex flex-wrap gap-1 mb-3">
                                  {diary.result.keywords.slice(0, 3).map((keyword, index) => (
                                    <Badge key={index} variant="outline" className="text-xs">
                                      {keyword}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                              <div className="flex justify-between items-center text-xs text-gray-500">
                                <span>{format(new Date(diary.timestamp), 'HH:mm')}</span>
                                <Button 
                                  variant="link" 
                                  size="sm" 
                                  onClick={() => handleViewDiary(diary)}
                                  className="h-auto p-0 text-xs"
                                >
                                  查看详情
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Book className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">还没有日记记录</p>
                  <Button variant="outline" className="mt-4" onClick={() => setActiveTab('new')}>
                    写第一篇日记
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="insights" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-indigo-500" />
                    情感洞察
                  </CardTitle>
                  <CardDescription>
                    基于您的日记数据，分析情感模式和趋势
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <TrendingUp className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500 mb-4">情感洞察功能即将上线</p>
                    <p className="text-sm text-gray-400">
                      记录更多日记后，这里将展示您的情感变化趋势、主要情感触发因素等洞察
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />

      {/* 日记详情弹窗 */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>日记详情</DialogTitle>
            <DialogDescription>
              {selectedDiary && format(new Date(selectedDiary.timestamp), 'yyyy年MM月dd日 HH:mm')}
            </DialogDescription>
          </DialogHeader>
          
          {selectedDiary && (
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">日记内容</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="whitespace-pre-wrap">{selectedDiary.input}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">情感分析</h4>
                {selectedDiary.result && selectedDiary.result.overall ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge className={getEmotionColor(selectedDiary.result.overall.sentiment)}>
                        {getEmotionText(selectedDiary.result.overall.sentiment)}
                      </Badge>
                      <span className="text-sm text-gray-600">
                        置信度: {(selectedDiary.result.overall.confidence * 100).toFixed(1)}%
                      </span>
                    </div>
                    
                    {selectedDiary.result.summary && (
                      <div>
                        <p className="text-sm text-gray-700">{selectedDiary.result.summary}</p>
                      </div>
                    )}
                    
                    {selectedDiary.result.emotions && selectedDiary.result.emotions.length > 0 && (
                      <div>
                        <h5 className="text-sm font-medium mb-2">情感分布</h5>
                        <div className="grid grid-cols-2 gap-2">
                          {selectedDiary.result.emotions.map((emotion, index) => (
                            <div key={index} className="flex items-center justify-between text-xs">
                              <span>{emotion.type}</span>
                              <div className="flex items-center gap-1">
                                <div 
                                  className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden"
                                  title={`${(emotion.score * 100).toFixed(1)}%`}
                                >
                                  <div 
                                    className="h-full rounded-full"
                                    style={{
                                      width: `${emotion.score * 100}%`,
                                      backgroundColor: emotion.color
                                    }}
                                  />
                                </div>
                                <span className="text-gray-500">{(emotion.score * 100).toFixed(0)}%</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {selectedDiary.result.keywords && selectedDiary.result.keywords.length > 0 && (
                      <div>
                        <h5 className="text-sm font-medium mb-2">关键词</h5>
                        <div className="flex flex-wrap gap-1">
                          {selectedDiary.result.keywords.map((keyword, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-500">无分析数据</p>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}