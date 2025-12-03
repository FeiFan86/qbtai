'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FormInput } from '@/components/ui/form-input'
import { Alert } from '@/components/ui/alert'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { useAuth } from './auth-provider'
import { useRouter } from 'next/navigation'

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
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">登录</CardTitle>
        <CardDescription className="text-center">
          欢迎回到丘比特AI情感助手
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive" onDismiss={() => setError('')}>
              {error}
            </Alert>
          )}
          
          <FormInput
            id="username"
            name="username"
            type="text"
            label="用户名或邮箱"
            placeholder="请输入用户名或邮箱"
            value={formData.username}
            onChange={handleChange}
            required
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
          />
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <LoadingSpinner size="sm" className="mr-2" />
                登录中...
              </>
            ) : '登录'}
          </Button>
        </form>
        
        <div className="mt-4 text-center text-sm text-gray-500">
          还没有账号？
          <button 
            type="button" 
            className="ml-1 text-blue-600 hover:underline font-medium"
            onClick={() => router.push('/register')}
          >
            立即注册
          </button>
        </div>
      </CardContent>
    </Card>
  )
}