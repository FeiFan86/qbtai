import { NextRequest, NextResponse } from 'next/server'
import { volcanoAPI } from '@/lib/volcano-api'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { messages } = body

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: '缺少必要参数：messages' },
        { status: 400 }
      )
    }

    // 提取所有用户消息内容
    const userMessages = messages.filter((m: any) => m.role === 'user')
    const conversationText = userMessages.map((m: any) => m.content).join('\n\n')

    // 调用火山引擎API进行综合情感分析
    const result = await volcanoAPI.analyzeEmotion({
      input: conversationText,
      type: 'text',
      context: []
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error('Generate emotion analysis result error:', error)
    return NextResponse.json(
      { 
        success: false,
        error: '生成综合分析失败：' + (error instanceof Error ? error.message : '未知错误')
      },
      { status: 500 }
    )
  }
}