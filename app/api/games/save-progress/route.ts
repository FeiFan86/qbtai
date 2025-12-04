import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import GameProgress from '@/lib/models/GameProgress'

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    
    const { userId, gameId, progress, currentLevel, unlockedFeatures, saveData } = await request.json()

    // 验证必需字段
    if (!userId || !gameId || progress === undefined) {
      return NextResponse.json(
        { success: false, error: '用户ID、游戏ID和进度为必填项' },
        { status: 400 }
      )
    }

    // 验证进度范围
    if (progress < 0 || progress > 100) {
      return NextResponse.json(
        { success: false, error: '进度必须在0-100之间' },
        { status: 400 }
      )
    }

    // 查找或创建游戏进度记录
    const existingProgress = await GameProgress.findOne({ userId, gameId })
    
    if (existingProgress) {
      // 更新现有进度
      existingProgress.progress = progress
      existingProgress.currentLevel = currentLevel || existingProgress.currentLevel
      existingProgress.unlockedFeatures = unlockedFeatures || existingProgress.unlockedFeatures
      existingProgress.saveData = saveData || existingProgress.saveData
      existingProgress.lastPlayed = new Date()
      
      await existingProgress.save()
    } else {
      // 创建新进度记录
      await GameProgress.create({
        userId,
        gameId,
        progress,
        currentLevel: currentLevel || 1,
        unlockedFeatures: unlockedFeatures || [],
        saveData: saveData || {},
        lastPlayed: new Date()
      })
    }

    return NextResponse.json({
      success: true,
      message: '游戏进度保存成功'
    })
  } catch (error) {
    console.error('保存游戏进度失败:', error)
    return NextResponse.json(
      { success: false, error: '保存进度失败，请稍后重试' },
      { status: 500 }
    )
  }
}