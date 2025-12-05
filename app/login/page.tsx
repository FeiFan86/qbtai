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
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">登录账户</h1>
        </div>
        
        {/* 登录表单 */}
        <LoginForm />
        
        {/* 底部链接 */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
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