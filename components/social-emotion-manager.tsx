'use client'

import React, { useState, useEffect } from 'react'
import { format, isSameDay } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import { 
  Users, Heart, Share2, Lock, Unlock, Calendar, 
  Plus, MessageCircle, Star, Edit, Trash2, Filter, Search,
  User, UserCheck, Users as Family, BookOpen, Mail
} from 'lucide-react'

interface Diary {
  id: number
  date: string
  title: string
  emotion: string
  mood: 'positive' | 'neutral' | 'negative'
  content: string
  tags: string[]
  rating: number
}

interface SocialEmotionManagerProps {
  diaries: Diary[]
  setDiaries: React.Dispatch<React.SetStateAction<Diary[]>>
}

const relationshipConfig = {
  partner: {
    label: '情侣',
    icon: Heart,
    color: 'from-rose-500 to-pink-500',
    bgColor: 'bg-rose-50',
    textColor: 'text-rose-700',
    borderColor: 'border-rose-200'
  },
  friend: {
    label: '朋友',
    icon: UserCheck,
    color: 'from-blue-500 to-indigo-500',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-700',
    borderColor: 'border-blue-200'
  },
  family: {
    label: '家人',
    icon: Family,
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-50',
    textColor: 'text-green-700',
    borderColor: 'border-green-200'
  },
  colleague: {
    label: '同事',
    icon: Users,
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-700',
    borderColor: 'border-purple-200'
  },
  other: {
    label: '其他',
    icon: User,
    color: 'from-gray-500 to-gray-600',
    bgColor: 'bg-gray-50',
    textColor: 'text-gray-700',
    borderColor: 'border-gray-200'
  }
}

const moodColors = {
  positive: 'bg-green-100 text-green-700',
  neutral: 'bg-blue-100 text-blue-700',
  negative: 'bg-rose-100 text-rose-700'
}

