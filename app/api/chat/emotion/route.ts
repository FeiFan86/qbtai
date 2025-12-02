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
    const { message, context } = await withTimeout(request.json(), 3000)
    
    if (!message) {
      return NextResponse.json(
        { error: 'Missing required field: message' },
        { status: 400 }
      )
    }
    
    // 模拟聊天情感分析（快速响应）
    const mockResponse = await withTimeout(Promise.resolve({
      message,
      context: context || 'general',
      analysis: {
        emotion: 'neutral',
        sentiment: 'balanced',
        confidence: 0.78,
        suggestedResponses: [
          '我理解你的感受',
          '这听起来很有意思',
          '让我们进一步探讨这个话题'
        ]
      },
      timestamp: new Date().toISOString(),
      processingTime: Date.now() - startTime
    }), TIMEOUT_MS)

    return NextResponse.json(mockResponse)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    
    return NextResponse.json(
      { 
        error: 'Failed to analyze chat emotion',
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
    service: 'chat-emotion',
    timestamp: new Date().toISOString()
  })
}