'use client'

import React, { useState } from 'react'
import { Brain, MessageCircle, BarChart3, Download, Share2, Play, Copy, Check } from 'lucide-react'
import GlobalNavbar from '@/components/global-navbar'
import UsageGuard, { UsageStatus } from '@/components/usage-guard'

interface Emotion {
  name: string;
  score: number;
  color: string;
  description: string;
}

interface AnalysisResult {
  emotions: Emotion[];
  summary: string;
  relationshipImpact: string;
  suggestions: string[];
  intensity: number;
  keywords: string[];
}

export default function EmotionAnalysisPage() {
  const [inputText, setInputText] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [copied, setCopied] = useState(false)

  // 示例文本
  const examples = [
    {
      title: '情侣日常对话',
      content: '今天真的很想你，虽然才分开几个小时，但感觉时间过得好慢。期待晚上和你视频，想和你分享今天发生的趣事。'
    },
    {
      title: '情感表达',
      content: '和你在一起的每一天都让我感到无比幸福，你的笑容是我最大的动力。谢谢你一直以来的包容和支持。'
    },
    {
      title: '矛盾沟通',
      content: '我知道我们最近有些小矛盾，但我想告诉你，我真的很在乎我们的关系。希望我们能好好沟通，一起解决问题。'
    }
  ]

  const handleAnalyze = async (onRecordUsage: () => Promise<void>) => {
    if (!inputText.trim()) return
    
    setIsAnalyzing(true)
    
    // 记录使用次数
    await onRecordUsage()
    
    // 模拟情侣情感分析API调用
    setTimeout(() => {
      // 基于输入内容的情感分析逻辑
      const text = inputText.toLowerCase()
      let emotions: Emotion[] = []
      let intensity = 70
      
      if (text.includes('想') && text.includes('你')) {
        emotions.push({ 
          name: '思念', 
          score: 85, 
          color: 'text-purple-500',
          description: '强烈的情感依恋和思念之情'
        })
        intensity = 85
      }
      
      if (text.includes('幸福') || text.includes('快乐') || text.includes('开心')) {
        emotions.push({ 
          name: '幸福', 
          score: 90, 
          color: 'text-green-500',
          description: '积极的幸福感体验'
        })
      }
      
      if (text.includes('爱') || text.includes('在乎') || text.includes('重要')) {
        emotions.push({ 
          name: '爱意', 
          score: 88, 
          color: 'text-rose-500',
          description: '深厚的爱和情感投入'
        })
      }
      
      if (text.includes('矛盾') || text.includes('问题') || text.includes('沟通')) {
        emotions.push({ 
          name: '建设性', 
          score: 75, 
          color: 'text-blue-500',
          description: '积极的解决问题态度'
        })
        intensity = 65
      }
      
      // 默认情感
      if (emotions.length === 0) {
        emotions = [
          { name: '积极', score: 70, color: 'text-green-500', description: '总体积极的情感状态' },
          { name: '期待', score: 65, color: 'text-yellow-500', description: '对未来充满期待' },
          { name: '信任', score: 75, color: 'text-blue-500', description: '关系中的信任感' },
        ]
      }

      setResult({
        emotions: emotions.slice(0, 3),
        summary: `这段文字展现了${intensity > 70 ? '强烈' : '中等'}的情感表达，主要体现了情侣间的情感交流和理解。`,
        relationshipImpact: intensity > 80 ? '高积极影响' : intensity > 60 ? '中等积极影响' : '需要关注',
        suggestions: [
          '尝试在沟通中更多表达具体感受',
          '可以增加一些情感记忆的分享',
          '建议定期进行情感交流',
          '保持良好的情感表达习惯'
        ],
        intensity,
        keywords: ['情感交流', '理解', '表达', '关系']
      })
      setIsAnalyzing(false)
    }, 2000)
  }

  const handleCopyExample = (content: string) => {
    navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const generateReport = () => {
    if (!result) return
    
    const reportContent = `
# 情感分析报告

## 分析结果
- 情感强度: ${result.intensity}%
- 关系影响: ${result.relationshipImpact}

## 主要情感
${result.emotions.map(emotion => `- ${emotion.name}: ${emotion.score}% (${emotion.description})`).join('\n')}

## 分析总结
${result.summary}

## 建议
${result.suggestions.map(suggestion => `- ${suggestion}`).join('\n')}

---
分析时间: ${new Date().toLocaleString()}
工具: 丘比特AI情感助手
    `.trim()

    const blob = new Blob([reportContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `情感分析报告_${new Date().getTime()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const shareResult = async () => {
    if (!result) return
    
    const shareText = `🎯 情感分析结果\n\n${result.summary}\n\n主要情感: ${result.emotions.map(e => e.name).join(', ')}\n\n#丘比特AI #情感分析`
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: '情感分析结果',
          text: shareText
        })
      } catch (error) {
        console.log('分享取消')
      }
    } else {
      navigator.clipboard.writeText(shareText)
      alert('分析结果已复制到剪贴板，可以粘贴到社交媒体分享')
    }
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

              {/* 示例展示区 */}
              <div className="max-w-4xl mx-auto mb-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Play className="h-5 w-5 text-rose-500 mr-2" />
                    快速开始示例
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    {examples.map((example, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-rose-200 transition-colors">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">{example.title}</h4>
                        <p className="text-xs text-gray-600 mb-3 line-clamp-3">{example.content}</p>
                        <button
                          onClick={() => {
                            setInputText(example.content)
                            setResult(null)
                          }}
                          className="w-full bg-rose-50 text-rose-600 py-1 rounded text-xs font-medium hover:bg-rose-100 transition-colors"
                        >
                          使用此示例
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 分析输入区 */}
              <div className="max-w-4xl mx-auto mb-8">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">情感分析输入</h3>
                    <button
                      onClick={() => handleCopyExample(inputText)}
                      className="flex items-center space-x-1 text-sm text-gray-500 hover:text-gray-700"
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      <span>{copied ? '已复制' : '复制内容'}</span>
                    </button>
                  </div>
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="请输入您想要分析的文字内容...例如：今天和伴侣的对话、情感表达、矛盾沟通等"
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
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">情感分析结果</h2>
                  <div className="flex items-center space-x-2">
                    <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-sm font-medium">
                      {result.relationshipImpact}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
                      {result.intensity}% 强度
                    </span>
                  </div>
                </div>
                
                {/* 情感分布 */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">情感分布</h3>
                  <div className="space-y-4">
                    {result.emotions.map((emotion, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className={`font-medium ${emotion.color}`}>
                            {emotion.name}
                          </span>
                          <span className="text-sm text-gray-500">{emotion.description}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div 
                              className={`h-3 rounded-full ${emotion.color.replace('text', 'bg')}`}
                              style={{ width: `${emotion.score}%` }}
                            />
                          </div>
                          <span className="text-sm font-bold text-gray-700 w-12">
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
                  <p className="text-gray-700 leading-relaxed bg-rose-50 p-4 rounded-lg">
                    {result.summary}
                  </p>
                </div>

                {/* 关键词和建议 */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">关键词</h3>
                    <div className="flex flex-wrap gap-2">
                      {result.keywords.map((keyword, index) => (
                        <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                          #{keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">改善建议</h3>
                    <ul className="space-y-2">
                      {result.suggestions.map((suggestion, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-rose-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-600">{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* 操作按钮 */}
                <div className="flex space-x-4 pt-6 border-t border-gray-200">
                  <button 
                    onClick={generateReport}
                    className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                  >
                    <Download className="h-4 w-4" />
                    <span>下载报告</span>
                  </button>
                  <button 
                    onClick={shareResult}
                    className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <Share2 className="h-4 w-4" />
                    <span>分享结果</span>
                  </button>
                  <button 
                    onClick={() => {
                      setInputText('')
                      setResult(null)
                    }}
                    className="flex items-center space-x-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    <span>重新分析</span>
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