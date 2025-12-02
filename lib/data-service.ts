// 统一数据服务
import { User, GameData, Achievement, LeaderboardEntry, AnalyticsData } from './types'

class DataService {
  private baseUrl = '/api'

  // 通用请求方法
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = this.getToken()
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, config)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      
      if (!result.success) {
        throw new Error(result.error || '请求失败')
      }

      return result.data
    } catch (error) {
      console.error(`API请求失败 [${endpoint}]:`, error)
      throw error
    }
  }

  // 获取token
  private getToken(): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem('cupidai_token')
  }

  // 用户相关API
  async getUserProfile(userId: string): Promise<User> {
    return this.request<User>(`/users/${userId}`)
  }

  async updateUserProfile(userId: string, data: Partial<User>): Promise<User> {
    return this.request<User>(`/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  // 游戏数据相关API
  async getGameData(gameId: string): Promise<GameData> {
    return this.request<GameData>(`/games/${gameId}`)
  }

  async saveGameData(gameId: string, data: Partial<GameData>): Promise<GameData> {
    return this.request<GameData>(`/games/${gameId}`, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  // 成就系统API
  async getUserAchievements(userId: string): Promise<Achievement[]> {
    return this.request<Achievement[]>(`/achievements/${userId}`)
  }

  async unlockAchievement(userId: string, achievementId: string): Promise<Achievement> {
    return this.request<Achievement>(`/achievements/${userId}/unlock`, {
      method: 'POST',
      body: JSON.stringify({ achievementId }),
    })
  }

  // 排行榜API
  async getLeaderboard(type: string, limit: number = 20): Promise<LeaderboardEntry[]> {
    return this.request<LeaderboardEntry[]>(`/leaderboards?type=${type}&limit=${limit}`)
  }

  async updateLeaderboard(userId: string, score: number): Promise<LeaderboardEntry> {
    return this.request<LeaderboardEntry>('/leaderboards/update', {
      method: 'POST',
      body: JSON.stringify({ userId, score }),
    })
  }

  // 数据分析API
  async getAnalytics(userId: string, period: string = 'week'): Promise<AnalyticsData> {
    return this.request<AnalyticsData>(`/analytics/${userId}?period=${period}`)
  }

  async getGameAnalytics(gameId: string): Promise<AnalyticsData> {
    return this.request<AnalyticsData>(`/analytics/games/${gameId}`)
  }

  // 批量操作
  async batchUpdate(data: any[]): Promise<any[]> {
    return this.request<any[]>('/batch', {
      method: 'POST',
      body: JSON.stringify({ operations: data }),
    })
  }

  // 游戏进度和得分API
  async saveGameProgress(gameType: string, userId: string, progress: any, score: number = 0, timeSpent: number = 0): Promise<any> {
    return this.request<any>('/games', {
      method: 'POST',
      body: JSON.stringify({
        action: 'saveProgress',
        gameId: `${gameType}-${userId}`,
        gameType,
        progress,
        score,
        timeSpent
      })
    })
  }

  async getGameProgress(gameType: string, userId: string): Promise<any> {
    return this.request<any>('/games', {
      method: 'GET',
      body: JSON.stringify({
        action: 'getProgress',
        gameId: `${gameType}-${userId}`,
        gameType
      })
    })
  }

  async saveGameScore(gameType: string, userId: string, score: number, timeSpent: number = 0): Promise<any> {
    return this.request<any>('/games', {
      method: 'POST',
      body: JSON.stringify({
        action: 'saveScore',
        gameId: `${gameType}-${userId}`,
        gameType,
        score,
        timeSpent
      })
    })
  }

  async getUserGameStats(userId: string): Promise<any> {
    return this.request<any>('/games', {
      method: 'GET',
      body: JSON.stringify({
        action: 'getUserStats',
        userId
      })
    })
  }

  async getGameLeaderboard(gameType: string, limit: number = 10): Promise<any> {
    return this.request<any>('/games', {
      method: 'GET',
      body: JSON.stringify({
        action: 'getLeaderboard',
        gameType,
        limit
      })
    })
  }

  async saveAchievement(userId: string, achievementId: string): Promise<any> {
    return this.request<any>('/games', {
      method: 'POST',
      body: JSON.stringify({
        action: 'saveAchievement',
        userId,
        achievementId
      })
    })
  }


}

export const dataService = new DataService()
export default dataService