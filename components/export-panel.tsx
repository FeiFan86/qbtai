'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Download, Share2, FileText, Image, Zap, CheckCircle, AlertCircle } from 'lucide-react'
import { ExportUtils } from '@/lib/export-utils-enhanced'
import { LoadingSpinner } from './loading-spinner'

interface ExportPanelProps {
  content: string
  title: string
  onExportStart?: () => void
  onExportComplete?: (type: string) => void
  onExportError?: (error: string) => void
}

export function ExportPanel({ 
  content, 
  title, 
  onExportStart, 
  onExportComplete, 
  onExportError 
}: ExportPanelProps) {
  const [exporting, setExporting] = useState<string | null>(null)
  const [lastExport, setLastExport] = useState<{ type: string; timestamp: Date } | null>(null)

  const handleExport = async (type: 'pdf' | 'image' | 'share') => {
    if (!content.trim()) {
      onExportError?.('没有内容可导出')
      return
    }

    setExporting(type)
    onExportStart?.()

    try {
      switch (type) {
        case 'pdf':
          await ExportUtils.exportToPDF(content, title, {
            fontSize: 12,
            lineHeight: 1.6,
            watermark: true
          })
          break
          
        case 'image':
          await ExportUtils.exportToImage(content, title, {
            format: 'png',
            quality: 0.95,
            backgroundColor: '#ffffff'
          })
          break
          
        case 'share':
          await ExportUtils.shareContent(content, title, {
            platforms: ['system']
          })
          break
      }

      setLastExport({ type, timestamp: new Date() })
      onExportComplete?.(type)
      
    } catch (error) {
      console.error(`${type}导出失败:`, error)
      onExportError?.(`${type}导出失败: ${error instanceof Error ? error.message : '未知错误'}`)
    } finally {
      setExporting(null)
    }
  }

  const exportOptions = [
    {
      type: 'pdf' as const,
      icon: FileText,
      label: '导出PDF',
      description: '高质量文档格式，适合打印和存档',
      color: 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'
    },
    {
      type: 'image' as const,
      icon: Image,
      label: '导出图片',
      description: 'PNG格式图片，方便分享和展示',
      color: 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100'
    },
    {
      type: 'share' as const,
      icon: Share2,
      label: '一键分享',
      description: '快速分享到社交媒体或复制链接',
      color: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'
    }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="h-5 w-5 text-blue-500" />
          导出与分享
        </CardTitle>
        <CardDescription>
          将分析结果导出为不同格式或直接分享
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* 导出选项 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exportOptions.map((option) => (
              <Button
                key={option.type}
                variant="outline"
                className={`h-auto p-4 flex flex-col items-center justify-center gap-2 ${option.color}`}
                onClick={() => handleExport(option.type)}
                disabled={exporting !== null}
              >
                {exporting === option.type ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  <option.icon className="h-6 w-6" />
                )}
                <span className="font-medium">{option.label}</span>
                <span className="text-xs opacity-80 text-center">
                  {option.description}
                </span>
              </Button>
            ))}
          </div>

          {/* 批量导出提示 */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <div className="flex items-center gap-2 text-yellow-800">
              <Zap className="h-4 w-4" />
              <span className="text-sm font-medium">批量导出提示</span>
            </div>
            <p className="text-xs text-yellow-700 mt-1">
              如需批量导出多个分析结果，请使用高级导出功能
            </p>
          </div>

          {/* 最近导出记录 */}
          {lastExport && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <div className="flex items-center gap-2 text-green-800">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm font-medium">导出成功</span>
              </div>
              <p className="text-xs text-green-700 mt-1">
                {lastExport.type.toUpperCase()} 格式已导出 (
                {lastExport.timestamp.toLocaleTimeString('zh-CN')})
              </p>
            </div>
          )}

          {/* 导出统计 */}
          <div className="flex items-center justify-between text-xs text-gray-500 border-t pt-3">
            <span>内容长度: {content.length} 字符</span>
            <span>支持格式: PDF, PNG, 分享</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// 批量导出组件
interface BatchExportPanelProps {
  items: Array<{
    id: string
    content: string
    title: string
    type: 'pdf' | 'image'
    selected?: boolean
  }>
  onSelectionChange?: (id: string, selected: boolean) => void
  onExportComplete?: (results: Array<{ id: string; success: boolean }>) => void
}

export function BatchExportPanel({ 
  items, 
  onSelectionChange, 
  onExportComplete 
}: BatchExportPanelProps) {
  const [exporting, setExporting] = useState(false)
  const [progress, setProgress] = useState(0)

  const selectedItems = items.filter(item => item.selected)

  const handleBatchExport = async () => {
    if (selectedItems.length === 0) return

    setExporting(true)
    setProgress(0)

    const results: Array<{ id: string; success: boolean }> = []

    try {
      for (let i = 0; i < selectedItems.length; i++) {
        const item = selectedItems[i]
        
        try {
          if (item.type === 'pdf') {
            await ExportUtils.exportToPDF(item.content, item.title)
          } else {
            await ExportUtils.exportToImage(item.content, item.title)
          }
          results.push({ id: item.id, success: true })
        } catch (error) {
          console.error(`导出失败: ${item.title}`, error)
          results.push({ id: item.id, success: false })
        }

        setProgress(((i + 1) / selectedItems.length) * 100)
        
        // 添加延迟
        if (i < selectedItems.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 500))
        }
      }

      onExportComplete?.(results)
      
    } finally {
      setExporting(false)
      setProgress(0)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>批量导出</CardTitle>
        <CardDescription>
          选择多个分析结果进行批量导出
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* 项目列表 */}
          <div className="max-h-60 overflow-y-auto space-y-2">
            {items.map((item) => (
              <label key={item.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                <input
                  type="checkbox"
                  checked={item.selected || false}
                  onChange={(e) => onSelectionChange?.(item.id, e.target.checked)}
                  className="rounded border-gray-300"
                />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate">{item.title}</div>
                  <div className="text-xs text-gray-500">
                    {item.content.length} 字符 • {item.type.toUpperCase()}
                  </div>
                </div>
              </label>
            ))}
          </div>

          {/* 进度条 */}
          {exporting && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>导出进度</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* 操作按钮 */}
          <div className="flex gap-2">
            <Button
              onClick={handleBatchExport}
              disabled={selectedItems.length === 0 || exporting}
              className="flex-1"
            >
              {exporting ? (
                <>
                  <LoadingSpinner size="sm" />
                  导出中...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  导出选中 ({selectedItems.length})
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}