'use client'

import React, { useState, useEffect } from 'react'
import { useAuth } from '@/components/auth-provider'
import GlobalNavbar from '@/components/global-navbar'
import { 
  User, Settings, Heart, Brain, MessageCircle, PenTool, 
  BarChart3, Gamepad2, Calendar, Award, Crown, Star,
  TrendingUp, Clock, Users, Shield
} from 'lucide-react'

export default function ProfilePage() {
  const { user, isAuthenticated } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')
  
  // 模拟使用统计数据
  const usageStats = {
    'emotion-analysis': { daily: 3, monthly: 45, total: 128 },
    'social-assistant': { daily: 1, monthly: 12, total: 67 },
    'content-creation': { daily: 2, monthly: 28, total: 89 },
    'emotion-diary': { daily: 1, monthly: 15, total: 42 },
    'data-insights': { daily: 0, monthly: 8, total: 23 },
    'games': { daily: 5, monthly: 65, total: 156 }
  }

  // 会员信息
  const membershipInfo = {
    level: '高级会员',
    expires: '2025-12-31',
    benefits: ['无限使用次数', '专属客服', '高级功能', '数据分析报告']
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
        <GlobalNavbar />
        <main className="pt-16">
          <div className="container py-20 text-center">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 max-w-md mx-auto">
              <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">请先登录</h2>
              <p className="text-gray-600 mb-6">登录后查看个人中心</p>
              <a 
                href="/login" 
                className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-3 rounded-lg font-medium hover:from-rose-600 hover:to-pink-600 transition-all"
              >
                立即登录
              </a>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      <GlobalNavbar />
      
      <main className="pt-16">
        <div className="container py-8">
          {/* 用户信息头部 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full flex items-center justify-center">
                <User className="h-10 w-10 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {user.name || user.username || '用户'}
                  </h1>
                  <div className="flex items-center space-x-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    <Crown className="h-3 w-3" />
                    <span>{membershipInfo.level}</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-2">{user.email || '未设置邮箱'}</p>
                <p className="text-sm text-gray-500">
                  注册时间：{new Date(user.createdAt || Date.now()).toLocaleDateString('zh-CN')}
                </p>
              </div>
            </div>
          </div>

          {/* 选项卡导航 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
            <div className="flex overflow-x-auto">
              {[
                { id: 'overview', label: '概览', icon: <TrendingUp className="h-4 w-4" /> },
                { id: 'usage', label: '使用统计', icon: <BarChart3 className="h-4 w-4" /> },
                { id: 'membership', label: '会员信息', icon: <Crown className="h-4 w-4" /> },
                { id: 'settings', label: '设置', icon: <Settings className="h-4 w-4" /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-4 border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-rose-500 text-rose-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab.icon}
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 内容区域 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            {activeTab === 'overview' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">使用概览</h2>
                
                {/* 快速统计 */}
                <div className="grid md:grid-cols-4 gap-6 mb-8">
                  <div className="bg-gradient-to-r from-rose-50 to-pink-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <Heart className="h-5 w-5 text-rose-500" />
                      <span className="text-2xl font-bold text-gray-900">89</span>
                    </div>
                    <div className="text-sm text-gray-600">总使用次数</div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <Calendar className="h-5 w-5 text-blue-500" />
                      <span className="text-2xl font-bold text-gray-900">30</span>
                    </div>
                    <div className="text-sm text-gray-600">连续使用天数</div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-green-50 to-teal-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <Star className="h-5 w-5 text-green-500" />
                      <span className="text-2xl font-bold text-gray-900">4.8</span>
                    </div>
                    <div className="text-sm text-gray-600">平均满意度</div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <Award className="h-5 w-5 text-purple-500" />
                      <span className="text-2xl font-bold text-gray-900">15</span>
                    </div>
                    <div className="text-sm text-gray-600">完成成就</div>
                  </div>
                </div>

                {/* 功能使用排行 */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">最常使用的功能</h3>
                  <div className="space-y-3">
                    {Object.entries(usageStats)
                      .sort((a, b) => b[1].total - a[1].total)
                      .slice(0, 3)
                      .map(([feature, stats]) => (
                        <div key={feature} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            {getFeatureIcon(feature)}
                            <span className="font-medium text-gray-900">{getFeatureName(feature)}</span>
                          </div>
                          <span className="text-gray-700">{stats.total} 次</span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'usage' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">详细使用统计</h2>
                
                <div className="space-y-6">
                  {Object.entries(usageStats).map(([feature, stats]) => (
                    <div key={feature} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          {getFeatureIcon(feature)}
                          <span className="font-medium text-gray-900">{getFeatureName(feature)}</span>
                        </div>
                        <div className="text-sm text-gray-500">
                          总使用：{stats.total} 次
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">今日使用</span>
                          <span className="font-medium">{stats.daily} 次</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">本月使用</span>
                          <span className="font-medium">{stats.monthly} 次</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'membership' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">会员信息</h2>
                
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Crown className="h-6 w-6 text-amber-600" />
                      <span className="text-lg font-semibold text-gray-900">{membershipInfo.level}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      有效期至：{membershipInfo.expires}
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-medium text-gray-900 mb-3">会员特权</h3>
                      <ul className="space-y-2">
                        {membershipInfo.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                            <Shield className="h-4 w-4 text-green-500" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-gray-900 mb-3">升级建议</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        当前会员等级已满足您的使用需求，继续保持良好使用习惯即可。
                      </p>
                      <button className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-amber-600 hover:to-orange-600 transition-all">
                        查看会员权益
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">账户设置</h2>
                
                <div className="space-y-6">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-3">个人信息</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">用户名</span>
                        <span className="font-medium">{user.username}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">邮箱</span>
                        <span className="font-medium">{user.email || '未设置'}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-3">隐私设置</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">数据收集</span>
                        <span className="text-sm text-green-600">已开启（匿名）</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">个性化推荐</span>
                        <span className="text-sm text-green-600">已开启</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-3">账户安全</h3>
                    <div className="space-y-3">
                      <button className="w-full text-left py-2 text-rose-600 hover:text-rose-700">
                        修改密码
                      </button>
                      <button className="w-full text-left py-2 text-rose-600 hover:text-rose-700">
                        注销账户
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

// 辅助函数
function getFeatureIcon(feature: string) {
  const icons = {
    'emotion-analysis': <Brain className="h-5 w-5 text-rose-500" />,
    'social-assistant': <MessageCircle className="h-5 w-5 text-blue-500" />,
    'content-creation': <PenTool className="h-5 w-5 text-purple-500" />,
    'emotion-diary': <Heart className="h-5 w-5 text-pink-500" />,
    'data-insights': <BarChart3 className="h-5 w-5 text-green-500" />,
    'games': <Gamepad2 className="h-5 w-5 text-orange-500" />
  }
  return icons[feature as keyof typeof icons] || <Users className="h-5 w-5 text-gray-500" />
}

function getFeatureName(feature: string) {
  const names = {
    'emotion-analysis': '情感分析',
    'social-assistant': '社交助手',
    'content-creation': '内容创作',
    'emotion-diary': '情感日记',
    'data-insights': '数据洞察',
    'games': '互动游戏'
  }
  return names[feature as keyof typeof names] || '未知功能'
}