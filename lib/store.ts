import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

// 定义情感分析结果的类型
export interface EmotionAnalysisResult {
  id: string
  timestamp: string | Date
  input: string
  type: 'text' | 'voice' | 'image'
  result: {
    emotions: Array<{
      type: string
      score: number
      color: string
    }>
    overall: {
      sentiment: 'positive' | 'negative' | 'neutral'
      confidence: number
    }
    keywords: string[]
    summary: string
  }
}

// 定义内容生成结果的类型
export interface ContentGenerationResult {
  id: string
  timestamp: string | Date
  prompt: string
  style: string
  length: string
  context?: string
  result: {
    content: string
    suggestions: string[]
  }
}

// 定义社交分析结果的类型
export interface SocialAnalysisResult {
  id: string
  timestamp: string | Date
  conversation: string
  context?: string
  scenario: string
  result: {
    emotionAnalysis: {
      participants: string[]
      emotions: Array<{
        participant: string
        emotions: string[]
        score: number
      }>
      overallTone: string
    }
    communicationPatterns: {
      pattern: string
      effectiveness: number
      issues: string[]
    }
    suggestions: {
      strategies: string[]
      phraseSuggestions: string[]
      improvements: string[]
    }
    outcome: {
      currentTrajectory: string
      idealOutcome: string
      nextSteps: string[]
    }
  }
}

// 定义用户设置的类型
export interface UserSettings {
  theme: 'light' | 'dark' | 'system'
  language: 'zh' | 'en'
  notifications: boolean
  autoSave: boolean
  dataRetention: number // 天数
}

// 应用状态管理
interface AppState {
  // 用户相关
  user: {
    isLoggedIn: boolean
    settings: UserSettings
  }
  
  // 数据相关
  emotionHistory: EmotionAnalysisResult[]
  contentHistory: ContentGenerationResult[]
  socialHistory: SocialAnalysisResult[]
  
  // UI状态
  ui: {
    isLoading: boolean
    activeTab: string
    sidebarOpen: boolean
  }
  
  // 操作方法
  updateUserSettings: (settings: Partial<UserSettings>) => void
  addEmotionAnalysis: (result: EmotionAnalysisResult) => void
  addContentGeneration: (result: ContentGenerationResult) => void
  addSocialAnalysis: (result: SocialAnalysisResult) => void
  removeEmotionAnalysis: (id: string) => void
  clearHistory: (type: 'all' | 'emotion' | 'content' | 'social') => void
  setLoading: (loading: boolean) => void
  setActiveTab: (tab: string) => void
  toggleSidebar: () => void
}

// 默认用户设置
const defaultUserSettings: UserSettings = {
  theme: 'system',
  language: 'zh',
  notifications: true,
  autoSave: true,
  dataRetention: 30
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // 初始状态
      user: {
        isLoggedIn: false,
        settings: defaultUserSettings
      },
      
      emotionHistory: [],
      contentHistory: [],
      socialHistory: [],
      
      ui: {
        isLoading: false,
        activeTab: 'emotion-analysis',
        sidebarOpen: false
      },
      
      // 操作方法
      updateUserSettings: (settings) => set((state) => ({
        user: {
          ...state.user,
          settings: { ...state.user.settings, ...settings }
        }
      })),
      
      addEmotionAnalysis: (result) => set((state) => ({
        emotionHistory: [result, ...state.emotionHistory].slice(0, 100) // 只保留最近100条
      })),
      
      addContentGeneration: (result) => set((state) => ({
        contentHistory: [result, ...state.contentHistory].slice(0, 100) // 只保留最近100条
      })),
      
      addSocialAnalysis: (result) => set((state) => ({
        socialHistory: [result, ...state.socialHistory].slice(0, 100) // 只保留最近100条
      })),
      
      removeEmotionAnalysis: (id) => set((state) => ({
        emotionHistory: state.emotionHistory.filter(entry => entry.id !== id)
      })),
      
      clearHistory: (type) => {
        if (type === 'all') {
          set({ emotionHistory: [], contentHistory: [], socialHistory: [] })
        } else if (type === 'emotion') {
          set({ emotionHistory: [] })
        } else if (type === 'content') {
          set({ contentHistory: [] })
        } else if (type === 'social') {
          set({ socialHistory: [] })
        }
      },
      
      setLoading: (loading) => set((state) => ({
        ui: { ...state.ui, isLoading: loading }
      })),
      
      setActiveTab: (tab) => set((state) => ({
        ui: { ...state.ui, activeTab: tab }
      })),
      
      toggleSidebar: () => set((state) => ({
        ui: { ...state.ui, sidebarOpen: !state.ui.sidebarOpen }
      }))
    }),
    {
      name: 'cupid-ai-storage',
      storage: createJSONStorage(() => localStorage),
      // 只持久化这些字段
      partialize: (state) => ({
        user: state.user,
        emotionHistory: state.emotionHistory,
        contentHistory: state.contentHistory,
        socialHistory: state.socialHistory
      })
    }
  )
)

// 数据同步服务（用于未来与后端API同步）
export class DataSyncService {
  // 同步情感分析数据
  static async syncEmotionData(data: EmotionAnalysisResult[]) {
    try {
      // 这里实现与后端API的同步逻辑
      console.log('同步情感数据:', data)
      return { success: true }
    } catch (error) {
      console.error('同步情感数据失败:', error)
      return { success: false, error }
    }
  }
  
  // 同步内容生成数据
  static async syncContentData(data: ContentGenerationResult[]) {
    try {
      // 这里实现与后端API的同步逻辑
      console.log('同步内容数据:', data)
      return { success: true }
    } catch (error) {
      console.error('同步内容数据失败:', error)
      return { success: false, error }
    }
  }
  
  // 同步社交分析数据
  static async syncSocialData(data: SocialAnalysisResult[]) {
    try {
      // 这里实现与后端API的同步逻辑
      console.log('同步社交数据:', data)
      return { success: true }
    } catch (error) {
      console.error('同步社交数据失败:', error)
      return { success: false, error }
    }
  }
}