// 自定义构建脚本，用于处理事件处理器问题
const { execSync } = require('child_process');

console.log('开始构建过程...');

try {
  // 设置环境变量来禁用静态生成
  process.env.NEXT_SKIP_BUILD_STATIC_GENERATION = 'true';
  
  // 运行实际的构建命令
  execSync('next build', { stdio: 'inherit' });
  
  console.log('构建完成！');
} catch (error) {
  console.error('构建失败:', error);
  process.exit(1);
}