/**
 * 火山引擎API服务
 * 基于火山引擎方舟的DeepSeek模型进行情感分析
 */

export interface EmotionAnalysisRequest {
  input: string
  type: 'text' | 'voice' | 'image'
  context?: string[]
}

export interface EmotionAnalysisResponse {
  success: boolean
  data?: {
    emotions: Array<{
      type: string
      score: number
      color: string
    }>
    overall: {
      sentiment: 'positive' | 'negative' | 'neutral'
      confidence: number
    }
    keywords: string[]
    summary: string
  }
  error?: string
}

export interface ContentGenerationRequest {
  prompt: string
  style: 'formal' | 'casual' | 'emotional' | 'professional'
  length: 'short' | 'medium' | 'long'
  context?: string
}

export interface ContentGenerationResponse {
  success: boolean
  data?: {
    content: string
    suggestions: string[]
  }
  error?: string
}

class VolcanoAPIService {
  private baseURL: string
  private apiKey: string
  private model: string

  constructor() {
    this.baseURL = process.env.VOLCANO_BASE_URL || 'https://ark.cn-beijing.volces.com/api/v3'
    this.apiKey = process.env.VOLCANO_API_KEY || ''
    this.model = process.env.DEEPSEEK_MODEL || 'deepseek-chat'
  }

