'use client'

import React, { useState } from 'react'
import { PenTool, Share2, RotateCwc } from 'lucide-react'
import UnifiedGameTemplate from '@/components/unified-game-template'

export default function SecretLoveLetterPage() {
  const [letterContent, setLetterContent] = useState('')
  const [isGenerated, setIsGenerated] = useState(false)

  const generateLoveLetter = () => {
    const templates = [
      "亲爱的，我想对你说...",
      "在这个特别的日子里，我想表达...",
      "你是我生命中最美好的礼物..."
    ]
    const randomTemplate = templates[Math.floor(Math.random() * templates.length)]
    setLetterContent(randomTemplate)
    setIsGenerated(true)
  }

  const handleShare = () => {
    if (letterContent) {
      navigator.clipboard.writeText(letterContent)
      alert('情书内容已复制到剪贴板！')
    }
  }

  const handleReset = () => {
    setLetterContent('')
    setIsGenerated(false)
  }

  return (
    <UnifiedGameTemplate
      title="秘密情书"
      description="创作专属情书，表达内心深处的爱意"
      icon={<PenTool className="h-8 w-8 text-white" />}
      feature="games"
    >
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">💌</div>
          <h3 className="text-xl font-semibold text-gray-900">创作你的情书</h3>
          <p className="text-gray-600 mt-2">让AI帮你表达最真挚的情感</p>
        </div>

        {!isGenerated ? (
          <div className="text-center">
            <button
              onClick={generateLoveLetter}
              className="bg-pink-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-pink-600 transition-all"
            >
              <PenTool className="h-5 w-5 mr-2 inline" />
              生成情书模板
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-pink-50 border-2 border-pink-200 rounded-lg p-6">
              <textarea
                value={letterContent}
                onChange={(e) => setLetterContent(e.target.value)}
                className="w-full h-40 bg-transparent text-gray-700 resize-none focus:outline-none"
                placeholder="在这里写下你的情书..."
              />
            </div>
            
            <div className="flex justify-center gap-4">
              <button
                onClick={handleReset}
                className="bg-gray-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-600 transition-colors flex items-center"
              >
                <RotateCwc className="h-4 w-4 mr-2" />
                重新生成
              </button>
              <button
                onClick={handleShare}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center"
              >
                <Share2 className="h-4 w-4 mr-2" />
                分享情书
              </button>
            </div>
          </div>
        )}
      </div>
    </UnifiedGameTemplate>
  )
}