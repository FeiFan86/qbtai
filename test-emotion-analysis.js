// 测试文件，用于验证情感分析功能
// 这个文件不会被部署，仅用于本地测试

import { volcanoAPI } from './volcano-api'

async function testEmotionAnalysis() {
  try {
    console.log('开始测试情感分析API...')
    
    // 测试模拟数据
    console.log('测试模拟数据...')
    const mockResult = volcanoAPI.analyzeEmotion({
      input: '今天我感到特别开心，因为完成了重要的项目。',
      type: 'text',
      context: []
    })
    
    console.log('模拟数据测试结果:', mockResult)
    
    // 在浏览器环境中，可以取消下面几行注释来测试真实API
    /*
    console.log('测试真实API...')
    const apiResult = await volcanoAPI.analyzeEmotion({
      input: '今天我感到特别开心，因为完成了重要的项目。',
      type: 'text',
      context: []
    })
    
    console.log('API测试结果:', apiResult)
    */
    
  } catch (error) {
    console.error('测试失败:', error)
  }
}

// 在Node.js环境中导出函数，在浏览器环境中可以直接调用
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { testEmotionAnalysis }
} else if (typeof window !== 'undefined') {
  (window as any).testEmotionAnalysis = testEmotionAnalysis
}