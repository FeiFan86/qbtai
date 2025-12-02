import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'API服务运行正常',
    timestamp: new Date().toISOString(),
    endpoints: {
      auth: {
        login: '/api/auth/login',
        register: '/api/auth/register',
        verify: '/api/auth/verify'
      },
      achievements: '/api/achievements',
      leaderboards: '/api/leaderboards',
      analytics: '/api/analytics'
    }
  })
}