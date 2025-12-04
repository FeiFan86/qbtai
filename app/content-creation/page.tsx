'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { PenTool, Heart, MessageSquare, Briefcase, Sparkles, Copy, RefreshCw, Mail, Mic, Calendar, CheckCircle, Heart as HeartIcon } from 'lucide-react'
import { GeneratedContent } from '@/components/generated-content'

export default function ContentCreationPage() {
  const router = useRouter()
  const [prompt, setPrompt] = useState('')
  const [context, setContext] = useState('')
  const [style, setStyle] = useState('casual')
  const [length, setLength] = useState('medium')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState<any>(null)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const resultRef = useRef<HTMLDivElement>(null)

  const contentTypes = [
    {
      id: 'love-letter',
      title: '情书',
      description: '为爱人写一封温馨的情书',
      icon: <Heart className="h-5 w-5 text-rose-500" />,
      color: 'from-rose-500 to-pink-500'
    },
    {
      id: 'apology',
      title: '道歉信',
      description: '表达诚挚的歉意和反思',
      icon: <MessageSquare className="h-5 w-5 text-blue-500" />,
      color: 'from-blue-500 to-purple-500'
    },
    {
      id: 'message',
      title: '祝福信息',
      description: '为特殊场合准备祝福语',
      icon: <Mail className="h-5 w-5 text-green-500" />,
      color: 'from-green-500 to-teal-500'
    },
    {
      id: 'poem',
      title: '情诗',
      description: '创作一首浪漫的诗歌',
      icon: <Sparkles className="h-5 w-5 text-purple-500" />,
      color: 'from-purple-500 to-pink-500'
    }
  ]

  const [selectedType, setSelectedType] = useState('love-letter')

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

  const handleTypeSelect = (typeId: string) => {
    setSelectedType(typeId)
    // 可以根据类型预设一些提示词
    switch(typeId) {
      case 'love-letter':
        setPrompt('写一封表达爱意的情书，给最爱的人...')
        break
      case 'apology':
        setPrompt('写一封道歉信，表达诚挚的歉意...')
        break
      case 'message':
        setPrompt('为生日准备一段温馨的祝福语...')
        break
      case 'poem':
        setPrompt('创作一首关于爱情和思念的诗...')
        break
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 relative overflow-hidden">
      {/* 增强背景装饰元素 - 与首页保持一致 */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-100/20 via-pink-100/20 to-purple-100/20"></div>
      <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-rose-300/30 to-pink-300/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-purple-300/30 to-blue-300/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-orange-300/20 to-red-300/20 rounded-full blur-3xl animate-pulse delay-300"></div>
      <div className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-gradient-to-r from-yellow-300/20 to-amber-300/20 rounded-full blur-3xl animate-pulse delay-700"></div>

      {/* 导航栏 - 与首页一致 */}
      <nav className="relative z-10 bg-white/70 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full flex items-center justify-center">
                  <HeartIcon className="h-5 w-5 text-white" fill="currentColor" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                  丘比特AI
                </span>
                <span className="block text-xs text-gray-500 -mt-1">情感互动平台</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                variant="ghost" 
                onClick={() => router.push('/login')}
                className="text-gray-600 hover:text-rose-600 transition-colors"
              >
                登录
              </Button>
              <Button 
                onClick={() => router.push('/register')}
                className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                立即体验
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* 主要内容区域 */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center mb-16">
          {/* 标签 */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-white/20 shadow-sm mb-6">
            <PenTool className="h-4 w-4 text-rose-500 mr-2" />
            <span className="text-sm font-medium text-gray-700">AI内容创作工具</span>
          </div>

          {/* 主标题 */}
          <div className="space-y-4 mb-8">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="block text-gray-900">内容创作</span>
              <span className="block bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                文字创造奇迹
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              使用先进的AI技术创作个性化的情感内容，
              <span className="text-rose-600 font-medium">让每一个文字都充满温度和意义</span>
            </p>
          </div>
        </div>

        {/* 内容类型选择 */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">选择创作类型</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {contentTypes.map(type => (
              <Card 
                key={type.id}
                onClick={() => handleTypeSelect(type.id)}
                className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                  selectedType === type.id 
                    ? 'bg-gradient-to-r ' + type.color + ' text-white border-0 shadow-lg' 
                    : 'bg-white/80 backdrop-blur-sm border-white/20 hover:shadow-lg'
                }`}
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center ${
                    selectedType === type.id ? 'bg-white/20' : 'bg-gradient-to-r ' + type.color
                  }`}>
                    {type.icon}
                  </div>
                  <h3 className={`font-bold mb-2 ${
                    selectedType === type.id ? 'text-white' : 'text-gray-900'
                  }`}>{type.title}</h3>
                  <p className={`text-sm ${
                    selectedType === type.id ? 'text-white/90' : 'text-gray-600'
                  }`}>{type.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 主要内容区域 */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* 左侧 - 输入区域 */}
          <div className="lg:col-span-2">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  <div className="flex items-center space-x-2">
                    <PenTool className="h-6 w-6 text-rose-500" />
                    <span>创作要求</span>
                  </div>
                </CardTitle>
                <CardDescription className="text-gray-600">
                  告诉AI您想要创作的内容和风格
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="prompt">创作要求</Label>
                  <Textarea
                    id="prompt"
                    placeholder="描述您想要创作的内容，例如：写一封给爱人的情书，表达深深的思念和爱意..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    rows={5}
                    className="bg-white/50 border-white/20 resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="context">背景信息（可选）</Label>
                  <Textarea
                    id="context"
                    placeholder="提供相关背景信息，帮助AI更好地理解您的需求..."
                    value={context}
                    onChange={(e) => setContext(e.target.value)}
                    rows={3}
                    className="bg-white/50 border-white/20 resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="style">写作风格</Label>
                    <Select value={style} onValueChange={setStyle}>
                      <SelectTrigger className="bg-white/50 border-white/20">
                        <SelectValue placeholder="选择写作风格" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="casual">日常休闲</SelectItem>
                        <SelectItem value="formal">正式严肃</SelectItem>
                        <SelectItem value="romantic">浪漫温馨</SelectItem>
                        <SelectItem value="poetic">诗意浪漫</SelectItem>
                        <SelectItem value="humorous">幽默风趣</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="length">内容长度</Label>
                    <Select value={length} onValueChange={setLength}>
                      <SelectTrigger className="bg-white/50 border-white/20">
                        <SelectValue placeholder="选择内容长度" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="short">简短精炼</SelectItem>
                        <SelectItem value="medium">中等篇幅</SelectItem>
                        <SelectItem value="long">详细长文</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* 生成进度条 */}
                {isGenerating && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">正在创作中...</span>
                      <span className="text-sm text-gray-500">{generationProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-rose-500 to-pink-500 rounded-full transition-all duration-300 ease-out"
                        style={{ width: `${generationProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* 生成按钮 */}
                <div className="flex justify-center">
                  <Button
                    onClick={handleGenerate}
                    disabled={isGenerating || !prompt.trim()}
                    className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-3 text-lg"
                    size="lg"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                        创作中...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-5 w-5 mr-2" />
                        开始创作
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 右侧 - 创作示例 */}
          <div className="lg:col-span-1">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">创作示例</CardTitle>
                <CardDescription>获取灵感参考</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedType === 'love-letter' && (
                  <div className="p-4 bg-rose-50 rounded-lg border border-rose-200">
                    <h4 className="font-semibold text-rose-800 mb-2">情书示例</h4>
                    <p className="text-sm text-gray-700 italic">
                      "亲爱的，时光荏苒，但我的心依然为你而跳动。每一次与你相处的瞬间都让我感受到前所未有的幸福..."
                    </p>
                  </div>
                )}
                
                {selectedType === 'apology' && (
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-800 mb-2">道歉信示例</h4>
                    <p className="text-sm text-gray-700 italic">
                      "我怀着深深的歉意写下这封信。我意识到自己的错误，希望你能原谅我的过失，给我们一个重新开始的机会..."
                    </p>
                  </div>
                )}
                
                {selectedType === 'message' && (
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-800 mb-2">祝福语示例</h4>
                    <p className="text-sm text-gray-700 italic">
                      "在这个特殊的日子里，愿所有的美好都围绕着你，愿你的每一天都充满阳光和欢笑。生日快乐！"
                    </p>
                  </div>
                )}
                
                {selectedType === 'poem' && (
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <h4 className="font-semibold text-purple-800 mb-2">诗歌示例</h4>
                    <p className="text-sm text-gray-700 italic">
                      "月光如水，映照我思念的泪滴；星光如钻，点缀我梦中你的身影..."
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 生成结果区域 */}
        {generatedContent && (
          <div ref={resultRef} className={`mt-12 transition-all duration-500 ${generatedContent ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <GeneratedContent 
              content={{
                content: generatedContent.text || generatedContent.content || '',
                suggestions: generatedContent.suggestions || []
              }} 
              onCopy={(text) => copyToClipboard(text)}
              onRegenerate={() => {}}
            />
          </div>
        )}
      </div>

      {/* 页脚 - 与首页一致 */}
      <footer className="relative z-10 bg-white/70 backdrop-blur-md border-t border-white/20 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full flex items-center justify-center">
                <HeartIcon className="h-4 w-4 text-white" fill="currentColor" />
              </div>
              <span className="text-lg font-bold text-gray-900">丘比特AI情感助手</span>
            </div>
            <p className="text-gray-600">
              © 2024 专为情侣设计的互动游戏平台. 让爱更美好.
            </p>
            <p className="text-sm text-gray-500">
              当前版本: v2.0.0 | 用心创造每一份感动
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}