'use client'

import { useState } from 'react'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function DebugPage() {
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const testAPI = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/emotion/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          input: '今天心情很好，阳光明媚，工作也很顺利！',
          type: 'text'
        }),
      })
      
      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({ error: error instanceof Error ? error.message : String(error) })
    } finally {
      setLoading(false)
    }
  }

  const checkEnv = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/debug/env')
      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({ error: error instanceof Error ? error.message : String(error) })
    } finally {
      setLoading(false)
    }
  }

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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>测试API</CardTitle>
                <CardDescription>
                  点击按钮测试情感分析API
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={testAPI} disabled={loading}>
                  {loading ? '测试中...' : '测试情感分析API'}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>检查环境变量</CardTitle>
                <CardDescription>
                  检查服务器端环境变量配置
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={checkEnv} disabled={loading}>
                  {loading ? '检查中...' : '检查环境变量'}
                </Button>
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