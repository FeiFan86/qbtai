import { NextRequest, NextResponse } from 'next/server'

// 添加超时处理
const TIMEOUT_MS = 8000 // 8秒超时

async function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => 
      setTimeout(() => reject(new Error('Request timeout')), timeoutMs)
    )
  ])
}

export async function POST(request: NextRequest) {
  const startTime = Date.now()
  
  try {
    const { input, type } = await withTimeout(request.json(), 3000)
    
    if (!input || !type) {
      return NextResponse.json(
        { error: 'Missing required fields: input and type' },
        { status: 400 }
      )
    }
    
    // 模拟情感分析结果（快速响应）
    const mockAnalysis = await withTimeout(Promise.resolve({
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
      timestamp: new Date().toISOString(),
      processingTime: Date.now() - startTime
    }), TIMEOUT_MS)

    return NextResponse.json(mockAnalysis)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    
    return NextResponse.json(
      { 
        error: 'Failed to analyze emotion',
        details: errorMessage,
        processingTime: Date.now() - startTime
      },
      { status: 500 }
    )
  }
}

// 添加健康检查端点
export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    service: 'emotion-analyze',
    timestamp: new Date().toISOString()
  })
}