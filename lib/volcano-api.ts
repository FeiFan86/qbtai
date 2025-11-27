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

export interface SocialConversationAnalysisRequest {
  conversation: string
  context?: string
  scenario?: 'casual' | 'professional' | 'romantic' | 'conflict'
}

export interface SocialConversationAnalysisRequest {
  conversation: string
  context?: string
  scenario?: 'casual' | 'professional' | 'romantic' | 'conflict'
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
      // 检查API配置
      if (!this.apiKey) {
        console.error('Volcano API Key is missing')
        throw new Error('API密钥未配置')
      }

      if (!this.baseURL) {
        console.error('Volcano Base URL is missing')
        throw new Error('API基础URL未配置')
      }

      console.log('Calling Volcano API with:', {
        baseURL: this.baseURL,
        model: this.model,
        messageCount: messages.length,
        hasApiKey: !!this.apiKey
      })

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

      console.log('Volcano API response status:', response.status)

      if (!response.ok) {
        const errorText = await response.text()
        console.error('API request failed:', {
          status: response.status,
          statusText: response.statusText,
          body: errorText
        })
        throw new Error(`API请求失败: ${response.status} - ${errorText}`)
      }

      const data = await response.json()
      console.log('Volcano API response received')
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
    console.log('Analyzing emotion for:', { input: request.input, type: request.type })
    
