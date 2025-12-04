import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dbConnect from '@/lib/db'
import User from '@/lib/models/User'

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    
    const { username, email, password } = await request.json()

    // 验证必需字段
    if (!username || !email || !password) {
      return NextResponse.json(
        { success: false, error: '用户名、邮箱和密码为必填项' },
        { status: 400 }
      )
    }

    // 验证用户名格式
    if (username.length < 3 || username.length > 30) {
      return NextResponse.json(
        { success: false, error: '用户名长度必须在3到30个字符之间' },
        { status: 400 }
      )
    }

    if (!/^[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(username)) {
      return NextResponse.json(
        { success: false, error: '用户名只能包含字母、数字、下划线和中文' },
        { status: 400 }
      )
    }

    // 验证邮箱格式
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: '请输入有效的邮箱地址' },
        { status: 400 }
      )
    }

    // 验证密码强度
    if (password.length < 8) {
      return NextResponse.json(
        { success: false, error: '密码长度至少为8位' },
        { status: 400 }
      )
    }

    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      return NextResponse.json(
        { success: false, error: '密码必须包含大小写字母和数字' },
        { status: 400 }
      )
    }

    // 检查用户名是否已存在
    const existingUserByUsername = await User.findByUsername(username)
    if (existingUserByUsername) {
      return NextResponse.json(
        { success: false, error: '用户名已存在' },
        { status: 400 }
      )
    }

    // 检查邮箱是否已存在
    const existingUserByEmail = await User.findByEmail(email)
    if (existingUserByEmail) {
      return NextResponse.json(
        { success: false, error: '邮箱已存在' },
        { status: 400 }
      )
    }

    // 密码加密
    const saltRounds = 12
    const passwordHash = await bcrypt.hash(password, saltRounds)

    // 创建用户
    const newUser = await User.create({
      username,
      email,
      passwordHash,
      avatar: '',
      bio: '',
      preferences: {
        theme: 'auto',
        notifications: {
          email: true,
          push: true
        }
      },
      stats: {
        totalGames: 0,
        totalScore: 0,
        totalPlayTime: 0,
        achievements: []
      }
    })

    // 生成短期访问令牌
    const token = jwt.sign(
      { 
        id: newUser._id,
        username: newUser.username,
        email: newUser.email 
      },
      process.env.JWT_SECRET || 'cupid-ai-jwt-secret',
      { expiresIn: '15m' } // 短期访问令牌，15分钟
    )

    // 生成长期刷新令牌
    const refreshToken = jwt.sign(
      { 
        id: newUser._id,
        type: 'refresh'
      },
      process.env.JWT_SECRET || 'cupid-ai-jwt-secret',
      { expiresIn: '7d' } // 长期刷新令牌，7天
    )

    // 返回用户信息和令牌
    const userResponse = {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      avatar: newUser.avatar,
      bio: newUser.bio,
      preferences: newUser.preferences,
      stats: newUser.stats,
      createdAt: newUser.createdAt
    }

    return NextResponse.json({
      success: true,
      message: '注册成功',
      data: {
        user: userResponse,
        token,
        refreshToken
      }
    })
  } catch (error) {
    console.error('用户注册失败:', error)
    return NextResponse.json(
      { success: false, error: '注册失败，请稍后重试' },
      { status: 500 }
    )
  }
}