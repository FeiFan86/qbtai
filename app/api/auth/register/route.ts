import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
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

    // 返回用户信息（不包含密码）
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
      data: userResponse
    })
  } catch (error) {
    console.error('用户注册失败:', error)
    return NextResponse.json(
      { success: false, error: '注册失败，请稍后重试' },
      { status: 500 }
    )
  }
}