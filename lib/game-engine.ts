// 游戏引擎核心 - 统一管理所有游戏状态和逻辑
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface GameState {
  // 通用游戏状态
  currentGame: string | null
  gameProgress: Record<string, number>
  gameScores: Record<string, number>
  
  // 在线对战相关
  roomId: string | null
  opponentId: string | null
  isOnline: boolean
  
  // 用户设置
  preferences: {
    soundEnabled: boolean
    vibrationEnabled: boolean
    theme: 'light' | 'dark' | 'auto'
  }
  
  // 游戏历史
  gameHistory: Array<{
    gameId: string
    timestamp: Date
    score: number
    duration: number
  }>
}

interface GameActions {
  // 游戏管理
  setCurrentGame: (gameId: string) => void
  updateGameProgress: (gameId: string, progress: number) => void
  updateGameScore: (gameId: string, score: number) => void
  
  // 在线功能
  setRoomId: (roomId: string) => void
  setOpponentId: (opponentId: string) => void
  setIsOnline: (isOnline: boolean) => void
  
  // 设置管理
  setPreferences: (preferences: GameState['preferences']) => void
  
  // 历史记录
  addGameHistory: (gameId: string, score: number, duration: number) => void
  
  // 重置
  resetGame: () => void
}

export const useGameStore = create<GameState & GameActions>()(
  persist(
    (set, get) => ({
      // 初始状态
      currentGame: null,
      gameProgress: {},
      gameScores: {},
      roomId: null,
      opponentId: null,
      isOnline: false,
      preferences: {
        soundEnabled: true,
        vibrationEnabled: true,
        theme: 'auto'
      },
      gameHistory: [],

      // 动作
      setCurrentGame: (gameId) => set({ currentGame: gameId }),
      
      updateGameProgress: (gameId, progress) => 
        set((state) => ({
          gameProgress: { ...state.gameProgress, [gameId]: progress }
        })),
        
      updateGameScore: (gameId, score) =>
        set((state) => ({
          gameScores: { ...state.gameScores, [gameId]: score }
        })),
        
      setRoomId: (roomId) => set({ roomId }),
      setOpponentId: (opponentId) => set({ opponentId }),
      setIsOnline: (isOnline) => set({ isOnline }),
      
      setPreferences: (preferences) => set({ preferences }),
      
      addGameHistory: (gameId, score, duration) =>
        set((state) => ({
          gameHistory: [
            {
              gameId,
              timestamp: new Date(),
              score,
              duration
            },
            ...state.gameHistory.slice(0, 49) // 保留最近50条记录
          ]
        })),
        
      resetGame: () => set({
        currentGame: null,
        roomId: null,
        opponentId: null,
        isOnline: false
      })
    }),
    {
      name: 'game-storage',
      partialize: (state) => ({
        gameProgress: state.gameProgress,
        gameScores: state.gameScores,
        preferences: state.preferences,
        gameHistory: state.gameHistory
      })
    }
  )
)

// 游戏配置定义
export const GAME_CONFIGS = {
  'emotional-treehole': {
    name: '情感树洞',
    description: '安全私密的情感分享空间',
    category: 'communication',
    difficulty: '简单',
    duration: '15-30分钟',
    players: '1-2人',
    features: ['情感分享', '隐私保护', '深度交流']
  },
  'truth-or-dare': {
    name: '真心话大冒险',
    description: '增进了解的互动游戏',
    category: 'fun',
    difficulty: '中等',
    duration: '20-45分钟',
    players: '2人',
    features: ['深度了解', '趣味挑战', '关系突破']
  },
  'compatibility-challenge': {
    name: '默契挑战',
    description: '测试情侣默契度',
    category: 'challenge',
    difficulty: '中等',
    duration: '25-40分钟',
    players: '2人',
    features: ['默契测试', '相似度分析', '关系评估']
  },
  'what-to-eat': {
    name: '今天吃什么',
    description: '解决选择困难症',
    category: 'utility',
    difficulty: '简单',
    duration: '5-10分钟',
    players: '1-2人',
    features: ['智能推荐', '偏好设置', '随机选择']
  },
  'couple-chess': {
    name: '情侣飞行棋',
    description: '情感话题棋盘游戏',
    category: 'game',
    difficulty: '中等',
    duration: '40-90分钟',
    players: '2人',
    features: ['在线对战', '任务系统', '棋盘游戏']
  },
  'memory-puzzle': {
    name: '情感记忆拼图',
    description: '重温美好回忆',
    category: 'emotional',
    difficulty: '简单',
    duration: '30-60分钟',
    players: '2人',
    features: ['回忆重温', '情感强化', '美好时光']
  },
  'personality-analysis': {
    name: '性格分析',
    description: '人格测试与分析',
    category: 'analysis',
    difficulty: '中等',
    duration: '20-40分钟',
    players: '1人',
    features: ['专业测试', '性格报告', '匹配分析']
  },
  'couple-blind-box': {
    name: '情侣盲盒',
    description: '随机惊喜任务',
    category: 'fun',
    difficulty: '简单',
    duration: '20-40分钟',
    players: '2人',
    features: ['随机惊喜', '趣味互动', '创意挑战']
  },
  'secret-love-letter': {
    name: '秘密情书',
    description: '情书创作与分享',
    category: 'creative',
    difficulty: '简单',
    duration: '15-30分钟',
    players: '1人',
    features: ['创意表达', '个性化编辑', '浪漫分享']
  }
} as const

export type GameId = keyof typeof GAME_CONFIGS