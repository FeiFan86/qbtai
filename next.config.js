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
  // 完全禁用静态生成以解决事件处理器序列化问题
  output: 'standalone',
  trailingSlash: false,
  // 禁用静态生成
  distDir: '.next',
  // 强制动态渲染
  generateBuildId: () => 'build',
  // 添加自定义的 webpack 配置
  webpack: (config, { isServer }) => {
    // 解决静态生成问题
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        path: false,
        os: false,
      }
    }
    return config
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
    serverComponentsExternalPackages: [],
    // 启用这些实验性功能
    optimizeCss: true,
    scrollRestoration: true,
    largePageDataBytes: 128 * 1000, // 128KB
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