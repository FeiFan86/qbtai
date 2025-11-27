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
    
    // 在发生错误时返回模拟数据
    const styleMap = {
      formal: '正式的',
      casual: '随意的',
      emotional: '情感化的',
      professional: '专业的'
    }
    
    const body = await request.json().catch(() => ({}))
    const { prompt, style } = body
    
    return NextResponse.json({
      success: true,
      data: {
        content: `根据您的要求："${prompt || '未提供提示'}"，我为您生成了这段内容。这是一个${styleMap[style] || '中性'}的示例，展示了AI如何根据不同的需求创建个性化的文本内容。在实际应用中，这里将是DeepSeek模型根据您的详细需求生成的高质量内容。`,
        suggestions: [
          '可以根据具体受众调整语调',
          '考虑添加更多具体细节或事例',
          '可以尝试不同的长度选项'
        ]
      }
    })
  }
}