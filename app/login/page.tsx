'use client'

import React from 'react'
import { LoginForm } from '@/components/login-form'
import { useAuth } from '@/components/auth-provider'
import { useRouter } from 'next/navigation'
import GlobalNavbar from '@/components/global-navbar'

export default function LoginPage() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  if (isAuthenticated) {
    router.push('/dashboard')
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 全局导航栏 */}
      <GlobalNavbar />
      
      {/* 主要内容 */}
      <main className="pt-16">
        <div className="container py-12">
          <div className="max-w-sm mx-auto">
            {/* 标题区域 */}
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">登录账户</h1>
              <p className="text-gray-600 text-sm">登录您的账户继续使用</p>
            </div>
            
            {/* 登录表单 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <LoginForm />
            </div>
            
            {/* 底部链接 */}
            <div className="text-center mt-4">
              <p className="text-gray-600 text-sm">
                还没有账户？{' '}
                <a href="/register" className="text-blue-600 hover:text-blue-700 font-medium">
                  立即注册
                </a>
              </p>
              <p className="text-xs text-gray-500 mt-1">
                <a href="/forgot-password" className="hover:text-blue-600">
                  忘记密码？
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* 页脚 */}
      <footer className="bg-white border-t border-gray-200 mt-8">
        <div className="container py-6">
          <div className="text-center">
            <p className="text-gray-600 text-sm">
              © 2024 丘比特AI情感助手. 让爱更美好.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}