'use client'

import React, { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { UnifiedLayout } from '@/components/layout-unified'
import { Lock, Eye, EyeOff, CheckCircle, Sparkles, AlertCircle } from 'lucide-react'

export default function ResetPasswordPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get('token')
  
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [tokenValid, setTokenValid] = useState<boolean | null>(null)

  useEffect(() => {
    // 验证token是否有效
    if (!token) {
      setTokenValid(false)
      return
    }

    validateToken()
  }, [token])

  const validateToken = async () => {
    try {
      const response = await fetch('/api/auth/verify-reset-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      })

      const result = await response.json()
      setTokenValid(result.success)
      
      if (!result.success) {
        setError(result.error || '重置链接无效或已过期')
      }
    } catch (err) {
      console.error('验证重置令牌失败:', err)
      setTokenValid(false)
      setError('验证重置链接失败')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!formData.password) {
      setError('请输入新密码')
      return
    }

    if (formData.password.length < 8) {
      setError('密码长度至少为8位')
      return
    }

    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      setError('密码必须包含大小写字母和数字')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('两次输入的密码不一致')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/reset-password-confirm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          password: formData.password,
        }),
      })

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.error || '重置密码失败')
      }

      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : '重置密码失败')
    } finally {
      setIsLoading(false)
    }
  }

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

  if (tokenValid === null) {
    return (
      <UnifiedLayout 
        title="验证中"
        subtitle="正在验证重置链接"
        icon={<Lock className="h-4 w-4 text-primary-500" />}
        showBackButton={true}
        showAuthButtons={false}
      >
        <div className="w-full max-w-md mx-auto flex justify-center">
          <div className="animate-float">
            <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white shadow-lg">
              <Lock className="h-8 w-8" />
            </div>
          </div>
        </div>
      </UnifiedLayout>
    )
  }

  if (!tokenValid) {
    return (
      <UnifiedLayout 
        title="链接无效"
        subtitle="重置链接已失效"
        icon={<AlertCircle className="h-4 w-4 text-red-500" />}
        showBackButton={true}
        showAuthButtons={false}
      >
        <div className="w-full max-w-md mx-auto">
          <div className="card p-8 md:p-10 shadow-2xl">
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                <AlertCircle className="h-8 w-8 text-red-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">重置链接无效</h3>
                <p className="text-gray-600 text-pretty">
                  {error || '此重置链接已过期或无效，请重新申请重置密码。'}
                </p>
              </div>
              <div className="space-y-4">
                <button 
                  onClick={() => router.push('/forgot-password')}
                  className="btn-primary w-full text-base font-medium"
                >
                  重新申请重置
                </button>
                <button 
                  onClick={() => router.push('/login')}
                  className="btn-ghost w-full text-base font-medium"
                >
                  返回登录
                </button>
              </div>
            </div>
          </div>
        </div>
      </UnifiedLayout>
    )
  }

  return (
    <UnifiedLayout 
      title="重置密码"
      subtitle="设置新密码"
      icon={<Lock className="h-4 w-4 text-primary-500" />}
      showBackButton={true}
      showAuthButtons={false}
    >
      <div className="w-full max-w-md mx-auto">
        <div className="card p-8 md:p-10 shadow-2xl">
          {success ? (
            // 成功重置密码的状态
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">密码重置成功</h3>
                <p className="text-gray-600 text-pretty">
                  您的密码已成功重置，现在可以使用新密码登录账户。
                </p>
              </div>
              <button 
                onClick={() => router.push('/login')}
                className="btn-primary w-full text-base font-medium"
              >
                立即登录
              </button>
            </div>
          ) : (
            // 表单状态
            <div className="space-y-6">
              {/* 头部说明 */}
              <div className="text-center">
                <p className="text-gray-600 text-pretty">
                  请设置您的新密码，确保密码足够安全以保护您的账户。
                </p>
              </div>

              {/* 错误提示 */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2 animate-scale-in">
                  <Sparkles className="h-4 w-4 flex-shrink-0" />
                  <span className="text-sm">{error}</span>
                </div>
              )}
              
              {/* 表单 */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 新密码输入框 */}
                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    新密码
                  </label>
                  <div className={`relative transition-all duration-200 ${focusedField === 'password' ? 'transform scale-105' : ''}`}>
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="请输入新密码（至少8位）"
                      value={formData.password}
                      onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                      onFocus={() => setFocusedField('password')}
                      onBlur={() => setFocusedField(null)}
                      className="input pl-10 pr-12 py-3 w-full"
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
                  
                  {/* 密码要求列表 */}
                  {formData.password && (
                    <div className="mt-2 space-y-1">
                      {getPasswordRequirements().map((req, index) => (
                        <div key={index} className="flex items-center gap-1 text-xs">
                          <CheckCircle className={`h-3 w-3 ${req.met ? 'text-green-500' : 'text-gray-300'}`} />
                          <span className={req.met ? 'text-green-700' : 'text-gray-500'}>{req.label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* 确认密码输入框 */}
                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    确认新密码
                  </label>
                  <div className={`relative transition-all duration-200 ${focusedField === 'confirmPassword' ? 'transform scale-105' : ''}`}>
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <CheckCircle className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="请再次输入新密码"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      onFocus={() => setFocusedField('confirmPassword')}
                      onBlur={() => setFocusedField(null)}
                      className="input pl-10 pr-12 py-3 w-full"
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
                      重置中...
                    </>
                  ) : (
                    <>
                      <Lock className="h-5 w-5 mr-2" />
                      重置密码
                    </>
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </UnifiedLayout>
  )
}