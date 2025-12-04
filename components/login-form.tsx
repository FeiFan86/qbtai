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
  const [focusedField, setFocusedField] = useState<string | null>(null)

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
      // 登录成功后跳转到首页
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
    // 清除错误信息
    if (error) setError('')
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="w-full max-w-md mx-auto animate-slide-in-up">
      {/* 登录表单卡片 */}
      <div className="card p-8 md:p-10 shadow-2xl">
        {/* 头部图标和标题 */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-glow animate-float">
            <Heart className="h-10 w-10 text-white" fill="currentColor" />
          </div>
          <h2 className="text-3xl font-bold text-gradient mb-2">欢迎回来</h2>
          <p className="text-gray-600 text-pretty">
            回到丘比特AI情感助手，继续您的甜蜜旅程
          </p>
        </div>

        {/* 表单 */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 错误提示 */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2 animate-scale-in">
              <Sparkles className="h-4 w-4 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}
          
          {/* 用户名输入框 */}
          <div className="space-y-2">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              用户名或邮箱
            </label>
            <div className={`relative transition-all duration-200 ${focusedField === 'username' ? 'transform scale-105' : ''}`}>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="username"
                name="username"
                type="text"
                placeholder="请输入用户名或邮箱"
                value={formData.username}
                onChange={handleChange}
                onFocus={() => setFocusedField('username')}
                onBlur={() => setFocusedField(null)}
                className="input pl-10 pr-4 py-3 w-full"
                required
              />
            </div>
          </div>
          
          {/* 密码输入框 */}
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              密码
            </label>
            <div className={`relative transition-all duration-200 ${focusedField === 'password' ? 'transform scale-105' : ''}`}>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="请输入密码"
                value={formData.password}
                onChange={handleChange}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
                className="input pl-10 pr-12 py-3 w-full"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>
          
          {/* 记住我和忘记密码 */}
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm text-gray-600">记住我</span>
            </label>
            <button 
              type="button" 
              className="text-sm text-primary-600 hover:text-primary-700 transition-colors font-medium"
              onClick={() => router.push('/forgot-password')}
            >
              忘记密码？
            </button>
          </div>
          
          {/* 提交按钮 */}
          <button 
            type="submit" 
            className="btn-primary w-full text-lg font-semibold py-3 disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] mr-2"></div>
                登录中...
              </>
            ) : (
              <>
                <Heart className="h-5 w-5 mr-2" />
                立即登录
              </>
            )}
          </button>
        </form>
        
        {/* 底部链接 */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-600">
            还没有账号？
            <button 
              type="button" 
              className="ml-1 font-medium text-primary-600 hover:text-primary-700 transition-colors"
              onClick={() => router.push('/register')}
            >
              立即注册
              <ArrowRight className="inline h-3 w-3 ml-1" />
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}