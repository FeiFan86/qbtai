import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { MessageCircle, Heart, BarChart3, Users, Sparkles, Shield } from 'lucide-react'

export function Features() {
  const features = [
    {
      icon: <MessageCircle className="h-8 w-8 text-pink-500" />,
      title: "多模态情感分析",
      description: "支持文本、语音和图像多维度情感识别，全面理解情感表达"
    },
    {
      icon: <Heart className="h-8 w-8 text-purple-500" />,
      title: "智能情感建议",
      description: "基于情感状态和上下文，提供个性化的社交和沟通建议"
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-indigo-500" />,
      title: "情感数据洞察",
      description: "可视化情感趋势和模式，深入理解自己的情感变化"
    },
    {
      icon: <Users className="h-8 w-8 text-pink-500" />,
      title: "社交互动优化",
      description: "分析对话内容，实时提供社交策略和话术建议"
    },
    {
      icon: <Sparkles className="h-8 w-8 text-purple-500" />,
      title: "情感内容创作",
      description: "AI辅助创作情感化内容，表达内心真实感受"
    },
    {
      icon: <Shield className="h-8 w-8 text-indigo-500" />,
      title: "隐私安全保护",
      description: "端到端加密，保护您的情感数据和隐私安全"
    }
  ]

  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            强大功能，助力情感理解
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
            丘比特AI集成多项先进技术，为您提供全方位的情感分析和社交辅助
          </p>
        </div>
        
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 h-16 w-16 rounded-full bg-gradient-to-br from-pink-100 to-purple-100"></div>
              <CardHeader className="pb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-pink-50 to-purple-50">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}