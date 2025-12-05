// 会员等级配置和权限管理

// 会员等级配置
export const MEMBERSHIP_LEVELS = {
  free: {
    name: '免费会员',
    maxDailyUsage: {
      'emotion-analysis': 5,
      'social-assistant': 5,
      'content-creation': 3,
      'emotion-diary': 10,
      'data-insights': 3,
      'games': 10
    },
    features: ['基础功能使用', '每日限制使用次数'],
    price: 0,
    color: 'gray'
  },
  basic: {
    name: '基础会员', 
    maxDailyUsage: {
      'emotion-analysis': 20,
      'social-assistant': 20,
      'content-creation': 10,
      'emotion-diary': 30,
      'data-insights': 10,
      'games': 50
    },
    features: ['更多使用次数', '基础分析功能', '数据保存'],
    price: 29.9,
    color: 'blue'
  },
  premium: {
    name: '高级会员',
    maxDailyUsage: {
      'emotion-analysis': 100,
      'social-assistant': 100,
      'content-creation': 50,
      'emotion-diary': 200,
      'data-insights': 50,
      'games': 200
    },
    features: ['无限使用次数', '专属客服', '高级功能', '数据分析报告'],
    price: 99.9,
    color: 'purple'
  },
  vip: {
    name: 'VIP会员',
    maxDailyUsage: {
      'emotion-analysis': -1, // -1 表示无限制
      'social-assistant': -1,
      'content-creation': -1,
      'emotion-diary': -1,
      'data-insights': -1,
      'games': -1
    },
    features: ['所有高级功能', '专属客服', '数据分析报告', '优先技术支持', '定制化服务'],
    price: 299.9,
    color: 'gold'
  }
} as const

// 功能限制配置
export const FEATURE_LIMITS = {
  'emotion-analysis': {
    name: '情感分析',
    maxGuest: 3,
    maxFree: MEMBERSHIP_LEVELS.free.maxDailyUsage['emotion-analysis'],
    maxBasic: MEMBERSHIP_LEVELS.basic.maxDailyUsage['emotion-analysis'],
    maxPremium: MEMBERSHIP_LEVELS.premium.maxDailyUsage['emotion-analysis'],
    maxVip: MEMBERSHIP_LEVELS.vip.maxDailyUsage['emotion-analysis']
  },
  'social-assistant': {
    name: '社交助手',
    maxGuest: 3,
    maxFree: MEMBERSHIP_LEVELS.free.maxDailyUsage['social-assistant'],
    maxBasic: MEMBERSHIP_LEVELS.basic.maxDailyUsage['social-assistant'],
    maxPremium: MEMBERSHIP_LEVELS.premium.maxDailyUsage['social-assistant'],
    maxVip: MEMBERSHIP_LEVELS.vip.maxDailyUsage['social-assistant']
  },
  'content-creation': {
    name: '内容创作',
    maxGuest: 1,
    maxFree: MEMBERSHIP_LEVELS.free.maxDailyUsage['content-creation'],
    maxBasic: MEMBERSHIP_LEVELS.basic.maxDailyUsage['content-creation'],
    maxPremium: MEMBERSHIP_LEVELS.premium.maxDailyUsage['content-creation'],
    maxVip: MEMBERSHIP_LEVELS.vip.maxDailyUsage['content-creation']
  },
  'emotion-diary': {
    name: '情感日记',
    maxGuest: 5,
    maxFree: MEMBERSHIP_LEVELS.free.maxDailyUsage['emotion-diary'],
    maxBasic: MEMBERSHIP_LEVELS.basic.maxDailyUsage['emotion-diary'],
    maxPremium: MEMBERSHIP_LEVELS.premium.maxDailyUsage['emotion-diary'],
    maxVip: MEMBERSHIP_LEVELS.vip.maxDailyUsage['emotion-diary']
  },
  'data-insights': {
    name: '数据洞察',
    maxGuest: 1,
    maxFree: MEMBERSHIP_LEVELS.free.maxDailyUsage['data-insights'],
    maxBasic: MEMBERSHIP_LEVELS.basic.maxDailyUsage['data-insights'],
    maxPremium: MEMBERSHIP_LEVELS.premium.maxDailyUsage['data-insights'],
    maxVip: MEMBERSHIP_LEVELS.vip.maxDailyUsage['data-insights']
  },
  'games': {
    name: '互动游戏',
    maxGuest: 5,
    maxFree: MEMBERSHIP_LEVELS.free.maxDailyUsage['games'],
    maxBasic: MEMBERSHIP_LEVELS.basic.maxDailyUsage['games'],
    maxPremium: MEMBERSHIP_LEVELS.premium.maxDailyUsage['games'],
    maxVip: MEMBERSHIP_LEVELS.vip.maxDailyUsage['games']
  }
} as const

// 权限配置
export const PERMISSIONS = {
  // 用户管理权限
  MANAGE_USERS: 'manage_users',
  VIEW_USERS: 'view_users',
  EDIT_USERS: 'edit_users',
  DELETE_USERS: 'delete_users',
  
  // 内容管理权限
  MANAGE_CONTENT: 'manage_content',
  VIEW_CONTENT: 'view_content',
  EDIT_CONTENT: 'edit_content',
  DELETE_CONTENT: 'delete_content',
  
  // 系统管理权限
  SYSTEM_SETTINGS: 'system_settings',
  VIEW_ANALYTICS: 'view_analytics',
  MANAGE_PAYMENTS: 'manage_payments',
  
  // 高级功能权限
  ADVANCED_ANALYTICS: 'advanced_analytics',
  EXPORT_DATA: 'export_data',
  API_ACCESS: 'api_access'
} as const

