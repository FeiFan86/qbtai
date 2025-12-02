import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // 返回环境变量信息（安全版本）
  const envInfo = {
    nodeEnv: process.env.NODE_ENV || 'development',
    nextVersion: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
    timestamp: new Date().toISOString(),
    platform: process.platform,
    apiStatus: 'active',
    availableEndpoints: [
      '/api/chat/emotion',
      '/api/content/generate',
      '/api/emotion/analyze',
      '/api/social/analyze'
    ]
  }

  return NextResponse.json(envInfo)
}