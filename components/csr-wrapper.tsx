'use client'

import React, { ComponentType, ReactNode, useEffect, useState } from 'react'

interface CSRWrapperProps {
  children: ReactNode
  fallback?: ReactNode
}

export function CSRWrapper({ children, fallback }: CSRWrapperProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // 在服务端返回fallback，在客户端返回children
  return isMounted ? <>{children}</> : <>{fallback}</>
}

// 高阶组件，用于强制客户端渲染
export function withCSR<P extends object>(WrappedComponent: ComponentType<P>) {
  return function CSRComponent(props: P) {
    return (
      <CSRWrapper>
        <WrappedComponent {...props} />
      </CSRWrapper>
    )
  }
}