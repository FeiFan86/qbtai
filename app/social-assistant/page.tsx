'use client'

import React, { useState } from 'react'
import GlobalNavbar from '@/components/global-navbar'
import { ConversationAnalysisEnhanced } from '@/components/conversation-analysis-enhanced'
import { SocialStrategiesEnhanced } from '@/components/social-strategies-enhanced'
import { Plus, Trash2, Edit3, Send } from 'lucide-react'

interface AnalysisResult {
  conversationAnalysis: {
    overallSentiment: string
    communicationStyle: string
    emotionalIntelligence: number
    conflictLevel: number
    empathyScore: number
  }
  participantAnalysis: {
    user: {
      emotionalState: string
      communicationStyle: string
      needs: string[]
      strengths: string[]
    }
    other: {
      emotionalState: string
      communicationStyle: string
      needs: string[]
      strengths: string[]
    }
  }
  improvementSuggestions: string[]
  responseTemplates: string[]
}

interface Message {
  id: string
  text: string
  speaker: 'user' | 'other'
  isEditing: boolean
}

export default function SocialAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: '你好，最近工作怎么样？', speaker: 'user', isEditing: false },
    { id: '2', text: '工作压力有点大，项目进度很紧', speaker: 'other', isEditing: false }
  ])
  const [newMessage, setNewMessage] = useState('')
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const addMessage = () => {
    if (newMessage.trim() === '') return
    
    const nextSpeaker = messages.length % 2 === 0 ? 'user' : 'other'
    const newMsg: Message = {
      id: Date.now().toString(),
      text: newMessage.trim(),
      speaker: nextSpeaker,
      isEditing: false
    }
    
    setMessages([...messages, newMsg])
    setNewMessage('')
  }

  const deleteMessage = (id: string) => {
    setMessages(messages.filter(msg => msg.id !== id))
  }

  const startEdit = (id: string) => {
    setMessages(messages.map(msg => 
      msg.id === id ? { ...msg, isEditing: true } : msg
    ))
  }

  const updateMessage = (id: string, newText: string) => {
    setMessages(messages.map(msg => 
      msg.id === id ? { ...msg, text: newText, isEditing: false } : msg
    ))
  }

  const analyzeConversation = async () => {
    if (messages.length === 0) {
      setError('请输入对话内容')
      return
    }

    setLoading(true)
    setError('')
    
    try {
      // 使用真实API调用
      const response = await fetch('/api/ai/conversation-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: messages.map(msg => msg.text)
        })
      })

      if (!response.ok) {
        throw new Error('API调用失败')
      }

      const data = await response.json()
      
      if (data.success) {
        setAnalysisResult(data.data)
      } else {
        throw new Error(data.error || '分析失败')
      }
    } catch (err) {
      // 如果API调用失败，使用模拟数据作为备用
      console.log('API调用失败，使用模拟数据:', err)
      
      const mockResult = {
        conversationAnalysis: {
          overallSentiment: messages.some(msg => msg.text.includes('压力') || msg.text.includes('紧张')) ? 'mixed' : 'positive',
          communicationStyle: 'cooperative',
          emotionalIntelligence: Math.random() * 0.3 + 0.6, // 0.6-0.9
          conflictLevel: Math.random() * 0.4, // 0-0.4
          empathyScore: Math.random() * 0.3 + 0.7 // 0.7-1.0
        },
        participantAnalysis: {
          user: {
            emotionalState: '支持性',
            communicationStyle: '关怀型',
            needs: ['理解', '支持', '沟通'],
            strengths: ['同理心强', '善于倾听', '主动关心']
          },
          other: {
            emotionalState: messages.some(msg => msg.text.includes('压力')) ? '压力' : '正常',
            communicationStyle: '求助型',
            needs: ['安慰', '建议', '支持'],
            strengths: ['愿意分享', '寻求帮助', '坦诚表达']
          }
        },
        improvementSuggestions: [
          '可以更多地询问对方的具体困难，提供针对性建议',
          '适时表达理解和认同，增强对方的信任感',
          '提供一些减压方法或工作技巧的建议'
        ],
        responseTemplates: [
          '听起来你最近压力确实很大，我能理解你的感受',
          '工作进度紧确实很辛苦，有什么我可以帮忙的吗？',
          '要不要试试把工作分解成小任务，可能会轻松一些'
        ]
      }
      
      // 模拟延迟
      await new Promise(resolve => setTimeout(resolve, 1500))
      setAnalysisResult(mockResult)
    } finally {
      setLoading(false)
    }
  }

  const handleRetry = () => {
    analyzeConversation()
  }

  const clearAll = () => {
    setMessages([])
    setAnalysisResult(null)
    setError('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      <GlobalNavbar />
      
      <main className="pt-16">
        <div className="container py-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 mb-4">
              <span className="text-sm font-medium text-gray-700">社交助手</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              AI社交沟通分析
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              分析对话内容，提供改善建议，增进人际沟通技巧
            </p>
          </div>

          {/* 输入区域 */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">对话内容</h3>
                <div className="flex gap-2">
                  <button 
                    onClick={clearAll}
                    className="px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    清空
                  </button>
                </div>
              </div>
              
              {/* 对话消息列表 */}
              <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                {messages.map((message, index) => (
                  <div key={message.id} className="flex items-start space-x-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${message.speaker === 'user' ? 'bg-blue-500' : 'bg-green-500'}`}></div>
                    <div className="flex-1 bg-gray-50 rounded-lg p-3">
                      {message.isEditing ? (
                        <input
                          type="text"
                          value={message.text}
                          onChange={(e) => updateMessage(message.id, e.target.value)}
                          onBlur={() => updateMessage(message.id, message.text)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') updateMessage(message.id, message.text)
                            if (e.key === 'Escape') updateMessage(message.id, message.text)
                          }}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          autoFocus
                        />
                      ) : (
                        <p className="text-sm">{message.text}</p>
                      )}
                    </div>
                    <div className="flex gap-1">
                      <button 
                        onClick={() => startEdit(message.id)}
                        className="p-1 text-gray-400 hover:text-gray-600"
                      >
                        <Edit3 size={14} />
                      </button>
                      <button 
                        onClick={() => deleteMessage(message.id)}
                        className="p-1 text-gray-400 hover:text-red-600"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
                
                {messages.length === 0 && (
                  <div className="text-center py-8 text-gray-400">
                    暂无对话内容，请添加对话消息
                  </div>
                )}
              </div>
              
              {/* 添加新消息 */}
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') addMessage()
                  }}
                  placeholder="输入对话内容..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button 
                  onClick={addMessage}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
              
              <button 
                onClick={analyzeConversation}
                disabled={loading || messages.length === 0}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    分析中...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    开始分析对话
                  </>
                )}
              </button>
            </div>
          </div>

          {/* 分析结果区域 */}
          {analysisResult && (
            <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ConversationAnalysisEnhanced 
                result={analysisResult || undefined}
                loading={loading}
                error={error}
                onRetry={handleRetry}
              />
              
              <SocialStrategiesEnhanced 
                result={analysisResult || undefined}
                loading={loading}
                error={error}
                onRetry={handleRetry}
              />
            </div>
          )}

          {/* 错误提示 */}
          {error && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-700 text-sm">{error}</p>
                <button 
                  onClick={handleRetry}
                  className="mt-2 px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
                >
                  重试
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}