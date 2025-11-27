import { Button } from './ui/button'
import { ArrowRight, Sparkles, Heart, Brain } from 'lucide-react'
import Link from 'next/link'

export function Hero() {
  return (
    <section className="relative py-20 px-4 text-center lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-pink-200/20 via-transparent to-transparent"></div>
      <div className="relative mx-auto max-w-4xl">
        <div className="mb-8 flex justify-center">
          <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
            基于 DeepSeek 模型的智能情感分析
            <span className="absolute -right-2 -top-2 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
            </span>
          </div>
        </div>
        
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          理解情感，
          <span className="gradient-text"> 改善关系</span>
        </h1>
        
        <p className="mt-6 text-lg leading-8 text-gray-600 max-w-3xl mx-auto">
          丘比特AI利用先进的深度学习技术，为您提供深度的情感分析和个性化的社交建议。
          让每一次交流都更加精准，每一段关系都更加和谐。
        </p>
        
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button variant="pink" size="lg" asChild className="group">
            <Link href="/emotion-analysis">
              立即体验
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="#features">
              了解更多
            </Link>
          </Button>
        </div>
        
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div className="flex flex-col items-center gap-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-100">
              <Heart className="h-6 w-6 text-pink-600" />
            </div>
            <h3 className="text-lg font-semibold">情感分析</h3>
            <p className="text-center text-sm text-gray-600">
              多维度精准识别文本、语音和图像中的情感信息
            </p>
          </div>
          
          <div className="flex flex-col items-center gap-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
              <Brain className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold">智能建议</h3>
            <p className="text-center text-sm text-gray-600">
              基于情感状态提供个性化的社交和沟通建议
            </p>
          </div>
          
          <div className="flex flex-col items-center gap-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
              <Sparkles className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold">数据洞察</h3>
            <p className="text-center text-sm text-gray-600">
              可视化情感趋势，深入理解自己的情感模式
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}