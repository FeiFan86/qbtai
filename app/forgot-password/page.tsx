'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Mail, CheckCircle, ArrowLeft } from 'lucide-react'

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

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
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1500))
      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : '发送重置邮件失败')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* 标题 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">找回密码</h1>
          <p className="text-gray-600">重置您的密码</p>
        </div>

        {/* 表单内容 */}
        <div className="bg-white p-8 rounded-xl shadow-sm">
          {success ? (
            // 成功发送邮件的状态
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">邮件已发送</h3>
                <p className="text-gray-600">
                  我们已向 {email} 发送了密码重置邮件
                </p>
              </div>
              <button 
                onClick={() => router.push('/login')}
                className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3 rounded-lg hover:from-rose-600 hover:to-pink-600 transition-all"
              >
                返回登录
              </button>
            </div>
          ) : (
            // 表单状态
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-gray-600">
                  请输入您注册时使用的邮箱地址
                </p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    邮箱地址
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="请输入邮箱地址"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
                
                <button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3 rounded-lg hover:from-rose-600 hover:to-pink-600 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] mr-2"></div>
                      发送中...
                    </>
                  ) : (
                    <>
                      <Mail className="h-4 w-4 mr-2 inline" />
                      发送重置邮件
                    </>
                  )}
                </button>
              </form>

              <div className="text-center pt-4 border-t border-gray-200">
                <button 
                  type="button" 
                  onClick={() => router.push('/login')}
                  className="inline-flex items-center text-sm text-rose-600 hover:text-rose-700 font-medium"
                >
                  <ArrowLeft className="h-3 w-3 mr-1" />
                  返回登录
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}