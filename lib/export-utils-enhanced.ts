'use client'

import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'

// 导出工具增强版
export class ExportUtils {
  // 导出为PDF
  static async exportToPDF(
    content: string, 
    title: string = '导出内容',
    options: {
      fontSize?: number
      lineHeight?: number
      margin?: number
      watermark?: boolean
    } = {}
  ): Promise<void> {
    const {
      fontSize = 12,
      lineHeight = 1.5,
      margin = 20,
      watermark = true
    } = options

    try {
      const pdf = new jsPDF()
      
      // 设置文档属性
      pdf.setProperties({
        title: title,
        subject: 'AI对话分析结果',
        author: '情感分析助手',
        keywords: '对话分析,情感分析,社交策略'
      })

      // 添加标题
      pdf.setFontSize(16)
      pdf.setTextColor(40, 40, 40)
      pdf.text(title, margin, margin + 10)

      // 添加分隔线
      pdf.setDrawColor(200, 200, 200)
      pdf.line(margin, margin + 15, 210 - margin, margin + 15)

      // 添加内容
      pdf.setFontSize(fontSize)
      pdf.setTextColor(80, 80, 80)
      
      const pageWidth = 210 - 2 * margin
      const maxLineWidth = pageWidth
      
      // 分割文本以适应PDF宽度
      const lines = this.splitTextIntoLines(content, pdf, fontSize, maxLineWidth)
      
      let yPosition = margin + 30
      const lineHeightPx = fontSize * lineHeight
      
      for (const line of lines) {
        // 检查是否需要新页面
        if (yPosition + lineHeightPx > 297 - margin) {
          pdf.addPage()
          yPosition = margin
        }
        
        pdf.text(line, margin, yPosition)
        yPosition += lineHeightPx
      }

      // 添加水印
      if (watermark) {
        pdf.setFontSize(8)
        pdf.setTextColor(150, 150, 150)
        pdf.text(
          `生成时间: ${new Date().toLocaleString('zh-CN')} - 情感分析助手`, 
          margin, 
          297 - margin
        )
      }

      // 保存文件
      pdf.save(`${title.replace(/[^\w\u4e00-\u9fa5]/g, '_')}.pdf`)
      
    } catch (error) {
      console.error('PDF导出失败:', error)
      throw new Error('PDF导出失败，请重试')
    }
  }

