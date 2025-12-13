'use client'

import React, { useState, useEffect } from 'react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday, addMonths, subMonths } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import { ChevronLeft, ChevronRight, Calendar, Heart, TrendingUp, BarChart3 } from 'lucide-react'

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

interface EmotionCalendarProps {
  diaries: EmotionEntry[]
  onDateSelect?: (date: Date) => void
  selectedDate?: Date
}

const emotionColors = {
  positive: 'from-green-400 to-emerald-500',
  neutral: 'from-blue-400 to-indigo-500', 
  negative: 'from-rose-400 to-pink-500'
}

const emotionIcons = {
  positive: '😊',
  neutral: '😐',
  negative: '😔'
}

const intensityColors = [
  'bg-gray-200',      // 强度1
  'bg-gray-300',      // 强度2  
  'bg-gray-400',      // 强度3
  'bg-gray-500',      // 强度4
  'bg-gray-600'       // 强度5
]

export function EmotionCalendar({ diaries, onDateSelect, selectedDate }: EmotionCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [monthStats, setMonthStats] = useState({
    positive: 0,
    neutral: 0,
    negative: 0,
    total: 0,
    avgIntensity: 0
  })

  // 计算月份统计数据
  useEffect(() => {
    const monthStart = startOfMonth(currentMonth)
    const monthEnd = endOfMonth(currentMonth)
    
    const monthEntries = entries.filter(entry => {
      const entryDate = new Date(entry.date)
      return entryDate >= monthStart && entryDate <= monthEnd
    })

    const stats = {
      positive: monthEntries.filter(e => e.mood === 'positive').length,
      neutral: monthEntries.filter(e => e.mood === 'neutral').length,
      negative: monthEntries.filter(e => e.mood === 'negative').length,
      total: monthEntries.length,
      avgIntensity: monthEntries.length > 0 
        ? monthEntries.reduce((sum, e) => sum + e.intensity, 0) / monthEntries.length
        : 0
    }

    setMonthStats(stats)
  }, [entries, currentMonth])

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const calendarDays = eachDayOfInterval({ start: monthStart, end: monthEnd })

  // 获取月份第一天是星期几（0-6，0是周日）
  const startDay = monthStart.getDay()
  const emptyDays = Array(startDay).fill(null)

  const getDayEmotion = (date: Date) => {
    return entries.find(entry => isSameDay(new Date(entry.date), date))
  }

  const getDayColor = (date: Date) => {
    const emotion = getDayEmotion(date)
    if (!emotion) return 'bg-gray-50 border-gray-200'
    
    return `bg-gradient-to-br ${emotionColors[emotion.mood]} border-${emotion.mood === 'positive' ? 'green' : emotion.mood === 'negative' ? 'rose' : 'blue'}-200`
  }

  const getIntensityDots = (intensity: number) => {
    return Array(5).fill(0).map((_, i) => (
      <div 
        key={i}
        className={`w-1 h-1 rounded-full ${i < intensity ? intensityColors[intensity - 1] : 'bg-gray-200'}`}
      />
    ))
  }

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1))
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1))

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {/* 日历头部 */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-rose-500" />
            <h2 className="text-xl font-semibold text-gray-900">情感日历</h2>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full">快乐</span>
            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full">中性</span>
            <span className="px-2 py-1 bg-rose-100 text-rose-700 rounded-full">低落</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button 
            onClick={prevMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="text-lg font-medium text-gray-900 min-w-[120px] text-center">
            {format(currentMonth, 'yyyy年MM月', { locale: zhCN })}
          </span>
          <button 
            onClick={nextMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* 月份统计 */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">{monthStats.positive}</div>
          <div className="text-sm text-green-700">快乐日</div>
        </div>
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{monthStats.neutral}</div>
          <div className="text-sm text-blue-700">中性日</div>
        </div>
        <div className="text-center p-3 bg-rose-50 rounded-lg">
          <div className="text-2xl font-bold text-rose-600">{monthStats.negative}</div>
          <div className="text-sm text-rose-700">低落日</div>
        </div>
        <div className="text-center p-3 bg-purple-50 rounded-lg">
          <div className="text-2xl font-bold text-purple-600">{monthStats.avgIntensity.toFixed(1)}</div>
          <div className="text-sm text-purple-700">平均强度</div>
        </div>
      </div>

      {/* 日历网格 */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['日', '一', '二', '三', '四', '五', '六'].map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {/* 空白的日期格子（用于对齐） */}
        {emptyDays.map((_, index) => (
          <div key={`empty-${index}`} className="h-20 bg-gray-50 rounded-lg" />
        ))}
        
        {/* 日期格子 */}
        {calendarDays.map(day => {
          const emotion = getDayEmotion(day)
          const isSelected = selectedDate && isSameDay(day, selectedDate)
          const isCurrentDay = isToday(day)
          
          return (
            <button
              key={day.toISOString()}
              onClick={() => onDateSelect(day)}
              className={`
                h-20 p-2 rounded-lg border-2 transition-all duration-200
                flex flex-col items-center justify-center
                ${getDayColor(day)}
                ${isSelected ? 'ring-2 ring-rose-500 ring-offset-2' : ''}
                ${isCurrentDay ? 'border-rose-300' : 'border-transparent'}
                hover:scale-105 hover:shadow-md
              `}
            >
              <div className="flex items-center justify-between w-full mb-1">
                <span className={`text-sm font-medium ${
                  emotion ? 'text-white' : 'text-gray-500'
                }`}>
                  {format(day, 'd')}
                </span>
                {isCurrentDay && (
                  <div className="w-2 h-2 bg-rose-500 rounded-full" />
                )}
              </div>
              
              {emotion && (
                <div className="flex flex-col items-center space-y-1">
                  <span className="text-lg">{emotionIcons[emotion.mood]}</span>
                  <div className="flex space-x-1">
                    {getIntensityDots(emotion.intensity)}
                  </div>
                </div>
              )}
              
              {!emotion && (
                <div className="text-gray-400 text-xs">无记录</div>
              )}
            </button>
          )
        })}
      </div>

      {/* 日历图例 */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-4">
            <span>情感强度：</span>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map(intensity => (
                <div key={intensity} className="flex items-center space-x-1">
                  <div className="flex space-x-0.5">
                    {getIntensityDots(intensity)}
                  </div>
                  <span className="text-xs">{intensity}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4" />
            <span>本月记录：{monthStats.total}天</span>
          </div>
        </div>
      </div>
    </div>
  )
}