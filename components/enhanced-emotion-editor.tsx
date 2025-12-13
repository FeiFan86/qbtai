'use client'

import React, { useState, useEffect } from 'react'
import { Sparkles, BookOpen, Zap, Lightbulb, Star, Calendar, Tag, Lock, Send, RotateCw } from 'lucide-react'

interface EmotionEntry {
  id: number
  date: string
  title: string
  emotion: string
  mood: 'positive' | 'neutral' | 'negative'
  content: string
  tags: string[]
  rating: number
}

interface Template {
  id: string
  name: string
  category: 'daily' | 'relationship' | 'work' | 'reflection' | 'gratitude'
  prompt: string
  emotion: string
  tags: string[]
}

interface AIAdvice {
  type: 'suggestion' | 'question' | 'reflection'
  content: string
  relevance: number // 0-1
}

interface EnhancedEmotionEditorProps {
  newDiary: any
  setNewDiary: (diary: any) => void
  handleAddDiary: (onUse: () => Promise<void>) => void
  canUse: boolean
  isLoading: boolean
  onUse: () => Promise<void>
}

const emotionOptions = [
  { value: '快乐', mood: 'positive', emoji: '😊', color: 'text-green-600' },
  { value: '感动', mood: 'positive', emoji: '🥹', color: 'text-green-600' },
  { value: '期待', mood: 'positive', emoji: '🤩', color: 'text-green-600' },
  { value: '安心', mood: 'positive', emoji: '😌', color: 'text-green-600' },
  { value: '复杂', mood: 'neutral', emoji: '🤔', color: 'text-blue-600' },
  { value: '平静', mood: 'neutral', emoji: '😐', color: 'text-blue-600' },
  { value: '困惑', mood: 'neutral', emoji: '😕', color: 'text-blue-600' },
  { value: '低落', mood: 'negative', emoji: '😔', color: 'text-rose-600' },
  { value: '焦虑', mood: 'negative', emoji: '😰', color: 'text-rose-600' },
  { value: '愤怒', mood: 'negative', emoji: '😠', color: 'text-rose-600' },
  { value: '失望', mood: 'negative', emoji: '😞', color: 'text-rose-600' }
]

const templates: Template[] = [
  {
    id: 'daily-reflection',
    name: '今日反思',
    category: 'daily',
    prompt: '今天最让我印象深刻的事情是什么？它给我的感受如何？',
    emotion: '复杂',
    tags: ['反思', '成长', '日常']
  },
  {
    id: 'relationship-gratitude',
    name: '关系感恩',
    category: 'relationship',
    prompt: '今天谁让我感到温暖？我们的互动让我有什么感受？',
    emotion: '感动',
    tags: ['感恩', '关系', '温暖']
  },
  {
    id: 'work-accomplishment',
    name: '工作成就',
    category: 'work',
    prompt: '今天完成了什么有意义的工作？它给我带来了什么成就感？',
    emotion: '快乐',
    tags: ['工作', '成就', '进步']
  },
  {
    id: 'emotional-growth',
    name: '情感成长',
    category: 'reflection',
    prompt: '今天在处理情绪方面有什么进步？学到了什么新的情感管理方法？',
    emotion: '安心',
    tags: ['成长', '学习', '进步']
  },
  {
    id: 'simple-gratitude',
    name: '简单感恩',
    category: 'gratitude',
    prompt: '今天值得感恩的三件小事是什么？它们让我感到什么？',
    emotion: '快乐',
    tags: ['感恩', '幸福', '小事']
  }
]

