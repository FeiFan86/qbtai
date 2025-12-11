'use client'

import React, { useState, useRef } from 'react'
import { GameLayout } from '@/components/game/GameLayout'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Heart, 
  Lock, 
  Send, 
  Trash2, 
  Calendar,
  Eye,
  EyeOff,
  Download
} from 'lucide-react'
import { useGameStore } from '@/lib/game-engine'
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'

interface EmotionalEntry {
  id: string
  content: string
  timestamp: Date
  isPrivate: boolean
  mood: 'happy' | 'sad' | 'angry' | 'anxious' | 'peaceful'
}

export default function EmotionalTreeholePage() {
  const [currentEntry, setCurrentEntry] = useState('')
  const [entries, setEntries] = useState<EmotionalEntry[]>([])
  const [isPrivate, setIsPrivate] = useState(true)
  const [selectedMood, setSelectedMood] = useState<EmotionalEntry['mood']>('peaceful')
  const [viewingEntry, setViewingEntry] = useState<EmotionalEntry | null>(null)
  
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const moods = [
    { value: 'happy' as const, label: '开心', emoji: '😊', color: 'bg-green-100 text-green-800' },
    { value: 'sad' as const, label: '难过', emoji: '😢', color: 'bg-blue-100 text-blue-800' },
    { value: 'angry' as const, label: '生气', emoji: '😠', color: 'bg-red-100 text-red-800' },
    { value: 'anxious' as const, label: '焦虑', emoji: '😰', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'peaceful' as const, label: '平静', emoji: '😌', color: 'bg-purple-100 text-purple-800' }
  ]

  const handleSubmit = () => {
    if (!currentEntry.trim()) return

    const newEntry: EmotionalEntry = {
      id: Date.now().toString(),
      content: currentEntry.trim(),
      timestamp: new Date(),
      isPrivate,
      mood: selectedMood
    }

    setEntries(prev => [newEntry, ...prev])
    setCurrentEntry('')
    setSelectedMood('peaceful')
    
    // 自动保存到本地存储
    localStorage.setItem('emotional-entries', JSON.stringify([newEntry, ...entries]))
  }

  const handleDelete = (id: string) => {
    setEntries(prev => prev.filter(entry => entry.id !== id))
    localStorage.setItem('emotional-entries', JSON.stringify(entries.filter(entry => entry.id !== id)))
  }

  const handleExport = () => {
    const data = JSON.stringify(entries, null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `情感树洞记录_${format(new Date(), 'yyyy-MM-dd')}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const moodConfig = moods.find(m => m.value === selectedMood)

  return (
    <GameLayout
      title="情感树洞"
      description="安全私密的情感分享空间"
      showSettings
      showShare
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左侧 - 输入区域 */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Heart className="h-5 w-5 text-pink-500" />
                <span>写下你的心情</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* 心情选择 */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  当前心情
                </label>
                <div className="flex space-x-2 overflow-x-auto pb-2">
                  {moods.map((mood) => (
                    <button
                      key={mood.value}
                      onClick={() => setSelectedMood(mood.value)}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-full text-sm transition-all ${
                        selectedMood === mood.value
                          ? `${mood.color} shadow-md`
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <span>{mood.emoji}</span>
                      <span>{mood.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 文本输入 */}
              <div>
                <Textarea
                  ref={textareaRef}
                  value={currentEntry}
                  onChange={(e) => setCurrentEntry(e.target.value)}
                  placeholder="在这里写下你的心情、想法或感受..."
                  className="min-h-[200px] resize-none"
                  maxLength={1000}
                />
                <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
                  <span>{currentEntry.length}/1000</span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setIsPrivate(!isPrivate)}
                      className="flex items-center space-x-1 text-sm"
                    >
                      {isPrivate ? <Lock className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      <span>{isPrivate ? '私密' : '公开'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* 提交按钮 */}
              <Button
                onClick={handleSubmit}
                disabled={!currentEntry.trim()}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
              >
                <Send className="h-4 w-4 mr-2" />
                保存记录
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* 右侧 - 历史记录 */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-gray-900">历史记录</h3>
            {entries.length > 0 && (
              <Button variant="outline" size="sm" onClick={handleExport}>
                <Download className="h-4 w-4 mr-1" />
                导出
              </Button>
            )}
          </div>

          {entries.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <Heart className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">还没有任何记录</p>
                <p className="text-sm text-gray-400">写下你的第一段心情吧</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3 max-h-[500px] overflow-y-auto">
              {entries.map((entry) => {
                const mood = moods.find(m => m.value === entry.mood)
                return (
                  <Card key={entry.id} className="relative group">
                    <CardContent className="p-4">
                      {/* 心情标签 */}
                      {mood && (
                        <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs mb-2 ${mood.color}`}>
                          <span>{mood.emoji}</span>
                          <span>{mood.label}</span>
                        </div>
                      )}
                      
                      {/* 内容 */}
                      <p className="text-gray-700 text-sm mb-2 line-clamp-3">
                        {entry.content}
                      </p>
                      
                      {/* 时间和隐私 */}
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>
                          {format(entry.timestamp, 'MM月dd日 HH:mm', { locale: zhCN })}
                        </span>
                        <div className="flex items-center space-x-2">
                          {entry.isPrivate && <Lock className="h-3 w-3" />}
                          <button
                            onClick={() => handleDelete(entry.id)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </GameLayout>
  )
}