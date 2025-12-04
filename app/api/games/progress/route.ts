import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import GameProgress from '@/lib/models/GameProgress'

export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const gameId = searchParams.get('gameId')

    // 验证必需字段
    if (!userId) {
      return NextResponse.json(
        { success: false, error: '用户ID为必填项' },
        { status: 400 }
      )
    }

    // 构建查询条件
    const query: any = { userId }
    if (gameId) {
      query.gameId = gameId
    }

    // 查询游戏进度
    const progressRecords = await GameProgress.find(query).sort({ lastPlayed: -1 })

    return NextResponse.json({
      success: true,
      data: progressRecords
    })
  } catch (error) {
    console.error('获取游戏进度失败:', error)
    return NextResponse.json(
      { success: false, error: '获取进度失败，请稍后重试' },
      { status: 500 }
    )
  }
}