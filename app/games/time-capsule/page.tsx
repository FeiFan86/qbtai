'use client'

import React, { useState } from 'react'
import { Clock, Share2, RotateCcw } from 'lucide-react'
import UnifiedGameTemplate from '@/components/unified-game-template'

export default function TimeCapsulePage() {
  const [message, setMessage] = useState('')
  const [targetDate, setTargetDate] = useState('')
  const [capsuleCreated, setCapsuleCreated] = useState(false)

  const createTimeCapsule = () => {
    if (message && targetDate) {
      setCapsuleCreated(true)
    }
  }

  const handleShare = () => {
    navigator.clipboard.writeText(`时间胶囊内容：${message}\n开启时间：${targetDate}`)
    alert('时间胶囊信息已复制！')
  }

  return (
    <UnifiedGameTemplate
      title="时间胶囊"
      description="为未来的你们留下美好回忆和期待"
      icon={<Clock className="h-8 w-8 text-white" />}
      feature="games"
    >
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">⏰</div>
          <h3 className="text-xl font-semibold text-gray-900">创建时间胶囊</h3>
          <p className="text-gray-600 mt-2">为未来的你们留下特别的回忆</p>
        </div>

        {!capsuleCreated ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">给未来的留言</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full h-32 border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="写下你想对未来的你们说的话..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">开启时间</label>
              <input
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={createTimeCapsule}
              className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
            >
              创建时间胶囊
            </button>
          </div>
        ) : (
          <div className="text-center space-y-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="text-4xl mb-4">📦</div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">时间胶囊已创建！</h4>
              <p className="text-gray-600">将在 {targetDate} 自动开启</p>
            </div>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setCapsuleCreated(false)}
                className="bg-gray-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-600 transition-colors flex items-center"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                重新创建
              </button>
              <button
                onClick={handleShare}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center"
              >
                <Share2 className="h-4 w-4 mr-2" />
                分享胶囊
              </button>
            </div>
          </div>
        )}
      </div>
    </UnifiedGameTemplate>
  )
}