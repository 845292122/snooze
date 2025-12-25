import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { logger } from './lib'
import { corsMiddleware, traceIdMiddleware } from './middlewares'

type Variables = {
  traceId: string
}

const app = new Hono<{ Variables: Variables }>()

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
