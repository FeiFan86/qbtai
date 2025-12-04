import { NextRequest, NextResponse } from 'next/server'
import AIService from '@/lib/ai-service'

export async function POST(request: NextRequest) {
  try {
    const { prompt, type } = await request.json()

    // 验证输入
    if (!prompt || prompt.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: '请输入生成内容的提示语' },
        { status: 400 }
      )
    }

    const validTypes = ['love', 'encouragement', 'advice', 'story']
    if (!type || !validTypes.includes(type)) {
      return NextResponse.json(
        { success: false, error: '请选择有效的生成类型' },
        { status: 400 }
      )
    }

    // 调用AI服务生成内容
    const generatedContent = await AIService.generateContent(prompt, type as any)

    return NextResponse.json({
      success: true,
      data: generatedContent
    })
  } catch (error) {
    console.error('内容生成API失败:', error)
    
    if (error instanceof Error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      )
    }
    
    return NextResponse.json(
      { success: false, error: '内容生成服务暂时不可用' },
      { status: 500 }
    )
  }
}