'use client'

import React, { useState } from 'react'
import { Users, MessageCircle, TrendingUp, Award } from 'lucide-react'
import GlobalNavbar from '@/components/global-navbar'
import UsageGuard, { UsageStatus } from '@/components/usage-guard'

export default function SocialAssistantPage() {
  const [conversation, setConversation] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState(null)

  const handleAnalyze = async (onRecordUsage: () => Promise<void>) => {
    if (!conversation.trim()) return
    
    setIsAnalyzing(true)
    
    // 记录使用次数
    await onRecordUsage()
    
    // 模拟API调用
    setTimeout(() => {
      setResult({
        overallScore: 85,
        communicationStyle: '开放型',
        emotionalIntelligence: 78,
        suggestions: [
          '尝试更多倾听对方的观点',
          '在表达自己感受时更加具体',
          '增加积极的反馈和鼓励',
          '适时分享个人经历'
        ]
      })
      setIsAnalyzing(false)
    }, 2000)
  }

  return (
    <UsageGuard feature="social-assistant">
      {({ canUse, remainingUses, onUse, isLoading, usageText }) => (
        <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
          {/* 导航栏 */}
          <GlobalNavbar />

          {/* 主要内容 */}
          <main className="pt-16">
            <div className="container py-12">
              {/* 页面标题 */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 mb-4">
                  <Users className="h-5 w-5 text-rose-500 mr-2" />
                  <span className="text-sm font-medium text-gray-700">社交助手</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  AI社交沟通分析
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  分析对话内容，提供改善建议，增进人际沟通技巧
                </p>
              </div>

              {/* 使用状态提示 */}
              <div className="max-w-4xl mx-auto mb-6">
                <UsageStatus feature="social-assistant" className="justify-center" />
              </div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            {/* 输入区域 */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">对话内容</h2>
              <textarea
                value={conversation}
                onChange={(e) => setConversation(e.target.value)}
                placeholder="请输入对话内容，描述沟通场景..."
                className="w-full h-64 p-4 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              />
              <button
                onClick={() => handleAnalyze(onUse)}
                disabled={!conversation.trim() || isAnalyzing || !canUse}
                className="w-full mt-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3 rounded-lg font-medium hover:from-rose-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAnalyzing || isLoading ? '分析中...' : '开始分析'}
              </button>
              {!canUse && (
                <p className="text-sm text-amber-600 mt-2">
                  使用次数已用完，请登录或等待重置
                </p>
              )}
            </div>

            {/* 分析结果 */}
            {result && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">分析结果</h2>
                
                {/* 总体评分 */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-700">沟通效果评分</span>
                    <span className="text-2xl font-bold text-rose-600">{result.overallScore}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-gradient-to-r from-rose-500 to-pink-500"
                      style={{ width: `${result.overallScore}%` }}
                    />
                  </div>
                </div>

                {/* 沟通风格 */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">沟通风格</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">主要风格</span>
                    <span className="text-lg font-semibold text-purple-600">{result.communicationStyle}</span>
                  </div>
                </div>

                {/* 情商评分 */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-700">情商指数</span>
                    <span className="text-2xl font-bold text-blue-600">{result.emotionalIntelligence}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-gradient-to-r from-blue-400 to-cyan-600"
                      style={{ width: `${result.emotionalIntelligence}%` }}
                    />
                  </div>
                </div>

                {/* 改善建议 */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">改善建议</h3>
                  <ul className="space-y-3">
                    {result.suggestions.map((suggestion, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-rose-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600">{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* 功能特色 */}
          <div className="max-w-4xl mx-auto mt-12">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">核心功能特色</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
                <MessageCircle className="h-8 w-8 text-rose-500 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">对话分析</h3>
                <p className="text-gray-600 text-sm">
                  深度分析对话内容，识别沟通模式和情感倾向
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
                <TrendingUp className="h-8 w-8 text-purple-500 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">改善建议</h3>
                <p className="text-gray-600 text-sm">
                  提供专业的沟通建议，帮助改善人际交往技巧
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
                <Award className="h-8 w-8 text-blue-500 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">成长追踪</h3>
                <p className="text-gray-600 text-sm">
                  记录沟通进步，见证社交能力的持续提升
                </p>
              </div>
            </div>
          </div>
            </div>
          </main>

          {/* 页脚 */}
          <footer className="bg-gray-50 border-t border-gray-200">
            <div className="container py-8">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <div className="w-6 h-6 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full flex items-center justify-center">
                    <Users className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-gray-900 font-semibold">丘比特AI情感助手</span>
                </div>
                <p className="text-gray-600 text-sm">
                  © 2024 专为情侣设计的情感助手平台. 让爱更美好.
                </p>
              </div>
            </div>
          </footer>
        </div>
      )}
    </UsageGuard>
  )
}