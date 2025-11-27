import { NextRequest, NextResponse } from 'next/server'
import { volcanoAPI } from '@/lib/volcano-api'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { prompt, style, length, context } = body

    if (!prompt) {
      return NextResponse.json(
        { error: '缺少必要参数：prompt' },
        { status: 400 }
      )
    }

    const generationRequest = {
      prompt,
      style: style || 'casual',
      length: length || 'medium',
      context: context || ''
    }

    const result = await volcanoAPI.generateContent(generationRequest)

    return NextResponse.json(result)
  } catch (error) {
    console.error('Content generation API error:', error)
    return NextResponse.json(
      { error: '服务器内部错误' },
      { status: 500 }
    )
  }
}