import mongoose, { Document, Schema } from 'mongoose'

export interface IGameSession extends Document {
  userId: string
  gameId: string
  startTime: Date
  endTime?: Date
  duration: number
  score?: number
  completion: number
  data?: any
  createdAt: Date
  updatedAt: Date
}

const GameSessionSchema = new Schema<IGameSession>(
  {
    userId: {
      type: String,
      required: true,
      index: true
    },
    gameId: {
      type: String,
      required: true,
      index: true
    },
    startTime: {
      type: Date,
      required: true,
      default: Date.now
    },
    endTime: {
      type: Date
    },
    duration: {
      type: Number,
      required: true,
      default: 0
    },
    score: {
      type: Number
    },
    completion: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
      default: 0
    },
    data: {
      type: Schema.Types.Mixed
    }
  },
  {
    timestamps: true
  }
)

// 创建复合索引
GameSessionSchema.index({ userId: 1, gameId: 1 })
GameSessionSchema.index({ startTime: -1 })

// 静态方法
interface GameSessionStatics {
  findByUserId(userId: string): Promise<IGameSession[]>
  findByGameId(gameId: string): Promise<IGameSession[]>
  getRecentSessions(userId: string, limit: number): Promise<IGameSession[]>
  getSessionStats(userId: string): Promise<any>
}

GameSessionSchema.statics.findByUserId = function(userId: string) {
  return this.find({ userId }).sort({ startTime: -1 }).exec()
}

GameSessionSchema.statics.findByGameId = function(gameId: string) {
  return this.find({ gameId }).sort({ startTime: -1 }).exec()
}

GameSessionSchema.statics.getRecentSessions = function(userId: string, limit: number = 10) {
  return this.find({ userId }).sort({ startTime: -1 }).limit(limit).exec()
}

GameSessionSchema.statics.getSessionStats = function(userId: string) {
  return this.aggregate([
    { $match: { userId } },
    {
      $group: {
        _id: '$gameId',
        totalSessions: { $sum: 1 },
        totalDuration: { $sum: '$duration' },
        averageScore: { $avg: '$score' },
        averageCompletion: { $avg: '$completion' },
        lastPlayed: { $max: '$startTime' }
      }
    }
  ]).exec()
}

export default mongoose.models.GameSession || 
  mongoose.model<IGameSession & mongoose.Document>('GameSession', GameSessionSchema)