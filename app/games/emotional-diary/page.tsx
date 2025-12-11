'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  BookOpen, Heart, Calendar, Edit, Trash2, 
  Share2, Download, Plus, Search, Filter,
  Lock, Unlock, Star, MessageSquare
} from 'lucide-react'
import GlobalNavbar from '@/components/global-navbar'

interface DiaryEntry {
  id: string;
  date: string;
  title: string;
  content: string;
  emotion: 'happy' | 'sad' | 'angry' | 'anxious' | 'peaceful' | 'excited';
  mood: number; // 1-5
  tags: string[];
  isPrivate: boolean;
  createdAt: string;
}

const emotionColors = {
  happy: 'from-yellow-400 to-orange-500',
  sad: 'from-blue-400 to-indigo-500',
  angry: 'from-red-400 to-pink-500',
  anxious: 'from-purple-400 to-pink-500',
  peaceful: 'from-green-400 to-teal-500',
  excited: 'from-orange-400 to-red-500'
}

const emotionIcons = {
  happy: '😊',
  sad: '😢',
  angry: '😠',
  anxious: '😰',
  peaceful: '😌',
  excited: '🤩'
}

const emotionLabels = {
  happy: '开心',
  sad: '悲伤',
  angry: '生气',
  anxious: '焦虑',
  peaceful: '平静',
  excited: '兴奋'
}

