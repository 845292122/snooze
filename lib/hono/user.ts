import { Hono } from 'hono'

const userRouter = new Hono()

userRouter.get('/', async c => {
  return c.body('User Home')
})

export default userRouter
