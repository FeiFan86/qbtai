'use client'

import React, { useState, useEffect } from 'react'
import { GameLayout } from '@/components/game/GameLayout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { 
  Utensils, 
  Play, 
  RotateCw, 
  Plus, 
  Trash2,
  Star,
  Heart,
  Clock,
  Zap,
  Filter
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface FoodOption {
  id: string
  name: string
  category: 'chinese' | 'western' | 'fastfood' | 'healthy' | 'dessert' | 'other'
  preference: number // 1-5 的偏好程度
  lastChosen: Date | null
}

const DEFAULT_FOODS: FoodOption[] = [
  { id: '1', name: '火锅', category: 'chinese', preference: 5, lastChosen: null },
  { id: '2', name: '烧烤', category: 'chinese', preference: 4, lastChosen: null },
  { id: '3', name: '披萨', category: 'western', preference: 3, lastChosen: null },
  { id: '4', name: '汉堡', category: 'fastfood', preference: 2, lastChosen: null },
  { id: '5', name: '沙拉', category: 'healthy', preference: 3, lastChosen: null },
  { id: '6', name: '寿司', category: 'other', preference: 4, lastChosen: null },
  { id: '7', name: '炒饭', category: 'chinese', preference: 3, lastChosen: null },
  { id: '8', name: '冰淇淋', category: 'dessert', preference: 5, lastChosen: null },
]

const CATEGORY_CONFIG = {
  chinese: { label: '中餐', color: 'bg-red-100 text-red-800', icon: '🥡' },
  western: { label: '西餐', color: 'bg-blue-100 text-blue-800', icon: '🍕' },
  fastfood: { label: '快餐', color: 'bg-yellow-100 text-yellow-800', icon: '🍔' },
  healthy: { label: '健康', color: 'bg-green-100 text-green-800', icon: '🥗' },
  dessert: { label: '甜点', color: 'bg-pink-100 text-pink-800', icon: '🍰' },
  other: { label: '其他', color: 'bg-purple-100 text-purple-800', icon: '🍣' }
} as const

