// 火山引擎AI服务客户端

interface VolcanoAIResponse {
  code: number;
  message: string;
  data?: any;
}

interface ChatCompletionRequest {
  messages: Array<{
    role: 'system' | 'user' | 'assistant';
    content: string;
  }>;
  model?: string;
  temperature?: number;
  max_tokens?: number;
}

interface EmotionAnalysisRequest {
  text: string;
  language?: string;
}

interface EmotionAnalysisResponse {
  emotions: Array<{
    emotion: string;
    score: number;
  }>;
  overall_emotion: string;
  confidence: number;
}

interface ContentGenerationRequest {
  prompt: string;
  max_tokens?: number;
  temperature?: number;
}

export class VolcanoAIClient {
  private baseURL: string;
  private accessKeyId: string;
  private secretAccessKey: string;
  private region: string;

  constructor() {
    this.baseURL = 'https://ark.cn-beijing.volces.com/api/v3';
    this.accessKeyId = process.env.VOLCANO_ACCESS_KEY_ID || '';
    this.secretAccessKey = process.env.VOLCANO_SECRET_ACCESS_KEY || '';
    this.region = 'cn-beijing';
  }

  // 生成签名
  private generateSignature(method: string, path: string, headers: Record<string, string>, body: string = ''): string {
    // 简化的签名生成（实际实现需要按照火山引擎API文档）
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const signature = btoa(`${method}\n${path}\n${timestamp}\n${body}`);
    return signature;
  }

  // 通用请求方法
  private async request(endpoint: string, options: RequestInit = {}): Promise<any> {
    if (!this.accessKeyId || !this.secretAccessKey) {
      throw new Error('火山引擎API配置缺失，请检查环境变量');
    }

    const url = `${this.baseURL}${endpoint}`;
    const timestamp = Math.floor(Date.now() / 1000).toString();
    
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `HMAC-SHA256 Credential=${this.accessKeyId},SignedHeaders=content-type;host;x-date,Signature=${this.generateSignature(options.method || 'GET', endpoint, {}, options.body as string)}`,
      'X-Date': timestamp,
      ...options.headers,
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('火山引擎API请求失败:', error);
      throw error;
    }
  }

  // 聊天补全
  async chatCompletion(request: ChatCompletionRequest): Promise<VolcanoAIResponse> {
    return this.request('/chat/completions', {
      method: 'POST',
      body: JSON.stringify({
        model: request.model || 'deepseek-chat',
        messages: request.messages,
        temperature: request.temperature || 0.7,
        max_tokens: request.max_tokens || 1000,
        stream: false
      }),
    });
  }

  // 情感分析
  async emotionAnalysis(request: EmotionAnalysisRequest): Promise<EmotionAnalysisResponse> {
    try {
      // 使用聊天API进行情感分析
      const response = await this.chatCompletion({
        messages: [
          {
            role: 'system',
            content: '你是一个情感分析专家。请分析用户输入的情感，返回JSON格式的分析结果，包含emotions数组（每个元素包含emotion和score），overall_emotion整体情感，confidence置信度。'
          },
          {
            role: 'user',
            content: `请分析以下文本的情感："${request.text}"`
          }
        ],
        temperature: 0.3,
        max_tokens: 500
      });

      // 解析火山引擎API返回的内容
      if (response.code !== 0) {
        throw new Error(`情感分析失败：${response.message}`);
      }
      
      const content = response.data?.choices?.[0]?.message?.content;
      if (!content) {
        throw new Error('情感分析失败：无法获取分析结果');
      }

      // 尝试解析JSON
      try {
        const jsonMatch = content.match(/\{.*\}/s);
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0]);
        }
      } catch (error) {
        console.warn('无法解析JSON，使用默认情感分析');
      }

      // 如果解析失败，返回默认分析
      return {
        emotions: [
          { emotion: 'neutral', score: 0.5 }
        ],
        overall_emotion: 'neutral',
        confidence: 0.7
      };
    } catch (error) {
      console.error('情感分析失败:', error);
      throw error;
    }
  }

  // 内容生成
  async generateContent(request: ContentGenerationRequest): Promise<string> {
    const response = await this.chatCompletion({
      messages: [
        {
          role: 'user',
          content: request.prompt
        }
      ],
      temperature: request.temperature || 0.8,
      max_tokens: request.max_tokens || 500
    });

    return response.choices?.[0]?.message?.content || '';
  }

  // 对话建议
  async getConversationAdvice(context: string, userMessage: string): Promise<string> {
    const response = await this.chatCompletion({
      messages: [
        {
          role: 'system',
          content: '你是一个专业的沟通顾问。请根据对话上下文和用户消息，提供建设性的沟通建议。建议要具体、实用，帮助改善人际关系。'
        },
        {
          role: 'user',
          content: `对话上下文：${context}\n用户消息：${userMessage}\n请给出沟通建议：`
        }
      ],
      temperature: 0.7,
      max_tokens: 300
    });

    return response.choices?.[0]?.message?.content || '';
  }

  // 检查API连接状态
  async checkConnection(): Promise<boolean> {
    try {
      await this.chatCompletion({
        messages: [
          {
            role: 'user',
            content: '测试连接'
          }
        ],
        max_tokens: 10
      });
      return true;
    } catch (error) {
      console.error('火山引擎API连接测试失败:', error);
      return false;
    }
  }
}

// 创建全局实例
export const volcanoAI = new VolcanoAIClient();