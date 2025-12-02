import { NextRequest, NextResponse } from 'next/server'

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

        // 这里应该保存到数据库，现在返回成功响应
        console.log('保存游戏进度:', gameProgress)
        
        return NextResponse.json({
          success: true,
          message: '游戏进度已保存',
          data: gameProgress
        })

      case 'getProgress':
        // 获取游戏进度
        console.log('获取游戏进度:', { gameId, gameType, userId })
        
        // 这里应该从数据库查询，现在返回模拟数据
        const mockProgress = {
          gameId,
          gameType,
          userId,
          progress: {},
          score: 0,
          timeSpent: 0,
          completedAt: new Date().toISOString(),
          achievements: []
        }

        return NextResponse.json({
          success: true,
          data: mockProgress
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

        console.log('保存游戏得分:', scoreData)
        
        return NextResponse.json({
          success: true,
          message: '游戏得分已保存',
          data: scoreData
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
      
      // 这里应该从数据库查询，现在返回模拟数据
      const mockStats = {
        totalGames: 15,
        totalScore: 1250,
        favoriteGame: GAME_TYPES.MEMORY_PUZZLE,
        achievements: [
          { id: 'first_win', unlockedAt: new Date().toISOString() },
          { id: 'puzzle_master', unlockedAt: new Date().toISOString() }
        ],
        playTime: {
          [GAME_TYPES.MEMORY_PUZZLE]: 1200,
          [GAME_TYPES.TRUTH_OR_DARE]: 800,
          [GAME_TYPES.COLLABORATIVE_DOODLE]: 600
        }
      }

      return NextResponse.json({
        success: true,
        data: mockStats
      })
    }

    if (action === 'getLeaderboard' && gameType) {
      // 获取游戏排行榜
      console.log('获取游戏排行榜:', gameType)
      
      // 这里应该从数据库查询，现在返回模拟数据
      const mockLeaderboard = [
        { userId: 'user1', username: '玩家1', score: 1500, rank: 1 },
        { userId: 'user2', username: '玩家2', score: 1200, rank: 2 },
        { userId: 'user3', username: '玩家3', score: 900, rank: 3 },
        { userId: 'user4', username: '玩家4', score: 750, rank: 4 },
        { userId: 'user5', username: '玩家5', score: 600, rank: 5 }
      ]

      return NextResponse.json({
        success: true,
        data: {
          gameType,
          leaderboard: mockLeaderboard
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