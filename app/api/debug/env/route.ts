import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // 检查环境变量是否配置（不暴露实际值，只检查是否存在）
    const envChecks = {
      volcano_api_key: !!process.env.VOLCANO_API_KEY,
      volcano_base_url: !!process.env.VOLCANO_BASE_URL,
      deepseek_model: !!process.env.DEEPSEEK_MODEL,
      node_env: process.env.NODE_ENV,
    }

    // 如果在开发环境，显示更多信息
    if (process.env.NODE_ENV === 'development') {
      return NextResponse.json({
        environment: 'development',
        env: envChecks,
        volcano_config: {
          base_url: process.env.VOLCANO_BASE_URL,
          model: process.env.DEEPSEEK_MODEL,
          api_key_prefix: process.env.VOLCANO_API_KEY ? 
            `${process.env.VOLCANO_API_KEY.substring(0, 8)}...` : 'missing'
        }
      })
    }

    // 生产环境只返回检查状态
    return NextResponse.json({
      environment: 'production',
      env: envChecks,
      message: envChecks.volcano_api_key && envChecks.volcano_base_url && envChecks.deepseek_model
        ? '所有必需的环境变量已配置'
        : '缺少必需的环境变量，请检查Vercel项目设置'
    })
  } catch (error) {
    return NextResponse.json(
      { error: '获取环境变量信息失败' },
      { status: 500 }
    )
  }
}