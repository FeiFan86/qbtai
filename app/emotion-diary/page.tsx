'use client'

import { useState } from 'react'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
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
  
  const { emotionHistory, addEmotionAnalysis, clearHistory } = useAppStore()

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
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
                      // 添加测试数据
                      const testEntry: EmotionAnalysisResult = {
                        id: Date.now().toString(),
                        timestamp: new Date().toISOString(),
                        input: '今天工作很顺利，完成了重要的项目，感觉很有成就感。',
                        type: 'text',
                        result: {
                          emotions: [
                            { type: '快乐', score: 0.75, color: '#10B981' },
                            { type: '期待', score: 0.45, color: '#EC4899' }
                          ],
                          overall: {
                            sentiment: 'positive',
                            confidence: 0.85
                          },
                          keywords: ['开心', '满足', '积极', '美好'],
                          summary: '这段文字表达了明显的积极情感，显示出快乐和满足感。'
                        }
                      }
                      addEmotionAnalysis(testEntry)
                      alert('测试数据已添加！')
                    }}
                  >
                    添加测试数据
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      clearHistory('emotion')
                      alert('历史记录已清空')
                    }}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    清空历史
                  </Button>
                </div>
              </div>

              {emotionHistory && emotionHistory.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {emotionHistory.map((diary) => (
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
                          <span className="text-xs text-gray-500">
                            {diary.timestamp ? format(new Date(diary.timestamp), 'MM/dd') : '未知日期'}
                          </span>
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
                      </CardContent>
                    </Card>
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
    </div>
  )
}