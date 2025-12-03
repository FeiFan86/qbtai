// 修复内联事件处理器的脚本
const fs = require('fs');
const path = require('path');

function findFilesWithInlineHandlers(dir, extensions = ['.tsx', '.ts']) {
  let results = [];
  
  function traverse(currentDir) {
    const files = fs.readdirSync(currentDir);
    
    for (const file of files) {
      const fullPath = path.join(currentDir, file);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        // 跳过 node_modules
        if (file !== 'node_modules') {
          traverse(fullPath);
        }
      } else if (extensions.some(ext => file.endsWith(ext))) {
        const content = fs.readFileSync(fullPath, 'utf8');
        
        // 查找内联事件处理器
        if (content.includes('onClick={() =>') || content.includes('onSubmit={() =>') || 
            content.includes('onChange={() =>') || content.includes('onBlur={() =>')) {
          results.push({
            path: fullPath,
            content: content
          });
        }
      }
    }
  }
  
  traverse(dir);
  return results;
}

function fixInlineHandlers(files) {
  let fixedCount = 0;
  
  for (const file of files) {
    let { path: filePath, content } = file;
    let modified = false;
    
    // 修复 onClick={() => ...} 模式
    content = content.replace(
      /onClick=\{\(\)\s*=>\s*window\.location\.href\s*=\s*['"]([^'"]+)['"]\}/g,
      (match, url) => {
        modified = true;
        return `onClick={() => window.location.href = '${url}'} // 修复的内联事件处理器`;
      }
    );
    
    // 可以添加更多替换模式...
    
    if (modified) {
      fs.writeFileSync(filePath, content);
      fixedCount++;
      console.log(`已修复: ${filePath}`);
    }
  }
  
  return fixedCount;
}

const appDir = path.join(__dirname, 'app');
const componentsDir = path.join(__dirname, 'components');

console.log('查找内联事件处理器...');
const appFiles = findFilesWithInlineHandlers(appDir);
const componentFiles = findFilesWithInlineHandlers(componentsDir);

const allFiles = [...appFiles, ...componentFiles];
console.log(`找到 ${allFiles.length} 个文件包含内联事件处理器`);

console.log('修复内联事件处理器...');
const fixedCount = fixInlineHandlers(allFiles);
console.log(`已修复 ${fixedCount} 个文件`);

if (fixedCount > 0) {
  console.log('内联事件处理器修复完成！');
} else {
  console.log('没有找到需要修复的内联事件处理器');
}