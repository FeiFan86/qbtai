import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { token } = body
    
    if (!token) {
      return NextResponse.json({ 
        success: false, 
        error: 'Token不能为空' 
      }, { status: 400 })
    }
    
    try {
      // 解码token（简化版，实际项目应使用jsonwebtoken验证）
      const decoded = JSON.parse(atob(token))
      
      // 检查token是否过期
      if (decoded.exp && Date.now() > decoded.exp) {
        return NextResponse.json({ 
          success: false, 
          error: 'Token已过期' 
        }, { status: 401 })
      }
      
      return NextResponse.json({
        success: true,
        data: {
          valid: true,
          user: {
            id: decoded.userId,
            username: decoded.username
          },
          expiresAt: decoded.exp
        }
      })
      
    } catch (error) {
      return NextResponse.json({ 
        success: false, 
        error: '无效的Token' 
      }, { status: 401 })
    }
    
  } catch (error) {
    console.error('验证Token失败:', error)
    return NextResponse.json({ 
      success: false, 
      error: '服务器内部错误' 
    }, { status: 500 })
  }
}