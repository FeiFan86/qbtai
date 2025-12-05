# 丘比特AI情感助手

基于火山引擎方舟DeepSeek模型的智能情感分析和社交助手，专为情侣设计的情感支持平台。

## 功能特色

### 🔍 智能情感分析
- 基于对话内容的情感识别和分析
- 情感趋势可视化分析
- 个性化情感建议和指导

### 🤝 社交互动优化
- 对话内容智能分析
- 沟通策略和话术建议
- 关系改善方案提供

### ✍️ 情感内容创作
- AI辅助生成情感化内容
- 多种风格和长度选项
- 个性化内容定制

### 📊 情感数据洞察
- 情感变化趋势图表
- 情感分布和雷达图分析
- 个人情感模式识别

### 🎮 情感游戏互动
- 情感树洞游戏
- 情感认知测试
- 互动式情感学习

## 技术架构

- **前端框架**: Next.js 14 (App Router)
- **UI组件**: shadcn/ui + Tailwind CSS + Lucide React
- **状态管理**: Zustand
- **数据库**: MongoDB
- **数据可视化**: Recharts
- **部署平台**: Vercel
- **认证系统**: 自定义JWT认证

## 快速开始

### 环境要求
- Node.js 18+
- npm 或 yarn

### 安装依赖
```bash
npm install
```

### 配置环境变量
复制 `.env.local` 文件并配置以下变量：
```env
# MongoDB 数据库连接
MONGODB_URI=mongodb://root:qq116121@183.87.130.22:27017/cupid-ai?authSource=admin

# 应用配置
APP_NAME=丘比特AI情感助手
APP_VERSION=1.0.0
NODE_ENV=development

# 安全配置
JWT_SECRET=cupid-ai-jwt-secret-20251204-change-in-production
ENCRYPTION_KEY=cupid-ai-encryption-key-32-chars-long
```

### 启动开发服务器
```bash
npm run dev
```

访问 http://localhost:3000 查看应用。

## 部署到Vercel

### 部署步骤

1. **准备项目**：确保所有依赖项已安装
2. **配置环境变量**：在Vercel项目设置中添加以下变量：
   - `MONGODB_URI`: `mongodb://root:qq116121@183.87.130.22:27017/cupid-ai?authSource=admin`
   - `JWT_SECRET`: 设置一个安全的JWT密钥
   - `ENCRYPTION_KEY`: 设置32位加密密钥

3. **部署命令**：
   ```bash
   npm run build
   ```

### Vercel配置
项目已包含 `vercel.json` 配置文件，会自动使用Next.js构建命令。

### 部署后访问
- **主网站**: `https://您的域名.vercel.app`
- **后台管理**: `https://您的域名.vercel.app/admin`
- **管理员账号**: 用户名 `admin`，密码 `admin123456`

## 项目结构（已优化）

```
cupid-ai/
├── app/                    # Next.js 14 App Router
│   ├── api/               # API路由 (43个端点)
│   │   ├── auth/          # 认证相关API
│   │   ├── emotion/       # 情感分析API
│   │   ├── games/         # 游戏相关API
│   │   ├── analytics/     # 数据分析API
│   │   └── users/         # 用户管理API
│   ├── admin/             # 后台管理页面
│   ├── dashboard/         # 用户仪表板
│   ├── login/             # 登录页面
│   ├── register/          # 注册页面
│   └── games/             # 情感游戏页面
├── components/            # 可复用组件 (61个组件)
│   ├── ui/               # shadcn/ui组件
│   ├── auth-provider.tsx # 认证提供者
│   ├── global-navbar.tsx # 全局导航栏
│   └── 各种功能组件
├── lib/                  # 工具函数和服务
├── scripts/              # 实用脚本
│   └── create-admin.js   # 管理员账号创建脚本
├── types/                # TypeScript类型定义
└── 配置文件
```

### 主要功能模块
- **用户认证**: 注册、登录、密码重置
- **情感分析**: 对话分析、情感识别、建议生成
- **游戏互动**: 情感树洞、认知测试、进度追踪
- **数据分析**: 情感趋势、用户统计、可视化图表
- **后台管理**: 用户管理、数据分析、系统监控

## 主要API接口

### 用户认证
- `POST /api/auth/register` - 用户注册
- `POST /api/auth/login` - 用户登录
- `POST /api/auth/verify` - 令牌验证
- `POST /api/auth/reset-password` - 密码重置

### 情感分析
- `POST /api/emotion/analyze` - 情感内容分析
- `POST /api/ai/emotion-analysis` - AI情感分析
- `GET /api/emotion-posts` - 获取情感帖子

### 游戏相关
- `GET /api/games` - 获取游戏列表和统计
- `POST /api/games/save-progress` - 保存游戏进度
- `GET /api/game-progress` - 获取用户游戏进度
- `GET /api/leaderboards` - 获取排行榜

### 数据分析
- `GET /api/analytics` - 获取系统统计
- `GET /api/achievements` - 获取用户成就

### 管理员接口
- `GET /api/admin/init` - 检查管理员状态
- `POST /api/admin/init` - 创建管理员账号

## 管理员功能

### 后台管理
- 访问 `/admin` 路径进入后台管理界面
- 支持用户管理、数据统计、系统监控
- 需要管理员权限才能访问

### 预设管理员账号
- **用户名**: `admin`
- **密码**: `admin123456`
- **邮箱**: `admin@cupidai.com`
- **角色**: `superadmin`

### 创建管理员账号
1. 运行 `node scripts/create-admin.js` 创建账号
2. 或访问 `/admin-init` 页面通过界面创建

## 开发说明

### 项目状态
- ✅ 已完成文件清理和优化
- ✅ 移除所有测试和调试文件
- ✅ 统一配色和界面风格
- ✅ 完善API文档
- ✅ 配置Vercel部署

### 技术特点
- 使用现代Next.js 14 App Router
- TypeScript类型安全
- MongoDB数据库集成
- 响应式设计，支持移动端
- JWT认证系统
- 数据可视化图表

## 许可证

本项目采用 MIT 许可证。

## 支持

如有问题或建议，请通过以下方式联系：
- 提交 Issue
- 发送邮件至 admin@cupidai.com

---

© 2024 丘比特AI情感助手. 专为情侣设计的情感支持平台.