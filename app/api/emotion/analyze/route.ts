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

    const analysisRequest = {
      input,
      type: type || 'text',
      context: context || []
    }

    const result = await volcanoAPI.analyzeEmotion(analysisRequest)

    return NextResponse.json(result)
  } catch (error) {
    console.error('Emotion analysis API error:', error)
    return NextResponse.json(
      { error: '服务器内部错误' },
      { status: 500 }
    )
  }
}