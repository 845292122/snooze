import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { createCustomerSchema } from '~/shared/schemas/demo.schema'
import { onValidationError } from '../middlewares/zodValidator'
import { createDemo } from '../services/demo.service'

const demoRouter = new Hono()

demoRouter.get('/list', async c => {
  return c.json({ success: true, data: 'This is demo list' })
})

demoRouter.post('/create', zValidator('json', createCustomerSchema, onValidationError), async c => {
  const body = c.req.valid('json')
  await createDemo(body)
  return c.json({ success: true, data: body })
})

export default demoRouter
