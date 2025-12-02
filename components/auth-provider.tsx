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
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      setIsLoading(true)
      const authenticated = await AuthService.isAuthenticated()
      
      if (authenticated) {
        const currentUser = AuthService.getCurrentUser()
        setUser(currentUser)
        setIsAuthenticated(true)
      } else {
        setUser(null)
        setIsAuthenticated(false)
      }
    } catch (error) {
      console.error('检查认证状态失败:', error)
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