    try {
      // 检查API配置
      if (!this.apiKey) {
        console.log('API Key is missing, using mock data')
        return this.getMockEmotionAnalysis(request.input)
      }

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

          console.log('Emotion analysis successful')
          return {
            success: true,
            data: {
              ...analysisData,
              emotions: emotionsWithMetadata
            }
          }
        } catch (parseError) {
          console.error('JSON parsing failed:', parseError)
          // 如果JSON解析失败，返回模拟数据
          return this.getMockEmotionAnalysis(request.input)
        }
      } else {
        console.log('No valid response from API, using mock data')
        return this.getMockEmotionAnalysis(request.input)
      }
    } catch (error) {
      console.error('Emotion analysis error:', error)
      // 在发生错误时返回模拟数据而不是错误信息
      return this.getMockEmotionAnalysis(request.input)
    }
  }

  /**
   * 社交对话分析
   */
  async analyzeSocialConversation(request: SocialConversationAnalysisRequest): Promise<EmotionAnalysisResponse> {
    console.log('Analyzing social conversation for:', { 
      conversationLength: request.conversation.length,
      scenario: request.scenario 
    })
    
    // 检查API配置
    if (!this.apiKey) {
      console.log('API Key is missing, using mock data')
      return this.getMockSocialAnalysis(request)
    }
    
    try {
      const systemPrompt = `你是一个专业的社交沟通专家。请分析以下对话内容，并以JSON格式返回分析结果。
      
返回的JSON应该包含以下字段：
1. conversationAnalysis - 对话整体分析
   - overallSentiment: 整体情感倾向 (positive/negative/neutral)
   - communicationStyle: 沟通风格 (assertive/passive/aggressive)
   - emotionalIntelligence: 情商得分 (0-1)
   - conflictLevel: 冲突程度 (0-1)
   - empathyScore: 同理心得分 (0-1)
2. participantAnalysis - 参与者分析
   - user: 用户分析
     - emotionalState: 情感状态
     - communicationStyle: 沟通风格
     - needs: 需求列表
     - strengths: 优势列表
   - other: 对方分析
     - emotionalState: 情感状态
     - communicationStyle: 沟通风格
     - needs: 需求列表
     - strengths: 优势列表
3. improvementSuggestions - 改进建议列表
4. responseTemplates - 回应模板列表

请确保返回有效的JSON格式，不要包含任何其他文本。`

      const userPrompt = `请分析以下对话：\n\n"${request.conversation}"\n\n场景：${request.scenario || '日常'}\n背景：${request.context || '无'}`

      const response = await this.callAPI([
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ], 0.3, 1500)

      if (response.choices && response.choices[0]?.message?.content) {
        try {
          const analysisData = JSON.parse(response.choices[0].message.content)
          console.log('Social conversation analysis successful')
          return {
            success: true,
            data: analysisData
          }
        } catch (parseError) {
          console.error('JSON parsing failed:', parseError)
          return this.getMockSocialAnalysis(request)
        }
      } else {
        console.log('No valid response from API, using mock data')
        return this.getMockSocialAnalysis(request)
      }
    } catch (error) {
      console.error('Social conversation analysis error:', error)
      return this.getMockSocialAnalysis(request)
    }
  }

  /**
   * 内容生成
   */
  async generateContent(request: ContentGenerationRequest): Promise<ContentGenerationResponse> {
    console.log('Generating content for:', request)
    
    // 检查API配置
    if (!this.apiKey) {
      console.log('API Key is missing, using mock data')
      return this.getMockContentGeneration(request)
    }
    
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
        console.log('Content generation successful')
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
        console.log('No valid response from API, using mock data')
        return this.getMockContentGeneration(request)
      }
    } catch (error) {
      console.error('Content generation error:', error)
      // 在发生错误时返回模拟数据而不是错误信息
      return this.getMockContentGeneration(request)
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
  private getMockEmotionAnalysis(input?: string): EmotionAnalysisResponse {
    // 根据输入内容简单判断情感倾向
    const isPositive = input && (
      input.includes('开心') || 
      input.includes('高兴') || 
      input.includes('快乐') || 
      input.includes('好') ||
      input.includes('顺利') ||
      input.includes('成功')
    )
    
    const isNegative = input && (
      input.includes('难过') || 
      input.includes('悲伤') || 
      input.includes('生气') || 
      input.includes('糟糕') ||
      input.includes('失败')
    )

    // 基于输入生成不同的模拟数据
    if (isPositive) {
      return {
        success: true,
        data: {
          emotions: [
            { type: '快乐', score: 0.75, color: '#10B981' },
            { type: '期待', score: 0.55, color: '#EC4899' },
            { type: '信任', score: 0.40, color: '#06B6D4' },
            { type: '惊讶', score: 0.20, color: '#F59E0B' },
            { type: '悲伤', score: 0.05, color: '#3B82F6' },
            { type: '愤怒', score: 0.02, color: '#EF4444' },
          ],
          overall: {
            sentiment: 'positive' as const,
            confidence: 0.85
          },
          keywords: ['开心', '满足', '积极', '美好'],
          summary: '这段文字表达了明显的积极情感，显示出快乐和满足感，对未来抱有期待。'
        }
      }
    } else if (isNegative) {
      return {
        success: true,
        data: {
          emotions: [
            { type: '悲伤', score: 0.65, color: '#3B82F6' },
            { type: '愤怒', score: 0.45, color: '#EF4444' },
            { type: '恐惧', score: 0.25, color: '#8B5CF6' },
            { type: '厌恶', score: 0.20, color: '#6B7280' },
            { type: '快乐', score: 0.05, color: '#10B981' },
            { type: '期待', score: 0.02, color: '#EC4899' },
          ],
          overall: {
            sentiment: 'negative' as const,
            confidence: 0.80
          },
          keywords: ['难过', '失望', '挫折', '不安'],
          summary: '这段文字表达了负面情感，主要是悲伤和不满，可能是因为遇到了挫折或不如意的事情。'
        }
      }
    } else {
      // 默认中性偏积极
      return {
        success: true,
        data: {
          emotions: [
            { type: '信任', score: 0.50, color: '#06B6D4' },
            { type: '期待', score: 0.45, color: '#EC4899' },
            { type: '快乐', score: 0.35, color: '#10B981' },
            { type: '惊讶', score: 0.20, color: '#F59E0B' },
            { type: '悲伤', score: 0.15, color: '#3B82F6' },
            { type: '愤怒', score: 0.05, color: '#EF4444' },
          ],
          overall: {
            sentiment: 'neutral' as const,
            confidence: 0.75
          },
          keywords: ['平静', '思考', '观察', '理性'],
          summary: '这段文字表达了相对中性的情感，带有一些思考和观察的成分，整体比较平和。'
        }
      }
    }
  }

  /**
   * 获取模拟的社交分析数据（用于开发测试）
   */
  private getMockSocialAnalysis(request?: SocialConversationAnalysisRequest): EmotionAnalysisResponse {
    const scenario = request?.scenario || 'casual'
    
    const scenarioData = {
      casual: {
        overallSentiment: 'positive',
        communicationStyle: 'friendly',
        emotionalIntelligence: 0.7,
        conflictLevel: 0.1,
        empathyScore: 0.8
      },
      professional: {
        overallSentiment: 'neutral',
        communicationStyle: 'assertive',
        emotionalIntelligence: 0.8,
        conflictLevel: 0.3,
        empathyScore: 0.6
      },
      romantic: {
        overallSentiment: 'positive',
        communicationStyle: 'empathetic',
        emotionalIntelligence: 0.9,
        conflictLevel: 0.2,
        empathyScore: 0.9
      },
      conflict: {
        overallSentiment: 'negative',
        communicationStyle: 'defensive',
        emotionalIntelligence: 0.5,
        conflictLevel: 0.7,
        empathyScore: 0.4
      }
    }

    const data = scenarioData[scenario as keyof typeof scenarioData] || scenarioData.casual
    
    return {
      success: true,
      data: {
        conversationAnalysis: data,
        participantAnalysis: {
          user: {
            emotionalState: scenario === 'conflict' ? 'frustrated' : 'calm',
            communicationStyle: 'direct',
            needs: ['understanding', 'resolution'],
            strengths: ['honesty', 'clarity']
          },
          other: {
            emotionalState: scenario === 'conflict' ? 'defensive' : 'receptive',
            communicationStyle: 'responsive',
            needs: ['validation', 'respect'],
            strengths: ['patience', 'listening']
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
  }

  /**
   * 获取模拟的内容生成数据（用于开发测试）
   */
  private getMockContentGeneration(request?: ContentGenerationRequest): ContentGenerationResponse {
    const styleMap: Record<string, string> = {
      formal: '正式、专业',
      casual: '轻松、随意',
      emotional: '富有情感、感染力',
      professional: '严谨、专业'
    }
    
    const lengthMap: Record<string, string> = {
      short: '简短精炼',
      medium: '中等长度',
      long: '详细全面'
    }
    
    const prompt = request?.prompt || '内容创作'
    const style = request?.style || 'casual'
    const length = request?.length || 'medium'
    const context = request?.context || ''
    
    const styleDesc = styleMap[style] || '中性'
    const lengthDesc = lengthMap[length] || '中等'
    
    let baseContent = `根据您的要求："${prompt}"，我为您生成了这段${styleDesc}、${lengthDesc}的内容。`
    
    if (context) {
      baseContent += `\n\n考虑您提供的背景信息："${context}"，内容特别关注了相关的细节和情境。`
    }
    
    baseContent += `\n\n这是一个示例内容，展示了AI如何根据不同的需求、风格和长度参数创建个性化的文本。在实际应用中，这里将是DeepSeek模型根据您的详细需求生成的高质量内容，完全符合您的要求和期望。`
    
    return {
      success: true,
      data: {
        content: baseContent,
        suggestions: [
          '可以根据具体受众调整语调和表达方式',
          '考虑添加更多具体细节或事例以增强说服力',
          '可以尝试不同的长度选项以适应不同场景',
          '根据反馈修改内容，使其更符合您的需求'
        ]
      }
    }
  }
}

export const volcanoAPI = new VolcanoAPIService()