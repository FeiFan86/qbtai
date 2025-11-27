'use client'

import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts'

interface EmotionRadarChartProps {
  data?: Array<{
    emotion: string
    value: number
  }>
}

export function EmotionRadarChart({ data = [] }: EmotionRadarChartProps) {
  // 情感类型到中文的映射
  const emotionNameMap: Record<string, string> = {
    happiness: '快乐',
    sadness: '悲伤',
    anger: '愤怒',
    fear: '恐惧',
    surprise: '惊讶',
    anticipation: '期待',
    trust: '信任',
    disgust: '厌恶'
  }

  // 处理数据，将英文情感名称转换为中文
  const processedData = data.map(item => ({
    ...item,
    emotion: emotionNameMap[item.emotion] || item.emotion,
    fullMark: 1
  }))

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart
          data={processedData}
          margin={{
            top: 20,
            right: 80,
            bottom: 20,
            left: 80,
          }}
        >
          <PolarGrid 
            stroke="#e5e7eb"
            radialLines={true}
          />
          <PolarAngleAxis 
            dataKey="emotion"
            tick={{ fontSize: 12 }}
            className="fill-gray-700"
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 1]}
            tickCount={6}
            tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
            tick={{ fontSize: 10 }}
          />
          <Radar
            name="情感强度"
            dataKey="value"
            stroke="#ec4899"
            fill="#ec4899"
            fillOpacity={0.6}
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}