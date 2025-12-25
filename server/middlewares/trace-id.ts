import type { MiddlewareHandler } from 'hono'
import { logger } from '../lib'

export const traceIdMiddleware: MiddlewareHandler = async (c, next) => {
  const traceId = c.req.header('x-request-id') ?? crypto.randomUUID()
  c.set('traceId', traceId)
  c.header('x-request-id', traceId)
  c.set(
    'logger',
    logger.child({
      traceId,
      path: c.req.path,
      method: c.req.method
    })
  )

  await next()
}
