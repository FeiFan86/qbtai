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
  Filter,
  X
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
    <React.Fragment>
      <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden">
        {/* 头部 */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b bg-gray-50">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">历史记录</h2>
            <p className="text-gray-600 mt-1 text-sm md:text-base">查看和管理您的分析记录</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={clearAll} className="hidden sm:flex">
              <Trash2 className="h-4 w-4 mr-2" />
              清空全部
            </Button>
            <Button variant="ghost" onClick={onClose} className="rounded-full p-2 h-auto">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* 标签页 */}
        <div className="px-4 md:px-6 pt-4 bg-white border-b">
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
            <TabsList className="grid w-full grid-cols-4 h-auto p-1">
              <TabsTrigger value="all" className="flex flex-col items-center gap-1 py-2 text-xs md:text-sm">
                <Filter className="h-4 w-4" />
                全部 
                <span className="font-medium">({history.length})</span>
              </TabsTrigger>
              <TabsTrigger value="emotion" className="flex flex-col items-center gap-1 py-2 text-xs md:text-sm">
                <Heart className="h-4 w-4" />
                情感分析 
                <span className="font-medium">({storageManager.getRecordsByType('emotion').length})</span>
              </TabsTrigger>
              <TabsTrigger value="social" className="flex flex-col items-center gap-1 py-2 text-xs md:text-sm">
                <MessageCircle className="h-4 w-4" />
                社交助手 
                <span className="font-medium">({storageManager.getRecordsByType('social').length})</span>
              </TabsTrigger>
              <TabsTrigger value="content" className="flex flex-col items-center gap-1 py-2 text-xs md:text-sm">
                <PenTool className="h-4 w-4" />
                内容创作 
                <span className="font-medium">({storageManager.getRecordsByType('content').length})</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* 内容区域 */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          {filteredHistory.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg">
              <Calendar className="h-16 w-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">暂无记录</h3>
              <p className="text-gray-500">您还没有任何分析记录</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-end sm:hidden mb-2">
                <Button 
                  variant="outline" 
                  onClick={clearAll} 
                  size="sm"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  清空全部
                </Button>
              </div>
            <div className="space-y-4">
              {filteredHistory.map((record) => (
                <Card key={record.id} className="hover:shadow-md transition-shadow bg-white overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-gray-50">
                          {getTypeIcon(record.type)}
                        </div>
                        <div>
                          <CardTitle className="text-base">
                            {record.title || getTypeLabel(record.type)}
                          </CardTitle>
                          <CardDescription className="flex flex-wrap items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">{getTypeLabel(record.type)}</Badge>
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
                            className="hidden sm:flex"
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            查看
                          </Button>
                        )}
                        {onSelectRecord && (
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => onSelectRecord(record)}
                            className="sm:hidden"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        )}
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => deleteRecord(record.id)}
                          className="hidden sm:flex"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          删除
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => deleteRecord(record.id)}
                          className="sm:hidden"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-gray-600">
                      {truncateText(record.input)}
                    </p>
                    {record.result && (
                      <div className="mt-2 p-3 bg-gray-50 rounded-md text-xs overflow-auto max-h-20">
                        <strong>分析结果:</strong> 
                        <div className="mt-1 text-gray-600">
                          {typeof record.result === 'object' && record.result.overall?.sentiment ? (
                            <span>整体情感倾向: {record.result.overall.sentiment === 'positive' ? '积极' : 
                                        record.result.overall.sentiment === 'negative' ? '消极' : '中性'}</span>
                          ) : (
                            truncateText(JSON.stringify(record.result), 100)
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  )
}