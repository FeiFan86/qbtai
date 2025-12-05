import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import bcrypt from 'bcryptjs'

export async function POST() {
  try {
    const { db } = await connectToDatabase()
    
    // 检查是否已存在管理员账号
    const existingAdmin = await db.collection('users').findOne({ 
      $or: [
        { username: 'admin' },
        { email: 'admin@cupidai.com' }
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
    
    const adminUser = {
      username: 'admin',
      email: 'admin@cupidai.com',
      password: hashedPassword,
      role: 'superadmin',
      membership: {
        level: 'vip',
        expiryDate: new Date('2030-12-31')
      },
      isActive: true,
      createdAt: new Date(),
      lastLogin: new Date()
    }
    
    const result = await db.collection('users').insertOne(adminUser)
    
    if (result.insertedId) {
      return NextResponse.json({
        success: true,
        message: '管理员账号创建成功',
        admin: {
          username: adminUser.username,
          email: adminUser.email,
          password: 'admin123456',
          role: adminUser.role
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
    const { db } = await connectToDatabase()
    
    // 检查管理员账号状态
    const adminUser = await db.collection('users').findOne({ 
      $or: [
        { username: 'admin' },
        { email: 'admin@cupidai.com' }
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