'use client'

import React, { useState, useMemo } from 'react'
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area
} from 'recharts'
import { format, subDays, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import { TrendingUp, BarChart3, PieChart as PieChartIcon, Calendar, Filter, Download } from 'lucide-react'

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

interface EmotionDashboardProps {
  diaries: EmotionEntry[]
  timeRange?: 'week' | 'month' | '3months' | 'year'
}

const moodColors = {
  positive: '#10B981',
  neutral: '#3B82F6', 
  negative: '#EF4444'
}

const intensityColors = ['#E5E7EB', '#D1D5DB', '#9CA3AF', '#6B7280', '#374151']

export function EmotionDashboard({ diaries: entries, timeRange = 'month' }: EmotionDashboardProps) {
  const [activeChart, setActiveChart] = useState<'trend' | 'distribution' | 'heatmap'>('trend')

  // 根据时间范围过滤数据
  const filteredEntries = useMemo(() => {
    const now = new Date()
    let startDate: Date

    switch (timeRange) {
      case 'week':
        startDate = subDays(now, 7)
        break
      case 'month':
        startDate = subDays(now, 30)
        break
      case '3months':
        startDate = subDays(now, 90)
        break
      case 'year':
        startDate = subDays(now, 365)
        break
      default:
        startDate = subDays(now, 30)
    }

    return entries.filter(entry => new Date(entry.date) >= startDate)
  }, [entries, timeRange])

  // 生成趋势数据
  const trendData = useMemo(() => {
    const now = new Date()
    let days: number
    let interval: 'day' | 'week'

    switch (timeRange) {
      case 'week':
        days = 7
        interval = 'day'
        break
      case 'month':
        days = 30
        interval = 'day'
        break
      case '3months':
        days = 90
        interval = 'week'
        break
      case 'year':
        days = 365
        interval = 'week'
        break
      default:
        days = 30
        interval = 'day'
    }

    const data = []
    for (let i = days - 1; i >= 0; i--) {
      const date = subDays(now, i)
      const dayEntries = filteredEntries.filter(entry => 
        interval === 'day' 
          ? format(new Date(entry.date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
          : startOfWeek(date) <= new Date(entry.date) && new Date(entry.date) <= endOfWeek(date)
      )

      const moodCounts = {
        positive: dayEntries.filter(e => e.mood === 'positive').length,
        neutral: dayEntries.filter(e => e.mood === 'neutral').length,
        negative: dayEntries.filter(e => e.mood === 'negative').length
      }

      const avgIntensity = dayEntries.length > 0 
        ? dayEntries.reduce((sum, e) => sum + e.intensity, 0) / dayEntries.length
        : 0

      data.push({
        date: interval === 'day' ? format(date, 'MM/dd') : `第${Math.floor(i/7)+1}周`,
        positive: moodCounts.positive,
        neutral: moodCounts.neutral,
        negative: moodCounts.negative,
        intensity: avgIntensity,
        total: dayEntries.length
      })
    }

    return data
  }, [filteredEntries, timeRange])

  // 情感分布数据
  const distributionData = useMemo(() => {
    const moodCounts = {
      positive: filteredEntries.filter(e => e.mood === 'positive').length,
      neutral: filteredEntries.filter(e => e.mood === 'neutral').length,
      negative: filteredEntries.filter(e => e.mood === 'negative').length
    }

    return [
      { name: '快乐', value: moodCounts.positive, color: moodColors.positive },
      { name: '中性', value: moodCounts.neutral, color: moodColors.neutral },
      { name: '低落', value: moodCounts.negative, color: moodColors.negative }
    ].filter(item => item.value > 0)
  }, [filteredEntries])

  // 强度分布数据
  const intensityData = useMemo(() => {
    const intensityCounts = [0, 0, 0, 0, 0]
    filteredEntries.forEach(entry => {
      if (entry.intensity >= 1 && entry.intensity <= 5) {
        intensityCounts[entry.intensity - 1]++
      }
    })

    return intensityCounts.map((count, index) => ({
      intensity: index + 1,
      count,
      color: intensityColors[index]
    }))
  }, [filteredEntries])

  // 标签分析数据
  const tagData = useMemo(() => {
    const tagCounts: Record<string, number> = {}
    filteredEntries.forEach(entry => {
      entry.tags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1
      })
    })

    return Object.entries(tagCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([tag, count]) => ({
        tag,
        count,
        percentage: ((count / filteredEntries.length) * 100).toFixed(1)
      }))
  }, [filteredEntries])

  // 统计数据
  const stats = useMemo(() => {
    const totalEntries = filteredEntries.length
    const positivePercentage = totalEntries > 0 
      ? ((filteredEntries.filter(e => e.mood === 'positive').length / totalEntries) * 100).toFixed(1)
      : '0.0'
    const avgIntensity = totalEntries > 0 
      ? (filteredEntries.reduce((sum, e) => sum + e.intensity, 0) / totalEntries).toFixed(1)
      : '0.0'

    return {
      totalEntries,
      positivePercentage,
      avgIntensity,
      uniqueTags: new Set(filteredEntries.flatMap(e => e.tags)).size
    }
  }, [filteredEntries])

  const exportChart = () => {
    // 简单的导出功能（可以扩展为图片导出）
    const dataStr = JSON.stringify({
      trendData,
      distributionData,
      intensityData,
      tagData,
      stats
    }, null, 2)
    
    const blob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `情感分析报告_${format(new Date(), 'yyyy-MM-dd')}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {/* 仪表板头部 */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <BarChart3 className="h-6 w-6 text-rose-500" />
          <h2 className="text-xl font-semibold text-gray-900">情感分析仪表板</h2>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-1">
            <Calendar className="h-4 w-4 text-gray-600" />
            <span className="text-sm text-gray-700">
              {timeRange === 'week' ? '最近7天' : 
               timeRange === 'month' ? '最近30天' :
               timeRange === '3months' ? '最近3个月' : '最近1年'}
            </span>
          </div>
          
          <button 
            onClick={exportChart}
            className="flex items-center space-x-2 bg-rose-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-rose-600 transition-colors"
          >
            <Download className="h-4 w-4" />
            <span>导出数据</span>
          </button>
        </div>
      </div>

      {/* 统计概览 */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
          <div className="text-2xl font-bold text-green-600">{stats.totalEntries}</div>
          <div className="text-sm text-green-700">总记录数</div>
        </div>
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
          <div className="text-2xl font-bold text-blue-600">{stats.positivePercentage}%</div>
          <div className="text-sm text-blue-700">积极情绪占比</div>
        </div>
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
          <div className="text-2xl font-bold text-purple-600">{stats.avgIntensity}</div>
          <div className="text-sm text-purple-700">平均情感强度</div>
        </div>
        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-4 border border-orange-200">
          <div className="text-2xl font-bold text-orange-600">{stats.uniqueTags}</div>
          <div className="text-sm text-orange-700">独特标签数</div>
        </div>
      </div>

      {/* 图表切换 */}
      <div className="flex space-x-2 mb-6">
        <button
          onClick={() => setActiveChart('trend')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeChart === 'trend' 
              ? 'bg-rose-500 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <TrendingUp className="h-4 w-4 inline mr-2" />
          情感趋势
        </button>
        <button
          onClick={() => setActiveChart('distribution')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeChart === 'distribution' 
              ? 'bg-rose-500 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <PieChartIcon className="h-4 w-4 inline mr-2" />
          情感分布
        </button>
      </div>

      {/* 情感趋势图 */}
      {activeChart === 'trend' && (
        <div className="space-y-6">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip 
                  formatter={(value, name) => [
                    value, 
                    name === 'positive' ? '快乐' : 
                    name === 'neutral' ? '中性' : 
                    name === 'negative' ? '低落' : '强度'
                  ]}
                />
                <Legend 
                  formatter={(value) => 
                    value === 'positive' ? '快乐' : 
                    value === 'neutral' ? '中性' : 
                    value === 'negative' ? '低落' : '强度'
                  }
                />
                <Area 
                  type="monotone" 
                  dataKey="positive" 
                  stackId="1" 
                  stroke={moodColors.positive} 
                  fill={moodColors.positive}
                  fillOpacity={0.6}
                />
                <Area 
                  type="monotone" 
                  dataKey="neutral" 
                  stackId="1" 
                  stroke={moodColors.neutral} 
                  fill={moodColors.neutral}
                  fillOpacity={0.6}
                />
                <Area 
                  type="monotone" 
                  dataKey="negative" 
                  stackId="1" 
                  stroke={moodColors.negative} 
                  fill={moodColors.negative}
                  fillOpacity={0.6}
                />
                <Line 
                  type="monotone" 
                  dataKey="intensity" 
                  stroke="#8B5CF6" 
                  strokeWidth={3}
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* 强度分布 */}
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={intensityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="intensity" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {intensityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={intensityColors[entry.intensity - 1]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* 情感分布图 */}
      {activeChart === 'distribution' && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={distributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {distributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [value, '记录数']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* 标签分布 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">热门标签</h3>
            <div className="space-y-3">
              {tagData.map((tag, index) => (
                <div key={tag.tag} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{tag.tag}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-rose-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${tag.percentage}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 w-8 text-right">{tag.count}次</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}