// 角色权限映射
export const ROLE_PERMISSIONS = {
  user: [
    PERMISSIONS.VIEW_CONTENT
  ],
  moderator: [
    PERMISSIONS.VIEW_USERS,
    PERMISSIONS.MANAGE_CONTENT,
    PERMISSIONS.VIEW_CONTENT,
    PERMISSIONS.EDIT_CONTENT,
    PERMISSIONS.DELETE_CONTENT
  ],
  admin: [
    PERMISSIONS.MANAGE_USERS,
    PERMISSIONS.VIEW_USERS,
    PERMISSIONS.EDIT_USERS,
    PERMISSIONS.DELETE_USERS,
    PERMISSIONS.MANAGE_CONTENT,
    PERMISSIONS.VIEW_CONTENT,
    PERMISSIONS.EDIT_CONTENT,
    PERMISSIONS.DELETE_CONTENT,
    PERMISSIONS.VIEW_ANALYTICS,
    PERMISSIONS.MANAGE_PAYMENTS
  ],
  superadmin: Object.values(PERMISSIONS)
}

// 会员服务类
export class MembershipService {
  // 检查用户是否有权限使用某个功能
  static canUseFeature(user: any, feature: string): { canUse: boolean; remaining?: number; maxUsage?: number } {
    if (!user) {
      // 游客权限
      const guestLimit = FEATURE_LIMITS[feature as keyof typeof FEATURE_LIMITS]?.maxGuest || 0
      return { canUse: guestLimit > 0, remaining: guestLimit, maxUsage: guestLimit }
    }

    const membershipLevel = (user.membership?.level || 'free') as keyof typeof MEMBERSHIP_LEVELS
    const membershipData = MEMBERSHIP_LEVELS[membershipLevel]
    const maxUsage = membershipData?.maxDailyUsage[feature as keyof typeof MEMBERSHIP_LEVELS.free.maxDailyUsage] || 0
    
    // -1 表示无限制
    if (maxUsage === -1) {
      return { canUse: true, remaining: -1, maxUsage: -1 }
    }

    const today = new Date().toISOString().split('T')[0]
    const dailyUsage = user.usageStats?.dailyUsage?.[feature] || 0
    const remaining = Math.max(0, maxUsage - dailyUsage)

    return { 
      canUse: remaining > 0, 
      remaining, 
      maxUsage 
    }
  }

  // 增加使用次数
  static incrementUsage(userId: string, feature: string): void {
    // 这里应该调用API来更新数据库中的使用统计
    // 简化实现：在客户端更新本地数据
    const today = new Date().toISOString().split('T')[0]
    
    // 在实际应用中，这里应该调用API来更新数据库
    console.log(`用户 ${userId} 使用了功能 ${feature}，更新使用统计...`)
  }

  // 检查用户是否有某个权限
  static hasPermission(user: any, permission: string): boolean {
    if (!user) return false
    
    const userPermissions = user.permissions || []
    const rolePermissions = ROLE_PERMISSIONS[user.role as keyof typeof ROLE_PERMISSIONS] || []
    
    return userPermissions.includes(permission) || rolePermissions.includes(permission)
  }

  // 检查用户是否是管理员
  static isAdmin(user: any): boolean {
    return user && ['admin', 'superadmin', 'moderator'].includes(user.role)
  }

  // 获取会员升级建议
  static getUpgradeSuggestion(user: any): { suggestedLevel: string; reasons: string[] } {
    const currentLevel = user.membership?.level || 'free'
    
    if (currentLevel === 'vip') {
      return { suggestedLevel: 'vip', reasons: ['您已经是最高级别会员'] }
    }

    const usageStats = user.usageStats || {}
    const reasons: string[] = []
    
    // 检查各个功能的使用情况
    Object.entries(FEATURE_LIMITS).forEach(([feature, limits]) => {
      const dailyUsage = usageStats.dailyUsage?.[feature] || 0
      const currentMax = MEMBERSHIP_LEVELS[currentLevel as keyof typeof MEMBERSHIP_LEVELS].maxDailyUsage[feature as keyof typeof MEMBERSHIP_LEVELS.free.maxDailyUsage]
      
      if (currentMax > 0 && dailyUsage >= currentMax * 0.8) {
        reasons.push(`${limits.name} 使用接近上限`)
      }
    })

    // 根据使用情况推荐升级级别
    let suggestedLevel = 'free'
    
    if (reasons.length >= 3) {
      suggestedLevel = 'premium'
    } else if (reasons.length >= 1) {
      suggestedLevel = 'basic'
    }

    // 确保推荐的级别比当前级别高
    const levels = ['free', 'basic', 'premium', 'vip']
    const currentIndex = levels.indexOf(currentLevel)
    const suggestedIndex = levels.indexOf(suggestedLevel)
    
    if (suggestedIndex <= currentIndex) {
      suggestedLevel = levels[Math.min(currentIndex + 1, levels.length - 1)]
    }

    return { suggestedLevel, reasons }
  }

  // 获取会员价格信息
  static getPricingInfo(level: string) {
    return MEMBERSHIP_LEVELS[level as keyof typeof MEMBERSHIP_LEVELS]
  }

  // 获取所有会员级别信息
  static getAllLevels() {
    return Object.entries(MEMBERSHIP_LEVELS).map(([key, value]) => ({
      key,
      ...value
    }))
  }
}