import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '丘比特AI情感助手',
  description: '基于火山引擎DeepSeek模型的智能情感分析和社交助手',
  keywords: 'AI, 情感分析, 社交助手, 丘比特, 深度求索',
  authors: [{ name: '丘比特AI团队' }],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#e91e63',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
          {children}
        </div>
      </body>
    </html>
  )
}