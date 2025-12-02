import { NextRequest, NextResponse } from 'next/server'
import { Achievement, UserAchievement } from '@/lib/types'

// 成就定义
const achievements: Achievement[] = [
  {
    id: 'first_login',
    name: '初次见面',
    description: '首次登录应用',
    icon: '🌟',
    points: 10,
    category: 'basic',
    requirements: {
      loginCount: 1
    }
  },
  {
    id: 'chat_expert',
    name: '聊天达人',
    description: '完成100次对话',
    icon: '💬',
    points: 50,
    category: 'social',
    requirements: {
      chatCount: 100
    }
  },
  {
    id: 'game_master',
    name: '游戏大师',
    description: '完成所有游戏挑战',
    icon: '🎮',
    points: 100,
    category: 'gaming',
    requirements: {
      gamesCompleted: 5
    }
  },
  {
    id: 'streak_7',
    name: '七日连登',
    description: '连续登录7天',
    icon: '🔥',
    points: 30,
    category: 'daily',
    requirements: {
      loginStreak: 7
    }
  },
  {
    id: 'social_butterfly',
    name: '社交达人',
    description: '添加5个好友',
    icon: '🦋',
    points: 40,
    category: 'social',
    requirements: {
      friendsCount: 5
    }
  }
]

// 模拟用户成就数据
let userAchievements: { [userId: string]: UserAchievement[] } = {}

// 获取用户成就列表
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    
    if (!userId) {
      return NextResponse.json({
        success: false,
        error: '用户ID不能为空'
      }, { status: 400 })
    }
    
    const userAchievementList = userAchievements[userId] || []
    
    // 返回所有成就，标记已解锁的成就
    const achievementList = achievements.map(achievement => {
      const unlocked = userAchievementList.find(ua => ua.achievementId === achievement.id)
      return {
        ...achievement,
        unlocked: !!unlocked,
        unlockedAt: unlocked?.unlockedAt,
        progress: unlocked?.progress || 0
      }
    })
    
    return NextResponse.json({
      success: true,
      data: {
        achievements: achievementList,
        unlockedCount: userAchievementList.length,
        totalPoints: userAchievementList.reduce((sum, ua) => {
          const achievement = achievements.find(a => a.id === ua.achievementId)
          return sum + (achievement?.points || 0)
        }, 0)
      }
    })
    
  } catch (error) {
    console.error('获取成就列表失败:', error)
    return NextResponse.json({
      success: false,
      error: '服务器内部错误'
    }, { status: 500 })
  }
}

// 解锁成就
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, achievementId } = body
    
    if (!userId || !achievementId) {
      return NextResponse.json({
        success: false,
        error: '用户ID和成就ID不能为空'
      }, { status: 400 })
    }
    
    const achievement = achievements.find(a => a.id === achievementId)
    if (!achievement) {
      return NextResponse.json({
        success: false,
        error: '成就不存在'
      }, { status: 404 })
    }
    
    // 初始化用户成就数组
    if (!userAchievements[userId]) {
      userAchievements[userId] = []
    }
    
    // 检查是否已解锁
    const existingAchievement = userAchievements[userId].find(
      ua => ua.achievementId === achievementId
    )
    
    if (existingAchievement) {
      return NextResponse.json({
        success: false,
        error: '成就已解锁'
      }, { status: 409 })
    }
    
    // 解锁成就
    const userAchievement: UserAchievement = {
      achievementId,
      unlockedAt: new Date().toISOString(),
      progress: 100
    }
    
    userAchievements[userId].push(userAchievement)
    
    return NextResponse.json({
      success: true,
      data: {
        achievement: {
          ...achievement,
          unlocked: true,
          unlockedAt: userAchievement.unlockedAt
        }
      }
    })
    
  } catch (error) {
    console.error('解锁成就失败:', error)
    return NextResponse.json({
      success: false,
      error: '服务器内部错误'
    }, { status: 500 })
  }
}