import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: ''
  },
  bio: {
    type: String,
    maxlength: 200,
    default: ''
  },
  preferences: {
    theme: {
      type: String,
      enum: ['light', 'dark', 'auto'],
      default: 'auto'
    },
    notifications: {
      email: { type: Boolean, default: true },
      push: { type: Boolean, default: true }
    }
  },
  stats: {
    totalGames: { type: Number, default: 0 },
    totalScore: { type: Number, default: 0 },
    totalPlayTime: { type: Number, default: 0 },
    achievements: [{ 
      id: String,
      unlockedAt: Date
    }]
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
})

// 静态方法接口
interface UserStatics {
  findByUsername(username: string): Promise<any>;
  findByEmail(email: string): Promise<any>;
  getLeaderboard(limit?: number): Promise<any[]>;
}

// 创建模型类型
export type UserModel = mongoose.Model<any> & UserStatics;

// 静态方法
UserSchema.statics.findByUsername = function(username: string) {
  return this.findOne({ username })
}

UserSchema.statics.findByEmail = function(email: string) {
  return this.findOne({ email })
}

UserSchema.statics.getLeaderboard = function(limit: number = 10) {
  return this.find({ isActive: true })
    .sort({ 'stats.totalScore': -1 })
    .limit(limit)
    .select('username avatar stats.totalScore stats.totalGames')
}

export default (mongoose.models.User as UserModel) || mongoose.model<any, UserModel>('User', UserSchema)