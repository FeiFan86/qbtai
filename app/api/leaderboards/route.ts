import { NextRequest, NextResponse } from 'next/server'
import { LeaderboardEntry } from '@/lib/types'

// 模拟用户数据和游戏统计存储
let userData: { [userId: string]: any } = {
  user_1: {
    username: 'testuser',
    avatar: '',
    achievementsCount: 0,
    lastActivity: '2024-01-01T00:00:00.000Z',
    totalPlayTime: 0,
    achievements: [],
    lastPlayed: '2024-01-01T00:00:00.000Z'
  }
}

// 排行榜类型
const leaderboardTypes = ['all_time', 'monthly', 'weekly'] as const

// 模拟排行榜数据存储
let leaderboards: { [key: string]: any } = {
  all_time: {
    id: 'all_time',
    name: '总排行榜',
    type: 'all_time',
    entries: [],
    updatedAt: new Date().toISOString()
  },
  monthly: {
    id: 'monthly',
    name: '本月排行榜',
    type: 'monthly',
    entries: [],
    updatedAt: new Date().toISOString()
  },
  weekly: {
    id: 'weekly',
    name: '本周排行榜',
    type: 'weekly',
    entries: [],
    updatedAt: new Date().toISOString()
  }
}

// 计算用户排名分数
function calculateUserScore(user: any): number {
  return (
    (user.achievementsCount || 0) * 10 +
    (user.totalPlayTime || 0) * 0.1 +
    (user.chatCount || 0) * 0.5
  )
}

// 更新排行榜
export async function updateLeaderboard(leaderboardType: string) {
  const users = Object.values(userData)
  const scoredUsers = users.map(user => ({
    ...user,
    score: calculateUserScore(user)
  }))
  
  // 按分数排序
  scoredUsers.sort((a, b) => b.score - a.score)
  
  // 添加排名信息
  const entries: LeaderboardEntry[] = scoredUsers.map((user, index) => ({
    userId: user.id,
    username: user.username,
    avatar: '',
    rank: index + 1,
    achievementsCount: user.achievementsCount || 0,
    lastActivity: user.lastActivity || new Date().toISOString()
  }))
  
  leaderboards[leaderboardType] = {
    ...leaderboards[leaderboardType],
    entries,
    updatedAt: new Date().toISOString()
  }
}

/**
 * 获取排行榜
 * @param type - 排行榜类型（weekly, monthly, all_time）
 * @param limit - 返回条目数量限制（可选，默认20）
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') || 'all_time'
    const limit = parseInt(searchParams.get('limit') || '20')
    
    if (!leaderboardTypes.includes(type as any)) {
      return NextResponse.json({
        success: false,
        error: '无效的排行榜类型'
      }, { status: 400 })
    }
    
    // 如果排行榜为空，先更新
    if (!leaderboards[type].entries || leaderboards[type].entries.length === 0) {
      await updateLeaderboard(type)
    }
    
    const leaderboard = leaderboards[type]
    const limitedEntries = leaderboard.entries.slice(0, limit)
    
    return NextResponse.json({
      success: true,
      data: {
        ...leaderboard,
        entries: limitedEntries
      }
    })
    
  } catch (error) {
    console.error('获取排行榜失败:', error)
    return NextResponse.json({
      success: false,
      error: '服务器内部错误'
    }, { status: 500 })
  }
}

/**
 * 更新用户活动并刷新排行榜
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, activityType, data } = body
    
    if (!userId || !activityType) {
      return NextResponse.json({
        success: false,
        error: '用户ID和活动类型不能为空'
      }, { status: 400 })
    }
    
    // 更新用户数据
    if (!userData[userId]) {
      userData[userId] = {
        id: userId,
        username: `user_${userId}`,
        achievementsCount: 0,
        lastActivity: new Date().toISOString(),
        totalPlayTime: 0
      }
    }
    
    const user = userData[userId]
    user.lastActivity = new Date().toISOString()
    
    // 根据活动类型更新统计数据
    switch (activityType) {
      case 'game_completed':
        user.totalPlayTime = (user.totalPlayTime || 0) + (data.duration || 0)
        break
      case 'achievement_unlocked':
        user.achievementsCount = (user.achievementsCount || 0) + 1
        break
      case 'chat_message':
        user.chatCount = (user.chatCount || 0) + 1
        break
    }
    
    // 更新所有排行榜
    for (const type of leaderboardTypes) {
      await updateLeaderboard(type)
    }
    
    return NextResponse.json({
      success: true,
      data: {
        message: '活动已记录',
        user: {
          achievementsCount: user.achievementsCount,
          totalPlayTime: user.totalPlayTime,
          lastActivity: user.lastActivity
        }
      }
    })
    
  } catch (error) {
    console.error('更新排行榜失败:', error)
    return NextResponse.json({
      success: false,
      error: '服务器内部错误'
    }, { status: 500 })
  }
}