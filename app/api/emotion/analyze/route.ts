import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { input, type, context } = body
    
    // 简单的模拟情感分析逻辑
    const analysisResult = {
      overall: {
        sentiment: getSentiment(input),
        confidence: Math.random() * 0.3 + 0.7 // 70%-100% 置信度
      },
      emotions: analyzeEmotions(input),
      suggestions: generateSuggestions(input),
      timestamp: new Date().toISOString()
    }

    return NextResponse.json({ 
      success: true, 
      data: analysisResult 
    })
  } catch (error) {
    console.error('情感分析API错误:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: '分析过程中出现错误' 
      },
      { status: 500 }
    )
  }
}

function getSentiment(text: string): string {
  const positiveWords = ['开心', '快乐', '高兴', '满意', '喜欢', '爱', '美好', '幸福', '成功', '优秀']
  const negativeWords = ['难过', '悲伤', '失望', '生气', '愤怒', '讨厌', '痛苦', '失败', '糟糕', '烦恼']
  
  const textLower = text.toLowerCase()
  
  const positiveCount = positiveWords.filter(word => 
    textLower.includes(word)
  ).length
  
  const negativeCount = negativeWords.filter(word => 
    textLower.includes(word)
  ).length
  
  if (positiveCount > negativeCount) return 'positive'
  if (negativeCount > positiveCount) return 'negative'
  return 'neutral'
}

function analyzeEmotions(text: string): Array<{type: string, score: number}> {
  const emotionMap = {
    '快乐': ['开心', '快乐', '高兴', '喜悦', '愉快', '兴奋'],
    '悲伤': ['难过', '悲伤', '伤心', '失望', '沮丧', '痛苦'],
    '愤怒': ['生气', '愤怒', '恼火', '烦躁', '不满', '气愤'],
    '恐惧': ['害怕', '恐惧', '担心', '焦虑', '紧张', '不安'],
    '惊讶': ['惊讶', '惊奇', '意外', '震惊', '诧异'],
    '平静': ['平静', '安宁', '放松', '舒适', '满足', '淡定']
  }
  
  const textLower = text.toLowerCase()
  const emotions: Array<{type: string, score: number}> = []
  
  Object.entries(emotionMap).forEach(([emotion, keywords]) => {
    const count = keywords.filter(keyword => 
      textLower.includes(keyword)
    ).length
    
    if (count > 0) {
      const score = Math.min(count * 0.2 + Math.random() * 0.3, 1.0)
      emotions.push({ type: emotion, score })
    }
  })
  
  // 如果没有匹配到具体情感，提供默认分析
  if (emotions.length === 0) {
    const sentiment = getSentiment(text)
    const defaultEmotion = sentiment === 'positive' ? '平静' : 
                          sentiment === 'negative' ? '中性' : '平静'
    emotions.push({ 
      type: defaultEmotion, 
      score: 0.5 + Math.random() * 0.3 
    })
  }
  
  // 按分数排序并限制数量
  return emotions
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
}

function generateSuggestions(text: string): string[] {
  const sentiment = getSentiment(text)
  
  if (sentiment === 'positive') {
    return [
      '继续保持积极的心态，分享快乐可以感染更多人',
      '记录下这份美好的感受，作为未来回忆的珍贵片段',
      '与朋友或家人分享您的喜悦，让快乐加倍'
    ]
  } else if (sentiment === 'negative') {
    return [
      '尝试深呼吸或冥想，帮助缓解负面情绪',
      '与信任的人倾诉，分享感受可以减轻压力',
      '进行一些喜欢的活动来转移注意力'
    ]
  } else {
    return [
      '继续保持观察和思考，情感需要时间来沉淀',
      '尝试记录下您的想法，有助于理清思绪',
      '给自己一些时间和空间来感受和表达情感'
    ]
  }
}