export default function WhatToEatPage() {
  const [foods, setFoods] = useState<FoodOption[]>(DEFAULT_FOODS)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [newFoodName, setNewFoodName] = useState('')
  const [newFoodCategory, setNewFoodCategory] = useState<FoodOption['category']>('chinese')
  const [selectedFood, setSelectedFood] = useState<FoodOption | null>(null)
  const [isSelecting, setIsSelecting] = useState(false)
  const [selectionHistory, setSelectionHistory] = useState<FoodOption[]>([])

  // 从本地存储加载数据
  useEffect(() => {
    const savedFoods = localStorage.getItem('what-to-eat-foods')
    const savedHistory = localStorage.getItem('what-to-eat-history')
    
    if (savedFoods) {
      setFoods(JSON.parse(savedFoods))
    }
    if (savedHistory) {
      setSelectionHistory(JSON.parse(savedHistory))
    }
  }, [])

  // 保存数据到本地存储
  useEffect(() => {
    localStorage.setItem('what-to-eat-foods', JSON.stringify(foods))
    localStorage.setItem('what-to-eat-history', JSON.stringify(selectionHistory))
  }, [foods, selectionHistory])

  const filteredFoods = foods.filter(food => 
    selectedCategory === 'all' || food.category === selectedCategory
  )

  const addFood = () => {
    if (!newFoodName.trim()) return

    const newFood: FoodOption = {
      id: Date.now().toString(),
      name: newFoodName.trim(),
      category: newFoodCategory,
      preference: 3, // 默认中等偏好
      lastChosen: null
    }

    setFoods(prev => [...prev, newFood])
    setNewFoodName('')
  }

  const deleteFood = (id: string) => {
    setFoods(prev => prev.filter(food => food.id !== id))
  }

  const updatePreference = (id: string, preference: number) => {
    setFoods(prev => prev.map(food => 
      food.id === id ? { ...food, preference } : food
    ))
  }

  const selectRandomFood = () => {
    if (filteredFoods.length === 0) return

    setIsSelecting(true)
    
    // 基于偏好权重进行随机选择
    const weights = filteredFoods.map(food => {
      // 偏好权重 + 时间衰减权重（最近选择的降低概率）
      let weight = food.preference
      
      if (food.lastChosen) {
        const daysSinceLastChosen = (Date.now() - new Date(food.lastChosen).getTime()) / (1000 * 60 * 60 * 24)
        // 如果7天内选择过，降低权重
        if (daysSinceLastChosen < 7) {
          weight *= Math.max(0.1, 1 - (7 - daysSinceLastChosen) / 7)
        }
      }
      
      return weight
    })

    // 动画效果：快速切换几个选项
    let count = 0
    const maxCount = 10
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * filteredFoods.length)
      setSelectedFood(filteredFoods[randomIndex])
      count++

      if (count >= maxCount) {
        clearInterval(interval)
        
        // 最终选择基于权重
        const totalWeight = weights.reduce((sum, weight) => sum + weight, 0)
        let random = Math.random() * totalWeight
        let selectedIndex = 0
        
        for (let i = 0; i < weights.length; i++) {
          random -= weights[i]
          if (random <= 0) {
            selectedIndex = i
            break
          }
        }

        const finalSelection = filteredFoods[selectedIndex]
        setSelectedFood(finalSelection)
        
        // 更新最后选择时间
        setFoods(prev => prev.map(food => 
          food.id === finalSelection.id 
            ? { ...food, lastChosen: new Date() }
            : food
        ))
        
        // 添加到历史记录
        setSelectionHistory(prev => [finalSelection, ...prev.slice(0, 9)])
        
        setTimeout(() => setIsSelecting(false), 1000)
      }
    }, 100)
  }

  const quickSelect = () => {
    // 快速选择（不显示动画）
    if (filteredFoods.length === 0) return
    
    const randomIndex = Math.floor(Math.random() * filteredFoods.length)
    const selection = filteredFoods[randomIndex]
    
    setSelectedFood(selection)
    setFoods(prev => prev.map(food => 
      food.id === selection.id 
        ? { ...food, lastChosen: new Date() }
        : food
    ))
    setSelectionHistory(prev => [selection, ...prev.slice(0, 9)])
  }

  const clearSelection = () => {
    setSelectedFood(null)
  }

  return (
    <GameLayout
      title="今天吃什么"
      description="解决选择困难症的实用工具"
      showSettings
      showShare
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左侧 - 食物列表和添加 */}
        <div className="lg:col-span-2 space-y-6">
          {/* 添加新食物 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Plus className="h-5 w-5 text-green-500" />
                <span>添加食物选项</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  value={newFoodName}
                  onChange={(e) => setNewFoodName(e.target.value)}
                  placeholder="输入食物名称..."
                  className="flex-1"
                  onKeyPress={(e) => e.key === 'Enter' && addFood()}
                />
                <select
                  value={newFoodCategory}
                  onChange={(e) => setNewFoodCategory(e.target.value as FoodOption['category'])}
                  className="px-3 py-2 border rounded-lg"
                >
                  {Object.entries(CATEGORY_CONFIG).map(([key, config]) => (
                    <option key={key} value={key}>
                      {config.icon} {config.label}
                    </option>
                  ))}
                </select>
                <Button onClick={addFood} disabled={!newFoodName.trim()}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 食物列表 */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center space-x-2">
                  <Utensils className="h-5 w-5 text-orange-500" />
                  <span>食物选项</span>
                </CardTitle>
                
                {/* 分类筛选 */}
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-gray-500" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="text-sm border rounded-lg px-2 py-1"
                  >
                    <option value="all">全部</option>
                    {Object.entries(CATEGORY_CONFIG).map(([key, config]) => (
                      <option key={key} value={key}>
                        {config.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {filteredFoods.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  暂无食物选项，请先添加一些食物
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {filteredFoods.map((food) => {
                    const config = CATEGORY_CONFIG[food.category]
                    return (
                      <div key={food.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <span className="text-xl">{config.icon}</span>
                          <div>
                            <div className="font-medium">{food.name}</div>
                            <div className={`text-xs px-2 py-1 rounded-full ${config.color}`}>
                              {config.label}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          {/* 偏好设置 */}
                          <div className="flex space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                onClick={() => updatePreference(food.id, star)}
                                className="text-yellow-400 hover:text-yellow-500"
                              >
                                <Star 
                                  className={`h-4 w-4 ${star <= food.preference ? 'fill-current' : ''}`}
                                />
                              </button>
                            ))}
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteFood(food.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* 右侧 - 选择和历史 */}
        <div className="space-y-6">
          {/* 选择区域 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Play className="h-5 w-5 text-purple-500" />
                <span>今天吃什么</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <AnimatePresence mode="wait">
                {selectedFood ? (
                  <motion.div
                    key="selected"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.2 }}
                    className="text-center py-6"
                  >
                    <div className="text-6xl mb-4">
                      {CATEGORY_CONFIG[selectedFood.category].icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {selectedFood.name}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      看起来不错！今天就去吃这个吧
                    </p>
                    <div className="flex space-x-2">
                      <Button variant="outline" onClick={clearSelection} className="flex-1">
                        重新选择
                      </Button>
                      <Button 
                        onClick={selectRandomFood} 
                        className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600"
                        disabled={isSelecting}
                      >
                        <RotateCw className="h-4 w-4 mr-2" />
                        再选一次
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="not-selected"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-8"
                  >
                    <Utensils className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg mb-2">准备选择今天的食物</p>
                    <p className="text-gray-400 text-sm mb-6">点击下方按钮开始选择</p>
                    
                    <div className="flex space-x-2">
                      <Button
                        onClick={quickSelect}
                        variant="outline"
                        className="flex-1"
                        disabled={filteredFoods.length === 0}
                      >
                        <Zap className="h-4 w-4 mr-2" />
                        快速选择
                      </Button>
                      <Button
                        onClick={selectRandomFood}
                        disabled={filteredFoods.length === 0 || isSelecting}
                        className="flex-1 bg-gradient-to-r from-green-500 to-teal-600"
                      >
                        <Play className="h-4 w-4 mr-2" />
                        {isSelecting ? '选择中...' : '开始选择'}
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>

          {/* 选择历史 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-blue-500" />
                <span>最近选择</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectionHistory.length === 0 ? (
                <div className="text-center py-4 text-gray-500">
                  暂无选择记录
                </div>
              ) : (
                <div className="space-y-2">
                  {selectionHistory.map((food, index) => {
                    const config = CATEGORY_CONFIG[food.category]
                    return (
                      <div key={index} className="flex items-center space-x-3 p-2 border rounded-lg">
                        <span className="text-2xl">{config.icon}</span>
                        <div className="flex-1">
                          <div className="font-medium">{food.name}</div>
                          <div className="text-xs text-gray-500">
                            {food.lastChosen ? 
                              new Date(food.lastChosen).toLocaleDateString('zh-CN') : 
                              '刚刚'
                            }
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </GameLayout>
  )
}