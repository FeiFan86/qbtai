import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import dbConnect from '@/lib/db'
import User from '@/lib/models/User'

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    
    const { refreshToken } = await request.json()

    // 验证必需字段
    if (!refreshToken) {
      return NextResponse.json(
        { success: false, error: '刷新令牌为必填项' },
        { status: 400 }
      )
    }

    // 验证刷新令牌
    try {
      const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET || 'cupid-ai-jwt-secret') as any
      
      // 检查用户是否存在且处于激活状态
      const user = await User.findById(decoded.id)
      if (!user || !user.isActive) {
        return NextResponse.json(
          { success: false, error: '用户不存在或已被禁用' },
          { status: 401 }
        )
      }

      // 生成新的访问令牌
      const token = jwt.sign(
        { 
          id: user._id,
          username: user.username,
          email: user.email 
        },
        process.env.JWT_SECRET || 'cupid-ai-jwt-secret',
        { expiresIn: '15m' } // 短期访问令牌
      )

      // 生成新的刷新令牌
      const newRefreshToken = jwt.sign(
        { 
          id: user._id,
          type: 'refresh'
        },
        process.env.JWT_SECRET || 'cupid-ai-jwt-secret',
        { expiresIn: '7d' } // 长期刷新令牌
      )

      return NextResponse.json({
        success: true,
        message: '令牌刷新成功',
        data: {
          token,
          refreshToken: newRefreshToken
        }
      })
    } catch (jwtError) {
      return NextResponse.json(
        { success: false, error: '无效的刷新令牌' },
        { status: 401 }
      )
    }
  } catch (error) {
    console.error('刷新令牌失败:', error)
    return NextResponse.json(
      { success: false, error: '刷新令牌失败，请稍后重试' },
      { status: 500 }
    )
  }
}