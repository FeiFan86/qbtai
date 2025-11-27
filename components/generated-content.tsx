'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Copy, RefreshCw, Download, Share } from 'lucide-react'

interface GeneratedContentProps {
  content: {
    content: string
    suggestions: string[]
  }
  onCopy: (text: string) => void
  onRegenerate: () => void
}

export function GeneratedContent({ content, onCopy, onRegenerate }: GeneratedContentProps) {
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
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-1" />
            下载
          </Button>
          <Button variant="outline" size="sm">
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