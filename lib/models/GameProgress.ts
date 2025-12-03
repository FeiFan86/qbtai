import mongoose from 'mongoose'

const GameProgressSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  gameType: {
    type: String,
    required: true,
    enum: [
      'emotion-tree-hole', 'emotion-diary', 'conversation-challenge',
      'personality-analysis', 'social-simulation', 'emotion-analysis',
      'content-creation', 'data-visualization', 'social-assistant'
    ]
  },
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  currentLevel: {
    type: Number,
    default: 1
  },
  score: {
    type: Number,
    default: 0
  },
  highScore: {
    type: Number,
    default: 0
  },
  playCount: {
    type: Number,
    default: 0
  },
  totalPlayTime: {
    type: Number,
    default: 0
  },
  unlockedFeatures: [{
    type: String
  }],
  saveData: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  lastPlayed: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
})

// 复合索引
GameProgressSchema.index({ userId: 1, gameType: 1 }, { unique: true })
GameProgressSchema.index({ gameType: 1, score: -1 })

// 虚拟字段
GameProgressSchema.virtual('completionRate').get(function() {
  return this.progress
})

GameProgressSchema.virtual('lastPlayedFormatted').get(function() {
  return this.lastPlayed.toLocaleDateString('zh-CN')
})

// 静态方法接口
export interface GameProgressModel extends mongoose.Model<any> {
  getUserProgress(userId: string): Promise<any[]>;
  getLeaderboard(gameType: string, limit?: number): Promise<any[]>;
  updateScore(userId: string, gameType: string, newScore: number): Promise<any>;
}

// 静态方法
GameProgressSchema.statics.getUserProgress = function(userId: string) {
  return this.find({ userId })
}

GameProgressSchema.statics.getLeaderboard = function(gameType: string, limit: number = 10) {
  return this.find({ gameType })
    .sort({ highScore: -1 })
    .limit(limit)
    .populate('userId', 'username avatar')
}

GameProgressSchema.statics.updateScore = async function(userId: string, gameType: string, newScore: number) {
  const progress = await this.findOne({ userId, gameType })
  
  if (progress) {
    if (newScore > progress.highScore) {
      progress.highScore = newScore
    }
    progress.score = newScore
    progress.playCount += 1
    progress.lastPlayed = new Date()
    
    return progress.save()
  }
  
  return this.create({
    userId,
    gameType,
    score: newScore,
    highScore: newScore,
    playCount: 1
  })
}

export default mongoose.models.GameProgress || mongoose.model('GameProgress', GameProgressSchema) as GameProgressModel