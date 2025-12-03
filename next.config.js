/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'localhost',
      'avatars.githubusercontent.com',
      'images.unsplash.com',
      'api.dicebear.com'
    ],
  },
  env: {
    NEXT_PUBLIC_APP_NAME: '丘比特AI情感助手',
  },
  // 配置为独立模式
  output: 'standalone',
  trailingSlash: false,
  distDir: '.next',
  // 简化的 webpack 配置
  webpack: (config, { isServer }) => {
    return config
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
    serverComponentsExternalPackages: [],
    // 移除所有有问题的实验性功能
    // optimizeCss: true, // 需要 critters 包，已禁用
    // scrollRestoration: true,
    // largePageDataBytes: 128 * 1000,
  },
  // 添加自定义页面扩展
  pageExtensions: ['tsx', 'ts', 'js', 'jsx'],
  // 强制所有页面动态渲染
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: '/:path*',
      }
    ]
  },
}

module.exports = nextConfig