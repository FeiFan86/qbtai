'use client'

import React, { useState, useEffect } from 'react'
import { LoginForm } from '@/components/login-form'
import { useAuth } from '@/components/auth-provider'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { UnifiedLayout } from '@/components/layout-unified'
import { Heart, Sparkles, Users, MessageCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const { user, isAuthenticated, logout } = useAuth()
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleGamesRedirect = () => {
    router.push('/games')
  }

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  if (isAuthenticated && user) {
    return (
      <UnifiedLayout 
        title="欢迎回来"
        subtitle={`${user.username}！`}
        icon={<Heart className="h-4 w-4 text-rose-500" />}
        showAuthButtons={false}
        extraActions={
          <Button 
            variant="ghost" 
            onClick={handleLogout}
            className="text-gray-600 hover:text-rose-600 transition-colors"
          >
            退出登录
          </Button>
        }
      >
        <div className="max-w-md mx-auto">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Heart className="h-8 w-8 text-white" fill="currentColor" />
              </div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                您已成功登录丘比特AI情感助手
              </CardTitle>
              <CardDescription className="text-gray-600">
                开始探索有趣的互动游戏吧！
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <Button 
                  onClick={handleGamesRedirect}
                  className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white shadow-lg"
                >
                  进入游戏中心
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </UnifiedLayout>
    )
  }

  return (
    <UnifiedLayout 
      title="欢迎回来"
      subtitle="登录您的账户"
      icon={<Heart className="h-4 w-4 text-rose-500" />}
      showAuthButtons={false}
    >
      <LoginForm />
    </UnifiedLayout>
  )
}