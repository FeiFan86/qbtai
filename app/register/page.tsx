'use client'

import React from 'react'
import { RegisterForm } from '@/components/register-form'
import GlobalNavbar from '@/components/global-navbar'

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      {/* 全局导航栏 */}
      <GlobalNavbar />
      
      {/* 主要内容 */}
      <main className="pt-16">
        <div className="container py-20">
          <div className="max-w-md mx-auto">
            {/* 标题区域 */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">创建账户</h1>
              <p className="text-gray-600">开启您的甜蜜情感旅程</p>
            </div>
            
            {/* 注册表单 */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <RegisterForm />
            </div>
            
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
      </main>

      {/* 页脚 */}
      <footer className="bg-gray-50 border-t border-gray-200">
        <div className="container py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-6 h-6 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full flex items-center justify-center">
                <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
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