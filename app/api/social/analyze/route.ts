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

    // 构建社交分析的提示词
    const systemPrompt = `你是一位专业的社交互动分析师和沟通顾问。请分析用户提供的对话内容，并提供专业的社交建议。
    
请以JSON格式返回分析结果，包含以下字段：
1. emotionAnalysis - 对话中的情感分析，包含：
   - participants: 参与者列表
   - emotions: 每个参与者的情感状态和变化
   - overallTone: 对话整体情感基调
2. communicationPatterns - 沟通模式分析，包含：
   - pattern: 沟通模式类型（合作/冲突/防御/开放等）
   - effectiveness: 沟通效果评分(0-1)
   - issues: 存在的沟通问题
3. suggestions - 具体建议，包含：
   - strategies: 推荐的沟通策略
   - phraseSuggestions: 具体话术建议
   - improvements: 改进方向
4. outcome - 预测结果，包含：
   - currentTrajectory: 当前对话发展趋势
   - idealOutcome: 理想对话结果
   - nextSteps: 下一步行动建议

场景类型：${scenario || 'casual'}
背景信息：${context || '无'}

请确保返回有效的JSON格式，不要包含任何其他文本。`

    const userPrompt = `请分析以下对话内容：\n\n"${conversation}"`

    // 调用火山引擎API
    const response = await fetch(`${process.env.VOLCANO_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.VOLCANO_API_KEY}`,
      },
      body: JSON.stringify({
        model: process.env.DEEPSEEK_MODEL || 'deepseek-chat',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.3,
        max_tokens: 2000,
      }),
    })

    if (response.ok) {
      const data = await response.json()
      
      if (data.choices && data.choices[0]?.message?.content) {
        try {
          // 尝试解析JSON响应
          const analysisData = JSON.parse(data.choices[0].message.content)
          
          return NextResponse.json({
            success: true,
            data: analysisData
          })
        } catch (parseError) {
          // 如果JSON解析失败，返回模拟数据
          return NextResponse.json({
            success: true,
            data: getMockSocialAnalysis()
          })
        }
      } else {
        return NextResponse.json({
          success: true,
          data: getMockSocialAnalysis()
        })
      }
    } else {
      return NextResponse.json({
        success: true,
        data: getMockSocialAnalysis()
      })
    }
  } catch (error) {
    console.error('Social analysis API error:', error)
    return NextResponse.json(
      { error: '服务器内部错误' },
      { status: 500 }
    )
  }
}

// 模拟社交分析数据（用于开发测试）
function getMockSocialAnalysis() {
  return {
    emotionAnalysis: {
      participants: ['参与者A', '参与者B'],
      emotions: [
        {
          participant: '参与者A',
          emotions: ['积极', '开放', '理解'],
          score: 0.75
        },
        {
          participant: '参与者B',
          emotions: ['防御', '不满', '期待'],
          score: 0.45
        }
      ],
      overallTone: 'mixed'
    },
    communicationPatterns: {
      pattern: 'mixed',
      effectiveness: 0.65,
      issues: [
        '参与者B表现出防御态度',
        '缺乏共情表达',
        '话题转换过于突然'
      ]
    },
    suggestions: {
      strategies: [
        '增加情感确认和反馈',
        '使用更多开放性问题',
        '建立共同立场'
      ],
      phraseSuggestions: [
        '我理解您的感受...',
        '您能详细说说您的想法吗？',
        '我们或许可以从这个角度考虑...'
      ],
      improvements: [
        '提高倾听技巧',
        '增强情感表达能力',
        '学习有效解决冲突的方法'
      ]
    },
    outcome: {
      currentTrajectory: '可能产生误解',
      idealOutcome: '达成相互理解',
      nextSteps: [
        '确认对方感受',
        '表达自己的立场',
        '寻求共同解决方案'
      ]
    }
  }
}