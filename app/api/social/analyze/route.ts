import { NextRequest, NextResponse } from 'next/server'
import { volcanoAPI } from '@/lib/volcano-api'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { conversation, context, scenario } = body

    if (!conversation) {
      return NextResponse.json(
        { error: '缺少必要参数：conversation' },
        { status: 400 }
      )
    }

    // 调用火山引擎API进行社交对话分析
    const result = await volcanoAPI.analyzeSocialConversation({
      conversation,
      context: context || '',
      scenario: scenario || 'casual'
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error('Social conversation analysis error:', error)
    return NextResponse.json(
      { 
        error: '服务器内部错误'
      },
      { status: 500 }
    )
  }
}