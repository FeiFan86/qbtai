'use client'

import { useState, useRef } from 'react'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { PenTool, Heart, MessageSquare, Briefcase, Sparkles, Copy, RefreshCw, Mail, Mic, Calendar, CheckCircle } from 'lucide-react'
import { GeneratedContent } from '@/components/generated-content'

export default function ContentCreationPage() {
  const [prompt, setPrompt] = useState('')
  const [context, setContext] = useState('')
  const [style, setStyle] = useState('casual')
  const [length, setLength] = useState('medium')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState<any>(null)
  const [generationProgress, setGenerationProgress] = useState(0)
  const resultRef = useRef<HTMLDivElement>(null)

  const handleGenerate = async () => {
    if (!prompt.trim()) return
    
    setIsGenerating(true)
    setGeneratedContent(null) // 重置之前的内容
    setGenerationProgress(0)
    
    // 模拟生成进度
    const progressInterval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval)
          return 90
        }
        return prev + 10
      })
    }, 200)
    
    try {
      console.log('开始使用火山引擎API生成内容...')
      
      const response = await fetch('/api/content/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          prompt,
          style,
          length,
          context
        }),
      })
      
      const result = await response.json()
      console.log('API生成结果:', result)
      
      if (response.ok && result.success && result.data) {
        clearInterval(progressInterval)
        setGenerationProgress(100)
        
        // 短暂延迟后设置结果并跳转
        setTimeout(() => {
          setGeneratedContent(result.data)
          // 自动滚动到结果区域
          setTimeout(() => {
            resultRef.current?.scrollIntoView({ behavior: 'smooth' })
          }, 100)
        }, 300)
      } else {
        clearInterval(progressInterval)
        console.error('生成失败:', result.error || '未知错误')
        const errorMessage = result.error || '生成失败，请稍后重试'
        alert('内容生成失败：' + errorMessage)
      }
    } catch (error) {
      clearInterval(progressInterval)
      console.error('请求错误:', error)
      alert('网络错误，请检查连接后重试')
    } finally {
      // 确保进度条完成
      setTimeout(() => {
        setIsGenerating(false)
        setGenerationProgress(0)
      }, 2000)
    }
  }

  const [showCopySuccess, setShowCopySuccess] = useState(false)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setShowCopySuccess(true)
      setTimeout(() => setShowCopySuccess(false), 2000)
    }).catch(err => {
      console.error('复制失败:', err)
      alert('复制失败，请手动复制')
    })
  }

  const downloadContent = (text: string) => {
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'AI生成内容.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const shareContent = (text: string) => {
    if (navigator.share) {
      navigator.share({
        title: 'AI生成的情感内容',
        text: text,
      }).then(() => {
        console.log('分享成功')
      }).catch(err => {
        console.error('分享失败:', err)
        // 如果分享失败，回退到复制功能
        copyToClipboard(text)
      })
    } else {
      // 如果不支持Web Share API，则复制到剪贴板
      copyToClipboard(text)
    }
  }

  const contentTemplates = [
    {
      title: '情书生成',
      description: '生成浪漫感人的情书内容',
      icon: <Heart className="h-5 w-5 text-pink-500" />,
      prompt: '写一封情书，表达对伴侣的爱意和感激',
      style: 'emotional',
      length: 'medium'
    },
    {
      title: '道歉信',
      description: '生成诚恳的道歉信内容',
      icon: <MessageSquare className="h-5 w-5 text-blue-500" />,
      prompt: '写一封道歉信，为之前的误会表达歉意',
      style: 'formal',
      length: 'medium'
    },
    {
      title: '职场邮件',
      description: '生成专业的职场沟通邮件',
      icon: <Briefcase className="h-5 w-5 text-gray-500" />,
      prompt: '写一封职场邮件，请求项目延期并说明原因',
      style: 'professional',
      length: 'short'
    },
    {
      title: '祝福语',
      description: '生成温馨的生日祝福语',
      icon: <Sparkles className="h-5 w-5 text-yellow-500" />,
      prompt: '写一段生日祝福，表达美好的祝愿',
      style: 'casual',
      length: 'short'
    },
    {
      title: '感谢信',
      description: '生成真诚的感谢信内容',
      icon: <Mail className="h-5 w-5 text-green-500" />,
      prompt: '写一封感谢信，表达对帮助和支持的感激之情',
      style: 'formal',
      length: 'medium'
    },
    {
      title: '情诗创作',
      description: '生成优美的情诗表达爱意',
      icon: <PenTool className="h-5 w-5 text-purple-500" />,
      prompt: '创作一首情诗，表达深深的爱意和思念',
      style: 'emotional',
      length: 'short'
    },
    {
      title: '朋友圈',
      description: '生成适合朋友圈的精彩内容',
      icon: <MessageSquare className="h-5 w-5 text-red-500" />,
      prompt: '写一段适合发朋友圈的精彩内容，分享生活点滴',
      style: 'casual',
      length: 'short'
    },
    {
      title: '邀请函',
      description: '生成正式的邀请函内容',
      icon: <Calendar className="h-5 w-5 text-indigo-500" />,
      prompt: '写一份邀请函，邀请参加活动或庆典',
      style: 'formal',
      length: 'medium'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold tracking-tight gradient-text mb-4">
              情感内容创作
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              利用AI的力量，为您生成富有情感的个性化内容
            </p>
          </div>

          <div className="space-y-6">
            {/* 快速模板 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-purple-500" />
                  快速开始
                </CardTitle>
                <CardDescription>
                  选择一个模板，快速生成内容
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {contentTemplates.map((template, index) => (
                    <div 
                      key={index}
                      className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => {
                        setPrompt(template.prompt)
                        setStyle(template.style)
                        setLength(template.length)
                      }}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        {template.icon}
                        <span className="font-medium">{template.title}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                      <div className="text-xs text-gray-500 bg-gray-100 p-2 rounded">
                        点击填充模板
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              </Card>

              {/* 自定义生成 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PenTool className="h-5 w-5 text-pink-500" />
                    自定义生成
                  </CardTitle>
                  <CardDescription>
                    输入您的需求，AI将为您生成个性化内容
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="prompt">内容描述 *</Label>
                    <Textarea
                      id="prompt"
                      placeholder="描述您想要生成的内容..."
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      rows={4}
                    />
                  </div>

                  <div>
                    <Label htmlFor="context">背景信息（可选）</Label>
                    <Textarea
                      id="context"
                      placeholder="提供相关背景信息，使内容更贴合您的需求..."
                      value={context}
                      onChange={(e) => setContext(e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="style">风格</Label>
                      <Select value={style} onValueChange={setStyle}>
                        <SelectTrigger>
                          <SelectValue placeholder="选择风格" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="formal">正式</SelectItem>
                          <SelectItem value="casual">随意</SelectItem>
                          <SelectItem value="emotional">情感化</SelectItem>
                          <SelectItem value="professional">专业</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="length">长度</Label>
                      <Select value={length} onValueChange={setLength}>
                        <SelectTrigger>
                          <SelectValue placeholder="选择长度" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="short">简短</SelectItem>
                          <SelectItem value="medium">中等</SelectItem>
                          <SelectItem value="long">详细</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    {showCopySuccess && (
                      <div className="text-green-600 text-sm flex items-center gap-1">
                        <CheckCircle className="h-4 w-4" />
                        内容已复制
                      </div>
                    )}
                    <Button 
                      onClick={handleGenerate} 
                      disabled={!prompt.trim() || isGenerating}
                      variant="pink"
                      className="relative"
                    >
                      {isGenerating ? (
                        <>
                          <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
                          生成中...
                          <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-400 rounded-md opacity-20 animate-pulse"></div>
                        </>
                      ) : (
                        '生成内容'
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* 生成进度条 */}
              {isGenerating && (
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">正在为您生成内容...</span>
                        <span className="text-sm font-medium text-purple-600">{generationProgress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full transition-all duration-300 ease-out"
                          style={{ width: `${generationProgress}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500 space-y-1">
                        {generationProgress < 30 && <div>💭 正在理解您的需求...</div>}
                        {generationProgress >= 30 && generationProgress < 60 && <div>🎨 正在构思内容框架...</div>}
                        {generationProgress >= 60 && generationProgress < 90 && <div>✍️ 正在生成精彩内容...</div>}
                        {generationProgress >= 90 && <div>✨ 内容完成，正在优化格式...</div>}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

            {/* 生成结果 */}
            {generatedContent && (
              <div ref={resultRef} className="space-y-4 scroll-mt-20">
                <div className="text-center mb-4">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-medium">生成完成</span>
                  </div>
                </div>
                <GeneratedContent 
                  content={generatedContent} 
                  onCopy={copyToClipboard}
                  onRegenerate={handleGenerate}
                  onDownload={downloadContent}
                  onShare={shareContent}
                />
              </div>
            )}

            {/* 写作技巧 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">写作技巧</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-medium text-pink-600">1</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">明确目标</p>
                    <p className="text-xs text-gray-600">清楚了解您想表达的情感和目的</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-medium text-purple-600">2</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">提供背景</p>
                    <p className="text-xs text-gray-600">添加背景信息帮助AI更好地理解需求</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-medium text-indigo-600">3</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">个性化修改</p>
                    <p className="text-xs text-gray-600">AI生成后进行适当调整，使内容更贴合您</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}