import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import userRouter from '@/lib/hono/user'

const app = new Hono().basePath('/api')

// 添加根路由用于测试
app.get('/', c => {
  return c.json({ message: 'API is working' })
})

// 注册用户路由
app.route('/user', userRouter)

export const GET = handle(app)
export const POST = handle(app)
