import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db-connection'
import bcrypt from 'bcryptjs'
import User from '@/lib/models/User'

export async function POST() {
  try {
    await dbConnect()
    
    // 检查是否已存在管理员账号
    const existingAdmin = await User.findOne({ 
      $or: [
        { username: 'admin' },
        { email: 'admin@cupid-ai.com' }
      ]
    })
    
    if (existingAdmin) {
      return NextResponse.json({ 
        success: false, 
        message: '管理员账号已存在',
        admin: {
          username: existingAdmin.username,
          email: existingAdmin.email,
          role: existingAdmin.role
        }
      })
    }
    
    // 创建新的管理员账号
    const hashedPassword = await bcrypt.hash('admin123456', 10)
    
    const adminUser = new User({
      username: 'admin',
      email: 'admin@cupid-ai.com',
      passwordHash: hashedPassword,
      role: 'admin',
      permissions: ['manage_users', 'manage_content', 'view_analytics', 'system_settings'],
      membership: {
        level: 'vip',
        startDate: new Date(),
        expiryDate: new Date('2030-12-31'),
        autoRenew: true
      },
      isActive: true,
      emailVerified: true,
      lastLogin: new Date()
    })
    
    const savedAdmin = await adminUser.save()
    
    if (savedAdmin._id) {
      return NextResponse.json({
        success: true,
        message: '管理员账号创建成功',
        admin: {
          username: savedAdmin.username,
          email: savedAdmin.email,
          password: 'admin123456',
          role: savedAdmin.role
        }
      })
    } else {
      return NextResponse.json({
        success: false,
        message: '创建管理员账号失败'
      }, { status: 500 })
    }
    
  } catch (error) {
    console.error('初始化管理员账号错误:', error)
    return NextResponse.json({
      success: false,
      message: '服务器内部错误'
    }, { status: 500 })
  }
}

export async function GET() {
  try {
    await dbConnect()
    
    // 检查管理员账号状态
    const adminUser = await User.findOne({ 
      $or: [
        { username: 'admin' },
        { email: 'admin@cupid-ai.com' }
      ]
    })
    
    return NextResponse.json({
      exists: !!adminUser,
      admin: adminUser ? {
        username: adminUser.username,
        email: adminUser.email,
        role: adminUser.role,
        isActive: adminUser.isActive
      } : null
    })
    
  } catch (error) {
    console.error('检查管理员账号错误:', error)
    return NextResponse.json({
      exists: false,
      error: '检查失败'
    }, { status: 500 })
  }
}