  // 导出为图片
  static async exportToImage(
    content: string,
    title: string = '导出内容',
    options: {
      format?: 'png' | 'jpeg'
      quality?: number
      backgroundColor?: string
    } = {}
  ): Promise<void> {
    const {
      format = 'png',
      quality = 0.92,
      backgroundColor = '#ffffff'
    } = options

    try {
      // 创建临时元素用于截图
      const tempDiv = document.createElement('div')
      tempDiv.style.cssText = `
        position: fixed;
        left: -9999px;
        top: -9999px;
        width: 800px;
        padding: 40px;
        background: ${backgroundColor};
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        font-family: 'Segoe UI', system-ui, sans-serif;
        color: #333;
        line-height: 1.6;
      `
      
      tempDiv.innerHTML = `
        <h1 style="margin: 0 0 20px 0; font-size: 24px; color: #2563eb;">${title}</h1>
        <div style="white-space: pre-wrap; font-size: 14px;">${content}</div>
        <div style="margin-top: 20px; font-size: 12px; color: #666; border-top: 1px solid #e5e7eb; padding-top: 10px;">
          生成时间: ${new Date().toLocaleString('zh-CN')} | 情感分析助手
        </div>
      `
      
      document.body.appendChild(tempDiv)

      const canvas = await html2canvas(tempDiv, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: backgroundColor
      })

      // 清理临时元素
      document.body.removeChild(tempDiv)

      // 转换并下载
      const imageData = canvas.toDataURL(`image/${format}`, quality)
      const link = document.createElement('a')
      link.download = `${title.replace(/[^\w\u4e00-\u9fa5]/g, '_')}.${format}`
      link.href = imageData
      link.click()
      
    } catch (error) {
      console.error('图片导出失败:', error)
      throw new Error('图片导出失败，请重试')
    }
  }

  // 分享功能
  static async shareContent(
    content: string,
    title: string = '分享内容',
    options: {
      platforms?: ('wechat' | 'qq' | 'weibo' | 'system')[]
      url?: string
    } = {}
  ): Promise<void> {
    const { platforms = ['system'], url = window.location.href } = options

    try {
      // 检查Web Share API支持
      if (navigator.share && platforms.includes('system')) {
        await navigator.share({
          title: title,
          text: content.substring(0, 200) + (content.length > 200 ? '...' : ''),
          url: url
        })
        return
      }

      // 备用方案：复制到剪贴板
      const shareText = `${title}\n\n${content}\n\n${url}`
      
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareText)
        
        // 显示成功提示
        this.showToast('内容已复制到剪贴板，可以手动分享')
      } else {
        // 降级方案：使用textarea
        const textArea = document.createElement('textarea')
        textArea.value = shareText
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
        
        this.showToast('内容已复制到剪贴板')
      }
      
    } catch (error) {
      console.error('分享失败:', error)
      
      // 如果Web Share API失败，使用复制功能
      try {
        await navigator.clipboard.writeText(content)
        this.showToast('内容已复制到剪贴板，可以手动分享')
      } catch (fallbackError) {
        throw new Error('分享功能不可用，请手动复制内容')
      }
    }
  }

  // 批量导出
  static async batchExport(
    items: Array<{ content: string; title: string; type: 'pdf' | 'image' }>,
    options: {
      zip?: boolean
      progressCallback?: (progress: number) => void
    } = {}
  ): Promise<void> {
    const { zip = false, progressCallback } = options
    
    if (zip) {
      // 需要集成JSZip库
      console.warn('ZIP导出功能需要额外集成JSZip库')
    }

    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      
      try {
        if (item.type === 'pdf') {
          await this.exportToPDF(item.content, item.title)
        } else {
          await this.exportToImage(item.content, item.title)
        }
        
        // 更新进度
        if (progressCallback) {
          progressCallback(((i + 1) / items.length) * 100)
        }
        
        // 添加延迟避免浏览器阻塞
        if (i < items.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 500))
        }
        
      } catch (error) {
        console.error(`导出失败: ${item.title}`, error)
        throw new Error(`"${item.title}"导出失败`)
      }
    }
  }

  // 私有方法：分割文本
  private static splitTextIntoLines(
    text: string, 
    pdf: jsPDF, 
    fontSize: number, 
    maxWidth: number
  ): string[] {
    const words = text.split(/\s+/)
    const lines: string[] = []
    let currentLine = ''

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word
      const testWidth = pdf.getTextWidth(testLine)
      
      if (testWidth <= maxWidth) {
        currentLine = testLine
      } else {
        if (currentLine) {
          lines.push(currentLine)
        }
        currentLine = word
      }
    }

    if (currentLine) {
      lines.push(currentLine)
    }

    return lines
  }

  // 显示提示
  private static showToast(message: string, duration: number = 3000) {
    const toast = document.createElement('div')
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #10b981;
      color: white;
      padding: 12px 20px;
      border-radius: 6px;
      z-index: 10000;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      animation: slideIn 0.3s ease-out;
    `
    
    toast.textContent = message
    document.body.appendChild(toast)
    
    setTimeout(() => {
      toast.style.animation = 'slideOut 0.3s ease-in'
      setTimeout(() => {
        if (document.body.contains(toast)) {
          document.body.removeChild(toast)
        }
      }, 300)
    }, duration)

    // 添加CSS动画
    if (!document.getElementById('toast-animations')) {
      const style = document.createElement('style')
      style.id = 'toast-animations'
      style.textContent = `
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(100%); opacity: 0; }
        }
      `
      document.head.appendChild(style)
    }
  }
}

// 导出函数别名（保持向后兼容）
export const exportToPDF = ExportUtils.exportToPDF.bind(ExportUtils)
export const exportToImage = ExportUtils.exportToImage.bind(ExportUtils)
export const shareContent = ExportUtils.shareContent.bind(ExportUtils)
export const batchExport = ExportUtils.batchExport.bind(ExportUtils)