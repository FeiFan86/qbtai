'use client'

import { useState, useEffect } from 'react'
import { Navigation } from '@/components/navigation'
import { ChatEmotionAnalysis } from '@/components/chat-emotion-analysis-enhanced'
import { ConversationAnalysis } from '@/components/conversation-analysis-enhanced'
import { SocialStrategies } from '@/components/social-strategies-enhanced'
import { GeneratedContent } from '@/components/generated-content-enhanced'
import { ResponsiveLayout, GridLayout, TouchButton } from '@/components/responsive-layout'
import { LoadingOverlay, ErrorMessage } from '@/components/loading-spinner'
import { useApiCall } from '@/lib/loading-utils'

export default function Home() {
  const [activeTab, setActiveTab] = useState('chat')
  const [conversation, setConversation] = useState('')
  const [analysisResult, setAnalysisResult] = useState<any>(null)

  // 使用改进的API调用钩子
  const { 
    data: analysisData, 
    loading: analysisLoading, 
    error: analysisError, 
    execute: analyzeConversation 
  } = useApiCall(async (text: string) => {
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // 返回模拟数据
    return {
      conversationAnalysis: {
        overallSentiment: text.includes('开心') ? 'positive' : 'neutral',
        communicationStyle: 'cooperative',
        emotionalIntelligence: 0.75,
        conflictLevel: 0.2,
        empathyScore: 0.8
      },
      participantAnalysis: {
        user: {
          emotionalState: '积极',
          communicationStyle: '开放',
          needs: ['理解', '支持', '认可'],
          strengths: ['表达清晰', '同理心强', '耐心']
        },
        other: {
          emotionalState: '中性',
          communicationStyle: '合作',
          needs: ['尊重', '沟通', '解决方案'],
          strengths: ['逻辑清晰', '理性', '善于倾听']
        }
      },
      improvementSuggestions: [
        '可以尝试更多开放式问题来促进对话',
        '注意对方的非语言信号，调整沟通方式',
        '适时表达对对方观点的理解和认同'
      ],
      responseTemplates: [
        '我理解你的感受，我们可以一起找到解决方案',
        '谢谢你的分享，这让我更好地理解你的立场',
        '让我们从不同角度看看这个问题'
      ]
    }
  })

  const handleAnalyze = async () => {
    if (!conversation.trim()) return
    
    try {
      const result = await analyzeConversation(conversation)
      setAnalysisResult(result)
    } catch (error) {
      console.error('分析失败:', error)
    }
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      console.log('内容已复制')
    })
  }

  const handleRegenerate = () => {
    if (conversation.trim()) {
      handleAnalyze()
    }
  }

  // 移动端优化：监听屏幕尺寸变化
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 导航 */}
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* 主要内容区域 */}
      <ResponsiveLayout className="py-6">
        {activeTab === 'chat' && (
          <div className="space-y-6">
            <ChatEmotionAnalysisEnhanced 
              conversation={conversation}
              onConversationChange={setConversation}
              onAnalyze={handleAnalyze}
              loading={analysisLoading}
              error={analysisError}
              result={analysisResult}
            />
            
            {analysisResult && (
              <GridLayout cols={{ mobile: 1, tablet: 1, desktop: 2 }}>
                <ConversationAnalysisEnhanced 
                  result={analysisResult}
                  loading={analysisLoading}
                  error={analysisError}
                  onRetry={handleAnalyze}
                />
                
                <SocialStrategiesEnhanced 
                  result={analysisResult}
                  loading={analysisLoading}
                  error={analysisError}
                  onRetry={handleAnalyze}
                />
              </GridLayout>
            )}
            
            {analysisResult && (
              <GeneratedContentEnhanced 
                content={{
                  content: `基于对话分析，您的沟通表现出以下特点：\n\n情感倾向：${analysisResult.conversationAnalysis.overallSentiment === 'positive' ? '积极' : '中性'}\n沟通风格：${analysisResult.conversationAnalysis.communicationStyle === 'cooperative' ? '合作型' : '其他'}\n情商得分：${(analysisResult.conversationAnalysis.emotionalIntelligence * 100).toFixed(0)}%`,
                  suggestions: analysisResult.improvementSuggestions
                }}
                onCopy={handleCopy}
                onRegenerate={handleRegenerate}
                title="分析总结"
              />
            )}
          </div>
        )}
        
        {activeTab === 'analysis' && (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">深度分析功能</h2>
            <p className="text-gray-600">正在开发中...</p>
          </div>
        )}
        
        {activeTab === 'strategies' && (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">策略库</h2>
            <p className="text-gray-600">正在开发中...</p>
          </div>
        )}
      </ResponsiveLayout>

      {/* 全局加载状态 */}
      {analysisLoading && (
        <LoadingOverlay message="正在分析对话内容..." />
      )}

      {/* 全局错误提示 */}
      {analysisError && (
        <ErrorMessage 
          message={analysisError}
          onRetry={handleAnalyze}
          className="fixed bottom-4 right-4 z-50"
        />
      )}
    </div>
  )
}

// 使用增强版本的组件
const ChatEmotionAnalysisEnhanced = ({ conversation, onConversationChange, onAnalyze, loading, error, result }: any) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">
    <h2 className="text-xl font-semibold mb-4">对话情感分析</h2>
    <textarea
      value={conversation}
      onChange={(e) => onConversationChange(e.target.value)}
      placeholder="请输入对话内容..."
      className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
    />
    <TouchButton 
      onClick={onAnalyze}
      disabled={loading || !conversation.trim()}
      className="w-full mt-4"
      size={isMobile ? 'lg' : 'md'}
    >
      {loading ? '分析中...' : '开始分析'}
    </TouchButton>
  </div>
)