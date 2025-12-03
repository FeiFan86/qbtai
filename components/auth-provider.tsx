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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
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
        setIsLoading(false)
        return
      }
      
      // 添加超时处理
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('认证检查超时')), 3000)
      })
      
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
      console.error('检查认证状态失败:', error)
      // 发生错误时也清除本地存储
      AuthService.logout()
      setUser(null)
      setIsAuthenticated(false)
    } finally {
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

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
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