export function EnhancedEmotionEditor({ newDiary, setNewDiary, handleAddDiary, canUse, isLoading, onUse }: EnhancedEmotionEditorProps) {
  const [formData, setFormData] = useState<Omit<EmotionEntry, 'id'>>({
    date: new Date().toISOString().split('T')[0],
    title: '',
    emotion: '快乐',
    rating: 3,
    mood: 'positive',
    content: '',
    tags: []
  })

  const [currentTag, setCurrentTag] = useState('')
  const [activeTab, setActiveTab] = useState<'write' | 'templates' | 'ai'>('write')
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const [aiAdvice, setAiAdvice] = useState<AIAdvice[]>([])
  const [isGeneratingAdvice, setIsGeneratingAdvice] = useState(false)

  // 同步表单数据与 newDiary
  useEffect(() => {
    if (newDiary) {
      setFormData({
        date: newDiary.date || new Date().toISOString().split('T')[0],
        title: newDiary.title || '',
        emotion: newDiary.emotion || '快乐',
        rating: newDiary.rating || 3,
        mood: newDiary.mood || 'positive',
        content: newDiary.content || '',
        tags: newDiary.tags || []
      })
    }
  }, [newDiary])

  // 根据情感选择自动设置mood
  useEffect(() => {
    const selectedEmotion = emotionOptions.find(e => e.value === formData.emotion)
    if (selectedEmotion) {
      setFormData(prev => ({ ...prev, mood: selectedEmotion.mood as 'positive' | 'neutral' | 'negative' }))
    }
  }, [formData.emotion])

  const handleSubmit = () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      alert('请填写标题和内容')
      return
    }

    setNewDiary(formData)
    handleAddDiary(onUse)
  }

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }))
      setCurrentTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const applyTemplate = (template: Template) => {
    setFormData(prev => ({
      ...prev,
      title: template.name,
      emotion: template.emotion,
      content: prev.content ? `${prev.content}\n\n${template.prompt}` : template.prompt,
      tags: [...new Set([...prev.tags, ...template.tags])]
    }))
    setSelectedTemplate(template)
    setActiveTab('write')
  }

  const generateAIAdvice = async () => {
    setIsGeneratingAdvice(true)
    
    // 模拟AI建议生成
    setTimeout(() => {
      const advice: AIAdvice[] = [
        {
          type: 'suggestion',
          content: '尝试从多个角度描述这个情感体验，包括身体感受、心理状态和具体情境。',
          relevance: 0.8
        },
        {
          type: 'question',
          content: '这个情感体验背后可能有什么深层需求或价值观？',
          relevance: 0.6
        },
        {
          type: 'reflection',
          content: '类似的情绪在过去出现过吗？当时是如何处理的？',
          relevance: 0.7
        }
      ]
      
      setAiAdvice(advice)
      setIsGeneratingAdvice(false)
    }, 1500)
  }

  const applyAdvice = (advice: AIAdvice) => {
    setFormData(prev => ({
      ...prev,
      content: prev.content ? `${prev.content}\n\n💡 ${advice.content}` : advice.content
    }))
  }

  const popularTags = ['反思', '成长', '感恩', '关系', '工作', '日常', '挑战', '成就', '学习', '幸福']

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {/* 编辑器头部 */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <BookOpen className="h-6 w-6 text-rose-500" />
          <h2 className="text-xl font-semibold text-gray-900">
            写情感日记
          </h2>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Calendar className="h-4 w-4" />
          <span>{formData.date}</span>
        </div>
      </div>

      {/* 导航标签 */}
      <div className="flex space-x-2 mb-6">
        <button
          onClick={() => setActiveTab('write')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'write' 
              ? 'bg-rose-500 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <BookOpen className="h-4 w-4" />
          <span>写作</span>
        </button>
        
        <button
          onClick={() => setActiveTab('templates')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'templates' 
              ? 'bg-rose-500 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Sparkles className="h-4 w-4" />
          <span>模板</span>
        </button>
        
        <button
          onClick={() => {
            setActiveTab('ai')
            generateAIAdvice()
          }}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'ai' 
              ? 'bg-rose-500 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Zap className="h-4 w-4" />
          <span>AI辅助</span>
        </button>
      </div>

      {/* 写作界面 */}
      {activeTab === 'write' && (
        <div className="space-y-6">
          {/* 基础信息 */}
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">标题</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="给今天的日记起个标题..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">情感</label>
              <select
                value={formData.emotion}
                onChange={(e) => setFormData({...formData, emotion: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500"
              >
                {emotionOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.emoji} {option.value}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                强度: {formData.rating}/5
              </label>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    onClick={() => setFormData({...formData, rating: star})}
                    className={`p-1 ${star <= formData.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                  >
                    <Star className="h-5 w-5 fill-current" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 内容编辑器 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">内容</label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              placeholder="写下你的感受和想法...（支持Markdown格式）"
              rows={8}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500 resize-none font-mono text-sm"
            />
          </div>

          {/* 标签管理 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">标签</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {formData.tags.map(tag => (
                <span key={tag} className="flex items-center space-x-1 px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-sm">
                  <span>#{tag}</span>
                  <button 
                    onClick={() => removeTag(tag)}
                    className="text-rose-500 hover:text-rose-700"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            
            <div className="flex space-x-2">
              <input
                type="text"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                placeholder="添加标签..."
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500"
                onKeyPress={(e) => e.key === 'Enter' && addTag()}
              />
              <button
                onClick={addTag}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                添加
              </button>
            </div>
            
            <div className="mt-2 flex flex-wrap gap-1">
              {popularTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => !formData.tags.includes(tag) && setCurrentTag(tag)}
                  className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs hover:bg-gray-200 transition-colors"
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>


        </div>
      )}

      {/* 模板界面 */}
      {activeTab === 'templates' && (
        <div className="space-y-4">
          <div className="text-center py-4">
            <Sparkles className="h-8 w-8 text-rose-500 mx-auto mb-2" />
            <h3 className="text-lg font-semibold text-gray-900">选择日记模板</h3>
            <p className="text-sm text-gray-600">选择适合你当前心情的模板开始写作</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            {templates.map(template => (
              <button
                key={template.id}
                onClick={() => applyTemplate(template)}
                className="text-left p-4 border border-gray-200 rounded-lg hover:border-rose-300 hover:bg-rose-50 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">{template.name}</span>
                  <span className="text-sm text-gray-500 capitalize">{template.category}</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{template.prompt}</p>
                <div className="flex items-center space-x-2">
                  <span className={`text-sm ${emotionOptions.find(e => e.value === template.emotion)?.color}`}>
                    {template.emotion}
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {template.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* AI辅助界面 */}
      {activeTab === 'ai' && (
        <div className="space-y-4">
          <div className="text-center py-4">
            <Zap className="h-8 w-8 text-amber-500 mx-auto mb-2" />
            <h3 className="text-lg font-semibold text-gray-900">AI写作助手</h3>
            <p className="text-sm text-gray-600">根据你的内容提供个性化的写作建议</p>
          </div>
          
          {isGeneratingAdvice ? (
            <div className="text-center py-8">
              <RotateCw className="h-8 w-8 text-amber-500 mx-auto mb-2 animate-spin" />
              <p className="text-sm text-gray-600">AI正在思考建议...</p>
            </div>
          ) : (
            <div className="space-y-3">
              {aiAdvice.map((advice, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Lightbulb className="h-4 w-4 text-amber-500" />
                      <span className="text-sm font-medium text-gray-700 capitalize">
                        {advice.type === 'suggestion' ? '写作建议' : 
                         advice.type === 'question' ? '思考问题' : '反思提示'}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">
                      相关度: {(advice.relevance * 100).toFixed(0)}%
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{advice.content}</p>
                  <button
                    onClick={() => applyAdvice(advice)}
                    className="text-xs text-rose-500 hover:text-rose-700 transition-colors"
                  >
                    应用到内容
                  </button>
                </div>
              ))}
              
              {aiAdvice.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Lightbulb className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>开始写作后，AI会根据内容提供个性化建议</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* 操作按钮 */}
      <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
        <button
          onClick={() => {}}
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          取消
        </button>
        <button
          onClick={handleSubmit}
          disabled={!formData.title.trim() || !formData.content.trim()}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-lg hover:from-rose-600 hover:to-pink-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="h-4 w-4" />
          <span>保存日记</span>
        </button>
      </div>

      {/* 模板应用提示 */}
      {selectedTemplate && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm text-green-700">
              已应用模板「{selectedTemplate.name}」
            </span>
            <button
              onClick={() => setSelectedTemplate(null)}
              className="text-green-500 hover:text-green-700"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  )
}