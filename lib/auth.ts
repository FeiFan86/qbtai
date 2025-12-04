// 认证服务
import { User, LoginData, RegisterData } from './types'

export class AuthService {
  private static tokenKey = 'cupidai_token'
  private static userKey = 'cupidai_user'
  private static refreshTokenKey = 'cupidai_refresh_token'

  // 登录
  static async login(data: LoginData): Promise<{ user: User; token: string; refreshToken?: string }> {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.error || '登录失败')
      }

      // 保存token和用户信息
      this.setToken(result.data.token)
      if (result.data.refreshToken) {
        this.setRefreshToken(result.data.refreshToken)
      }
      this.setUser(result.data.user)

      return result.data
    } catch (error) {
      console.error('登录失败:', error)
      throw error
    }
  }

  // 注册
  static async register(data: RegisterData): Promise<{ user: User; token: string; refreshToken?: string }> {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.error || '注册失败')
      }

      // 保存token和用户信息
      this.setToken(result.data.token)
      if (result.data.refreshToken) {
        this.setRefreshToken(result.data.refreshToken)
      }
      this.setUser(result.data.user)

      return result.data
    } catch (error) {
      console.error('注册失败:', error)
      throw error
    }
  }

  // 验证token
  static async verifyToken(token: string): Promise<boolean> {
    try {
      const response = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      })

      if (!response.ok) {
        return false
      }

      const result = await response.json()
      return result.success && result.data.valid
    } catch (error) {
      console.error('Token验证失败:', error)
      return false
    }
  }

  // 刷新token
  static async refreshToken(): Promise<{ token: string; refreshToken?: string } | null> {
    try {
      const refreshToken = this.getRefreshToken()
      if (!refreshToken) {
        return null
      }

      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      })

      if (!response.ok) {
        return null
      }

      const result = await response.json()

      if (!result.success) {
        return null
      }

      // 更新token
      this.setToken(result.data.token)
      if (result.data.refreshToken) {
        this.setRefreshToken(result.data.refreshToken)
      }

      return result.data
    } catch (error) {
      console.error('刷新token失败:', error)
      return null
    }
  }

  // 重置密码
  static async resetPassword(email: string): Promise<void> {
    try {
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
      console.error('重置密码失败:', error)
      throw error
    }
  }

  // 获取当前用户
  static getCurrentUser(): User | null {
    if (typeof window === 'undefined') return null
    
    try {
      const userStr = localStorage.getItem(this.userKey)
      if (!userStr) return null
      return JSON.parse(userStr)
    } catch (error) {
      console.error('Failed to parse user data:', error)
      return null
    }
  }

  // 更新当前用户信息
  static updateUser(userData: Partial<User>): void {
    if (typeof window === 'undefined') return
    
    const currentUser = this.getCurrentUser()
    if (!currentUser) return

    const updatedUser = { ...currentUser, ...userData }
    this.setUser(updatedUser)
  }

  // 获取token
  static getToken(): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem(this.tokenKey)
  }

  // 获取刷新token
  static getRefreshToken(): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem(this.refreshTokenKey)
  }

  // 设置token
  static setToken(token: string): void {
    if (typeof window === 'undefined') return
    localStorage.setItem(this.tokenKey, token)
  }

  // 设置刷新token
  static setRefreshToken(refreshToken: string): void {
    if (typeof window === 'undefined') return
    localStorage.setItem(this.refreshTokenKey, refreshToken)
  }

  // 设置用户
  static setUser(user: User): void {
    if (typeof window === 'undefined') return
    localStorage.setItem(this.userKey, JSON.stringify(user))
  }

  // 登出
  static logout(): void {
    if (typeof window === 'undefined') return
    localStorage.removeItem(this.tokenKey)
    localStorage.removeItem(this.refreshTokenKey)
    localStorage.removeItem(this.userKey)
  }

  // 检查是否已登录
  static async isAuthenticated(): Promise<boolean> {
    // 在服务器端直接返回false
    if (typeof window === 'undefined') return false
    
    const token = this.getToken()
    if (!token) return false

    try {
      // 先尝试验证当前token
      if (await this.verifyToken(token)) {
        return true
      }
      
      // 如果当前token无效，尝试刷新token
      const refreshResult = await this.refreshToken()
      return refreshResult !== null
    } catch (error) {
      console.error('Authentication check failed:', error)
      return false
    }
  }

  // 获取带认证头的请求头
  static getAuthHeaders(): Record<string, string> {
    const token = this.getToken()
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }

    if (token) {
      headers.Authorization = `Bearer ${token}`
    }

    return headers
  }

  // 发送带认证的请求
  static async authRequest(url: string, options: RequestInit = {}): Promise<Response> {
    const headers = {
      ...this.getAuthHeaders(),
      ...options.headers,
    }

    const response = await fetch(url, {
      ...options,
      headers,
    })

    // 如果401未授权，尝试刷新token后重试
    if (response.status === 401) {
      const refreshResult = await this.refreshToken()
      if (refreshResult) {
        // 使用新的token重试请求
        const newHeaders = {
          ...this.getAuthHeaders(),
          ...options.headers,
        }

        return fetch(url, {
          ...options,
          headers: newHeaders,
        })
      } else {
        // 刷新失败，需要重新登录
        this.logout()
      }
    }

    return response
  }
}