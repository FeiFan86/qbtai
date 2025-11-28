'use client'

import { jsPDF } from 'jspdf'

// 导出为PDF
export async function exportToPDF(content: string, title: string = 'AI分析报告') {
  try {
    const doc = new jsPDF()
    
    // 设置标题
    doc.setFontSize(18)
    doc.text(title, 20, 20)
    
    // 设置内容
    doc.setFontSize(12)
    const lines = doc.splitTextToSize(content, 170)
    doc.text(lines, 20, 40)
    
    // 添加页脚
    const pageCount = doc.getNumberOfPages()
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i)
      doc.setFontSize(10)
      doc.text(`第 ${i} 页，共 ${pageCount} 页`, 20, 280)
      doc.text(`生成时间: ${new Date().toLocaleString('zh-CN')}`, 110, 280)
    }
    
    doc.save(`${title}.pdf`)
    return true
  } catch (error) {
    console.error('PDF导出失败:', error)
    throw new Error('PDF导出失败')
  }
}

// 导出为图片
export async function exportToImage(element: HTMLElement, filename: string = 'analysis-result') {
  try {
    const html2canvas = (await import('html2canvas')).default
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff'
    })
    
    const link = document.createElement('a')
    link.download = `${filename}.png`
    link.href = canvas.toDataURL()
    link.click()
    
    return true
  } catch (error) {
    console.error('图片导出失败:', error)
    throw new Error('图片导出失败')
  }
}

// 复制到剪贴板
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text)
      return true
    } else {
      // 降级方案
      const textArea = document.createElement('textarea')
      textArea.value = text
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      return true
    }
  } catch (error) {
    console.error('复制失败:', error)
    return false
  }
}

// 社交媒体分享
export async function shareToSocialMedia(content: string, title: string = 'AI分析结果') {
  try {
    if (navigator.share) {
      // Web Share API (移动端支持)
      await navigator.share({
        title,
        text: content,
        url: window.location.href
      })
      return true
    } else {
      // 桌面端分享方案
      const shareUrl = encodeURIComponent(window.location.href)
      const shareText = encodeURIComponent(content)
      
      // 微博分享
      const weiboUrl = `https://service.weibo.com/share/share.php?url=${shareUrl}&title=${shareText}`
      
      // 微信分享 (需要SDK)
      // QQ分享
      const qqUrl = `https://connect.qq.com/widget/shareqq/index.html?url=${shareUrl}&title=${title}&summary=${shareText}`
      
      // 打开分享窗口
      window.open(weiboUrl, '_blank', 'width=600,height=400')
      
      return true
    }
  } catch (error) {
    console.error('分享失败:', error)
    throw new Error('分享失败')
  }
}

// 导出为Markdown
export function exportToMarkdown(content: string, title: string = 'AI分析报告'): string {
  const timestamp = new Date().toLocaleString('zh-CN')
  
    return `# ${title}

> 生成时间: ${timestamp}

${content}

---
*本报告由丘比特AI生成*`
}

// 下载文件
export function downloadFile(content: string, filename: string, type: string = 'text/plain') {
  const blob = new Blob([content], { type })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

// 导出工具类
export class ExportManager {
  static async exportAnalysis(result: any, format: 'pdf' | 'image' | 'markdown' | 'json') {
    const content = this.formatContent(result)
    const title = '情感分析报告'
    
    switch (format) {
      case 'pdf':
        return await exportToPDF(content, title)
      case 'image':
        const element = document.getElementById('export-content')
        if (!element) throw new Error('未找到导出内容')
        return await exportToImage(element, title)
      case 'markdown':
        const markdown = exportToMarkdown(content, title)
        downloadFile(markdown, `${title}.md`, 'text/markdown')
        return true
      case 'json':
        downloadFile(JSON.stringify(result, null, 2), `${title}.json`, 'application/json')
        return true
      default:
        throw new Error('不支持的导出格式')
    }
  }
  
  private static formatContent(result: any): string {
    if (typeof result === 'string') return result
    
    if (result.content) {
      return result.content
    }
    
    if (result.conversationAnalysis) {
      return `情感分析报告

整体情感: ${result.conversationAnalysis.overallSentiment}
沟通风格: ${result.conversationAnalysis.communicationStyle}
情商得分: ${(result.conversationAnalysis.emotionalIntelligence * 100).toFixed(1)}%
同理心得分: ${(result.conversationAnalysis.empathyScore * 100).toFixed(1)}%
`
    }
    
    return JSON.stringify(result, null, 2)
  }
}