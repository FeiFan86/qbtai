'use client'

import React from 'react'
import { Palette } from 'lucide-react'
import UnifiedGameTemplate from '@/components/unified-game-template'

export default function CollaborativeDoodlePage() {
  return (
    <UnifiedGameTemplate
      title="协作涂鸦"
      description="一起创作艺术作品，增进默契"
      icon={<Palette className="h-8 w-8 text-white" />}
      feature="games"
    >
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="text-center">
          <div className="text-6xl mb-4">🎨</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">协作涂鸦</h3>
          <p className="text-gray-600 mb-6">一起创作属于你们的艺术作品</p>
          
          <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center mb-6">
            <p className="text-gray-500">涂鸦画板区域</p>
          </div>
          
          <button className="bg-purple-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-600 transition-colors">
            开始创作
          </button>
        </div>
      </div>
    </UnifiedGameTemplate>
  )
}