// AI服务调用模块
import { SimpleEmotionAnalysisResult, GeneratedContent } from './types'
import { volcanoAI } from './volcano-ai'

export class AIService {
  // 情感分析
  static async analyzeEmotion(text: string): Promise<SimpleEmotionAnalysisResult> {
    try {
      // 使用真实的火山引擎AI服务
      const volcanoResult = await volcanoAI.emotionAnalysis({ text })
      
      // 将火山引擎的格式转换为应用需要的格式
      const emotions = volcanoResult.emotions.map((emotion, index) => {
        const colorMap = {
          'happy': '#F59E0B',
          'love': '#EF4444', 
          'excited': '#8B5CF6',
          'anxious': '#3B82F6',
          'sad': '#6B7280',
          'angry': '#DC2626',
          'confused': '#6366F1'
        }
        
        // 根据情感类型映射到我们的类型
        const emotionTypes = ['happy', 'love', 'excited', 'anxious', 'sad', 'angry', 'confused']
        const type = emotionTypes[index % emotionTypes.length]
        
        return {
          type,
          score: emotion.score,
          color: colorMap[type as keyof typeof colorMap]
        }
      })

      // 生成关键词和摘要
      const keywords = await this.generateKeywords(text)
      const summary = await this.generateSummary(text, volcanoResult.overall_emotion)

      return {
        emotions,
        overall: {
          sentiment: volcanoResult.overall_emotion === 'positive' ? 'positive' : 
                    volcanoResult.overall_emotion === 'negative' ? 'negative' : 'neutral',
          confidence: volcanoResult.confidence
        },
        keywords,
        summary
      }
    } catch (error) {
      console.error('火山引擎情感分析失败:', error)
      
      // 降级方案：使用模拟数据
      return this.getFallbackEmotionAnalysis(text)
    }
  }

  // 生成关键词
  private static async generateKeywords(text: string): Promise<string[]> {
    try {
      const response = await volcanoAI.generateContent({
        prompt: `请从文本"${text}"中提取3-5个关键词，用逗号分隔：`,
        max_tokens: 50,
        temperature: 0.3
      })
      
      return response.split(/[,，]/).map(k => k.trim()).filter(k => k.length > 0).slice(0, 5)
    } catch (error) {
      return ['情感', '分析', '文本']
    }
  }

  // 生成摘要
  private static async generateSummary(text: string, emotion: string): Promise<string> {
    try {
      return await volcanoAI.generateContent({
        prompt: `请根据文本"${text}"和情感"${emotion}"生成一段简短的情感分析摘要：`,
        max_tokens: 100,
        temperature: 0.5
      })
    } catch (error) {
      return `从您的文字中感受到${emotion}情绪，整体情感状态${emotion === 'positive' ? '积极向上' : emotion === 'negative' ? '需要关注' : '平稳'}。`
    }
  }

  // 降级方案：模拟数据
  private static getFallbackEmotionAnalysis(text: string): SimpleEmotionAnalysisResult {
    const wordCount = text.length
    const isPositive = text.includes('开心') || text.includes('幸福') || text.includes('美好')
    
    return {
      emotions: [
        { type: 'happy', score: isPositive ? 0.7 : 0.3, color: '#F59E0B' },
        { type: 'love', score: isPositive ? 0.6 : 0.2, color: '#EF4444' },
        { type: 'excited', score: 0.3, color: '#8B5CF6' },
        { type: 'anxious', score: 0.1, color: '#3B82F6' },
        { type: 'sad', score: isPositive ? 0.1 : 0.4, color: '#6B7280' },
        { type: 'angry', score: 0.05, color: '#DC2626' },
        { type: 'confused', score: 0.05, color: '#6366F1' }
      ],
      overall: {
        sentiment: isPositive ? 'positive' : 'neutral',
        confidence: 0.6
      },
      keywords: isPositive ? ['开心', '幸福', '美好'] : ['情感', '分析', '文本'],
      summary: isPositive ? 
        '从您的文字中感受到积极向上的情绪，整体情感状态良好。' :
        '情感状态平稳，建议继续保持良好的沟通和表达。'
    }
  }

