import { User } from './types'

export interface UsageLimitConfig {
  maxDaily: number
  maxMonthly: number
  maxGuest: number
  guestResetTime: number // 游客重置时间(分钟)
}

export interface FeatureUsageLimits {
  [feature: string]: UsageLimitConfig
}

// 各功能的使用限制配置
export const FEATURE_LIMITS: FeatureUsageLimits = {
  'emotion-analysis': {
    maxDaily: 10,
    maxMonthly: 200,
    maxGuest: 3,
    guestResetTime: 30 // 30分钟后重置
  },
  'social-assistant': {
    maxDaily: 5,
    maxMonthly: 100,
    maxGuest: 2,
    guestResetTime: 60 // 60分钟后重置
  },
  'content-creation': {
    maxDaily: 15,
    maxMonthly: 300,
    maxGuest: 5,
    guestResetTime: 20 // 20分钟后重置
  },
  'emotion-diary': {
    maxDaily: 5,
    maxMonthly: 150,
    maxGuest: 2,
    guestResetTime: 60 // 60分钟后重置
  },
  'data-insights': {
    maxDaily: 10,
    maxMonthly: 200,
    maxGuest: 3,
    guestResetTime: 30 // 30分钟后重置
  },
  'games': {
    maxDaily: 20,
    maxMonthly: 400,
    maxGuest: 10,
    guestResetTime: 15 // 15分钟后重置
  }
}

// 本地存储键名前缀
const STORAGE_PREFIX = 'cupidai_usage_'

// 获取游客使用记录
export function getGuestUsage(feature: string): number {
  if (typeof window === 'undefined') return 0
  
  const key = `${STORAGE_PREFIX}guest_${feature}`
  const data = localStorage.getItem(key)
  
  if (!data) return 0
  
  try {
    const { count, timestamp } = JSON.parse(data)
    const limit = FEATURE_LIMITS[feature]
    const resetTime = limit.guestResetTime * 60 * 1000 // 转换为毫秒
    
    // 检查是否需要重置
    if (Date.now() - timestamp > resetTime) {
      localStorage.removeItem(key)
      return 0
    }
    
    return count
  } catch (error) {
    console.error('Failed to parse guest usage data:', error)
    localStorage.removeItem(key)
    return 0
  }
}

// 增加游客使用次数
export function incrementGuestUsage(feature: string): number {
  if (typeof window === 'undefined') return 0
  
  const key = `${STORAGE_PREFIX}guest_${feature}`
  const currentUsage = getGuestUsage(feature)
  const newUsage = currentUsage + 1
  
  try {
    const data = {
      count: newUsage,
      timestamp: Date.now()
    }
    localStorage.setItem(key, JSON.stringify(data))
    return newUsage
  } catch (error) {
    console.error('Failed to save guest usage data:', error)
    return currentUsage
  }
}

// 检查游客是否可以使用功能
export function canGuestUseFeature(feature: string): { canUse: boolean; remaining: number; resetTime?: Date } {
  const limit = FEATURE_LIMITS[feature]
  const currentUsage = getGuestUsage(feature)
  const remaining = Math.max(0, limit.maxGuest - currentUsage)
  
  // 计算重置时间
  const key = `${STORAGE_PREFIX}guest_${feature}`
  let resetTime: Date | undefined
  
  try {
    const data = localStorage.getItem(key)
    if (data) {
      const { timestamp } = JSON.parse(data)
      resetTime = new Date(timestamp + limit.guestResetTime * 60 * 1000)
    }
  } catch (error) {
    console.error('Failed to parse guest usage data:', error)
  }
  
  return {
    canUse: remaining > 0,
    remaining,
    resetTime
  }
}

// 获取用户使用记录 (这部分需要连接后端API)
export async function getUserUsage(user: User, feature: string): Promise<{ daily: number; monthly: number }> {
  // 这里应该调用后端API获取用户使用统计
  // 暂时返回模拟数据
  return {
    daily: 0,
    monthly: 0
  }
}

// 检查用户是否可以使用功能
export async function canUserUseFeature(user: User, feature: string): Promise<{ canUse: boolean; dailyRemaining: number; monthlyRemaining: number }> {
  const limit = FEATURE_LIMITS[feature]
  const usage = await getUserUsage(user, feature)
  
  return {
    canUse: usage.daily < limit.maxDaily && usage.monthly < limit.maxMonthly,
    dailyRemaining: Math.max(0, limit.maxDaily - usage.daily),
    monthlyRemaining: Math.max(0, limit.maxMonthly - usage.monthly)
  }
}

// 记录用户使用
export async function recordUserUsage(user: User, feature: string): Promise<void> {
  // 这里应该调用后端API记录用户使用
  console.log(`Recording usage for user ${user.id} on feature ${feature}`)
}

// 获取功能状态描述
export function getFeatureStatusText(feature: string, isGuest: boolean, usage?: any): string {
  const limit = FEATURE_LIMITS[feature]
  
  if (isGuest) {
    const guestUsage = canGuestUseFeature(feature)
    if (!guestUsage.canUse) {
      return `游客使用次数已用完，请登录后继续使用或等待${guestUsage.resetTime ? Math.ceil((guestUsage.resetTime.getTime() - Date.now()) / (1000 * 60)) : 0}分钟后重置`
    }
    return `游客还可使用 ${guestUsage.remaining} 次`
  }
  
  if (usage) {
    return `今日剩余 ${usage.dailyRemaining} 次，本月剩余 ${usage.monthlyRemaining} 次`
  }
  
  return ''
}

// 功能名称映射
export const FEATURE_NAMES: { [key: string]: string } = {
  'emotion-analysis': '情感分析',
  'social-assistant': '社交助手',
  'content-creation': '内容创作',
  'emotion-diary': '情感日记',
  'data-insights': '数据洞察',
  'games': '互动游戏'
}