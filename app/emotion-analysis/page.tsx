'use client'

import React, { useState } from 'react'
import { Brain, MessageCircle, BarChart3, Download, Share2 } from 'lucide-react'
import GlobalNavbar from '@/components/global-navbar'
import UsageGuard, { UsageStatus } from '@/components/usage-guard'

export default function EmotionAnalysisPage() {
  const [inputText, setInputText] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState(null)

  const handleAnalyze = async (onRecordUsage: () => Promise<void>) => {
    if (!inputText.trim()) return
    
    setIsAnalyzing(true)
    
    // 记录使用次数
    await onRecordUsage()
    
    // 模拟API调用
    setTimeout(() => {
      setResult({
        emotions: [
          { name: '快乐', score: 85, color: 'text-green-500' },
          { name: '期待', score: 72, color: 'text-yellow-500' },
          { name: '信任', score: 68, color: 'text-blue-500' },
        ],
        summary: '这段文字表达了积极向上的情感，充满正能量和乐观态度。'
      })
      setIsAnalyzing(false)
    }, 2000)
  }

  return (
    <UsageGuard feature="emotion-analysis">
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
                  <Brain className="h-5 w-5 text-rose-500 mr-2" />
                  <span className="text-sm font-medium text-gray-700">情感分析</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  AI智能情感分析
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  输入文字内容，AI将为您分析情感状态，提供专业洞察
                </p>
              </div>

              {/* 使用状态提示 */}
              <div className="max-w-4xl mx-auto mb-6">
                <UsageStatus feature="emotion-analysis" className="justify-center" />
              </div>

              {/* 分析输入区 */}
              <div className="max-w-4xl mx-auto mb-8">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="请输入您想要分析的文字内容..."
                    className="w-full h-32 p-4 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-500">
                        {inputText.length} 字符
                      </span>
                      {!canUse && (
                        <span className="text-sm text-amber-600 font-medium">
                          使用次数已用完，请登录或等待重置
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => handleAnalyze(onUse)}
                      disabled={!inputText.trim() || isAnalyzing || !canUse}
                      className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-2 rounded-lg font-medium hover:from-rose-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isAnalyzing || isLoading ? '分析中...' : '开始分析'}
                    </button>
                  </div>
                </div>
              </div>

          {/* 分析结果 */}
          {result && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">分析结果</h2>
                
                {/* 情感分布 */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">情感分布</h3>
                  <div className="space-y-3">
                    {result.emotions.map((emotion, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className={`font-medium ${emotion.color}`}>
                          {emotion.name}
                        </span>
                        <div className="flex items-center space-x-3">
                          <div className="w-48 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${emotion.color.replace('text', 'bg')}`}
                              style={{ width: `${emotion.score}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-gray-700 w-12">
                            {emotion.score}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 分析总结 */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">分析总结</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {result.summary}
                  </p>
                </div>

                {/* 操作按钮 */}
                <div className="flex space-x-3 pt-4 border-t border-gray-200">
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-rose-600 transition-colors">
                    <Download className="h-4 w-4" />
                    <span>下载报告</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-rose-600 transition-colors">
                    <Share2 className="h-4 w-4" />
                    <span>分享结果</span>
                  </button>
                </div>
              </div>
            </div>
          )}
            </div>
          </main>

          {/* 页脚 */}
          <footer className="bg-gray-50 border-t border-gray-200">
            <div className="container py-8">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <div className="w-6 h-6 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full flex items-center justify-center">
                    <Brain className="h-3 w-3 text-white" />
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