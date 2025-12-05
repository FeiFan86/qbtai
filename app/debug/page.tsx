'use client'

import { useState } from 'react'
import Navigation from '../components/navigation'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function DebugPage() {
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [activeTest, setActiveTest] = useState<string>('')

  const testAPI = async (endpoint: string, payload?: any) => {
    setActiveTest(endpoint)
    setLoading(true)
    try {
      const response = await fetch(endpoint, {
        method: payload ? 'POST' : 'GET',
        headers: payload ? {
          'Content-Type': 'application/json',
        } : {},
        body: payload ? JSON.stringify(payload) : undefined,
      })
      
      const data = await response.json()
      setResult({
        endpoint,
        method: payload ? 'POST' : 'GET',
        status: response.status,
        data
      })
    } catch (error) {
      setResult({ 
        endpoint,
        error: error instanceof Error ? error.message : String(error) 
      })
    } finally {
      setLoading(false)
      setActiveTest('')
    }
  }

  const testEmotionAPI = () => testAPI('/api/emotion/analyze', { 
    input: '今天心情很好，阳光明媚，工作也很顺利！',
    type: 'text'
  })

  const testChatAPI = () => testAPI('/api/chat/emotion', {
    message: '你好，今天天气真好！',
    context: '日常问候'
  })

  const testContentAPI = () => testAPI('/api/content/generate', {
    topic: '情感健康',
    type: '文章',
    tone: '积极'
  })

  const testSocialAPI = () => testAPI('/api/social/analyze', {
    text: '今天和朋友们一起度过了愉快的时光！',
    platform: '微信'
  })

  const checkEnv = () => testAPI('/api/debug/env')

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold tracking-tight gradient-text mb-4">
              API 调试页面
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              用于测试和调试API功能
            </p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>API状态检查</CardTitle>
                <CardDescription>
                  检查所有API端点的状态和响应
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Button 
                    onClick={checkEnv} 
                    disabled={loading}
                    variant={activeTest === '/api/debug/env' ? 'default' : 'outline'}
                  >
                    {loading && activeTest === '/api/debug/env' ? '检查中...' : '环境状态'}
                  </Button>
                  <Button 
                    onClick={testEmotionAPI} 
                    disabled={loading}
                    variant={activeTest === '/api/emotion/analyze' ? 'default' : 'outline'}
                  >
                    {loading && activeTest === '/api/emotion/analyze' ? '测试中...' : '情感分析'}
                  </Button>
                  <Button 
                    onClick={testChatAPI} 
                    disabled={loading}
                    variant={activeTest === '/api/chat/emotion' ? 'default' : 'outline'}
                  >
                    {loading && activeTest === '/api/chat/emotion' ? '测试中...' : '聊天分析'}
                  </Button>
                  <Button 
                    onClick={testContentAPI} 
                    disabled={loading}
                    variant={activeTest === '/api/content/generate' ? 'default' : 'outline'}
                  >
                    {loading && activeTest === '/api/content/generate' ? '测试中...' : '内容生成'}
                  </Button>
                  <Button 
                    onClick={testSocialAPI} 
                    disabled={loading}
                    variant={activeTest === '/api/social/analyze' ? 'default' : 'outline'}
                  >
                    {loading && activeTest === '/api/social/analyze' ? '测试中...' : '社交分析'}
                  </Button>
                  <Button 
                    onClick={() => {
                      setResult(null)
                      setActiveTest('')
                    }}
                    variant="outline"
                  >
                    清空结果
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>系统信息</CardTitle>
                <CardDescription>
                  当前应用状态和配置信息
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="text-center">
                    <div className="font-semibold">游戏模块</div>
                    <div className="text-green-600">10/10 完成</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold">API端点</div>
                    <div className="text-blue-600">5/5 可用</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold">构建状态</div>
                    <div className="text-green-600">正常</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold">项目进度</div>
                    <div className="text-yellow-600">95%</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {result && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>结果</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-gray-100 p-4 rounded overflow-auto">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  )
}