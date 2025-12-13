'use client'

import React, { useState, useMemo, useRef } from 'react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, subMonths } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import { 
  Download, FileText, BarChart3, Calendar, Heart, TrendingUp,
  Users, Star, Award, Clock, Target, CheckCircle
} from 'lucide-react'
import html2canvas from 'html2canvas'

interface EmotionEntry {
  id: string
  date: string
  emotion: string
  intensity: number
  mood: 'positive' | 'neutral' | 'negative'
  content: string
  tags: string[]
}

interface ReportData {
  period: string
  totalEntries: number
  moodDistribution: {
    positive: number
    neutral: number
    negative: number
  }
  avgIntensity: number
  mostFrequentEmotions: Array<{emotion: string, count: number}>
  popularTags: Array<{tag: string, count: number}>
  consistencyScore: number
  growthIndicators: {
    emotionalDiversity: number
    selfAwareness: number
    resilience: number
  }
  trends: {
    weeklyPattern: string
    improvementAreas: string[]
    strengths: string[]
  }
}

interface EmotionHealthReportProps {
  entries: EmotionEntry[]
  period: 'week' | 'month' | '3months' | 'custom'
  customStart?: Date
  customEnd?: Date
}

export function EmotionHealthReport({ entries, period, customStart, customEnd }: EmotionHealthReportProps) {
  const [selectedMonth, setSelectedMonth] = useState(new Date())
  const reportRef = useRef<HTMLDivElement>(null)

  // 计算报告数据
  const reportData = useMemo((): ReportData | null => {
    if (entries.length === 0) return null

    let startDate: Date
    let endDate: Date = new Date()

    switch (period) {
      case 'week':
        startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000)
        break
      case 'month':
        startDate = startOfMonth(selectedMonth)
        endDate = endOfMonth(selectedMonth)
        break
      case '3months':
        startDate = subMonths(endDate, 3)
        break
      case 'custom':
        if (!customStart || !customEnd) return null
        startDate = customStart
        endDate = customEnd
        break
      default:
        startDate = subMonths(endDate, 1)
    }

    const periodEntries = entries.filter(entry => {
      const entryDate = new Date(entry.date)
      return entryDate >= startDate && entryDate <= endDate
    })

    if (periodEntries.length === 0) return null

    // 情绪分布
    const moodDistribution = {
      positive: periodEntries.filter(e => e.mood === 'positive').length,
      neutral: periodEntries.filter(e => e.mood === 'neutral').length,
      negative: periodEntries.filter(e => e.mood === 'negative').length
    }

    // 最频繁的情绪
    const emotionCounts: Record<string, number> = {}
    periodEntries.forEach(entry => {
      emotionCounts[entry.emotion] = (emotionCounts[entry.emotion] || 0) + 1
    })
    const mostFrequentEmotions = Object.entries(emotionCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([emotion, count]) => ({ emotion, count }))

    // 热门标签
    const tagCounts: Record<string, number> = {}
    periodEntries.forEach(entry => {
      entry.tags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1
      })
    })
    const popularTags = Object.entries(tagCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 8)
      .map(([tag, count]) => ({ tag, count }))

    // 一致性评分
    const entryDates = periodEntries.map(e => new Date(e.date).getTime())
    const sortedDates = entryDates.sort((a, b) => a - b)
    const gaps = []
    for (let i = 1; i < sortedDates.length; i++) {
      gaps.push(sortedDates[i] - sortedDates[i - 1])
    }
    const avgGap = gaps.length > 0 ? gaps.reduce((a, b) => a + b, 0) / gaps.length : 0
    const consistencyScore = Math.max(0, 100 - (avgGap / (24 * 60 * 60 * 1000)) * 10) // 基于平均间隔天数

    // 成长指标
    const emotionalDiversity = Math.min(100, (Object.keys(emotionCounts).length / 10) * 100)
    const selfAwareness = Math.min(100, (periodEntries.filter(e => e.content.length > 50).length / periodEntries.length) * 100)
    const resilience = Math.min(100, (moodDistribution.positive / periodEntries.length) * 150)

    // 趋势分析
    const weeklyEntries = periodEntries.filter(e => {
      const entryDate = new Date(e.date)
      return entryDate >= subMonths(endDate, 1) && entryDate <= endDate
    })
    
    const weeklyPositiveRatio = weeklyEntries.length > 0 
      ? weeklyEntries.filter(e => e.mood === 'positive').length / weeklyEntries.length
      : 0
    
    const weeklyPattern = weeklyPositiveRatio > 0.6 ? '上升趋势' : 
                         weeklyPositiveRatio > 0.4 ? '稳定趋势' : '需要关注'

    const improvementAreas = []
    if (moodDistribution.negative > moodDistribution.positive) improvementAreas.push('负面情绪管理')
    if (consistencyScore < 60) improvementAreas.push('记录规律性')
    if (emotionalDiversity < 40) improvementAreas.push('情感多样性')

    const strengths = []
    if (moodDistribution.positive > moodDistribution.negative * 2) strengths.push('积极心态')
    if (selfAwareness > 70) strengths.push('自我觉察')
    if (resilience > 80) strengths.push('情感韧性')

    return {
      period: `${format(startDate, 'yyyy年MM月dd日')} - ${format(endDate, 'yyyy年MM月dd日')}`,
      totalEntries: periodEntries.length,
      moodDistribution,
      avgIntensity: periodEntries.reduce((sum, e) => sum + e.intensity, 0) / periodEntries.length,
      mostFrequentEmotions,
      popularTags,
      consistencyScore: Math.round(consistencyScore),
      growthIndicators: {
        emotionalDiversity: Math.round(emotionalDiversity),
        selfAwareness: Math.round(selfAwareness),
        resilience: Math.round(resilience)
      },
      trends: {
        weeklyPattern,
        improvementAreas,
        strengths
      }
    }
  }, [entries, period, selectedMonth, customStart, customEnd])

  const exportAsImage = async () => {
    if (!reportRef.current) return

    try {
      const canvas = await html2canvas(reportRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        logging: false,
        useCORS: true
      })
      
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = url
          a.download = `情感健康报告_${format(new Date(), 'yyyy-MM-dd')}.png`
          document.body.appendChild(a)
          a.click()
          document.body.removeChild(a)
          URL.revokeObjectURL(url)
        }
      }, 'image/png')
    } catch (error) {
      console.error('导出图片失败:', error)
      alert('导出失败，请重试')
    }
  }

  const exportAsText = () => {
    if (!reportData) return

    const textContent = `情感健康报告

报告期间: ${reportData.period}
总记录数: ${reportData.totalEntries} 条

情绪分布:
- 积极情绪: ${reportData.moodDistribution.positive} 条 (${((reportData.moodDistribution.positive / reportData.totalEntries) * 100).toFixed(1)}%)
- 中性情绪: ${reportData.moodDistribution.neutral} 条 (${((reportData.moodDistribution.neutral / reportData.totalEntries) * 100).toFixed(1)}%)
- 消极情绪: ${reportData.moodDistribution.negative} 条 (${((reportData.moodDistribution.negative / reportData.totalEntries) * 100).toFixed(1)}%)

关键指标:
- 平均情感强度: ${reportData.avgIntensity.toFixed(1)}/5
- 记录一致性: ${reportData.consistencyScore}/100
- 情感多样性: ${reportData.growthIndicators.emotionalDiversity}/100
- 自我觉察: ${reportData.growthIndicators.selfAwareness}/100
- 情感韧性: ${reportData.growthIndicators.resilience}/100

热门情绪: ${reportData.mostFrequentEmotions.map(e => `${e.emotion}(${e.count})`).join(', ')}

趋势分析: ${reportData.trends.weeklyPattern}
优势领域: ${reportData.trends.strengths.join(', ') || '无'}
改进方向: ${reportData.trends.improvementAreas.join(', ') || '无'}

生成时间: ${format(new Date(), 'yyyy年MM月dd日 HH:mm', { locale: zhCN })}
工具: 丘比特AI情感健康报告`

    const blob = new Blob([textContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `情感健康报告_${format(new Date(), 'yyyy-MM-dd')}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (!reportData) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
        <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
        <p className="text-gray-500">没有足够的数据生成报告</p>
        <p className="text-sm text-gray-400">请先记录一些情感日记</p>
      </div>
    )
  }

  const overallScore = Math.round(
    (reportData.consistencyScore + 
     reportData.growthIndicators.emotionalDiversity + 
     reportData.growthIndicators.selfAwareness + 
     reportData.growthIndicators.resilience) / 4
  )

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100'
    if (score >= 60) return 'text-amber-600 bg-amber-100'
    return 'text-red-600 bg-red-100'
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return '优秀'
    if (score >= 60) return '良好'
    if (score >= 40) return '一般'
    return '需要关注'
  }

  return (
    <div className="space-y-6">
      {/* 报告头部 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <FileText className="h-6 w-6 text-rose-500" />
            <h2 className="text-xl font-semibold text-gray-900">情感健康报告</h2>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={exportAsText}
              className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm hover:bg-gray-200 transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>导出文本</span>
            </button>
            <button
              onClick={exportAsImage}
              className="flex items-center space-x-2 bg-rose-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-rose-600 transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>导出图片</span>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>{reportData.period}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Heart className="h-4 w-4" />
            <span>{reportData.totalEntries} 条记录</span>
          </div>
        </div>
      </div>

      {/* 报告内容 */}
      <div ref={reportRef} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
        {/* 总体评分 */}
        <div className="text-center py-6 bg-gradient-to-r from-rose-50 to-pink-50 rounded-lg border border-rose-200">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white border-4 border-rose-200 mb-4">
            <span className={`text-2xl font-bold ${getScoreColor(overallScore).split(' ')[0]}`}>
              {overallScore}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">情感健康综合评分</h3>
          <p className={`text-lg font-medium ${getScoreColor(overallScore)} px-4 py-2 rounded-full inline-block`}>
            {getScoreLabel(overallScore)}
          </p>
        </div>

        {/* 关键指标 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-blue-500" />
            <span>关键指标</span>
          </h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">记录一致性</span>
                <span className="font-medium">{reportData.consistencyScore}/100</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${reportData.consistencyScore}%` }}
                />
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">情感多样性</span>
                <span className="font-medium">{reportData.growthIndicators.emotionalDiversity}/100</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${reportData.growthIndicators.emotionalDiversity}%` }}
                />
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">自我觉察</span>
                <span className="font-medium">{reportData.growthIndicators.selfAwareness}/100</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${reportData.growthIndicators.selfAwareness}%` }}
                />
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">情感韧性</span>
                <span className="font-medium">{reportData.growthIndicators.resilience}/100</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-amber-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${reportData.growthIndicators.resilience}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 情绪分布 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <Heart className="h-5 w-5 text-rose-500" />
            <span>情绪分布</span>
          </h3>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="text-2xl font-bold text-green-600">{reportData.moodDistribution.positive}</div>
              <div className="text-sm text-green-700">积极情绪</div>
              <div className="text-xs text-green-600 mt-1">
                {((reportData.moodDistribution.positive / reportData.totalEntries) * 100).toFixed(1)}%
              </div>
            </div>
            
            <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-2xl font-bold text-blue-600">{reportData.moodDistribution.neutral}</div>
              <div className="text-sm text-blue-700">中性情绪</div>
              <div className="text-xs text-blue-600 mt-1">
                {((reportData.moodDistribution.neutral / reportData.totalEntries) * 100).toFixed(1)}%
              </div>
            </div>
            
            <div className="text-center p-4 bg-rose-50 rounded-lg border border-rose-200">
              <div className="text-2xl font-bold text-rose-600">{reportData.moodDistribution.negative}</div>
              <div className="text-sm text-rose-700">消极情绪</div>
              <div className="text-xs text-rose-600 mt-1">
                {((reportData.moodDistribution.negative / reportData.totalEntries) * 100).toFixed(1)}%
              </div>
            </div>
          </div>
        </div>

        {/* 趋势分析 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-purple-500" />
            <span>趋势分析</span>
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-700 mb-2">当前趋势</h4>
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${
                  reportData.trends.weeklyPattern === '上升趋势' ? 'bg-green-500' :
                  reportData.trends.weeklyPattern === '稳定趋势' ? 'bg-blue-500' : 'bg-amber-500'
                }`} />
                <span>{reportData.trends.weeklyPattern}</span>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-700 mb-2">平均情感强度</h4>
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>{reportData.avgIntensity.toFixed(1)}/5</span>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mt-4">
            <div>
              <h4 className="font-medium text-gray-700 mb-2 flex items-center space-x-2">
                <Target className="h-4 w-4 text-green-500" />
                <span>优势领域</span>
              </h4>
              {reportData.trends.strengths.length > 0 ? (
                <ul className="space-y-1">
                  {reportData.trends.strengths.map((strength, index) => (
                    <li key={index} className="flex items-center space-x-2 text-sm text-green-700">
                      <CheckCircle className="h-3 w-3" />
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">暂无显著优势</p>
              )}
            </div>
            
            <div>
              <h4 className="font-medium text-gray-700 mb-2 flex items-center space-x-2">
                <Clock className="h-4 w-4 text-amber-500" />
                <span>改进方向</span>
              </h4>
              {reportData.trends.improvementAreas.length > 0 ? (
                <ul className="space-y-1">
                  {reportData.trends.improvementAreas.map((area, index) => (
                    <li key={index} className="flex items-center space-x-2 text-sm text-amber-700">
                      <Award className="h-3 w-3" />
                      <span>{area}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">表现良好，继续保持</p>
              )}
            </div>
          </div>
        </div>

        {/* 热门情绪和标签 */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-700 mb-3">热门情绪</h4>
            <div className="space-y-2">
              {reportData.mostFrequentEmotions.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{item.emotion}</span>
                  <span className="text-sm font-medium text-gray-700">{item.count}次</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-700 mb-3">热门标签</h4>
            <div className="flex flex-wrap gap-2">
              {reportData.popularTags.map((tag, index) => (
                <span key={index} className="px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-sm">
                  #{tag.tag} ({tag.count})
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 报告脚注 */}
        <div className="pt-4 border-t border-gray-200 text-center text-sm text-gray-500">
          <p>报告生成时间: {format(new Date(), 'yyyy年MM月dd日 HH:mm', { locale: zhCN })}</p>
          <p>丘比特AI情感健康报告 - 让情感管理更科学</p>
        </div>
      </div>
    </div>
  )
}