'use client'

import { useState, useEffect } from 'react'
import GlobalNavbar from '@/components/global-navbar'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts'
import { BarChart3, PieChart as PieChartIcon, TrendingUp, Calendar, Filter, Download } from 'lucide-react'
import { EmotionTrendChart } from '@/components/emotion-trend-chart'
import { EmotionRadarChart } from '@/components/emotion-radar-chart'
import { EmotionDistributionChart } from '@/components/emotion-distribution-chart'

export default function DataVisualizationPage() {
  const [timeRange, setTimeRange] = useState('7days')
  const [emotionData, setEmotionData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  // 模拟数据，实际应用中从API获取
  const mockEmotionData = {
    trendData: [
      { date: '2024-01-20', happiness: 0.65, sadness: 0.15, anger: 0.05, fear: 0.05, surprise: 0.10 },
      { date: '2024-01-21', happiness: 0.70, sadness: 0.10, anger: 0.05, fear: 0.03, surprise: 0.12 },
      { date: '2024-01-22', happiness: 0.55, sadness: 0.20, anger: 0.10, fear: 0.08, surprise: 0.07 },
      { date: '2024-01-23', happiness: 0.60, sadness: 0.15, anger: 0.08, fear: 0.05, surprise: 0.12 },
      { date: '2024-01-24', happiness: 0.75, sadness: 0.10, anger: 0.03, fear: 0.04, surprise: 0.08 },
      { date: '2024-01-25', happiness: 0.80, sadness: 0.05, anger: 0.02, fear: 0.03, surprise: 0.10 },
      { date: '2024-01-26', happiness: 0.70, sadness: 0.10, anger: 0.05, fear: 0.05, surprise: 0.10 },
    ],
    radarData: [
      { emotion: '快乐', value: 0.70 },
      { emotion: '悲伤', value: 0.15 },
      { emotion: '愤怒', value: 0.05 },
      { emotion: '恐惧', value: 0.05 },
      { emotion: '惊讶', value: 0.10 },
      { emotion: '期待', value: 0.25 },
      { emotion: '信任', value: 0.40 },
      { emotion: '厌恶', value: 0.05 },
    ],
    distributionData: [
      { name: '快乐', value: 35, color: '#10B981' },
      { name: '悲伤', value: 10, color: '#3B82F6' },
      { name: '愤怒', value: 5, color: '#EF4444' },
      { name: '恐惧', value: 5, color: '#8B5CF6' },
      { name: '惊讶', value: 10, color: '#F59E0B' },
      { name: '期待', value: 15, color: '#EC4899' },
      { name: '信任', value: 20, color: '#06B6D4' },
    ],
    summary: {
      dominantEmotion: '快乐',
      averageSentiment: 'positive',
      emotionalStability: '稳定',
      totalEntries: 15,
      weeklyChange: '+5%'
    }
  }

  useEffect(() => {
    // 模拟加载数据
    setIsLoading(true)
    setTimeout(() => {
      setEmotionData(mockEmotionData)
      setIsLoading(false)
    }, 1000)
  }, [timeRange])

  const handleExportData = () => {
    // 实现数据导出功能
    console.log('导出数据')
  }

  const COLORS = ['#10B981', '#3B82F6', '#EF4444', '#8B5CF6', '#F59E0B', '#EC4899', '#06B6D4', '#6B7280']

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <GlobalNavbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold tracking-tight gradient-text mb-4">
              情感数据洞察
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              可视化分析您的情感数据，深入了解情感模式和趋势
            </p>
          </div>

          <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="选择时间范围" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7days">最近7天</SelectItem>
                    <SelectItem value="30days">最近30天</SelectItem>
                    <SelectItem value="90days">最近3个月</SelectItem>
                    <SelectItem value="1year">最近1年</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Button variant="outline" onClick={handleExportData}>
              <Download className="h-4 w-4 mr-2" />
              导出数据
            </Button>
          </div>

          {/* 情感概览卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">主导情感</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{emotionData?.summary.dominantEmotion}</div>
                <p className="text-xs text-gray-500">本周最常出现的情感</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">整体基调</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {emotionData?.summary.averageSentiment === 'positive' ? '积极' : 
                   emotionData?.summary.averageSentiment === 'negative' ? '消极' : '中性'}
                </div>
                <p className="text-xs text-gray-500">情感整体倾向</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">情感稳定性</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">{emotionData?.summary.emotionalStability}</div>
                <p className="text-xs text-gray-500">情感波动程度</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">记录总数</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">{emotionData?.summary.totalEntries}</div>
                <p className="text-xs text-gray-500">本周分析次数</p>
              </CardContent>
            </Card>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500 mx-auto mb-4"></div>
                <p className="text-gray-500">加载数据中...</p>
              </div>
            </div>
          ) : (
            <Tabs defaultValue="trends" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="trends" className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  趋势分析
                </TabsTrigger>
                <TabsTrigger value="distribution" className="flex items-center gap-2">
                  <PieChartIcon className="h-4 w-4" />
                  情感分布
                </TabsTrigger>
                <TabsTrigger value="radar" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  情感雷达
                </TabsTrigger>
                <TabsTrigger value="comparison" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  对比分析
                </TabsTrigger>
              </TabsList>

              <TabsContent value="trends" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>情感趋势分析</CardTitle>
                    <CardDescription>
                      查看不同情感随时间的变化趋势
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <EmotionTrendChart data={emotionData?.trendData} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="distribution" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>情感分布</CardTitle>
                    <CardDescription>
                      查看各种情感类型的占比分布
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <EmotionDistributionChart data={emotionData?.distributionData} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="radar" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>情感雷达图</CardTitle>
                    <CardDescription>
                      全面了解当前情感状态的多维分析
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <EmotionRadarChart data={emotionData?.radarData} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="comparison" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>对比分析</CardTitle>
                    <CardDescription>
                      比较不同时间段或场景的情感状态
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center justify-center h-64 text-center">
                      <Filter className="h-12 w-12 text-gray-400 mb-4" />
                      <p className="text-gray-500 mb-4">对比分析功能即将上线</p>
                      <Button variant="outline" disabled>
                        即将推出
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  )
}