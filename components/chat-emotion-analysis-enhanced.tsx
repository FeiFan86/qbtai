'use client'

import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { Badge } from './ui/badge'
import { Brain, Send, User, Bot, RotateCw, MessageCircle, RefreshCw, Download, Share2 } from 'lucide-react'
import { EmotionAnalysisResult } from './emotion-analysis-result'
import { LoadingSpinner, ErrorMessage, LoadingOverlay } from './loading-spinner'
import { MessageSkeleton } from './loading-skeleton'
import { useApiCall, ErrorHandler, generateMockData } from '@/lib/loading-utils'
import { ExportManager, copyToClipboard, shareToSocialMedia } from '@/lib/export-utils'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  analysis?: any
}

interface ChatEmotionAnalysisProps {
  onNewMessage?: (message: Message) => void
  showTitle?: boolean
}

export function ChatEmotionAnalysisEnhanced({ onNewMessage, showTitle = true }: ChatEmotionAnalysisProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState('')
  const [apiError, setApiError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  // 使用改进的API调用钩子
  const { loading, error, callApi, reset } = useApiCall<any>()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const [prevMessagesLength, setPrevMessagesLength] = useState(0)

  useEffect(() => {
    // 只有当有新消息时才自动滚动，避免页面打开时自动下滑
    if (messages.length > prevMessagesLength) {
      const scrollTimeout = setTimeout(() => {
        scrollToBottom()
      }, 150)
      
      setPrevMessagesLength(messages.length)
      return () => clearTimeout(scrollTimeout)
    }
  }, [messages, prevMessagesLength])

  // 模拟数据，用于优雅降级
  const mockAnalysisData = {
    overall: {
      sentiment: 'positive',
      confidence: 0.85
    },
    emotions: [
      { type: '快乐', score: 0.85 },
      { type: '期待', score: 0.65 },
      { type: '平静', score: 0.45 }
    ],
    suggestions: [
      '继续保持积极心态',
      '与朋友分享这份快乐',
      '记录下此刻的美好感受'
    ]
  }

  const handleSendMessage = async () => {
    if (!inputText.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputText.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setApiError(null)

    try {
      // 使用改进的API调用，包含重试机制
      const result = await callApi(
        async () => {
          const response = await fetch('/api/emotion/analyze', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
              input: inputText.trim(),
              type: 'text',
              context: messages.filter(m => m.role === 'user').map(m => m.content)
            }),
          })

          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`)
          }

          return await response.json()
        },
        {
          maxRetries: 3,
          retryDelay: 1000,
          timeout: 30000
        }
      )

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateResponseMessage(result.data || result),
        timestamp: new Date(),
        analysis: result.data || result
      }

      setMessages(prev => [...prev, assistantMessage])
      onNewMessage?.(assistantMessage)

    } catch (error) {
      console.error('分析错误:', error)
      
      // 优雅降级：使用模拟数据
      const errorMessage = ErrorHandler.handleApiError(error)
      setApiError(errorMessage)
      
      // 如果API调用失败，使用模拟数据
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateResponseMessage(mockAnalysisData),
        timestamp: new Date(),
        analysis: mockAnalysisData
      }
      
      setMessages(prev => [...prev, assistantMessage])
    }
  }

  const generateResponseMessage = (analysis: any) => {
    if (!analysis) {
      return "🧠 您的描述很清晰，让我来分析一下。 我检测到您的主要情感是\"快乐\"，置信度为85.0%。"
    }

    const { overall, emotions, sentiment, suggestions } = analysis
    
    // 确保数据安全访问
    const emotionList = emotions || []
    
    // 从情感数组中找出分数最高的情感作为主要情感
    const primaryEmotion = emotionList.length > 0 
      ? emotionList.reduce((max: any, emotion: any) => 
          (emotion.score || 0) > (max.score || 0) ? emotion : max
        ).type || '未知情感'
      : '未知情感'
    
    // 使用整体置信度或默认值
    const confidence = (overall?.confidence || 0.75) * 100
    
    // 使用整体情感倾向或从情感数组推断
    const sentimentType = overall?.sentiment || sentiment || 
      (emotionList.length > 0 
        ? emotionList.some((e: any) => e.type && (e.type.includes('快乐') || e.type.includes('开心'))) 
          ? 'positive' 
          : emotionList.some((e: any) => e.type && (e.type.includes('悲伤') || e.type.includes('愤怒'))) 
            ? 'negative' 
            : 'neutral'
        : 'neutral')
    
    const responses = {
      positive: [
        "感受到您积极的心态！",
        "听起来您心情不错，继续保持！",
        "积极的情绪很有感染力！"
      ],
      negative: [
        "我能理解您的感受，情绪需要被关注。",
        "感谢您分享这些感受，情绪波动是正常的。",
        "我感受到您的心情，希望这些分析能帮到您。"
      ],
      neutral: [
        "感谢您分享这些内容。",
        "您的描述很清晰，让我来分析一下。",
        "这是一个很好的分享，让我来深入理解。"
      ]
    }

    const sentimentKey = sentimentType === 'positive' ? 'positive' : 
                        sentimentType === 'negative' ? 'negative' : 'neutral'
    
    const randomResponse = responses[sentimentKey][Math.floor(Math.random() * responses[sentimentKey].length)]
    
    return `🧠 ${randomResponse} 我检测到您的主要情感是"${primaryEmotion}"，置信度为${confidence.toFixed(1)}%。`
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const clearChat = () => {
    setMessages([])
    setApiError(null)
    reset()
  }

  const exportConversation = async (format: 'pdf' | 'image' | 'markdown' | 'json') => {
    try {
      const conversationData = {
        messages: messages,
        summary: `对话分析报告 - ${new Date().toLocaleDateString('zh-CN')}`
      }
      
      await ExportManager.exportAnalysis(conversationData, format)
    } catch (error) {
      console.error('导出失败:', error)
      setApiError('导出失败，请重试')
    }
  }

  const shareConversation = async () => {
    try {
      const conversationText = messages.map(msg => 
        `${msg.role === 'user' ? '用户' : 'AI助手'}: ${msg.content}`
      ).join('\n')
      
      await shareToSocialMedia(conversationText, '情感对话分析报告')
    } catch (error) {
      console.error('分享失败:', error)
      // 降级到复制到剪贴板
      const conversationText = messages.map(msg => 
        `${msg.role === 'user' ? '用户' : 'AI助手'}: ${msg.content}`
      ).join('\n')
      
      const success = await copyToClipboard(conversationText)
      if (success) {
        alert('对话内容已复制到剪贴板')
      }
    }
  }

  const handleRetry = () => {
    setApiError(null)
    if (messages.length > 0) {
      const lastUserMessage = messages[messages.length - 1]
      if (lastUserMessage.role === 'user') {
        setInputText(lastUserMessage.content)
        setTimeout(() => {
          handleSendMessage()
        }, 100)
      }
    }
  }

  return (
    <Card className="h-full flex flex-col relative">
      {/* 加载遮罩层 */}
      <LoadingOverlay show={loading} message="正在分析您的情感..." />
      
      {showTitle && (
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-pink-500" />
              <CardTitle>情感对话分析</CardTitle>
            </div>
            
            <div className="flex items-center gap-2">
              {messages.length > 0 && (
                <>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={shareConversation}
                    className="flex items-center gap-1"
                  >
                    <Share2 className="h-4 w-4" />
                    分享
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => exportConversation('pdf')}
                    className="flex items-center gap-1"
                  >
                    <Download className="h-4 w-4" />
                    导出
                  </Button>
                </>
              )}
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={clearChat}
                disabled={messages.length === 0}
              >
                清空对话
              </Button>
            </div>
          </div>
          <CardDescription>
            与AI进行实时对话，深入分析您的情绪和感受
          </CardDescription>
        </CardHeader>
      )}
      
      <CardContent className="flex-1 flex flex-col min-h-0">
        {/* 错误消息 */}
        {apiError && (
          <ErrorMessage 
            error={apiError} 
            onRetry={handleRetry}
            className="mb-4"
          />
        )}
        
        {/* 对话区域 */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {messages.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Brain className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>开始对话，让我来分析您的情感</p>
            </div>
          ) : (
            messages.map((message) => (
              <div key={message.id} className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4 text-pink-600" />
                  </div>
                )}
                
                <div className={`max-w-[80%] space-y-3 ${message.role === 'user' ? 'order-2' : 'order-2'}`}>
                  <div className={`rounded-2xl p-4 transition-all duration-200 ${
                    message.role === 'user' 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' 
                      : 'bg-white border border-gray-200 shadow-sm hover:shadow-md'
                  }`}>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  </div>
                  
                  {message.role === 'assistant' && message.analysis && (
                    <div className="animate-slide-in-right">
                      <EmotionAnalysisResult result={message.analysis} compact />
                    </div>
                  )}
                  
                  <div className="flex items-center justify-end">
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      <span className={`w-2 h-2 rounded-full ${
                        message.role === 'user' ? 'bg-blue-400' : 'bg-green-400'
                      }`}></span>
                      {message.timestamp.toLocaleTimeString('zh-CN', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
                
                {message.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <User className="h-4 w-4 text-blue-600" />
                  </div>
                )}
              </div>
            ))
          )}
          
          {loading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0">
                <Bot className="h-4 w-4 text-pink-600" />
              </div>
              <div className="bg-gray-100 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <LoadingSpinner size="sm" />
                  <span className="text-sm">正在分析中...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        {/* 输入区域 */}
        <div className="space-y-2">
          <Textarea
            placeholder="输入您想分享的内容或感受..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            rows={3}
            className="resize-none"
            disabled={loading}
          />
          <div className="flex justify-between items-center">
            <Badge variant="outline" className="text-xs">
              {messages.length} 条消息
            </Badge>
            <div className="flex gap-2">
              {apiError && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleRetry}
                  className="flex items-center gap-1"
                >
                  <RefreshCw className="h-4 w-4" />
                  重试
                </Button>
              )}
              <Button 
                onClick={handleSendMessage} 
                disabled={!inputText.trim() || loading}
                className="flex items-center gap-2"
              >
                {loading ? <LoadingSpinner size="sm" /> : <Send className="h-4 w-4" />}
                发送
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}