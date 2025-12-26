import { Hono } from 'hono'
import db from '../db'
import { user } from '../db/schema'

const userRouter = new Hono()

// 获取用户列表
userRouter.get('/', async c => {
  const userlist = await db.select().from(user)
  console.log(userlist)
  return c.json({ success: true, data: userlist })
})

export default userRouter
