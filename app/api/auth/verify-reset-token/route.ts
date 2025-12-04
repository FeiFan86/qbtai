import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import User from '@/lib/models/User'

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    
    const { token } = await request.json()

    // 验证必需字段
    if (!token) {
      return NextResponse.json(
        { success: false, error: '重置令牌为必填项' },
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

    return NextResponse.json({
      success: true,
      message: '重置令牌有效',
      data: {
        userId: user._id
      }
    })
  } catch (error) {
    console.error('验证重置令牌失败:', error)
    return NextResponse.json(
      { success: false, error: '验证重置令牌失败' },
      { status: 500 }
    )
  }
}