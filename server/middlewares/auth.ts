import type { MiddlewareHandler } from 'hono'
import { auth } from '../lib/auth'

export const authMiddleware: MiddlewareHandler = async (c, next) => {
  const session = await auth.api.getSession({
    headers: c.req.raw.headers
  })

  if (!session) {
    return c.json({ message: '未授权' }, 401)
  }

  c.set('user', session.user)
  c.set('session', session.session)
  await next()
}
