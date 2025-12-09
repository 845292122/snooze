import { Hono } from 'hono'
import userRouter from './user'

const app = new Hono()
app.route('/user', userRouter)

export default app
