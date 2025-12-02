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
    const { text, platform } = await withTimeout(request.json(), 3000)
    
    if (!text) {
      return NextResponse.json(
        { error: 'Missing required field: text' },
        { status: 400 }
      )
    }
    
    // 模拟社交分析（快速响应）
    const mockAnalysis = await withTimeout(Promise.resolve({
      text,
      platform: platform || '通用',
      analysis: {
        engagement: 0.72,
        sentiment: 'positive',
        topics: ['情感', '互动', '关系'],
        recommendations: [
          '内容情感表达积极',
          '建议增加互动元素',
          '保持一致的沟通风格'
        ]
      },
      timestamp: new Date().toISOString(),
      processingTime: Date.now() - startTime
    }), TIMEOUT_MS)

    return NextResponse.json(mockAnalysis)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    
    return NextResponse.json(
      { 
        error: 'Failed to analyze social content',
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
    service: 'social-analyze',
    timestamp: new Date().toISOString()
  })
}