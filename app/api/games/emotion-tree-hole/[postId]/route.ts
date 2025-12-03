import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/db-connection'
import EmotionPost from '@/lib/models/EmotionPost'

export async function POST(request: NextRequest, { params }: { params: { postId: string } }) {
  try {
    await connectDB()
    
    const { postId } = params
    const body = await request.json()
    
    const post = await EmotionPost.findById(postId)
    if (!post) {
      return NextResponse.json(
        { success: false, error: '帖子不存在' },
        { status: 404 }
      )
    }
    
    // 点赞帖子
    post.likes.push(body.userId)
    const updatedPost = await post.save()
    
    return NextResponse.json({
      success: true,
      data: updatedPost
    })
  } catch (error) {
    console.error('点赞情感树洞帖子失败:', error)
    return NextResponse.json(
      { success: false, error: '点赞失败' },
      { status: 500 }
    )
  }
}