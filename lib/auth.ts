// 基础用户认证和会话管理

// 用户接口定义
export interface User {
  id: string
  username: string
  email?: string
  avatar?: string
  createdAt: Date
  lastLogin: Date
  preferences: UserPreferences
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto'
  language: 'zh' | 'en'
  soundEnabled: boolean
  notifications: boolean
}

// 会话管理
export interface Session {
  userId: string
  token: string
  expiresAt: Date
  createdAt: Date
}

// 匿名用户ID生成（基于浏览器指纹）
export const generateAnonymousId = (): string => {
  // 简单的匿名ID生成，实际生产环境应使用更复杂的方法
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substr(2, 9)
  return `anon_${timestamp}_${random}`
}

// 获取当前用户ID（匿名或登录用户）
export const getCurrentUserId = (): string => {
  if (typeof window === 'undefined') return ''
  
  // 检查是否有已登录用户
  const loggedInUserId = localStorage.getItem('currentUserId')
  if (loggedInUserId) return loggedInUserId
  
  // 检查是否有匿名用户ID
  let anonymousId = localStorage.getItem('anonymousUserId')
  if (!anonymousId) {
    anonymousId = generateAnonymousId()
    localStorage.setItem('anonymousUserId', anonymousId)
  }
  
  return anonymousId
}

// 创建新用户（匿名）
export const createAnonymousUser = (): User => {
  const userId = generateAnonymousId()
  const now = new Date()
  
  const user: User = {
    id: userId,
    username: `用户_${userId.substr(-6)}`,
    createdAt: now,
    lastLogin: now,
    preferences: {
      theme: 'auto',
      language: 'zh',
      soundEnabled: true,
      notifications: true
    }
  }
  
  // 保存用户信息到localStorage
  localStorage.setItem(`user_${userId}`, JSON.stringify(user))
  localStorage.setItem('currentUserId', userId)
  
  return user
}

// 获取当前用户信息
export const getCurrentUser = (): User | null => {
  if (typeof window === 'undefined') return null
  
  const userId = getCurrentUserId()
  if (!userId) return null
  
  const userData = localStorage.getItem(`user_${userId}`)
  if (!userData) {
    // 如果用户数据不存在，创建新匿名用户
    return createAnonymousUser()
  }
  
  try {
    const user = JSON.parse(userData)
    // 更新最后登录时间
    user.lastLogin = new Date()
    localStorage.setItem(`user_${userId}`, JSON.stringify(user))
    
    return user
  } catch (error) {
    console.error('Failed to parse user data:', error)
    return createAnonymousUser()
  }
}

// 更新用户偏好设置
export const updateUserPreferences = (preferences: Partial<UserPreferences>): User | null => {
  const user = getCurrentUser()
  if (!user) return null
  
  user.preferences = { ...user.preferences, ...preferences }
  localStorage.setItem(`user_${user.id}`, JSON.stringify(user))
  
  return user
}

// 用户数据统计
export interface UserStats {
  totalGamesPlayed: number
  favoriteGame: string
  totalPlayTime: number
  achievements: string[]
  lastPlayed: Date
}

// 获取用户统计信息
export const getUserStats = (userId: string): UserStats => {
  const statsData = localStorage.getItem(`user_stats_${userId}`)
  
  if (statsData) {
    try {
      const stats = JSON.parse(statsData)
      // 转换日期字符串为Date对象
      if (stats.lastPlayed) stats.lastPlayed = new Date(stats.lastPlayed)
      return stats
    } catch (error) {
      console.error('Failed to parse user stats:', error)
    }
  }
  
  // 返回默认统计信息
  return {
    totalGamesPlayed: 0,
    favoriteGame: '',
    totalPlayTime: 0,
    achievements: [],
    lastPlayed: new Date()
  }
}

// 更新用户游戏统计
export const updateUserGameStats = (gameName: string, playTime: number): void => {
  const user = getCurrentUser()
  if (!user) return
  
  const stats = getUserStats(user.id)
  
  stats.totalGamesPlayed += 1
  stats.totalPlayTime += playTime
  stats.lastPlayed = new Date()
  
  // 更新最喜欢的游戏
  const gameStats = JSON.parse(localStorage.getItem(`game_stats_${user.id}`) || '{}')
  gameStats[gameName] = (gameStats[gameName] || 0) + 1
  
  // 找到玩得最多的游戏
  let favoriteGame = ''
  let maxCount = 0
  for (const [game, count] of Object.entries(gameStats)) {
    const countValue = count as number
    if (countValue > maxCount) {
      favoriteGame = game
      maxCount = countValue
    }
  }
  
  stats.favoriteGame = favoriteGame
  
  // 保存统计信息
  localStorage.setItem(`user_stats_${user.id}`, JSON.stringify(stats))
  localStorage.setItem(`game_stats_${user.id}`, JSON.stringify(gameStats))
}

// 检查用户成就
export const checkAchievements = (userId: string): string[] => {
  const stats = getUserStats(userId)
  const achievements: string[] = []
  
  // 基础成就
  if (stats.totalGamesPlayed >= 1) {
    achievements.push('初次体验')
  }
  if (stats.totalGamesPlayed >= 10) {
    achievements.push('游戏达人')
  }
  if (stats.totalPlayTime >= 3600) { // 1小时
    achievements.push('时间旅行者')
  }
  
  return achievements
}