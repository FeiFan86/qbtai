import { NextResponse } from 'next/server'

// API 响应类型定义
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// API 错误类型定义
export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public details?: any
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

// API 请求配置
export interface ApiRequestConfig extends RequestInit {
  timeout?: number
  retry?: number
}

// API 客户端类
export class ApiClient {
  private baseUrl: string
  private defaultHeaders: HeadersInit

  constructor(baseUrl: string = '') {
    this.baseUrl = baseUrl
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    }
  }

  // 设置认证 token
  setAuthToken(token: string) {
    this.defaultHeaders = {
      ...this.defaultHeaders,
      'Authorization': `Bearer ${token}`
    }
  }

  // 清除认证 token
  clearAuthToken() {
    const { Authorization, ...headers } = this.defaultHeaders as any
    this.defaultHeaders = headers
  }

  // 通用请求方法
  async request<T = any>(
    endpoint: string,
    config: ApiRequestConfig = {}
  ): Promise<ApiResponse<T>> {
    const {
      timeout = 10000,
      retry = 3,
      ...requestConfig
    } = config

    const url = `${this.baseUrl}${endpoint}`
    let lastError: Error | null = null

    for (let attempt = 1; attempt <= retry; attempt++) {
      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), timeout)

        const response = await fetch(url, {
          ...requestConfig,
          headers: {
            ...this.defaultHeaders,
            ...requestConfig.headers,
          },
          signal: controller.signal,
        })

        clearTimeout(timeoutId)

        if (!response.ok) {
          throw new ApiError(
            response.status,
            `HTTP error! status: ${response.status}`,
            { status: response.status, statusText: response.statusText }
          )
        }

        const data = await response.json()
        
        if (!data.success) {
          throw new ApiError(
            response.status,
            data.error || 'API request failed',
            data
          )
        }

        return data

      } catch (error) {
        lastError = error as Error
        
        // 如果是中止错误或非重试错误，直接抛出
        if (error instanceof Error && error.name === 'AbortError') {
          throw new ApiError(408, 'Request timeout')
        }

        // 如果是认证错误，不重试
        if (error instanceof ApiError && error.statusCode >= 400 && error.statusCode < 500) {
          throw error
        }

        // 最后一次尝试，抛出错误
        if (attempt === retry) {
          throw lastError
        }

        // 等待一段时间后重试
        await this.delay(Math.pow(2, attempt) * 100)
      }
    }

    throw lastError || new ApiError(500, 'Unknown error occurred')
  }

  // 延迟函数
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  // GET 请求
  async get<T = any>(endpoint: string, config?: ApiRequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'GET',
      ...config,
    })
  }

  // POST 请求
  async post<T = any>(endpoint: string, data?: any, config?: ApiRequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
      ...config,
    })
  }

  // PUT 请求
  async put<T = any>(endpoint: string, data?: any, config?: ApiRequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
      ...config,
    })
  }

  // DELETE 请求
  async delete<T = any>(endpoint: string, config?: ApiRequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
      ...config,
    })
  }
}

// 创建全局 API 客户端实例
export const apiClient = new ApiClient(process.env.NEXT_PUBLIC_API_URL || '')

// 错误处理工具函数
export const handleApiError = (error: unknown): ApiResponse => {
  if (error instanceof ApiError) {
    return {
      success: false,
      error: error.message,
      message: `API Error (${error.statusCode}): ${error.message}`
    }
  }

  if (error instanceof Error) {
    return {
      success: false,
      error: error.message,
      message: `Unexpected error: ${error.message}`
    }
  }

  return {
    success: false,
    error: 'Unknown error',
    message: 'An unknown error occurred'
  }
}

// 验证响应数据格式
export const validateApiResponse = <T>(response: ApiResponse<T>): boolean => {
  if (typeof response !== 'object' || response === null) {
    return false
  }

  if (typeof response.success !== 'boolean') {
    return false
  }

  if (response.success && !response.data) {
    return false
  }

  if (!response.success && !response.error) {
    return false
  }

  return true
}

// API 响应包装器（用于服务器端 API）
export const apiResponse = <T = any>(
  success: boolean,
  data?: T,
  error?: string,
  message?: string
): ApiResponse<T> => {
  return {
    success,
    data,
    error,
    message
  }
}

// 成功响应包装器
export const successResponse = <T = any>(data: T, message?: string): ApiResponse<T> => {
  return apiResponse(true, data, undefined, message)
}

// 错误响应包装器
export const errorResponse = (error: string, message?: string): ApiResponse => {
  return apiResponse(false, undefined, error, message)
}

// Next.js API 路由响应包装器
export const createApiResponse = <T = any>(
  success: boolean,
  data?: T,
  error?: string,
  status: number = 200
): NextResponse<ApiResponse<T>> => {
  const response = apiResponse(success, data, error)
  return NextResponse.json(response, { status })
}

// 创建成功响应
export const createSuccessResponse = <T = any>(
  data: T,
  status: number = 200
): NextResponse<ApiResponse<T>> => {
  return createApiResponse(true, data, undefined, status)
}

// 创建错误响应
export const createErrorResponse = (
  error: string,
  status: number = 400
): NextResponse<ApiResponse> => {
  return createApiResponse(false, undefined, error, status)
}