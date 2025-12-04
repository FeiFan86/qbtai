'use client'

import React, { useState } from 'react'
import { useAuth } from './auth-provider'
import { useRouter } from 'next/navigation'
import { Heart, User, Mail, Lock, Sparkles, CheckCircle, Eye, EyeOff, ArrowRight, Shield, Check } from 'lucide-react'

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
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [termsAccepted, setTermsAccepted] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.username.trim()) {
      newErrors.username = '用户名不能为空'
    } else if (formData.username.length < 3) {
      newErrors.username = '用户名至少需要3个字符'
    } else if (!/^[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(formData.username)) {
      newErrors.username = '用户名只能包含字母、数字、下划线和中文'
    }

    if (!formData.email.trim()) {
      newErrors.email = '邮箱不能为空'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '请输入有效的邮箱地址'
    }

    if (!formData.password) {
      newErrors.password = '密码不能为空'
    } else if (formData.password.length < 8) {
      newErrors.password = '密码长度至少为8位'
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = '密码必须包含大小写字母和数字'
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = '请确认密码'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '两次输入的密码不一致'
    }

    if (!termsAccepted) {
      newErrors.terms = '请同意服务条款和隐私政策'
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
      // 注册成功后跳转到首页
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
    if (!password) return { score: 0, text: '非常弱', color: 'bg-red-500', width: '20%' }

    let score = 0
    if (password.length >= 8) score += 1
    if (password.length >= 12) score += 1
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1
    if (/[0-9]/.test(password)) score += 1
    if (/[^a-zA-Z0-9]/.test(password)) score += 1

    const strengthLevels = [
      { score: 0, text: '非常弱', color: 'bg-red-500', width: '20%' },
      { score: 1, text: '弱', color: 'bg-orange-500', width: '35%' },
      { score: 2, text: '一般', color: 'bg-yellow-500', width: '50%' },
      { score: 3, text: '中等', color: 'bg-blue-500', width: '70%' },
      { score: 4, text: '强', color: 'bg-green-500', width: '85%' },
      { score: 5, text: '非常强', color: 'bg-green-600', width: '100%' },
    ]

    return strengthLevels[Math.min(score, 5)]
  }

  const passwordStrength = getPasswordStrength()

  const getPasswordRequirements = () => {
    const password = formData.password
    return [
      { label: '至少8个字符', met: password.length >= 8 },
      { label: '包含大写字母', met: /[A-Z]/.test(password) },
      { label: '包含小写字母', met: /[a-z]/.test(password) },
      { label: '包含数字', met: /[0-9]/.test(password) },
      { label: '包含特殊字符', met: /[^a-zA-Z0-9]/.test(password) },
    ]
  }

  return (
    <div className="w-full max-w-md mx-auto animate-slide-in-up">
      {/* 注册表单卡片 */}
      <div className="card p-8 md:p-10 shadow-2xl">
        {/* 头部图标和标题 */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-glow animate-float">
            <Heart className="h-10 w-10 text-white" fill="currentColor" />
          </div>
          <h2 className="text-3xl font-bold text-gradient mb-2">开启甜蜜旅程</h2>
          <p className="text-gray-600 text-pretty">
            创建您的丘比特AI情感助手账号
          </p>
        </div>

        {/* 表单 */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 错误提示 */}
          {errors.submit && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2 animate-scale-in">
              <Sparkles className="h-4 w-4 flex-shrink-0" />
              <span className="text-sm">{errors.submit}</span>
            </div>
          )}
          
          {/* 用户名输入框 */}
          <div className="space-y-2">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              用户名
            </label>
            <div className={`relative transition-all duration-200 ${focusedField === 'username' ? 'transform scale-105' : ''}`}>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="username"
                name="username"
                type="text"
                placeholder="请输入用户名（至少3个字符）"
                value={formData.username}
                onChange={handleChange}
                onFocus={() => setFocusedField('username')}
                onBlur={() => setFocusedField(null)}
                className={`input pl-10 pr-4 py-3 w-full ${errors.username ? 'border-red-300' : ''}`}
                required
              />
            </div>
            {errors.username && (
              <p className="text-sm text-red-600 flex items-center gap-1 mt-1">
                <Sparkles className="h-3 w-3" />
                {errors.username}
              </p>
            )}
            <p className="text-xs text-gray-500">用户名将显示在游戏中</p>
          </div>
          
          {/* 邮箱输入框 */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              邮箱地址
            </label>
            <div className={`relative transition-all duration-200 ${focusedField === 'email' ? 'transform scale-105' : ''}`}>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="请输入邮箱地址"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                className={`input pl-10 pr-4 py-3 w-full ${errors.email ? 'border-red-300' : ''}`}
                required
              />
            </div>
            {errors.email && (
              <p className="text-sm text-red-600 flex items-center gap-1 mt-1">
                <Sparkles className="h-3 w-3" />
                {errors.email}
              </p>
            )}
            <p className="text-xs text-gray-500">用于找回密码和接收通知</p>
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
                placeholder="请输入密码（至少8位）"
                value={formData.password}
                onChange={handleChange}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
                className={`input pl-10 pr-12 py-3 w-full ${errors.password ? 'border-red-300' : ''}`}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            
            {/* 密码强度指示器 */}
            {formData.password && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">密码强度：</span>
                  <span className="text-sm font-medium text-gray-800">{passwordStrength.text}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className={`h-full ${passwordStrength.color} rounded-full transition-all duration-300 ease-out`}
                    style={{ width: passwordStrength.width }}
                  ></div>
                </div>
                
                {/* 密码要求列表 */}
                <div className="mt-2 space-y-1">
                  {getPasswordRequirements().map((req, index) => (
                    <div key={index} className="flex items-center gap-1 text-xs">
                      <Check className={`h-3 w-3 ${req.met ? 'text-green-500' : 'text-gray-300'}`} />
                      <span className={req.met ? 'text-green-700' : 'text-gray-500'}>{req.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* 确认密码输入框 */}
          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              确认密码
            </label>
            <div className={`relative transition-all duration-200 ${focusedField === 'confirmPassword' ? 'transform scale-105' : ''}`}>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CheckCircle className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="请再次输入密码"
                value={formData.confirmPassword}
                onChange={handleChange}
                onFocus={() => setFocusedField('confirmPassword')}
                onBlur={() => setFocusedField(null)}
                className={`input pl-10 pr-12 py-3 w-full ${errors.confirmPassword ? 'border-red-300' : ''}`}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-sm text-red-600 flex items-center gap-1 mt-1">
                <Sparkles className="h-3 w-3" />
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* 服务条款 */}
          <div className="space-y-2">
            <label className="flex items-start gap-2">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => {
                  setTermsAccepted(e.target.checked)
                  if (errors.terms) {
                    setErrors(prev => ({ ...prev, terms: '' }))
                  }
                }}
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-indigo-500 mt-0.5"
              />
              <span className="text-sm text-gray-600">
                我已阅读并同意
                <a href="#" className="text-primary-600 hover:text-primary-700 font-medium mx-1">服务条款</a>
                和
                <a href="#" className="text-primary-600 hover:text-primary-700 font-medium ml-1">隐私政策</a>
              </span>
            </label>
            {errors.terms && (
              <p className="text-sm text-red-600 flex items-center gap-1 mt-1">
                <Sparkles className="h-3 w-3" />
                {errors.terms}
              </p>
            )}
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
                注册中...
              </>
            ) : (
              <>
                <Heart className="h-5 w-5 mr-2" />
                立即注册
              </>
            )}
          </button>
        </form>
        
        {/* 安全提示 */}
        <div className="mt-6 p-4 bg-primary-50 rounded-lg">
          <div className="flex items-start gap-2">
            <Shield className="h-5 w-5 text-primary-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-primary-700">
              <p className="font-medium mb-1">您的信息安全</p>
              <p className="text-primary-600">我们采用端到端加密技术保护您的数据，绝不会分享您的个人信息。</p>
            </div>
          </div>
        </div>
        
        {/* 底部链接 */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-600">
            已有账号？
            <button 
              type="button" 
              className="ml-1 font-medium text-primary-600 hover:text-primary-700 transition-colors"
              onClick={() => router.push('/login')}
            >
              立即登录
              <ArrowRight className="inline h-3 w-3 ml-1" />
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}