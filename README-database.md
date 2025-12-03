# MongoDB 数据库集成说明

## 数据库连接信息
- **服务器**: 183.87.130.22:27017
- **数据库名**: cupid-ai
- **认证**: root/qq116121
- **认证数据库**: admin

## 已创建的集合

### 1. User 用户集合
- 存储用户基本信息、偏好设置
- 包含用户名、邮箱、密码哈希、头像等字段

### 2. EmotionPost 情感帖子集合
- 存储情感树洞、情感日记等模块的帖子
- 包含帖子内容、分类、标签、点赞、回复等

### 3. GameProgress 游戏进度集合
- 存储用户在各游戏模块的进度和得分
- 包含游戏类型、得分、进度、解锁功能等

## API 接口

### 情感树洞相关
- `GET /api/games/emotion-tree-hole` - 获取帖子列表
- `POST /api/games/emotion-tree-hole` - 创建新帖子
- `POST /api/games/emotion-tree-hole/[postId]/like` - 点赞帖子
- `POST /api/games/emotion-tree-hole/[postId]/replies` - 添加回复
- `POST /api/games/emotion-tree-hole/progress` - 保存游戏进度

## 环境变量配置

在 `.env.local` 文件中配置：
```env
MONGODB_URI=mongodb://root:qq116121@183.87.130.22:27017/cupid-ai?authSource=admin
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
```

## 测试连接

运行测试脚本验证数据库连接：
```bash
node scripts/test-db-connection.js
```

## 数据库设计特点

1. **索引优化**: 为常用查询字段添加索引
2. **数据验证**: 使用Mongoose Schema进行数据验证
3. **连接池**: 使用连接池优化数据库连接
4. **错误处理**: 完善的错误处理和重试机制

## 下一步开发

1. 为用户认证系统添加MongoDB支持
2. 为其他游戏模块创建数据库模型
3. 添加数据统计和分析功能
4. 实现数据备份和恢复机制