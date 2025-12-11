'use client'

import React, { useState } from 'react'
import { GameLayout } from '@/components/game/GameLayout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { 
  Heart, 
  PenTool, 
  Save, 
  Share2, 
  Download,
  Clock,
  Palette,
  Type,
  Sparkles,
  Lock
} from 'lucide-react'
import { motion } from 'framer-motion'

interface LoveLetter {
  id: string
  title: string
  content: string
  recipient: string
  style: 'romantic' | 'playful' | 'sincere' | 'poetic'
  createdAt: Date
  isEncrypted: boolean
}

const STYLE_TEMPLATES = {
  romantic: {
    label: '浪漫深情',
    color: 'bg-pink-100 text-pink-800',
    greeting: '亲爱的',
    closing: '永远爱你的',
    prompts: [
      '你是我生命中最美的意外',
      '每次见到你，我的心都会加速跳动',
      '你的笑容是我最大的幸福'
    ]
  },
  playful: {
    label: '俏皮可爱', 
    color: 'bg-yellow-100 text-yellow-800',
    greeting: '嗨，小可爱',
    closing: '你的小调皮',
    prompts: [
      '今天又想你了，像小熊想蜂蜜一样',
      '你是我最想分享快乐的人',
      '和你在一起的每一天都像过节'
    ]
  },
  sincere: {
    label: '真诚朴实',
    color: 'bg-blue-100 text-blue-800',
    greeting: '亲爱的',
    closing: '真心祝福你的',
    prompts: [
      '感谢你一直以来的陪伴',
      '你的支持让我变得更好',
      '我们一起经历的点点滴滴都很珍贵'
    ]
  },
  poetic: {
    label: '诗意唯美',
    color: 'bg-purple-100 text-purple-800',
    greeting: '致我最爱的人',
    closing: '永远守护你的',
    prompts: [
      '你如春风般温暖我的心田',
      '我们的爱情如诗如画',
      '你是我生命中最美的诗篇'
    ]
  }
} as const

