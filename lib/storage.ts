// 本地存储工具函数
import { EmotionAnalysisResponse } from './volcano-api'

export interface HistoryRecord {
  id: string
  type: 'emotion' | 'social' | 'content'
  timestamp: number
  input: string
  result: any
  title?: string
}

class LocalStorageManager {
  private readonly STORAGE_KEY = 'cupid-ai-history'

  // 获取历史记录
  getHistory(): HistoryRecord[] {
    if (typeof window === 'undefined') return []
    
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.error('读取历史记录失败:', error)
      return []
    }
  }

  // 添加新记录
  addRecord(record: Omit<HistoryRecord, 'id'>): void {
    if (typeof window === 'undefined') return
    
    try {
      const history = this.getHistory()
      const newRecord: HistoryRecord = {
        ...record,
        id: Date.now().toString()
      }
      
      // 保持最多50条记录
      const updatedHistory = [newRecord, ...history].slice(0, 50)
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedHistory))
    } catch (error) {
      console.error('保存历史记录失败:', error)
    }
  }

  // 删除记录
  deleteRecord(id: string): void {
    if (typeof window === 'undefined') return
    
    try {
      const history = this.getHistory()
      const updatedHistory = history.filter(record => record.id !== id)
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedHistory))
    } catch (error) {
      console.error('删除记录失败:', error)
    }
  }

  // 清空历史记录
  clearHistory(): void {
    if (typeof window === 'undefined') return
    
    try {
      localStorage.removeItem(this.STORAGE_KEY)
    } catch (error) {
      console.error('清空历史记录失败:', error)
    }
  }

  // 获取特定类型的记录
  getRecordsByType(type: HistoryRecord['type']): HistoryRecord[] {
    return this.getHistory().filter(record => record.type === type)
  }

  // 获取最近记录
  getRecentRecords(limit: number = 5): HistoryRecord[] {
    return this.getHistory().slice(0, limit)
  }
}

export const storageManager = new LocalStorageManager()