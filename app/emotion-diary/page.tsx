'use client'

import { useState, useEffect } from 'react'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Book, Heart, Calendar, TrendingUp, Search, Filter, Trash2, Edit, Eye } from 'lucide-react'
import { useAppStore, EmotionAnalysisResult } from '@/lib/store'
import { format, parseISO } from 'date-fns'
import { zhCN } from 'date-fns/locale'

export default function EmotionDiaryPage() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState('')
  const [moodBefore, setMoodBefore] = useState('')
  const [moodAfter, setMoodAfter] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterTag, setFilterTag] = useState('')
  
  const { emotionHistory, addEmotionAnalysis, clearHistory } = useAppStore()

  // 过滤后的日记列表
  const filteredDiaries = emotionHistory.filter(diary => {
    const matchesSearch = searchTerm === '' || 
      diary.result.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      diary.input.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesTag = filterTag === '' || 
      diary.result.keywords.some(keyword => keyword.toLowerCase().includes(filterTag.toLowerCase()))
    
    return matchesSearch && matchesTag
  })

  // 所有标签（用于筛选）
  const allTags = Array.from(new Set(
    emotionHistory.flatMap(diary => diary.result.keywords)
  ))

  // 保存日记
  const handleSaveDiary = async () => {
    if (!title.trim() || !content.trim()) return
    
    setIsSaving(true)
    try {
      // 调用情感分析API
      const response = await fetch('/api/emotion/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          input: content,
          type: 'text'
        }),
      })
      
      if (response.ok) {
        const result = await response.json()
        
        // 保存到状态管理
        const diaryEntry: EmotionAnalysisResult = {
          id: Date.now().toString(),
          timestamp: new Date(),
          input: content,
          type: 'text',
          result: result.data
        }
        
        addEmotionAnalysis(diaryEntry)
        
        // 重置表单
        setTitle('')
        setContent('')
        setTags('')
        setMoodBefore('')
        setMoodAfter('')
      }
    } catch (error) {
      console.error('保存日记失败:', error)
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

          <Tabs defaultValue="new" className="space-y-6">
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
                    写下您的想法和感受，AI会帮您分析情感状态
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="moodBefore">记录前心情</Label>
                      <Select value={moodBefore} onValueChange={setMoodBefore}>
                        <SelectTrigger>
                          <SelectValue placeholder="选择记录前的心情" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="happy">开心</SelectItem>
                          <SelectItem value="sad">难过</SelectItem>
                          <SelectItem value="angry">生气</SelectItem>
                          <SelectItem value="anxious">焦虑</SelectItem>
                          <SelectItem value="neutral">平静</SelectItem>
                          <SelectItem value="excited">兴奋</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="moodAfter">记录后心情</Label>
                      <Select value={moodAfter} onValueChange={setMoodAfter}>
                        <SelectTrigger>
                          <SelectValue placeholder="选择记录后的心情" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="happy">开心</SelectItem>
                          <SelectItem value="sad">难过</SelectItem>
                          <SelectItem value="angry">生气</SelectItem>
                          <SelectItem value="anxious">焦虑</SelectItem>
                          <SelectItem value="neutral">平静</SelectItem>
                          <SelectItem value="excited">兴奋</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="tags">标签（可选）</Label>
                    <Input
                      id="tags"
                      placeholder="添加标签，用逗号分隔..."
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                    />
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button variant="outline">保存草稿</Button>
                    <Button 
                      onClick={handleSaveDiary} 
                      disabled={!title.trim() || !content.trim() || isSaving}
                      variant="pink"
                    >
                      {isSaving ? '保存中...' : '保存并分析'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history" className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                  <div className="relative flex-1 sm:flex-initial">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="搜索日记..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-gray-500" />
                    <Select value={filterTag} onValueChange={setFilterTag}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="按标签筛选" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">所有标签</SelectItem>
                        {allTags.map((tag) => (
                          <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => clearHistory('emotion')}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  清空历史
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredDiaries.length > 0 ? (
                  filteredDiaries.map((diary) => (
                    <Card key={diary.id} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <Badge className={getEmotionColor(diary.result.overall.sentiment)}>
                            {getEmotionText(diary.result.overall.sentiment)}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {format(new Date(diary.timestamp), 'MM/dd', { locale: zhCN })}
                          </span>
                        </div>
                        <CardTitle className="text-lg truncate">{diary.input.substring(0, 30)}...</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 line-clamp-3 mb-3">
                          {diary.result.summary}
                        </p>
                        
                        <div className="flex flex-wrap gap-1 mb-3">
                          {diary.result.keywords.slice(0, 3).map((keyword, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <Book className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500">
                      {searchTerm || filterTag ? '没有找到匹配的日记' : '还没有日记记录'}
                    </p>
                    <Button variant="outline" className="mt-4" onClick={() => window.location.href = '#new'}>
                      写第一篇日记
                    </Button>
                  </div>
                )}
              </div>
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