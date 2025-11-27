import { NextRequest, NextResponse } from 'next/server'
import { volcanoAPI } from '@/lib/volcano-api'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { conversation, context, scenario } = body

    if (!conversation) {
      return NextResponse.json(
        { error: '缺少必要参数：conversation' },
        { status: 400 }
      )
    }

    // 调用火山引擎API进行社交对话分析
    const result = await volcanoAPI.analyzeSocialConversation({
      conversation,
      context: context || '',
      scenario: scenario || 'casual'
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error('Social conversation analysis error:', error)
    return NextResponse.json(
      { 
        error: '服务器内部错误',
        data: getMockSocialAnalysis() // 返回模拟数据作为回退
      },
      { status: 500 }
    )
  }
}

// 模拟社交分析数据（用于开发测试）
function getMockSocialAnalysis() {
  return {
    conversationAnalysis: {
      overallSentiment: 'positive',
      communicationStyle: 'assertive',
      emotionalIntelligence: 0.75,
      conflictLevel: 0.2,
      empathyScore: 0.8
    },
    participantAnalysis: {
      user: {
        emotionalState: 'calm',
        communicationStyle: 'direct',
        needs: ['understanding', 'support'],
        strengths: ['honesty', 'clarity']
      },
      other: {
        emotionalState: 'receptive',
        communicationStyle: 'responsive',
        needs: ['validation', 'connection'],
        strengths: ['listening', 'empathy']
      }
    },
    improvementSuggestions: [
      '尝试使用更多的开放式问题来促进深入对话',
      '在表达观点时，可以先肯定对方的感受',
      '适当增加情感表达，增强沟通的亲和力'
    ],
    responseTemplates: [
      '我理解你的感受，我们可以一起找到解决方案',
      '感谢你愿意分享这些想法，这对我很重要',
      '让我们从不同的角度来思考这个问题'
    ]
  }
}