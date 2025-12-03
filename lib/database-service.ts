// 数据库服务 - 支持多种数据库后端
import { User, EmotionPost, EmotionReply, GameProgress, Achievement } from './types'

class DatabaseService {
  private apiBaseUrl = '/api'

  // 通用API请求方法
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('cupidai_token') : null
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(`${this.apiBaseUrl}${endpoint}`, config)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      
      if (!result.success) {
        throw new Error(result.error || '请求失败')
      }

      return result.data
    } catch (error) {
      console.error(`数据库请求失败 [${endpoint}]:`, error)
      throw error
    }
  }

  // 情感树洞相关API
  async getEmotionPosts(gameType: string, limit: number = 20): Promise<EmotionPost[]> {
    return this.request<EmotionPost[]>(`/games/${gameType}/posts?limit=${limit}`)
  }

  async createEmotionPost(gameType: string, post: Omit<EmotionPost, 'id' | 'timestamp'>): Promise<EmotionPost> {
    return this.request<EmotionPost>(`/games/${gameType}/posts`, {
      method: 'POST',
      body: JSON.stringify(post),
    })
  }

  async addEmotionReply(gameType: string, postId: string, reply: Omit<EmotionReply, 'id' | 'timestamp'>): Promise<EmotionReply> {
    return this.request<EmotionReply>(`/games/${gameType}/posts/${postId}/replies`, {
      method: 'POST',
      body: JSON.stringify(reply),
    })
  }

  async likeEmotionPost(gameType: string, postId: string): Promise<EmotionPost> {
    return this.request<EmotionPost>(`/games/${gameType}/posts/${postId}/like`, {
      method: 'POST',
    })
  }

  // 游戏进度和得分管理
  async saveGameProgress(gameType: string, userId: string, progress: any, score: number = 0): Promise<GameProgress> {
    return this.request<GameProgress>(`/games/${gameType}/progress`, {
      method: 'POST',
      body: JSON.stringify({ userId, progress, score }),
    })
  }

  async getGameProgress(gameType: string, userId: string): Promise<GameProgress | null> {
    try {
      return await this.request<GameProgress>(`/games/${gameType}/progress/${userId}`)
    } catch (error) {
      return null
    }
  }

  async saveGameScore(gameType: string, userId: string, score: number): Promise<any> {
    return this.request<any>(`/games/${gameType}/score`, {
      method: 'POST',
      body: JSON.stringify({ userId, score }),
    })
  }

  // 成就系统
  async unlockAchievement(userId: string, achievementId: string): Promise<Achievement> {
    return this.request<Achievement>('/achievements/unlock', {
      method: 'POST',
      body: JSON.stringify({ userId, achievementId }),
    })
  }

  async getUserAchievements(userId: string): Promise<Achievement[]> {
    return this.request<Achievement[]>(`/achievements/${userId}`)
  }

  // 用户数据管理
  async getUserGameStats(userId: string): Promise<any> {
    return this.request<any>(`/users/${userId}/stats`)
  }

  async getGameLeaderboard(gameType: string, limit: number = 10): Promise<any[]> {
    return this.request<any[]>(`/games/${gameType}/leaderboard?limit=${limit}`)
  }

  // 文件上传支持
  async uploadFile(file: File, gameType: string): Promise<{ url: string }> {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('gameType', gameType)

    return this.request<{ url: string }>('/upload', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('cupidai_token')}`,
      },
      body: formData,
    })
  }
}

export const databaseService = new DatabaseService()
export default databaseService