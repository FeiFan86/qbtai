'use client'

import React, { useState } from 'react'
import { MessageCircle, Calendar, Heart, Plus } from 'lucide-react'
import GlobalNavbar from '@/components/global-navbar'
import UsageGuard, { UsageStatus } from '@/components/usage-guard'

export default function EmotionDiaryPage() {
  const [diaries, setDiaries] = useState([
    {
      id: 1,
      date: '2024-12-04',
      title: '温馨的周末',
      emotion: '快乐',
      content: '今天和他一起去了公园，阳光很好，我们聊了很多关于未来的事情。感觉彼此更加了解对方了。',
      mood: 'positive'
    },
    {
      id: 2,
      date: '2024-12-02',
      title: '小矛盾',
      emotion: '复杂',
      content: '因为一些小事有了分歧，但晚上好好沟通后，感觉关系更加牢固了。',
      mood: 'neutral'
    }
  ])

  const [newDiary, setNewDiary] = useState({
    title: '',
    content: '',
    emotion: '快乐'
  })

  const handleAddDiary = async (onRecordUsage: () => Promise<void>) => {
    if (!newDiary.title.trim() || !newDiary.content.trim()) return
    
    // 记录使用次数
    await onRecordUsage()
    
    const diary = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      title: newDiary.title,
      emotion: newDiary.emotion,
      content: newDiary.content,
      mood: 'positive'
    }
    
    setDiaries([diary, ...diaries])
    setNewDiary({ title: '', content: '', emotion: '快乐' })
  }

  return (
    <UsageGuard feature="emotion-diary">
      {({ canUse, remainingUses, onUse, isLoading, usageText }) => (
        <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
          {/* 导航栏 */}
          <GlobalNavbar />

          {/* 主要内容 */}
          <main className="pt-16">
            <div className="container py-12">
              {/* 页面标题 */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 mb-4">
                  <MessageCircle className="h-5 w-5 text-rose-500 mr-2" />
                  <span className="text-sm font-medium text-gray-700">情感日记</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  记录情感历程
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  记录每一天的情感变化，追踪成长的足迹
                </p>
              </div>

              {/* 使用状态提示 */}
              <div className="max-w-4xl mx-auto mb-6">
                <UsageStatus feature="emotion-diary" className="justify-center" />
              </div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
            {/* 新建日记 */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">新建日记</h2>
                
                {/* 标题 */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    标题
                  </label>
                  <input
                    type="text"
                    value={newDiary.title}
                    onChange={(e) => setNewDiary({...newDiary, title: e.target.value})}
                    placeholder="给今天起个标题..."
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                </div>

                {/* 情感 */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    今日情感
                  </label>
                  <select
                    value={newDiary.emotion}
                    onChange={(e) => setNewDiary({...newDiary, emotion: e.target.value})}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  >
                    <option value="快乐">快乐</option>
                    <option value="感动">感动</option>
                    <option value="期待">期待</option>
                    <option value="安心">安心</option>
                    <option value="复杂">复杂</option>
                    <option value="低落">低落</option>
                  </select>
                </div>

                {/* 内容 */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    内容
                  </label>
                  <textarea
                    value={newDiary.content}
                    onChange={(e) => setNewDiary({...newDiary, content: e.target.value})}
                    placeholder="记录今天的感受和想法..."
                    className="w-full h-32 p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                </div>

                <button
                  onClick={() => handleAddDiary(onUse)}
                  disabled={!newDiary.title.trim() || !newDiary.content.trim() || !canUse}
                  className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3 rounded-lg font-medium hover:from-rose-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  {isLoading ? '保存中...' : '保存日记'}
                </button>
                {!canUse && (
                  <p className="text-sm text-amber-600 mt-2 text-center">
                    使用次数已用完，请登录或等待重置
                  </p>
                )}
              </div>
            </div>

            {/* 日记列表 */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">我的日记</h2>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Calendar className="h-4 w-4 mr-1" />
                    共 {diaries.length} 篇
                  </div>
                </div>

                <div className="space-y-4">
                  {diaries.map((diary) => (
                    <div key={diary.id} className="border-b border-gray-100 pb-4 last:border-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{diary.title}</h3>
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <Calendar className="h-3 w-3" />
                            <span>{diary.date}</span>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              diary.mood === 'positive' ? 'bg-green-100 text-green-700' :
                              diary.mood === 'negative' ? 'bg-red-100 text-red-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {diary.emotion}
                            </span>
                          </div>
                        </div>
                        <Heart className="h-5 w-5 text-rose-400" />
                      </div>
                      <p className="text-gray-600 leading-relaxed">
                        {diary.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 情感统计 */}
          <div className="max-w-4xl mx-auto mt-12">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">情感统计</h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-600 mb-1">12</div>
                  <div className="text-sm text-gray-500">快乐时刻</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600 mb-1">8</div>
                  <div className="text-sm text-gray-500">感动瞬间</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600 mb-1">5</div>
                  <div className="text-sm text-gray-500">期待未来</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-rose-600 mb-1">30</div>
                  <div className="text-sm text-gray-500">总日记数</div>
                </div>
              </div>
            </div>
          </div>
            </div>
          </main>

          {/* 页脚 */}
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