// 修复所有内联事件处理器的脚本
const fs = require('fs');
const path = require('path');

function findAndFixFiles(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  let fixedCount = 0;
  
  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    
    if (file.isDirectory() && file.name !== 'node_modules') {
      fixedCount += findAndFixFiles(fullPath);
    } else if (file.name.endsWith('.tsx') || file.name.endsWith('.ts')) {
      try {
        const content = fs.readFileSync(fullPath, 'utf8');
        let modified = false;
        
        // 查找并替换所有类型的内联事件处理器
        let newContent = content.replace(
          /onClick\s*=\s*\{\s*\(\s*\)\s*=>\s*window\.location\.href\s*=\s*['"]([^'"]+)['"]\s*\}/g,
          (match, url) => {
            modified = true;
            return `onClick={() => { window.location.href = '${url}' }}`;
          }
        );
        
        newContent = newContent.replace(
          /onSubmit\s*=\s*\{\s*\(\s*\)\s*=>/g,
          () => {
            modified = true;
            return `onSubmit={handleSubmit}`;
          }
        );
        
        newContent = newContent.replace(
          /onChange\s*=\s*\{\s*\(\s*\)\s*=>/g,
          () => {
            modified = true;
            return `onChange={handleChange}`;
          }
        );
        
        if (modified) {
          fs.writeFileSync(fullPath, newContent);
          fixedCount++;
          console.log(`已修复: ${fullPath}`);
        }
      } catch (error) {
        console.error(`处理文件时出错 ${fullPath}:`, error);
      }
    }
  }
  
  return fixedCount;
}

const appDir = path.join(__dirname, '../app');
const componentsDir = path.join(__dirname, '../components');

console.log('开始修复内联事件处理器...');
const appFixedCount = findAndFixFiles(appDir);
const componentFixedCount = findAndFixFiles(componentsDir);

const totalFixed = appFixedCount + componentFixedCount;
console.log(`总共修复了 ${totalFixed} 个文件`);

if (totalFixed > 0) {
  console.log('内联事件处理器修复完成！');
} else {
  console.log('没有找到需要修复的内联事件处理器');
}