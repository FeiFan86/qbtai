'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Heart, 
  MessageCircle, 
  PenTool, 
  Clock, 
  Trash2, 
  Eye,
  Calendar,
  Filter
} from 'lucide-react'
import { storageManager, type HistoryRecord } from '@/lib/storage'

interface HistoryViewerProps {
  isOpen: boolean
  onClose: () => void
  onSelectRecord?: (record: HistoryRecord) => void
}

export function HistoryViewer({ isOpen, onClose, onSelectRecord }: HistoryViewerProps) {
  const [history, setHistory] = useState<HistoryRecord[]>([])
  const [activeTab, setActiveTab] = useState<'all' | 'emotion' | 'social' | 'content'>('all')

  useEffect(() => {
    if (isOpen) {
      loadHistory()
    }
  }, [isOpen])

  const loadHistory = () => {
    const records = storageManager.getHistory()
    setHistory(records)
  }

  const deleteRecord = (id: string) => {
    storageManager.deleteRecord(id)
    loadHistory()
  }

  const clearAll = () => {
    if (confirm('确定要清空所有历史记录吗？此操作不可恢复。')) {
      storageManager.clearHistory()
      loadHistory()
    }
  }

  const getTypeIcon = (type: HistoryRecord['type']) => {
    switch (type) {
      case 'emotion': return <Heart className="h-4 w-4 text-pink-500" />
      case 'social': return <MessageCircle className="h-4 w-4 text-blue-500" />
      case 'content': return <PenTool className="h-4 w-4 text-purple-500" />
      default: return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getTypeLabel = (type: HistoryRecord['type']) => {
    switch (type) {
      case 'emotion': return '情感分析'
      case 'social': return '社交助手'
      case 'content': return '内容创作'
      default: return '未知'
    }
  }

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now.getTime() - timestamp
    
    if (diff < 60 * 1000) return '刚刚'
    if (diff < 60 * 60 * 1000) return `${Math.floor(diff / (60 * 1000))}分钟前`
    if (diff < 24 * 60 * 60 * 1000) return `${Math.floor(diff / (60 * 60 * 1000))}小时前`
    
    return date.toLocaleDateString('zh-CN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const truncateText = (text: string, maxLength: number = 80) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }

  const filteredHistory = history.filter(record => 
    activeTab === 'all' || record.type === activeTab
  )

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[80vh] flex flex-col">
        {/* 头部 */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">历史记录</h2>
            <p className="text-gray-600 mt-1">查看和管理您的分析记录</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={clearAll}>
              <Trash2 className="h-4 w-4 mr-2" />
              清空全部
            </Button>
            <Button variant="outline" onClick={onClose}>
              关闭
            </Button>
          </div>
        </div>

        {/* 标签页 */}
        <div className="px-6 pt-4">
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                全部 ({history.length})
              </TabsTrigger>
              <TabsTrigger value="emotion" className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                情感分析 ({storageManager.getRecordsByType('emotion').length})
              </TabsTrigger>
              <TabsTrigger value="social" className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                社交助手 ({storageManager.getRecordsByType('social').length})
              </TabsTrigger>
              <TabsTrigger value="content" className="flex items-center gap-2">
                <PenTool className="h-4 w-4" />
                内容创作 ({storageManager.getRecordsByType('content').length})
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* 内容区域 */}
        <div className="flex-1 overflow-y-auto p-6">
          {filteredHistory.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="h-16 w-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">暂无记录</h3>
              <p className="text-gray-500">您还没有任何分析记录</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredHistory.map((record) => (
                <Card key={record.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getTypeIcon(record.type)}
                        <div>
                          <CardTitle className="text-base">
                            {record.title || getTypeLabel(record.type)}
                          </CardTitle>
                          <CardDescription className="flex items-center gap-2">
                            <Badge variant="outline">{getTypeLabel(record.type)}</Badge>
                            <span className="flex items-center gap-1 text-xs">
                              <Clock className="h-3 w-3" />
                              {formatTime(record.timestamp)}
                            </span>
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {onSelectRecord && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => onSelectRecord(record)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            查看
                          </Button>
                        )}
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => deleteRecord(record.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      {truncateText(record.input)}
                    </p>
                    {record.result && (
                      <div className="mt-2 p-2 bg-gray-50 rounded text-xs">
                        <strong>分析结果:</strong> {truncateText(JSON.stringify(record.result), 100)}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}