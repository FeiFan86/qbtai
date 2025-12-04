'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FormInput } from '@/components/ui/form-input'
import { Alert } from '@/components/ui/alert'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { useAuth } from './auth-provider'
import { useRouter } from 'next/navigation'
import { Heart, Lock, User, Sparkles } from 'lucide-react'

export function LoginForm() {
  const { login, isLoading } = useAuth()
  const router = useRouter()
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!formData.username.trim()) {
      setError('请输入用户名或邮箱')
      return
    }

    if (!formData.password) {
      setError('请输入密码')
      return
    }

    try {
      await login(formData)
      // 登录成功后跳转到游戏页面
      router.push('/games')
    } catch (err) {
      setError(err instanceof Error ? err.message : '登录失败')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
    // 清除错误信息
    if (error) setError('')
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-white/80 backdrop-blur-sm border-white/20 shadow-2xl">
      <CardHeader className="text-center pb-4">
        <div className="w-20 h-20 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
          <Heart className="h-10 w-10 text-white" fill="currentColor" />
        </div>
        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
          欢迎回来
        </CardTitle>
        <CardDescription className="text-gray-600">
          回到丘比特AI情感助手，继续您的甜蜜旅程
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <Alert variant="destructive" onDismiss={() => setError('')}>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                {error}
              </div>
            </Alert>
          )}
          
          <div className="space-y-4">
            <FormInput
              id="username"
              name="username"
              type="text"
              label="用户名或邮箱"
              placeholder="请输入用户名或邮箱"
              value={formData.username}
              onChange={handleChange}
              required
              icon={<User className="h-4 w-4 text-gray-400" />}
            />
            
            <FormInput
              id="password"
              name="password"
              type="password"
              label="密码"
              placeholder="请输入密码"
              value={formData.password}
              onChange={handleChange}
              required
              icon={<Lock className="h-4 w-4 text-gray-400" />}
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white shadow-lg transition-all duration-300 h-12 text-lg font-semibold"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <LoadingSpinner size="sm" className="mr-2 text-white" />
                登录中...
              </>
            ) : (
              <>
                <Heart className="h-5 w-5 mr-2" />
                立即登录
              </>
            )}
          </Button>
        </form>
        
        <div className="mt-6 pt-4 border-t border-gray-200/50 text-center">
          <p className="text-sm text-gray-600">
            还没有账号？
            <button 
              type="button" 
              className="ml-1 font-medium bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent hover:from-rose-700 hover:to-pink-700 transition-all"
              onClick={() => router.push('/register')}
            >
              立即注册
            </button>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}