export default function ServerError() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">500</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">服务器错误</h2>
        <p className="text-gray-600 mb-8">抱歉，服务器遇到了问题。请稍后再试。</p>
        <a
          href="/"
          className="inline-block bg-blue-600 text-white font-medium py-2 px-6 rounded-md hover:bg-blue-700 transition-colors"
        >
          返回首页
        </a>
      </div>
    </div>
  )
}