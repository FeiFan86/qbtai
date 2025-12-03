import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/db-connection'
import EmotionPost from '@/lib/models/EmotionPost'

export async function POST(request: NextRequest, { params }: { params: { postId: string } }) {
  try {
    await connectDB()
    
    const { postId } = params
    const body = await request.json()
    const { userId, username, avatar, content, isAnonymous } = body
    
    const post = await EmotionPost.findById(postId)
    if (!post) {
      return NextResponse.json(
        { success: false, error: '帖子不存在' },
        { status: 404 }
      )
    }
    
    const newReply = {
      userId,
      username,
      avatar,
      content,
      isAnonymous: isAnonymous || false,
      likes: []
    }
    
    post.replies.push(newReply)
    post.replyCount = post.replies.length
    
    const updatedPost = await post.save()
    
    return NextResponse.json({
      success: true,
      data: newReply
    })
  } catch (error) {
    console.error('添加回复失败:', error)
    return NextResponse.json(
      { success: false, error: '添加回复失败' },
      { status: 500 }
    )
  }
}