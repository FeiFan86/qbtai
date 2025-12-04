import { NextRequest, NextResponse } from 'next/server'
import AIService from '@/lib/ai-service'

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json()

    // 验证输入
    if (!text || text.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: '请输入要分析的文本内容' },
        { status: 400 }
      )
    }

    if (text.trim().length < 10) {
      return NextResponse.json(
        { success: false, error: '文本内容太短，请输入至少10个字符' },
        { status: 400 }
      )
    }

    // 调用AI服务进行情感分析
    const analysisResult = await AIService.analyzeEmotion(text)

    return NextResponse.json({
      success: true,
      data: analysisResult
    })
  } catch (error) {
    console.error('情感分析API失败:', error)
    
    // 返回错误信息，但确保格式一致
    if (error instanceof Error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      )
    }
    
    return NextResponse.json(
      { success: false, error: '情感分析服务暂时不可用' },
      { status: 500 }
    )
  }
}