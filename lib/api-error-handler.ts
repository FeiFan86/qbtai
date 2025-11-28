'use client'

import React, { useState } from 'react'

// API错误处理器
interface ApiError {
  code: string
  message: string
  details?: any
}

interface RetryConfig {
  maxRetries: number
  retryDelay: number
  backoffMultiplier: number
}

export class ApiErrorHandler {
  private static defaultConfig: RetryConfig = {
    maxRetries: 3,
    retryDelay: 1000,
    backoffMultiplier: 2
  }

  // 错误分类
  static categorizeError(error: any): ApiError {
    if (error.response) {
      // 服务器响应错误
      const status = error.response.status
      
      switch (status) {
        case 400:
          return { code: 'BAD_REQUEST', message: '请求参数错误' }
        case 401:
          return { code: 'UNAUTHORIZED', message: '认证失败，请重新登录' }
        case 403:
          return { code: 'FORBIDDEN', message: '权限不足' }
        case 404:
          return { code: 'NOT_FOUND', message: '请求的资源不存在' }
        case 429:
          return { code: 'RATE_LIMIT', message: '请求过于频繁，请稍后再试' }
        case 500:
          return { code: 'SERVER_ERROR', message: '服务器内部错误' }
        case 502:
        case 503:
        case 504:
          return { code: 'NETWORK_ERROR', message: '网络连接错误，请检查网络' }
        default:
          return { code: 'UNKNOWN_ERROR', message: `服务器错误 (${status})` }
      }
    } else if (error.request) {
      // 网络错误
      return { code: 'NETWORK_ERROR', message: '网络连接失败，请检查网络连接' }
    } else {
      // 客户端错误
      return { code: 'CLIENT_ERROR', message: error.message || '未知错误' }
    }
  }

  // 重试机制
  static async withRetry<T>(
    apiCall: () => Promise<T>,
    config: Partial<RetryConfig> = {}
  ): Promise<T> {
    const finalConfig = { ...this.defaultConfig, ...config }
    let lastError: any

    for (let attempt = 0; attempt <= finalConfig.maxRetries; attempt++) {
      try {
        return await apiCall()
      } catch (error) {
        lastError = error
        const errorInfo = this.categorizeError(error)
        
        // 如果是客户端错误或认证错误，不重试
        if (['CLIENT_ERROR', 'UNAUTHORIZED', 'FORBIDDEN'].includes(errorInfo.code)) {
          break
        }

        // 如果是最后一次尝试，抛出错误
        if (attempt === finalConfig.maxRetries) {
          break
        }

        // 计算延迟时间（指数退避）
        const delay = finalConfig.retryDelay * Math.pow(finalConfig.backoffMultiplier, attempt)
        
        console.log(`API调用失败，第${attempt + 1}次重试，延迟${delay}ms`)
        await new Promise(resolve => setTimeout(resolve, delay))
      }
    }

    throw lastError
  }

  // 优雅降级：提供模拟数据
  static getFallbackData(operation: string): any {
    const fallbacks: Record<string, any> = {
      'conversation-analysis': {
        conversationAnalysis: {
          overallSentiment: 'neutral',
          communicationStyle: 'cooperative',
          emotionalIntelligence: 0.7,
          conflictLevel: 0.3,
          empathyScore: 0.75
        },
        participantAnalysis: {
          user: {
            emotionalState: '中性',
            communicationStyle: '开放',
            needs: ['理解', '沟通'],
            strengths: ['表达清晰', '耐心']
          },
          other: {
            emotionalState: '中性',
            communicationStyle: '合作',
            needs: ['尊重', '解决方案'],
            strengths: ['逻辑清晰', '理性']
          }
        },
        improvementSuggestions: [
          '网络连接不稳定，建议使用离线分析功能',
          '可以尝试重新连接网络后再次分析'
        ],
        responseTemplates: [
          '当前使用离线模式分析，结果仅供参考',
          '建议在网络稳定时重新进行完整分析'
        ]
      },
      'content-generation': {
        content: '由于网络连接问题，当前使用离线模式生成内容。建议在网络稳定时重新生成以获得更准确的结果。',
        suggestions: ['检查网络连接', '稍后重试']
      }
    }

    return fallbacks[operation] || null
  }