export default function SecretLoveLetterPage() {
  const [currentLetter, setCurrentLetter] = useState<Partial<LoveLetter>>({
    title: '',
    content: '',
    recipient: '',
    style: 'romantic',
    isEncrypted: false
  })
  const [savedLetters, setSavedLetters] = useState<LoveLetter[]>([])
  const [selectedTemplate, setSelectedTemplate] = useState<string>('')

  const handleSave = () => {
    if (!currentLetter.title || !currentLetter.content || !currentLetter.recipient) {
      alert('请填写完整的信件信息')
      return
    }

    const newLetter: LoveLetter = {
      id: Date.now().toString(),
      title: currentLetter.title,
      content: currentLetter.content,
      recipient: currentLetter.recipient,
      style: currentLetter.style || 'romantic',
      createdAt: new Date(),
      isEncrypted: currentLetter.isEncrypted || false
    }

    setSavedLetters(prev => [newLetter, ...prev])
    
    // 保存到本地存储
    const updatedLetters = [newLetter, ...savedLetters]
    localStorage.setItem('love-letters', JSON.stringify(updatedLetters))
    
    alert('信件保存成功！')
  }

  const handleTemplateSelect = (template: keyof typeof STYLE_TEMPLATES) => {
    const styleConfig = STYLE_TEMPLATES[template]
    setCurrentLetter(prev => ({
      ...prev,
      style: template,
      content: prev.content || `${styleConfig.greeting} ${prev.recipient || ''},\n\n${styleConfig.prompts[0]}\n\n${styleConfig.closing},\n${prev.recipient ? '我' : ''}`
    }))
    setSelectedTemplate(template)
  }

  const handlePromptSelect = (prompt: string) => {
    setCurrentLetter(prev => ({
      ...prev,
      content: prev.content ? prev.content + '\n' + prompt : prompt
    }))
  }

  const handleExport = () => {
    if (!currentLetter.content) return

    const content = `
${currentLetter.title || '未命名情书'}

致：${currentLetter.recipient || '亲爱的'}

${currentLetter.content}

创作时间：${new Date().toLocaleDateString('zh-CN')}
    `.trim()

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `情书_${currentLetter.recipient || '未命名'}_${Date.now()}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  const deleteLetter = (id: string) => {
    setSavedLetters(prev => prev.filter(letter => letter.id !== id))
    localStorage.setItem('love-letters', JSON.stringify(savedLetters.filter(letter => letter.id !== id)))
  }

  const loadLetter = (letter: LoveLetter) => {
    setCurrentLetter(letter)
    setSelectedTemplate(letter.style)
  }

  const currentStyle = STYLE_TEMPLATES[currentLetter.style || 'romantic']

  return (
    <GameLayout
      title="秘密情书"
      description="情书创作与分享"
      showSettings
      showShare
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左侧 - 编辑区域 */}
        <div className="lg:col-span-2 space-y-6">
          {/* 基本信息 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <PenTool className="h-5 w-5 text-pink-500" />
                <span>信件信息</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    信件标题
                  </label>
                  <Input
                    value={currentLetter.title || ''}
                    onChange={(e) => setCurrentLetter(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="例如：给最爱的你"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    收信人
                  </label>
                  <Input
                    value={currentLetter.recipient || ''}
                    onChange={(e) => setCurrentLetter(prev => ({ ...prev, recipient: e.target.value }))}
                    placeholder="输入对方的名字"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={currentLetter.isEncrypted || false}
                    onChange={(e) => setCurrentLetter(prev => ({ ...prev, isEncrypted: e.target.checked }))}
                    className="rounded border-gray-300"
                  />
                  <Lock className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-700">加密保存</span>
                </label>
              </div>
            </CardContent>
          </Card>

          {/* 风格选择 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Palette className="h-5 w-5 text-purple-500" />
                <span>选择风格</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {Object.entries(STYLE_TEMPLATES).map(([key, config]) => (
                  <button
                    key={key}
                    onClick={() => handleTemplateSelect(key as keyof typeof STYLE_TEMPLATES)}
                    className={`p-3 rounded-lg text-center transition-all ${
                      selectedTemplate === key
                        ? `${config.color} shadow-md border-2 border-current`
                        : 'bg-gray-100 hover:bg-gray-200 border-2 border-transparent'
                    }`}
                  >
                    <Heart className="h-6 w-6 mx-auto mb-2" />
                    <div className="font-medium text-sm">{config.label}</div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 内容编辑 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Type className="h-5 w-5 text-blue-500" />
                <span>书写情书</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* 写作提示 */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  写作提示
                </label>
                <div className="flex flex-wrap gap-2">
                  {currentStyle.prompts.map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => handlePromptSelect(prompt)}
                      className="px-3 py-1 bg-pink-100 text-pink-700 text-sm rounded-full hover:bg-pink-200 transition-colors"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>

              {/* 内容编辑 */}
              <Textarea
                value={currentLetter.content || ''}
                onChange={(e) => setCurrentLetter(prev => ({ ...prev, content: e.target.value }))}
                placeholder="在这里写下你的真情实感..."
                className="min-h-[300px] resize-none font-serif text-lg leading-relaxed"
                maxLength={2000}
              />
              
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>{currentLetter.content?.length || 0}/2000</span>
                <div className="flex items-center space-x-2">
                  <Sparkles className="h-4 w-4" />
                  <span>{currentStyle.label}风格</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 操作按钮 */}
          <div className="flex space-x-3">
            <Button
              onClick={handleSave}
              disabled={!currentLetter.title || !currentLetter.content || !currentLetter.recipient}
              className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600"
            >
              <Save className="h-4 w-4 mr-2" />
              保存信件
            </Button>
            <Button
              onClick={handleExport}
              disabled={!currentLetter.content}
              variant="outline"
              className="flex-1"
            >
              <Download className="h-4 w-4 mr-2" />
              导出文本
            </Button>
          </div>
        </div>

        {/* 右侧 - 历史记录 */}
        <div className="space-y-6">
          {/* 预览 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Heart className="h-5 w-5 text-red-500" />
                <span>信件预览</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {currentLetter.content ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-4 bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg min-h-[200px]"
                >
                  <div className="font-serif text-gray-800 whitespace-pre-wrap leading-relaxed">
                    {currentLetter.content}
                  </div>
                  {currentLetter.recipient && (
                    <div className="mt-4 pt-4 border-t border-pink-200 text-right text-sm text-gray-600">
                      —— 致 {currentLetter.recipient}
                    </div>
                  )}
                </motion.div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <PenTool className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p>开始书写你的情书吧</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* 历史信件 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-blue-500" />
                <span>历史信件</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {savedLetters.length === 0 ? (
                <div className="text-center py-4 text-gray-500">
                  暂无保存的信件
                </div>
              ) : (
                <div className="space-y-3 max-h-[400px] overflow-y-auto">
                  {savedLetters.map((letter) => {
                    const styleConfig = STYLE_TEMPLATES[letter.style]
                    return (
                      <div key={letter.id} className="border rounded-lg p-3 group">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div className="font-medium">{letter.title}</div>
                            <div className="text-sm text-gray-500">
                              致：{letter.recipient}
                            </div>
                          </div>
                          <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => loadLetter(letter)}
                            >
                              编辑
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteLetter(letter.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              删除
                            </Button>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center text-xs text-gray-500">
                          <span className={`px-2 py-1 rounded-full ${styleConfig.color}`}>
                            {styleConfig.label}
                          </span>
                          <span>
                            {letter.createdAt.toLocaleDateString('zh-CN')}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </GameLayout>
  )
}