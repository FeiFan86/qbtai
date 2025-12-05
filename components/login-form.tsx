'use client'

import React, { useState } from 'react'
import { useAuth } from './auth-provider'
import { useRouter } from 'next/navigation'
import { Heart, Lock, User, Sparkles, Eye, EyeOff, ArrowRight } from 'lucide-react'

export function LoginForm() {
  const { login, isLoading } = useAuth()
  const router = useRouter()
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)
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
      router.push('/')
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
    if (error) setError('')
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 错误提示 */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded text-sm">
            {error}
          </div>
        )}
        
        {/* 用户名输入框 */}
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
            用户名或邮箱
          </label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="请输入用户名或邮箱"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        {/* 密码输入框 */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            密码
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="请输入密码"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
        
        {/* 记住我和忘记密码 */}
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center">
            <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded" />
            <span className="ml-2 text-gray-600">记住我</span>
          </label>
          <button type="button" className="text-blue-600 hover:text-blue-700">
            忘记密码？
          </button>
        </div>
        
        {/* 提交按钮 */}
        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? '登录中...' : '立即登录'}
        </button>
      </form>
      
      {/* 底部链接 */}
      <div className="mt-4 pt-4 border-t border-gray-200 text-center text-sm text-gray-600">
        还没有账号？
        <button 
          type="button" 
          className="ml-1 text-blue-600 hover:text-blue-700 font-medium"
          onClick={() => router.push('/register')}
        >
          立即注册
        </button>
      </div>
    </div>
  )
}