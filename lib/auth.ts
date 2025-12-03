// 认证服务
import { User, LoginData, RegisterData } from './types'

export class AuthService {
  private static tokenKey = 'cupidai_token'
  private static userKey = 'cupidai_user'

  // 登录
  static async login(data: LoginData): Promise<{ user: User; token: string }> {
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
      this.setUser(result.data.user)

      return result.data
    } catch (error) {
      console.error('登录失败:', error)
      throw error
    }
  }

  // 注册
  static async register(data: RegisterData): Promise<{ user: User; token: string }> {
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

      const result = await response.json()
      return result.success && result.data.valid
    } catch (error) {
      console.error('Token验证失败:', error)
      return false
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

  // 获取token
  static getToken(): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem(this.tokenKey)
  }

  // 设置token
  static setToken(token: string): void {
    if (typeof window === 'undefined') return
    localStorage.setItem(this.tokenKey, token)
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
    localStorage.removeItem(this.userKey)
  }

  // 检查是否已登录
  static async isAuthenticated(): Promise<boolean> {
    // 在服务器端直接返回false
    if (typeof window === 'undefined') return false
    
    const token = this.getToken()
    if (!token) return false

    try {
      return await this.verifyToken(token)
    } catch (error) {
      console.error('Authentication check failed:', error)
      return false
    }
  }
}