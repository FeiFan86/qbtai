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
  
  // 获取真实的用户数据
  const usageStats = {
    'emotion-analysis': { 
      daily: user?.usageStats?.dailyUsage?.['emotion-analysis'] || 0,
      monthly: user?.usageStats?.monthlyUsage?.['emotion-analysis'] || 0,
      total: user?.stats?.totalGames || 0
    },
    'social-assistant': { 
      daily: user?.usageStats?.dailyUsage?.['social-assistant'] || 0,
      monthly: user?.usageStats?.monthlyUsage?.['social-assistant'] || 0,
      total: 0
    },
    'content-creation': { 
      daily: user?.usageStats?.dailyUsage?.['content-creation'] || 0,
      monthly: user?.usageStats?.monthlyUsage?.['content-creation'] || 0,
      total: 0
    },
    'emotion-diary': { 
      daily: user?.usageStats?.dailyUsage?.['emotion-diary'] || 0,
      monthly: user?.usageStats?.monthlyUsage?.['emotion-diary'] || 0,
      total: 0
    },
    'data-insights': { 
      daily: user?.usageStats?.dailyUsage?.['data-insights'] || 0,
      monthly: user?.usageStats?.monthlyUsage?.['data-insights'] || 0,
      total: 0
    },
    'games': { 
      daily: user?.usageStats?.dailyUsage?.['games'] || 0,
      monthly: user?.usageStats?.monthlyUsage?.['games'] || 0,
      total: user?.stats?.totalGames || 0
    }
  }

  // 会员信息映射
  const membershipLevels = {
    'free': { name: '免费会员', benefits: ['基础功能使用', '每日限制使用次数'] },
    'basic': { name: '基础会员', benefits: ['更多使用次数', '基础分析功能'] },
    'premium': { name: '高级会员', benefits: ['无限使用次数', '专属客服', '高级功能'] },
    'vip': { name: 'VIP会员', benefits: ['所有高级功能', '专属客服', '数据分析报告', '优先技术支持'] }
  }

  const membershipInfo = {
    level: membershipLevels[user?.membership?.level || 'free']?.name || '免费会员',
    expires: user?.membership?.expiryDate ? 
      new Date(user.membership.expiryDate).toLocaleDateString('zh-CN') : '永久有效',
    benefits: membershipLevels[user?.membership?.level || 'free']?.benefits || []
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
                    {user.username || '用户'}
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
                      <span className="text-2xl font-bold text-gray-900">
                        {Object.values(usageStats).reduce((sum, stats) => sum + stats.total, 0)}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">总使用次数</div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <Calendar className="h-5 w-5 text-blue-500" />
                      <span className="text-2xl font-bold text-gray-900">
                        {user?.stats?.consecutiveDays || 0}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">连续使用天数</div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-green-50 to-teal-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <Star className="h-5 w-5 text-green-500" />
                      <span className="text-2xl font-bold text-gray-900">
                        {user?.stats?.averageRating?.toFixed(1) || '4.5'}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">平均满意度</div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <Award className="h-5 w-5 text-purple-500" />
                      <span className="text-2xl font-bold text-gray-900">
                        {user?.stats?.achievements?.length || 0}
                      </span>
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
                      <h3 className="font-medium text-gray-900 mb-3">使用限制对比</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">情感分析</span>
                          <span className="font-medium">
                            {user?.membership?.level === 'premium' || user?.membership?.level === 'vip' ? '无限' : '5次/天'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">内容创作</span>
                          <span className="font-medium">
                            {user?.membership?.level === 'premium' || user?.membership?.level === 'vip' ? '无限' : '3次/天'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">互动游戏</span>
                          <span className="font-medium">
                            {user?.membership?.level === 'free' ? '10次/天' : 
                             user?.membership?.level === 'basic' ? '20次/天' : '无限'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">升级会员</h3>
                      <p className="text-sm text-gray-600">
                        {user?.membership?.level === 'free' ? '升级会员解锁更多功能和更高使用限制' :
                         user?.membership?.level === 'basic' ? '升级为高级会员享受无限使用权限' :
                         '您已是高级会员，享受全部功能'}
                      </p>
                    </div>
                    <div className="space-x-2">
                      {user?.membership?.level !== 'premium' && user?.membership?.level !== 'vip' && (
                        <button className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-amber-600 hover:to-orange-600 transition-all">
                          立即升级
                        </button>
                      )}
                      <button className="border border-amber-500 text-amber-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-amber-50 transition-all">
                        查看详情
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
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{user.username}</span>
                          <button className="text-rose-600 hover:text-rose-700 text-sm">修改</button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">邮箱</span>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{user.email || '未设置'}</span>
                          <button className="text-rose-600 hover:text-rose-700 text-sm">
                            {user.email ? '修改' : '添加'}
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">手机号</span>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{user.phone || '未绑定'}</span>
                          <button className="text-rose-600 hover:text-rose-700 text-sm">
                            {user.phone ? '修改' : '绑定'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-3">通知设置</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-900">邮件通知</div>
                          <div className="text-sm text-gray-600">接收账户相关邮件通知</div>
                        </div>
                        <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-rose-500">
                          <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6"></span>
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-900">推广信息</div>
                          <div className="text-sm text-gray-600">接收产品更新和优惠信息</div>
                        </div>
                        <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300">
                          <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-1"></span>
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-3">隐私设置</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-900">数据分析</div>
                          <div className="text-sm text-gray-600">允许匿名数据分析以改进服务</div>
                        </div>
                        <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-rose-500">
                          <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6"></span>
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-900">个性化推荐</div>
                          <div className="text-sm text-gray-600">基于使用习惯提供个性化内容</div>
                        </div>
                        <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-rose-500">
                          <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6"></span>
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-3">账户安全</h3>
                    <div className="space-y-3">
                      <button className="w-full text-left py-2 text-rose-600 hover:text-rose-700 flex items-center justify-between">
                        <span>修改密码</span>
                        <span className="text-sm text-gray-400">上次修改：{'passwordChangedAt' in user ? new Date((user as any).passwordChangedAt).toLocaleDateString('zh-CN') : '从未修改'}</span>
                      </button>
                      <button className="w-full text-left py-2 text-rose-600 hover:text-rose-700 flex items-center justify-between">
                        <span>两步验证</span>
                        <span className="text-sm text-gray-400">{user?.twoFactorEnabled ? '已开启' : '未开启'}</span>
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