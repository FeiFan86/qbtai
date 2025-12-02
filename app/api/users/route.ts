import { NextRequest, NextResponse } from 'next/server'

// 模拟数据库存储（在真实环境中应该使用数据库）
let users: any[] = []
let gameStats: any = {}

// GET /api/users - 获取用户信息
export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get('userId')
    
    if (!userId) {
      return NextResponse.json({ error: '用户ID不能为空' }, { status: 400 })
    }
    
    // 查找用户
    const user = users.find(u => u.id === userId)
    
    if (!user) {
      return NextResponse.json({ error: '用户不存在' }, { status: 404 })
    }
    
    // 获取用户统计信息
    const stats = gameStats[userId] || {
      totalGamesPlayed: 0,
      favoriteGame: '',
      totalPlayTime: 0,
      achievements: [],
      lastPlayed: new Date().toISOString()
    }
    
    return NextResponse.json({
      success: true,
      data: {
        user,
        stats
      }
    })
  } catch (error) {
    console.error('获取用户信息失败:', error)
    return NextResponse.json({ error: '服务器内部错误' }, { status: 500 })
  }
}

// POST /api/users - 创建新用户
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, email } = body
    
    if (!username) {
      return NextResponse.json({ error: '用户名不能为空' }, { status: 400 })
    }
    
    // 生成用户ID
    const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    const newUser = {
      id: userId,
      username,
      email: email || '',
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
    
    // 初始化用户统计
    gameStats[userId] = {
      totalGamesPlayed: 0,
      favoriteGame: '',
      totalPlayTime: 0,
      achievements: [],
      lastPlayed: new Date().toISOString()
    }
    
    return NextResponse.json({
      success: true,
      data: {
        user: newUser,
        token: `token_${userId}` // 简化token生成
      }
    })
  } catch (error) {
    console.error('创建用户失败:', error)
    return NextResponse.json({ error: '服务器内部错误' }, { status: 500 })
  }
}

// PUT /api/users - 更新用户信息
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, preferences } = body
    
    if (!userId) {
      return NextResponse.json({ error: '用户ID不能为空' }, { status: 400 })
    }
    
    const userIndex = users.findIndex(u => u.id === userId)
    
    if (userIndex === -1) {
      return NextResponse.json({ error: '用户不存在' }, { status: 404 })
    }
    
    // 更新用户信息
    if (preferences) {
      users[userIndex].preferences = {
        ...users[userIndex].preferences,
        ...preferences
      }
    }
    
    users[userIndex].lastLogin = new Date().toISOString()
    
    return NextResponse.json({
      success: true,
      data: {
        user: users[userIndex]
      }
    })
  } catch (error) {
    console.error('更新用户信息失败:', error)
    return NextResponse.json({ error: '服务器内部错误' }, { status: 500 })
  }
}