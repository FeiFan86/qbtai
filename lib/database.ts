import { User, GameStats, Achievement, Leaderboard, AnalyticsData, GameSession, GameProgress } from './types';

class DatabaseService {
  private dbName = 'cupid_ai_db';
  private version = 1;
  private db: IDBDatabase | null = null;

  // 初始化数据库
  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        // 创建用户表
        if (!db.objectStoreNames.contains('users')) {
          const userStore = db.createObjectStore('users', { keyPath: 'id' });
          userStore.createIndex('username', 'username', { unique: true });
          userStore.createIndex('email', 'email', { unique: true });
        }

        // 创建游戏统计表
        if (!db.objectStoreNames.contains('gameStats')) {
          const statsStore = db.createObjectStore('gameStats', { keyPath: 'userId' });
          statsStore.createIndex('totalGamesPlayed', 'totalGamesPlayed');
          statsStore.createIndex('lastPlayed', 'lastPlayed');
        }

        // 创建成就表
        if (!db.objectStoreNames.contains('achievements')) {
          const achievementsStore = db.createObjectStore('achievements', { keyPath: 'id' });
          achievementsStore.createIndex('userId', 'userId');
          achievementsStore.createIndex('category', 'category');
        }

        // 创建排行榜表
        if (!db.objectStoreNames.contains('leaderboards')) {
          const leaderboardStore = db.createObjectStore('leaderboards', { keyPath: 'id' });
          leaderboardStore.createIndex('type', 'type');
          leaderboardStore.createIndex('updatedAt', 'updatedAt');
        }

        // 创建游戏会话表
        if (!db.objectStoreNames.contains('gameSessions')) {
          const sessionStore = db.createObjectStore('gameSessions', { keyPath: 'id' });
          sessionStore.createIndex('userId', 'userId');
          sessionStore.createIndex('gameId', 'gameId');
          sessionStore.createIndex('startTime', 'startTime');
        }

        // 创建游戏进度表
        if (!db.objectStoreNames.contains('gameProgress')) {
          const progressStore = db.createObjectStore('gameProgress', { keyPath: ['userId', 'gameId'] });
          progressStore.createIndex('userId', 'userId');
          progressStore.createIndex('gameId', 'gameId');
        }

        // 创建分析数据表
        if (!db.objectStoreNames.contains('analytics')) {
          const analyticsStore = db.createObjectStore('analytics', { keyPath: 'date' });
          analyticsStore.createIndex('date', 'date');
        }
      };
    });
  }

  // 通用CRUD操作
  private async addRecord(storeName: string, data: any): Promise<void> {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.add(data);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  private async getRecord(storeName: string, key: any): Promise<any> {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.get(key);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }

  private async updateRecord(storeName: string, data: any): Promise<void> {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.put(data);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  private async deleteRecord(storeName: string, key: any): Promise<void> {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.delete(key);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  private async getAllRecords(storeName: string): Promise<any[]> {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.getAll();

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }

  // 用户相关操作
  async addUser(user: User): Promise<void> {
    return this.addRecord('users', user);
  }

  async getUser(userId: string): Promise<User | undefined> {
    return this.getRecord('users', userId);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['users'], 'readonly');
      const store = transaction.objectStore('users');
      const index = store.index('username');
      const request = index.get(username);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }

  async updateUser(user: User): Promise<void> {
    return this.updateRecord('users', user);
  }

  // 游戏统计相关操作
  async getGameStats(userId: string): Promise<GameStats | undefined> {
    return this.getRecord('gameStats', userId);
  }

  async updateGameStats(stats: GameStats): Promise<void> {
    return this.updateRecord('gameStats', stats);
  }

  // 成就相关操作
  async getUserAchievements(userId: string): Promise<Achievement[]> {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['achievements'], 'readonly');
      const store = transaction.objectStore('achievements');
      const index = store.index('userId');
      const request = index.getAll(userId);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }

  async addAchievement(achievement: Achievement): Promise<void> {
    return this.addRecord('achievements', achievement);
  }

  async updateAchievement(achievement: Achievement): Promise<void> {
    return this.updateRecord('achievements', achievement);
  }

  // 排行榜相关操作
  async getLeaderboard(type: 'weekly' | 'monthly' | 'all_time'): Promise<Leaderboard | undefined> {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['leaderboards'], 'readonly');
      const store = transaction.objectStore('leaderboards');
      const index = store.index('type');
      const request = index.get(type);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }

  async updateLeaderboard(leaderboard: Leaderboard): Promise<void> {
    return this.updateRecord('leaderboards', leaderboard);
  }

  // 游戏会话相关操作
  async addGameSession(session: GameSession): Promise<void> {
    return this.addRecord('gameSessions', session);
  }

  async getUserGameSessions(userId: string): Promise<GameSession[]> {
    if (!this.db) await this.init();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['gameSessions'], 'readonly');
      const store = transaction.objectStore('gameSessions');
      const index = store.index('userId');
      const request = index.getAll(userId);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }

  // 游戏进度相关操作
  async getGameProgress(userId: string, gameId: string): Promise<GameProgress | undefined> {
    return this.getRecord('gameProgress', [userId, gameId]);
  }

  async updateGameProgress(progress: GameProgress): Promise<void> {
    return this.updateRecord('gameProgress', progress);
  }

  // 分析数据相关操作
  async getAnalyticsData(date: string): Promise<AnalyticsData | undefined> {
    return this.getRecord('analytics', date);
  }

  async updateAnalyticsData(data: AnalyticsData): Promise<void> {
    return this.updateRecord('analytics', data);
  }

  // 获取所有分析数据
  async getAllAnalyticsData(): Promise<AnalyticsData[]> {
    return this.getAllRecords('analytics');
  }

  // 清空数据库（用于测试）
  async clearDatabase(): Promise<void> {
    if (!this.db) await this.init();
    
    const storeNames = ['users', 'gameStats', 'achievements', 'leaderboards', 'gameSessions', 'gameProgress', 'analytics'];
    
    for (const storeName of storeNames) {
      const transaction = this.db!.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      await store.clear();
    }
  }
}

export const databaseService = new DatabaseService();