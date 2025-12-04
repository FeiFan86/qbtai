import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import GameProgress from '@/lib/models/GameProgress'
// 临时注释掉GameSession导入，因为模型可能不存在
// // 临时注释掉GameSession导入，因为模型可能不存在
// // 临时注释掉GameSession导入，因为模型可能不存在
// import GameSession from '@/lib/models/GameSession'

export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    // 验证必需字段
    if (!userId) {
      return NextResponse.json(
        { success: false, error: '用户ID为必填项' },
        { status: 400 }
      )
    }

    // 获取游戏进度统计
    const progressStats = await GameProgress.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: null,
          totalGames: { $sum: 1 },
          averageProgress: { $avg: '$progress' },
          totalPlayTime: { $sum: '$playTime' || 0 },
          lastPlayed: { $max: '$lastPlayed' }
        }
      }
    ])

    // 获取游戏会话统计（暂时使用模拟数据）
    const sessionStats = [{
      totalSessions: 0,
      totalDuration: 0,
      averageScore: 0,
      averageCompletion: 0
    }]

    // 获取最近游戏记录
    const recentGames = await GameProgress.find({ userId })
      .sort({ lastPlayed: -1 })
      .limit(5)

    // 获取游戏成就统计
    const achievementStats = await GameProgress.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: '$gameId',
          progress: { $avg: '$progress' },
          playCount: { $sum: 1 },
          lastPlayed: { $max: '$lastPlayed' }
        }
      }
    ])

    const statistics = {
      progressStats: progressStats[0] || {
        totalGames: 0,
        averageProgress: 0,
        totalPlayTime: 0,
        lastPlayed: null
      },
      sessionStats: sessionStats[0] || {
        totalSessions: 0,
        totalDuration: 0,
        averageScore: 0,
        averageCompletion: 0
      },
      recentGames,
      achievementStats
    }

    return NextResponse.json({
      success: true,
      data: statistics
    })
  } catch (error) {
    console.error('获取游戏统计失败:', error)
    return NextResponse.json(
      { success: false, error: '获取统计失败，请稍后重试' },
      { status: 500 }
    )
  }
}