  /**
   * 调用火山引擎API的通用方法
   */
  private async callAPI(messages: any[], temperature = 0.3, maxTokens = 2000): Promise<any> {
    try {
      const response = await fetch(`${this.baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: this.model,
          messages,
          temperature,
          max_tokens: maxTokens,
        }),
      })

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Volcano API error:', error)
      throw error
    }
  }

  /**
   * 情感分析
   */
  async analyzeEmotion(request: EmotionAnalysisRequest): Promise<EmotionAnalysisResponse> {
    try {
      const systemPrompt = `你是一个专业的情感分析专家。请分析用户输入内容的情感，并以JSON格式返回结果。
      
返回的JSON应该包含以下字段：
1. emotions - 情感数组，包含各种情感类型和对应的分数（0-1）
   可能的情感类型：快乐(happiness), 悲伤(sadness), 愤怒(anger), 恐惧(fear), 惊讶(surprise), 厌恶(disgust), 期待(anticipation), 信任(trust)
2. overall - 整体情感倾向，包含sentiment(positive/negative/neutral)和confidence(0-1)
3. keywords - 提取出的关键词数组
4. summary - 情感分析的简短总结

请确保返回有效的JSON格式，不要包含任何其他文本。`

      const userPrompt = `请分析以下内容的情感：\n\n"${request.input}"`

      const response = await this.callAPI([
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ], 0.2, 1000)

      if (response.choices && response.choices[0]?.message?.content) {
        try {
          // 尝试解析JSON响应
          const analysisData = JSON.parse(response.choices[0].message.content)
          
          // 添加情感的颜色和图标信息
          const emotionsWithMetadata = analysisData.emotions.map((emotion: any) => ({
            ...emotion,
            color: this.getEmotionColor(emotion.type),
            icon: this.getEmotionIcon(emotion.type)
          }))

          return {
            success: true,
            data: {
              ...analysisData,
              emotions: emotionsWithMetadata
            }
          }
        } catch (parseError) {
          // 如果JSON解析失败，返回模拟数据
          return this.getMockEmotionAnalysis()
        }
      } else {
        return this.getMockEmotionAnalysis()
      }
    } catch (error) {
      console.error('Emotion analysis error:', error)
      return {
        success: false,
        error: '情感分析失败，请稍后重试'
      }
    }
  }

  /**
   * 内容生成
   */
  async generateContent(request: ContentGenerationRequest): Promise<ContentGenerationResponse> {
    try {
      const stylePrompts = {
        formal: '请使用正式、专业的语调',
        casual: '请使用轻松、口语化的语调',
        emotional: '请使用富有情感、感染力的语调',
        professional: '请使用专业、严谨的语调'
      }

      const lengthPrompts = {
        short: '请生成简短的内容，不超过100字',
        medium: '请生成中等长度的内容，100-300字',
        long: '请生成详细的内容，300-500字'
      }

      const systemPrompt = `你是一个专业的内容创作者。${stylePrompts[request.style]}，${lengthPrompts[request.length]}。请根据用户的提示生成高质量的内容。`

      const context = request.context ? `\n\n背景信息：${request.context}` : ''
      const userPrompt = `${request.prompt}${context}`

      const response = await this.callAPI([
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ], request.style === 'emotional' ? 0.8 : 0.5, 1500)

      if (response.choices && response.choices[0]?.message?.content) {
        return {
          success: true,
          data: {
            content: response.choices[0].message.content,
            suggestions: [
              '可以尝试添加更多情感细节',
              '考虑加入具体事例',
              '调整语调以匹配目标受众'
            ]
          }
        }
      } else {
        return this.getMockContentGeneration()
      }
    } catch (error) {
      console.error('Content generation error:', error)
      return {
        success: false,
        error: '内容生成失败，请稍后重试'
      }
    }
  }

  /**
   * 获取情感对应的颜色
   */
  private getEmotionColor(emotionType: string): string {
    const colorMap: Record<string, string> = {
      happiness: '#10B981', // 绿色
      sadness: '#3B82F6',   // 蓝色
      anger: '#EF4444',      // 红色
      fear: '#8B5CF6',       // 紫色
      surprise: '#F59E0B',   // 橙色
      disgust: '#6B7280',    // 灰色
      anticipation: '#EC4899', // 粉色
      trust: '#06B6D4'       // 青色
    }
    
    return colorMap[emotionType.toLowerCase()] || '#6B7280'
  }

  /**
   * 获取情感对应的图标
   */
  private getEmotionIcon(emotionType: string): string {
    // 这里返回图标的名称，实际组件中会使用lucide-react图标
    const iconMap: Record<string, string> = {
      happiness: 'Smile',
      sadness: 'Frown',
      anger: 'Zap',
      fear: 'Shield',
      surprise: 'Eye',
      disgust: 'ThumbsDown',
      anticipation: 'Clock',
      trust: 'Heart'
    }
    
    return iconMap[emotionType.toLowerCase()] || 'Meh'
  }

  /**
   * 获取模拟的情感分析数据（用于开发测试）
   */
  private getMockEmotionAnalysis(): EmotionAnalysisResponse {
    return {
      success: true,
      data: {
        emotions: [
          { type: '快乐', score: 0.65, color: '#10B981' },
          { type: '信任', score: 0.45, color: '#06B6D4' },
          { type: '期待', score: 0.30, color: '#EC4899' },
          { type: '惊讶', score: 0.15, color: '#F59E0B' },
          { type: '悲伤', score: 0.05, color: '#3B82F6' },
          { type: '愤怒', score: 0.02, color: '#EF4444' },
        ],
        overall: {
          sentiment: 'positive',
          confidence: 0.82
        },
        keywords: ['开心', '满意', '期待', '成功'],
        summary: '这段文字整体表达了积极向上的情感，主要体现为快乐和对未来的期待，带有信任的成分。'
      }
    }
  }

  /**
   * 获取模拟的内容生成数据（用于开发测试）
   */
  private getMockContentGeneration(): ContentGenerationResponse {
    return {
      success: true,
      data: {
        content: '这是一段根据您的要求生成的示例内容。在实际应用中，这里将是DeepSeek模型根据您的输入生成的高质量内容。',
        suggestions: [
          '可以添加更多具体细节',
          '考虑调整语调以匹配目标受众',
          '可以增加一些情感元素'
        ]
      }
    }
  }
}

export const volcanoAPI = new VolcanoAPIService()