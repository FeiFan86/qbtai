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
  scenario?: 'casual' | 'professional' | 'romantic' | 'conflict' | 'family' | 'service' | 'education' | 'medical'
}

export interface SocialConversationAnalysisResponse {
  success: boolean
  data?: {
    conversationAnalysis: {
      overallSentiment: string
      communicationStyle: string
      emotionalIntelligence: number
      conflictLevel: number
      empathyScore: number
    }
    participantAnalysis: {
      user: {
        emotionalState: string
        communicationStyle: string
        needs: string[]
        strengths: string[]
      }
      other: {
        emotionalState: string
        communicationStyle: string
        needs: string[]
        strengths: string[]
      }
    }
    improvementSuggestions: string[]
    responseTemplates: string[]
  }
  error?: string
}

export interface ContentGenerationResponse {
  success: boolean
  data?: {
    content: string
    suggestions: string[]
  }
  error?: string
}

class VolcanoAPIServiceFixed {
  private baseURL: string
  private apiKey: string
  private model: string

  constructor() {
    this.baseURL = process.env.VOLCANO_BASE_URL || 'https://ark.cn-beijing.volces.com/api/v3'
    this.apiKey = process.env.VOLCANO_API_KEY || ''
    this.model = process.env.DEEPSEEK_MODEL || 'deepseek-chat'
  }

  /**
   * 获取情感对应的颜色
   */
  private getEmotionColor(emotionType: string): string {
    const colorMap: Record<string, string> = {
      '快乐': '#10B981', // 绿色
      '悲伤': '#3B82F6',   // 蓝色
      '愤怒': '#EF4444',      // 红色
      '恐惧': '#8B5CF6',       // 紫色
      '惊讶': '#F59E0B',   // 橙色
      '厌恶': '#6B7280',    // 灰色
      '期待': '#EC4899', // 粉色
      '信任': '#06B6D4',      // 青色
      // 英文映射（兼容性）
      happiness: '#10B981',
      sadness: '#3B82F6',
      anger: '#EF4444',
      fear: '#8B5CF6',
      surprise: '#F59E0B',
      disgust: '#6B7280',
      anticipation: '#EC4899',
      trust: '#06B6D4'
    }
    
    return colorMap[emotionType.toLowerCase()] || '#6B7280'
  }

