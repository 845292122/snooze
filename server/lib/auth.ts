import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { username } from 'better-auth/plugins'
import db from '../db'

/**
 * 0. 安装 Better Auth
 * 1. 配置环境变量（secret + base URL）
 * 2. 实例化 Better Auth（启用 email/password + OAuth）
 * 3. 挂载 Auth 处理路由 /api/auth/*
 * 4. 生成/应用数据库 schema（CLI）
 * 5. 前端创建 auth client 调用注册/登录
 * 6. 自定义中间件保护 API
 */
export const auth = betterAuth({
  // 配置数据库 + auth 方法
  database: drizzleAdapter(db, {
    provider: 'mysql'
  }),
  emailAndPassword: {
    enabled: true
  },
  socialProviders: {
    // github: {
    //   clientId: process.env.GITHUB_CLIENT_ID as string,
    //   clientSecret: process.env.GITHUB_CLIENT_SECRET as string
    // }
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 天
    updateAge: 60 * 60 * 24, // 1 天
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60 // 5 分钟
    }
  },
  advanced: {
    generateId: () => crypto.randomUUID(),
    useSecureCookies: process.env.NODE_ENV === 'production'
  },
  plugins: [username()]
})
