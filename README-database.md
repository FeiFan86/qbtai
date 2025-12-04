# MongoDB 数据库集成说明

## 数据库连接信息
- **服务器**: 183.87.130.22:27017
- **数据库名**: cupid-ai
- **认证**: root/qq116121
- **认证数据库**: admin

## 环境变量配置

在 `.env.local` 文件中配置：
```env
# MongoDB 数据库连接
MONGODB_URI=mongodb://root:qq116121@183.87.130.22:27017/cupid-ai?authSource=admin

# NextAuth.js 配置
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=cupid-ai-secret-key-20251204-change-in-production

# 火山引擎AI服务配置
VOLCANO_ACCESS_KEY=your-volcano-access-key
VOLCANO_SECRET_KEY=your-volcano-secret-key
VOLCANO_ENDPOINT=ark.cn-beijing.volces.com

# 应用配置
APP_NAME=丘比特AI情感助手
APP_VERSION=1.0.0
NODE_ENV=development

# 安全配置
JWT_SECRET=cupid-ai-jwt-secret-20251204-change-in-production
ENCRYPTION_KEY=cupid-ai-encryption-key-32-chars-long
```

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

## 数据库连接管理

项目使用 `lib/db.ts` 来管理数据库连接：

```typescript
import dbConnect from '@/lib/db'

// 在API路由中使用
await dbConnect()
```

## API 接口

### 用户认证相关
- `POST /api/auth/register` - 用户注册
- `POST /api/auth/login` - 用户登录
- `POST /api/auth/verify` - 验证令牌

### 情感帖子相关
- `GET /api/emotion-posts` - 获取帖子列表
- `POST /api/emotion-posts` - 创建新帖子

### 游戏进度相关
- `GET /api/game-progress` - 获取游戏进度
- `POST /api/game-progress` - 更新游戏进度

### 综合游戏接口
- `GET /api/games` - 获取游戏统计和排行榜
- `POST /api/games` - 保存游戏进度和得分

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
5. **类型安全**: 使用TypeScript确保类型安全

## 生产环境注意事项

1. **安全配置**: 在生产环境中修改所有密钥和密码
2. **连接池**: 根据实际负载调整连接池大小
3. **备份策略**: 定期备份数据库
4. **监控**: 设置数据库性能监控

## 下一步开发

1. 添加更多业务逻辑API
2. 实现数据统计和分析功能
3. 添加数据迁移脚本
4. 实现数据备份和恢复机制