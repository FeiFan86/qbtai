// 统一错误处理
import React from 'react'

interface ErrorInfo {
  code: string
  message: string
  details?: any
  timestamp: string
}

export class ErrorHandler {
  private static errorLog: ErrorInfo[] = []
  private static maxLogSize = 100

  // 错误类型定义
  static readonly ERROR_TYPES = {
    NETWORK: 'network_error',
    AUTH: 'authentication_error',
    VALIDATION: 'validation_error',
    SERVER: 'server_error',
    CLIENT: 'client_error',
    UNKNOWN: 'unknown_error'
  }

  // 处理错误
  static handle(error: any, context?: string): ErrorInfo {
    const errorInfo = this.normalizeError(error, context)
    
    // 记录错误
    this.logError(errorInfo)
    
    // 根据错误类型执行不同处理策略
    this.executeErrorStrategy(errorInfo)
    
    return errorInfo
  }

  // 标准化错误信息
  private static normalizeError(error: any, context?: string): ErrorInfo {
    let code = this.ERROR_TYPES.UNKNOWN
    let message = '未知错误'
    let details = null

    if (error instanceof Error) {
      message = error.message
      
      // 网络错误
      if (message.includes('fetch') || message.includes('network')) {
        code = this.ERROR_TYPES.NETWORK
      }
      
      // 认证错误
      if (message.includes('auth') || message.includes('token') || message.includes('login')) {
        code = this.ERROR_TYPES.AUTH
      }
    } else if (typeof error === 'string') {
      message = error
    }

    // API响应错误
    if (error?.status) {
      switch (error.status) {
        case 400:
          code = this.ERROR_TYPES.VALIDATION
          message = error.message || '请求参数错误'
          break
        case 401:
          code = this.ERROR_TYPES.AUTH
          message = error.message || '认证失败，请重新登录'
          break
        case 403:
          code = this.ERROR_TYPES.AUTH
          message = error.message || '权限不足'
          break
        case 404:
          code = this.ERROR_TYPES.CLIENT
          message = error.message || '资源不存在'
          break
        case 500:
          code = this.ERROR_TYPES.SERVER
          message = error.message || '服务器内部错误'
          break
      }
      details = error
    }

    return {
      code,
      message: context ? `[${context}] ${message}` : message,
      details,
      timestamp: new Date().toISOString()
    }
  }

  // 记录错误日志
  private static logError(errorInfo: ErrorInfo): void {
    this.errorLog.push(errorInfo)
    
    // 限制日志大小
    if (this.errorLog.length > this.maxLogSize) {
      this.errorLog = this.errorLog.slice(-this.maxLogSize)
    }

    // 开发环境打印错误
    if (process.env.NODE_ENV === 'development') {
      console.error('错误信息:', errorInfo)
    }
  }

  // 执行错误处理策略
  private static executeErrorStrategy(errorInfo: ErrorInfo): void {
    switch (errorInfo.code) {
      case this.ERROR_TYPES.NETWORK:
        this.handleNetworkError(errorInfo)
        break
      case this.ERROR_TYPES.AUTH:
        this.handleAuthError(errorInfo)
        break
      case this.ERROR_TYPES.SERVER:
        this.handleServerError(errorInfo)
        break
      default:
        this.handleGenericError(errorInfo)
        break
    }
  }

  // 网络错误处理
  private static handleNetworkError(errorInfo: ErrorInfo): void {
    // 显示网络错误提示
    this.showToast('网络连接失败，请检查网络连接')
    
    // 记录到错误监控系统
    this.reportToMonitoring(errorInfo)
  }

  // 认证错误处理
  private static handleAuthError(errorInfo: ErrorInfo): void {
    // 清除用户认证信息
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cupidai_token')
      localStorage.removeItem('cupidai_user')
    }
    
    // 跳转到登录页面
    if (typeof window !== 'undefined') {
      window.location.href = '/login'
    }
    
    this.showToast('登录已过期，请重新登录')
  }

  // 服务器错误处理
  private static handleServerError(errorInfo: ErrorInfo): void {
    this.showToast('服务器繁忙，请稍后重试')
    this.reportToMonitoring(errorInfo)
  }

  // 通用错误处理
  private static handleGenericError(errorInfo: ErrorInfo): void {
    this.showToast(errorInfo.message)
    this.reportToMonitoring(errorInfo)
  }

  // 显示错误提示
  private static showToast(message: string): void {
    // 这里可以集成UI组件库的Toast组件
    if (typeof window !== 'undefined') {
      // 简单的alert提示，实际项目中应该使用更优雅的UI组件
      console.warn('Toast消息:', message)
    }
  }

  // 上报到错误监控系统
  private static reportToMonitoring(errorInfo: ErrorInfo): void {
    // 实际项目中可以集成Sentry、Bugsnag等错误监控服务
    console.log('上报错误到监控系统:', errorInfo)
  }

  // 获取错误日志
  static getErrorLog(): ErrorInfo[] {
    return [...this.errorLog]
  }

  // 清空错误日志
  static clearErrorLog(): void {
    this.errorLog = []
  }

  // 创建错误边界
  static createErrorBoundary() {
    return class ErrorBoundary extends React.Component<
      { children: React.ReactNode; fallback?: React.ReactNode },
      { hasError: boolean }
    > {
      constructor(props: any) {
        super(props)
        this.state = { hasError: false }
      }

      static getDerivedStateFromError() {
        return { hasError: true }
      }

      componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        ErrorHandler.handle(error, 'ReactErrorBoundary')
      }

      render(): React.ReactNode {
        if (this.state.hasError) {
          return this.props.fallback || React.createElement(
            'div',
            { className: 'p-4 bg-red-50 border border-red-200 rounded' },
            React.createElement('h3', { className: 'text-red-800 font-semibold' }, '出错了'),
            React.createElement('p', { className: 'text-red-600' }, '页面加载失败，请刷新重试')
          )
        }

        return this.props.children
      }
    }
  }
}

// 创建错误边界组件
export const ErrorBoundary = ErrorHandler.createErrorBoundary()