import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { handle } from 'hono/vercel'
import userRouter from '@/lib/hono/user'

const app = new Hono().basePath('/api')

// TODO: 全局错误处理示例
app.onError((error, c) => {
  console.error('Error caught by global handler:', error)
  if (error instanceof HTTPException) {
    console.error('HTTPException cause:', error.cause)
    return error.getResponse()
  }
  return c.json({ success: false, message: 'Internal Server Error' }, 500)
})

// 注册用户路由
app.route('/user', userRouter)

export const GET = handle(app)
export const POST = handle(app)
