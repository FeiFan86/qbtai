'use client'

import React, { useState, useEffect } from 'react'
import { 
  PenTool, Sparkles, Download, Share2, Play, Copy, Check, Heart, 
  Calendar, MessageCircle, Brain, TrendingUp, Zap, Smartphone,
  ThumbsUp, Users, Target, Palette, BarChart3, Clock
} from 'lucide-react'
import GlobalNavbar from '@/components/global-navbar'
import UsageGuard, { UsageStatus } from '@/components/usage-guard'

interface GenerationResult {
  content: string;
  suggestions: string[];
  contentType: string;
  emotionIntensity: number;
  keywords: string[];
  platform: string;
  resonanceScore: number;
  style: string;
  estimatedReadingTime: number;
}

// 情感状态映射
const emotionMappings = {
  happy: { keywords: ['开心', '快乐', '幸福', '兴奋', '喜悦'], style: '活泼俏皮', intensity: 85 },
  romantic: { keywords: ['爱', '浪漫', '温柔', '深情', '甜蜜'], style: '诗意浪漫', intensity: 90 },
  grateful: { keywords: ['感谢', '感激', '感恩', '珍惜', '感动'], style: '深情款款', intensity: 80 },
  caring: { keywords: ['关心', '体贴', '照顾', '温暖', '支持'], style: '轻松随意', intensity: 75 },
  reflective: { keywords: ['思考', '回忆', '感悟', '成长', '经历'], style: '正式得体', intensity: 70 }
}

// 平台适配配置
const platformConfigs = {
  wechat: { maxLength: 300, style: '轻松随意', emoji: '💬', hashtag: false },
  instagram: { maxLength: 200, style: '诗意浪漫', emoji: '📸', hashtag: true },
  douyin: { maxLength: 150, style: '活泼俏皮', emoji: '🎵', hashtag: true },
  xiaohongshu: { maxLength: 250, style: '正式得体', emoji: '📕', hashtag: true },
  email: { maxLength: 500, style: '正式得体', emoji: '📧', hashtag: false }
}

