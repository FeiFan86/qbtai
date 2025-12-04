'use client'

import React from 'react'
import { RegisterForm } from '@/components/register-form'

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* 标题 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">创建账户</h1>
          <p className="text-gray-600">开启您的甜蜜情感旅程</p>
        </div>
        
        {/* 注册表单 */}
        <RegisterForm />
        
        {/* 底部链接 */}
        <div className="text-center mt-6">
          <p className="text-gray-600">
            已有账户？{' '}
            <a href="/login" className="text-rose-600 hover:text-rose-700 font-medium">
              立即登录
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}