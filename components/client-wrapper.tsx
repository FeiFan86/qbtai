'use client'

import React, { ReactNode, useEffect, useState } from 'react'

interface ClientWrapperProps {
  children: ReactNode
  fallback?: ReactNode
}

export function ClientWrapper({ children, fallback }: ClientWrapperProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    // 确保在客户端完全加载后再设置状态
    setIsClient(true)
  }, [])

  // 只在客户端渲染
  if (!isClient) {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">加载中...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}