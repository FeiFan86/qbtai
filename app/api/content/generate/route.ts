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
    const { topic, type, tone } = await withTimeout(request.json(), 3000)
    
    if (!topic) {
      return NextResponse.json(
        { error: 'Missing required field: topic' },
        { status: 400 }
      )
    }
    
    // 模拟内容生成（快速响应）
    const mockContent = await withTimeout(Promise.resolve({
      topic,
      type: type || '文章',
      tone: tone || '中性',
      content: `这是一段关于"${topic}"的${tone || '中性'}风格的${type || '文章'}内容示例。内容生成功能正在开发中，未来将集成更强大的AI能力。`,
      length: 150,
      quality: 0.85,
      suggestions: [
        '可以进一步扩展这个话题',
        '考虑添加更多具体细节',
        '保持语气一致'
      ],
      timestamp: new Date().toISOString(),
      processingTime: Date.now() - startTime
    }), TIMEOUT_MS)

    return NextResponse.json(mockContent)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    
    return NextResponse.json(
      { 
        error: 'Failed to generate content',
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
    service: 'content-generate',
    timestamp: new Date().toISOString()
  })
}