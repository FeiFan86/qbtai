'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { format, subDays, isWithinInterval, startOfWeek, endOfWeek } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import { 
  AlertTriangle, Bell, TrendingDown, Heart, Brain, 
  Users, Calendar, Star, Zap, Lightbulb, Clock,
  CheckCircle, XCircle, Info
} from 'lucide-react'

interface EmotionEntry {
  id: number
  date: string
  title: string
  emotion: string
  mood: 'positive' | 'neutral' | 'negative'
  content: string
  tags: string[]
  rating: number
}

interface AlertRule {
  id: string
  type: 'negative_trend' | 'rating_spike' | 'pattern_change' | 'consistency_warning'
  condition: (entries: EmotionEntry[], timeframe: number) => boolean
  severity: 'low' | 'medium' | 'high'
  message: string
  suggestion: string
}

interface Alert {
  id: string
  ruleId: string
  type: string
  severity: 'low' | 'medium' | 'high'
  message: string
  suggestion: string
  timestamp: string
  acknowledged: boolean
  data?: any // 附加数据
}

interface PersonalizedAdvice {
  id: string
  type: 'growth' | 'maintenance' | 'improvement' | 'celebration'
  title: string
  content: string
  actionSteps: string[]
  relevance: number // 0-1
  timeframe: 'immediate' | 'short_term' | 'long_term'
}

interface EmotionAlertEngineProps {
  diaries: EmotionEntry[]
  onAlertAcknowledge?: (alertId: string) => void
}

// 预警规则定义
const alertRules: AlertRule[] = [
  {
    id: 'negative_trend_week',
    type: 'negative_trend',
    condition: (entries, timeframe) => {
      const recentEntries = entries.filter(e => 
        isWithinInterval(new Date(e.date), {
          start: subDays(new Date(), timeframe),
          end: new Date()
        })
      )
      
      if (recentEntries.length < 3) return false
      
      const negativeCount = recentEntries.filter(e => e.mood === 'negative').length
      const negativeRatio = negativeCount / recentEntries.length
      
      return negativeRatio > 0.6 // 超过60%为负面情绪
    },
    severity: 'medium',
    message: '最近检测到负面情绪增多趋势',
    suggestion: '建议关注情绪变化，尝试放松活动或寻求支持'
  },
  {
    id: 'rating_spike',
    type: 'rating_spike',
    condition: (entries, timeframe) => {
      const recentEntries = entries.filter(e => 
        isWithinInterval(new Date(e.date), {
          start: subDays(new Date(), timeframe),
          end: new Date()
        })
      ).slice(-5) // 最近5条记录
      
      if (recentEntries.length < 3) return false
      
      // 检查强度是否有显著变化
      const ratings = recentEntries.map(e => e.rating)
      const avgRating = ratings.reduce((a, b) => a + b, 0) / ratings.length
      const maxRating = Math.max(...ratings)
      const minRating = Math.min(...ratings)
      
      return (maxRating - minRating) >= 3 // 强度变化超过3个级别
    },
    severity: 'low',
    message: '情感强度波动较大',
    suggestion: '情绪波动是正常的，尝试记录触发因素以便更好理解'
  },
  {
    id: 'pattern_change',
    type: 'pattern_change',
    condition: (entries, timeframe) => {
      if (entries.length < 10) return false
      
      const recentWeek = entries.filter(e => 
        isWithinInterval(new Date(e.date), {
          start: startOfWeek(new Date()),
          end: endOfWeek(new Date())
        })
      )
      
      const previousWeek = entries.filter(e => 
        isWithinInterval(new Date(e.date), {
          start: startOfWeek(subDays(new Date(), 7)),
          end: endOfWeek(subDays(new Date(), 7))
        })
      )
      
      if (recentWeek.length < 3 || previousWeek.length < 3) return false
      
      const recentPositiveRatio = recentWeek.filter(e => e.mood === 'positive').length / recentWeek.length
      const previousPositiveRatio = previousWeek.filter(e => e.mood === 'positive').length / previousWeek.length
      
      return Math.abs(recentPositiveRatio - previousPositiveRatio) > 0.4 // 变化超过40%
    },
    severity: 'medium',
    message: '情感模式出现显著变化',
    suggestion: '这可能反映了生活变化，建议反思近期的经历和调整'
  },
  {
    id: 'consistency_warning',
    type: 'consistency_warning',
    condition: (entries, timeframe) => {
      const recentEntries = entries.filter(e => 
        isWithinInterval(new Date(e.date), {
          start: subDays(new Date(), timeframe),
          end: new Date()
        })
      )
      
      if (recentEntries.length < 5) return false
      
      const entryDates = recentEntries.map(e => new Date(e.date).getTime())
      const sortedDates = entryDates.sort((a, b) => a - b)
      const gaps = []
      
      for (let i = 1; i < sortedDates.length; i++) {
        gaps.push(sortedDates[i] - sortedDates[i - 1])
      }
      
      const avgGap = gaps.reduce((a, b) => a + b, 0) / gaps.length
      const maxGap = Math.max(...gaps)
      
      return maxGap > avgGap * 3 // 存在异常长的间隔
    },
    severity: 'low',
    message: '记录间隔出现异常',
    suggestion: '保持规律的记录习惯有助于更好地追踪情感变化'
  }
]

