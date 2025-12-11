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
  const [currentFood, setCurrentFood] = useState<FoodOption | null>(null)
  const [selectedCuisine, setSelectedCuisine] = useState<CuisineType | 'all'>('all')
  const [selectedBudget, setSelectedBudget] = useState<BudgetType | 'all'>('all')
  const [selectedMeal, setSelectedMeal] = useState<MealType | 'all'>('all')
  const [showDetails, setShowDetails] = useState(false)
  const [favorites, setFavorites] = useState<number[]>([])

  // 美食选项数据
  const foodOptions: FoodOption[] = [
    // 中餐
    {
      id: 1,
      name: '红烧肉',
      cuisine: 'chinese',
      budget: 'medium',
      meal: 'dinner',
      description: '传统中式菜肴，肥瘦相间，色泽红亮，口感软糯香甜',
      cookingTime: '60分钟',
      priceRange: '¥30-50',
      popularity: 95,
      shareable: true
    },
    {
      id: 2,
      name: '宫保鸡丁',
      cuisine: 'chinese',
      budget: 'cheap',
      meal: 'lunch',
      description: '川菜经典，鸡肉嫩滑，花生香脆，麻辣鲜香',
      cookingTime: '30分钟',
      priceRange: '¥20-35',
      popularity: 90,
      shareable: true
    },
    
    // 西餐
    {
      id: 3,
      name: '意大利面',
      cuisine: 'western',
      budget: 'cheap',
      meal: 'dinner',
      description: '经典番茄肉酱意面，面条Q弹，酱汁浓郁',
      cookingTime: '25分钟',
      priceRange: '¥25-40',
      popularity: 88,
      shareable: true
    },
    {
      id: 4,
      name: '牛排',
      cuisine: 'western',
      budget: 'expensive',
      meal: 'dinner',
      description: '精选牛肉，外焦里嫩，配以黑胡椒酱汁',
      cookingTime: '40分钟',
      priceRange: '¥80-150',
      popularity: 85,
      shareable: true
    },
    
    // 日料
    {
      id: 5,
      name: '寿司拼盘',
      cuisine: 'japanese',
      budget: 'medium',
      meal: 'lunch',
      description: '新鲜三文鱼、金枪鱼等寿司组合，口感清淡鲜美',
      cookingTime: '45分钟',
      priceRange: '¥50-80',
      popularity: 92,
      shareable: true
    },
    
    // 快餐
    {
      id: 6,
      name: '汉堡套餐',
      cuisine: 'fastfood',
      budget: 'cheap',
      meal: 'lunch',
      description: '经典牛肉汉堡，配薯条和可乐，满足感十足',
      cookingTime: '15分钟',
      priceRange: '¥25-45',
      popularity: 82,
      shareable: false
    },
    
    // 韩餐
    {
      id: 7,
      name: '韩式拌饭',
      cuisine: 'korean',
      budget: 'cheap',
      meal: 'lunch',
      description: '五彩蔬菜配牛肉和米饭，营养丰富，口味平衡',
      cookingTime: '35分钟',
      priceRange: '¥20-35',
      popularity: 87,
      shareable: true
    },
    
    // 泰餐
    {
      id: 8,
      name: '冬阴功汤',
      cuisine: 'thai',
      budget: 'medium',
      meal: 'dinner',
      description: '酸辣鲜香的泰式汤品，虾肉Q弹，香料浓郁',
      cookingTime: '40分钟',
      priceRange: '¥35-60',
      popularity: 84,
      shareable: true
    }
  ]

  const cuisineOptions = [
    { value: 'all', label: '全部菜系', icon: '🌍' },
    { value: 'chinese', label: '中餐', icon: '🥢' },
    { value: 'western', label: '西餐', icon: '🍝' },
    { value: 'japanese', label: '日料', icon: '🍣' },
    { value: 'korean', label: '韩餐', icon: '🥩' },
    { value: 'thai', label: '泰餐', icon: '🍲' },
    { value: 'fastfood', label: '快餐', icon: '🍔' }
  ]

  const budgetOptions = [
    { value: 'all', label: '全部预算', icon: '💰' },
    { value: 'cheap', label: '经济实惠', icon: '💸' },
    { value: 'medium', label: '中等价位', icon: '💵' },
    { value: 'expensive', label: '豪华大餐', icon: '💎' }
  ]

  const mealOptions = [
    { value: 'all', label: '全部时段', icon: '🕒' },
    { value: 'breakfast', label: '早餐', icon: '🌅' },
    { value: 'lunch', label: '午餐', icon: '☀️' },
    { value: 'dinner', label: '晚餐', icon: '🌙' },
    { value: 'snack', label: '小吃', icon: '🍿' }
  ]

  const getFilteredFoods = () => {
    return foodOptions.filter(food => {
      const cuisineMatch = selectedCuisine === 'all' || food.cuisine === selectedCuisine
      const budgetMatch = selectedBudget === 'all' || food.budget === selectedBudget
      const mealMatch = selectedMeal === 'all' || food.meal === selectedMeal
      return cuisineMatch && budgetMatch && mealMatch
    })
  }

  const pickRandomFood = async (onUse: () => Promise<void>) => {
    const filteredFoods = getFilteredFoods()
    if (filteredFoods.length === 0) {
      alert('没有找到符合条件的食物，请调整筛选条件')
      return
    }
    
    await onUse()
    const randomIndex = Math.floor(Math.random() * filteredFoods.length)
    setCurrentFood(filteredFoods[randomIndex])
    setShowDetails(false)
  }

  const toggleFavorite = (foodId: number) => {
    setFavorites(prev => 
      prev.includes(foodId) 
        ? prev.filter(id => id !== foodId)
        : [...prev, foodId]
    )
  }

  const shareFood = () => {
    if (!currentFood) return
    
    const shareText = `🍽️ 美食推荐：${currentFood.name}

${currentFood.description}

💰 价格：${currentFood.priceRange}
⏰ 时间：${currentFood.cookingTime}
🍴 菜系：getCuisineLabel(currentFood.cuisine)}

今天一起吃这个吧！😋`
    
    if (navigator.share) {
      navigator.share({
        title: '今天吃什么推荐',
        text: shareText
      })
    } else {
      navigator.clipboard.writeText(shareText)
      alert('美食推荐已复制到剪贴板，可以分享给朋友！')
    }
  }

  const getCuisineLabel = (cuisine: CuisineType) => {
    const cuisineMap = {
      chinese: '中餐',
      western: '西餐',
      japanese: '日料',
      korean: '韩餐',
      thai: '泰餐',
      fastfood: '快餐'
    }
    return cuisineMap[cuisine]
  }

  const getCuisineColor = (cuisine: CuisineType) => {
    const colorMap = {
      chinese: 'bg-red-100 text-red-700',
      western: 'bg-blue-100 text-blue-700',
      japanese: 'bg-pink-100 text-pink-700',
      korean: 'bg-orange-100 text-orange-700',
      thai: 'bg-purple-100 text-purple-700',
      fastfood: 'bg-yellow-100 text-yellow-700'
    }
    return colorMap[cuisine]
  }

  const getBudgetColor = (budget: BudgetType) => {
    const colorMap = {
      cheap: 'bg-green-100 text-green-700',
      medium: 'bg-yellow-100 text-yellow-700',
      expensive: 'bg-red-100 text-red-700'
    }
    return colorMap[budget]
  }

  return (
    <UsageGuard feature="games">
      {({ canUse, remainingUses, onUse, isLoading, usageText }) => (
        <GamePageTemplate
          title="今天吃什么"
          description="解决'今天吃什么'的世纪难题，让选择变得有趣！"
          icon={<Utensils className="h-8 w-8 text-white" />}
          bgGradient="bg-gradient-to-br from-orange-50/80 via-white to-red-50/80"
        >
          {/* 使用状态提示 */}
          <div className="max-w-md mx-auto mb-8">
            <div className="bg-white/80 backdrop-blur-md px-6 py-3 rounded-xl shadow-lg border border-white/30 text-center">
              <span className="text-sm text-gray-600">
                {usageText}
              </span>
            </div>
          </div>

          {/* 筛选条件 */}
          <div className="max-w-2xl mx-auto mb-8">
            <GameCard
              title="筛选条件"
              icon={<Utensils className="h-5 w-5 text-white" />}
            >
                  
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">菜系</label>
                  <select
                    value={selectedCuisine}
                    onChange={(e) => setSelectedCuisine(e.target.value as CuisineType | 'all')}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    {cuisineOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.icon} {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">预算</label>
                  <select
                    value={selectedBudget}
                    onChange={(e) => setSelectedBudget(e.target.value as BudgetType | 'all')}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    {budgetOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.icon} {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">时段</label>
                  <select
                    value={selectedMeal}
                    onChange={(e) => setSelectedMeal(e.target.value as MealType | 'all')}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    {mealOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.icon} {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="mt-4 text-sm text-gray-500">
                符合条件的选项：{getFilteredFoods().length} 种
              </div>
            </GameCard>
          </div>

          {/* 主游戏区域 */}
          <div className="max-w-2xl mx-auto">
            {!currentFood ? (
              <GameCard
                title="开始选择"
                description="点击按钮，让命运决定你今天的美食！"
                icon={<Zap className="h-5 w-5 text-white" />}
              >
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">🍽️</div>
                  <button
                    onClick={() => pickRandomFood(onUse)}
                    disabled={!canUse}
                    className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-orange-600 hover:to-red-600 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Utensils className="h-5 w-5 mr-2 inline" />
                    随机选择美食
                  </button>
                  <p className="text-gray-500 text-sm mt-4">
                    根据你的筛选条件，从 {getFilteredFoods().length} 种美食中随机选择
                  </p>
                </div>
              </GameCard>
            ) : (
              <GameCard
                title={currentFood.name}
                description={currentFood.description}
                icon={<Utensils className="h-5 w-5 text-white" />}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCuisineColor(currentFood.cuisine)}`}>
                    {getCuisineLabel(currentFood.cuisine)}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBudgetColor(currentFood.budget)}`}>
                    {currentFood.budget === 'cheap' ? '经济实惠' : currentFood.budget === 'medium' ? '中等价位' : '豪华大餐'}
                  </span>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-sm text-gray-600">{currentFood.popularity}%</span>
                  </div>
                  <button
                    onClick={() => toggleFavorite(currentFood.id)}
                    className="ml-auto"
                  >
                    <Heart className={`h-5 w-5 ${favorites.includes(currentFood.id) ? 'text-red-500 fill-red-500' : 'text-gray-400'}`} />
                  </button>
                </div>
                
                <div className="space-y-2 mb-6">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>制作时间：{currentFood.cookingTime}</span>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-2" />
                    <span>价格范围：{currentFood.priceRange}</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-2" />
                    <span>受欢迎度：{currentFood.popularity}%</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    <span>适合分享</span>
                  </div>
                </div>
                
                {showDetails && (
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2">美食小贴士</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• 搭配建议：根据季节选择配菜和饮品</li>
                      <li>• 健康提示：注意营养均衡，适量食用</li>
                      <li>• 烹饪技巧：可以尝试不同的调味方式</li>
                    </ul>
                  </div>
                )}
                
                <div className="flex gap-3">
                  <button
                    onClick={() => pickRandomFood(onUse)}
                    disabled={!canUse}
                    className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-medium hover:from-orange-600 hover:to-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <RotateCcw className="h-4 w-4 mr-2 inline" />
                    重新选择
                  </button>
                  
                  <button
                    onClick={shareFood}
                    className="flex items-center justify-center px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <Share2 className="h-4 w-4" />
                  </button>
                  
                  <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="flex items-center justify-center px-4 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    <MapPin className="h-4 w-4" />
                  </button>
                </div>
              </GameCard>
            )}

            {!canUse && (
              <div className="text-center text-amber-600 mt-4">
                <p>使用次数已用完，请登录或等待重置</p>
              </div>
            )}

            {/* 收藏列表 */}
            {favorites.length > 0 && (
              <div className="max-w-2xl mx-auto mt-8">
                <GameCard
                  title="我的收藏"
                  icon={<Heart className="h-5 w-5 text-white" />}
                >
                  <div className="grid gap-3">
                    {favorites.map(foodId => {
                      const food = foodOptions.find(f => f.id === foodId)
                      if (!food) return null
                      return (
                        <div key={food.id} className="bg-red-50 border border-red-200 rounded-lg p-3">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-red-800">{food.name}</span>
                            <button
                              onClick={() => toggleFavorite(food.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Heart className="h-4 w-4" fill="currentColor" />
                            </button>
                          </div>
                          <p className="text-red-700 text-sm mt-1">{food.description}</p>
                        </div>
                      )
                    })}
                  </div>
                </GameCard>
              </div>
            )}
          </div>
        </GamePageTemplate>
      )}
    </UsageGuard>
  )
}