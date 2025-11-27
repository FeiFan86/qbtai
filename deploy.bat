@echo off
echo 🚀 丘比特AI情感助手 - 部署脚本
echo ==================================

echo 📦 检查Node.js和npm...
node --version
npm --version

echo.
echo 🔧 安装依赖...
call npm install

echo.
echo ✅ 运行类型检查...
call npx tsc --noEmit

echo.
echo 🏗️ 构建项目...
call npm run build

echo.
echo 📊 构建完成！
echo 👉 请将代码推送到GitHub，然后在Vercel中部署
echo.
echo 🔑 环境变量配置：
echo    VOLCANO_API_KEY: 您的火山引擎API密钥
echo    VOLCANO_BASE_URL: https://ark.cn-beijing.volces.com/api/v3
echo    DEEPSEEK_MODEL: deepseek-chat

pause