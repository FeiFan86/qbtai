import type { Metadata } from 'next'
import { Inter, Noto_Sans_SC } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/components/auth-provider'
import { ClientWrapper } from '@/components/client-wrapper'
import ErrorBoundary from '@/components/error-boundary'
import GlobalErrorHandler from '@/components/global-error-handler'

// 加载中文字体和英文字体
const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  display: 'swap'
})

const notoSansSC = Noto_Sans_SC({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-noto-sans-sc',
  display: 'swap'
})

export const metadata: Metadata = {
  title: {
    default: '丘比特AI情感助手',
    template: '%s | 丘比特AI情感助手'
  },
  description: '专为情侣设计的互动游戏平台，包含多种有趣的互动游戏，帮助情侣增进感情，创造美好回忆。',
  keywords: '情侣游戏,互动游戏,情感助手,情侣互动,关系增进,AI情感分析',
  authors: [{ name: '丘比特AI团队' }],
  creator: '丘比特AI',
  publisher: '丘比特AI',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'https://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: '/',
    siteName: '丘比特AI情感助手',
    title: '丘比特AI情感助手',
    description: '专为情侣设计的互动游戏平台，包含多种有趣的互动游戏，帮助情侣增进感情，创造美好回忆。',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '丘比特AI情感助手',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '丘比特AI情感助手',
    description: '专为情侣设计的互动游戏平台，包含多种有趣的互动游戏，帮助情侣增进感情，创造美好回忆。',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

// 静态生成标记
export const dynamic = 'force-dynamic'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" className={`${inter.variable} ${notoSansSC.variable} h-full scroll-smooth`}>
      <body 
        className="font-sans h-full min-h-screen antialiased" 
        style={{ fontFamily: 'var(--font-noto-sans-sc), var(--font-inter), system-ui, sans-serif' }}
        suppressHydrationWarning
      >
        <GlobalErrorHandler />
        <ClientWrapper fallback={
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50">
            <div className="text-center">
              <div className="animate-float inline-block">
                <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white shadow-lg">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <p className="mt-4 text-gray-600">加载中...</p>
            </div>
          </div>
        }>
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