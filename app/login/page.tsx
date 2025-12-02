'use client'

import React from 'react'
import { LoginForm } from '@/components/login-form'
import { useAuth } from '@/components/auth-provider'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function LoginPage() {
  const { user, isAuthenticated, logout } = useAuth()

  if (isAuthenticated && user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              欢迎回来，{user.username}！
            </CardTitle>
            <CardDescription className="text-center">
              您已成功登录丘比特AI情感助手
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <p className="text-gray-600 mb-4">
                开始探索有趣的互动游戏吧！
              </p>
              <div className="flex gap-4 justify-center">
                <Button onClick={() => window.location.href = '/games'}>
                  进入游戏中心
                </Button>
                <Button variant="outline" onClick={logout}>
                  退出登录
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-50 to-pink-50">
      <LoginForm />
    </div>
  )
}