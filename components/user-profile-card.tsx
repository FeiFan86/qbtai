'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from './auth-provider'
import { 
  User, 
  Mail, 
  Calendar, 
  Settings, 
  Award, 
  TrendingUp,
  LogOut,
  Edit
} from 'lucide-react'
import { useRouter } from 'next/navigation'

export function UserProfileCard() {
  const { user, isAuthenticated, logout } = useAuth()
  const router = useRouter()

  if (!isAuthenticated || !user) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>用户信息</CardTitle>
          <CardDescription>请先登录查看个人资料</CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={() => router.push('/login')}
            className="w-full"
          >
            立即登录
          </Button>
        </CardContent>
      </Card>
    )
  }

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // 模拟用户数据统计
  const userStats = {
    gamesPlayed: 24,
    achievements: 8,
    totalPoints: 1250,
    level: '中级情侣',
    joinDate: user.createdAt || '2024-01-01'
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>个人资料</span>
          <Button variant="ghost" size="sm">
            <Edit className="h-4 w-4" />
          </Button>
        </CardTitle>
        <CardDescription>查看和管理您的账户信息</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 用户基本信息 */}
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user.avatar} alt={user.username} />
            <AvatarFallback className="bg-purple-100 text-purple-800 text-lg font-semibold">
              {user.username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="text-lg font-semibold">{user.username}</h3>
            <p className="text-sm text-gray-500 flex items-center">
              <Mail className="h-3 w-3 mr-1" />
              {user.email}
            </p>
            <Badge variant="secondary" className="mt-1">
              {userStats.level}
            </Badge>
          </div>
        </div>

        {/* 用户统计信息 */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="flex items-center justify-between">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <span className="text-2xl font-bold text-blue-600">{userStats.totalPoints}</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">总积分</p>
          </div>
          
          <div className="bg-purple-50 p-3 rounded-lg">
            <div className="flex items-center justify-between">
              <Award className="h-5 w-5 text-purple-600" />
              <span className="text-2xl font-bold text-purple-600">{userStats.achievements}</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">成就数</p>
          </div>
          
          <div className="bg-green-50 p-3 rounded-lg">
            <div className="flex items-center justify-between">
              <User className="h-5 w-5 text-green-600" />
              <span className="text-2xl font-bold text-green-600">{userStats.gamesPlayed}</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">游戏数</p>
          </div>
          
          <div className="bg-yellow-50 p-3 rounded-lg">
            <div className="flex items-center justify-between">
              <Calendar className="h-5 w-5 text-yellow-600" />
              <span className="text-sm font-bold text-yellow-600 text-center">
                {formatDate(userStats.joinDate)}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-1">加入时间</p>
          </div>
        </div>

        {/* 用户偏好设置 */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-700">偏好设置</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <span className="text-sm">主题</span>
              <Badge variant="outline">
                {user.preferences?.theme || '自动'}
              </Badge>
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <span className="text-sm">语言</span>
              <Badge variant="outline">
                {user.preferences?.language || '中文'}
              </Badge>
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <span className="text-sm">通知</span>
              <Badge variant={user.preferences?.notifications ? "default" : "secondary"}>
                {user.preferences?.notifications ? '已开启' : '已关闭'}
              </Badge>
            </div>
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="flex flex-col space-y-2">
          <Button variant="outline" className="w-full">
            <Settings className="h-4 w-4 mr-2" />
            账户设置
          </Button>
          <Button 
            variant="outline" 
            className="w-full text-red-600 hover:text-red-700"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            退出登录
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}