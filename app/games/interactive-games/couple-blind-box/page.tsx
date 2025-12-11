'use client'

import React from 'react'
import { Gift } from 'lucide-react'
import UnifiedGameTemplate from '@/components/unified-game-template'

export default function CoupleBlindBoxPage() {
  return (
    <UnifiedGameTemplate
      title="情侣盲盒"
      description="随机抽取有趣的互动任务"
      icon={<Gift className="h-8 w-8 text-white" />}
      feature="games"
    >
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="text-center">
          <div className="text-6xl mb-4">🎁</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">情侣盲盒</h3>
          <p className="text-gray-600 mb-6">随机抽取有趣的互动任务</p>
          
          <button className="bg-blue-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-600 transition-all">
            打开盲盒
          </button>
        </div>
      </div>
    </UnifiedGameTemplate>
  )
}