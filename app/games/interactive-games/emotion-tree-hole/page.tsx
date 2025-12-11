'use client'

import React from 'react'
import { TreePine } from 'lucide-react'
import UnifiedGameTemplate from '@/components/unified-game-template'

export default function EmotionTreeHolePage() {
  return (
    <UnifiedGameTemplate
      title="情感树洞"
      description="倾诉心声，互相理解"
      icon={<TreePine className="h-8 w-8 text-white" />}
      feature="games"
    >
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="text-center">
          <div className="text-6xl mb-4">🌳</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">情感树洞</h3>
          <p className="text-gray-600 mb-6">倾诉心声，互相理解</p>
          
          <textarea 
            className="w-full h-32 border border-gray-200 rounded-lg p-4 mb-4"
            placeholder="写下你想说的话..."
          />
          
          <button className="bg-green-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600 transition-colors">
            分享心声
          </button>
        </div>
      </div>
    </UnifiedGameTemplate>
  )
}