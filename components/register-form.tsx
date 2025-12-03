'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FormInput } from '@/components/ui/form-input'
import { Alert } from '@/components/ui/alert'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { useAuth } from './auth-provider'
import { useRouter } from 'next/navigation'

export function RegisterForm() {
  const { register, isLoading } = useAuth()
  const router = useRouter()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.username.trim()) {
      newErrors.username = '用户名不能为空'
    } else if (formData.username.length < 3) {
      newErrors.username = '用户名至少需要3个字符'
    }

    if (!formData.email.trim()) {
      newErrors.email = '邮箱不能为空'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '请输入有效的邮箱地址'
    }

    if (!formData.password) {
      newErrors.password = '密码不能为空'
    } else if (formData.password.length < 6) {
      newErrors.password = '密码长度至少为6位'
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = '请确认密码'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '两次输入的密码不一致'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    try {
      await register(formData)
      // 注册成功后跳转到游戏页面
      router.push('/games')
    } catch (err) {
      setErrors({ submit: err instanceof Error ? err.message : '注册失败' })
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
    // 清除该字段的错误信息
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  const getPasswordStrength = () => {
    const password = formData.password
    if (!password) return { score: 0, text: '', color: '' }

    let score = 0
    if (password.length >= 6) score += 1
    if (password.length >= 10) score += 1
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1
    if (/[0-9]/.test(password)) score += 1
    if (/[^a-zA-Z0-9]/.test(password)) score += 1

    const strengthLevels = [
      { score: 0, text: '非常弱', color: 'text-red-500' },
      { score: 1, text: '弱', color: 'text-red-400' },
      { score: 2, text: '一般', color: 'text-yellow-500' },
      { score: 3, text: '中等', color: 'text-blue-500' },
      { score: 4, text: '强', color: 'text-green-500' },
      { score: 5, text: '非常强', color: 'text-green-600' },
    ]

    return strengthLevels[Math.min(score, 5)]
  }

  const passwordStrength = getPasswordStrength()

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">注册账号</CardTitle>
        <CardDescription className="text-center">
          创建您的丘比特AI情感助手账号
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {errors.submit && (
            <Alert variant="destructive" onDismiss={() => setErrors(prev => ({ ...prev, submit: '' }))}>
              {errors.submit}
            </Alert>
          )}
          
          <FormInput
            id="username"
            name="username"
            type="text"
            label="用户名"
            placeholder="请输入用户名"
            value={formData.username}
            onChange={handleChange}
            error={errors.username}
            hint="用户名将显示在游戏中"
            required
          />
          
          <FormInput
            id="email"
            name="email"
            type="email"
            label="邮箱地址"
            placeholder="请输入邮箱地址"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            hint="用于找回密码和接收通知"
            required
          />
          
          <FormInput
            id="password"
            name="password"
            type="password"
            label="密码"
            placeholder="请输入密码（至少6位）"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            required
          />
          
          {formData.password && (
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-gray-600">密码强度：</span>
              <span className={passwordStrength.color}>{passwordStrength.text}</span>
            </div>
          )}
          
          <FormInput
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="确认密码"
            placeholder="请再次输入密码"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
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
                注册中...
              </>
            ) : '注册账号'}
          </Button>
        </form>
        
        <div className="mt-4 text-center text-sm text-gray-500">
          已有账号？
          <button 
            type="button" 
            className="ml-1 text-blue-600 hover:underline font-medium"
            onClick={() => router.push('/login')}
          >
            立即登录
          </button>
        </div>
      </CardContent>
    </Card>
  )
}