'use client'

import React, { useState } from 'react'
import { PenTool, Sparkles, Download, Share2 } from 'lucide-react'
import GlobalNavbar from '@/components/global-navbar'
import UsageGuard, { UsageStatus } from '@/components/usage-guard'

interface GenerationResult {
  content: string;
  suggestions: string[];
}

export default function ContentCreationPage() {
  const [prompt, setPrompt] = useState('')
  const [style, setStyle] = useState('casual')
  const [length, setLength] = useState('medium')
  const [isGenerating, setIsGenerating] = useState(false)
  const [result, setResult] = useState<GenerationResult | null>(null)

  const handleGenerate = async () => {
    if (!prompt.trim()) return
    
    setIsGenerating(true)
    
    // 模拟API调用
    setTimeout(() => {
      setResult({
        content: '亲爱的，我想对你说：每一天醒来，看到你的微笑，我就知道这是新的一天里最美好的开始。你的存在让我的世界充满了色彩和温暖。',
        suggestions: [
          '可以添加具体的回忆或事件',
          '考虑加入更多情感表达',
          '可以增加对未来的期许',
          '尝试不同的表达风格'
        ]
      })
      setIsGenerating(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      {/* 导航栏 */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="container">
          <div className="flex justify-between items-center h-16">
            <a href="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full flex items-center justify-center">
                <PenTool className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold text-gray-900">丘比特AI</span>
            </a>
            <div className="flex items-center space-x-4">
              <a href="/" className="text-gray-600 hover:text-rose-600 transition-colors">
                返回首页
              </a>
              <a href="/login" className="text-gray-600 hover:text-rose-600 transition-colors">
                登录
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* 主要内容 */}
      <main className="pt-16">
        <div className="container py-12">
          {/* 页面标题 */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 mb-4">
              <PenTool className="h-5 w-5 text-rose-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">内容创作</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              AI情感内容生成
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              输入您的想法，AI将为您生成个性化的情感内容
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            {/* 输入区域 */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">创作设置</h2>
              
              {/* 内容提示 */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  内容提示
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="请描述您想表达的内容..."
                  className="w-full h-32 p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                />
              </div>

              {/* 风格选择 */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  表达风格
                </label>
                <select
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                >
                  <option value="casual">轻松随意</option>
                  <option value="formal">正式得体</option>
                  <option value="emotional">深情款款</option>
                  <option value="playful">活泼俏皮</option>
                  <option value="poetic">诗意浪漫</option>
                </select>
              </div>

              {/* 长度选择 */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  内容长度
                </label>
                <select
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                >
                  <option value="short">简短精炼</option>
                  <option value="medium">中等长度</option>
                  <option value="long">详细丰富</option>
                </select>
              </div>

              <button
                onClick={handleGenerate}
                disabled={!prompt.trim() || isGenerating}
                className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3 rounded-lg font-medium hover:from-rose-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? '生成中...' : '生成内容'}
              </button>
            </div>

            {/* 生成结果 */}
            {result && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">生成结果</h2>
                
                {/* 生成的内容 */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">生成内容</h3>
                  <div className="p-4 bg-rose-50 rounded-lg">
                    <p className="text-gray-700 leading-relaxed">
                      {result.content}
                    </p>
                  </div>
                </div>

                {/* 优化建议 */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">优化建议</h3>
                  <ul className="space-y-2">
                    {result.suggestions.map((suggestion, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <Sparkles className="h-4 w-4 text-rose-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 操作按钮 */}
                <div className="flex space-x-3 pt-4 border-t border-gray-200">
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-rose-600 transition-colors">
                    <Download className="h-4 w-4" />
                    <span>保存内容</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-rose-600 transition-colors">
                    <Share2 className="h-4 w-4" />
                    <span>分享</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 功能特色 */}
          <div className="max-w-4xl mx-auto mt-12">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">内容创作场景</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">💕 情感表达</h3>
                <p className="text-gray-600 text-sm">
                  表达爱意、感谢、思念等情感内容
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">🎉 特殊日子</h3>
                <p className="text-gray-600 text-sm">
                  生日、纪念日、节日等特殊场合内容
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">💬 日常沟通</h3>
                <p className="text-gray-600 text-sm">
                  日常聊天、消息回复等沟通内容
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
                <PenTool className="h-3 w-3 text-white" />
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
  )
}