import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/components/auth-provider'
import { ClientWrapper } from '@/components/client-wrapper'
import ErrorBoundary from '@/components/error-boundary'
import GlobalErrorHandler from '@/components/global-error-handler'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '丘比特AI情感助手 - 专为情侣设计的互动游戏平台',
  description: '专为情侣设计的互动游戏平台，包含多种有趣的互动游戏，帮助情侣增进感情，创造美好回忆。',
  keywords: '情侣游戏,互动游戏,情感助手,情侣互动,关系增进',
}

// 静态生成标记
export const dynamic = 'force-dynamic'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" className="h-full">
      <body className={`${inter.className} h-full bg-gray-50`} suppressHydrationWarning>
        <GlobalErrorHandler />
        <ClientWrapper fallback={<div className="min-h-screen flex items-center justify-center">加载中...</div>}>
          <ErrorBoundary>
            <AuthProvider>
              <div className="min-h-full flex flex-col">
                {children}
              </div>
            </AuthProvider>
          </ErrorBoundary>
        </ClientWrapper>
      </body>
    </html>
  )
}