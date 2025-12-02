import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { input, type } = await request.json()
    
    // 模拟情感分析结果
    const mockAnalysis = {
      input,
      type,
      emotion: {
        primary: 'positive',
        secondary: ['joy', 'contentment'],
        score: 0.85
      },
      intensity: 0.7,
      confidence: 0.92,
      suggestions: [
        '继续保持积极心态',
        '与他人分享这份快乐',
        '记录下这个美好的时刻'
      ],
      timestamp: new Date().toISOString()
    }

    return NextResponse.json(mockAnalysis)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to analyze emotion' },
      { status: 500 }
    )
  }
}