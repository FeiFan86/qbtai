import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import dbConnect from '@/lib/db'
import User from '@/lib/models/User'

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    
    const { token, password } = await request.json()

    // 验证必需字段
    if (!token || !password) {
      return NextResponse.json(
        { success: false, error: '重置令牌和新密码为必填项' },
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

    // 查找具有此重置令牌的用户
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() } // 确保令牌未过期
    })

    if (!user) {
      return NextResponse.json(
        { success: false, error: '重置令牌无效或已过期' },
        { status: 400 }
      )
    }

    // 加密新密码
    const saltRounds = 12
    const passwordHash = await bcrypt.hash(password, saltRounds)

    // 更新用户密码并清除重置令牌
    await User.findByIdAndUpdate(user._id, {
      passwordHash,
      $unset: {
        resetToken: 1,
        resetTokenExpiry: 1
      }
    })

    return NextResponse.json({
      success: true,
      message: '密码重置成功'
    })
  } catch (error) {
    console.error('重置密码失败:', error)
    return NextResponse.json(
      { success: false, error: '重置密码失败，请稍后重试' },
      { status: 500 }
    )
  }
}