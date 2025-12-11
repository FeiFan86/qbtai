'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Utensils, RotateCcw, Share2, MapPin, 
  DollarSign, Clock, Zap, Heart, Star, Users 
} from 'lucide-react'
import GlobalNavbar from '@/components/global-navbar'
import UsageGuard, { UsageStatus } from '@/components/usage-guard'
import GamePageTemplate from '@/components/game-page-template'
import GameCard from '@/components/game-card'

type CuisineType = 'chinese' | 'western' | 'japanese' | 'korean' | 'thai' | 'fastfood'
type BudgetType = 'cheap' | 'medium' | 'expensive'
type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack'

interface FoodOption {
  id: number
  name: string
  cuisine: CuisineType
  budget: BudgetType
  meal: MealType
  description: string
  cookingTime: string
  priceRange: string
  popularity: number
  shareable: boolean
}

export default function WhatToEatToday() {
  return (
    <UsageGuard feature="games">
      {({ canUse, remainingUses, onUse, isLoading, usageText }) => (
        <GamePageTemplate
          title="今天吃什么"
          description="解决"今天吃什么"的世纪难题，让选择变得有趣！"
          icon={<Utensils className="h-8 w-8 text-white" />}
          bgGradient="bg-gradient-to-br from-orange-50/80 via-white to-red-50/80"
        >
          <div className="max-w-2xl mx-auto">
            <div className="text-center py-8">
              <div className="text-6xl mb-4">🍽️</div>
              <button
                onClick={() => alert('功能开发中')}
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-xl font-bold text-lg"
              >
                <Utensils className="h-5 w-5 mr-2 inline" />
                随机选择美食
              </button>
            </div>
          </div>
        </GamePageTemplate>
      )}
    </UsageGuard>
  )
}
