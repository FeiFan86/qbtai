import Link from 'next/link'
import { Heart, Github, Twitter } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-12">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">产品</h3>
              <ul role="list" className="mt-4 space-y-2">
                <li>
                  <Link href="/emotion-analysis" className="text-sm text-gray-600 hover:text-gray-900">
                    情感分析
                  </Link>
                </li>
                <li>
                  <Link href="/social-assistant" className="text-sm text-gray-600 hover:text-gray-900">
                    社交助手
                  </Link>
                </li>
                <li>
                  <Link href="/emotion-diary" className="text-sm text-gray-600 hover:text-gray-900">
                    情感日记
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-900">资源</h3>
              <ul role="list" className="mt-4 space-y-2">
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                    使用指南
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                    API文档
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                    博客
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-900">公司</h3>
              <ul role="list" className="mt-4 space-y-2">
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                    关于我们
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                    隐私政策
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                    服务条款
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-900">关注我们</h3>
              <ul role="list" className="mt-4 flex space-x-4">
                <li>
                  <Link href="#" className="text-gray-600 hover:text-gray-900">
                    <Github className="h-6 w-6" />
                    <span className="sr-only">GitHub</span>
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-gray-900">
                    <Twitter className="h-6 w-6" />
                    <span className="sr-only">Twitter</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 border-t border-gray-200 pt-8">
            <p className="text-sm leading-6 text-gray-600 text-center">
              &copy; 2024 丘比特AI. 用 
              <Heart className="inline h-4 w-4 mx-1 text-pink-500" fill="currentColor" /> 
              打造，助力每一段关系
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}