'use client'

import React, { useState, useEffect } from 'react'
import { useAuth } from '../../components/auth-provider'
import { MembershipService } from '../../lib/membership'
import { useRouter } from 'next/navigation'
import { 
  Users, 
  BarChart3, 
  Settings, 
  Shield, 
  CreditCard, 
  Activity,
  TrendingUp,
  UserCheck,
  AlertCircle,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react'

interface UserStats {
  totalUsers: number
  activeUsers: number
  newUsersToday: number
  premiumUsers: number
  vipUsers: number
}

interface SystemStats {
  totalUsage: number
  dailyUsage: number
  peakConcurrent: number
  errorRate: number
}

interface User {
  id: string
  username: string
  email: string
  role: string
  membership: {
    level: string
    expiryDate?: string
  }
  isActive: boolean
  lastLogin: string
  createdAt: string
}

export default function AdminDashboard() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [userStats, setUserStats] = useState<UserStats>({
    totalUsers: 0,
    activeUsers: 0,
    newUsersToday: 0,
    premiumUsers: 0,
    vipUsers: 0
  })
  const [systemStats, setSystemStats] = useState<SystemStats>({
    totalUsage: 0,
    dailyUsage: 0,
    peakConcurrent: 0,
    errorRate: 0
  })
  const [users, setUsers] = useState<User[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)

  // 检查权限
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
      return
    }

    if (!MembershipService.isAdmin(user)) {
      router.push('/')
      return
    }

    loadDashboardData()
  }, [user, isAuthenticated, router])

  const loadDashboardData = async () => {
    setLoading(true)
    try {
      // 模拟API调用获取数据
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // 模拟数据
      setUserStats({
        totalUsers: 1542,
        activeUsers: 872,
        newUsersToday: 23,
        premiumUsers: 245,
        vipUsers: 67
      })
      
      setSystemStats({
        totalUsage: 15420,
        dailyUsage: 342,
        peakConcurrent: 89,
        errorRate: 0.5
      })
      
      // 模拟用户数据
      setUsers([
        {
          id: '1',
          username: '张三',
          email: 'zhangsan@example.com',
          role: 'user',
          membership: { level: 'free' },
          isActive: true,
          lastLogin: '2025-12-05T10:30:00Z',
          createdAt: '2025-11-01T08:00:00Z'
        },
        {
          id: '2',
          username: '李四',
          email: 'lisi@example.com',
          role: 'admin',
          membership: { level: 'vip', expiryDate: '2026-12-01T00:00:00Z' },
          isActive: true,
          lastLogin: '2025-12-05T09:15:00Z',
          createdAt: '2025-10-15T14:20:00Z'
        },
        {
          id: '3',
          username: '王五',
          email: 'wangwu@example.com',
          role: 'user',
          membership: { level: 'premium', expiryDate: '2025-12-31T00:00:00Z' },
          isActive: false,
          lastLogin: '2025-12-01T16:45:00Z',
          createdAt: '2025-09-20T11:30:00Z'
        }
      ])
    } catch (error) {
      console.error('加载数据失败:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getMembershipColor = (level: string) => {
    const colors = {
      free: 'text-gray-600 bg-gray-100',
      basic: 'text-blue-600 bg-blue-100',
      premium: 'text-purple-600 bg-purple-100',
      vip: 'text-yellow-600 bg-yellow-100'
    }
    return colors[level as keyof typeof colors] || colors.free
  }

  const getRoleColor = (role: string) => {
    const colors = {
      user: 'text-green-600 bg-green-100',
      moderator: 'text-blue-600 bg-blue-100',
      admin: 'text-purple-600 bg-purple-100',
      superadmin: 'text-red-600 bg-red-100'
    }
    return colors[role as keyof typeof colors] || colors.user
  }

  if (!isAuthenticated || !MembershipService.isAdmin(user)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Shield className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900">无访问权限</h2>
          <p className="text-gray-600 mt-2">您没有权限访问管理员后台</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Shield className="h-8 w-8 text-purple-600" />
              <h1 className="text-2xl font-bold text-gray-900">管理员后台</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">欢迎，{user?.username}</span>
              <button 
                onClick={loadDashboardData}
                className="flex items-center space-x-2 px-3 py-2 text-sm bg-gray-100 rounded-md hover:bg-gray-200"
              >
                <RefreshCw className="h-4 w-4" />
                <span>刷新</span>
              </button>
            </div>
          </div>
          
          {/* 标签页 */}
          <div className="flex space-x-8">
            {[
              { id: 'dashboard', label: '仪表盘', icon: BarChart3 },
              { id: 'users', label: '用户管理', icon: Users },
              { id: 'analytics', label: '数据分析', icon: TrendingUp },
              { id: 'settings', label: '系统设置', icon: Settings }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-3 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 主要内容 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <RefreshCw className="h-8 w-8 animate-spin text-purple-600" />
          </div>
        ) : (
          <>
            {/* 仪表盘 */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                {/* 数据卡片 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                      <Users className="h-8 w-8 text-blue-600" />
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">总用户数</p>
                        <p className="text-2xl font-bold text-gray-900">{userStats.totalUsers.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                      <UserCheck className="h-8 w-8 text-green-600" />
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">活跃用户</p>
                        <p className="text-2xl font-bold text-gray-900">{userStats.activeUsers.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                      <CreditCard className="h-8 w-8 text-purple-600" />
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">付费用户</p>
                        <p className="text-2xl font-bold text-gray-900">{(userStats.premiumUsers + userStats.vipUsers).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                      <Activity className="h-8 w-8 text-orange-600" />
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">今日使用量</p>
                        <p className="text-2xl font-bold text-gray-900">{systemStats.dailyUsage.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 会员分布 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">会员分布</h3>
                    <div className="space-y-3">
                      {[
                        { level: 'free', count: userStats.totalUsers - userStats.premiumUsers - userStats.vipUsers, color: 'bg-gray-500' },
                        { level: 'premium', count: userStats.premiumUsers, color: 'bg-purple-500' },
                        { level: 'vip', count: userStats.vipUsers, color: 'bg-yellow-500' }
                      ].map((item) => (
                        <div key={item.level} className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">
                            {MembershipService.getPricingInfo(item.level)?.name}
                          </span>
                          <div className="flex items-center space-x-2">
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${item.color}`}
                                style={{ width: `${(item.count / userStats.totalUsers) * 100}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium">{item.count}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">系统状态</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">错误率</span>
                        <div className="flex items-center space-x-2">
                          {systemStats.errorRate < 1 ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <AlertCircle className="h-4 w-4 text-yellow-500" />
                          )}
                          <span className="text-sm font-medium">{systemStats.errorRate}%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">峰值并发</span>
                        <span className="text-sm font-medium">{systemStats.peakConcurrent}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">总使用量</span>
                        <span className="text-sm font-medium">{systemStats.totalUsage.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 用户管理 */}
            {activeTab === 'users' && (
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                    <h3 className="text-lg font-medium text-gray-900">用户管理</h3>
                    <div className="flex space-x-3">
                      <div className="relative">
                        <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          placeholder="搜索用户..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                      <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
                        <Filter className="h-4 w-4" />
                        <span>筛选</span>
                      </button>
                      <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
                        <Download className="h-4 w-4" />
                        <span>导出</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">用户</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">角色</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">会员等级</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">最后登录</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{user.username}</div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getMembershipColor(user.membership.level)}`}>
                              {MembershipService.getPricingInfo(user.membership.level)?.name}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {user.isActive ? (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                活跃
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                <XCircle className="h-3 w-3 mr-1" />
                                禁用
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(user.lastLogin).toLocaleDateString('zh-CN')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-purple-600 hover:text-purple-900 mr-3">编辑</button>
                            <button className="text-red-600 hover:text-red-900">禁用</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 其他标签页内容（简化实现） */}
            {activeTab === 'analytics' && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">数据分析</h3>
                <p className="text-gray-600">数据分析功能正在开发中...</p>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">系统设置</h3>
                <p className="text-gray-600">系统设置功能正在开发中...</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}