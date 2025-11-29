import { NextRequest, NextResponse } from 'next/server'
import { volcanoAPI } from '@/lib/volcano-api'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { input, type, context } = body

    if (!input) {
      return NextResponse.json(
        { error: '缺少必要参数：input' },
        { status: 400 }
      )
    }

    // 调用火山引擎API进行情感分析
    const result = await volcanoAPI.analyzeEmotion({
      input,
      type: type || 'text',
      context: context || []
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error('Emotion analysis error:', error)
    return NextResponse.json(
      { 
        error: '服务器内部错误'
      },
      { status: 500 }
    )
  }
}