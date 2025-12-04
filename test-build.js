const { execSync } = require('child_process')

try {
  console.log('开始构建测试...')
  
  // 检查 TypeScript 编译
  console.log('检查 TypeScript 编译...')
  execSync('npx tsc --noEmit', { stdio: 'inherit' })
  
  console.log('✅ TypeScript 编译成功')
  
  // 尝试构建
  console.log('开始 Next.js 构建...')
  execSync('npx next build', { stdio: 'inherit' })
  
  console.log('✅ 构建成功！')
  
} catch (error) {
  console.error('❌ 构建失败:', error.message)
  process.exit(1)
}