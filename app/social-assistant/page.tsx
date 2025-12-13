'use client'

import React, { useState } from 'react'
import GlobalNavbar from '@/components/global-navbar'
import { ConversationAnalysisEnhanced } from '@/components/conversation-analysis-enhanced'
import { SocialStrategiesEnhanced } from '@/components/social-strategies-enhanced'

export default function SocialAssistantPage() {
  const [messages, setMessages] = useState<string[]>(['你好，最近工作怎么样？', '工作压力有点大，项目进度很紧'])
  const [analysisResult, setAnalysisResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const analyzeConversation = async () => {
    if (messages.length === 0) {
      setError('请输入对话内容')
      return
    }

    setLoading(true)
    setError('')
    
    try {
      // 模拟API调用 - 实际部署时连接到真实API
      const mockResult = {
        conversationAnalysis: {
          overallSentiment: 'positive',
          communicationStyle: 'cooperative',
          emotionalIntelligence: 0.75,
          conflictLevel: 0.2,
          empathyScore: 0.8
        },
        participantAnalysis: {
          user: {
            emotionalState: '支持性',
            communicationStyle: '关怀型',
            needs: ['理解', '支持'],
            strengths: ['同理心强', '善于倾听']
          },
          other: {
            emotionalState: '压力',
            communicationStyle: '求助型',
            needs: ['安慰', '建议'],
            strengths: ['愿意分享', '寻求帮助']
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
      await new Promise(resolve => setTimeout(resolve, 1000))
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
              <h3 className="text-lg font-semibold mb-4">对话内容</h3>
              <div className="space-y-3 mb-4">
                {messages.map((message, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${index % 2 === 0 ? 'bg-blue-500' : 'bg-green-500'}`}></div>
                    <div className="flex-1 bg-gray-50 rounded-lg p-3">
                      <p className="text-sm">{message}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <button 
                onClick={analyzeConversation}
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {loading ? '分析中...' : '开始分析对话'}
              </button>
            </div>
          </div>

          {/* 分析结果区域 */}
          {analysisResult && (
            <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ConversationAnalysisEnhanced 
                result={analysisResult}
                loading={loading}
                error={error}
                onRetry={handleRetry}
              />
              
              <SocialStrategiesEnhanced 
                result={analysisResult}
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
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}