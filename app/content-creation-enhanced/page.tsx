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
  imageSuggestions: string[];
  hashtags: string[];
}

// 情感状态映射
const emotionMappings = {
  happy: { keywords: ['开心', '快乐', '幸福', '兴奋', '喜悦'], style: '活泼俏皮', intensity: 85 },
  romantic: { keywords: ['爱', '浪漫', '温柔', '深情', '甜蜜'], style: '诗意浪漫', intensity: 90 },
  grateful: { keywords: ['感谢', '感激', '感恩', '珍惜', '感动'], style: '深情款款', intensity: 80 },
  caring: { keywords: ['关心', '体贴', '照顾', '温暖', '支持'], style: '轻松随意', intensity: 75 },
  reflective: { keywords: ['思考', '回忆', '感悟', '成长', '经历'], style: '正式得体', intensity: 70 }
}

// 扩展平台适配配置
const platformConfigs = {
  wechat: { maxLength: 300, style: '轻松随意', emoji: '💬', hashtag: false, imageSupport: true },
  wechat_moment: { maxLength: 150, style: '文艺清新', emoji: '📱', hashtag: false, imageSupport: true },
  instagram: { maxLength: 200, style: '诗意浪漫', emoji: '📸', hashtag: true, imageSupport: true },
  douyin: { maxLength: 150, style: '活泼俏皮', emoji: '🎵', hashtag: true, imageSupport: true },
  xiaohongshu: { maxLength: 250, style: '正式得体', emoji: '📕', hashtag: true, imageSupport: true },
  weibo: { maxLength: 140, style: '简洁有力', emoji: '🐦', hashtag: true, imageSupport: true },
  tiktok: { maxLength: 100, style: '潮流时尚', emoji: '🎬', hashtag: true, imageSupport: true },
  telegram: { maxLength: 400, style: '自由表达', emoji: '✈️', hashtag: false, imageSupport: true },
  whatsapp: { maxLength: 350, style: '亲切自然', emoji: '💚', hashtag: false, imageSupport: true },
  email: { maxLength: 500, style: '正式得体', emoji: '📧', hashtag: false, imageSupport: true },
  letter: { maxLength: 1000, style: '深情款款', emoji: '✉️', hashtag: false, imageSupport: true }
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
  const [includeImage, setIncludeImage] = useState(true)
  const [selectedImageType, setSelectedImageType] = useState('romantic')
  const [userPreferences, setUserPreferences] = useState({
    preferredEmojis: ['❤️', '✨', '💕', '🌟'],
    tone: 'warm',
    signature: ''
  })

  // 扩展情感驱动的创意模板库（丰富示例）
  const emotionTemplates = {
    happy: [
      '今天的心情超级好！想和你分享这份快乐～就像阳光洒满心间，每一个细胞都在跳舞！',
      '和你在一起的每一天都充满阳光和欢笑，连空气都变得甜蜜起来～',
      '生活中的小确幸，因为有你的陪伴而更加美好！比如今天早上的咖啡特别香，因为想着你～',
      '刚刚看到一只超可爱的小猫，让我想起了你温柔的笑容，瞬间心情爆表💕',
      '今天完成了重要的项目！想和你一起庆祝这份喜悦，分享成功的喜悦！'
    ],
    romantic: [
      '亲爱的，我想对你说：遇见你是我生命中最美的意外，爱你是我做过最正确的决定❤️',
      '在这个特别的日子里，我想表达对你的爱意：时光荏苒，但爱你如初，永不褪色✨',
      '和你在一起的时光，是我最珍贵的礼物。每一个拥抱、每一次微笑都让我感到无比幸福～',
      '还记得我们第一次约会的地方吗？那里的灯光、音乐，还有你羞涩的笑容，我都记得清清楚楚💕',
      '想对你说：愿我们的爱如星辰大海，永恒而璀璨；如春风细雨，温柔而绵长🌙'
    ],
    grateful: [
      '感谢你一直以来的包容和支持，让我能够勇敢做自己，追逐梦想✨',
      '想对你说声谢谢，因为你的存在让我变成了更好的自己，学会了爱与珍惜❤️',
      '有你在我身边，我感到无比幸运。谢谢你陪我走过风雨，分享阳光～',
      '感谢你在我最需要的时候给予温暖，在我迷茫时指引方向，你是我的避风港💕',
      '想表达我的感激：谢谢你理解我的任性，包容我的小脾气，让我感受到被爱的幸福🌟'
    ],
    caring: [
      '今天过得怎么样？要注意休息哦～记得按时吃饭，工作再忙也要照顾好自己💪',
      '想提醒你一些重要的事情：天气转凉了，记得多穿衣服，别感冒了哦～',
      '我知道你最近很辛苦，想给你一些鼓励：你是最棒的！加油，我一直在你身边💕',
      '今天工作累不累？晚上想吃什么？我可以准备你喜欢的食物，一起放松一下～',
      '想对你说：无论遇到什么困难，记得我永远是你最坚强的后盾，我们一起面对🌈'
    ],
    reflective: [
      '最近在思考我们的关系，发现我们一起经历了很多美好的时光，感谢有你的陪伴💭',
      '回望过去的一年，我们一起成长，一起面对挑战，感谢彼此的坚持和支持🌱',
      '有时候会想，如果没有遇见你，我的生活会是什么样子？感谢命运让我们相遇✨',
      '在我们的关系中，我学到了很多：包容、理解、珍惜...这些都是你教会我的💕',
      '想和你一起规划未来：我们的梦想、目标，还有那些想要一起实现的愿望🌟'
    ]
  }

  // 配图建议库（基于情感和场景）
  const imageSuggestions = {
    romantic: [
      '浪漫的日落或星空照片',
      '牵手或拥抱的温馨画面',
      '鲜花或烛光晚餐场景',
      '海边或山景的浪漫时刻',
      '纪念日特别时刻的回忆'
    ],
    happy: [
      '阳光明媚的户外活动',
      '笑脸或庆祝的欢乐瞬间',
      '美食或旅行中的快乐时刻',
      '宠物或可爱事物的萌照',
      '色彩鲜艳的活力场景'
    ],
    grateful: [
      '温馨的家庭或朋友聚会',
      '感恩主题的温馨画面',
      '帮助或支持的温暖瞬间',
      '成长或进步的见证时刻',
      '简单而美好的生活片段'
    ],
    caring: [
      '关心照顾的温馨场景',
      '健康生活的积极画面',
      '放松休息的舒适时刻',
      '互相支持的温暖瞬间',
      '日常生活中的小确幸'
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
    let hashtags: string[] = []
    if (config.hashtag) {
      hashtags = ['#情感表达', '#情侣日常', '#爱情故事', '#幸福时刻']
      optimized += `\n${hashtags.slice(0, 2).join(' ')}`
    }
    
    return { content: optimized, hashtags }
  }

  // 生成配图建议
  const generateImageSuggestions = (emotion: string) => {
    const suggestions = imageSuggestions[emotion as keyof typeof imageSuggestions] || imageSuggestions.romantic
    return suggestions.slice(0, 3) // 返回前3个建议
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
      const { content: platformOptimized, hashtags } = optimizeForPlatform(content, platform)
      
      // 预测共鸣度
      const resonanceScore = predictResonance(content, detectedEmotion)
      
      // 计算阅读时间
      const readingTime = Math.ceil(content.length / 200) // 假设200字/分钟
      
      // 生成配图建议
      const imageSuggestions = includeImage ? generateImageSuggestions(detectedEmotion) : []
      
      setResult({
        content: platformOptimized,
        suggestions: [
          '可以添加你们之间的具体回忆',
          '考虑加入一些个性化的细节',
          '可以增加对未来的美好期许',
          '尝试不同的情感表达方式'
        ],
        contentType: `${detectedEmotion === 'romantic' ? '情感表达' : detectedEmotion === 'grateful' ? '感谢表达' : detectedEmotion === 'happy' ? '快乐分享' : '日常关心'}`,
        emotionIntensity: emotionConfig.intensity,
        keywords: emotionConfig.keywords.slice(0, 4),
        platform: platform,
        resonanceScore: resonanceScore,
        style: emotionConfig.style,
        estimatedReadingTime: readingTime,
        imageSuggestions: imageSuggestions,
        hashtags: hashtags
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
                          <option value="wechat">💬 微信聊天</option>
                          <option value="wechat_moment">📱 微信朋友圈</option>
                          <option value="instagram">📸 Instagram</option>
                          <option value="douyin">🎵 抖音</option>
                          <option value="xiaohongshu">📕 小红书</option>
                          <option value="weibo">🐦 微博</option>
                          <option value="tiktok">🎬 TikTok</option>
                          <option value="telegram">✈️ Telegram</option>
                          <option value="whatsapp">💚 WhatsApp</option>
                          <option value="email">📧 邮件</option>
                          <option value="letter">✉️ 书信</option>
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

                    {/* 配图设置 */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        配图设置
                      </label>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="includeImage"
                            checked={includeImage}
                            onChange={(e) => setIncludeImage(e.target.checked)}
                            className="h-4 w-4 text-rose-500 focus:ring-rose-500 border-gray-300 rounded"
                          />
                          <label htmlFor="includeImage" className="text-sm text-gray-700">
                            生成配图建议
                          </label>
                        </div>
                        
                        {includeImage && (
                          <div>
                            <label className="block text-sm text-gray-600 mb-2">配图风格</label>
                            <div className="grid grid-cols-3 gap-2">
                              {['romantic', 'happy', 'grateful', 'caring', 'reflective'].map((type) => (
                                <button
                                  key={type}
                                  type="button"
                                  onClick={() => setSelectedImageType(type)}
                                  className={`p-2 rounded text-xs font-medium transition-all ${
                                    selectedImageType === type 
                                      ? 'bg-rose-500 text-white' 
                                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                  }`}
                                >
                                  {type === 'romantic' ? '浪漫' : 
                                   type === 'happy' ? '快乐' : 
                                   type === 'grateful' ? '感恩' : 
                                   type === 'caring' ? '关心' : '思考'}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
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

                      {/* 配图建议 */}
                      {result.imageSuggestions && result.imageSuggestions.length > 0 && (
                        <div className="mb-6">
                          <h4 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                            <span className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-2">
                              <span className="text-white text-xs">📷</span>
                            </span>
                            配图建议
                          </h4>
                          <div className="bg-purple-50 rounded-lg p-4">
                            <ul className="space-y-2">
                              {result.imageSuggestions.map((suggestion, index) => (
                                <li key={index} className="flex items-start space-x-2">
                                  <span className="text-purple-500 mt-0.5">•</span>
                                  <span className="text-gray-700 text-sm">{suggestion}</span>
                                </li>
                              ))}
                            </ul>
                            <p className="text-xs text-purple-600 mt-2">
                              💡 建议：使用高质量、情感匹配的图片效果更佳
                            </p>
                          </div>
                        </div>
                      )}

                      {/* 标签建议 */}
                      {result.hashtags && result.hashtags.length > 0 && (
                        <div className="mb-6">
                          <h4 className="text-lg font-medium text-gray-900 mb-3">标签建议</h4>
                          <div className="flex flex-wrap gap-2">
                            {result.hashtags.map((tag, index) => (
                              <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

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