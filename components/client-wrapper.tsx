'use client'

import React, { ReactNode, useEffect, useState } from 'react'

interface ClientWrapperProps {
  children: ReactNode
  fallback?: ReactNode
}

export function ClientWrapper({ children, fallback }: ClientWrapperProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // 只在客户端渲染
  if (!isClient) {
    return fallback || <div>Loading...</div>
  }

  return <>{children}</>
}