export default function ContentCreationEnhancedPage() {
  const [prompt, setPrompt] = useState('')
  const [style, setStyle] = useState('casual')
  const [length, setLength] = useState('medium')
  const [contentType, setContentType] = useState('love')
  const [platform, setPlatform] = useState('wechat')
  const [currentEmotion, setCurrentEmotion] = useState('romantic')
  const [isGenerating, setIsGenerating] = useState(false)
  const [result, setResult] = useState<GenerationResult | null>(null)
  const [copied, setCopied] = useState(false)
  const [userPreferences, setUserPreferences] = useState({
    preferredEmojis: ['❤️', '✨', '💕', '🌟'],
    tone: 'warm',
    signature: ''
  })

  // 情感驱动的创意模板库
  const emotionTemplates = {
    happy: [
      '今天的心情超级好！想和你分享这份快乐～',
      '和你在一起的每一天都充满阳光和欢笑',
      '生活中的小确幸，因为有你的陪伴而更加美好'
    ],
    romantic: [
      '亲爱的，我想对你说...',
      '在这个特别的日子里，我想表达对你的爱意',
      '和你在一起的时光，是我最珍贵的礼物'
    ],
    grateful: [
      '感谢你一直以来的包容和支持',
      '想对你说声谢谢，因为...',
      '有你在我身边，我感到无比幸运'
    ],
    caring: [
      '今天过得怎么样？要注意休息哦',
      '想提醒你一些重要的事情...',
      '我知道你最近很辛苦，想给你一些鼓励'
    ]
  }

  // 检测情感状态
  const detectEmotion = (text: string) => {
    const lowerText = text.toLowerCase()
    for (const [emotion, config] of Object.entries(emotionMappings)) {
      if (config.keywords.some(keyword => lowerText.includes(keyword))) {
        return emotion
      }
    }
    return 'romantic' // 默认浪漫情感
  }

  // 预测情感共鸣度
  const predictResonance = (content: string, targetEmotion: string) => {
    let score = 70
    
    // 基于情感匹配度
    const emotionMatch = targetEmotion === currentEmotion ? 20 : 10
    score += emotionMatch
    
    // 基于内容长度
    const lengthBonus = content.length > 100 ? 10 : 5
    score += lengthBonus
    
    // 基于个性化元素
    const personalBonus = userPreferences.signature ? 15 : 0
    score += personalBonus
    
    return Math.min(score, 95)
  }

  // 平台适配优化
  const optimizeForPlatform = (content: string, platform: string) => {
    const config = platformConfigs[platform as keyof typeof platformConfigs]
    let optimized = content
    
    // 长度控制
    if (optimized.length > config.maxLength) {
      optimized = optimized.substring(0, config.maxLength - 3) + '...'
    }
    
    // 添加表情符号
    if (userPreferences.preferredEmojis.length > 0) {
      optimized += ` ${userPreferences.preferredEmojis[0]}`
    }
    
    // 添加标签（如果需要）
    if (config.hashtag) {
      optimized += '\n#情感表达 #情侣日常'
    }
    
    return optimized
  }

  // 生成个性化内容
  const generatePersonalizedContent = (emotion: string) => {
    const templates = emotionTemplates[emotion as keyof typeof emotionTemplates]
    const randomTemplate = templates[Math.floor(Math.random() * templates.length)]
    
    let content = randomTemplate
    
    // 添加个性化元素
    if (userPreferences.signature) {
      content += `\n\n${userPreferences.signature}`
    }
    
    return content
  }

  const handleGenerate = async (onRecordUsage: () => Promise<void>) => {
    if (!prompt.trim()) return
    
    setIsGenerating(true)
    
    // 记录使用次数
    await onRecordUsage()
    
    // 检测情感状态
    const detectedEmotion = detectEmotion(prompt)
    setCurrentEmotion(detectedEmotion)
    
    // 模拟生成过程
    setTimeout(() => {
      const emotionConfig = emotionMappings[detectedEmotion as keyof typeof emotionMappings]
      
      // 生成基础内容
      let content = generatePersonalizedContent(detectedEmotion)
      
      // 平台适配
      const platformOptimized = optimizeForPlatform(content, platform)
      
      // 预测共鸣度
      const resonanceScore = predictResonance(content, detectedEmotion)
      
      // 计算阅读时间
      const readingTime = Math.ceil(content.length / 200) // 假设200字/分钟
      
      setResult({
        content: platformOptimized,
        suggestions: [
          '可以添加你们之间的具体回忆',
          '考虑加入一些个性化的细节',
          '可以增加对未来的美好期许',
          '尝试不同的情感表达方式'
        ],
        contentType: `${detectedEmotion === 'romantic' ? '情感表达' : detectedEmotion === 'grateful' ? '感谢表达' : '日常关心'}`,
        emotionIntensity: emotionConfig.intensity,
        keywords: emotionConfig.keywords.slice(0, 4),
        platform: platform,
        resonanceScore: resonanceScore,
        style: emotionConfig.style,
        estimatedReadingTime: readingTime
      })
      setIsGenerating(false)
    }, 2500)
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
                  <Zap className="h-5 w-5 text-rose-500 mr-2" />
                  <span className="text-sm font-medium text-gray-700">智能内容创作</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  AI智能内容生成器
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  基于情感分析的多平台智能内容创作，让您的表达更加精准动人
                </p>
              </div>

              {/* 使用状态提示 */}
              <div className="max-w-4xl mx-auto mb-6">
                <UsageStatus feature="content-creation" className="justify-center" />
              </div>

              {/* 智能分析面板 */}
              <div className="max-w-4xl mx-auto mb-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Brain className="h-5 w-5 text-rose-500 mr-2" />
                    智能情感分析
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <Target className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                      <div className="text-sm font-medium text-gray-700">检测情感</div>
                      <div className="text-lg font-bold text-blue-600">{currentEmotion === 'romantic' ? '浪漫' : currentEmotion === 'happy' ? '快乐' : '感恩'}</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <TrendingUp className="h-8 w-8 text-green-500 mx-auto mb-2" />
                      <div className="text-sm font-medium text-gray-700">共鸣预测</div>
                      <div className="text-lg font-bold text-green-600">{result ? `${result.resonanceScore}%` : '--%'}</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <Smartphone className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                      <div className="text-sm font-medium text-gray-700">平台适配</div>
                      <div className="text-lg font-bold text-purple-600">
                        {platform === 'wechat' ? '微信' : platform === 'instagram' ? 'Ins' : '抖音'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="max-w-4xl mx-auto grid lg:grid-cols-3 gap-8">
                {/* 左侧 - 创作设置 */}
                <div className="lg:col-span-2 space-y-6">
                  {/* 情感驱动创作 */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Heart className="h-5 w-5 text-rose-500 mr-2" />
                      情感驱动创作
                    </h3>
                    
                    {/* 情感选择 */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        当前情感状态
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {Object.entries(emotionMappings).map(([key, config]) => (
                          <button
                            key={key}
                            onClick={() => setCurrentEmotion(key)}
                            className={`p-3 rounded-lg text-sm font-medium transition-all ${
                              currentEmotion === key 
                                ? 'bg-rose-500 text-white' 
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {key === 'romantic' ? '浪漫' : key === 'happy' ? '快乐' : key === 'grateful' ? '感恩' : '关心'}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* 内容提示 */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        内容提示（基于当前情感）
                      </label>
                      <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder={
                          currentEmotion === 'romantic' ? '描述您想表达的浪漫情感...' :
                          currentEmotion === 'happy' ? '分享您的快乐时刻...' :
                          '表达您的感谢和珍惜...'
                        }
                        className="w-full h-32 p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                      />
                    </div>

                    {/* 平台选择 */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          发布平台
                        </label>
                        <select
                          value={platform}
                          onChange={(e) => setPlatform(e.target.value)}
                          className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                        >
                          <option value="wechat">💬 微信/朋友圈</option>
                          <option value="instagram">📸 Instagram</option>
                          <option value="douyin">🎵 抖音</option>
                          <option value="xiaohongshu">📕 小红书</option>
                          <option value="email">📧 邮件</option>
                        </select>
                      </div>
                      
                      <div>
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
                    </div>

                    <button
                      onClick={() => handleGenerate(onUse)}
                      disabled={!prompt.trim() || isGenerating || !canUse}
                      className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3 rounded-lg font-medium hover:from-rose-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isGenerating || isLoading ? '智能生成中...' : '智能生成内容'}
                    </button>
                  </div>

                  {/* 生成结果 */}
                  {result && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-semibold text-gray-900">生成结果</h3>
                        <div className="flex items-center space-x-2">
                          <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-sm font-medium">
                            {result.contentType}
                          </span>
                          <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
                            共鸣度: {result.resonanceScore}%
                          </span>
                          <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                            {result.estimatedReadingTime}分钟阅读
                          </span>
                        </div>
                      </div>
                      
                      {/* 平台适配预览 */}
                      <div className="mb-6">
                        <div className="flex items-center mb-3">
                          <Smartphone className="h-4 w-4 text-gray-500 mr-2" />
                          <span className="text-sm font-medium text-gray-700">
                            {platform === 'wechat' ? '微信适配' : platform === 'instagram' ? 'Instagram优化' : '抖音风格'}
                          </span>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg border">
                          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                            {result.content}
                          </p>
                        </div>
                      </div>

                      {/* 数据分析 */}
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="text-center p-3 bg-rose-50 rounded-lg">
                          <div className="text-sm text-gray-600">情感强度</div>
                          <div className="text-lg font-bold text-rose-600">{result.emotionIntensity}%</div>
                        </div>
                        <div className="text-center p-3 bg-blue-50 rounded-lg">
                          <div className="text-sm text-gray-600">内容长度</div>
                          <div className="text-lg font-bold text-blue-600">{result.content.length}字</div>
                        </div>
                        <div className="text-center p-3 bg-green-50 rounded-lg">
                          <div className="text-sm text-gray-600">风格匹配</div>
                          <div className="text-lg font-bold text-green-600">{result.style}</div>
                        </div>
                      </div>

                      {/* 操作按钮 */}
                      <div className="flex space-x-3">
                        <button 
                          onClick={saveContent}
                          className="flex-1 flex items-center justify-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                        >
                          <Download className="h-4 w-4" />
                          <span>保存</span>
                        </button>
                        <button 
                          onClick={shareContent}
                          className="flex-1 flex items-center justify-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                        >
                          <Share2 className="h-4 w-4" />
                          <span>分享</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* 右侧 - 智能分析 */}
                <div className="space-y-6">
                  {/* 情感共鸣预测 */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <TrendingUp className="h-4 w-4 text-green-500 mr-2" />
                      共鸣度预测
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">情感匹配度</span>
                        <span className="text-sm font-medium text-green-600">
                          {result ? Math.min(result.resonanceScore + 10, 95) : 85}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">个性化程度</span>
                        <span className="text-sm font-medium text-blue-600">
                          {userPreferences.signature ? '高' : '中'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">平台适配度</span>
                        <span className="text-sm font-medium text-purple-600">优秀</span>
                      </div>
                    </div>
                  </div>

                  {/* 个性化设置 */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <Users className="h-4 w-4 text-rose-500 mr-2" />
                      个性化设置
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">个性签名</label>
                        <input
                          type="text"
                          value={userPreferences.signature}
                          onChange={(e) => setUserPreferences(prev => ({...prev, signature: e.target.value}))}
                          placeholder="例如：爱你的XX"
                          className="w-full p-2 border border-gray-200 rounded text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">偏好表情</label>
                        <div className="flex space-x-2">
                          {userPreferences.preferredEmojis.map((emoji, index) => (
                            <span key={index} className="text-lg">{emoji}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 模板库 */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <Palette className="h-4 w-4 text-purple-500 mr-2" />
                      情感模板库
                    </h4>
                    <div className="space-y-2">
                      {Object.entries(emotionTemplates).map(([emotion, templates]) => (
                        <div key={emotion} className="text-sm">
                          <span className="font-medium text-gray-700">
                            {emotion === 'romantic' ? '浪漫' : emotion === 'happy' ? '快乐' : '感恩'}:
                          </span>
                          <p className="text-gray-600 truncate">{templates[0]}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 功能特色 */}
              <div className="max-w-4xl mx-auto mt-12">
                <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">智能创作特色</h2>
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center p-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Brain className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">情感驱动</h3>
                    <p className="text-gray-600 text-sm">基于实时情感状态智能生成匹配内容</p>
                  </div>
                  <div className="text-center p-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Smartphone className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">多平台适配</h3>
                    <p className="text-gray-600 text-sm">自动优化内容格式适应不同社交平台</p>
                  </div>
                  <div className="text-center p-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <TrendingUp className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">共鸣预测</h3>
                    <p className="text-gray-600 text-sm">AI预测内容的情感共鸣效果</p>
                  </div>
                  <div className="text-center p-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Palette className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">个性化模板</h3>
                    <p className="text-gray-600 text-sm">基于用户偏好建立个性化文案库</p>
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
                    <Zap className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-gray-900 font-semibold">丘比特AI智能创作</span>
                </div>
                <p className="text-gray-600 text-sm">
                  © 2024 情感驱动的智能内容创作平台. 让表达更精准，让爱更动人.
                </p>
              </div>
            </div>
          </footer>
        </div>
      )}
    </UsageGuard>
  )
}