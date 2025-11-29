import { NextRequest, NextResponse } from 'next/server'
import { volcanoAPI } from '@/lib/volcano-api'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { messages } = body

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { success: false, error: '缺少必要参数：messages' },
        { status: 400 }
      )
    }

    // 提取所有用户消息内容
    const userMessages = messages.filter((m: any) => m.role === 'user')
    if (userMessages.length === 0) {
      return NextResponse.json(
        { success: false, error: '未找到用户消息' },
        { status: 400 }
      )
    }

    const conversationText = userMessages.map((m: any) => m.content).join('\n\n')

    console.log('Starting emotion analysis for conversation:', { 
      messageCount: userMessages.length, 
      textLength: conversationText.length 
    })

    // 调用火山引擎API进行综合情感分析
    const result = await volcanoAPI.analyzeEmotion({
      input: conversationText,
      type: 'text',
      context: []
    })

    console.log('Emotion analysis result:', { 
      success: result.success, 
      hasData: !!result.data,
      error: result.error 
    })

    // 确保返回格式一致
    if (result.success && result.data) {
      return NextResponse.json({
        success: true,
        data: result.data
      })
    } else {
      return NextResponse.json({
        success: false,
        error: result.error || '分析结果为空'
      })
    }
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