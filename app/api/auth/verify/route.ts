import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import dbConnect from '@/lib/db'
import User from '@/lib/models/User'

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json()

    if (!token) {
      return NextResponse.json(
        { success: false, error: '缺少认证令牌' },
        { status: 400 }
      )
    }

    // 验证JWT令牌
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'cupid-ai-jwt-secret') as any

    // 连接数据库并验证用户
    await dbConnect()
    const user = await User.findById(decoded.id)

    if (!user || !user.isActive) {
      return NextResponse.json(
        { success: false, error: '用户不存在或已被禁用' },
        { status: 401 }
      )
    }

    // 返回用户信息
    const userData = {
      id: user._id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      bio: user.bio,
      preferences: user.preferences,
      stats: user.stats
    }

    return NextResponse.json({
      success: true,
      data: userData
    })
  } catch (error) {
    console.error('令牌验证失败:', error)
    
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return NextResponse.json(
        { success: false, error: '认证令牌无效或已过期' },
        { status: 401 }
      )
    }

    return NextResponse.json(
      { success: false, error: '服务器内部错误' },
      { status: 500 }
    )
  }
}