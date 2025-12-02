import { NextRequest, NextResponse } from 'next/server'

// 模拟用户存储（实际项目中应该使用数据库）
let users: any[] = []

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, email, password, confirmPassword } = body
    
    // 验证必填字段
    if (!username || !email || !password || !confirmPassword) {
      return NextResponse.json({ 
        success: false, 
        error: '所有字段都是必填的' 
      }, { status: 400 })
    }
    
    // 验证密码确认
    if (password !== confirmPassword) {
      return NextResponse.json({ 
        success: false, 
        error: '两次输入的密码不一致' 
      }, { status: 400 })
    }
    
    // 验证密码强度
    if (password.length < 6) {
      return NextResponse.json({ 
        success: false, 
        error: '密码长度至少为6位' 
      }, { status: 400 })
    }
    
    // 检查用户名是否已存在
    const existingUsername = users.find(u => u.username === username)
    if (existingUsername) {
      return NextResponse.json({ 
        success: false, 
        error: '用户名已存在' 
      }, { status: 409 })
    }
    
    // 检查邮箱是否已存在
    const existingEmail = users.find(u => u.email === email)
    if (existingEmail) {
      return NextResponse.json({ 
        success: false, 
        error: '邮箱已被注册' 
      }, { status: 409 })
    }
    
    // 生成用户ID
    const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    // 创建新用户
    const newUser = {
      id: userId,
      username,
      email,
      password, // 实际项目中应该使用加密密码
      avatar: '',
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      preferences: {
        theme: 'auto',
        language: 'zh',
        soundEnabled: true,
        notifications: true
      }
    }
    
    // 保存用户
    users.push(newUser)
    
    // 生成JWT token（简化版）
    const token = btoa(JSON.stringify({
      userId: newUser.id,
      username: newUser.username,
      exp: Date.now() + 24 * 60 * 60 * 1000
    }))
    
    return NextResponse.json({
      success: true,
      data: {
        user: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
          avatar: newUser.avatar,
          preferences: newUser.preferences
        },
        token,
        expiresIn: 24 * 60 * 60 * 1000
      }
    })
    
  } catch (error) {
    console.error('注册失败:', error)
    return NextResponse.json({ 
      success: false, 
      error: '服务器内部错误' 
    }, { status: 500 })
  }
}