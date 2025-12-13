'use client'

import React, { useState } from 'react'
import { Users, MessageCircle, TrendingUp, Award, Play, Copy, Check, Heart, Download, Share2, Mic, Volume2, Zap, Lightbulb, FileText, Clock, BarChart3, TrendingUp as TrendingUpIcon, GitCompare } from 'lucide-react'
import GlobalNavbar from '@/components/global-navbar'
import UsageGuard from '@/components/usage-guard'

// 多人对话角色分析
interface ConversationRole {
  name: string;
  role: '主导者' | '倾听者' | '协调者' | '观察者';
  participation: number; // 参与度百分比
  emotionalTone: '积极' | '中性' | '消极';
  influence: number; // 影响力得分
}

// 实时情感追踪数据
interface EmotionTracking {
  timestamp: number;
  emotion: string;
  intensity: number;
  keywords: string[];
}

// 冲突检测预警
interface ConflictWarning {
  level: '低' | '中' | '高';
  type: '情绪冲突' | '观点冲突' | '角色冲突' | '沟通障碍';
  description: string;
  suggestions: string[];
  participants: string[];
}

// AI增强功能接口定义
interface SmartReplySuggestion {
  id: string;
  content: string;
  confidence: number;
  style: '温柔' | '幽默' | '直接' | '理性';
  context: string;
  timing: '立即回复' | '稍后回复' | '建议延迟回复';
}

interface CommunicationTemplate {
  id: string;
  title: string;
  content: string;
  category: '情侣' | '朋友' | '家庭' | '职场' | '社交';
  scenario: string;
  usage: string;
  effectiveness: number;
  tags: string[];
}

interface VoiceEmotionAnalysis {
  emotion: string;
  intensity: number;
  pitch: number;
  speed: number;
  confidence: number;
  keywords: string[];
  suggestions: string[];
}

// 可视化数据分析接口定义
interface CommunicationHeatmap {
  id: string;
  date: string;
  time: string;
  emotion: string;
  intensity: number;
  duration: number;
  participants: number;
  conversationType: string;
  location: '微信' | 'QQ' | '短信' | '面对面' | '电话';
}

interface ProgressTracking {
  date: string;
  overallScore: number;
  emotionalIntelligence: number;
  conflictResolution: number;
  activeListening: number;
  communicationStyle: string;
  conversationType: string;
  improvementAreas: string[];
  achievements: string[];
}

interface ComparativeAnalysis {
  period1: { start: string; end: string; data: ProgressTracking[] };
  period2: { start: string; end: string; data: ProgressTracking[] };
  comparison: {
    overallScore: { change: number; trend: '上升' | '下降' | '稳定' };
    emotionalIntelligence: { change: number; trend: '上升' | '下降' | '稳定' };
    conflictResolution: { change: number; trend: '上升' | '下降' | '稳定' };
    keyImprovements: string[];
    areasNeedingAttention: string[];
  };
}

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
  
  // 新增多人对话分析字段
  participants: ConversationRole[];
  interactionPattern: string;
  emotionTracking: EmotionTracking[];
  conflictWarnings: ConflictWarning[];
  conversationDuration: number; // 对话时长（分钟）
  topicDistribution: {topic: string; weight: number}[];
}