// 个性化建议生成器
const adviceGenerator = {
  generateGrowthAdvice: (entries: EmotionEntry[]): PersonalizedAdvice[] => {
    const recentEntries = entries.slice(-10)
    if (recentEntries.length < 3) return []
    
    const positiveRatio = recentEntries.filter(e => e.mood === 'positive').length / recentEntries.length
    const avgRating = recentEntries.reduce((sum, e) => sum + e.rating, 0) / recentEntries.length
    
    const advice: PersonalizedAdvice[] = []
    
    if (positiveRatio > 0.7) {
      advice.push({
        id: 'celebrate_positive',
        type: 'celebration',
        title: '积极情绪保持良好',
        content: '您最近保持了较高的积极情绪水平，这是情感健康的重要标志。',
        actionSteps: [
          '继续记录让您感到快乐的活动',
          '尝试将积极体验分享给他人',
          '设定新的情感成长目标'
        ],
        relevance: 0.8,
        timeframe: 'long_term'
      })
    }
    
    if (avgRating > 3.5) {
      advice.push({
        id: 'emotional_rating',
        type: 'improvement',
        title: '情感体验丰富',
        content: '您的情感体验强度较高，这表明您对生活有深刻的感受。',
        actionSteps: [
          '学习情绪调节技巧',
          '尝试正念冥想练习',
          '记录高强度情绪的触发因素'
        ],
        relevance: 0.6,
        timeframe: 'short_term'
      })
    }
    
    return advice
  },
  
  generateMaintenanceAdvice: (entries: EmotionEntry[]): PersonalizedAdvice[] => {
    const advice: PersonalizedAdvice[] = []
    
    // 检查记录频率
    const entryDates = entries.map(e => new Date(e.date).getTime())
    const sortedDates = entryDates.sort((a, b) => a - b)
    const avgGap = sortedDates.length > 1 
      ? (sortedDates[sortedDates.length - 1] - sortedDates[0]) / (sortedDates.length - 1)
      : 0
    
    if (avgGap > 2 * 24 * 60 * 60 * 1000) { // 超过2天
      advice.push({
        id: 'record_frequency',
        type: 'improvement',
        title: '提升记录频率',
        content: '规律的记录有助于更好地理解情感模式。',
        actionSteps: [
          '设定每日记录提醒',
          '尝试简短的快速记录',
          '结合日常习惯进行记录'
        ],
        relevance: 0.7,
        timeframe: 'immediate'
      })
    }
    
    return advice
  }
}

