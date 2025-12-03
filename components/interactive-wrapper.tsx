'use client'

import React, { ComponentType, ReactNode, useEffect, useState, useRef } from 'react'

interface InteractiveWrapperProps {
  children: ReactNode
}

export function InteractiveWrapper({ children }: InteractiveWrapperProps) {
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
  }, [])
  
  return <>{children}</>
}

// 高阶组件，用于包装需要客户端交互的组件
export function withInteractive<P extends object>(WrappedComponent: ComponentType<P>) {
  return function InteractiveComponent(props: P) {
    return (
      <InteractiveWrapper>
        <WrappedComponent {...props} />
      </InteractiveWrapper>
    )
  }
}