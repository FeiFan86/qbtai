'use client'

import React from 'react'
import { LoginForm } from '@/components/login-form'
import { useAuth } from '@/components/auth-provider'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  if (isAuthenticated) {
    router.push('/dashboard')
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* 标题 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">欢迎回来</h1>
          <p className="text-gray-600">登录您的账户继续使用</p>
        </div>
        
        {/* 登录表单 */}
        <LoginForm />
        
        {/* 底部链接 */}
        <div className="text-center mt-6">
          <p className="text-gray-600">
            还没有账户？{' '}
            <a href="/register" className="text-rose-600 hover:text-rose-700 font-medium">
              立即注册
            </a>
          </p>
          <p className="text-sm text-gray-500 mt-2">
            <a href="/forgot-password" className="hover:text-rose-600">
              忘记密码？
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}