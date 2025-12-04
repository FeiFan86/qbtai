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
    let decoded
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || 'cupid-ai-jwt-secret') as any
    } catch (jwtError) {
      // 如果是JWT验证错误，返回特定的错误信息
      if (jwtError instanceof jwt.JsonWebTokenError) {
        return NextResponse.json(
          { success: false, error: '无效的令牌' },
          { status: 401 }
        )
      }

      if (jwtError instanceof jwt.TokenExpiredError) {
        return NextResponse.json(
          { success: false, error: '令牌已过期' },
          { status: 401 }
        )
      }

      throw jwtError
    }

    // 连接数据库并验证用户
    await dbConnect()
    const user = await User.findById(decoded.id)

    if (!user || !user.isActive) {
      return NextResponse.json(
        { success: false, error: '用户不存在或已被禁用' },
        { status: 401 }
      )
    }

    // 如果令牌包含密码更改时间，验证密码是否在令牌签发后被更改
    if (decoded.passwordChangedAt) {
      const passwordChangedAt = new Date(user.passwordChangedAt).getTime() / 1000
      if (passwordChangedAt > decoded.iat) {
        return NextResponse.json(
          { success: false, error: '用户密码已更改，请重新登录' },
          { status: 401 }
        )
      }
    }

    // 返回用户信息
    const userData = {
      id: user._id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      bio: user.bio,
      preferences: user.preferences,
      stats: user.stats,
      emailVerified: user.emailVerified
    }

    return NextResponse.json({
      success: true,
      data: {
        valid: true,
        user: userData
      }
    })
  } catch (error) {
    console.error('令牌验证失败:', error)
    
    // 类型安全检查
    if (error && typeof error === 'object' && 'name' in error && 
        (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError')) {
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