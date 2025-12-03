'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Search, 
  Grid3X3, 
  List, 
  Filter,
  Sparkles,
  Flame,
  Users,
  UserPlus,
  Star
} from 'lucide-react'

interface GameFiltersProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  viewMode: 'grid' | 'list'
  onViewModeChange: (mode: 'grid' | 'list') => void
  filterCategory: string
  onFilterChange: (category: string) => void
  gameStats: {
    total: number
    new: number
    hot: number
    filtered: number
  }
}

export function GameFilters({
  searchTerm,
  onSearchChange,
  viewMode,
  onViewModeChange,
  filterCategory,
  onFilterChange,
  gameStats
}: GameFiltersProps) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="搜索游戏名称、描述或标签..."
            className="pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            onClick={() => onViewModeChange('grid')}
            className="px-4 py-2"
            title="网格视图"
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            onClick={() => onViewModeChange('list')}
            className="px-4 py-2"
            title="列表视图"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* 分类筛选 */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Filter className="h-4 w-4" />
          游戏分类
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={filterCategory === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onFilterChange('all')}
            className="px-4 py-2"
          >
            全部游戏
            <Badge variant="secondary" className="ml-2">
              {gameStats.total}
            </Badge>
          </Button>
          <Button
            variant={filterCategory === 'new' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onFilterChange('new')}
            className="px-4 py-2"
          >
            <Sparkles className="w-4 h-4 mr-1" />
            最新上线
            <Badge variant="secondary" className="ml-2">
              {gameStats.new}
            </Badge>
          </Button>
          <Button
            variant={filterCategory === 'hot' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onFilterChange('hot')}
            className="px-4 py-2"
          >
            <Flame className="w-4 h-4 mr-1" />
            热门推荐
            <Badge variant="secondary" className="ml-2">
              {gameStats.hot}
            </Badge>
          </Button>
          <Button
            variant={filterCategory === 'single' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onFilterChange('single')}
            className="px-4 py-2"
          >
            <Users className="w-4 h-4 mr-1" />
            单人游戏
          </Button>
          <Button
            variant={filterCategory === 'multi' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onFilterChange('multi')}
            className="px-4 py-2"
          >
            <UserPlus className="w-4 h-4 mr-1" />
            双人游戏
          </Button>
          <Button
            variant={filterCategory === 'rated' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onFilterChange('rated')}
            className="px-4 py-2"
          >
            <Star className="w-4 h-4 mr-1" />
            高分推荐
          </Button>
        </div>
      </div>
      
      {/* 结果统计 */}
      <div className="mt-4 text-sm text-gray-600">
        找到 <span className="font-semibold text-purple-600">{gameStats.filtered}</span> 个游戏
        {filterCategory !== 'all' && (
          <span>，符合 <span className="font-semibold">{filterCategory}</span> 筛选条件</span>
        )}
      </div>
    </div>
  )
}