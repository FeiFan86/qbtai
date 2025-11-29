import { NextRequest, NextResponse } from 'next/server'
import { volcanoAPI } from '@/lib/volcano-api'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message, conversationHistory = [] } = body

    if (!message) {
      return NextResponse.json(
        { error: '缺少必要参数：message' },
        { status: 400 }
      )
    }

    // 构建对话消息
    const messages = [
      {
        role: 'system',
        content: `你是一个温暖、专业的情感分析助手。你的任务是：
1. 用温暖、理解、不评判的语气回应用户的情感表达
2. 给予适当的支持和共情
3. 鼓励用户继续分享，但不要过度追问
4. 不要进行实际的情感分析，只需要作为对话伙伴
5. 保持对话自然流畅，像一个有同理心的朋友

回复应该简洁、温暖，鼓励用户继续分享他们的想法和感受。`
      },
      ...conversationHistory.slice(-8), // 保留最近8条消息
      {
        role: 'user',
        content: message
      }
    ]

    // 调用火山引擎API
    const response = await fetch(`${process.env.VOLCANO_BASE_URL || 'https://ark.cn-beijing.volces.com/api/v3'}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.VOLCANO_API_KEY}`,
      },
      body: JSON.stringify({
        model: process.env.DEEPSEEK_MODEL || 'deepseek-chat',
        messages,
        temperature: 0.7,
        max_tokens: 500,
      }),
    })

    if (!response.ok) {
      console.error('API request failed:', response.status, response.statusText)
      const errorText = await response.text()
      console.error('Error body:', errorText)
      return NextResponse.json(
        { 
          success: false,
          error: 'AI回复获取失败，请稍后重试'
        },
        { status: 500 }
      )
    }

    const data = await response.json()
    
    if (data.choices && data.choices[0]?.message?.content) {
      return NextResponse.json({
        success: true,
        data: {
          content: data.choices[0].message.content.trim()
        }
      })
    } else {
      return NextResponse.json(
        { 
          success: false,
          error: 'AI返回格式异常，请稍后重试'
        },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { 
        success: false,
        error: '处理请求时出错：' + (error instanceof Error ? error.message : '未知错误')
      },
      { status: 500 }
    )
  }
}