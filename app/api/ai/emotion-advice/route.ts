import { NextRequest, NextResponse } from 'next/server'
import AIService from '@/lib/ai-service'

export async function POST(request: NextRequest) {
  try {
    const { emotion, context } = await request.json()

    // 验证输入
    if (!emotion || emotion.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: '请指定情绪类型' },
        { status: 400 }
      )
    }

    if (!context || context.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: '请提供情绪背景描述' },
        { status: 400 }
      )
    }

    // 调用AI服务获取情感建议
    const advice = await AIService.getEmotionAdvice(emotion, context)

    return NextResponse.json({
      success: true,
      data: { advice }
    })
  } catch (error) {
    console.error('情感建议API失败:', error)
    
    if (error instanceof Error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      )
    }
    
    return NextResponse.json(
      { success: false, error: '情感建议服务暂时不可用' },
      { status: 500 }
    )
  }
}