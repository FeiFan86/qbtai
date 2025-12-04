'use client'

import React, { useState } from 'react'
import { BarChart3, TrendingUp, Calendar, Filter } from 'lucide-react'

export default function DataInsightsPage() {
  const [timeRange, setTimeRange] = useState('month')
  
  const emotionData = [
    { name: '快乐', value: 45, color: 'bg-green-500' },
    { name: '感动', value: 25, color: 'bg-blue-500' },
    { name: '期待', value: 20, color: 'bg-purple-500' },
    { name: '安心', value: 15, color: 'bg-yellow-500' },
    { name: '复杂', value: 10, color: 'bg-orange-500' },
    { name: '低落', value: 5, color: 'bg-red-500' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      {/* 导航栏 */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="container">
          <div className="flex justify-between items-center h-16">
            <a href="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full flex items-center justify-center">
                <BarChart3 className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold text-gray-900">丘比特AI</span>
            </a>
            <div className="flex items-center space-x-4">
              <a href="/" className="text-gray-600 hover:text-rose-600 transition-colors">
                返回首页
              </a>
              <a href="/login" className="text-gray-600 hover:text-rose-600 transition-colors">
                登录
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* 主要内容 */}
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
              通过数据分析发现情感模式，洞察关系成长轨迹
            </p>
          </div>

          {/* 时间筛选 */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Filter className="h-5 w-5 text-gray-500" />
                  <span className="text-gray-700 font-medium">时间范围</span>
                </div>
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
            </div>
          </div>

          {/* 数据展示区域 */}
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 mb-12">
            {/* 情感分布 */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">情感分布</h2>
              <div className="space-y-4">
                {emotionData.map((emotion, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${emotion.color}`}></div>
                      <span className="text-gray-700 font-medium">{emotion.name}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${emotion.color}`}
                          style={{ width: `${emotion.value * 2}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-700 w-8">
                        {emotion.value}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 关键指标 */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">关键指标</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="text-gray-700">总体幸福感</span>
                  <span className="text-2xl font-bold text-green-600">87%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="text-gray-700">沟通频率</span>
                  <span className="text-2xl font-bold text-blue-600">高</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <span className="text-gray-700">关系稳定度</span>
                  <span className="text-2xl font-bold text-purple-600">92%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-rose-50 rounded-lg">
                  <span className="text-gray-700">情感表达</span>
                  <span className="text-2xl font-bold text-rose-600">积极</span>
                </div>
              </div>
            </div>
          </div>

          {/* 趋势分析 */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">情感趋势</h2>
              <div className="h-64 flex items-center justify-center">
                {/* 模拟趋势图 */}
                <div className="w-full h-full flex items-end justify-around">
                  {[
                    { day: '周一', value: 65 },
                    { day: '周二', value: 72 },
                    { day: '周三', value: 68 },
                    { day: '周四', value: 85 },
                    { day: '周五', value: 78 },
                    { day: '周六', value: 92 },
                    { day: '周日', value: 88 }
                  ].map((item, index) => (
                    <div key={index} className="flex flex-col items-center space-y-2">
                      <div 
                        className="w-8 bg-gradient-to-t from-rose-400 to-pink-500 rounded-t"
                        style={{ height: `${item.value * 2}px` }}
                      ></div>
                      <span className="text-xs text-gray-500">{item.day}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4 text-center">
                <div className="flex items-center justify-center space-x-2 text-gray-600">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm">最近一周情感状态呈上升趋势</span>
                </div>
              </div>
            </div>
          </div>

          {/* 洞察建议 */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">AI洞察建议</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">🌟 保持优势</h3>
                <p className="text-gray-600 text-sm">
                  您的沟通频率和质量都保持在较高水平，继续保持这种积极的互动模式。
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">💡 改善建议</h3>
                <p className="text-gray-600 text-sm">
                  建议增加深度沟通时间，尝试更多元的情感表达方式。
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">📈 发展趋势</h3>
                <p className="text-gray-600 text-sm">
                  整体情感状态呈上升趋势，关系稳定度在持续提升。
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
  )
}