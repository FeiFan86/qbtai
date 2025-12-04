'use client'

import { useState, useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Heart, Frown, Meh, Smile, Laugh, ChevronDown, ChevronUp, Info, Download } from 'lucide-react'
import { SimpleEmotionAnalysisResult } from '../lib/types'

interface EmotionAnalysisResultProps {
  result: SimpleEmotionAnalysisResult
  compact?: boolean
}

export function EmotionAnalysisResult({ result, compact = false }: EmotionAnalysisResultProps) {
  const [expandedSections, setExpandedSections] = useState({
    emotions: false,
    keywords: false,
    summary: false
  })
  const resultRef = useRef<HTMLDivElement>(null)
  
  const exportToImage = async () => {
    if (!resultRef.current) return
    
    try {
      // 使用html2canvas库将内容转换为图片
      const html2canvas = (await import('html2canvas')).default
      const canvas = await html2canvas(resultRef.current, {
        backgroundColor: '#ffffff',
        scale: 2, // 提高图片质量
        logging: false,
        useCORS: true
      })
      
      // 转换为图片并下载
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = url
          a.download = `情感分析报告_${new Date().toLocaleDateString('zh-CN').replace(/\//g, '-')}.png`
          document.body.appendChild(a)
          a.click()
          document.body.removeChild(a)
          URL.revokeObjectURL(url)
        }
      }, 'image/png')
    } catch (error) {
      console.error('导出图片失败:', error)
      alert('导出图片失败，请重试')
    }
  }

  const getSentimentIcon = (sentiment: string) => {
    const normalizedSentiment = getSentimentText(sentiment)
    switch (normalizedSentiment) {
      case '积极':
        return <Laugh className="h-5 w-5 text-green-500" />
      case '消极':
        return <Frown className="h-5 w-5 text-red-500" />
      default:
        return <Meh className="h-5 w-5 text-gray-500" />
    }
  }

  const getSentimentColor = (sentiment: string) => {
    const normalizedSentiment = getSentimentText(sentiment)
    switch (normalizedSentiment) {
      case '积极':
        return 'bg-green-100 text-green-800 border-green-200'
      case '消极':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getProgressColor = (sentiment: string) => {
    const normalizedSentiment = getSentimentText(sentiment)
    switch (normalizedSentiment) {
      case '积极':
        return 'bg-gradient-to-r from-green-400 to-green-500'
      case '消极':
        return 'bg-gradient-to-r from-red-400 to-red-500'
      default:
        return 'bg-gradient-to-r from-gray-400 to-gray-500'
    }
  }

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  // 处理不同格式的sentiment值
  const getSentimentText = (sentiment: string) => {
    if (sentiment === 'positive' || sentiment === '积极') return '积极'
    if (sentiment === 'negative' || sentiment === '消极') return '消极'
    return '中性'
  }
  
  const sentimentText = getSentimentText(result.overall.sentiment)
  
  // 确保数值正确显示
  const confidence = typeof result.overall.confidence === 'number' 
    ? (result.overall.confidence * 100).toFixed(1) 
    : parseFloat(result.overall.confidence)?.toFixed(1) || '70.0'
  
  // 检查情感数据是否有效
  const hasValidEmotions = result.emotions && Array.isArray(result.emotions) && result.emotions.length > 0
  const emotions = hasValidEmotions ? result.emotions : []
  
  // 检查关键词是否有效
  const hasValidKeywords = result.keywords && Array.isArray(result.keywords) && result.keywords.length > 0
  const keywords = hasValidKeywords ? result.keywords : ['情感', '交流', '沟通']
  
  // 检查摘要是否有效
  const hasValidSummary = result.summary && typeof result.summary === 'string' && result.summary.trim() !== ''
  const summary = hasValidSummary ? result.summary : '基于AI的情感分析结果，为您提供了详细的情感洞察和建议。'
  
  // 获取情感图标
  const getEmotionIconComponent = (emotionType: string) => {
    const iconType = result.emotions?.find(e => e.type === emotionType)?.icon
    if (iconType) {
      switch (iconType) {
        case 'Smile': return <Smile className="h-4 w-4" />
        case 'Frown': return <Frown className="h-4 w-4" />
        case 'Laugh': return <Laugh className="h-4 w-4" />
        case 'Meh': return <Meh className="h-4 w-4" />
        default: return <Heart className="h-4 w-4" />
      }
    }
    return <Heart className="h-4 w-4" />
  }

  return (
    <div ref={resultRef}>
      <Card className="card-hover animate-fade-in-up">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-3">
              <div className="relative">
                <Heart className="h-6 w-6 text-pink-500" />
                <div className="absolute -inset-1 bg-pink-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
              </div>
              <span>情感分析结果</span>
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="flex items-center gap-1">
                <Info className="h-3 w-3" />
                AI分析
              </Badge>
              {!compact && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={exportToImage}
                  className="flex items-center gap-1"
                >
                  <Download className="h-4 w-4" />
                  导出图片
                </Button>
              )}
            </div>
          </div>
          <CardDescription className="text-sm">
            基于您输入内容的深度情感分析
          </CardDescription>
        </CardHeader>
      
      <CardContent className="space-y-6">
        {/* 整体情感倾向 */}
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-4 border border-pink-100">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-gray-700">整体情感倾向</span>
            <div className={`px-3 py-1 rounded-full border text-sm font-medium ${getSentimentColor(result.overall.sentiment)}`}>
              <div className="flex items-center gap-1">
                {getSentimentIcon(result.overall.sentiment)}
                <span>{sentimentText}</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600">分析置信度</span>
              <span className="font-medium text-gray-700">{confidence}%</span>
            </div>
          <div className="relative bg-gray-200 rounded-full h-2">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${getProgressColor(result.overall.sentiment)}`}
              style={{ width: `${confidence}%` }}
            ></div>
          </div>
          </div>
        </div>

        {/* 详细情感分析 */}
        <div className="border rounded-lg overflow-hidden">
          <Button
            variant="ghost"
            className="w-full justify-between p-4 hover:bg-gray-50"
            onClick={() => toggleSection('emotions')}
          >
            <div className="flex items-center gap-2">
              <Smile className="h-4 w-4 text-purple-500" />
              <span className="font-medium">情感细分</span>
              <Badge variant="secondary" className="ml-2">{emotions.length}种情绪</Badge>
            </div>
            {expandedSections.emotions ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
          
          {expandedSections.emotions && (
            <div className="px-4 pb-4 space-y-3 animate-slide-in-right">
              {emotions.map((emotion, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getEmotionIconComponent(emotion.type)}
                      <span className="text-sm font-medium text-gray-700">{emotion.type}</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-600">
                      {(emotion.score * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="relative bg-gray-200 rounded-full h-1.5">
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-pink-400 to-purple-400 transition-all duration-700"
                      style={{ width: `${emotion.score * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 关键词提取 */}
        <div className="border rounded-lg overflow-hidden">
          <Button
            variant="ghost"
            className="w-full justify-between p-4 hover:bg-gray-50"
            onClick={() => toggleSection('keywords')}
          >
            <div className="flex items-center gap-2">
              <Laugh className="h-4 w-4 text-blue-500" />
              <span className="font-medium">关键词提取</span>
              <Badge variant="secondary" className="ml-2">{keywords.length}个关键词</Badge>
            </div>
            {expandedSections.keywords ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
          
          {expandedSections.keywords && (
            <div className="px-4 pb-4 animate-slide-in-right">
              <div className="flex flex-wrap gap-2">
                {keywords.map((keyword, index) => (
                  <Badge 
                    key={index} 
                    variant="outline" 
                    className="bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-pink-50 hover:border-pink-200 transition-colors"
                  >
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 分析摘要 */}
        <div className="border rounded-lg overflow-hidden">
          <Button
            variant="ghost"
            className="w-full justify-between p-4 hover:bg-gray-50"
            onClick={() => toggleSection('summary')}
          >
            <div className="flex items-center gap-2">
              <Frown className="h-4 w-4 text-orange-500" />
              <span className="font-medium">分析摘要</span>
            </div>
            {expandedSections.summary ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
          
          {expandedSections.summary && (
            <div className="px-4 pb-4 animate-slide-in-right">
              <p className="text-sm text-gray-700 leading-relaxed bg-gradient-to-r from-gray-50 to-blue-50 p-3 rounded-lg border border-gray-100">
                {summary}
              </p>
            </div>
          )}
        </div>
        </CardContent>
      </Card>
    </div>
  )
}