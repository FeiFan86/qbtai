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
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  avatar: {
    type: String,
    default: ''
  },
  preferences: {
    theme: {
      type: String,
      enum: ['light', 'dark', 'auto'],
      default: 'auto'
    },
    language: {
      type: String,
      default: 'zh'
    },
    soundEnabled: {
      type: Boolean,
      default: true
    },
    notifications: {
      type: Boolean,
      default: true
    }
  },
  lastLogin: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
})

// 添加索引
UserSchema.index({ username: 1 })
UserSchema.index({ email: 1 })

// 虚拟字段
UserSchema.virtual('createdAtFormatted').get(function() {
  return this.createdAt.toLocaleDateString('zh-CN')
})

// 静态方法
UserSchema.statics.findByUsername = function(username: string) {
  return this.findOne({ username })
}

UserSchema.statics.findByEmail = function(email: string) {
  return this.findOne({ email })
}

export default mongoose.models.User || mongoose.model('User', UserSchema)