  /**
   * 获取情感对应的图标
   */
  private getEmotionIcon(emotionType: string): string {
    // 这里返回图标的名称，实际组件中会使用lucide-react图标
    const iconMap: Record<string, string> = {
      '快乐': 'Smile',
      '悲伤': 'Frown',
      '愤怒': 'Zap',
      '恐惧': 'Shield',
      '惊讶': 'Eye',
      '厌恶': 'ThumbsDown',
      '期待': 'Clock',
      '信任': 'Heart',
      // 英文映射（兼容性）
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
   * 获取模拟的社交分析数据（用于开发测试）
   */
  private getMockSocialAnalysis(request?: SocialConversationAnalysisRequest): SocialConversationAnalysisResponse {
    const scenario = request?.scenario || 'casual'
    
    // 根据场景生成不同的模拟数据
    if (request?.scenario === 'professional') {
      return {
        success: true,
        data: {
          conversationAnalysis: {
            overallSentiment: '中性',
            communicationStyle: '专业',
            emotionalIntelligence: 0.8,
            conflictLevel: 0.1,
            empathyScore: 0.7
          },
          participantAnalysis: {
            user: {
              emotionalState: '专业且谨慎',
              communicationStyle: '正式且明确',
              needs: ['明确任务', '合理时间', '资源支持'],
              strengths: ['逻辑清晰', '专业素养', '沟通能力']
            },
            other: {
              emotionalState: '务实且目标导向',
              communicationStyle: '直接且高效',
              needs: ['进度报告', '问题解决', '团队协作'],
              strengths: ['领导力', '决策能力', '目标明确']
            }
          },
          improvementSuggestions: [
            '提前沟通项目可能遇到的问题',
            '定期向上级汇报进度',
            '使用数据支持你的观点',
            '保持专业态度面对挑战'
          ],
          responseTemplates: [
            "我理解您对项目进度的关注。目前我们在技术方面遇到了一些挑战，但我有信心通过团队协作能够解决。",
            "感谢您的提醒。我会尽快调整计划，确保项目按时交付，同时保持质量标准。",
            "关于延期问题，我已经制定了详细的解决方案，并准备在明天的会议上详细说明。"
          ]
        }
      }
    } else if (request?.scenario === 'romantic') {
      return {
        success: true,
        data: {
          conversationAnalysis: {
            overallSentiment: '消极',
            communicationStyle: '回避',
            emotionalIntelligence: 0.6,
            conflictLevel: 0.5,
            empathyScore: 0.4
          },
          participantAnalysis: {
            user: {
              emotionalState: '忙碌或压力大',
              communicationStyle: '解释性',
              needs: ['理解', '支持', '认可'],
              strengths: ['诚实表达', '努力工作']
            },
            other: {
              emotionalState: '被忽视或孤独',
              communicationStyle: '情感表达',
              needs: ['陪伴', '关注', '情感连接'],
              strengths: ['直接表达', '情感敏感']
            }
          },
          improvementSuggestions: [
            '设定专属的相处时间，不受工作打扰',
            '学会倾听对方的感受而不急于解释',
            '用行动表达关心，不仅仅是言语',
            '创造共同的回忆和体验'
          ],
          responseTemplates: [
            "我听到你的感受了，很抱歉让你觉得被忽视。工作确实占据了我很多时间，但你的感受很重要。",
            "让我们制定一个计划，每周至少有一天完全属于我们，不受工作干扰。",
            "谢谢你的坦诚。我会努力在工作和关系之间找到更好的平衡，你的感受值得我重视。"
          ]
        }
      }
    } else if (request?.scenario === 'conflict') {
      return {
        success: true,
        data: {
          conversationAnalysis: {
            overallSentiment: '消极',
            communicationStyle: '防御性',
            emotionalIntelligence: 0.3,
            conflictLevel: 0.8,
            empathyScore: 0.2
          },
          participantAnalysis: {
            user: {
              emotionalState: '被误解或受伤',
              communicationStyle: '指责性',
              needs: ['被理解', '被尊重', '情感安全'],
              strengths: ['诚实表达', '自我保护']
            },
            other: {
              emotionalState: '防御或困惑',
              communicationStyle: '回避性',
              needs: ['被认可', '避免冲突', '自主权'],
              strengths: ['理性思考', '问题解决', '冷静']
            }
          },
          improvementSuggestions: [
            '使用"我"陈述表达感受，而非指责',
            '在回应前先确认理解对方的意思',
            '暂停讨论，等情绪平复后再继续',
            '寻找共同点而非强调分歧'
          ],
          responseTemplates: [
            "我理解你可能感到被忽视，我的本意并非如此。让我们重新开始这个对话。",
            "也许我们可以换种方式表达，这样更容易理解彼此的观点。",
            "我重视你的意见，即使我们看法不同。让我们尝试找到一个双方都能接受的解决方案。"
          ]
        }
      }
    } else {
      // 默认场景 (casual, family, service, education, medical)
      return {
        success: true,
        data: {
          conversationAnalysis: {
            overallSentiment: '中性',
            communicationStyle: '合作',
            emotionalIntelligence: 0.7,
            conflictLevel: 0.2,
            empathyScore: 0.6
          },
          participantAnalysis: {
            user: {
              emotionalState: '平和但可能有些压力',
              communicationStyle: '开放',
              needs: ['理解', '支持', '共鸣'],
              strengths: ['诚实', '善于表达', '自我意识']
            },
            other: {
              emotionalState: '关心且支持',
              communicationStyle: '倾听性',
              needs: ['建立连接', '提供帮助', '维持关系'],
              strengths: ['同理心', '耐心', '善于倾听']
            }
          },
          improvementSuggestions: [
            '继续开放地分享感受和想法',
            '多使用积极肯定的言语',
            '在对话中给予对方充分表达空间',
            '定期检查和调整沟通方式'
          ],
          responseTemplates: [
            "我感谢你的关心，确实最近有些压力。你的支持对我意义很大。",
            "你的倾听让我感到很舒服。我也很想了解你最近的情况。",
            "我们之间的交流很珍贵。让我们继续保持这种开放和支持的对话方式。"
          ]
        }
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

  /**
   * 社交对话分析
   */
  async analyzeSocialConversation(request: SocialConversationAnalysisRequest): Promise<SocialConversationAnalysisResponse> {
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
      
重要提示：请用中文返回所有分析结果！

返回的JSON应该包含以下字段：
1. conversationAnalysis - 对话整体分析
   - overallSentiment: 整体情感倾向（积极/消极/中性）
   - communicationStyle: 沟通风格（自信/被动/攻击性）
   - emotionalIntelligence: 情商得分 (0-1)
   - conflictLevel: 冲突程度 (0-1)
   - empathyScore: 同理心得分 (0-1)
2. participantAnalysis - 参与者分析
   - user: 用户分析
     - emotionalState: 情感状态（用中文描述）
     - communicationStyle: 沟通风格（用中文描述）
     - needs: 需求列表（用中文描述）
     - strengths: 优势列表（用中文描述）
   - other: 对方分析
     - emotionalState: 情感状态（用中文描述）
     - communicationStyle: 沟通风格（用中文描述）
     - needs: 需求列表（用中文描述）
     - strengths: 优势列表（用中文描述）
3. improvementSuggestions - 改进建议列表（用中文描述）
4. responseTemplates - 回应模板列表（用中文描述）

请确保返回有效的JSON格式，所有内容都使用中文，不要包含任何其他文本。`

      const userPrompt = `请分析以下对话：\n\n"${request.conversation}"\n\n场景：${request.scenario || '日常'}\n背景：${request.context || '无'}`

      const response = await fetch(`${this.baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          temperature: 0.3,
          max_tokens: 1500,
        }),
      })

      if (!response.ok) {
        console.error('API request failed:', response.status)
        return {
          success: false,
          error: `API请求失败: ${response.status}`
        }
      }

      const data = await response.json()
      console.log('Social conversation analysis successful')
      
      if (data.choices && data.choices[0]?.message?.content) {
        try {
          const analysisData = JSON.parse(data.choices[0].message.content)
          return {
            success: true,
            data: analysisData
          }
        } catch (parseError) {
          console.error('JSON parsing failed:', parseError)
          const errorMessage = parseError instanceof Error ? parseError.message : '未知的JSON解析错误'
          return {
            success: false,
            error: 'JSON解析失败：' + errorMessage
          }
        }
      } else {
        console.log('No valid response from API')
        return {
          success: false,
          error: 'API未返回有效响应'
        }
      }
    } catch (error) {
      console.error('Social conversation analysis error:', error)
      const errorMessage = error instanceof Error ? error.message : '未知的社交对话分析错误'
      return {
        success: false,
        error: '社交对话分析失败：' + errorMessage
      }
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

      const response = await fetch(`${this.baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          temperature: request.style === 'emotional' ? 0.8 : 0.5,
          max_tokens: 1500,
        }),
      })

      if (!response.ok) {
        console.error('API request failed:', response.status)
        return {
          success: false,
          error: `API请求失败: ${response.status}`
        }
      }

      const data = await response.json()
      console.log('Content generation successful')
      
      if (data.choices && data.choices[0]?.message?.content) {
        return {
          success: true,
          data: {
            content: data.choices[0].message.content,
            suggestions: [
              '可以尝试添加更多情感细节',
              '考虑加入具体事例',
              '调整语调以匹配目标受众'
            ]
          }
        }
      } else {
        console.log('No valid response from API')
        return {
          success: false,
          error: 'API未返回有效响应'
        }
      }
    } catch (error) {
      console.error('Content generation error:', error)
      const errorMessage = error instanceof Error ? error.message : '未知的内容生成错误'
      return {
        success: false,
        error: '内容生成失败：' + errorMessage
      }
    }
  }
}

export const volcanoAPIFixed = new VolcanoAPIServiceFixed()