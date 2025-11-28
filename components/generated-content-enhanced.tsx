'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from '@/components/ui/badge'
import { Copy, RefreshCw, Download, Share, CheckCircle, AlertCircle } from 'lucide-react'
import { LoadingSkeleton, CardSkeleton } from './loading-skeleton'
import { LoadingSpinner } from './loading-spinner'
import { exportToPDF, exportToImage, shareContent } from '@/lib/export-utils'

interface GeneratedContentProps {
  content?: {
    content: string
    suggestions: string[]
  }
  onCopy: (text: string) => void
  onRegenerate: () => void
  loading?: boolean
  error?: string
  title?: string
}

export function GeneratedContentEnhanced({ 
  content, 
  onCopy, 
  onRegenerate, 
  loading = false, 
  error,
  title = "生成结果"
}: GeneratedContentProps) {
  const [copySuccess, setCopySuccess] = useState(false)
  const [exporting, setExporting] = useState(false)

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
      onCopy(text)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const handleExportPDF = async () => {
    if (!content) return
    setExporting(true)
    try {
      await exportToPDF(content.content, title)
    } catch (err) {
      console.error('PDF export failed: ', err)
    } finally {
      setExporting(false)
    }
  }

  const handleExportImage = async () => {
    if (!content) return
    setExporting(true)
    try {
      await exportToImage(content.content, title)
    } catch (err) {
      console.error('Image export failed: ', err)
    } finally {
      setExporting(false)
    }
  }

  const handleShare = async () => {
    if (!content) return
    try {
      await shareContent(content.content, title)
    } catch (err) {
      console.error('Share failed: ', err)
    }
  }

  if (loading) {
    return (
      <CardSkeleton />
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600">
            <AlertCircle className="h-5 w-5" />
            生成失败
          </CardTitle>
          <CardDescription className="text-red-500">
            {error}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={onRegenerate} variant="outline" className="w-full">
            <RefreshCw className="h-4 w-4 mr-2" />
            重新生成
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (!content) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-8 text-center">
          <AlertCircle className="h-12 w-12 text-gray-300 mb-4" />
          <p className="text-gray-500">暂无生成内容</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          AI根据您的需求生成的内容
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="whitespace-pre-wrap text-sm">{content.content}</p>
        </div>
        
        <div className="flex gap-2 flex-wrap">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleCopy(content.content)}
            className={copySuccess ? "bg-green-50 border-green-200 text-green-700" : ""}
          >
            {copySuccess ? (
              <>
                <CheckCircle className="h-4 w-4 mr-1" />
                已复制
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-1" />
                复制
              </>
            )}
          </Button>
          
          <Button variant="outline" size="sm" onClick={onRegenerate}>
            <RefreshCw className="h-4 w-4 mr-1" />
            重新生成
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleExportPDF}
            disabled={exporting}
          >
            {exporting ? (
              <LoadingSpinner size="sm" />
            ) : (
              <>
                <Download className="h-4 w-4 mr-1" />
                PDF
              </>
            )}
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleExportImage}
            disabled={exporting}
          >
            {exporting ? (
              <LoadingSpinner size="sm" />
            ) : (
              <>
                <Download className="h-4 w-4 mr-1" />
                图片
              </>
            )}
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleShare}
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

import { useState } from 'react'