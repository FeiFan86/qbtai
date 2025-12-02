'use client'

import React from 'react'
import { useAuth } from './auth-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export function UserProfile() {
  const { user, isAuthenticated, logout } = useAuth()

  if (!isAuthenticated || !user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>用户信息</CardTitle>
          <CardDescription>请先登录以查看个人信息</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => window.location.href = '/login'}>
            立即登录
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">
            {user.username.charAt(0).toUpperCase()}
          </div>
          {user.username}
        </CardTitle>
        <CardDescription>欢迎使用丘比特AI情感助手</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-gray-500">邮箱</div>
            <div className="font-medium">{user.email}</div>
          </div>
          <div>
            <div className="text-gray-500">注册时间</div>
            <div className="font-medium">
              {new Date(user.createdAt).toLocaleDateString('zh-CN')}
            </div>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => window.location.href = '/games'}>
            开始游戏
          </Button>
          <Button size="sm" variant="outline" onClick={logout}>
            退出登录
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}