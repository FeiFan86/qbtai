'use client'

import React from 'react'
import { MessageCircle } from 'lucide-react'
import UnifiedGameTemplate from '@/components/unified-game-template'

export default function ComplaintWallPage() {
  return (
    <UnifiedGameTemplate
      title="吐槽墙"
      description="以轻松的方式表达不满"
      icon={<MessageCircle className="h-8 w-8 text-white" />}
      feature="games"
    >
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="text-center">
          <div className="text-6xl mb-4">💬</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">吐槽墙</h3>
          <p className="text-gray-600 mb-6">以轻松的方式表达不满，增进理解</p>
          
          <textarea 
            className="w-full h-32 border border-gray-200 rounded-lg p-4 mb-4"
            placeholder="写下你的吐槽或建议..."
          />
          
          <button className="bg-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors">
            匿名发布
          </button>
        </div>
      </div>
    </UnifiedGameTemplate>
  )
}