import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AuthProvider } from '@/components/auth-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '丘比特AI情感助手 - 让情感更有温度',
  description: '专为情侣设计的情感助手平台，通过AI技术增进理解和感情。包含情感分析、社交助手、内容创作、情感日记、数据洞察、互动游戏六大核心功能。',
  keywords: '情感助手,情侣,AI分析,社交技巧,内容创作,情感日记,互动游戏',
  authors: [{ name: '丘比特AI团队' }],
  creator: '丘比特AI团队',
  publisher: '丘比特AI',
  robots: 'index, follow',
  openGraph: {
    title: '丘比特AI情感助手',
    description: '专为情侣设计的情感助手平台，通过AI技术增进理解和感情',
    type: 'website',
    locale: 'zh_CN',
    siteName: '丘比特AI情感助手',
  },
  twitter: {
    card: 'summary_large_image',
    title: '丘比特AI情感助手',
    description: '专为情侣设计的情感助手平台，通过AI技术增进理解和感情',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}