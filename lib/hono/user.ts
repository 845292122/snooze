import { Hono } from 'hono'

const userRouter = new Hono()

// 获取用户列表
userRouter.get('/', async c => {
  return c.text('Get user list')
})

export default userRouter
