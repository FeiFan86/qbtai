import { NextRequest, NextResponse } from 'next/server'
import { volcanoAPI } from '@/lib/volcano-api'

export async function POST(request: NextRequest) {
  try {
    console.log('Content generation request received')
    
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

    console.log('Calling volcanoAPI to generate content')
    const result = await volcanoAPI.generateContent(generationRequest)
    console.log('Content generation result:', result)

    return NextResponse.json(result)
  } catch (error) {
    console.error('Content generation API error:', error)
    
    return NextResponse.json(
      { 
        success: false,
        error: '内容生成失败，请稍后重试'
      },
      { status: 500 }
    )
  }
}