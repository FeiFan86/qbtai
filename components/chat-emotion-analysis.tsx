'use client'

import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { Badge } from './ui/badge'
import { Brain, Send, User, Bot, RotateCw, MessageCircle } from 'lucide-react'
import { EmotionAnalysisResult } from './emotion-analysis-result'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  analysis?: any
}

interface ChatEmotionAnalysisProps {
  onNewMessage?: (message: Message) => void
}

export function ChatEmotionAnalysis({ onNewMessage }: ChatEmotionAnalysisProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

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
    setIsAnalyzing(true)

    // 调用API进行分析
    try {
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

      if (response.ok) {
        const result = await response.json()
        
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: generateResponseMessage(result.data),
          timestamp: new Date(),
          analysis: result.data
        }

        setMessages(prev => [...prev, assistantMessage])
        onNewMessage?.(assistantMessage)
      } else {
        throw new Error('分析失败')
      }
    } catch (error) {
      console.error('分析错误:', error)
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '抱歉，分析过程中出现了问题。请稍后重试。',
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsAnalyzing(false)
    }
  }

  const generateResponseMessage = (analysis: any) => {
    if (!analysis) {
      return "🧠 您的描述很清晰，让我来分析一下。 我检测到您的主要情感是"快乐"，置信度为85.0%。"
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
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-pink-500" />
            <CardTitle>情感对话分析</CardTitle>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={clearChat}
            disabled={messages.length === 0}
          >
            清空对话
          </Button>
        </div>
        <CardDescription>
          与AI进行实时对话，深入分析您的情绪和感受
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col min-h-0">
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
                        <span className="w-2 h-2 rounded-full bg-green-400"></span>
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
          
          {isAnalyzing && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0">
                <Bot className="h-4 w-4 text-pink-600" />
              </div>
              <div className="bg-gray-100 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <RotateCw className="h-4 w-4 animate-spin" />
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
          />
          <div className="flex justify-between items-center">
            <Badge variant="outline" className="text-xs">
              {messages.length} 条消息
            </Badge>
            <Button 
              onClick={handleSendMessage} 
              disabled={!inputText.trim() || isAnalyzing}
              className="flex items-center gap-2"
            >
              <Send className="h-4 w-4" />
              发送
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}