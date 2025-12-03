'use client'

import { useEffect } from 'react'

export default function GlobalErrorHandler() {
  useEffect(() => {
    // 处理未捕获的Promise拒绝
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('Unhandled promise rejection:', event.reason)
      // 可以在这里添加错误报告逻辑
      event.preventDefault()
    }

    // 处理未捕获的错误
    const handleError = (event: ErrorEvent) => {
      console.error('Unhandled error:', event.error)
      // 可以在这里添加错误报告逻辑
    }

    window.addEventListener('unhandledrejection', handleUnhandledRejection)
    window.addEventListener('error', handleError)

    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
      window.removeEventListener('error', handleError)
    }
  }, [])

  return null
}