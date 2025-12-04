import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import User from '@/lib/models/User'
import crypto from 'crypto'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    
    const { email } = await request.json()

    // 验证必需字段
    if (!email) {
      return NextResponse.json(
        { success: false, error: '邮箱地址为必填项' },
        { status: 400 }
      )
    }

    // 检查邮箱是否存在
    const user = await User.findByEmail(email)
    if (!user) {
      // 为了安全，即使用户不存在也返回成功
      return NextResponse.json({
        success: true,
        message: '如果该邮箱已注册，您将收到重置密码的邮件'
      })
    }

    // 生成重置令牌
    const resetToken = crypto.randomBytes(32).toString('hex')
    const resetTokenExpiry = new Date(Date.now() + 10 * 60 * 1000) // 10分钟后过期

    // 保存重置令牌到数据库
    await User.findByIdAndUpdate(user._id, {
      resetToken,
      resetTokenExpiry,
    })

    // 发送重置邮件
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.EMAIL_PORT || '587'),
        secure: process.env.EMAIL_SECURE === 'true',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      })

      const resetUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`

      const mailOptions = {
        from: process.env.EMAIL_FROM || 'noreply@cupidai.com',
        to: email,
        subject: '丘比特AI情感助手 - 重置密码',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #6366f1;">丘比特AI情感助手</h1>
            </div>
            <h2 style="color: #333; margin-bottom: 20px;">重置您的密码</h2>
            <p style="color: #666; margin-bottom: 30px;">
              您好，${user.username}！我们收到了重置您账户密码的请求。
              请点击下面的链接重置您的密码：
            </p>
            <div style="text-align: center; margin-bottom: 30px;">
              <a href="${resetUrl}" 
                 style="background-color: #6366f1; color: white; padding: 12px 24px; 
                        text-decoration: none; border-radius: 6px; display: inline-block;">
                重置密码
              </a>
            </div>
            <p style="color: #666; margin-bottom: 20px;">
              如果您没有请求重置密码，请忽略此邮件。此链接将在10分钟后失效。
            </p>
            <p style="color: #999; font-size: 12px; margin-top: 30px;">
              此邮件由系统自动发送，请勿回复。
            </p>
          </div>
        `,
      }

      await transporter.sendMail(mailOptions)
    } catch (emailError) {
      console.error('发送重置密码邮件失败:', emailError)
      // 即使发送邮件失败，也返回成功，避免泄露用户信息
    }

    return NextResponse.json({
      success: true,
      message: '如果该邮箱已注册，您将收到重置密码的邮件'
    })
  } catch (error) {
    console.error('重置密码请求失败:', error)
    return NextResponse.json(
      { success: false, error: '处理请求时出错，请稍后重试' },
      { status: 500 }
    )
  }
}