  // 内容生成
  static async generateContent(prompt: string, type: 'love' | 'encouragement' | 'advice' | 'story'): Promise<GeneratedContent> {
    try {
      // 使用真实的火山引擎AI服务
      const content = await volcanoAI.generateContent({
        prompt: this.getContentGenerationPrompt(prompt, type),
        max_tokens: 500,
        temperature: 0.8
      })

      return {
        content,
        type,
        length: content.length,
        createdAt: new Date().toISOString()
      }
    } catch (error) {
      console.error('内容生成失败:', error)
      
      // 返回默认内容作为降级方案
      return {
        content: '抱歉，AI服务暂时不可用。请稍后重试。',
        suggestions: ['建议稍后再次尝试', '检查网络连接是否正常', '联系技术支持获取帮助'],
        type,
        length: 20,
        createdAt: new Date().toISOString()
      }
    }
  }

  // 获取内容生成的提示语
  private static getContentGenerationPrompt(prompt: string, type: string): string {
    const typePrompts = {
      'love': `请根据"${prompt}"生成一段温暖的情话或浪漫表达：`,
      'encouragement': `请根据"${prompt}"生成一段鼓励和支持的话语：`,
      'advice': `请根据"${prompt}"提供专业的建议和指导：`,
      'story': `请根据"${prompt}"创作一个简短的故事：`
    }
    
    return typePrompts[type as keyof typeof typePrompts] || `请根据"${prompt}"生成相关内容：`
  }

  // 对话分析
  static async analyzeConversation(messages: string[]): Promise<any> {
    try {
      const conversationText = messages.join('\n')
      
      const advice = await volcanoAI.getConversationAdvice(
        conversationText,
        messages[messages.length - 1] || ''
      )

      // 分析情感倾向
      const emotionResult = await this.analyzeEmotion(conversationText)
      
      return {
        emotionalTone: emotionResult.overall.sentiment,
        relationshipDepth: Math.min(0.9, emotionResult.emotions.reduce((sum, e) => sum + e.score, 0) / emotionResult.emotions.length),
        communicationStyle: this.determineCommunicationStyle(emotionResult),
        keyTopics: emotionResult.keywords,
        suggestions: [advice]
      }
    } catch (error) {
      console.error('对话分析失败:', error)
      
      // 返回默认分析结果
      return {
        emotionalTone: 'neutral',
        relationshipDepth: 0.5,
        communicationStyle: 'normal',
        keyTopics: ['日常交流'],
        suggestions: ['对话正常，继续保持良好的沟通习惯']
      }
    }
  }

  // 确定沟通风格
  private static determineCommunicationStyle(emotionResult: SimpleEmotionAnalysisResult): string {
    const positiveScore = emotionResult.emotions
      .filter(e => e.type === 'happy' || e.type === 'love' || e.type === 'excited')
      .reduce((sum, e) => sum + e.score, 0)
    
    const negativeScore = emotionResult.emotions
      .filter(e => e.type === 'sad' || e.type === 'angry' || e.type === 'anxious')
      .reduce((sum, e) => sum + e.score, 0)
    
    if (positiveScore > negativeScore * 2) return 'supportive'
    if (negativeScore > positiveScore * 2) return 'defensive'
    return 'balanced'
  }

  // 情感建议
  static async getEmotionAdvice(emotion: string, context: string): Promise<string[]> {
    try {
      const advice = await volcanoAI.generateContent({
        prompt: `针对${emotion}情绪，根据以下情况"${context}"提供3条专业建议：`,
        max_tokens: 300,
        temperature: 0.7
      })
      
      // 将建议拆分为数组
      return advice.split(/[。！？]/).filter(line => line.trim().length > 5).slice(0, 3)
    } catch (error) {
      console.error('获取情感建议失败:', error)
      
      // 返回默认建议
      return [
        '情绪管理是重要的生活技能，建议保持规律的作息和适当的运动。',
        '当情绪波动时，可以尝试深呼吸或与信任的人交流。',
        '记住，情绪是暂时的，积极面对会带来更好的结果。'
      ]
    }
  }
}

export default AIService