'use client'

import React, { useState } from 'react'
import { MessageCircle, Calendar, Heart, Plus, Search, Edit, Trash2, Download, Share2, Filter, BarChart3, TrendingUp, Star, Award, Users, Zap, Activity, FileText } from 'lucide-react'
import GlobalNavbar from '@/components/global-navbar'
import UsageGuard, { UsageStatus } from '@/components/usage-guard'
import { EmotionCalendar } from '@/components/emotion-calendar'
import { EmotionDashboard } from '@/components/emotion-dashboard'
import { SocialEmotionManager } from '@/components/social-emotion-manager'
import { EnhancedEmotionEditor } from '@/components/enhanced-emotion-editor'
import { EmotionAlertEngine } from '@/components/emotion-alert-engine'
import { EmotionHealthReport } from '@/components/emotion-health-report'

interface Diary {
  id: number;
  date: string;
  title: string;
  emotion: string;
  content: string;
  mood: 'positive' | 'neutral' | 'negative';
  tags: string[];
  rating: number;
}

// 页面视图类型
type ViewType = 'diary' | 'calendar' | 'dashboard' | 'social' | 'alerts' | 'reports'

export default function EmotionDiaryPage() {
  const [activeView, setActiveView] = useState<ViewType>('diary')
  const [diaries, setDiaries] = useState<Diary[]>([
    {
      id: 1,
      date: '2024-12-06',
      title: '温馨的周末约会',
      emotion: '快乐',
      content: '今天和他一起去了公园，阳光很好，我们聊了很多关于未来的事情。感觉彼此更加了解对方了。他特别贴心，还准备了小惊喜。',
      mood: 'positive' as const,
      tags: ['约会', '公园', '未来规划'],
      rating: 5
    },
    {
      id: 2,
      date: '2024-12-04',
      title: '深夜的真心话',
      emotion: '感动',
      content: '昨晚我们聊到很晚，分享了很多内心深处的想法。发现原来我们都在为了彼此变得更好而努力。',
      mood: 'positive' as const,
      tags: ['深度沟通', '情感交流', '成长'],
      rating: 4
    },
    {
      id: 3,
      date: '2024-12-02',
      title: '小矛盾后的成长',
      emotion: '复杂',
      content: '因为一些小事有了分歧，但晚上好好沟通后，感觉关系更加牢固了。学会了更好的表达方式。',
      mood: 'neutral' as const,
      tags: ['矛盾处理', '沟通技巧', '成长'],
      rating: 3
    }
  ])

  const [newDiary, setNewDiary] = useState({
    title: '',
    content: '',
    emotion: '快乐',
    tags: '',
    rating: 5
  })

  const [searchTerm, setSearchTerm] = useState('')
  const [filterEmotion, setFilterEmotion] = useState('all')
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editData, setEditData] = useState<Partial<Diary>>({})

  const handleAddDiary = async (onRecordUsage: () => Promise<void>) => {
    if (!newDiary.title.trim() || !newDiary.content.trim()) return
    
    // 记录使用次数
    await onRecordUsage()
    
    const diary: Diary = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      title: newDiary.title,
      emotion: newDiary.emotion,
      content: newDiary.content,
      mood: newDiary.emotion === '低落' ? 'negative' : 
            newDiary.emotion === '复杂' ? 'neutral' : 'positive',
      tags: newDiary.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      rating: newDiary.rating
    }
    
    setDiaries([diary, ...diaries])
    setNewDiary({ title: '', content: '', emotion: '快乐', tags: '', rating: 5 })
  }

  const handleEditDiary = (diary: Diary) => {
    setEditingId(diary.id)
    setEditData({
      title: diary.title,
      emotion: diary.emotion,
      content: diary.content,
      tags: diary.tags,
      rating: diary.rating
    })
  }

  const handleSaveEdit = () => {
    if (!editingId) return
    
    setDiaries(diaries.map(diary => 
      diary.id === editingId 
        ? {
            ...diary,
            ...editData,
            tags: editData.tags ? (typeof editData.tags === 'string' ? (editData.tags as string).split(',').map(tag => tag.trim()).filter(tag => tag) : editData.tags) : diary.tags,
            mood: editData.emotion === '低落' ? 'negative' : 
                  editData.emotion === '复杂' ? 'neutral' : 'positive'
          }
        : diary
    ))
    
    setEditingId(null)
    setEditData({})
  }

  const handleDeleteDiary = (id: number) => {
    if (window.confirm('确定要删除这篇日记吗？')) {
      setDiaries(diaries.filter(diary => diary.id !== id))
    }
  }

  const filteredDiaries = diaries.filter(diary => {
    const matchesSearch = diary.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         diary.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         diary.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesEmotion = filterEmotion === 'all' || diary.emotion === filterEmotion
    
    return matchesSearch && matchesEmotion
  })

  const generateDiaryReport = () => {
    const reportContent = `
# 情感日记报告

## 统计概览
- 总日记数: ${diaries.length}
- 情感分布: ${diaries.filter(d => d.mood === 'positive').length} 篇积极, ${diaries.filter(d => d.mood === 'neutral').length} 篇中性, ${diaries.filter(d => d.mood === 'negative').length} 篇消极
- 平均评分: ${(diaries.reduce((sum, d) => sum + d.rating, 0) / diaries.length).toFixed(1)}/5

## 详细日记
${diaries.map(diary => `
### ${diary.date} - ${diary.title}
**情感**: ${diary.emotion} | **评分**: ${diary.rating}/5
**标签**: ${diary.tags.join(', ')}

${diary.content}

---
`).join('')}

分析时间: ${new Date().toLocaleString()}
工具: 丘比特AI情感日记
    `.trim()

    const blob = new Blob([reportContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `情感日记报告_${new Date().getTime()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const shareDiary = async (diary: Diary) => {
    const shareText = `📝 情感日记分享\n\n**${diary.title}**\n${diary.date}\n\n${diary.content.substring(0, 100)}...\n\n#丘比特AI #情感日记`
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: '我的情感日记',
          text: shareText
        })
      } catch (error) {
        console.log('分享取消')
      }
    } else {
      navigator.clipboard.writeText(shareText)
      alert('日记内容已复制到剪贴板，可以粘贴到社交媒体分享')
    }
  }

  // 情感统计
  const emotionStats = {
    positive: diaries.filter(d => d.mood === 'positive').length,
    neutral: diaries.filter(d => d.mood === 'neutral').length,
    negative: diaries.filter(d => d.mood === 'negative').length,
    total: diaries.length,
    avgRating: (diaries.reduce((sum, d) => sum + d.rating, 0) / diaries.length).toFixed(1)
  }

  // 渲染当前视图
  const renderCurrentView = () => {
    switch (activeView) {
      case 'calendar':
        return <EmotionCalendar diaries={diaries} />
      case 'dashboard':
        return <EmotionDashboard diaries={diaries} />
      case 'social':
        return <SocialEmotionManager diaries={diaries} setDiaries={setDiaries} />
      case 'alerts':
        return <EmotionAlertEngine diaries={diaries} />
      case 'reports':
        return <EmotionHealthReport diaries={diaries} />
      default:
        return (
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
            {/* 新建日记 */}
            <div className="md:col-span-1">
              <EnhancedEmotionEditor 
                newDiary={newDiary}
                setNewDiary={setNewDiary}
                handleAddDiary={handleAddDiary}
                canUse={true}
                isLoading={false}
                onUse={() => Promise.resolve()}
              />
            </div>

            {/* 日记列表 */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    我的日记 <span className="text-gray-500 text-sm font-normal">({filteredDiaries.length} 篇)</span>
                  </h2>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={generateDiaryReport}
                      className="flex items-center space-x-2 bg-green-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-green-600 transition-colors"
                    >
                      <Download className="h-4 w-4" />
                      <span>导出报告</span>
                    </button>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Calendar className="h-4 w-4 mr-1" />
                      共 {diaries.length} 篇
                    </div>
                  </div>
                </div>

                {/* 搜索和筛选 */}
                <div className="mb-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="搜索日记标题、内容或标签..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Filter className="h-4 w-4 text-gray-500" />
                      <select
                        value={filterEmotion}
                        onChange={(e) => setFilterEmotion(e.target.value)}
                        className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500"
                      >
                        <option value="all">全部情感</option>
                        <option value="快乐">快乐</option>
                        <option value="感动">感动</option>
                        <option value="期待">期待</option>
                        <option value="安心">安心</option>
                        <option value="复杂">复杂</option>
                        <option value="低落">低落</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {filteredDiaries.map((diary) => (
                    <div key={diary.id} className="border border-gray-200 rounded-lg p-4 hover:border-rose-200 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          {editingId === diary.id ? (
                            <input
                              type="text"
                              value={editData.title || diary.title}
                              onChange={(e) => setEditData({...editData, title: e.target.value})}
                              className="text-lg font-semibold text-gray-900 border-b border-gray-300 focus:outline-none focus:border-rose-500 w-full"
                            />
                          ) : (
                            <h3 className="text-lg font-semibold text-gray-900">{diary.title}</h3>
                          )}
                          <div className="flex items-center space-x-3 text-sm text-gray-500 mt-1">
                            <Calendar className="h-3 w-3" />
                            <span>{diary.date}</span>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              diary.mood === 'positive' ? 'bg-green-100 text-green-700' :
                              diary.mood === 'negative' ? 'bg-red-100 text-red-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {diary.emotion}
                            </span>
                            <div className="flex items-center space-x-1">
                              <Star className="h-3 w-3 text-yellow-500" />
                              <span>{diary.rating}/5</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => shareDiary(diary)}
                            className="p-1 text-gray-400 hover:text-blue-500 transition-colors"
                            title="分享"
                          >
                            <Share2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleEditDiary(diary)}
                            className="p-1 text-gray-400 hover:text-amber-500 transition-colors"
                            title="编辑"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteDiary(diary.id)}
                            className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                            title="删除"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      {editingId === diary.id ? (
                        <div className="space-y-3">
                          <textarea
                            value={editData.content || diary.content}
                            onChange={(e) => setEditData({...editData, content: e.target.value})}
                            className="w-full h-24 p-2 border border-gray-200 rounded resize-none"
                          />
                          <div className="flex space-x-2">
                            <button
                              onClick={handleSaveEdit}
                              className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
                            >
                              保存
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-300"
                            >
                              取消
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <p className="text-gray-600 leading-relaxed mb-3">{diary.content}</p>
                          <div className="flex flex-wrap gap-2">
                            {diary.tags.map((tag, index) => (
                              <span key={index} className="px-2 py-1 bg-rose-50 text-rose-700 rounded-full text-xs">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                  
                  {filteredDiaries.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                      <MessageCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>没有找到匹配的日记</p>
                      <p className="text-sm">尝试调整搜索条件或创建新日记</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <UsageGuard feature="emotion-diary">
      {({ canUse, remainingUses, onUse, isLoading, usageText }) => (
        <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
          <GlobalNavbar />

          <main className="pt-16">
            <div className="container py-12">
              {/* 页面标题 */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 mb-4">
                  <MessageCircle className="h-5 w-5 text-rose-500 mr-2" />
                  <span className="text-sm font-medium text-gray-700">情感日记</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  情感智能分析平台
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  记录情感历程，分析情感趋势，获得个性化建议，让爱更美好
                </p>
              </div>

              <div className="max-w-4xl mx-auto mb-6">
                <UsageStatus feature="emotion-diary" className="justify-center" />
              </div>

              {/* 导航选项卡 */}
              <div className="max-w-4xl mx-auto mb-8">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2">
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setActiveView('diary')}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                        activeView === 'diary' 
                          ? 'bg-rose-500 text-white' 
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span>日记记录</span>
                    </button>
                    <button
                      onClick={() => setActiveView('calendar')}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                        activeView === 'calendar' 
                          ? 'bg-blue-500 text-white' 
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <Calendar className="h-4 w-4" />
                      <span>情感日历</span>
                    </button>
                    <button
                      onClick={() => setActiveView('dashboard')}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                        activeView === 'dashboard' 
                          ? 'bg-green-500 text-white' 
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <BarChart3 className="h-4 w-4" />
                      <span>数据看板</span>
                    </button>
                    <button
                      onClick={() => setActiveView('social')}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                        activeView === 'social' 
                          ? 'bg-purple-500 text-white' 
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <Users className="h-4 w-4" />
                      <span>社交情感</span>
                    </button>
                    <button
                      onClick={() => setActiveView('alerts')}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                        activeView === 'alerts' 
                          ? 'bg-amber-500 text-white' 
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <Zap className="h-4 w-4" />
                      <span>情感预警</span>
                    </button>
                    <button
                      onClick={() => setActiveView('reports')}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                        activeView === 'reports' 
                          ? 'bg-indigo-500 text-white' 
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <FileText className="h-4 w-4" />
                      <span>健康报告</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* 当前视图内容 */}
              {renderCurrentView()}
            </div>
          </main>

          <footer className="bg-gray-50 border-t border-gray-200">
            <div className="container py-8">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <div className="w-6 h-6 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full flex items-center justify-center">
                    <MessageCircle className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-gray-900 font-semibold">丘比特AI情感助手</span>
                </div>
                <p className="text-gray-600 text-sm">
                  © 2024 专为情侣设计的情感助手平台. 让爱更美好.
                </p>
              </div>
            </div>
          </footer>
        </div>
      )}
    </UsageGuard>
  )
}