export default function EmotionalDiaryPage() {
  const router = useRouter()
  const [entries, setEntries] = useState<DiaryEntry[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedEmotion, setSelectedEmotion] = useState('all')
  const [showPrivate, setShowPrivate] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  
  const [newEntry, setNewEntry] = useState({
    title: '',
    content: '',
    emotion: 'happy' as DiaryEntry['emotion'],
    mood: 3,
    tags: [] as string[],
    isPrivate: false
  })

  // 从localStorage加载日记
  useEffect(() => {
    const savedEntries = localStorage.getItem('emotional-diary-entries')
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries))
    }
  }, [])

  // 保存日记到localStorage
  useEffect(() => {
    if (entries.length > 0) {
      localStorage.setItem('emotional-diary-entries', JSON.stringify(entries))
    }
  }, [entries])

  const createEntry = () => {
    if (!newEntry.title.trim() || !newEntry.content.trim()) {
      alert('请输入标题和内容')
      return
    }

    const entry: DiaryEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('zh-CN'),
      title: newEntry.title,
      content: newEntry.content,
      emotion: newEntry.emotion,
      mood: newEntry.mood,
      tags: newEntry.tags,
      isPrivate: newEntry.isPrivate,
      createdAt: new Date().toISOString()
    }

    setEntries([entry, ...entries])
    setNewEntry({
      title: '',
      content: '',
      emotion: 'happy',
      mood: 3,
      tags: [],
      isPrivate: false
    })
    setIsCreating(false)
  }

  const deleteEntry = (id: string) => {
    if (confirm('确定要删除这篇日记吗？')) {
      setEntries(entries.filter(entry => entry.id !== id))
    }
  }

  const shareEntry = (entry: DiaryEntry) => {
    const shareText = `📖 ${entry.title}\n\n${entry.content.substring(0, 100)}...\n\n情感: ${emotionLabels[entry.emotion]} | 心情: ${entry.mood}/5\n#情感日记 #丘比特AI`
    
    if (navigator.share) {
      navigator.share({
        title: entry.title,
        text: shareText
      })
    } else {
      navigator.clipboard.writeText(shareText)
      alert('日记内容已复制到剪贴板')
    }
  }

  const exportDiary = () => {
    const diaryContent = entries.map(entry => {
      return `## ${entry.title}\n**日期**: ${entry.date}\n**情感**: ${emotionLabels[entry.emotion]}\n**心情评分**: ${entry.mood}/5\n**隐私**: ${entry.isPrivate ? '私密' : '公开'}\n\n${entry.content}\n\n---\n`
    }).join('\n')

    const fullContent = `# 情感日记报告\n\n## 统计信息\n- 总日记数: ${entries.length}\n- 平均心情评分: ${(entries.reduce((sum, e) => sum + e.mood, 0) / entries.length || 0).toFixed(1)}/5\n- 情感分布: ${Object.entries(emotionLabels).map(([key, label]) => `${label}: ${entries.filter(e => e.emotion === key).length}篇`).join(', ')}\n\n## 日记内容\n\n${diaryContent}\n\n导出时间: ${new Date().toLocaleString('zh-CN')}`

    const blob = new Blob([fullContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `情感日记报告_${new Date().getTime()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesEmotion = selectedEmotion === 'all' || entry.emotion === selectedEmotion
    const matchesPrivacy = showPrivate || !entry.isPrivate
    
    return matchesSearch && matchesEmotion && matchesPrivacy
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      <GlobalNavbar />

      <main className="pt-16">
        <div className="container py-8">
          {/* 页面标题 */}
          <div className="text-center mb-8 relative">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-rose-200 mb-4 shadow-sm">
              <BookOpen className="h-5 w-5 text-rose-500 mr-2" />
              <span className="text-sm font-medium text-rose-700">情感记录</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
              情感日记
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              📝 记录每日心情，分享情感历程，增进彼此理解
            </p>
          </div>

          {/* 统计概览 */}
          <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
              <div className="text-2xl font-bold text-rose-600 mb-2">{entries.length}</div>
              <div className="text-sm text-gray-500">日记总数</div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
              <div className="text-2xl font-bold text-purple-600 mb-2">
                {entries.length > 0 ? (entries.reduce((sum, e) => sum + e.mood, 0) / entries.length).toFixed(1) : '0'}/5
              </div>
              <div className="text-sm text-gray-500">平均心情</div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">
                {entries.filter(e => e.isPrivate).length}
              </div>
              <div className="text-sm text-gray-500">私密日记</div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">
                {new Set(entries.flatMap(e => e.tags)).size}
              </div>
              <div className="text-sm text-gray-500">标签数量</div>
            </div>
          </div>

          {/* 控制面板 */}
          <div className="max-w-6xl mx-auto mb-8">
            <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-rose-100 p-6">
              <div className="grid md:grid-cols-4 gap-4 items-end">
                <div className="md:col-span-2 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-rose-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="搜索日记标题、内容或标签..."
                    className="w-full pl-10 pr-4 py-3 border border-rose-200 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-300 transition-all"
                  />
                </div>
                <div>
                  <select
                    value={selectedEmotion}
                    onChange={(e) => setSelectedEmotion(e.target.value)}
                    className="w-full border border-rose-200 rounded-lg px-3 py-3 bg-white/80 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-300 transition-all"
                  >
                    <option value="all">所有情感</option>
                    {Object.entries(emotionLabels).map(([key, label]) => (
                      <option key={key} value={key}>{label}</option>
                    ))}
                  </select>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setShowPrivate(!showPrivate)}
                    className={`flex-1 py-3 px-4 rounded-lg border transition-all ${
                      showPrivate 
                        ? 'bg-rose-100 border-rose-300 text-rose-700' 
                        : 'bg-white border-rose-200 text-gray-600 hover:bg-rose-50'
                    }`}
                  >
                    {showPrivate ? <Unlock className="h-4 w-4 mx-auto" /> : <Lock className="h-4 w-4 mx-auto" />}
                  </button>
                  <button
                    onClick={exportDiary}
                    className="flex-1 py-3 px-4 bg-rose-100 border border-rose-200 rounded-lg text-rose-700 hover:bg-rose-200 transition-all"
                  >
                    <Download className="h-4 w-4 mx-auto" />
                  </button>
                  <button
                    onClick={() => setIsCreating(true)}
                    className="flex-1 py-3 px-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-lg hover:from-rose-600 hover:to-pink-600 transition-all"
                  >
                    <Plus className="h-4 w-4 mx-auto" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 创建日记表单 */}
          {isCreating && (
            <div className="max-w-4xl mx-auto mb-8">
              <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-rose-100 p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">写新日记</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">标题</label>
                    <input
                      type="text"
                      value={newEntry.title}
                      onChange={(e) => setNewEntry({...newEntry, title: e.target.value})}
                      placeholder="今天的心情如何？"
                      className="w-full border border-rose-200 rounded-lg px-3 py-2 bg-white/80 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">内容</label>
                    <textarea
                      value={newEntry.content}
                      onChange={(e) => setNewEntry({...newEntry, content: e.target.value})}
                      placeholder="写下你的感受和想法..."
                      rows={6}
                      className="w-full border border-rose-200 rounded-lg px-3 py-2 bg-white/80 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-300 resize-none"
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">情感</label>
                      <select
                        value={newEntry.emotion}
                        onChange={(e) => setNewEntry({...newEntry, emotion: e.target.value as DiaryEntry['emotion']})}
                        className="w-full border border-rose-200 rounded-lg px-3 py-2 bg-white/80 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-300"
                      >
                        {Object.entries(emotionLabels).map(([key, label]) => (
                          <option key={key} value={key}>{label}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        心情评分: {newEntry.mood}/5
                      </label>
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map(star => (
                          <button
                            key={star}
                            onClick={() => setNewEntry({...newEntry, mood: star})}
                            className={`p-1 ${star <= newEntry.mood ? 'text-yellow-400' : 'text-gray-300'}`}
                          >
                            <Star className="h-5 w-5 fill-current" />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-end">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={newEntry.isPrivate}
                          onChange={(e) => setNewEntry({...newEntry, isPrivate: e.target.checked})}
                          className="rounded border-rose-300 text-rose-500 focus:ring-rose-500"
                        />
                        <span className="text-sm text-gray-700">设为私密</span>
                      </label>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => setIsCreating(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all"
                    >
                      取消
                    </button>
                    <button
                      onClick={createEntry}
                      className="px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-lg hover:from-rose-600 hover:to-pink-600 transition-all"
                    >
                      保存日记
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 日记列表 */}
          <div className="max-w-6xl mx-auto">
            {filteredEntries.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>还没有日记记录</p>
                <p className="text-sm">点击上方 + 按钮开始记录你的情感历程</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {filteredEntries.map((entry) => (
                  <div
                    key={entry.id}
                    className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-rose-100 p-6 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group relative overflow-hidden"
                  >
                    {/* 情感渐变背景 */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${emotionColors[entry.emotion]} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                    
                    <div className="relative z-10">
                      {/* 日记头部 */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className={`p-3 rounded-lg bg-gradient-to-r ${emotionColors[entry.emotion]} text-white`}>
                            <span className="text-2xl">{emotionIcons[entry.emotion]}</span>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{entry.title}</h3>
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                              <Calendar className="h-3 w-3" />
                              <span>{entry.date}</span>
                              {entry.isPrivate && <Lock className="h-3 w-3" />}
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-1">
                          <button
                            onClick={() => shareEntry(entry)}
                            className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
                            title="分享"
                          >
                            <Share2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => deleteEntry(entry.id)}
                            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                            title="删除"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      {/* 情感信息 */}
                      <div className="flex items-center justify-between mb-4 text-sm">
                        <span className={`px-3 py-1 rounded-full ${
                          entry.emotion === 'happy' ? 'bg-yellow-100 text-yellow-700' :
                          entry.emotion === 'sad' ? 'bg-blue-100 text-blue-700' :
                          entry.emotion === 'angry' ? 'bg-red-100 text-red-700' :
                          entry.emotion === 'anxious' ? 'bg-purple-100 text-purple-700' :
                          entry.emotion === 'peaceful' ? 'bg-green-100 text-green-700' :
                          'bg-orange-100 text-orange-700'
                        }`}>
                          {emotionLabels[entry.emotion]}
                        </span>
                        <div className="flex items-center space-x-1 text-gray-600">
                          {[1, 2, 3, 4, 5].map(star => (
                            <Star 
                              key={star} 
                              className={`h-3 w-3 ${star <= entry.mood ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                      </div>

                      {/* 日记内容 */}
                      <div className="text-gray-700 mb-4 line-clamp-3">
                        {entry.content}
                      </div>

                      {/* 标签 */}
                      {entry.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {entry.tags.map((tag, index) => (
                            <span key={index} className="px-2 py-1 bg-rose-50 text-rose-700 rounded-full text-xs">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* 页脚 */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-12">
        <div className="container py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-6 h-6 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full flex items-center justify-center">
                <BookOpen className="h-3 w-3 text-white" />
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
  )
}