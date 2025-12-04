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

    // 查找用户 - 支持用户名或邮箱登录
    let user
    if (username.includes('@')) {
      user = await User.findByEmail(username)
    } else {
      user = await User.findByUsername(username)
    }

    if (!user) {
      // 为了安全，即使用户不存在也返回相同的错误信息
      return NextResponse.json(
        { success: false, error: '用户名或密码错误' },
        { status: 401 }
      )
    }

    // 检查账户是否被锁定
    if (user.isLocked) {
      const lockTimeRemaining = Math.ceil((user.lockUntil!.getTime() - Date.now()) / (60 * 60 * 1000))
      return NextResponse.json(
        { 
          success: false, 
          error: `账户已被锁定，请${lockTimeRemaining}小时后再试` 
        },
        { status: 423 }
      )
    }

    // 验证密码
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash)
    
    if (!isPasswordValid) {
      // 增加登录尝试次数
      await user.incLoginAttempts()
      
      // 为了安全，返回通用错误信息
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

    // 重置登录尝试次数
    if (user.loginAttempts > 0) {
      await user.resetLoginAttempts()
    }

    // 更新最后登录时间和密码更改时间（用于令牌验证）
    await User.findByIdAndUpdate(user._id, { 
      lastLogin: new Date()
    })

    // 生成短期访问令牌
    const token = jwt.sign(
      { 
        id: user._id,
        username: user.username,
        email: user.email,
        passwordChangedAt: user.passwordChangedAt
      },
      process.env.JWT_SECRET || 'cupid-ai-jwt-secret',
      { expiresIn: '15m' } // 短期访问令牌，15分钟
    )

    // 生成长期刷新令牌
    const refreshToken = jwt.sign(
      { 
        id: user._id,
        type: 'refresh'
      },
      process.env.JWT_SECRET || 'cupid-ai-jwt-secret',
      { expiresIn: '7d' } // 长期刷新令牌，7天
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
      lastLogin: user.lastLogin,
      emailVerified: user.emailVerified
    }

    return NextResponse.json({
      success: true,
      message: '登录成功',
      data: {
        user: userResponse,
        token,
        refreshToken
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