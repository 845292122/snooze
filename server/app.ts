import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { auth } from './lib/auth'
import { logger } from './lib/logger'
import { corsMiddleware } from './middlewares/cors'
import { traceIdMiddleware } from './middlewares/trace-id'

type Variables = {
  traceId: string
}

const app = new Hono<{ Variables: Variables }>()

app.on(['POST', 'GET'], '/auth/*', c => {
  return auth.handler(c.req.raw)
})

//* traceId -> CORS -> rateLimit -> idempotency -> JWT -> 路由
app.use('*', traceIdMiddleware)
app.use('*', corsMiddleware)

// * 404处理
app.notFound(c => {
  return c.text('404 Not Found', 404)
})

// * 全局异常处理
app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return c.json(
      {
        message: err.message,
        traceId: c.get('traceId')
      },
      err.status
    )
  }

  logger.error({ err }, 'Unhandled error')
  return c.json(
    {
      message: 'Internal Server Error',
      traceId: c.get('traceId')
    },
    500
  )
})

export default app
