'use client'

import React, { useState } from 'react'
import { BarChart3, TrendingUp, Calendar, Filter, Download, Share2, Target, Users, Heart, MessageCircle, Star, Award, ChevronDown, ChevronUp } from 'lucide-react'
import GlobalNavbar from '@/components/global-navbar'
import UsageGuard, { UsageStatus } from '@/components/usage-guard'

interface EmotionData {
  name: string;
  value: number;
  color: string;
  trend: 'up' | 'down' | 'stable';
  description: string;
}

interface TrendData {
  date: string;
  happiness: number;
  communication: number;
  intimacy: number;
  stability: number;
}

export default function DataInsightsPage() {
  const [timeRange, setTimeRange] = useState('month')
  const [expandedSections, setExpandedSections] = useState({
    emotions: true,
    trends: true,
    insights: true,
    recommendations: true
  })
  
  const emotionData: EmotionData[] = [
    { name: '快乐', value: 45, color: 'bg-green-500', trend: 'up', description: '积极情感显著增加' },
    { name: '感动', value: 25, color: 'bg-blue-500', trend: 'stable', description: '情感表达稳定' },
    { name: '期待', value: 20, color: 'bg-purple-500', trend: 'up', description: '对未来充满期待' },
    { name: '安心', value: 15, color: 'bg-yellow-500', trend: 'stable', description: '安全感持续' },
    { name: '复杂', value: 10, color: 'bg-orange-500', trend: 'down', description: '矛盾情绪减少' },
    { name: '低落', value: 5, color: 'bg-red-500', trend: 'down', description: '负面情绪控制良好' },
  ]

  const trendData: TrendData[] = [
    { date: '12-01', happiness: 72, communication: 68, intimacy: 75, stability: 80 },
    { date: '12-02', happiness: 78, communication: 72, intimacy: 78, stability: 82 },
    { date: '12-03', happiness: 75, communication: 70, intimacy: 76, stability: 81 },
    { date: '12-04', happiness: 82, communication: 78, intimacy: 80, stability: 85 },
    { date: '12-05', happiness: 85, communication: 80, intimacy: 82, stability: 87 },
    { date: '12-06', happiness: 88, communication: 83, intimacy: 85, stability: 90 },
  ]

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const generateInsightsReport = () => {
    const reportContent = `
# 情感数据洞察报告

## 数据概览
- 分析时间范围: ${timeRange === 'week' ? '最近一周' : timeRange === 'month' ? '最近一月' : timeRange === 'quarter' ? '最近三月' : '最近一年'}
- 总体幸福感: 87%
- 关系稳定度: 92%
- 情感表达质量: 积极

## 情感分布
${emotionData.map(emotion => `- ${emotion.name}: ${emotion.value}% (${emotion.description})`).join('\n')}

## 趋势分析
最近一周情感状态呈明显上升趋势，特别是在幸福感和亲密关系方面有显著提升。

## 关键洞察
1. 情感表达更加丰富和积极
2. 沟通质量持续改善
3. 关系稳定性不断增强
4. 矛盾处理能力显著提升

## 建议
1. 继续保持深度沟通习惯
2. 增加共同活动时间
3. 尝试新的情感表达方式
4. 定期进行情感回顾

分析时间: ${new Date().toLocaleString()}
工具: 丘比特AI数据洞察
    `.trim()

    const blob = new Blob([reportContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `情感洞察报告_${new Date().getTime()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const shareInsights = async () => {
    const shareText = `📊 情感数据洞察\n\n总体幸福感: 87% 📈\n关系稳定度: 92% 💪\n情感表达: 积极 🌟\n\n#丘比特AI #情感洞察`
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: '我的情感数据洞察',
          text: shareText
        })
      } catch (error) {
        console.log('分享取消')
      }
    } else {
      navigator.clipboard.writeText(shareText)
      alert('洞察结果已复制到剪贴板，可以粘贴到社交媒体分享')
    }
  }

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-500" />
      case 'down': return <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />
      default: return <span className="h-4 w-4 text-gray-400">-</span>
    }
  }

  return (
    <UsageGuard feature="data-insights">
      {({ canUse, remainingUses, onUse, isLoading, usageText }) => (
        <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
          <GlobalNavbar />

          <main className="pt-16">
            <div className="container py-12">
              {/* 页面标题 */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 mb-4">
                  <BarChart3 className="h-5 w-5 text-rose-500 mr-2" />
                  <span className="text-sm font-medium text-gray-700">数据洞察</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  情感数据可视化
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  通过数据分析发现情感模式，洞察关系成长轨迹，优化情感体验
                </p>
              </div>

              {/* 使用状态提示 */}
              <div className="max-w-4xl mx-auto mb-6">
                <UsageStatus feature="data-insights" className="justify-center" />
              </div>

              {/* 操作工具栏 */}
              <div className="max-w-4xl mx-auto mb-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                  <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center space-x-4">
                      <Filter className="h-5 w-5 text-gray-500" />
                      <span className="text-gray-700 font-medium">时间范围</span>
                      <div className="flex space-x-2">
                        {['week', 'month', 'quarter', 'year'].map((range) => (
                          <button
                            key={range}
                            onClick={() => setTimeRange(range)}
                            className={`px-4 py-2 rounded-lg transition-colors ${
                              timeRange === range 
                                ? 'bg-rose-500 text-white' 
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            {range === 'week' ? '最近一周' :
                             range === 'month' ? '最近一月' :
                             range === 'quarter' ? '最近三月' : '最近一年'}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={generateInsightsReport}
                        className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                      >
                        <Download className="h-4 w-4" />
                        <span>导出报告</span>
                      </button>
                      <button 
                        onClick={shareInsights}
                        className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        <Share2 className="h-4 w-4" />
                        <span>分享</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* 关键指标概览 */}
              <div className="max-w-4xl mx-auto grid md:grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold mb-2">87%</div>
                  <div className="text-sm opacity-90">总体幸福感</div>
                  <div className="flex items-center justify-center mt-2">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span className="text-xs">+5% 本周</span>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold mb-2">92%</div>
                  <div className="text-sm opacity-90">关系稳定度</div>
                  <div className="flex items-center justify-center mt-2">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span className="text-xs">+3% 本周</span>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold mb-2">85%</div>
                  <div className="text-sm opacity-90">亲密关系</div>
                  <div className="flex items-center justify-center mt-2">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span className="text-xs">+7% 本周</span>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-rose-500 to-orange-500 text-white rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold mb-2">83%</div>
                  <div className="text-sm opacity-90">沟通质量</div>
                  <div className="flex items-center justify-center mt-2">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span className="text-xs">+4% 本周</span>
                  </div>
                </div>
              </div>

              {/* 情感分布 */}
              <div className="max-w-4xl mx-auto mb-8">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div 
                    className="flex items-center justify-between p-6 cursor-pointer"
                    onClick={() => toggleSection('emotions')}
                  >
                    <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                      <Heart className="h-5 w-5 text-rose-500 mr-2" />
                      情感分布分析
                    </h2>
                    {expandedSections.emotions ? <ChevronUp className="h-5 w-5 text-gray-400" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
                  </div>
                  
                  {expandedSections.emotions && (
                    <div className="px-6 pb-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* 情感分布图表 */}
                        <div className="space-y-4">
                          {emotionData.map((emotion, index) => (
                            <div key={index} className="bg-gray-50 rounded-lg p-4">
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center space-x-3">
                                  <div className={`w-3 h-3 rounded-full ${emotion.color}`}></div>
                                  <span className="font-medium text-gray-700">{emotion.name}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  {getTrendIcon(emotion.trend)}
                                  <span className="text-lg font-bold text-gray-700">{emotion.value}%</span>
                                </div>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className={`h-2 rounded-full ${emotion.color}`}
                                  style={{ width: `${emotion.value}%` }}
                                />
                              </div>
                              <p className="text-sm text-gray-500 mt-2">{emotion.description}</p>
                            </div>
                          ))}
                        </div>

                        {/* 情感雷达图 */}
                        <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-lg p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">情感雷达图</h3>
                          <div className="h-64 flex items-center justify-center">
                            <div className="text-center text-gray-500">
                              <Target className="h-12 w-12 mx-auto mb-2" />
                              <p>交互式雷达图</p>
                              <p className="text-sm">点击情感标签查看详细分析</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* 趋势分析 */}
              <div className="max-w-4xl mx-auto mb-8">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div 
                    className="flex items-center justify-between p-6 cursor-pointer"
                    onClick={() => toggleSection('trends')}
                  >
                    <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                      <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
                      情感趋势分析
                    </h2>
                    {expandedSections.trends ? <ChevronUp className="h-5 w-5 text-gray-400" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
                  </div>
                  
                  {expandedSections.trends && (
                    <div className="px-6 pb-6">
                      <div className="mb-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">最近一周趋势</h3>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="h-48 flex items-end justify-between">
                            {trendData.map((day, index) => (
                              <div key={index} className="flex flex-col items-center space-y-2">
                                <div className="flex items-end space-x-1">
                                  <div 
                                    className="w-4 bg-green-400 rounded-t"
                                    style={{ height: `${day.happiness * 0.6}px` }}
                                    title={`幸福感: ${day.happiness}%`}
                                  />
                                  <div 
                                    className="w-4 bg-blue-400 rounded-t"
                                    style={{ height: `${day.communication * 0.6}px` }}
                                    title={`沟通质量: ${day.communication}%`}
                                  />
                                  <div 
                                    className="w-4 bg-purple-400 rounded-t"
                                    style={{ height: `${day.intimacy * 0.6}px` }}
                                    title={`亲密关系: ${day.intimacy}%`}
                                  />
                                </div>
                                <span className="text-xs text-gray-500">{day.date}</span>
                              </div>
                            ))}
                          </div>
                          <div className="flex justify-center space-x-6 mt-4 text-xs">
                            <div className="flex items-center space-x-1">
                              <div className="w-3 h-3 bg-green-400 rounded"></div>
                              <span>幸福感</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <div className="w-3 h-3 bg-blue-400 rounded"></div>
                              <span>沟通质量</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <div className="w-3 h-3 bg-purple-400 rounded"></div>
                              <span>亲密关系</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-green-50 rounded-lg p-4">
                          <h4 className="font-semibold text-green-800 mb-2">📈 积极趋势</h4>
                          <ul className="text-sm text-green-700 space-y-1">
                            <li>• 幸福感每周增长约5%</li>
                            <li>• 沟通质量持续改善</li>
                            <li>• 亲密关系稳步提升</li>
                          </ul>
                        </div>
                        <div className="bg-blue-50 rounded-lg p-4">
                          <h4 className="font-semibold text-blue-800 mb-2">🔍 关键发现</h4>
                          <ul className="text-sm text-blue-700 space-y-1">
                            <li>• 周末情感质量更高</li>
                            <li>• 深度沟通效果显著</li>
                            <li>• 情感表达更加丰富</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* AI洞察建议 */}
              <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div 
                    className="flex items-center justify-between p-6 cursor-pointer"
                    onClick={() => toggleSection('recommendations')}
                  >
                    <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                      <Award className="h-5 w-5 text-yellow-500 mr-2" />
                      AI个性化建议
                    </h2>
                    {expandedSections.recommendations ? <ChevronUp className="h-5 w-5 text-gray-400" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
                  </div>
                  
                  {expandedSections.recommendations && (
                    <div className="px-6 pb-6">
                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="text-center p-4">
                          <div className="bg-rose-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                            <MessageCircle className="h-6 w-6 text-rose-600" />
                          </div>
                          <h4 className="font-semibold text-gray-900 mb-2">深度沟通</h4>
                          <p className="text-sm text-gray-600">
                            建议每周安排2-3次30分钟以上的深度沟通时间
                          </p>
                        </div>
                        
                        <div className="text-center p-4">
                          <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Heart className="h-6 w-6 text-blue-600" />
                          </div>
                          <h4 className="font-semibold text-gray-900 mb-2">情感表达</h4>
                          <p className="text-sm text-gray-600">
                            尝试用不同的方式表达爱意，增加情感新鲜感
                          </p>
                        </div>
                        
                        <div className="text-center p-4">
                          <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Users className="h-6 w-6 text-green-600" />
                          </div>
                          <h4 className="font-semibold text-gray-900 mb-2">共同活动</h4>
                          <p className="text-sm text-gray-600">
                            增加共同兴趣爱好，创造更多美好回忆
                          </p>
                        </div>
                        
                        <div className="text-center p-4">
                          <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Star className="h-6 w-6 text-purple-600" />
                          </div>
                          <h4 className="font-semibold text-gray-900 mb-2">成长规划</h4>
                          <p className="text-sm text-gray-600">
                            制定共同成长目标，增强关系前进动力
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </main>

          <footer className="bg-gray-50 border-t border-gray-200">
            <div className="container py-8">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <div className="w-6 h-6 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full flex items-center justify-center">
                    <BarChart3 className="h-3 w-3 text-white" />
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