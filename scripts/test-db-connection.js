require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://root:qq116121@183.87.130.22:27017/cupid-ai?authSource=admin';

async function testConnection() {
  try {
    console.log('正在连接MongoDB...');
    console.log('连接字符串:', MONGODB_URI.replace(/:[^:]*@/, ':****@')); // 隐藏密码
    
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      minPoolSize: 1,
    });
    
    console.log('✅ MongoDB连接成功！');
    
    // 测试数据库操作
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('当前数据库中的集合：');
    collections.forEach(collection => {
      console.log(`- ${collection.name}`);
    });
    
    // 测试模型创建
    console.log('\n测试模型创建...');
    
    // 测试用户模型
    const User = require('../lib/models/User').default;
    console.log('✅ 用户模型加载成功');
    
    // 测试情感帖子模型
    const EmotionPost = require('../lib/models/EmotionPost').default;
    console.log('✅ 情感帖子模型加载成功');
    
    // 测试游戏进度模型
    const GameProgress = require('../lib/models/GameProgress').default;
    console.log('✅ 游戏进度模型加载成功');
    
    await mongoose.connection.close();
    console.log('\n✅ 连接已关闭');
    
  } catch (error) {
    console.error('❌ MongoDB连接失败：', error.message);
    
    if (error.name === 'MongoServerSelectionError') {
      console.log('可能的原因：');
      console.log('1. MongoDB服务器未启动');
      console.log('2. 网络连接问题');
      console.log('3. 认证信息错误');
      console.log('4. 防火墙阻止连接');
    }
    
    if (error.name === 'MongooseError') {
      console.log('Mongoose错误类型：', error.name);
    }
  }
}

testConnection();