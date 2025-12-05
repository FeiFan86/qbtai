'use client'

import React from 'react'
import { LoginForm } from '@/components/login-form'
import { useAuth } from '@/components/auth-provider'
import { useRouter } from 'next/navigation'
import GlobalNavbar from '@/components/global-navbar'
import { Heart } from 'lucide-react'

export default function LoginPage() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  if (isAuthenticated) {
    router.push('/dashboard')
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      {/* 全局导航栏 */}
      <GlobalNavbar />
      
      {/* 主要内容 */}
      <main className="pt-16">
        <div className="container py-20">
          <div className="max-w-sm mx-auto">
            {/* 标题区域 */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-3">登录账户</h1>
              <p className="text-gray-600">登录您的账户继续使用</p>
            </div>
            
            {/* 登录表单 */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <LoginForm />
            </div>
          </div>
        </div>
      </main>

      {/* 页脚 */}
      <footer className="bg-gray-50 border-t border-gray-200">
        <div className="container py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-6 h-6 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full flex items-center justify-center">
                <Heart className="h-3 w-3 text-white" fill="currentColor" />
              </div>
              <span className="text-gray-900 font-semibold">丘比特AI情感助手</span>
            </div>
            <p className="text-gray-600 text-sm">
              © 2024 专为情侣设计的情感助手平台. 让爱更美好.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}