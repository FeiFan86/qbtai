'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { Badge } from './ui/badge'
import { Brain, Send, User, Bot, RotateCw, MessageCircle, RefreshCw, Download, Share2 } from 'lucide-react'
import { EmotionAnalysisResult } from './emotion-analysis-result'
import { LoadingSpinner, ErrorMessage, LoadingOverlay } from './loading-spinner'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  analysis?: any
}

interface ChatEmotionAnalysisProps {
  onNewMessage?: (message: Message) => void
  onAnalysisStart?: () => void
  onAnalysisComplete?: (analysis: any) => void
  onGenerateResult?: (messages: Message[]) => void
  showTitle?: boolean
}

export function ChatEmotionAnalysisEnhanced({ 
  onNewMessage, 
  onAnalysisStart,
  onAnalysisComplete,
  onGenerateResult,
  showTitle = true 
}: ChatEmotionAnalysisProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState('')
  const [apiError, setApiError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [isGeneratingAnalysis, setIsGeneratingAnalysis] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const [prevMessagesLength, setPrevMessagesLength] = useState(0)

  useEffect(() => {
    if (messages.length > prevMessagesLength) {
      const scrollTimeout = setTimeout(() => {
        scrollToBottom()
      }, 150)
      
      setPrevMessagesLength(messages.length)
      return () => clearTimeout(scrollTimeout)
    }
  }, [messages, prevMessagesLength, scrollToBottom])

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
    setLoading(true)

    try {
      // 调用火山引擎API获取AI回复
      const response = await fetch('/api/chat/emotion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: inputText.trim(),
          conversationHistory: messages.map(m => ({
            role: m.role,
            content: m.content
          })).slice(-10) // 只保留最近10条消息作为上下文
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const result = await response.json()
      
      if (result.success && result.data) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: result.data.content || '我理解了您的感受。请继续分享您的想法。',
          timestamp: new Date()
        }

        setMessages(prev => [...prev, assistantMessage])
        onNewMessage?.(assistantMessage)
      } else {
        throw new Error(result.error || '获取AI回复失败')
      }

    } catch (error) {
      console.error('发送消息错误:', error)
      
      const errorMessage = error instanceof Error ? error.message : '发送失败，请重试'
      setApiError(errorMessage)
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `抱歉，AI回复获取失败：${errorMessage}。请稍后重试。`,
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, assistantMessage])
    } finally {
      setLoading(false)
    }
  }



  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !loading) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleGenerateResult = async () => {
    if (messages.length === 0) return
    
    const userMessages = messages.filter(m => m.role === 'user')
    if (userMessages.length === 0) return
    
    setIsGeneratingAnalysis(true)
    setApiError(null)
    
    try {
      const response = await fetch('/api/emotion/generate-result', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          messages: userMessages,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const result = await response.json()
      
      if (result.success && result.data) {
        // 生成结果不在对话框内显示，而是通过回调传递给父组件
        onGenerateResult?.(messages)
        onAnalysisComplete?.(result.data)
        
        // 添加一个简单的确认消息到对话框
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: '分析已完成！请查看下方的详细情感分析结果。',
          timestamp: new Date()
        }

        setMessages(prev => [...prev, assistantMessage])
        onNewMessage?.(assistantMessage)
      } else {
        throw new Error(result.error || '生成结果失败')
      }

    } catch (error) {
      console.error('生成结果错误:', error)
      
      const errorMessage = error instanceof Error ? error.message : '生成结果失败，请重试'
      setApiError(errorMessage)
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `抱歉，生成结果时出现了错误：${errorMessage}。请稍后重试。`,
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, assistantMessage])
    } finally {
      setIsGeneratingAnalysis(false)
    }
  }

  const clearChat = () => {
    setMessages([])
    setApiError(null)
  }

  const exportConversation = async (format: 'pdf' | 'image' | 'markdown' | 'json') => {
    try {
      const conversationData = {
        messages: messages,
        summary: `对话分析报告 - ${new Date().toLocaleDateString('zh-CN')}`
      }
      
      alert(`导出功能暂未实现，格式: ${format}`)
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
      
      if (navigator.share) {
        await navigator.share({
          title: '情感对话分析报告',
          text: conversationText
        })
      } else {
        await navigator.clipboard.writeText(conversationText)
        alert('对话内容已复制到剪贴板')
      }
    } catch (error) {
      console.error('分享失败:', error)
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
      <LoadingOverlay show={isGeneratingAnalysis} message="生成情感分析结果中..." />
      
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
        {apiError && (
          <ErrorMessage 
            error={apiError} 
            onRetry={handleRetry}
            className="mb-4"
          />
        )}
        
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {messages.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Brain className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p className="text-lg">开始对话，让我来分析您的情感</p>
              <p className="text-sm text-gray-400 mt-2">输入您的感受或想法，AI将为您提供专业的情感分析</p>
            </div>
          ) : (
            <div className="pt-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {message.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4 text-pink-600" />
                    </div>
                  )}
                  
                  <div className={`max-w-[80%] space-y-3 ${message.role === 'user' ? 'ml-auto' : ''}`}>
                    <div className={`rounded-2xl p-4 transition-all duration-200 ${
                      message.role === 'user' 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' 
                        : 'bg-white border border-gray-200 shadow-sm hover:shadow-md'
                    }`}>
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                    </div>
                    
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
              ))}
            </div>
          )}
          
          {loading && !isGeneratingAnalysis && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0">
                <Bot className="h-4 w-4 text-pink-600" />
              </div>
              <div className="bg-gray-100 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <LoadingSpinner size="sm" />
                  <span className="text-sm">正在回复中...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
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
          <div className="flex flex-col gap-3">
            {/* 生成结果按钮 */}
            {messages.length > 0 && (
              <div className="flex justify-center">
                <Button 
                  onClick={handleGenerateResult} 
                  disabled={isGeneratingAnalysis}
                  variant="pink"
                  className="flex items-center gap-2 px-6"
                >
                  {isGeneratingAnalysis ? <LoadingSpinner size="sm" /> : <Brain className="h-4 w-4" />}
                  生成情感分析结果
                </Button>
              </div>
            )}
            
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
                  disabled={!inputText.trim() || loading || isGeneratingAnalysis}
                  className="flex items-center gap-2"
                >
                  {loading && !isGeneratingAnalysis ? <LoadingSpinner size="sm" /> : <Send className="h-4 w-4" />}
                  发送
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}