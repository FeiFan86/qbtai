import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import GameProgress from '@/lib/models/GameProgress'

// 服务器端认证验证函数
async function verifyAuthToken(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return { success: false, error: '缺少认证令牌' }
    }

    const token = authHeader.slice(7) // 移除 'Bearer ' 前缀
    
    // 调用认证API验证token
    const response = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/auth/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    })

    const result = await response.json()
    
    if (!result.success) {
      return { success: false, error: result.error || '认证失败' }
    }

    return { 
      success: true, 
      data: result.data 
    }
  } catch (error) {
    console.error('认证验证失败:', error)
    return { success: false, error: '服务器内部错误' }
  }
}

// 游戏进度接口
interface GameProgress {
  gameId: string
  gameType: string
  userId: string
  progress: any
  score: number
  timeSpent: number
  completedAt: string
  achievements: string[]
}

// 游戏类型定义
const GAME_TYPES = {
  MEMORY_PUZZLE: 'memory-puzzle',
  TRUTH_OR_DARE: 'truth-or-dare',
  COLLABORATIVE_DOODLE: 'collaborative-doodle',
  RELATIONSHIP_CHESS: 'relationship-chess',
  COUPLE_BLIND_BOX: 'couple-blind-box'
}

export async function POST(request: NextRequest) {
  try {
    // 验证用户身份
    const authResult = await verifyAuthToken(request)
    if (!authResult.success) {
      return NextResponse.json(
        { success: false, error: '未授权访问' },
        { status: 401 }
      )
    }

    const { action, gameId, gameType, progress, score, timeSpent, achievements } = await request.json()

    // 检查必需字段
    if (!action || !gameId || !gameType) {
      return NextResponse.json(
        { success: false, error: '缺少必需参数' },
        { status: 400 }
      )
    }

    const userId = authResult.data.id

    switch (action) {
      case 'saveProgress':
        // 保存游戏进度
        const gameProgress: GameProgress = {
          gameId,
          gameType,
          userId,
          progress,
          score: score || 0,
          timeSpent: timeSpent || 0,
          completedAt: new Date().toISOString(),
          achievements: achievements || []
        }

        // 保存到数据库
        await dbConnect()
        await GameProgress.findOneAndUpdate(
          { userId, gameType, gameId },
          gameProgress,
          { upsert: true, new: true }
        )
        
        return NextResponse.json({
          success: true,
          message: '游戏进度已保存',
          data: gameProgress
        })

      case 'getProgress':
        // 获取游戏进度
        console.log('获取游戏进度:', { gameId, gameType, userId })
        
        // 从数据库查询
        await dbConnect()
        const progress = await GameProgress.findOne({ userId, gameId, gameType })
        
        return NextResponse.json({
          success: true,
          data: progress || {
            gameId,
            gameType,
            userId,
            progress: {},
            score: 0,
            timeSpent: 0,
            completedAt: new Date().toISOString(),
            achievements: []
          }
        })

      case 'saveScore':
        // 保存游戏得分
        if (score === undefined) {
          return NextResponse.json(
            { success: false, error: '缺少分数参数' },
            { status: 400 }
          )
        }

        const scoreData = {
          gameId,
          gameType,
          userId,
          score,
          timeSpent: timeSpent || 0,
          completedAt: new Date().toISOString()
        }

        // 保存游戏得分到数据库
        await dbConnect()
        const updatedProgress = await GameProgress.updateScore(userId, gameType, score)
        
        return NextResponse.json({
          success: true,
          message: '游戏得分已保存',
          data: updatedProgress
        })

      default:
        return NextResponse.json(
          { success: false, error: '未知操作' },
          { status: 400 }
        )
    }
  } catch (error) {
    console.error('游戏API错误:', error)
    return NextResponse.json(
      { success: false, error: '服务器内部错误' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // 验证用户身份
    const authResult = await verifyAuthToken(request)
    if (!authResult.success) {
      return NextResponse.json(
        { success: false, error: '未授权访问' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action')
    const gameType = searchParams.get('gameType') as keyof typeof GAME_TYPES

    const userId = authResult.data.id

    if (action === 'getUserStats') {
      // 获取用户游戏统计
      console.log('获取用户游戏统计:', userId)
      
        // 从数据库查询用户统计
        await dbConnect()
        const progressList = await GameProgress.find({ userId })
        
        const stats = {
          totalGames: progressList.length,
          totalScore: progressList.reduce((sum, p) => sum + (p.score || 0), 0),
          favoriteGame: progressList.length > 0 
            ? progressList.reduce((max, p) => p.playCount > max.playCount ? p : max, progressList[0]).gameType
            : GAME_TYPES.MEMORY_PUZZLE,
          achievements: [], // 可以从用户模型获取
          playTime: progressList.reduce((acc, p) => {
            acc[p.gameType] = (acc[p.gameType] || 0) + (p.timeSpent || 0)
            return acc
          }, {} as Record<string, number>)
        }

        return NextResponse.json({
          success: true,
          data: stats
        })
    }

    if (action === 'getLeaderboard' && gameType) {
      // 获取游戏排行榜
      console.log('获取游戏排行榜:', gameType)
      
        // 从数据库查询排行榜
        await dbConnect()
        const leaderboard = await GameProgress.getLeaderboard(gameType, 10)
        
        return NextResponse.json({
          success: true,
          data: {
            gameType,
            leaderboard
          }
        })
    }

    return NextResponse.json(
      { success: false, error: '未知请求' },
      { status: 400 }
    )
  } catch (error) {
    console.error('游戏API错误:', error)
    return NextResponse.json(
      { success: false, error: '服务器内部错误' },
      { status: 500 }
    )
  }
}