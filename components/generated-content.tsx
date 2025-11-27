'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from '@/components/ui/badge'
import { Copy, RefreshCw, Download, Share } from 'lucide-react'

interface GeneratedContentProps {
  content: {
    content: string
    suggestions: string[]
  }
  onCopy: (text: string) => void
  onRegenerate: () => void
  onDownload?: (text: string) => void
  onShare?: (text: string) => void
}

export function GeneratedContent({ content, onCopy, onRegenerate, onDownload, onShare }: GeneratedContentProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>生成结果</CardTitle>
        <CardDescription>
          AI根据您的需求生成的内容
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="whitespace-pre-wrap text-sm">{content.content}</p>
        </div>
        
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" size="sm" onClick={() => onCopy(content.content)}>
            <Copy className="h-4 w-4 mr-1" />
            复制
          </Button>
          <Button variant="outline" size="sm" onClick={onRegenerate}>
            <RefreshCw className="h-4 w-4 mr-1" />
            重新生成
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => {
              if (onDownload) {
                onDownload(content.content)
              } else {
                // 默认下载功能
                const blob = new Blob([content.content], { type: 'text/plain;charset=utf-8' })
                const url = URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                a.download = 'generated-content.txt'
                document.body.appendChild(a)
                a.click()
                document.body.removeChild(a)
                URL.revokeObjectURL(url)
              }
            }}
          >
            <Download className="h-4 w-4 mr-1" />
            下载
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => {
              if (onShare) {
                onShare(content.content)
              } else {
                // 默认分享功能
                if (navigator.share) {
                  navigator.share({
                    title: 'AI生成的内容',
                    text: content.content,
                  }).catch(console.error)
                } else {
                  // 如果不支持Web Share API，则复制到剪贴板
                  navigator.clipboard.writeText(content.content).then(() => {
                    alert('内容已复制到剪贴板，可以手动分享')
                  })
                }
              }
            }}
          >
            <Share className="h-4 w-4 mr-1" />
            分享
          </Button>
        </div>
        
        {content.suggestions.length > 0 && (
          <div className="pt-2 border-t">
            <h4 className="text-sm font-medium mb-2">改进建议</h4>
            <div className="space-y-2">
              {content.suggestions.map((suggestion, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5"></div>
                  <p className="text-xs text-gray-600">{suggestion}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}