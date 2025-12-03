import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI || `mongodb://root:qq116121@183.87.130.22:27017/cupid-ai?authSource=admin`

interface MongooseCache {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

declare global {
  var mongoose: MongooseCache
}

if (!MONGODB_URI) {
  throw new Error('请设置MONGODB_URI环境变量')
}

let cached: MongooseCache = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts)
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}

export default connectDB