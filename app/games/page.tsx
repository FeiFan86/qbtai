'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Gamepad2, Heart, MessageCircle, Users, Trophy, Star } from 'lucide-react'
import GlobalNavbar from '@/components/global-navbar'
import UsageGuard, { UsageStatus } from '@/components/usage-guard'

export default function GamesPage() {
  const games = [
    {
      id: 1,
      title: '情感树洞',
      description: '安全私密的情感分享空间',
      icon: <Heart className="h-6 w-6" />,
      color: 'from-rose-400 to-pink-600',
      players: '2人+',
      difficulty: '简单'
    },
    {
      id: 2,
      title: '真心话大冒险',
      description: '增进了解的互动游戏',
      icon: <MessageCircle className="h-6 w-6" />,
      color: 'from-purple-400 to-indigo-600',
      players: '2人',
      difficulty: '中等'
    },
    {
      id: 3,
      title: '默契挑战',
      description: '测试情侣默契度',
      icon: <Users className="h-6 w-6" />,
      color: 'from-blue-400 to-cyan-600',
      players: '2人',
      difficulty: '中等'
    },
    {
      id: 4,
      title: '情感记忆拼图',
      description: '重温美好回忆',
      icon: <Trophy className="h-6 w-6" />,
      color: 'from-green-400 to-teal-600',
      players: '2人',
      difficulty: '简单'
    },
    {
      id: 5,
      title: '协作涂鸦板',
      description: '共同创作艺术作品',
      icon: <Star className="h-6 w-6" />,
      color: 'from-orange-400 to-red-600',
      players: '2人+',
      difficulty: '简单'
    },
    {
      id: 6,
      title: '关系飞行棋',
      description: '情感话题棋盘游戏',
      icon: <Gamepad2 className="h-6 w-6" />,
      color: 'from-pink-400 to-purple-600',
      players: '2人',
      difficulty: '中等'
    }
  ]

  return (
    <UsageGuard feature="games">
      {({ canUse, remainingUses, onUse, isLoading, usageText }) => (
        <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
          {/* 导航栏 */}
          <GlobalNavbar />

      {/* 主要内容 */}
      <main className="pt-16">
        <div className="container py-12">
          {/* 页面标题 */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 mb-4">
              <Gamepad2 className="h-5 w-5 text-rose-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">互动游戏</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              情感互动游戏
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              通过精心设计的互动游戏，增进感情深度，创造美好回忆
            </p>
          </div>

          {/* 使用状态提示 */}
          <div className="max-w-4xl mx-auto mb-6">
            <UsageStatus feature="games" className="justify-center" />
          </div>

          {/* 游戏列表 */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {games.map((game) => (
              <div
                key={game.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${game.color} text-white mb-4`}>
                  {game.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {game.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {game.description}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>{game.players}</span>
                  <span>{game.difficulty}</span>
                </div>
                <button 
                  className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-2 rounded-lg font-medium hover:from-rose-600 hover:to-pink-600 transition-all group-hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!canUse}
                >
                  {isLoading ? '加载中...' : '开始游戏'}
                </button>
                {!canUse && (
                  <p className="text-sm text-amber-600 mt-2 text-center">
                    使用次数已用完，请登录或等待重置
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* 游戏统计 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">游戏数据</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <div className="text-2xl font-bold text-rose-600 mb-1">6</div>
                <div className="text-sm text-gray-500">游戏总数</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600 mb-1">20K+</div>
                <div className="text-sm text-gray-500">活跃玩家</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600 mb-1">98%</div>
                <div className="text-sm text-gray-500">满意度</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600 mb-1">24/7</div>
                <div className="text-sm text-gray-500">在线支持</div>
              </div>
            </div>
          </div>
            </div>
          </main>

          {/* 页脚 */}
          <footer className="bg-gray-50 border-t border-gray-200">
            <div className="container py-8">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <div className="w-6 h-6 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full flex items-center justify-center">
                    <Gamepad2 className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-gray-900 font-semibold">丘比特AI情感助手</span>
                </div>
                <p className="text-gray-600 text-sm">
                  © 2024 专为情侣设计的情感助手平台. 让爱更美好.
                </p>
              </div>
            </div>
          </footer>
        </div>
      )}
    </UsageGuard>
  )
}