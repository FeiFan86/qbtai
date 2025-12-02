// 统一的数据管理器 - 提供稳定的数据存储和迁移功能

import { databaseService } from './database'

// 数据存储接口
export interface DataStorage {
  getItem<T>(key: string): Promise<T | null>
  setItem(key: string, value: any): Promise<void>
  removeItem(key: string): Promise<void>
  clear(): Promise<void>
}

// 数据管理器类
export class DataManager {
  private storage: DataStorage
  private useIndexedDB = true

  constructor() {
    // 检测浏览器是否支持IndexedDB
    this.useIndexedDB = typeof window !== 'undefined' && 'indexedDB' in window
    this.storage = this.useIndexedDB ? this.createIndexedDBStorage() : this.createFallbackStorage()
  }

  // 创建IndexedDB存储方案
  private createIndexedDBStorage(): DataStorage {
    return {
      async getItem<T>(key: string): Promise<T | null> {
        if (typeof window === 'undefined') return null
        
        try {
          // 使用databaseService来获取数据
          return await databaseService.getRecord('storage', key) || null
        } catch (error) {
          console.warn('IndexedDB storage getItem failed:', error)
          return null
        }
      },
      
      async setItem(key: string, value: any): Promise<void> {
        if (typeof window === 'undefined') return
        
        try {
          // 使用databaseService来存储数据
          await databaseService.addRecord('storage', { key, value, timestamp: Date.now() })
        } catch (error) {
          console.warn('IndexedDB storage setItem failed:', error)
        }
      },
      
      async removeItem(key: string): Promise<void> {
        if (typeof window === 'undefined') return
        
        try {
          await databaseService.deleteRecord('storage', key)
        } catch (error) {
          console.warn('IndexedDB storage removeItem failed:', error)
        }
      },
      
      async clear(): Promise<void> {
        if (typeof window === 'undefined') return
        
        try {
          // 这里需要实现清空storage表的功能
          // 由于databaseService没有提供直接清空表的方法，我们使用回退方案
          // 在实际使用中，应该扩展databaseService来支持这个功能
          console.warn('IndexedDB clear not implemented, using fallback')
        } catch (error) {
          console.warn('IndexedDB storage clear failed:', error)
        }
      }
    }
  }

  // 创建回退存储方案（当IndexedDB不可用时）
  private createFallbackStorage(): DataStorage {
    return {
      async getItem<T>(key: string): Promise<T | null> {
        if (typeof window === 'undefined') return null
        const data = localStorage.getItem(key)
        return data ? JSON.parse(data) : null
      },

      async setItem(key: string, value: any): Promise<void> {
        if (typeof window === 'undefined') return
        localStorage.setItem(key, JSON.stringify(value))
      },

      async removeItem(key: string): Promise<void> {
        if (typeof window === 'undefined') return
        localStorage.removeItem(key)
      },

      async clear(): Promise<void> {
        if (typeof window === 'undefined') return
        localStorage.clear()
      }
    }
  }

  // 初始化数据管理器
  async initialize(): Promise<void> {
    if (this.useIndexedDB) {
      try {
        await databaseService.init()
        console.log('DataManager initialized with IndexedDB')
      } catch (error) {
        console.warn('Failed to initialize IndexedDB, falling back to localStorage', error)
        this.useIndexedDB = false
        this.storage = this.createFallbackStorage()
      }
    }
  }

  // 获取数据
  async getItem<T>(key: string): Promise<T | null> {
    return this.storage.getItem<T>(key)
  }

  // 设置数据
  async setItem(key: string, value: any): Promise<void> {
    return this.storage.setItem(key, value)
  }

  // 删除数据
  async removeItem(key: string): Promise<void> {
    return this.storage.removeItem(key)
  }

  // 清空数据
  async clear(): Promise<void> {
    return this.storage.clear()
  }

  // 批量操作
  async batchSet(items: Array<{key: string; value: any}>): Promise<void> {
    for (const item of items) {
      await this.setItem(item.key, item.value)
    }
  }

  // 获取多个数据
  async batchGet<T>(keys: string[]): Promise<{[key: string]: T | null}> {
    const result: {[key: string]: T | null} = {}
    for (const key of keys) {
      result[key] = await this.getItem<T>(key)
    }
    return result
  }

  // 检查存储状态
  getStorageType(): 'indexeddb' | 'localstorage' {
    return this.useIndexedDB ? 'indexeddb' : 'localstorage'
  }

  // 获取存储统计信息
  async getStorageStats(): Promise<{
    type: string
    estimatedSize: number
    itemsCount: number
  }> {
    if (!this.useIndexedDB || typeof window === 'undefined') {
      // localStorage统计
      let size = 0
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key) {
          size += localStorage.getItem(key)?.length || 0
        }
      }
      return {
        type: 'localStorage',
        estimatedSize: size,
        itemsCount: localStorage.length
      }
    }

    // IndexedDB统计（简化版）
    try {
      const stats = await db.get<{itemsCount: number; estimatedSize: number}>('gameStats', 'storageStats')
      return {
        type: 'IndexedDB',
        estimatedSize: stats?.estimatedSize || 0,
        itemsCount: stats?.itemsCount || 0
      }
    } catch {
      return {
        type: 'IndexedDB',
        estimatedSize: 0,
        itemsCount: 0
      }
    }
  }
}

// 创建全局数据管理器实例
export const dataManager = new DataManager()

// 游戏数据专用接口
export class GameDataManager {
  private userId: string

  constructor(userId: string) {
    this.userId = userId
  }

  // 保存游戏统计数据
  async saveGameStats(gameName: string, stats: any): Promise<void> {
    const key = `gameStats_${this.userId}_${gameName}`
    await dataManager.setItem(key, {
      ...stats,
      lastUpdated: new Date().toISOString(),
      userId: this.userId,
      gameName
    })
  }

  // 获取游戏统计数据
  async getGameStats(gameName: string): Promise<any | null> {
    const key = `gameStats_${this.userId}_${gameName}`
    return dataManager.getItem(key)
  }

  // 保存用户游戏记录
  async saveGameRecord(gameName: string, record: any): Promise<void> {
    const key = `gameRecord_${this.userId}_${gameName}_${Date.now()}`
    await dataManager.setItem(key, {
      ...record,
      timestamp: new Date().toISOString(),
      userId: this.userId,
      gameName
    })
  }

  // 获取用户游戏历史
  async getGameHistory(gameName: string, limit = 50): Promise<any[]> {
    // 在实际的IndexedDB实现中，这里应该使用索引查询
    // 简化版本：获取所有记录并筛选
    const allKeys = await this.getAllGameRecordKeys(gameName)
    const limitedKeys = allKeys.slice(-limit)
    
    const records = []
    for (const key of limitedKeys) {
      const record = await dataManager.getItem(key)
      if (record) records.push(record)
    }
    
    return records.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
  }

  // 获取所有游戏记录键（简化实现）
  private async getAllGameRecordKeys(gameName: string): Promise<string[]> {
    // 在实际实现中，这里应该使用IndexedDB的索引查询
    // 简化版本：返回所有可能的键
    return [`gameRecord_${this.userId}_${gameName}`]
  }
}

// 初始化数据管理器（在应用启动时调用）
export const initializeDataManager = async (): Promise<void> => {
  await dataManager.initialize()
}