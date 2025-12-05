// 创建管理员账号脚本
const bcrypt = require('bcryptjs')

// 预设管理员账号信息
const adminUser = {
  username: 'admin',
  email: 'admin@cupidai.com',
  password: 'admin123456',
  role: 'superadmin',
  membership: {
    level: 'vip',
    expiryDate: new Date('2030-12-31')
  },
  isActive: true,
  createdAt: new Date(),
  lastLogin: new Date()
}

// 使用 bcrypt 加密密码
async function createAdminAccount() {
  try {
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(adminUser.password, saltRounds)
    
    const userWithHashedPassword = {
      ...adminUser,
      password: hashedPassword
    }
    
    console.log('管理员账号信息：')
    console.log('用户名：', adminUser.username)
    console.log('邮箱：', adminUser.email)
    console.log('密码：', adminUser.password)
    console.log('角色：', adminUser.role)
    console.log('加密后的密码：', hashedPassword)
    console.log('\n请使用以下账号登录后台：')
    console.log('用户名：admin')
    console.log('密码：admin123456')
    console.log('后台地址：http://localhost:3000/admin')
    
  } catch (error) {
    console.error('创建管理员账号失败：', error)
  }
}

createAdminAccount()