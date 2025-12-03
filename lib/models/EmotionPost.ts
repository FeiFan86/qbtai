import mongoose from 'mongoose'

const EmotionReplySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    required: true,
    maxlength: 1000
  },
  likes: {
    type: [String],
    default: []
  },
  isAnonymous: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

const EmotionPostSchema = new mongoose.Schema({
  gameType: {
    type: String,
    required: true,
    enum: ['emotion-tree-hole', 'emotion-diary', 'conversation-challenge']
  },
  userId: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    required: true,
    maxlength: 200
  },
  content: {
    type: String,
    required: true,
    maxlength: 5000
  },
  category: {
    type: String,
    enum: ['happy', 'sad', 'angry', 'anxious', 'excited', 'confused', 'love', 'other'],
    default: 'other'
  },
  tags: {
    type: [String],
    default: []
  },
  isAnonymous: {
    type: Boolean,
    default: false
  },
  likes: {
    type: [String],
    default: []
  },
  replies: [EmotionReplySchema],
  replyCount: {
    type: Number,
    default: 0
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  imageUrl: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
})

// 添加索引
EmotionPostSchema.index({ gameType: 1, createdAt: -1 })
EmotionPostSchema.index({ userId: 1 })
EmotionPostSchema.index({ category: 1 })
EmotionPostSchema.index({ isFeatured: 1 })

// 虚拟字段
EmotionPostSchema.virtual('likeCount').get(function() {
  return this.likes.length
})

EmotionPostSchema.virtual('createdAtFormatted').get(function() {
  return this.createdAt.toLocaleDateString('zh-CN')
})

// 定义文档接口
interface IEmotionPost {
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
  replies: any[];
  replyCount: number;
  isFeatured: boolean;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

// 静态方法接口
interface EmotionPostStatics {
  findByGameType(gameType: string, limit?: number): Promise<IEmotionPost[]>;
  findFeatured(gameType: string): Promise<IEmotionPost[]>;
  findByCategory(gameType: string, category: string): Promise<IEmotionPost[]>;
}

// 创建模型类型
export type EmotionPostModel = mongoose.Model<IEmotionPost> & EmotionPostStatics;

// 静态方法
EmotionPostSchema.statics.findByGameType = function(gameType: string, limit: number = 20) {
  return this.find({ gameType })
    .sort({ createdAt: -1 })
    .limit(limit)
    .populate('userId', 'username avatar')
}

EmotionPostSchema.statics.findFeatured = function(gameType: string) {
  return this.find({ gameType, isFeatured: true })
    .sort({ createdAt: -1 })
    .limit(10)
}

EmotionPostSchema.statics.findByCategory = function(gameType: string, category: string) {
  return this.find({ gameType, category })
    .sort({ createdAt: -1 })
    .limit(20)
}

export default (mongoose.models.EmotionPost as EmotionPostModel) || mongoose.model<IEmotionPost, EmotionPostModel>('EmotionPost', EmotionPostSchema)