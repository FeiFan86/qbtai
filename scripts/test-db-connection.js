const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb://root:qq116121@183.87.130.22:27017/cupid-ai?authSource=admin';

async function testConnection() {
  try {
    console.log('正在连接MongoDB...');
    
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    console.log('✅ MongoDB连接成功！');
    
    // 测试数据库操作
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('当前数据库中的集合：');
    collections.forEach(collection => {
      console.log(`- ${collection.name}`);
    });
    
    await mongoose.connection.close();
    console.log('连接已关闭');
    
  } catch (error) {
    console.error('❌ MongoDB连接失败：', error.message);
    
    if (error.name === 'MongoServerSelectionError') {
      console.log('可能的原因：');
      console.log('1. MongoDB服务器未启动');
      console.log('2. 网络连接问题');
      console.log('3. 认证信息错误');
      console.log('4. 防火墙阻止连接');
    }
  }
}

testConnection();