  // 错误报告
  static reportError(error: ApiError, context: string) {
    // 在实际应用中，这里可以集成错误报告服务
    console.error(`[${context}] API错误:`, error)
    
    // 可以发送到错误监控服务
    // this.sendToMonitoringService(error, context)
  }

  // 用户友好的错误消息
  static getUserFriendlyMessage(error: ApiError): string {
    const messages: Record<string, string> = {
      'NETWORK_ERROR': '网络连接失败，请检查网络设置',
      'SERVER_ERROR': '服务器暂时不可用，请稍后重试',
      'RATE_LIMIT': '操作过于频繁，请稍后再试',
      'UNAUTHORIZED': '登录已过期，请重新登录',
      'FORBIDDEN': '没有权限执行此操作',
      'BAD_REQUEST': '请求参数有误，请检查后重试',
      'NOT_FOUND': '请求的内容不存在'
    }

    return messages[error.code] || error.message || '发生未知错误，请重试'
  }
}

// 改进的API调用钩子
export function useApiWithErrorHandling<T, P extends any[] = any[]>(
  apiFunction: (...args: P) => Promise<T>,
  options: {
    operation: string
    enableRetry?: boolean
    enableFallback?: boolean
    retryConfig?: Partial<RetryConfig>
  }
) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<ApiError | null>(null)
  const [retryCount, setRetryCount] = useState(0)

  const execute = async (...args: P): Promise<T | null> => {
    setLoading(true)
    setError(null)
    setRetryCount(0)

    try {
      let result: T

      if (options.enableRetry) {
        result = await ApiErrorHandler.withRetry(
          () => apiFunction(...args),
          options.retryConfig
        )
      } else {
        result = await apiFunction(...args)
      }

      setData(result)
      setLoading(false)
      return result
    } catch (error) {
      const apiError = ApiErrorHandler.categorizeError(error)
      
      // 报告错误
      ApiErrorHandler.reportError(apiError, options.operation)
      
      setError(apiError)
      setLoading(false)

      // 如果启用优雅降级，返回模拟数据
      if (options.enableFallback) {
        const fallbackData = ApiErrorHandler.getFallbackData(options.operation)
        if (fallbackData) {
          setData(fallbackData as T)
          console.log('使用优雅降级数据')
          return fallbackData as T
        }
      }

      return null
    }
  }

  const retry = async (...args: P) => {
    setRetryCount(prev => prev + 1)
    return execute(...args)
  }

  const clearError = () => {
    setError(null)
  }

  return {
    data,
    loading,
    error,
    retryCount,
    execute,
    retry,
    clearError
  }
}

// 错误边界组件
export class ApiErrorBoundary extends React.Component<
  {
    children: React.ReactNode
    fallback?: React.ComponentType<{ error: ApiError; retry: () => void }>
  },
  { hasError: boolean; error: ApiError | null }
> {
  constructor(props: any) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: any) {
    return {
      hasError: true,
      error: ApiErrorHandler.categorizeError(error)
    }
  }

  componentDidCatch(error: any, errorInfo: any) {
    ApiErrorHandler.reportError(
      ApiErrorHandler.categorizeError(error),
      'Error Boundary'
    )
  }

  retry = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback
        return React.createElement(FallbackComponent, { error: this.state.error, retry: this.retry })
      }

      return React.createElement(
        'div',
        { className: "p-4 bg-red-50 border border-red-200 rounded-lg" },
        React.createElement(
          'h3',
          { className: "text-red-800 font-medium" },
          ApiErrorHandler.getUserFriendlyMessage(this.state.error)
        ),
        React.createElement(
          'button',
          {
            onClick: this.retry,
            className: "mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          },
          '重试'
        )
      )
    }

    return this.props.children
  }
}