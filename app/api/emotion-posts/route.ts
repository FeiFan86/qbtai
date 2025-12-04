import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import EmotionPost from '@/lib/models/EmotionPost'

export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    
    const { searchParams } = new URL(request.url)
    const gameType = searchParams.get('gameType')
    const category = searchParams.get('category')
    const limit = parseInt(searchParams.get('limit') || '20')
    const featured = searchParams.get('featured') === 'true'

    let posts
    
    if (featured) {
      posts = await EmotionPost.findFeatured(gameType || 'emotion-tree-hole')
    } else if (category) {
      posts = await EmotionPost.findByCategory(gameType || 'emotion-tree-hole', category)
    } else {
      posts = await EmotionPost.findByGameType(gameType || 'emotion-tree-hole', limit)
    }

    return NextResponse.json({
      success: true,
      data: posts
    })
  } catch (error) {
    console.error('获取情感帖子失败:', error)
    return NextResponse.json(
      { success: false, error: '获取帖子失败' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    
    const body = await request.json()
    const { 
      gameType, 
      userId, 
      username, 
      avatar, 
      title, 
      content, 
      category, 
      tags = [], 
      isAnonymous = false, 
      imageUrl = '' 
    } = body

    // 验证必需字段
    if (!gameType || !userId || !username || !title || !content || !category) {
      return NextResponse.json(
        { success: false, error: '缺少必需字段' },
        { status: 400 }
      )
    }

    const newPost = await EmotionPost.create({
      gameType,
      userId,
      username,
      avatar,
      title,
      content,
      category,
      tags,
      isAnonymous,
      imageUrl,
      likes: [],
      replies: [],
      replyCount: 0,
      isFeatured: false
    })

    return NextResponse.json({
      success: true,
      message: '帖子创建成功',
      data: newPost
    })
  } catch (error) {
    console.error('创建情感帖子失败:', error)
    return NextResponse.json(
      { success: false, error: '创建帖子失败' },
      { status: 500 }
    )
  }
}