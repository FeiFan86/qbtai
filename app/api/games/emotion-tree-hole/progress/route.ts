import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/db-connection'
import GameProgress from '@/lib/models/GameProgress'

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const body = await request.json()
    const { userId, progress, score } = body
    
    const gameProgress = await GameProgress.findOneAndUpdate(
      { userId, gameType: 'emotion-tree-hole' },
      {
        userId,
        gameType: 'emotion-tree-hole',
        progress: progress || 0,
        score: score || 0,
        lastPlayed: new Date()
      },
      { upsert: true, new: true }
    )
    
    return NextResponse.json({
      success: true,
      data: gameProgress
    })
  } catch (error) {
    console.error('保存游戏进度失败:', error)
    return NextResponse.json(
      { success: false, error: '保存进度失败' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB()
    
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    
    if (!userId) {
      return NextResponse.json(
        { success: false, error: '用户ID不能为空' },
        { status: 400 }
      )
    }
    
    const progress = await GameProgress.findOne({ 
      userId, 
      gameType: 'emotion-tree-hole' 
    })
    
    return NextResponse.json({
      success: true,
      data: progress
    })
  } catch (error) {
    console.error('获取游戏进度失败:', error)
    return NextResponse.json(
      { success: false, error: '获取进度失败' },
      { status: 500 }
    )
  }
}