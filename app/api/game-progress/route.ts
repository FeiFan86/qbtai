import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import GameProgress from '@/lib/models/GameProgress'

export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const gameType = searchParams.get('gameType')
    const action = searchParams.get('action')
    const limit = parseInt(searchParams.get('limit') || '10')

    if (action === 'getUserProgress' && userId) {
      const progress = await GameProgress.getUserProgress(userId)
      return NextResponse.json({
        success: true,
        data: progress
      })
    }

    if (action === 'getLeaderboard' && gameType) {
      const leaderboard = await GameProgress.getLeaderboard(gameType, limit)
      return NextResponse.json({
        success: true,
        data: {
          gameType,
          leaderboard
        }
      })
    }

    if (userId && gameType) {
      const progress = await GameProgress.findOne({ userId, gameType })
      return NextResponse.json({
        success: true,
        data: progress || null
      })
    }

    return NextResponse.json(
      { success: false, error: '缺少必需参数' },
      { status: 400 }
    )
  } catch (error) {
    console.error('获取游戏进度失败:', error)
    return NextResponse.json(
      { success: false, error: '获取进度失败' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    
    const body = await request.json()
    const { action, userId, gameType, progress, score, saveData, unlockedFeatures } = body

    if (!action || !userId || !gameType) {
      return NextResponse.json(
        { success: false, error: '缺少必需参数' },
        { status: 400 }
      )
    }

    if (action === 'updateProgress') {
      const updatedProgress = await GameProgress.findOneAndUpdate(
        { userId, gameType },
        {
          progress: progress || 0,
          score: score || 0,
          saveData: saveData || {},
          unlockedFeatures: unlockedFeatures || [],
          lastPlayed: new Date(),
          $inc: { playCount: 1 }
        },
        { upsert: true, new: true }
      )

      return NextResponse.json({
        success: true,
        message: '游戏进度更新成功',
        data: updatedProgress
      })
    }

    if (action === 'updateScore') {
      if (score === undefined) {
        return NextResponse.json(
          { success: false, error: '缺少分数参数' },
          { status: 400 }
        )
      }

      const updatedProgress = await GameProgress.updateScore(userId, gameType, score)
      
      return NextResponse.json({
        success: true,
        message: '游戏得分更新成功',
        data: updatedProgress
      })
    }

    return NextResponse.json(
      { success: false, error: '未知操作' },
      { status: 400 }
    )
  } catch (error) {
    console.error('更新游戏进度失败:', error)
    return NextResponse.json(
      { success: false, error: '更新进度失败' },
      { status: 500 }
    )
  }
}