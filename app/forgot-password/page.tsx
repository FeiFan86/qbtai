'use client'

import React, { useState } from 'react'
import { useAuth } from '@/components/auth-provider'
import { useRouter } from 'next/navigation'
import { UnifiedLayout } from '@/components/layout-unified'
import { Lock, Mail, Sparkles, ArrowLeft, CheckCircle } from 'lucide-react'

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    if (!email.trim()) {
      setError('请输入邮箱地址')
      setIsLoading(false)
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('请输入有效的邮箱地址')
      setIsLoading(false)
      return
    }

    try {
      // 这里应该调用实际的API来发送重置密码邮件
      // 暂时模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1500))
      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : '发送重置邮件失败')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <UnifiedLayout 
      title="找回密码"
      subtitle="重置您的密码"
      icon={<Lock className="h-4 w-4 text-primary-500" />}
      showBackButton={true}
      showAuthButtons={false}
    >
      <div className="w-full max-w-md mx-auto">
        <div className="card p-8 md:p-10 shadow-2xl">
          {success ? (
            // 成功发送邮件的状态
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">邮件已发送</h3>
                <p className="text-gray-600 text-pretty">
                  我们已向 {email} 发送了密码重置邮件，请检查您的收件箱并按照邮件中的指示操作。
                </p>
              </div>
              <div className="space-y-4">
                <p className="text-sm text-gray-500">
                  如果您没有收到邮件，请检查垃圾邮件文件夹或稍后再试。
                </p>
                <button 
                  onClick={() => router.push('/login')}
                  className="btn-primary w-full text-base font-medium"
                >
                  返回登录
                </button>
              </div>
            </div>
          ) : (
            // 表单状态
            <div className="space-y-6">
              {/* 头部说明 */}
              <div className="text-center">
                <p className="text-gray-600 text-pretty">
                  请输入您注册时使用的邮箱地址，我们将向您发送密码重置链接。
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
                      placeholder="请输入注册时使用的邮箱地址"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      className="input pl-10 pr-4 py-3 w-full"
                      required
                    />
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
                      发送中...
                    </>
                  ) : (
                    <>
                      <Mail className="h-5 w-5 mr-2" />
                      发送重置邮件
                    </>
                  )}
                </button>
              </form>

              {/* 底部链接 */}
              <div className="text-center pt-4 border-t border-gray-200">
                <button 
                  type="button" 
                  onClick={() => router.push('/login')}
                  className="inline-flex items-center text-sm text-primary-600 hover:text-primary-700 transition-colors font-medium"
                >
                  <ArrowLeft className="h-3 w-3 mr-1" />
                  返回登录
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </UnifiedLayout>
  )
}