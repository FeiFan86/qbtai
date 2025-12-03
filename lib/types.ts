// 情感帖子相关类型定义
export interface EmotionReply {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  content: string;
  likes: string[];
  isAnonymous: boolean;
  timestamp: string;
}

export interface EmotionPost {
  id: string;
  gameType: string;
  userId: string;
  username: string;
  avatar: string;
  title: string;
  content: string;
  category: 'happy' | 'sad' | 'angry' | 'anxious' | 'excited' | 'confused' | 'love' | 'other';
  tags: string[];
  isAnonymous: boolean;
  likes: string[];
  replies: EmotionReply[];
  replyCount: number;
  isFeatured: boolean;
  imageUrl: string;
  timestamp: string;
  likeCount?: number;
  createdAtFormatted?: string;
}

// 用户相关类型定义
export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  createdAt: string;
  lastLogin: string;
  preferences: UserPreferences;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  language: string;
  soundEnabled: boolean;
  notifications: boolean;
}

export interface LoginData {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// 游戏数据相关类型定义
export interface GameData {
  id: string;
  name: string;
  type: string;
  description: string;
  image: string;
  playCount: number;
  rating: number;
  lastPlayed: string;
  gameState: any;
  progress: number;
}

// 成就相关类型定义
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  progress: number;
  target: number;
  category: string;
  points: number;
}

export interface UserAchievement {
  achievementId: string;
  unlockedAt: string;
  progress: number;
}

// 游戏统计数据类型定义
export interface GameStats {
  userId: string;
  totalGamesPlayed: number;
  totalPlayTime: number;
  lastPlayed: string;
  favoriteGame: string;
  achievements: string[];
  highScores: {
    gameId: string;
    score: number;
  }[];
}

// 排行榜数据类型定义
export interface Leaderboard {
  id: string;
  type: 'weekly' | 'monthly' | 'all_time';
  entries: LeaderboardEntry[];
  updatedAt: string;
}

// 游戏会话数据类型定义
export interface GameSession {
  id: string;
  userId: string;
  gameId: string;
  startTime: string;
  endTime?: string;
  duration: number;
  score?: number;
  completion: number;
  data?: any;
}

// 游戏进度数据类型定义
export interface GameProgress {
  userId: string;
  gameId: string;
  progress: number;
  currentLevel?: number;
  unlockedFeatures: string[];
  saveData?: any;
  lastPlayed: string;
}

// 排行榜相关类型定义
export interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  avatar: string;
  score: number;
  achievementsCount: number;
  lastActivity: string;
}

// 数据分析相关类型定义
export interface AnalyticsData {
  userId: string;
  period: string;
  totalPlayTime: number;
  gamesPlayed: number;
  achievementsUnlocked: number;
  averageRating: number;
  activityChart: {
    date: string;
    count: number;
  }[];
  popularGames: {
    gameId: string;
    name: string;
    playCount: number;
  }[];
}

export interface Database {
  users: User[];
  games: GameData[];
  achievements: Achievement[];
  leaderboards: LeaderboardEntry[];
  analytics: AnalyticsData[];
}

// 模拟数据
export const mockData: Database = {
  users: [
    {
      id: 'user_1',
      username: 'testuser',
      email: 'test@example.com',
      avatar: '',
      createdAt: '2024-01-01T00:00:00.000Z',
      lastLogin: '2024-01-01T00:00:00.000Z',
      preferences: {
        theme: 'auto',
        language: 'zh',
        soundEnabled: true,
        notifications: true
      }
    }
  ],
  games: [
    {
      id: 'game_1',
      name: '情感树洞',
      type: 'interactive',
      description: '分享心情，获得支持',
      image: '/images/emotion-tree-hole.jpg',
      playCount: 150,
      rating: 4.5,
      lastPlayed: '2024-01-01T00:00:00.000Z',
      gameState: {},
      progress: 0
    }
  ],
  achievements: [
    {
      id: 'ach_1',
      name: '初次体验',
      description: '完成第一次游戏',
      icon: '🎮',
      unlocked: false,
      progress: 0,
      target: 1,
      category: 'gameplay',
      points: 10
    }
  ],
  leaderboards: [
    {
      rank: 1,
      userId: 'user_1',
      username: 'testuser',
      avatar: '',
      score: 1000,
      achievementsCount: 5,
      lastActivity: '2024-01-01T00:00:00.000Z'
    }
  ],
  analytics: [
    {
      userId: 'user_1',
      period: 'week',
      totalPlayTime: 360,
      gamesPlayed: 15,
      achievementsUnlocked: 3,
      averageRating: 4.2,
      activityChart: [
        { date: '2024-01-01', count: 5 },
        { date: '2024-01-02', count: 3 }
      ],
      popularGames: [
        { gameId: 'game_1', name: '情感树洞', playCount: 10 }
      ]
    }
  ]
};