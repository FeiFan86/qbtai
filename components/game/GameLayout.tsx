// 统一的游戏布局组件
import React from 'react'
import { ArrowLeft, Settings, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

interface GameLayoutProps {
  title: string
  description?: string
  children: React.ReactNode
  onBack?: () => void
  showSettings?: boolean
  showShare?: boolean
}

export function GameLayout({
  title,
  description,
  children,
  onBack,
  showSettings = false,
  showShare = false
}: GameLayoutProps) {
  const router = useRouter()

  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      router.back()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 p-4">
      {/* 头部导航 */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBack}
            className="hover:bg-pink-100"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            {description && (
              <p className="text-sm text-gray-600">{description}</p>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {showShare && (
            <Button variant="ghost" size="icon" className="hover:bg-pink-100">
              <Share2 className="h-5 w-5" />
            </Button>
          )}
          {showSettings && (
            <Button variant="ghost" size="icon" className="hover:bg-pink-100">
              <Settings className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>

      {/* 游戏内容区域 */}
      <div className="bg-white rounded-2xl shadow-lg p-6 min-h-[calc(100vh-200px)]">
        {children}
      </div>
    </div>
  )
}