export function EmotionAlertEngine({ diaries, onAlertAcknowledge }: EmotionAlertEngineProps) {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [advice, setAdvice] = useState<PersonalizedAdvice[]>([])
  const [timeframe, setTimeframe] = useState<number>(7) // 默认7天

  // 检测预警
  const detectedAlerts = useMemo(() => {
    const newAlerts: Alert[] = []
    
    alertRules.forEach(rule => {
      if (rule.condition(entries, timeframe)) {
        newAlerts.push({
          id: `${rule.id}_${Date.now()}`,
          ruleId: rule.id,
          type: rule.type,
          severity: rule.severity,
          message: rule.message,
          suggestion: rule.suggestion,
          timestamp: new Date().toISOString(),
          acknowledged: false
        })
      }
    })
    
    return newAlerts
  }, [entries, timeframe])

  // 生成个性化建议
  const generatedAdvice = useMemo(() => {
    return [
      ...adviceGenerator.generateGrowthAdvice(entries),
      ...adviceGenerator.generateMaintenanceAdvice(entries)
    ].sort((a, b) => b.relevance - a.relevance).slice(0, 5) // 只显示前5条
  }, [entries])

  // 更新预警状态
  useEffect(() => {
    setAlerts(prevAlerts => {
      const existingAlertIds = new Set(prevAlerts.map(a => a.ruleId))
      const newAlerts = detectedAlerts.filter(alert => !existingAlertIds.has(alert.ruleId))
      
      return [...prevAlerts, ...newAlerts]
    })
    
    setAdvice(generatedAdvice)
  }, [detectedAlerts, generatedAdvice])

  const acknowledgeAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, acknowledged: true } : alert
    ))
    onAlertAcknowledge(alertId)
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200'
      case 'medium': return 'bg-amber-100 text-amber-800 border-amber-200'
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <AlertTriangle className="h-4 w-4" />
      case 'medium': return <Bell className="h-4 w-4" />
      case 'low': return <Info className="h-4 w-4" />
      default: return <Info className="h-4 w-4" />
    }
  }

  const getAdviceIcon = (type: string) => {
    switch (type) {
      case 'growth': return <TrendingDown className="h-4 w-4" />
      case 'maintenance': return <Heart className="h-4 w-4" />
      case 'improvement': return <Zap className="h-4 w-4" />
      case 'celebration': return <Star className="h-4 w-4" />
      default: return <Lightbulb className="h-4 w-4" />
    }
  }

  const activeAlerts = alerts.filter(alert => !alert.acknowledged)

  return (
    <div className="space-y-6">
      {/* 预警系统 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-6 w-6 text-amber-500" />
            <h2 className="text-xl font-semibold text-gray-900">情感预警系统</h2>
          </div>
          
          <div className="flex items-center space-x-2">
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(Number(e.target.value))}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
            >
              <option value={7}>最近7天</option>
              <option value={14}>最近14天</option>
              <option value={30}>最近30天</option>
            </select>
            
            <div className="flex items-center space-x-1 text-sm text-gray-500">
              <Bell className="h-4 w-4" />
              <span>{activeAlerts.length} 个预警</span>
            </div>
          </div>
        </div>

        {activeAlerts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-400" />
            <p className="text-lg font-medium text-green-600">情感状态良好</p>
            <p className="text-sm">未检测到需要关注的预警</p>
          </div>
        ) : (
          <div className="space-y-4">
            {activeAlerts.map(alert => (
              <div key={alert.id} className={`border rounded-lg p-4 ${getSeverityColor(alert.severity)}`}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {getSeverityIcon(alert.severity)}
                    <span className="font-medium">{alert.message}</span>
                  </div>
                  <button
                    onClick={() => acknowledgeAlert(alert.id)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <XCircle className="h-5 w-5" />
                  </button>
                </div>
                
                <div className="text-sm text-gray-700 mb-3">
                  {alert.suggestion}
                </div>
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{format(new Date(alert.timestamp), 'yyyy-MM-dd HH:mm', { locale: zhCN })}</span>
                  <span className="capitalize">{alert.severity} 严重度</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 个性化建议 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Lightbulb className="h-6 w-6 text-amber-500" />
            <h2 className="text-xl font-semibold text-gray-900">个性化建议</h2>
          </div>
          
          <div className="flex items-center space-x-1 text-sm text-gray-500">
            <Brain className="h-4 w-4" />
            <span>基于 {entries.length} 条记录分析</span>
          </div>
        </div>

        {advice.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Clock className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>记录更多情感日记后，这里将提供个性化建议</p>
          </div>
        ) : (
          <div className="space-y-4">
            {advice.map(item => (
              <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:border-amber-300 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    {getAdviceIcon(item.type)}
                    <h3 className="font-medium text-gray-900">{item.title}</h3>
                  </div>
                  <span className="text-xs px-2 py-1 bg-amber-100 text-amber-700 rounded-full">
                    {(item.relevance * 100).toFixed(0)}% 相关度
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">{item.content}</p>
                
                <div className="space-y-2">
                  <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide">行动建议</h4>
                  <ul className="space-y-1">
                    {item.actionSteps.map((step, index) => (
                      <li key={index} className="flex items-center space-x-2 text-sm text-gray-700">
                        <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                  <span className="capitalize">{item.timeframe.replace('_', ' ')}</span>
                  <span className="capitalize">{item.type}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 统计概览 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">情感健康概览</h3>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="text-2xl font-bold text-green-600">
              {entries.filter(e => e.mood === 'positive').length}
            </div>
            <div className="text-sm text-green-700">积极记录</div>
          </div>
          
          <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-2xl font-bold text-blue-600">
              {entries.length > 0 
                ? (entries.reduce((sum, e) => sum + e.rating, 0) / entries.length).toFixed(1)
                : '0.0'}
            </div>
            <div className="text-sm text-blue-700">平均强度</div>
          </div>
          
          <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
            <div className="text-2xl font-bold text-purple-600">
              {new Set(entries.flatMap(e => e.tags)).size}
            </div>
            <div className="text-sm text-purple-700">情感标签</div>
          </div>
        </div>
        
        <div className="mt-4 text-sm text-gray-600">
          <div className="flex items-center justify-between">
            <span>记录连续性:</span>
            <span className="font-medium">
              {entries.length >= 5 ? '良好' : entries.length >= 2 ? '一般' : '需要改进'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span>情感多样性:</span>
            <span className="font-medium">
              {new Set(entries.map(e => e.emotion)).size >= 5 ? '丰富' : '适中'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}