import { Hono } from 'hono'

const userRouter = new Hono()

userRouter.get('/', async c => {
  return c.json({ message: 'User Home' }) // 使用 c.json()
})

userRouter.post('/test', async c => {
  return c.json({ message: 'User Test POST' }) // 使用 c.json()
})

export default userRouter
