import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dbConnect from '@/lib/db'
import User from '@/lib/models/User'

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    
    const { username, password } = await request.json()

    // 验证必需字段
    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: '用户名和密码为必填项' },
        { status: 400 }
      )
    }

    // 查找用户
    const user = await User.findByUsername(username)
    if (!user) {
      return NextResponse.json(
        { success: false, error: '用户名或密码错误' },
        { status: 401 }
      )
    }

    // 验证密码
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash)
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, error: '用户名或密码错误' },
        { status: 401 }
      )
    }

    // 检查用户是否激活
    if (!user.isActive) {
      return NextResponse.json(
        { success: false, error: '账户已被禁用' },
        { status: 403 }
      )
    }

    // 更新最后登录时间
    await User.findByIdAndUpdate(user._id, { lastLogin: new Date() })

    // 生成JWT令牌
    const token = jwt.sign(
      { 
        id: user._id,
        username: user.username,
        email: user.email 
      },
      process.env.JWT_SECRET || 'cupid-ai-jwt-secret',
      { expiresIn: '7d' }
    )

    // 返回用户信息和令牌
    const userResponse = {
      id: user._id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      bio: user.bio,
      preferences: user.preferences,
      stats: user.stats,
      lastLogin: user.lastLogin
    }

    return NextResponse.json({
      success: true,
      message: '登录成功',
      data: {
        user: userResponse,
        token
      }
    })
  } catch (error) {
    console.error('用户登录失败:', error)
    return NextResponse.json(
      { success: false, error: '登录失败，请稍后重试' },
      { status: 500 }
    )
  }
}