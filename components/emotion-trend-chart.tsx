'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { format } from 'date-fns'

interface EmotionTrendChartProps {
  data?: Array<{
    date: string
    happiness: number
    sadness: number
    anger: number
    fear: number
    surprise: number
  }>
}

export function EmotionTrendChart({ data = [] }: EmotionTrendChartProps) {
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MM/dd')
    } catch {
      return dateString
    }
  }

  const emotionColors = {
    happiness: '#10B981',
    sadness: '#3B82F6',
    anger: '#EF4444',
    fear: '#8B5CF6',
    surprise: '#F59E0B'
  }

  const emotionNames = {
    happiness: '快乐',
    sadness: '悲伤',
    anger: '愤怒',
    fear: '恐惧',
    surprise: '惊讶'
  }

  // 将数据转换为图表所需的格式
  const chartData = data.map(item => ({
    ...item,
    displayDate: formatDate(item.date)
  }))

  // 自定义tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-lg shadow-md">
          <p className="text-sm font-medium mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              ></div>
              <span>{emotionNames[entry.dataKey as keyof typeof emotionNames]}: {(entry.value * 100).toFixed(1)}%</span>
            </div>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="w-full h-80">
      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey="displayDate" 
              tick={{ fontSize: 12 }}
              tickLine={{ stroke: '#e5e7eb' }}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              tickLine={{ stroke: '#e5e7eb' }}
              domain={[0, 1]}
              tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              formatter={(value) => emotionNames[value as keyof typeof emotionNames]}
              wrapperStyle={{ fontSize: '14px' }}
            />
            
            <Line 
              type="monotone" 
              dataKey="happiness" 
              stroke={emotionColors.happiness}
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
              name="快乐"
            />
            
            <Line 
              type="monotone" 
              dataKey="sadness" 
              stroke={emotionColors.sadness}
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
              name="悲伤"
            />
            
            <Line 
              type="monotone" 
              dataKey="anger" 
              stroke={emotionColors.anger}
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
              name="愤怒"
            />
            
            <Line 
              type="monotone" 
              dataKey="fear" 
              stroke={emotionColors.fear}
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
              name="恐惧"
            />
            
            <Line 
              type="monotone" 
              dataKey="surprise" 
              stroke={emotionColors.surprise}
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
              name="惊讶"
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">暂无数据</p>
        </div>
      )}
    </div>
  )
}