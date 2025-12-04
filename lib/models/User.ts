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
  },
  // 密码重置相关字段
  resetToken: {
    type: String,
    default: null
  },
  resetTokenExpiry: {
    type: Date,
    default: null
  },
  // 邮箱验证相关字段
  emailVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationToken: {
    type: String,
    default: null
  },
  emailVerificationExpiry: {
    type: Date,
    default: null
  },
  // 登录尝试相关字段
  loginAttempts: {
    type: Number,
    default: 0
  },
  lockUntil: {
    type: Date,
    default: null
  },
  // 最后一次密码更改时间
  passwordChangedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
})

// 添加索引以提高查询性能
UserSchema.index({ resetToken: 1, resetTokenExpiry: 1 })
UserSchema.index({ emailVerificationToken: 1, emailVerificationExpiry: 1 })

// 添加虚拟字段：检查账户是否被锁定
UserSchema.virtual('isLocked').get(function() {
  return !!(this.lockUntil && this.lockUntil > Date.now())
})

// 静态方法接口
interface UserStatics {
  findByUsername(username: string): Promise<any>;
  findByEmail(email: string): Promise<any>;
  getLeaderboard(limit?: number): Promise<any[]>;
  findByResetToken(token: string): Promise<any>;
  findByEmailVerificationToken(token: string): Promise<any>;
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

UserSchema.statics.findByResetToken = function(token: string) {
  return this.findOne({
    resetToken: token,
    resetTokenExpiry: { $gt: Date.now() }
  })
}

UserSchema.statics.findByEmailVerificationToken = function(token: string) {
  return this.findOne({
    emailVerificationToken: token,
    emailVerificationExpiry: { $gt: Date.now() }
  })
}

// 实例方法：增加登录尝试次数
UserSchema.methods.incLoginAttempts = function() {
  // 如果已经有锁定且已经过期，重置计数器
  if (this.lockUntil && this.lockUntil < Date.now()) {
    return this.updateOne({
      $unset: { lockUntil: 1 },
      $set: { loginAttempts: 1 }
    })
  }
  
  const updates: any = { $inc: { loginAttempts: 1 } }
  
  // 如果达到最大尝试次数且账户未锁定，则锁定账户
  const maxAttempts = 5
  const lockTime = 2 * 60 * 60 * 1000 // 2小时
  
  if (this.loginAttempts + 1 >= maxAttempts && !this.isLocked) {
    updates.$set = { lockUntil: Date.now() + lockTime }
  }
  
  return this.updateOne(updates)
}

// 实例方法：重置登录尝试次数
UserSchema.methods.resetLoginAttempts = function() {
  return this.updateOne({
    $unset: { loginAttempts: 1, lockUntil: 1 }
  })
}

export default (mongoose.models.User as UserModel) || mongoose.model<any, UserModel>('User', UserSchema)