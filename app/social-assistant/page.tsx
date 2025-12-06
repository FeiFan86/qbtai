'use client'

import React, { useState } from 'react'
import { Users, MessageCircle, TrendingUp, Award, Play, Copy, Check, Heart, Download, Share2 } from 'lucide-react'
import GlobalNavbar from '@/components/global-navbar'
import UsageGuard, { UsageStatus } from '@/components/usage-guard'

interface CommunicationAnalysis {
  overallScore: number;
  communicationStyle: string;
  emotionalIntelligence: number;
  activeListening: number;
  conflictResolution: number;
  suggestions: string[];
  strengths: string[];
  areasForImprovement: string[];
  relationshipImpact: '高积极影响' | '中等积极影响' | '需要关注';
  conversationType: string;
}

export default function SocialAssistantPage() {
  const [conversation, setConversation] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<CommunicationAnalysis | null>(null)
  const [copied, setCopied] = useState(false)

  // 情侣沟通场景示例
  const conversationExamples = [
    {
      title: '日常关心对话',
      content: '你今天过得怎么样？工作累不累？我有点担心你最近总是加班，要注意休息啊。'
    },
    {
      title: '矛盾沟通场景',
      content: '我觉得我们最近沟通有点少，你总是很忙，我有时候会感到孤单。希望我们能多些时间在一起。'
    },
    {
      title: '情感表达对话',
      content: '我想告诉你，和你在一起让我感到非常幸福。你的存在让我的生活变得更有意义。'
    }
  ]

  const handleAnalyze = async (onRecordUsage: () => Promise<void>) => {
    if (!conversation.trim()) return
    
    setIsAnalyzing(true)
    
    // 记录使用次数
    await onRecordUsage()
    
    // 模拟情侣沟通分析API调用
    setTimeout(() => {
      const text = conversation.toLowerCase()
      let analysis: CommunicationAnalysis = {
        overallScore: 75,
        communicationStyle: '开放型',
        emotionalIntelligence: 70,
        activeListening: 65,
        conflictResolution: 68,
        suggestions: [],
        strengths: [],
        areasForImprovement: [],
        relationshipImpact: '中等积极影响',
        conversationType: '日常交流'
      }

      // 基于内容的分析逻辑
      if (text.includes('担心') || text.includes('关心') || text.includes('注意')) {
        analysis.strengths.push('表现出关心和体贴')
        analysis.emotionalIntelligence = 80
        analysis.conversationType = '关心表达'
      }
      
      if (text.includes('孤单') || text.includes('沟通少') || text.includes('希望')) {
        analysis.areasForImprovement.push('需要更多主动沟通')
        analysis.conflictResolution = 75
        analysis.conversationType = '需求表达'
      }
      
      if (text.includes('幸福') || text.includes('有意义') || text.includes('感谢')) {
        analysis.strengths.push('积极的情感表达')
        analysis.relationshipImpact = '高积极影响'
        analysis.overallScore = 88
        analysis.conversationType = '情感表达'
      }

      // 默认建议
      analysis.suggestions = [
        '尝试使用"我"开头的表达方式，减少指责性语言',
        '在表达需求时，同时表达对对方的理解',
        '增加具体的赞美和感谢',
        '定期安排专属的沟通时间'
      ]

      // 补充优势和待改进
      if (analysis.strengths.length === 0) {
        analysis.strengths = ['表达清晰', '情感真诚']
      }
      
      if (analysis.areasForImprovement.length === 0) {
        analysis.areasForImprovement = ['可以增加更多情感词汇', '建议更具体地表达需求']
      }

      setResult(analysis)
      setIsAnalyzing(false)
    }, 2000)
  }

  const handleCopyExample = (content: string) => {
    navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const generateCommunicationReport = () => {
    if (!result) return
    
    const reportContent = `
# 情侣沟通分析报告

## 沟通概况
- 总体评分: ${result.overallScore}/100
- 沟通风格: ${result.communicationStyle}
- 对话类型: ${result.conversationType}
- 关系影响: ${result.relationshipImpact}

## 能力评估
- 情商指数: ${result.emotionalIntelligence}/100
- 积极倾听: ${result.activeListening}/100
- 冲突解决: ${result.conflictResolution}/100

## 沟通优势
${result.strengths.map(strength => `- ${strength}`).join('\n')}

## 改进建议
${result.areasForImprovement.map(area => `- ${area}`).join('\n')}

## 具体建议
${result.suggestions.map(suggestion => `- ${suggestion}`).join('\n')}

---
分析时间: ${new Date().toLocaleString()}
工具: 丘比特AI社交助手
    `.trim()

    const blob = new Blob([reportContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `沟通分析报告_${new Date().getTime()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const shareAnalysis = async () => {
    if (!result) return
    
    const shareText = `💬 沟通分析结果\n\n评分: ${result.overallScore}/100\n风格: ${result.communicationStyle}\n类型: ${result.conversationType}\n\n#丘比特AI #情侣沟通`
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: '情侣沟通分析',
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

              {/* 示例展示区 */}
              <div className="max-w-4xl mx-auto mb-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Play className="h-5 w-5 text-rose-500 mr-2" />
                    情侣沟通场景示例
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    {conversationExamples.map((example, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-rose-200 transition-colors">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">{example.title}</h4>
                        <p className="text-xs text-gray-600 mb-3 line-clamp-3">{example.content}</p>
                        <button
                          onClick={() => {
                            setConversation(example.content)
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

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            {/* 输入区域 */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">对话内容</h2>
                <button
                  onClick={() => handleCopyExample(conversation)}
                  className="flex items-center space-x-1 text-sm text-gray-500 hover:text-gray-700"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  <span>{copied ? '已复制' : '复制内容'}</span>
                </button>
              </div>
              <textarea
                value={conversation}
                onChange={(e) => setConversation(e.target.value)}
                placeholder="请输入对话内容，描述沟通场景...例如：情侣日常关心、矛盾沟通、情感表达等"
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
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">沟通分析结果</h2>
                  <div className="flex items-center space-x-2">
                    <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-sm font-medium">
                      {result.relationshipImpact}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
                      {result.conversationType}
                    </span>
                  </div>
                </div>
                
                {/* 能力评估网格 */}
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-rose-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-rose-600 mb-1">{result.overallScore}</div>
                    <div className="text-sm text-rose-700">总体评分</div>
                    <div className="w-full bg-rose-200 rounded-full h-1 mt-2">
                      <div 
                        className="h-1 rounded-full bg-rose-500"
                        style={{ width: `${result.overallScore}%` }}
                      />
                    </div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">{result.emotionalIntelligence}</div>
                    <div className="text-sm text-blue-700">情商指数</div>
                    <div className="w-full bg-blue-200 rounded-full h-1 mt-2">
                      <div 
                        className="h-1 rounded-full bg-blue-500"
                        style={{ width: `${result.emotionalIntelligence}%` }}
                      />
                    </div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600 mb-1">{result.conflictResolution}</div>
                    <div className="text-sm text-purple-700">冲突解决</div>
                    <div className="w-full bg-purple-200 rounded-full h-1 mt-2">
                      <div 
                        className="h-1 rounded-full bg-purple-500"
                        style={{ width: `${result.conflictResolution}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* 沟通风格 */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">沟通风格</h3>
                  <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
                    <span className="text-gray-600">主要风格</span>
                    <span className="text-lg font-semibold text-purple-600">{result.communicationStyle}</span>
                  </div>
                </div>

                {/* 沟通优势 */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">沟通优势</h3>
                  <div className="bg-green-50 rounded-lg p-4">
                    <ul className="space-y-2">
                      {result.strengths.map((strength, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <Heart className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-green-700">{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* 改进建议 */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">改进建议</h3>
                  <ul className="space-y-3">
                    {result.areasForImprovement.map((area, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600">{area}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 具体建议 */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">具体建议</h3>
                  <ul className="space-y-3">
                    {result.suggestions.map((suggestion, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-rose-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600">{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 操作按钮 */}
                <div className="flex space-x-4 pt-6 border-t border-gray-200">
                  <button 
                    onClick={generateCommunicationReport}
                    className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                  >
                    <Download className="h-4 w-4" />
                    <span>下载报告</span>
                  </button>
                  <button 
                    onClick={shareAnalysis}
                    className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <Share2 className="h-4 w-4" />
                    <span>分享结果</span>
                  </button>
                  <button 
                    onClick={() => {
                      setConversation('')
                      setResult(null)
                    }}
                    className="flex items-center space-x-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    <span>重新分析</span>
                  </button>
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