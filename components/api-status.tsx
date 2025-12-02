'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export function ApiStatus() {
  const [status, setStatus] = useState<'loading' | 'online' | 'offline'>('loading')
  const [responseTime, setResponseTime] = useState<number>(0)

  useEffect(() => {
    const checkApiStatus = async () => {
      const startTime = Date.now()
      
      try {
        const response = await fetch('/api/test')
        const endTime = Date.now()
        
        if (response.ok) {
          setStatus('online')
          setResponseTime(endTime - startTime)
        } else {
          setStatus('offline')
        }
      } catch (error) {
        setStatus('offline')
      }
    }

    checkApiStatus()
    const interval = setInterval(checkApiStatus, 30000) // 每30秒检查一次

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = () => {
    switch (status) {
      case 'online':
        return 'bg-green-100 text-green-800'
      case 'offline':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-yellow-100 text-yellow-800'
    }
  }

  const getStatusText = () => {
    switch (status) {
      case 'online':
        return '在线'
      case 'offline':
        return '离线'
      default:
        return '检查中...'
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          系统状态
          <Badge className={getStatusColor()}>
            {getStatusText()}
          </Badge>
        </CardTitle>
        <CardDescription>
          监控后端API服务的运行状态
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">API服务</span>
            <span className="font-medium">
              {status === 'online' ? '正常运行' : '服务异常'}
            </span>
          </div>
          
          {status === 'online' && (
            <div className="flex justify-between">
              <span className="text-gray-500">响应时间</span>
              <span className="font-medium">{responseTime}ms</span>
            </div>
          )}
          
          <div className="flex justify-between">
            <span className="text-gray-500">服务类型</span>
            <span className="font-medium">模拟API (开发环境)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}