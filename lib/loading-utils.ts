'use client'

import { useState, useCallback } from 'react'

export interface ApiCallOptions {
  maxRetries?: number
  retryDelay?: number
  timeout?: number
}

export interface ApiCallState<T> {
  data: T | null
  loading: boolean
  error: string | null
  retryCount: number
}

export function useApiCall<T>() {
  const [state, setState] = useState<ApiCallState<T>>({
    data: null,
    loading: false,
    error: null,
    retryCount: 0
  })

  const callApi = useCallback(async (
    apiCall: () => Promise<T>,
    options: ApiCallOptions = {}
  ): Promise<T> => {
    const {
      maxRetries = 3,
      retryDelay = 1000,
      timeout = 30000
    } = options

    let retryCount = 0

    const executeCall = async (): Promise<T> => {
      setState(prev => ({ ...prev, loading: true, error: null }))

      try {
        // 设置超时
        const timeoutPromise = new Promise<never>((_, reject) => {
          setTimeout(() => reject(new Error('请求超时')), timeout)
        })

        const data = await Promise.race([apiCall(), timeoutPromise])
        
        setState({
          data,
          loading: false,
          error: null,
          retryCount: 0
        })
        
        return data
      } catch (error) {
        retryCount++
        
        if (retryCount <= maxRetries) {
          // 等待一段时间后重试
          await new Promise(resolve => setTimeout(resolve, retryDelay * retryCount))
          return executeCall()
        }

        const errorMessage = error instanceof Error ? error.message : '请求失败'
        
        setState({
          data: null,
          loading: false,
          error: errorMessage,
          retryCount
        })
        
        throw error
      }
    }

    return executeCall()
  }, [])

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
      retryCount: 0
    })
  }, [])

  return {
    ...state,
    callApi,
    reset
  }
}

// 模拟数据生成器，用于优雅降级
export function generateMockData<T>(mockData: T, delay: number = 1000): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockData), delay)
  })
}

// 错误处理工具
export class ErrorHandler {
  static handleApiError(error: any): string {
    if (error?.response?.status === 401) {
      return '认证失败，请重新登录'
    }
    if (error?.response?.status === 403) {
      return '权限不足，无法访问此资源'
    }
    if (error?.response?.status === 404) {
      return '请求的资源不存在'
    }
    if (error?.response?.status >= 500) {
      return '服务器错误，请稍后重试'
    }
    if (error?.message === 'Network Error') {
      return '网络连接失败，请检查网络设置'
    }
    if (error?.message === '请求超时') {
      return '请求超时，请检查网络连接'
    }
    
    return error?.message || '未知错误，请稍后重试'
  }

  static shouldRetry(error: any): boolean {
    // 网络错误和服务器错误可以重试
    const retryableErrors = [
      'Network Error',
      '请求超时',
      'ECONNREFUSED',
      'ETIMEDOUT'
    ]
    
    return (
      retryableErrors.some(msg => error?.message?.includes(msg)) ||
      error?.response?.status >= 500
    )
  }
}