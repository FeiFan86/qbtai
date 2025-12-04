import { NextRequest, NextResponse } from 'next/server'
import AIService from '@/lib/ai-service'

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json()

    // 验证输入
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { success: false, error: '请输入对话消息数组' },
        { status: 400 }
      )
    }

    if (messages.some(msg => typeof msg !== 'string' || msg.trim().length === 0)) {
      return NextResponse.json(
        { success: false, error: '对话消息不能为空' },
        { status: 400 }
      )
    }

    // 调用AI服务进行对话分析
    const analysisResult = await AIService.analyzeConversation(messages)

    return NextResponse.json({
      success: true,
      data: analysisResult
    })
  } catch (error) {
    console.error('对话分析API失败:', error)
    
    if (error instanceof Error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      )
    }
    
    return NextResponse.json(
      { success: false, error: '对话分析服务暂时不可用' },
      { status: 500 }
    )
  }
}