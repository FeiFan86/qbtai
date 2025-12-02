import { NextRequest, NextResponse } from 'next/server'

// 模拟用户数据（实际项目中应该使用数据库）
const users = [
  {
    id: 'user_1',
    username: 'testuser',
    email: 'test@example.com',
    password: 'password123', // 实际项目中应该使用加密密码
    avatar: '',
    createdAt: '2024-01-01T00:00:00.000Z',
    lastLogin: '2024-01-01T00:00:00.000Z',
    preferences: {
      theme: 'auto',
      language: 'zh',
      soundEnabled: true,
      notifications: true
    }
  }
]

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, password } = body
    
    if (!username || !password) {
      return NextResponse.json({ 
        success: false, 
        error: '用户名和密码不能为空' 
      }, { status: 400 })
    }
    
    // 查找用户
    const user = users.find(u => u.username === username || u.email === username)
    
    if (!user) {
      return NextResponse.json({ 
        success: false, 
        error: '用户不存在' 
      }, { status: 401 })
    }
    
    // 验证密码（实际项目中应该使用加密验证）
    if (user.password !== password) {
      return NextResponse.json({ 
        success: false, 
        error: '密码错误' 
      }, { status: 401 })
    }
    
    // 更新最后登录时间
    user.lastLogin = new Date().toISOString()
    
    // 生成JWT token（简化版，实际项目应使用jsonwebtoken）
    const token = btoa(JSON.stringify({
      userId: user.id,
      username: user.username,
      exp: Date.now() + 24 * 60 * 60 * 1000 // 24小时后过期
    }))
    
    return NextResponse.json({
      success: true,
      data: {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          avatar: user.avatar,
          preferences: user.preferences
        },
        token,
        expiresIn: 24 * 60 * 60 * 1000
      }
    })
    
  } catch (error) {
    console.error('登录失败:', error)
    return NextResponse.json({ 
      success: false, 
      error: '服务器内部错误' 
    }, { status: 500 })
  }
}