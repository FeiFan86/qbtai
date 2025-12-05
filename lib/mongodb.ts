import { MongoClient, Db } from 'mongodb'

const MONGODB_URI = process.env.MONGODB_URI || `mongodb://root:qq116121@183.87.130.22:27017/cupid-ai?authSource=admin`
const MONGODB_DB = 'cupid-ai'

if (!MONGODB_URI) {
  throw new Error('请设置MONGODB_URI环境变量')
}

if (!MONGODB_DB) {
  throw new Error('请设置MONGODB_DB环境变量')
}

interface MongoConnection {
  client: MongoClient
  db: Db
}

let cachedConnection: MongoConnection | null = null

/**
 * 连接到MongoDB数据库
 */
export async function connectToDatabase(): Promise<MongoConnection> {
  if (cachedConnection) {
    return cachedConnection
  }

  const client = new MongoClient(MONGODB_URI, {
    // 连接选项
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    maxPoolSize: 10,
    minPoolSize: 1,
    maxIdleTimeMS: 30000,
  })

  try {
    await client.connect()
    const db = client.db(MONGODB_DB)
    
    cachedConnection = {
      client,
      db
    }
    
    console.log('MongoDB连接成功')
    return cachedConnection
  } catch (error) {
    console.error('MongoDB连接失败:', error)
    throw error
  }
}

/**
 * 获取数据库实例
 */
export async function getDatabase(): Promise<Db> {
  const { db } = await connectToDatabase()
  return db
}

/**
 * 关闭数据库连接
 */
export async function closeConnection(): Promise<void> {
  if (cachedConnection) {
    await cachedConnection.client.close()
    cachedConnection = null
    console.log('MongoDB连接已关闭')
  }
}