import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { logger } from './lib'
import { traceIdMiddleware } from './middlewares/trace-id'

const app = new Hono({})

app.use('*', traceIdMiddleware)

// * 404处理
app.notFound(c => {
  return c.text('404 Not Found', 404)
})

// * 全局异常处理
app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return err.getResponse()
  }

  logger.error({ err }, 'Unhandled error')
  return c.json(
    {
      success: false,
      message: err.message || 'Internal Server Error'
    },
    500
  )
})

export default app
