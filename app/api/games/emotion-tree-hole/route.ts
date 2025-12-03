import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/db-connection'
import EmotionPost from '@/lib/models/EmotionPost'
import GameProgress from '@/lib/models/GameProgress'

export async function GET(request: NextRequest) {
  try {
    await connectDB()
    
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '20')
    
    const posts = await EmotionPost.findByGameType('emotion-tree-hole', limit)
    
    return NextResponse.json({
      success: true,
      data: posts
    })
  } catch (error) {
    console.error('获取情感树洞帖子失败:', error)
    return NextResponse.json(
      { success: false, error: '获取帖子失败' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const body = await request.json()
    const { userId, username, avatar, title, content, category, tags, isAnonymous, imageUrl } = body
    
    const newPost = new EmotionPost({
      gameType: 'emotion-tree-hole',
      userId,
      username,
      avatar,
      title,
      content,
      category: category || 'other',
      tags: tags || [],
      isAnonymous: isAnonymous || false,
      imageUrl: imageUrl || ''
    })
    
    const savedPost = await newPost.save()
    
    // 更新用户游戏进度
    await GameProgress.updateScore(userId, 'emotion-tree-hole', 10)
    
    return NextResponse.json({
      success: true,
      data: savedPost
    })
  } catch (error) {
    console.error('创建情感树洞帖子失败:', error)
    return NextResponse.json(
      { success: false, error: '创建帖子失败' },
      { status: 500 }
    )
  }
}