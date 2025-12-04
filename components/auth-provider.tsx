'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@/lib/types'
import { AuthService } from '@/lib/auth'

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (data: { username: string; password: string }) => Promise<void>
  register: (data: { username: string; email: string; password: string; confirmPassword: string }) => Promise<void>
  logout: () => void
  resetPassword: (email: string) => Promise<void>
  updateProfile: (data: Partial<User>) => Promise<void>
  refreshToken: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [authChecked, setAuthChecked] = useState(false)

  useEffect(() => {
    // 确保只在客户端执行
    if (typeof window === 'undefined') return
    
    // 延迟检查认证状态，避免阻塞页面渲染
    const timer = setTimeout(() => {
      checkAuthStatus()
    }, 100)
    
    return () => clearTimeout(timer)
  }, [])

  const checkAuthStatus = async () => {
    try {
      setIsLoading(true)
      
      // 首先检查本地存储中是否有token，如果没有，直接返回false
      const token = AuthService.getToken()
      if (!token) {
        setUser(null)
        setIsAuthenticated(false)
        setAuthChecked(true)
        setIsLoading(false)
        return
      }
      
      // 添加超时处理
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('认证检查超时')), 5000)
      })
      
      try {
        const authenticated = await Promise.race([
          AuthService.isAuthenticated(),
          timeoutPromise
        ]) as boolean
        
        if (authenticated) {
          const currentUser = AuthService.getCurrentUser()
          setUser(currentUser)
          setIsAuthenticated(true)
        } else {
          // 如果token无效，清除本地存储
          AuthService.logout()
          setUser(null)
          setIsAuthenticated(false)
        }
      } catch (error) {
        console.error('Token验证失败:', error)
        // 发生错误时也清除本地存储
        AuthService.logout()
        setUser(null)
        setIsAuthenticated(false)
      }
    } catch (error) {
      console.error('检查认证状态失败:', error)
      // 发生错误时也清除本地存储
      AuthService.logout()
      setUser(null)
      setIsAuthenticated(false)
    } finally {
      setAuthChecked(true)
      setIsLoading(false)
    }
  }

  const login = async (data: { username: string; password: string }) => {
    try {
      setIsLoading(true)
      const result = await AuthService.login(data)
      setUser(result.user)
      setIsAuthenticated(true)
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (data: { username: string; email: string; password: string; confirmPassword: string }) => {
    try {
      setIsLoading(true)
      const result = await AuthService.register(data)
      setUser(result.user)
      setIsAuthenticated(true)
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    AuthService.logout()
    setUser(null)
    setIsAuthenticated(false)
  }

  const resetPassword = async (email: string) => {
    try {
      setIsLoading(true)
      // 这里应该调用实际的API来发送重置密码邮件
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.error || '发送重置邮件失败')
      }
    } catch (error) {
      console.error('发送重置邮件失败:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const updateProfile = async (data: Partial<User>) => {
    try {
      setIsLoading(true)
      const token = AuthService.getToken()
      if (!token) {
        throw new Error('用户未登录')
      }

      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.error || '更新用户信息失败')
      }

      // 更新本地存储中的用户信息
      const updatedUser = { ...user, ...result.data }
      setUser(updatedUser)
      AuthService.setUser(updatedUser)
    } catch (error) {
      console.error('更新用户信息失败:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const refreshToken = async () => {
    try {
      const token = AuthService.getToken()
      if (!token) {
        throw new Error('没有有效的令牌')
      }

      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.error || '刷新令牌失败')
      }

      // 更新本地存储中的令牌
      AuthService.setToken(result.data.token)
    } catch (error) {
      console.error('刷新令牌失败:', error)
      // 刷新失败，可能需要重新登录
      logout()
      throw error
    }
  }

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    resetPassword,
    updateProfile,
    refreshToken,
  }

  // 在认证状态检查完成前显示加载状态
  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="text-center">
          <div className="animate-float inline-block">
            <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white shadow-lg">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <p className="mt-4 text-gray-600">正在验证身份...</p>
        </div>
      </div>
    )
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}