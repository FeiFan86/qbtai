'use client'

import React, { useState } from 'react'
import { PenTool, Sparkles, Download, Share2, Play, Copy, Check, Heart, Calendar, MessageCircle } from 'lucide-react'
import GlobalNavbar from '@/components/global-navbar'
import UsageGuard, { UsageStatus } from '@/components/usage-guard'

interface GenerationResult {
  content: string;
  suggestions: string[];
  contentType: string;
  emotionIntensity: number;
  keywords: string[];
}

export default function ContentCreationPage() {
  const [prompt, setPrompt] = useState('')
  const [style, setStyle] = useState('casual')
  const [length, setLength] = useState('medium')
  const [contentType, setContentType] = useState('love')
  const [isGenerating, setIsGenerating] = useState(false)
  const [result, setResult] = useState<GenerationResult | null>(null)
  const [copied, setCopied] = useState(false)

  // 情侣内容模板
  const contentTemplates = [
    {
      title: '情感表白',
      type: 'love',
      prompt: '想对伴侣表达深深的爱意和感谢',
      example: '亲爱的，我想对你说...',
      icon: <Heart className="h-4 w-4" />
    },
    {
      title: '纪念日祝福',
      type: 'anniversary',
      prompt: '为我们的纪念日写一段温馨的祝福',
      example: '今天是我们相识的第365天...',
      icon: <Calendar className="h-4 w-4" />
    },
    {
      title: '日常关心',
      type: 'care',
      prompt: '表达对伴侣的关心和体贴',
      example: '今天工作累不累？要注意休息...',
      icon: <MessageCircle className="h-4 w-4" />
    }
  ]

  const handleGenerate = async (onRecordUsage: () => Promise<void>) => {
    if (!prompt.trim()) return
    
    setIsGenerating(true)
    
    // 记录使用次数
    await onRecordUsage()
    
    // 模拟情侣内容生成API调用
    setTimeout(() => {
      const text = prompt.toLowerCase()
      let content = ''
      let emotionIntensity = 70
      
      // 基于内容类型和提示生成内容
      if (contentType === 'love' || text.includes('爱') || text.includes('感谢') || text.includes('幸福')) {
        content = `亲爱的，我想对你说：

和你在一起的每一天都让我感到无比幸福。你的笑容是我最大的动力，你的温柔让我感受到家的温暖。

谢谢你一直以来的包容和支持，让我能够做最真实的自己。无论未来会遇到什么挑战，我都愿意和你一起面对。

我爱你，不仅仅因为你是谁，更因为和你在一起时，我成为了更好的自己。`
        emotionIntensity = 90
      } else if (contentType === 'anniversary' || text.includes('纪念') || text.includes('周年')) {
        content = `亲爱的，今天是我们的特别日子！

还记得我们第一次相遇的场景吗？那时的我们可能都没想到，会一起走过这么多美好的时光。

这一年来，我们一起经历了欢笑和泪水，一起成长，一起创造属于我们的回忆。感谢你一直以来的陪伴，让我的生活变得如此精彩。

期待和你一起创造更多美好的未来！`
        emotionIntensity = 85
      } else {
        content = `亲爱的，今天过得怎么样？

工作累不累？记得要好好照顾自己，按时吃饭，适当休息。

我知道你最近很辛苦，但请记住，我一直在你身边支持你。无论遇到什么困难，我们都可以一起面对。

晚上想吃什么？我可以准备你喜欢的食物，我们一起放松一下。`
        emotionIntensity = 75
      }

      setResult({
        content: content,
        suggestions: [
          '可以添加你们之间的具体回忆',
          '考虑加入一些个性化的细节',
          '可以增加对未来的美好期许',
          '尝试不同的情感表达方式'
        ],
        contentType: contentType === 'love' ? '情感表白' : contentType === 'anniversary' ? '纪念日祝福' : '日常关心',
        emotionIntensity,
        keywords: ['爱', '感谢', '幸福', '陪伴']
      })
      setIsGenerating(false)
    }, 2000)
  }

  const handleCopyExample = (content: string) => {
    navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const saveContent = () => {
    if (!result) return
    
    const content = result.content
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `情感内容_${new Date().getTime()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const shareContent = async () => {
    if (!result) return
    
    const shareText = `💕 情感内容分享\n\n${result.content.substring(0, 100)}...\n\n#丘比特AI #情感表达`
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: '情感内容分享',
          text: shareText
        })
      } catch (error) {
        console.log('分享取消')
      }
    } else {
      navigator.clipboard.writeText(result.content)
      alert('内容已复制到剪贴板，可以粘贴到聊天软件或社交媒体分享')
    }
  }

  return (
    <UsageGuard feature="content-creation">
      {({ canUse, remainingUses, onUse, isLoading, usageText }) => (
        <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
          {/* 全局导航栏 */}
          <GlobalNavbar />

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

              {/* 使用状态提示 */}
              <div className="max-w-4xl mx-auto mb-6">
                <UsageStatus feature="content-creation" className="justify-center" />
              </div>

              {/* 内容模板 */}
              <div className="max-w-4xl mx-auto mb-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Play className="h-5 w-5 text-rose-500 mr-2" />
                    快速开始模板
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    {contentTemplates.map((template, index) => (
                      <div 
                        key={index} 
                        className={`border rounded-lg p-4 hover:shadow-md transition-all cursor-pointer ${
                          contentType === template.type ? 'border-rose-500 bg-rose-50' : 'border-gray-200'
                        }`}
                        onClick={() => setContentType(template.type)}
                      >
                        <div className="flex items-center mb-2">
                          <div className={`p-2 rounded-full mr-2 ${
                            contentType === template.type ? 'bg-rose-500 text-white' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {template.icon}
                          </div>
                          <span className="text-sm font-medium">{template.title}</span>
                        </div>
                        <p className="text-xs text-gray-600">{template.prompt}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
                {/* 输入区域 */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">创作设置</h2>
                    <button
                      onClick={() => handleCopyExample(prompt)}
                      className="flex items-center space-x-1 text-sm text-gray-500 hover:text-gray-700"
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      <span>{copied ? '已复制' : '复制内容'}</span>
                    </button>
                  </div>
                  
                  {/* 内容提示 */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      内容提示
                    </label>
                    <textarea
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="请描述您想表达的内容...例如：想对伴侣表达爱意、纪念日祝福、日常关心等"
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
                    onClick={() => handleGenerate(onUse)}
                    disabled={!prompt.trim() || isGenerating || !canUse}
                    className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3 rounded-lg font-medium hover:from-rose-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isGenerating || isLoading ? '生成中...' : '生成内容'}
                  </button>
                  {!canUse && (
                    <p className="text-sm text-amber-600 mt-2 text-center">
                      使用次数已用完，请登录或等待重置
                    </p>
                  )}
                </div>

            {/* 生成结果 */}
            {result && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">生成结果</h2>
                  <div className="flex items-center space-x-2">
                    <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-sm font-medium">
                      {result.contentType}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
                      {result.emotionIntensity}% 情感强度
                    </span>
                  </div>
                </div>
                
                {/* 生成的内容 */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">生成内容</h3>
                  <div className="p-4 bg-rose-50 rounded-lg">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {result.content}
                    </p>
                  </div>
                </div>

                {/* 关键词 */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">关键词</h3>
                  <div className="flex flex-wrap gap-2">
                    {result.keywords.map((keyword, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                        #{keyword}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 优化建议 */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">优化建议</h3>
                  <ul className="space-y-3">
                    {result.suggestions.map((suggestion, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <Sparkles className="h-4 w-4 text-rose-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 操作按钮 */}
                <div className="flex space-x-4 pt-6 border-t border-gray-200">
                  <button 
                    onClick={saveContent}
                    className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                  >
                    <Download className="h-4 w-4" />
                    <span>保存内容</span>
                  </button>
                  <button 
                    onClick={shareContent}
                    className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <Share2 className="h-4 w-4" />
                    <span>分享</span>
                  </button>
                  <button 
                    onClick={() => {
                      setPrompt('')
                      setResult(null)
                    }}
                    className="flex items-center space-x-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    <span>重新生成</span>
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
      )}
    </UsageGuard>
  )
}