export function SocialEmotionManager({ 
  diaries: entries, 
  setDiaries 
}: SocialEmotionManagerProps) {
  const [activeRelationship, setActiveRelationship] = useState<SocialEmotionEntry['relationship'] | 'all'>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [showPrivate, setShowPrivate] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [sharingId, setSharingId] = useState<string | null>(null)
  
  const [newEntry, setNewEntry] = useState<Omit<SocialEmotionEntry, 'id'>>({
    date: new Date().toISOString().split('T')[0],
    relationship: 'partner',
    withPerson: '',
    emotion: '快乐',
    intensity: 3,
    mood: 'positive',
    content: '',
    tags: [],
    isPrivate: false
  })

  const [shareData, setShareData] = useState({
    shareWith: '',
    message: ''
  })

  // 过滤条目
  const filteredEntries = entries.filter(entry => {
    const matchesRelationship = activeRelationship === 'all' || entry.relationship === activeRelationship
    const matchesSearch = searchTerm === '' || 
      entry.withPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesPrivacy = showPrivate || !entry.isPrivate
    
    return matchesRelationship && matchesSearch && matchesPrivacy
  })

  // 关系统计
  const relationshipStats = Object.entries(relationshipConfig).reduce((acc, [key]) => {
    const relationship = key as SocialEmotionEntry['relationship']
    acc[relationship] = entries.filter(e => e.relationship === relationship).length
    return acc
  }, {} as Record<SocialEmotionEntry['relationship'], number>)

  const totalEntries = entries.length

  const handleAddEntry = () => {
    if (!newEntry.withPerson.trim() || !newEntry.content.trim()) {
      alert('请填写对方姓名和内容')
      return
    }

    onAddEntry(newEntry)
    setNewEntry({
      date: new Date().toISOString().split('T')[0],
      relationship: 'partner',
      withPerson: '',
      emotion: '快乐',
      intensity: 3,
      mood: 'positive',
      content: '',
      tags: [],
      isPrivate: false
    })
    setIsAdding(false)
  }

  const handleShare = () => {
    if (!sharingId || !shareData.shareWith.trim()) return
    
    onShareEntry(sharingId, [shareData.shareWith])
    setSharingId(null)
    setShareData({ shareWith: '', message: '' })
  }

  const getRecentPartners = () => {
    const partners = new Set(entries.map(e => e.withPerson))
    return Array.from(partners).slice(0, 5)
  }

  const getPopularTags = () => {
    const tagCounts: Record<string, number> = {}
    entries.forEach(entry => {
      entry.tags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1
      })
    })
    
    return Object.entries(tagCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 8)
      .map(([tag]) => tag)
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {/* 头部 */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Users className="h-6 w-6 text-rose-500" />
          <h2 className="text-xl font-semibold text-gray-900">社交情感管理</h2>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Calendar className="h-4 w-4" />
          <span>共 {totalEntries} 条社交情感记录</span>
        </div>
      </div>

      {/* 关系类型导航 */}
      <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveRelationship('all')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
            activeRelationship === 'all'
              ? 'bg-rose-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <BookOpen className="h-4 w-4" />
          <span>全部 ({totalEntries})</span>
        </button>
        
        {Object.entries(relationshipConfig).map(([key, config]) => {
          const Icon = config.icon
          return (
            <button
              key={key}
              onClick={() => setActiveRelationship(key as SocialEmotionEntry['relationship'])}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                activeRelationship === key
                  ? `${config.bgColor} ${config.textColor} border ${config.borderColor}`
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{config.label} ({relationshipStats[key as SocialEmotionEntry['relationship']]})</span>
            </button>
          )
        })}
      </div>

      {/* 搜索和筛选 */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="搜索对方姓名、内容或标签..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowPrivate(!showPrivate)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-colors ${
              showPrivate 
                ? 'bg-rose-100 border-rose-300 text-rose-700' 
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            {showPrivate ? <Unlock className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
            <span className="text-sm">{showPrivate ? '显示私密' : '隐藏私密'}</span>
          </button>
          
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center space-x-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:from-rose-600 hover:to-pink-600 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>新增记录</span>
          </button>
        </div>
      </div>

      {/* 新增记录表单 */}
      {isAdding && (
        <div className="bg-gray-50 rounded-lg p-6 mb-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">新增社交情感记录</h3>
          
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">关系类型</label>
              <select
                value={newEntry.relationship}
                onChange={(e) => setNewEntry({...newEntry, relationship: e.target.value as SocialEmotionEntry['relationship']})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500"
              >
                {Object.entries(relationshipConfig).map(([key, config]) => (
                  <option key={key} value={key}>{config.label}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">对方姓名</label>
              <input
                type="text"
                value={newEntry.withPerson}
                onChange={(e) => setNewEntry({...newEntry, withPerson: e.target.value})}
                placeholder="输入对方的姓名或昵称..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500"
                list="recent-partners"
              />
              <datalist id="recent-partners">
                {getRecentPartners().map(partner => (
                  <option key={partner} value={partner} />
                ))}
              </datalist>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">情感</label>
              <select
                value={newEntry.emotion}
                onChange={(e) => setNewEntry({...newEntry, emotion: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500"
              >
                <option value="快乐">快乐</option>
                <option value="感动">感动</option>
                <option value="期待">期待</option>
                <option value="安心">安心</option>
                <option value="复杂">复杂</option>
                <option value="低落">低落</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                情感强度: {newEntry.intensity}/5
              </label>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    onClick={() => setNewEntry({...newEntry, intensity: star})}
                    className={`p-1 ${star <= newEntry.intensity ? 'text-yellow-400' : 'text-gray-300'}`}
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
                  className="rounded border-gray-300 text-rose-500 focus:ring-rose-500"
                />
                <span className="text-sm text-gray-700">设为私密</span>
              </label>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">内容</label>
            <textarea
              value={newEntry.content}
              onChange={(e) => setNewEntry({...newEntry, content: e.target.value})}
              placeholder="记录你们的互动和感受..."
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500 resize-none"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              取消
            </button>
            <button
              onClick={handleAddEntry}
              className="px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-lg hover:from-rose-600 hover:to-pink-600 transition-colors"
            >
              保存记录
            </button>
          </div>
        </div>
      )}

      {/* 记录列表 */}
      <div className="space-y-4">
        {filteredEntries.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <MessageCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>没有找到匹配的记录</p>
            <p className="text-sm">尝试调整搜索条件或创建新记录</p>
          </div>
        ) : (
          filteredEntries.map(entry => {
            const config = relationshipConfig[entry.relationship]
            const Icon = config.icon
            
            return (
              <div key={entry.id} className="border border-gray-200 rounded-lg p-4 hover:border-rose-200 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${config.bgColor}`}>
                      <Icon className={`h-5 w-5 ${config.textColor}`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{entry.withPerson}</h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <span>{config.label}</span>
                        <span>•</span>
                        <Calendar className="h-3 w-3" />
                        <span>{format(new Date(entry.date), 'yyyy年MM月dd日', { locale: zhCN })}</span>
                        {entry.isPrivate && <Lock className="h-3 w-3" />}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setSharingId(entry.id)}
                      className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
                      title="分享"
                    >
                      <Share2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setEditingId(entry.id)}
                      className="p-2 text-gray-400 hover:text-amber-500 transition-colors"
                      title="编辑"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onDeleteEntry(entry.id)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      title="删除"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${moodColors[entry.mood]}`}>
                    {entry.emotion}
                  </span>
                  <div className="flex items-center space-x-1 text-gray-600">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star 
                        key={star} 
                        className={`h-3 w-3 ${star <= entry.intensity ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                </div>
                
                <p className="text-gray-700 mb-3 leading-relaxed">{entry.content}</p>
                
                {entry.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {entry.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-rose-50 text-rose-700 rounded-full text-xs">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )
          })
        )}
      </div>

      {/* 分享模态框 */}
      {sharingId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">分享情感记录</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">分享给</label>
                <input
                  type="text"
                  value={shareData.shareWith}
                  onChange={(e) => setShareData({...shareData, shareWith: e.target.value})}
                  placeholder="输入对方的用户名或邮箱..."
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">附加消息（可选）</label>
                <textarea
                  value={shareData.message}
                  onChange={(e) => setShareData({...shareData, message: e.target.value})}
                  placeholder="添加一些想说的话..."
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500 resize-none"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setSharingId(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleShare}
                className="px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-lg hover:from-rose-600 hover:to-pink-600 transition-colors"
              >
                发送分享
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}