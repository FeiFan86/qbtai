'use client'

import { useState } from 'react'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { PenTool, Heart, MessageSquare, Briefcase, Sparkles, Copy, RefreshCw } from 'lucide-react'
import { GeneratedContent } from '@/components/generated-content'

export default function ContentCreationPage() {
  const [prompt, setPrompt] = useState('')
  const [context, setContext] = useState('')
  const [style, setStyle] = useState('casual')
  const [length, setLength] = useState('medium')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState<any>(null)

  const handleGenerate = async () => {
    if (!prompt.trim()) return
    
    setIsGenerating(true)
    try {
      console.log('开始生成内容...')
      
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
      console.log('生成结果:', result)
      
      if (response.ok) {
        setGeneratedContent(result.data)
      } else {
        console.error('生成失败:', result.error)
        // 在API失败时提供模拟数据
        setGeneratedContent(getMockContent(prompt, style))
      }
    } catch (error) {
      console.error('请求错误:', error)
      // 在发生错误时提供模拟数据
      setGeneratedContent(getMockContent(prompt, style))
    } finally {
      setIsGenerating(false)
    }
  }

  // 获取模拟内容
  const getMockContent = (promptText: string, styleType: string) => {
    const styleMap: Record<string, string> = {
      formal: '非常正式的语调',
      casual: '轻松随意的语调',
      emotional: '充满情感的语调',
      professional: '专业严谨的语调'
    }

    const baseContent = `根据您的要求："${promptText}"，我为您生成了这段内容。这是一个${styleMap[styleType] || '中性'}的示例，展示了AI如何根据不同的需求和风格创建个性化的文本内容。`

    return {
      content: baseContent + "\n\n在实际应用中，这里将是DeepSeek模型根据您的详细需求生成的高质量内容。这段内容会充分考虑您指定的风格、长度和背景信息，为您提供真正有用的文本。",
      suggestions: [
        '可以根据具体受众调整语调',
        '考虑添加更多具体细节或事例',
        '可以尝试不同的长度选项'
      ]
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      // 这里可以添加一个提示
    })
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
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold tracking-tight gradient-text mb-4">
              情感内容创作
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              利用AI的力量，为您生成富有情感的个性化内容
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 左侧输入区域 */}
            <div className="lg:col-span-2 space-y-6">
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {contentTemplates.map((template, index) => (
                      <div 
                        key={index}
                        className="border rounded-lg p-3 cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => {
                          setPrompt(template.prompt)
                          setStyle(template.style)
                          setLength(template.length)
                        }}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          {template.icon}
                          <span className="font-medium text-sm">{template.title}</span>
                        </div>
                        <p className="text-xs text-gray-600">{template.description}</p>
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

                  <div className="flex justify-end gap-2">
                    <Button 
                      onClick={handleGenerate} 
                      disabled={!prompt.trim() || isGenerating}
                      variant="pink"
                    >
                      {isGenerating ? '生成中...' : '生成内容'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 右侧生成结果区域 */}
            <div className="space-y-6">
              {generatedContent && (
                <GeneratedContent 
                  content={generatedContent} 
                  onCopy={copyToClipboard}
                  onRegenerate={handleGenerate}
                />
              )}
              
              {!generatedContent && (
                <Card>
                  <CardHeader>
                    <CardTitle>生成结果</CardTitle>
                    <CardDescription>
                      AI生成的内容将在这里显示
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <PenTool className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                      <p className="text-gray-500">等待生成...</p>
                    </div>
                  </CardContent>
                </Card>
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
        </div>
      </main>
      
      <Footer />
    </div>
  )
}