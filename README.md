# 丘比特AI情感助手

基于火山引擎方舟DeepSeek模型的智能情感分析和社交助手，帮助用户理解情感、改善关系。

## 功能特色

### 🔍 智能情感分析
- 多维度情感识别（文本、语音、图像）
- 情感趋势分析和预测
- 情感关键词提取和总结

### 🤝 社交互动优化
- 对话内容智能分析
- 沟通策略和话术建议
- 冲突调解和关系改善方案

### ✍️ 情感内容创作
- AI辅助生成情感化内容
- 多种风格和长度选项
- 个性化建议和改进方向

### 📊 情感数据洞察
- 可视化情感变化趋势
- 情感分布和雷达图分析
- 个人情感模式识别

### 📖 情感日记
- 记录日常情感变化
- 自动分析和归档
- 情感历史追踪

## 技术架构

- **前端框架**: Next.js 14 (App Router)
- **UI组件**: shadcn/ui + Tailwind CSS
- **状态管理**: Zustand
- **AI服务**: 火山引擎方舟 DeepSeek 模型
- **数据可视化**: Recharts
- **部署平台**: Vercel

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
# 火山引擎API配置
VOLCANO_API_KEY=your_volcano_api_key_here
VOLCANO_BASE_URL=https://ark.cn-beijing.volces.com/api/v3
DEEPSEEK_MODEL=deepseek-chat

# 应用配置
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here

# 数据库配置 (可选)
DATABASE_URL=your_database_url_here

# 其他服务配置
UPSTASH_REDIS_REST_URL=your_upstash_redis_url_here
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token_here
```

### 启动开发服务器
```bash
npm run dev
```

访问 http://localhost:3000 查看应用。

## 部署到Vercel

### 方法一：直接从Vercel部署（推荐）

1. 点击下方按钮直接部署到Vercel：
   
2. 在部署页面配置环境变量：
   - `VOLCANO_API_KEY`: 您的火山引擎API密钥
   - `VOLCANO_BASE_URL`: `https://ark.cn-beijing.volces.com/api/v3`
   - `DEEPSEEK_MODEL`: `deepseek-chat`

3. 点击"Deploy"完成部署

### 方法二：从GitHub部署

1. 将代码推送到GitHub仓库
2. 在Vercel中导入项目
3. 配置环境变量
4. 部署完成

### 环境变量配置
在Vercel项目设置中添加以下环境变量：
- `VOLCANO_API_KEY`: 火山引擎API密钥
- `VOLCANO_BASE_URL`: 火山引擎API基础URL
- `DEEPSEEK_MODEL`: 使用的模型名称（默认: deepseek-chat）

## 项目结构

```
cupid-ai/
├── app/                    # Next.js 14 App Router
│   ├── (dashboard)/       # 仪表板页面
│   ├── api/              # API路由
│   │   ├── emotion/      # 情感分析API
│   │   ├── chat/         # 聊天API
│   │   └── content/      # 内容生成API
│   ├── components/       # 可复用组件
│   │   ├── ui/          # shadcn/ui组件
│   │   ├── emotion/     # 情感相关组件
│   │   └── charts/      # 图表组件
│   ├── lib/             # 工具函数
│   └── store/           # Zustand状态管理
├── components/           # 全局组件
├── lib/                 # 工具函数和服务
└── public/              # 静态资源
```

## API接口

### 情感分析
```
POST /api/emotion/analyze
{
  "input": "要分析的文本内容",
  "type": "text",
  "context": []
}
```

### 内容生成
```
POST /api/content/generate
{
  "prompt": "生成内容的描述",
  "style": "casual",
  "length": "medium",
  "context": "背景信息"
}
```

### 社交分析
```
POST /api/social/analyze
{
  "conversation": "对话内容",
  "context": "背景信息",
  "scenario": "场景类型"
}
```

## 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 支持

如有问题或建议，请通过以下方式联系：

- 提交 Issue
- 发送邮件至 support@cupidai.com

---

© 2024 丘比特AI情感助手. 用❤️打造，助力每一段关系.