export default function SocialAssistantPage() {
  const [conversation, setConversation] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<CommunicationAnalysis | null>(null)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  // AI增强功能状态
  const [smartReplies, setSmartReplies] = useState<SmartReplySuggestion[]>([])
  const [templates, setTemplates] = useState<CommunicationTemplate[]>([])
  const [voiceAnalysis, setVoiceAnalysis] = useState<VoiceEmotionAnalysis | null>(null)
  const [isVoiceRecording, setIsVoiceRecording] = useState(false)
  
  // 可视化数据分析状态
  const [heatmapData, setHeatmapData] = useState<CommunicationHeatmap[]>([])
  const [progressData, setProgressData] = useState<ProgressTracking[]>([])
  const [comparativeAnalysis, setComparativeAnalysis] = useState<ComparativeAnalysis | null>(null)
  const [visualizationTab, setVisualizationTab] = useState<'heatmap' | 'progress' | 'comparison'>('heatmap')
  const [activeTab, setActiveTab] = useState<'analysis' | 'replies' | 'templates' | 'voice' | 'visualization'>('analysis')

  // 多人对话场景示例（扩展）
  const conversationExamples = [
    {
      title: '情侣日常关心',
      content: '你今天过得怎么样？工作累不累？我有点担心你最近总是加班，要注意休息啊。',
      type: '情侣',
      participants: 2
    },
    {
      title: '朋友聚会讨论',
      content: 'A: 这周末我们一起去爬山吧？B: 好啊，我最近正想运动。C: 我可能去不了，要加班。A: 那下次再约吧，大家都有空的时候。',
      type: '朋友',
      participants: 3
    },
    {
      title: '家庭矛盾沟通',
      content: '妈妈：你最近怎么总是晚归？爸爸：工作忙没办法。孩子：我想和爸爸妈妈一起吃饭。',
      type: '家庭',
      participants: 3
    },
    {
      title: '团队工作讨论',
      content: '经理：这个项目进度有点慢。小李：我这边遇到技术难题。小王：我可以帮忙一起解决。',
      type: '同事',
      participants: 4
    },
    {
      title: '情感表达对话',
      content: '我想告诉你，和你在一起让我感到非常幸福。你的存在让我的生活变得更有意义。',
      type: '情侣',
      participants: 2
    },
    {
      title: '道歉与和解',
      content: '对不起，我昨天态度不好。我理解你当时的心情，我们好好谈谈吧。',
      type: '情侣',
      participants: 2
    },
    {
      title: '规划未来',
      content: 'A: 我们谈谈未来的计划吧。B: 好啊，你有什么想法？A: 我想明年我们可以考虑买房。B: 这个想法不错，我们一起努力。',
      type: '情侣',
      participants: 2
    },
    {
      title: '职场沟通',
      content: '领导：这个项目需要你的专业意见。员工：我理解项目的重要性，我会尽力配合团队完成。',
      type: '职场',
      participants: 2
    },
    {
      title: '亲子沟通',
      content: '孩子：妈妈，我不想上学了。妈妈：能告诉我为什么吗？我们一起想办法解决。',
      type: '家庭',
      participants: 2
    },
    {
      title: '朋友支持',
      content: 'A: 最近心情不太好。B: 我在这里，你想聊聊吗？A: 谢谢你的关心，有你真好。',
      type: '朋友',
      participants: 2
    }
  ]

  // 检测对话中的参与者
  const detectParticipants = (text: string): ConversationRole[] => {
    const lines = text.split('\n').filter(line => line.trim())
    const participants = new Set<string>()
    const roleCounts = new Map<string, number>()
    
    // 简单的角色检测逻辑
    lines.forEach(line => {
      if (line.includes('：') || line.includes(':')) {
        const speaker = line.split(/[：:]/)[0].trim()
        if (speaker && speaker.length < 20) {
          participants.add(speaker)
          roleCounts.set(speaker, (roleCounts.get(speaker) || 0) + 1)
        }
      }
    })
    
    const totalLines = lines.length
    const roles: ConversationRole[] = []
    
    participants.forEach(speaker => {
      const linesCount = roleCounts.get(speaker) || 0
      const participation = Math.round((linesCount / totalLines) * 100)
      
      // 简单的角色判断
      let role: ConversationRole['role'] = '倾听者'
      if (participation > 40) role = '主导者'
      else if (participation > 20) role = '协调者'
      
      roles.push({
        name: speaker,
        role,
        participation,
        emotionalTone: '中性',
        influence: Math.min(participation + 20, 100)
      })
    })
    
    return roles
  }

  // 实时情感追踪分析
  const analyzeEmotionTracking = (text: string): EmotionTracking[] => {
    const tracking: EmotionTracking[] = []
    const lines = text.split('\n').filter(line => line.trim())
    
    lines.forEach((line, index) => {
      const keywords = []
      let emotion = '中性'
      let intensity = 50
      
      // 简单的情感关键词检测
      if (line.includes('开心') || line.includes('高兴') || line.includes('幸福')) {
        emotion = '积极'
        intensity = 80
        keywords.push('开心', '幸福')
      } else if (line.includes('生气') || line.includes('不满') || line.includes('失望')) {
        emotion = '消极'
        intensity = 70
        keywords.push('生气', '不满')
      } else if (line.includes('担心') || line.includes('关心') || line.includes('注意')) {
        emotion = '积极'
        intensity = 60
        keywords.push('关心', '担心')
      }
      
      tracking.push({
        timestamp: index * 1000,
        emotion,
        intensity,
        keywords
      })
    })
    
    return tracking
  }

  // 冲突检测预警
  const detectConflicts = (text: string, participants: ConversationRole[]): ConflictWarning[] => {
    const warnings: ConflictWarning[] = []
    const lowerText = text.toLowerCase()
    
    // 检测情绪冲突关键词
    if (lowerText.includes('生气') || lowerText.includes('吵架') || lowerText.includes('冲突')) {
      warnings.push({
        level: '高',
        type: '情绪冲突',
        description: '检测到明显的情绪对立和冲突表达',
        suggestions: [
          '建议先冷静下来，避免情绪化表达',
          '尝试使用"我"开头的表达方式，减少指责',
          '寻找共同点，建立理解基础'
        ],
        participants: participants.map(p => p.name)
      })
    }
    
    // 检测观点冲突
    if (lowerText.includes('不同意') || lowerText.includes('反对') || lowerText.includes('但是')) {
      warnings.push({
        level: '中',
        type: '观点冲突',
        description: '检测到不同观点的表达和讨论',
        suggestions: [
          '尊重不同观点，寻找共同目标',
          '使用建设性语言表达分歧',
          '寻求第三方协调或妥协方案'
        ],
        participants: participants.map(p => p.name)
      })
    }
    
    return warnings
  }

  // AI增强功能：智能回复建议
  const generateSmartReplies = (text: string): SmartReplySuggestion[] => {
    const replies: SmartReplySuggestion[] = []
    const lowerText = text.toLowerCase()
    
    // 基于对话内容生成智能回复建议
    if (lowerText.includes('不开心') || lowerText.includes('难过') || lowerText.includes('失望')) {
      replies.push({
        id: '1',
        content: '我理解你的感受，有什么我可以帮忙的吗？',
        confidence: 0.85,
        style: '温柔',
        context: '情感支持',
        timing: '立即回复'
      })
      replies.push({
        id: '2',
        content: '别难过，我在这里陪着你。',
        confidence: 0.78,
        style: '温柔',
        context: '安慰陪伴',
        timing: '立即回复'
      })
    }
    
    if (lowerText.includes('工作') || lowerText.includes('加班') || lowerText.includes('忙碌')) {
      replies.push({
        id: '3',
        content: '工作辛苦了，记得适当休息，别太累了。',
        confidence: 0.82,
        style: '温柔',
        context: '工作关心',
        timing: '立即回复'
      })
      replies.push({
        id: '4',
        content: '注意身体，工作再忙也要照顾好自己。',
        confidence: 0.79,
        style: '理性',
        context: '健康提醒',
        timing: '立即回复'
      })
    }
    
    if (lowerText.includes('谢谢') || lowerText.includes('感谢') || lowerText.includes('感恩')) {
      replies.push({
        id: '5',
        content: '不用客气，这是我应该做的。',
        confidence: 0.88,
        style: '温柔',
        context: '回应感谢',
        timing: '立即回复'
      })
      replies.push({
        id: '6',
        content: '能帮到你我也很开心！',
        confidence: 0.85,
        style: '幽默',
        context: '积极回应',
        timing: '立即回复'
      })
    }
    
    // 默认回复建议
    if (replies.length === 0) {
      replies.push({
        id: '7',
        content: '我理解你的意思，我们可以一起讨论这个问题。',
        confidence: 0.75,
        style: '理性',
        context: '一般交流',
        timing: '立即回复'
      })
      replies.push({
        id: '8',
        content: '谢谢你的分享，这让我更了解你了。',
        confidence: 0.72,
        style: '温柔',
        context: '积极倾听',
        timing: '立即回复'
      })
    }
    
    return replies
  }

  // AI增强功能：沟通模板库
  const getCommunicationTemplates = (category?: string): CommunicationTemplate[] => {
    const allTemplates: CommunicationTemplate[] = [
      {
        id: 'template1',
        title: '关心问候模板',
        content: '今天过得怎么样？工作累不累？要注意休息哦。',
        category: '情侣',
        scenario: '日常关心',
        usage: '适合日常关心问候，表达体贴',
        effectiveness: 0.85,
        tags: ['关心', '问候', '体贴']
      },
      {
        id: 'template2',
        title: '道歉和解模板',
        content: '对不起，我刚才态度不好。我理解你的感受，我们好好谈谈吧。',
        category: '情侣',
        scenario: '矛盾解决',
        usage: '适合矛盾后的道歉和和解',
        effectiveness: 0.92,
        tags: ['道歉', '和解', '沟通']
      },
      {
        id: 'template3',
        title: '情感表达模板',
        content: '我想告诉你，和你在一起让我感到非常幸福。感谢你一直以来的陪伴。',
        category: '情侣',
        scenario: '情感表达',
        usage: '适合表达爱意和感激',
        effectiveness: 0.88,
        tags: ['情感', '表达', '爱意']
      },
      {
        id: 'template4',
        title: '朋友关心模板',
        content: '最近怎么样？看你好像有点累，要注意身体啊。',
        category: '朋友',
        scenario: '朋友关心',
        usage: '适合朋友间的关心问候',
        effectiveness: 0.78,
        tags: ['朋友', '关心', '问候']
      },
      {
        id: 'template5',
        title: '家庭沟通模板',
        content: '爸爸妈妈，我想和你们好好谈谈最近的情况。',
        category: '家庭',
        scenario: '家庭沟通',
        usage: '适合家庭重要对话开场',
        effectiveness: 0.82,
        tags: ['家庭', '沟通', '重要']
      },
      {
        id: 'template6',
        title: '职场沟通模板',
        content: '关于这个项目，我有一些想法想和大家分享。',
        category: '职场',
        scenario: '工作讨论',
        usage: '适合职场沟通和协作',
        effectiveness: 0.75,
        tags: ['职场', '沟通', '工作']
      }
    ]
    
    return category ? allTemplates.filter(t => t.category === category) : allTemplates
  }

  // AI增强功能：语音情感分析
  const analyzeVoiceEmotion = async (audioBlob: Blob): Promise<VoiceEmotionAnalysis> => {
    // 模拟语音情感分析（实际应用中会调用语音API）
    return new Promise((resolve) => {
      setTimeout(() => {
        const analysis: VoiceEmotionAnalysis = {
          emotion: '积极',
          intensity: 0.75,
          pitch: 0.68,
          speed: 0.72,
          confidence: 0.82,
          keywords: ['温暖', '关心', '体贴'],
          suggestions: [
            '语音语调温暖，继续保持',
            '可以适当增加停顿，让对方有思考时间',
            '语速适中，表达清晰'
          ]
        }
        resolve(analysis)
      }, 1500)
    })
  }

  // 语音录制功能
  const startVoiceRecording = () => {
    setIsVoiceRecording(true)
    // 模拟语音录制（实际应用中会使用Web Audio API）
    setTimeout(() => {
      setIsVoiceRecording(false)
      // 模拟语音分析结果
      const mockAnalysis: VoiceEmotionAnalysis = {
        emotion: '积极',
        intensity: 0.78,
        pitch: 0.65,
        speed: 0.70,
        confidence: 0.85,
        keywords: ['开心', '期待', '温暖'],
        suggestions: [
          '语音中充满积极情绪，继续保持',
          '语调适中，表达自然流畅',
          '可以适当增加情感词汇'
        ]
      }
      setVoiceAnalysis(mockAnalysis)
    }, 3000)
  }

  // 可视化数据分析功能
  const generateHeatmapData = (): CommunicationHeatmap[] => {
    const mockData: CommunicationHeatmap[] = []
    const locations: CommunicationHeatmap['location'][] = ['微信', 'QQ', '短信', '面对面', '电话']
    const emotions = ['积极', '中性', '消极']
    const conversationTypes = ['日常交流', '情感表达', '问题解决', '关心问候', '矛盾沟通']
    
    // 生成7天的热力图数据
    for (let i = 6; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split('T')[0]
      
      // 每天生成3-6条沟通记录
      const dailyCount = Math.floor(Math.random() * 4) + 3
      for (let j = 0; j < dailyCount; j++) {
        const hour = Math.floor(Math.random() * 24)
        const minute = Math.floor(Math.random() * 60)
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
        
        mockData.push({
          id: `${dateStr}-${j}`,
          date: dateStr,
          time,
          emotion: emotions[Math.floor(Math.random() * emotions.length)],
          intensity: Math.floor(Math.random() * 40) + 60,
          duration: Math.floor(Math.random() * 30) + 5,
          participants: Math.floor(Math.random() * 3) + 2,
          conversationType: conversationTypes[Math.floor(Math.random() * conversationTypes.length)],
          location: locations[Math.floor(Math.random() * locations.length)]
        })
      }
    }
    
    return mockData
  }

  const generateProgressData = (): ProgressTracking[] => {
    const mockData: ProgressTracking[] = []
    const styles = ['开放型', '保守型', '情感型', '理性型']
    const conversationTypes = ['日常交流', '情感表达', '问题解决', '关心问候']
    
    // 生成30天的进步数据
    for (let i = 29; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split('T')[0]
      
      // 模拟渐进式提升
      const baseScore = 65 + Math.min(i * 0.8, 20)
      const variation = Math.random() * 10 - 5
      
      mockData.push({
        date: dateStr,
        overallScore: Math.round(baseScore + variation),
        emotionalIntelligence: Math.round(baseScore + variation + 5),
        conflictResolution: Math.round(baseScore + variation - 3),
        activeListening: Math.round(baseScore + variation + 2),
        communicationStyle: styles[Math.floor(Math.random() * styles.length)],
        conversationType: conversationTypes[Math.floor(Math.random() * conversationTypes.length)],
        improvementAreas: [
          '情感表达',
          '积极倾听',
          '冲突解决'
        ].slice(0, Math.floor(Math.random() * 3) + 1),
        achievements: [
          '沟通更加流畅',
          '情感表达更自然',
          '解决冲突能力提升'
        ].slice(0, Math.floor(Math.random() * 3) + 1)
      })
    }
    
    return mockData
  }

  const generateComparativeAnalysis = (): ComparativeAnalysis => {
    const progressData = generateProgressData()
    const halfLength = Math.floor(progressData.length / 2)
    
    const period1Data = progressData.slice(0, halfLength)
    const period2Data = progressData.slice(halfLength)
    
    const period1Avg = {
      overallScore: period1Data.reduce((sum, item) => sum + item.overallScore, 0) / period1Data.length,
      emotionalIntelligence: period1Data.reduce((sum, item) => sum + item.emotionalIntelligence, 0) / period1Data.length,
      conflictResolution: period1Data.reduce((sum, item) => sum + item.conflictResolution, 0) / period1Data.length
    }
    
    const period2Avg = {
      overallScore: period2Data.reduce((sum, item) => sum + item.overallScore, 0) / period2Data.length,
      emotionalIntelligence: period2Data.reduce((sum, item) => sum + item.emotionalIntelligence, 0) / period2Data.length,
      conflictResolution: period2Data.reduce((sum, item) => sum + item.conflictResolution, 0) / period2Data.length
    }
    
    return {
      period1: {
        start: period1Data[0].date,
        end: period1Data[period1Data.length - 1].date,
        data: period1Data
      },
      period2: {
        start: period2Data[0].date,
        end: period2Data[period2Data.length - 1].date,
        data: period2Data
      },
      comparison: {
        overallScore: {
          change: Math.round(period2Avg.overallScore - period1Avg.overallScore),
          trend: period2Avg.overallScore > period1Avg.overallScore ? '上升' : '下降'
        },
        emotionalIntelligence: {
          change: Math.round(period2Avg.emotionalIntelligence - period1Avg.emotionalIntelligence),
          trend: period2Avg.emotionalIntelligence > period1Avg.emotionalIntelligence ? '上升' : '下降'
        },
        conflictResolution: {
          change: Math.round(period2Avg.conflictResolution - period1Avg.conflictResolution),
          trend: period2Avg.conflictResolution > period1Avg.conflictResolution ? '上升' : '下降'
        },
        keyImprovements: [
          '情感表达能力显著提升',
          '沟通效率提高',
          '冲突处理更加成熟'
        ],
        areasNeedingAttention: [
          '需要更多主动沟通',
          '可以增加情感词汇使用'
        ]
      }
    }
  }

  const handleAnalyze = async (onRecordUsage: () => Promise<void>) => {
    if (!conversation.trim()) {
      setError('请输入对话内容')
      setTimeout(() => setError(null), 3000)
      return
    }
    
    if (conversation.length < 10) {
      setError('对话内容太短，请输入至少10个字符')
      setTimeout(() => setError(null), 3000)
      return
    }
    
    if (conversation.length > 5000) {
      setError('对话内容过长，请控制在5000字符以内')
      setTimeout(() => setError(null), 3000)
      return
    }
    
    setIsAnalyzing(true)
    setError(null)
    
    try {
      // 记录使用次数
      await onRecordUsage()
      
      // 模拟多人对话分析API调用
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const text = conversation.toLowerCase()
      
      // 多人对话分析
      const participants = detectParticipants(conversation)
      const emotionTracking = analyzeEmotionTracking(conversation)
      const conflictWarnings = detectConflicts(conversation, participants)
      
      // AI增强功能分析
      const smartReplies = generateSmartReplies(conversation)
      const templates = getCommunicationTemplates()
      
      // 可视化数据分析
      const heatmapData = generateHeatmapData()
      const progressData = generateProgressData()
      const comparativeAnalysis = generateComparativeAnalysis()
      
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
        conversationType: '日常交流',
        participants,
        interactionPattern: participants.length > 2 ? '群组讨论' : '一对一交流',
        emotionTracking,
        conflictWarnings,
        conversationDuration: Math.ceil(conversation.length / 50), // 估算对话时长
        topicDistribution: [
          {topic: '日常交流', weight: 40},
          {topic: '情感表达', weight: 30},
          {topic: '问题解决', weight: 20},
          {topic: '其他', weight: 10}
        ]
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

      // 多人对话特定分析
      if (participants.length > 2) {
        analysis.suggestions.push('群聊中注意平衡各参与者发言机会')
        analysis.suggestions.push('建立明确的沟通目标和规则')
        analysis.areasForImprovement.push('群组沟通效率有待提升')
      }

      // 默认建议
      analysis.suggestions = [
        '尝试使用"我"开头的表达方式，减少指责性语言',
        '在表达需求时，同时表达对对方的理解',
        '增加具体的赞美和感谢',
        '定期安排专属的沟通时间',
        ...analysis.suggestions
      ]

      // 补充优势和待改进
      if (analysis.strengths.length === 0) {
        analysis.strengths = ['表达清晰', '情感真诚']
      }
      
      if (analysis.areasForImprovement.length === 0) {
        analysis.areasForImprovement = ['可以增加更多情感词汇', '建议更具体地表达需求']
      }

      setResult(analysis)
      setSmartReplies(smartReplies)
      setTemplates(templates)
      setHeatmapData(heatmapData)
      setProgressData(progressData)
      setComparativeAnalysis(comparativeAnalysis)
      setIsAnalyzing(false)
      setActiveTab('analysis')
    } catch (err) {
      console.error('分析过程中出现错误:', err)
      setError('分析过程中出现错误，请稍后重试')
      setIsAnalyzing(false)
    }
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

              {/* 错误提示 */}
              {error && (
                <div className="max-w-4xl mx-auto mb-4">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <span className="w-3 h-3 bg-red-500 rounded-full inline-block"></span>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-red-700">{error}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 使用状态提示 */}
              <div className="max-w-4xl mx-auto mb-6">
                <UsageStatus feature="social-assistant" className="justify-center" />
              </div>

              {/* 示例展示区 */}
              <div className="max-w-4xl mx-auto mb-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Play className="h-5 w-5 text-rose-500 mr-2" />
                    多人对话场景示例
                  </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                  {conversationExamples.map((example, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-3 md:p-4 hover:border-rose-200 transition-colors hover:shadow-sm">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-xs md:text-sm font-medium text-gray-900">{example.title}</h4>
                        <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs">
                          {example.participants}人
                        </span>
                      </div>
                      <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs mb-2">
                        {example.type}
                      </span>
                      <p className="text-xs text-gray-600 mb-3 line-clamp-3">{example.content}</p>
                      <button
                        onClick={() => {
                          setConversation(example.content)
                          setResult(null)
                          setError(null)
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

          <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-6">
            {/* 输入区域 */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
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
                className="w-full h-48 md:h-64 p-3 md:p-4 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent text-sm md:text-base"
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

              {/* 分析结果和AI增强功能 */}
              {result && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  {/* 功能标签页 - 响应式设计 */}
                  <div className="border-b border-gray-200">
                    <div className="flex overflow-x-auto px-4 pt-4 pb-1 space-x-1 scrollbar-hide">
                      <button
                        onClick={() => setActiveTab('analysis')}
                        className={`px-3 py-2 rounded-lg font-medium text-sm transition-colors whitespace-nowrap ${
                          activeTab === 'analysis' 
                            ? 'bg-blue-50 text-blue-600 border-2 border-blue-500' 
                            : 'text-gray-500 hover:text-gray-700 border-2 border-transparent'
                        }`}
                      >
                        <MessageCircle className="h-4 w-4 inline mr-1 md:mr-2" />
                        <span className="hidden sm:inline">沟通分析</span>
                        <span className="sm:hidden">分析</span>
                      </button>
                      <button
                        onClick={() => setActiveTab('replies')}
                        className={`px-3 py-2 rounded-lg font-medium text-sm transition-colors whitespace-nowrap ${
                          activeTab === 'replies' 
                            ? 'bg-green-50 text-green-600 border-2 border-green-500' 
                            : 'text-gray-500 hover:text-gray-700 border-2 border-transparent'
                        }`}
                      >
                        <Zap className="h-4 w-4 inline mr-1 md:mr-2" />
                        <span className="hidden sm:inline">智能回复</span>
                        <span className="sm:hidden">回复</span>
                      </button>
                      <button
                        onClick={() => setActiveTab('templates')}
                        className={`px-3 py-2 rounded-lg font-medium text-sm transition-colors whitespace-nowrap ${
                          activeTab === 'templates' 
                            ? 'bg-purple-50 text-purple-600 border-2 border-purple-500' 
                            : 'text-gray-500 hover:text-gray-700 border-2 border-transparent'
                        }`}
                      >
                        <FileText className="h-4 w-4 inline mr-1 md:mr-2" />
                        <span className="hidden sm:inline">沟通模板</span>
                        <span className="sm:hidden">模板</span>
                      </button>
                      <button
                        onClick={() => setActiveTab('voice')}
                        className={`px-3 py-2 rounded-lg font-medium text-sm transition-colors whitespace-nowrap ${
                          activeTab === 'voice' 
                            ? 'bg-pink-50 text-pink-600 border-2 border-pink-500' 
                            : 'text-gray-500 hover:text-gray-700 border-2 border-transparent'
                        }`}
                      >
                        <Mic className="h-4 w-4 inline mr-1 md:mr-2" />
                        <span className="hidden sm:inline">语音分析</span>
                        <span className="sm:hidden">语音</span>
                      </button>
                      <button
                        onClick={() => setActiveTab('visualization')}
                        className={`px-3 py-2 rounded-lg font-medium text-sm transition-colors whitespace-nowrap ${
                          activeTab === 'visualization' 
                            ? 'bg-orange-50 text-orange-600 border-2 border-orange-500' 
                            : 'text-gray-500 hover:text-gray-700 border-2 border-transparent'
                        }`}
                      >
                        <BarChart3 className="h-4 w-4 inline mr-1 md:mr-2" />
                        <span className="hidden sm:inline">数据可视化</span>
                        <span className="sm:hidden">数据</span>
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    {/* 沟通分析内容 */}
                    {activeTab === 'analysis' && (
                      <div className="space-y-6">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-6">
                  <div className="bg-rose-50 rounded-lg p-3 md:p-4 text-center">
                    <div className="text-xl md:text-2xl font-bold text-rose-600 mb-1">{result.overallScore}</div>
                    <div className="text-xs md:text-sm text-rose-700">总体评分</div>
                    <div className="w-full bg-rose-200 rounded-full h-1 mt-2">
                      <div 
                        className="h-1 rounded-full bg-rose-500"
                        style={{ width: `${result.overallScore}%` }}
                      />
                    </div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3 md:p-4 text-center">
                    <div className="text-xl md:text-2xl font-bold text-blue-600 mb-1">{result.emotionalIntelligence}</div>
                    <div className="text-xs md:text-sm text-blue-700">情商指数</div>
                    <div className="w-full bg-blue-200 rounded-full h-1 mt-2">
                      <div 
                        className="h-1 rounded-full bg-blue-500"
                        style={{ width: `${result.emotionalIntelligence}%` }}
                      />
                    </div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-3 md:p-4 text-center">
                    <div className="text-xl md:text-2xl font-bold text-purple-600 mb-1">{result.conflictResolution}</div>
                    <div className="text-xs md:text-sm text-purple-700">冲突解决</div>
                    <div className="w-full bg-purple-200 rounded-full h-1 mt-2">
                      <div 
                        className="h-1 rounded-full bg-purple-500"
                        style={{ width: `${result.conflictResolution}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* 多人对话分析 */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                    <Users className="h-5 w-5 text-blue-500 mr-2" />
                    多人对话分析
                  </h3>
                  
                  {/* 参与者分析 */}
                  <div className="bg-blue-50 rounded-lg p-4 mb-4">
                    <h4 className="font-medium text-blue-900 mb-3">参与者分析</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {result.participants.map((participant, index) => (
                        <div key={index} className="bg-white rounded-lg p-3 text-center">
                          <div className="text-lg font-bold text-blue-600">{participant.name}</div>
                          <div className="text-xs text-blue-500 mb-1">{participant.role}</div>
                          <div className="text-sm font-semibold text-gray-700">{participant.participation}%</div>
                          <div className="text-xs text-gray-500">参与度</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* 互动模式 */}
                  <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4 mb-4">
                    <span className="text-gray-600">互动模式</span>
                    <span className="text-lg font-semibold text-purple-600">{result.interactionPattern}</span>
                  </div>
                  
                  {/* 对话时长 */}
                  <div className="flex items-center justify-between bg-green-50 rounded-lg p-4">
                    <span className="text-gray-600">对话时长</span>
                    <span className="text-lg font-semibold text-green-600">{result.conversationDuration}分钟</span>
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

                {/* 冲突检测预警 */}
                {result.conflictWarnings.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                      <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                      冲突检测预警
                    </h3>
                    <div className="space-y-3">
                      {result.conflictWarnings.map((warning, index) => (
                        <div key={index} className="bg-red-50 border border-red-200 rounded-lg p-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              warning.level === '高' ? 'bg-red-500 text-white' :
                              warning.level === '中' ? 'bg-amber-500 text-white' : 'bg-yellow-500 text-white'
                            }`}>
                              {warning.level}风险 - {warning.type}
                            </span>
                          </div>
                          <p className="text-red-700 text-sm mb-3">{warning.description}</p>
                          <ul className="space-y-1">
                            {warning.suggestions.map((suggestion, idx) => (
                              <li key={idx} className="text-red-600 text-xs flex items-start">
                                <span className="mr-2">•</span>
                                {suggestion}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 情感追踪分析 */}
                {result.emotionTracking.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                      <Heart className="h-5 w-5 text-pink-500 mr-2" />
                      情感变化追踪
                    </h3>
                    <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg p-4">
                      <div className="grid grid-cols-3 gap-2 mb-3">
                        <div className="text-center">
                          <div className="text-lg font-bold text-pink-600">
                            {result.emotionTracking.filter(t => t.emotion === '积极').length}
                          </div>
                          <div className="text-xs text-pink-500">积极时刻</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-gray-600">
                            {result.emotionTracking.filter(t => t.emotion === '中性').length}
                          </div>
                          <div className="text-xs text-gray-500">中性时刻</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-blue-600">
                            {result.emotionTracking.filter(t => t.emotion === '消极').length}
                          </div>
                          <div className="text-xs text-blue-500">消极时刻</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 overflow-x-auto pb-2">
                        {result.emotionTracking.map((tracking, index) => (
                          <div key={index} className="flex flex-col items-center min-w-[50px]">
                            <div 
                              className={`w-3 h-3 rounded-full mb-1 ${
                                tracking.emotion === '积极' ? 'bg-green-500' :
                                tracking.emotion === '中性' ? 'bg-gray-400' : 'bg-red-500'
                              }`}
                            />
                            <div className="text-xs text-gray-500">{index + 1}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

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
                <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
                  <button 
                    onClick={generateCommunicationReport}
                    className="flex items-center justify-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex-1"
                  >
                    <Download className="h-4 w-4" />
                    <span>下载报告</span>
                  </button>
                  <button 
                    onClick={shareAnalysis}
                    className="flex items-center justify-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex-1"
                  >
                    <Share2 className="h-4 w-4" />
                    <span>分享结果</span>
                  </button>
                  <button 
                    onClick={() => {
                      setConversation('')
                      setResult(null)
                    }}
                    className="flex items-center justify-center space-x-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors flex-1"
                  >
                    <span>重新分析</span>
                  </button>
                </div>
                    )}
                    
                    {/* 智能回复建议内容 */}
                    {activeTab === 'replies' && (
                      <div className="space-y-6">
                        <div className="flex justify-between items-center mb-6">
                          <h2 className="text-xl font-semibold text-gray-900">智能回复建议</h2>
                          <div className="flex items-center space-x-2">
                            <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                              {smartReplies.length} 个建议
                            </span>
                          </div>
                        </div>
                        
                        <div className="grid gap-4">
                          {smartReplies.map((reply, index) => (
                            <div key={reply.id} className="bg-green-50 border border-green-200 rounded-lg p-4">
                              <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center space-x-2">
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    reply.style === '温柔' ? 'bg-pink-500 text-white' :
                                    reply.style === '幽默' ? 'bg-yellow-500 text-white' :
                                    reply.style === '直接' ? 'bg-blue-500 text-white' : 'bg-purple-500 text-white'
                                  }`}>
                                    {reply.style}
                                  </span>
                                  <span className="text-sm text-gray-500">{reply.context}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <span className="text-sm text-gray-500">{reply.timing}</span>
                                  <span className="px-2 py-1 bg-green-500 text-white rounded-full text-xs font-medium">
                                    {Math.round(reply.confidence * 100)}%
                                  </span>
                                </div>
                              </div>
                              <p className="text-gray-700 mb-3">{reply.content}</p>
                              <button 
                                onClick={() => navigator.clipboard.writeText(reply.content)}
                                className="text-green-600 hover:text-green-700 text-sm font-medium"
                              >
                                复制此回复
                              </button>
                            </div>
                          ))}
                        </div>
                        
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h3 className="text-lg font-medium text-gray-900 mb-2 flex items-center">
                            <Lightbulb className="h-5 w-5 text-yellow-500 mr-2" />
                            使用建议
                          </h3>
                          <ul className="text-gray-600 text-sm space-y-1">
                            <li>• 根据对话情境选择合适的回复风格</li>
                            <li>• 高置信度建议更符合当前沟通场景</li>
                            <li>• 可以复制后稍作修改，让表达更自然</li>
                            <li>• 注意回复时机，选择最合适的沟通时机</li>
                          </ul>
                        </div>
                      </div>
                    )}
                    
                    {/* 沟通模板库内容 */}
                    {activeTab === 'templates' && (
                      <div className="space-y-6">
                        <div className="flex justify-between items-center mb-6">
                          <h2 className="text-xl font-semibold text-gray-900">沟通模板库</h2>
                          <div className="flex items-center space-x-2">
                            <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-medium">
                              {templates.length} 个模板
                            </span>
                          </div>
                        </div>
                        
                        {/* 分类筛选 */}
                        <div className="flex space-x-2 mb-4">
                          {['情侣', '朋友', '家庭', '职场', '社交'].map((category) => (
                            <button
                              key={category}
                              onClick={() => setTemplates(getCommunicationTemplates(category))}
                              className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 text-sm transition-colors"
                            >
                              {category}
                            </button>
                          ))}
                          <button
                            onClick={() => setTemplates(getCommunicationTemplates())}
                            className="px-3 py-1 rounded-full bg-purple-100 text-purple-600 text-sm font-medium"
                          >
                            全部
                          </button>
                        </div>
                        
                        <div className="grid gap-4">
                          {templates.map((template) => (
                            <div key={template.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-colors">
                              <div className="flex justify-between items-start mb-3">
                                <h3 className="text-lg font-medium text-gray-900">{template.title}</h3>
                                <span className="px-2 py-1 bg-purple-100 text-purple-600 rounded-full text-xs font-medium">
                                  {Math.round(template.effectiveness * 100)}% 有效
                                </span>
                              </div>
                              
                              <div className="flex items-center space-x-2 mb-3">
                                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                                  {template.category}
                                </span>
                                <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded text-xs">
                                  {template.scenario}
                                </span>
                              </div>
                              
                              <div className="bg-purple-50 rounded-lg p-3 mb-3">
                                <p className="text-purple-700 text-sm">{template.content}</p>
                              </div>
                              
                              <p className="text-gray-600 text-sm mb-3">{template.usage}</p>
                              
                              <div className="flex justify-between items-center">
                                <div className="flex space-x-1">
                                  {template.tags.map((tag, idx) => (
                                    <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-500 rounded text-xs">
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                                <button 
                                  onClick={() => navigator.clipboard.writeText(template.content)}
                                  className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                                >
                                  复制模板
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* 语音情感分析内容 */}
                    {activeTab === 'voice' && (
                      <div className="space-y-6">
                        <div className="flex justify-between items-center mb-6">
                          <h2 className="text-xl font-semibold text-gray-900">语音情感分析</h2>
                          <div className="flex items-center space-x-2">
                            <Volume2 className="h-5 w-5 text-pink-500" />
                            <span className="text-sm text-gray-500">AI语音分析</span>
                          </div>
                        </div>
                        
                        {/* 语音录制区域 */}
                        <div className="bg-pink-50 rounded-lg p-6 text-center">
                          {!voiceAnalysis ? (
                            <div>
                              <div className="w-20 h-20 mx-auto mb-4 bg-pink-100 rounded-full flex items-center justify-center">
                                {isVoiceRecording ? (
                                  <div className="w-10 h-10 bg-pink-500 rounded-full animate-pulse"></div>
                                ) : (
                                  <Mic className="h-8 w-8 text-pink-500" />
                                )}
                              </div>
                              <h3 className="text-lg font-medium text-pink-900 mb-2">
                                {isVoiceRecording ? '正在录音...' : '录制语音进行分析'}
                              </h3>
                              <p className="text-pink-700 text-sm mb-4">
                                {isVoiceRecording ? '请继续说话，3秒后自动分析' : '点击下方按钮开始录制语音'}
                              </p>
                              <button
                                onClick={startVoiceRecording}
                                disabled={isVoiceRecording}
                                className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition-colors disabled:opacity-50"
                              >
                                {isVoiceRecording ? '录制中...' : '开始录制'}
                              </button>
                            </div>
                          ) : (
                            <div>
                              <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                                <Volume2 className="h-6 w-6 text-green-500" />
                              </div>
                              <h3 className="text-lg font-medium text-green-900 mb-2">分析完成</h3>
                              <p className="text-green-700 text-sm">语音情感分析结果如下</p>
                            </div>
                          )}
                        </div>
                        
                        {/* 语音分析结果 */}
                        {voiceAnalysis && (
                          <div className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <h4 className="font-medium text-gray-900 mb-3">情感分析</h4>
                                <div className="flex items-center justify-between">
                                  <span className="text-gray-600">主要情感</span>
                                  <span className="text-lg font-semibold text-pink-600">{voiceAnalysis.emotion}</span>
                                </div>
                                <div className="flex items-center justify-between mt-2">
                                  <span className="text-gray-600">情感强度</span>
                                  <span className="text-lg font-semibold text-pink-600">{Math.round(voiceAnalysis.intensity * 100)}%</span>
                                </div>
                              </div>
                              
                              <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <h4 className="font-medium text-gray-900 mb-3">语音特征</h4>
                                <div className="flex items-center justify-between">
                                  <span className="text-gray-600">语调</span>
                                  <span className="text-lg font-semibold text-blue-600">{Math.round(voiceAnalysis.pitch * 100)}%</span>
                                </div>
                                <div className="flex items-center justify-between mt-2">
                                  <span className="text-gray-600">语速</span>
                                  <span className="text-lg font-semibold text-blue-600">{Math.round(voiceAnalysis.speed * 100)}%</span>
                                </div>
                              </div>
                            </div>
                            
                            {/* 情感关键词 */}
                            <div className="bg-white border border-gray-200 rounded-lg p-4">
                              <h4 className="font-medium text-gray-900 mb-3">情感关键词</h4>
                              <div className="flex flex-wrap gap-2">
                                {voiceAnalysis.keywords.map((keyword, index) => (
                                  <span key={index} className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm">
                                    {keyword}
                                  </span>
                                ))}
                              </div>
                            </div>
                            
                            {/* 改进建议 */}
                            <div className="bg-white border border-gray-200 rounded-lg p-4">
                              <h4 className="font-medium text-gray-900 mb-3">语音改进建议</h4>
                              <ul className="space-y-2">
                                {voiceAnalysis.suggestions.map((suggestion, index) => (
                                  <li key={index} className="flex items-start space-x-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                    <span className="text-gray-600">{suggestion}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            <button
                              onClick={() => setVoiceAnalysis(null)}
                              className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                            >
                              重新录制
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* 可视化数据分析内容 */}
                    {activeTab === 'visualization' && (
                      <div className="space-y-6">
                        <div className="flex justify-between items-center mb-6">
                          <h2 className="text-xl font-semibold text-gray-900">可视化数据分析</h2>
                          <div className="flex items-center space-x-2">
                            <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-sm font-medium">
                              数据洞察
                            </span>
                          </div>
                        </div>
                        
                        {/* 可视化标签页 */}
                        <div className="flex space-x-2 mb-6 border-b border-gray-200 pb-2">
                          <button
                            onClick={() => setVisualizationTab('heatmap')}
                            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                              visualizationTab === 'heatmap' 
                                ? 'bg-blue-100 text-blue-600' 
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                          >
                            <BarChart3 className="h-4 w-4 inline mr-2" />
                            沟通热力图
                          </button>
                          <button
                            onClick={() => setVisualizationTab('progress')}
                            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                              visualizationTab === 'progress' 
                                ? 'bg-green-100 text-green-600' 
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                          >
                            <TrendingUpIcon className="h-4 w-4 inline mr-2" />
                            进步轨迹图
                          </button>
                          <button
                            onClick={() => setVisualizationTab('comparison')}
                            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                              visualizationTab === 'comparison' 
                                ? 'bg-purple-100 text-purple-600' 
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                          >
                            <GitCompare className="h-4 w-4 inline mr-2" />
                            对比分析
                          </button>
                        </div>
                        
                        {/* 沟通热力图 */}
                        {visualizationTab === 'heatmap' && (
                          <div className="space-y-4">
                            <div className="bg-blue-50 rounded-lg p-4">
                              <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-medium text-blue-900">沟通热力图 - 过去7天</h3>
                                <div className="flex items-center space-x-2 text-sm text-blue-700">
                                  <Clock className="h-4 w-4" />
                                  <span>点击方块查看详情</span>
                                </div>
                              </div>
                              
                              {/* 热力图网格 */}
                              <div className="grid grid-cols-7 gap-2 mb-4">
                                {['周一', '周二', '周三', '周四', '周五', '周六', '周日'].map((day, dayIndex) => (
                                  <div key={day} className="text-center">
                                    <div className="text-sm font-medium text-gray-600 mb-2">{day}</div>
                                    <div className="grid grid-cols-4 gap-1">
                                      {[0, 6, 12, 18].map((hour) => {
                                        const dayData = heatmapData.filter(item => {
                                          const itemDate = new Date(item.date)
                                          return itemDate.getDay() === (dayIndex + 1) % 7 && 
                                                 parseInt(item.time.split(':')[0]) >= hour && 
                                                 parseInt(item.time.split(':')[0]) < hour + 6
                                        })
                                        const intensity = Math.min(dayData.length * 25, 100)
                                        
                                        return (
                                          <div 
                                            key={hour}
                                            className={`h-4 rounded cursor-pointer transition-all duration-200 hover:scale-110 ${
                                              intensity === 0 ? 'bg-gray-100 hover:bg-gray-200' :
                                              intensity <= 25 ? 'bg-green-200 hover:bg-green-300' :
                                              intensity <= 50 ? 'bg-green-400 hover:bg-green-500' :
                                              intensity <= 75 ? 'bg-green-600 hover:bg-green-700' : 'bg-green-800 hover:bg-green-900'
                                            }`}
                                            title={`${day} ${hour}:00-${hour+5}:59 - ${dayData.length}次沟通\n平均时长: ${Math.round(dayData.reduce((sum, item) => sum + item.duration, 0) / dayData.length || 0)}分钟\n平均情感强度: ${Math.round(dayData.reduce((sum, item) => sum + item.intensity, 0) / dayData.length || 0)}%`}
                                          />
                                        )
                                      })}
                                    </div>
                                  </div>
                                ))}
                              </div>
                              
                              {/* 图例 */}
                              <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-gray-600">
                                <div className="flex items-center space-x-1">
                                  <div className="w-3 h-3 bg-gray-100 rounded"></div>
                                  <span>无沟通</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <div className="w-3 h-3 bg-green-200 rounded"></div>
                                  <span>1-2次</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <div className="w-3 h-3 bg-green-400 rounded"></div>
                                  <span>3-4次</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <div className="w-3 h-3 bg-green-600 rounded"></div>
                                  <span>5-6次</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <div className="w-3 h-3 bg-green-800 rounded"></div>
                                  <span>7+次</span>
                                </div>
                              </div>
                            </div>
                            
                            {/* 沟通统计 */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                              <div className="bg-white border border-gray-200 rounded-lg p-3 text-center hover:shadow-md transition-shadow">
                                <div className="text-xl sm:text-2xl font-bold text-blue-600">{heatmapData.length}</div>
                                <div className="text-xs sm:text-sm text-gray-600">总沟通次数</div>
                              </div>
                              <div className="bg-white border border-gray-200 rounded-lg p-3 text-center hover:shadow-md transition-shadow">
                                <div className="text-xl sm:text-2xl font-bold text-green-600">
                                  {Math.round(heatmapData.reduce((sum, item) => sum + item.duration, 0) / 60)}
                                </div>
                                <div className="text-xs sm:text-sm text-gray-600">总沟通时长(小时)</div>
                              </div>
                              <div className="bg-white border border-gray-200 rounded-lg p-3 text-center hover:shadow-md transition-shadow">
                                <div className="text-xl sm:text-2xl font-bold text-purple-600">
                                  {Math.round(heatmapData.reduce((sum, item) => sum + item.intensity, 0) / heatmapData.length)}
                                </div>
                                <div className="text-xs sm:text-sm text-gray-600">平均情感强度</div>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {/* 进步轨迹图 */}
                        {visualizationTab === 'progress' && (
                          <div className="space-y-4">
                            <div className="bg-green-50 rounded-lg p-4">
                              <h3 className="text-lg font-medium text-green-900 mb-4">进步轨迹图 - 过去30天</h3>
                              
                              {/* 进度图表 */}
                              <div className="h-48 flex items-end space-x-1 mb-4">
                                {progressData.map((day, index) => (
                                  <div key={day.date} className="flex-1 flex flex-col items-center">
                                    <div 
                                      className="w-full bg-gradient-to-t from-green-400 to-green-600 rounded-t"
                                      style={{ height: `${day.overallScore}%` }}
                                      title={`${day.date}: ${day.overallScore}分`}
                                    />
                                    {index % 5 === 0 && (
                                      <div className="text-xs text-gray-500 mt-1">
                                        {new Date(day.date).getDate()}日
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                              
                              {/* 统计数据 */}
                              <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-white rounded-lg p-3">
                                  <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm text-gray-600">起始分数</span>
                                    <span className="text-lg font-bold text-green-600">{progressData[0]?.overallScore || 0}</span>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">当前分数</span>
                                    <span className="text-lg font-bold text-green-600">{progressData[progressData.length - 1]?.overallScore || 0}</span>
                                  </div>
                                </div>
                                <div className="bg-white rounded-lg p-3">
                                  <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm text-gray-600">进步幅度</span>
                                    <span className="text-lg font-bold text-green-600">
                                      +{progressData[progressData.length - 1]?.overallScore - progressData[0]?.overallScore || 0}
                                    </span>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">趋势</span>
                                    <span className="text-lg font-bold text-green-600">↗ 上升</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            {/* 能力变化 */}
                            <div className="grid md:grid-cols-3 gap-4">
                              <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                                <div className="text-lg font-bold text-blue-600">
                                  +{progressData[progressData.length - 1]?.emotionalIntelligence - progressData[0]?.emotionalIntelligence || 0}
                                </div>
                                <div className="text-sm text-gray-600">情商提升</div>
                              </div>
                              <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                                <div className="text-lg font-bold text-purple-600">
                                  +{progressData[progressData.length - 1]?.conflictResolution - progressData[0]?.conflictResolution || 0}
                                </div>
                                <div className="text-sm text-gray-600">冲突解决提升</div>
                              </div>
                              <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                                <div className="text-lg font-bold text-pink-600">
                                  +{progressData[progressData.length - 1]?.activeListening - progressData[0]?.activeListening || 0}
                                </div>
                                <div className="text-sm text-gray-600">积极倾听提升</div>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {/* 对比分析 */}
                        {visualizationTab === 'comparison' && comparativeAnalysis && (
                          <div className="space-y-4">
                            <div className="bg-purple-50 rounded-lg p-4">
                              <h3 className="text-lg font-medium text-purple-900 mb-4">对比分析</h3>
                              
                              {/* 时间段对比 */}
                              <div className="grid md:grid-cols-2 gap-4 mb-4">
                                <div className="bg-white rounded-lg p-4">
                                  <h4 className="font-medium text-gray-900 mb-2">前期</h4>
                                  <p className="text-sm text-gray-600 mb-2">
                                    {comparativeAnalysis.period1.start} 至 {comparativeAnalysis.period1.end}
                                  </p>
                                  <div className="text-2xl font-bold text-purple-600">
                                    {Math.round(comparativeAnalysis.period1.data.reduce((sum, item) => sum + item.overallScore, 0) / comparativeAnalysis.period1.data.length)}
                                  </div>
                                  <div className="text-sm text-gray-600">平均分数</div>
                                </div>
                                <div className="bg-white rounded-lg p-4">
                                  <h4 className="font-medium text-gray-900 mb-2">后期</h4>
                                  <p className="text-sm text-gray-600 mb-2">
                                    {comparativeAnalysis.period2.start} 至 {comparativeAnalysis.period2.end}
                                  </p>
                                  <div className="text-2xl font-bold text-purple-600">
                                    {Math.round(comparativeAnalysis.period2.data.reduce((sum, item) => sum + item.overallScore, 0) / comparativeAnalysis.period2.data.length)}
                                  </div>
                                  <div className="text-sm text-gray-600">平均分数</div>
                                </div>
                              </div>
                              
                              {/* 能力对比 */}
                              <div className="space-y-3">
                                {[
                                  { key: 'overallScore', label: '总体评分', color: 'bg-blue-500' },
                                  { key: 'emotionalIntelligence', label: '情商指数', color: 'bg-green-500' },
                                  { key: 'conflictResolution', label: '冲突解决', color: 'bg-purple-500' }
                                ].map((item) => (
                                  <div key={item.key} className="bg-white rounded-lg p-3">
                                    <div className="flex justify-between items-center mb-2">
                                      <span className="text-sm font-medium text-gray-700">{item.label}</span>
                                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                        comparativeAnalysis.comparison[item.key as keyof typeof comparativeAnalysis.comparison].trend === '上升' 
                                          ? 'bg-green-100 text-green-700' 
                                          : 'bg-red-100 text-red-700'
                                      }`}>
                                        {comparativeAnalysis.comparison[item.key as keyof typeof comparativeAnalysis.comparison].change > 0 ? '+' : ''}
                                        {comparativeAnalysis.comparison[item.key as keyof typeof comparativeAnalysis.comparison].change}
                                      </span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                      <div 
                                        className={`h-2 rounded-full ${item.color}`}
                                        style={{ width: `${50 + comparativeAnalysis.comparison[item.key as keyof typeof comparativeAnalysis.comparison].change * 0.5}%` }}
                                      />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            {/* 关键改进 */}
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="bg-green-50 rounded-lg p-4">
                                <h4 className="font-medium text-green-900 mb-3">关键进步</h4>
                                <ul className="space-y-2">
                                  {comparativeAnalysis.comparison.keyImprovements.map((improvement, index) => (
                                    <li key={index} className="flex items-start space-x-2">
                                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                      <span className="text-green-700 text-sm">{improvement}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div className="bg-amber-50 rounded-lg p-4">
                                <h4 className="font-medium text-amber-900 mb-3">需要关注</h4>
                                <ul className="space-y-2">
                                  {comparativeAnalysis.comparison.areasNeedingAttention.map((area, index) => (
                                    <li key={index} className="flex items-start space-x-2">
                                      <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                                      <span className="text-amber-700 text-sm">{area}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
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