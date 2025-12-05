'use client'

import React, { useState } from 'react'
import { useAuth } from './auth-provider'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff } from 'lucide-react'

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
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)

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

    if (!termsAccepted) {
      newErrors.terms = '请同意服务条款'
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
      router.push('/')
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
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 错误提示 */}
        {errors.submit && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded text-sm">
            {errors.submit}
          </div>
        )}
        
        {/* 用户名输入框 */}
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
            用户名
          </label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="请输入用户名（至少3个字符）"
            value={formData.username}
            onChange={handleChange}
            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.username ? 'border-red-300' : ''}`}
            required
          />
          {errors.username && (
            <p className="text-sm text-red-600 mt-1">{errors.username}</p>
          )}
        </div>
        
        {/* 邮箱输入框 */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            邮箱地址
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="请输入邮箱地址"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-300' : ''}`}
            required
          />
          {errors.email && (
            <p className="text-sm text-red-600 mt-1">{errors.email}</p>
          )}
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
              placeholder="请输入密码（至少6位）"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.password ? 'border-red-300' : ''}`}
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
          {errors.password && (
            <p className="text-sm text-red-600 mt-1">{errors.password}</p>
          )}
        </div>
        
        {/* 确认密码输入框 */}
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
            确认密码
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="请再次输入密码"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.confirmPassword ? 'border-red-300' : ''}`}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-sm text-red-600 mt-1">{errors.confirmPassword}</p>
          )}
        </div>

        {/* 服务条款 */}
        <div className="text-sm">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => {
                setTermsAccepted(e.target.checked)
                if (errors.terms) {
                  setErrors(prev => ({ ...prev, terms: '' }))
                }
              }}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded mr-2"
            />
            <span className="text-gray-600">
              我已阅读并同意
              <a href="#" className="text-blue-600 hover:text-blue-700 font-medium mx-1">服务条款</a>
              和
              <a href="#" className="text-blue-600 hover:text-blue-700 font-medium ml-1">隐私政策</a>
            </span>
          </label>
          {errors.terms && (
            <p className="text-sm text-red-600 mt-1">{errors.terms}</p>
          )}
        </div>
        
        {/* 提交按钮 */}
        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? '注册中...' : '立即注册'}
        </button>
      </form>
      
      {/* 底部链接 */}
      <div className="mt-4 pt-4 border-t border-gray-200 text-center text-sm text-gray-600">
        已有账号？
        <button 
          type="button" 
          className="ml-1 text-blue-600 hover:text-blue-700 font-medium"
          onClick={() => router.push('/login')}
        >
          立即登录
        </button>
      </div>
    </div>
  )
}