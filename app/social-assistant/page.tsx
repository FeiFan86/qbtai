'use client'

import React, { useState } from 'react'
import GlobalNavbar from '@/components/global-navbar'
import { Plus, Trash2, Edit3, Send, Upload, Download, Users, Heart, Briefcase, Home } from 'lucide-react'

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

type RelationshipType = '情侣' | '朋友' | '家人' | '同事' | '同学' | '其他'

const relationshipOptions = [
  { value: '情侣', label: '情侣', icon: Heart, color: 'bg-red-100 text-red-600' },
  { value: '朋友', label: '朋友', icon: Users, color: 'bg-blue-100 text-blue-600' },
  { value: '家人', label: '家人', icon: Home, color: 'bg-green-100 text-green-600' },
  { value: '同事', label: '同事', icon: Briefcase, color: 'bg-purple-100 text-purple-600' },
  { value: '同学', label: '同学', icon: Users, color: 'bg-orange-100 text-orange-600' },
  { value: '其他', label: '其他', icon: Users, color: 'bg-gray-100 text-gray-600' }
]

export default function SocialAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: '你好，最近工作怎么样？', speaker: 'user', isEditing: false },
    { id: '2', text: '工作压力有点大，项目进度很紧', speaker: 'other', isEditing: false }
  ])
  const [newMessage, setNewMessage] = useState('')
  const [relationship, setRelationship] = useState<RelationshipType>('朋友')
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // 添加新消息
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

  // 删除消息
  const deleteMessage = (id: string) => {
    setMessages(messages.filter(msg => msg.id !== id))
  }

  // 编辑消息
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

  // 导入对话功能
  const importConversation = () => {
    const importText = prompt('请输入对话内容（每行一条消息）：')
    if (!importText) return
    
    const lines = importText.split('\n').filter(line => line.trim())
    if (lines.length === 0) return
    
    const newMessages: Message[] = lines.map((line, index) => ({
      id: Date.now().toString() + index,
      text: line.trim(),
      speaker: index % 2 === 0 ? 'user' : 'other',
      isEditing: false
    }))
    
    setMessages(newMessages)
    setAnalysisResult(null)
  }

  // 导出对话功能
  const exportConversation = () => {
    const exportText = messages.map(msg => msg.text).join('\n')
    const blob = new Blob([exportText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `对话记录-${new Date().toLocaleDateString()}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  // 分析对话
  const analyzeConversation = async () => {
    if (messages.length === 0) {
      setError('请输入对话内容')
      return
    }

    setLoading(true)
    setError('')
    
    try {
      // 基于角色关系的智能分析
      const relationshipBasedAnalysis = {
        情侣: {
          emotionalIntelligence: Math.random() * 0.2 + 0.7, // 0.7-0.9
          empathyScore: Math.random() * 0.2 + 0.8, // 0.8-1.0
          needs: ['情感支持', '理解', '陪伴'],
          strengths: ['情感表达', '关心体贴', '耐心倾听']
        },
        朋友: {
          emotionalIntelligence: Math.random() * 0.3 + 0.6, // 0.6-0.9
          empathyScore: Math.random() * 0.3 + 0.6, // 0.6-0.9
          needs: ['支持', '建议', '分享'],
          strengths: ['真诚', '互助', '信任']
        },
        家人: {
          emotionalIntelligence: Math.random() * 0.2 + 0.7, // 0.7-0.9
          empathyScore: Math.random() * 0.2 + 0.7, // 0.7-0.9
          needs: ['关心', '理解', '支持'],
          strengths: ['亲情', '包容', '支持']
        },
        同事: {
          emotionalIntelligence: Math.random() * 0.3 + 0.5, // 0.5-0.8
          empathyScore: Math.random() * 0.3 + 0.5, // 0.5-0.8
          needs: ['协作', '沟通', '专业'],
          strengths: ['专业', '高效', '合作']
        },
        同学: {
          emotionalIntelligence: Math.random() * 0.3 + 0.6, // 0.6-0.9
          empathyScore: Math.random() * 0.3 + 0.6, // 0.6-0.9
          needs: ['学习', '交流', '互助'],
          strengths: ['学习', '分享', '互助']
        },
        其他: {
          emotionalIntelligence: Math.random() * 0.4 + 0.5, // 0.5-0.9
          empathyScore: Math.random() * 0.4 + 0.5, // 0.5-0.9
          needs: ['沟通', '理解', '交流'],
          strengths: ['沟通', '理解', '交流']
        }
      }

      const relationshipData = relationshipBasedAnalysis[relationship]
      
      const mockResult = {
        conversationAnalysis: {
          overallSentiment: messages.some(msg => 
            msg.text.includes('压力') || msg.text.includes('紧张') || msg.text.includes('不好')
          ) ? 'mixed' : 'positive',
          communicationStyle: 'cooperative',
          emotionalIntelligence: relationshipData.emotionalIntelligence,
          conflictLevel: Math.random() * 0.3,
          empathyScore: relationshipData.empathyScore
        },
        participantAnalysis: {
          user: {
            emotionalState: '支持性',
            communicationStyle: '关怀型',
            needs: relationshipData.needs,
            strengths: relationshipData.strengths
          },
          other: {
            emotionalState: messages.some(msg => msg.text.includes('压力')) ? '压力' : '正常',
            communicationStyle: '求助型',
            needs: relationshipData.needs,
            strengths: relationshipData.strengths
          }
        },
        improvementSuggestions: [
          `作为${relationship}关系，可以更多地表达关心和理解`,
          '适时询问对方的具体情况，提供更精准的帮助',
          '注意语气和表达方式，保持积极的沟通氛围'
        ],
        responseTemplates: [
          `作为${relationship}，我理解你的感受`,
          '有什么我可以帮忙的吗？',
          '我们可以一起想办法解决这个问题'
        ]
      }
      
      // 模拟延迟
      await new Promise(resolve => setTimeout(resolve, 1500))
      setAnalysisResult(mockResult)
    } catch (err) {
      setError('分析失败，请稍后重试')
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

          {/* 角色关系选择 */}
          <div className="max-w-4xl mx-auto mb-6">
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <h3 className="text-lg font-semibold mb-3">选择关系类型</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {relationshipOptions.map((option) => {
                  const IconComponent = option.icon
                  return (
                    <button
                      key={option.value}
                      onClick={() => setRelationship(option.value as RelationshipType)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all ${
                        relationship === option.value
                          ? `${option.color} border-current`
                          : 'bg-white border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <IconComponent size={16} />
                      <span className="text-sm font-medium">{option.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* 对话管理区域 */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">对话内容</h3>
                <div className="flex gap-2">
                  <button 
                    onClick={importConversation}
                    className="flex items-center gap-1 px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <Upload size={14} />
                    导入
                  </button>
                  <button 
                    onClick={exportConversation}
                    disabled={messages.length === 0}
                    className="flex items-center gap-1 px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 transition-colors"
                  >
                    <Download size={14} />
                    导出
                  </button>
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
                {messages.map((message) => (
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
                  disabled={newMessage.trim() === ''}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
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
            <div className="max-w-4xl mx-auto space-y-6">
              {/* 对话分析卡片 */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  💬 对话分析 - {relationship}关系
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* 情感分析 */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">整体情感倾向</span>
                        <span className={`px-2 py-1 rounded text-xs ${
                          analysisResult.conversationAnalysis.overallSentiment === 'positive' ? 'bg-green-100 text-green-700' :
                          analysisResult.conversationAnalysis.overallSentiment === 'negative' ? 'bg-red-100 text-red-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {analysisResult.conversationAnalysis.overallSentiment === 'positive' ? '积极' :
                           analysisResult.conversationAnalysis.overallSentiment === 'negative' ? '消极' : '混合'}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-xs text-gray-500">情商得分</span>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div 
                              className="bg-green-500 h-2 rounded-full" 
                              style={{ width: `${analysisResult.conversationAnalysis.emotionalIntelligence * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-500">
                            {(analysisResult.conversationAnalysis.emotionalIntelligence * 100).toFixed(0)}%
                          </span>
                        </div>
                        
                        <div>
                          <span className="text-xs text-gray-500">同理心得分</span>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div 
                              className="bg-blue-500 h-2 rounded-full" 
                              style={{ width: `${analysisResult.conversationAnalysis.empathyScore * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-500">
                            {(analysisResult.conversationAnalysis.empathyScore * 100).toFixed(0)}%
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* 参与者分析 */}
                    <div>
                      <h4 className="text-sm font-medium mb-3">参与者分析</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border rounded-lg p-3 bg-blue-50">
                          <h5 className="font-medium text-sm mb-2">用户</h5>
                          <div className="space-y-2">
                            <div>
                              <span className="text-xs text-gray-500">情感状态</span>
                              <div className="text-sm">{analysisResult.participantAnalysis.user.emotionalState}</div>
                            </div>
                            <div>
                              <span className="text-xs text-gray-500">优势</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {analysisResult.participantAnalysis.user.strengths.map((strength, idx) => (
                                  <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                                    {strength}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="border rounded-lg p-3 bg-green-50">
                          <h5 className="font-medium text-sm mb-2">对方</h5>
                          <div className="space-y-2">
                            <div>
                              <span className="text-xs text-gray-500">情感状态</span>
                              <div className="text-sm">{analysisResult.participantAnalysis.other.emotionalState}</div>
                            </div>
                            <div>
                              <span className="text-xs text-gray-500">需求</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {analysisResult.participantAnalysis.other.needs.map((need, idx) => (
                                  <span key={idx} className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                                    {need}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 策略建议 */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                        💡 改进建议
                      </h4>
                      <div className="space-y-2">
                        {analysisResult.improvementSuggestions.map((suggestion, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5"></div>
                            <p className="text-sm text-gray-600">{suggestion}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-2">回应模板</h4>
                      <div className="space-y-2">
                        {analysisResult.responseTemplates.map((template, index) => (
                          <div key={index} className="border rounded-lg p-3 bg-blue-50">
                            <p className="text-sm italic">"{template}"</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-2">下一步行动</h4>
                      <div className="space-y-2">
                        <div className="border rounded-lg p-2 bg-purple-50">
                          <p className="text-sm">继续关注对方的情感需求</p>
                        </div>
                        <div className="border rounded-lg p-2 bg-purple-50">
                          <p className="text-sm">实践推荐的沟通策略</p>
                        </div>
                        <div className="border rounded-lg p-2 bg-purple-50">
                          <p className="text-sm">记录沟通效果，持续优化</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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