import db from '~/server/db'
import { demoCustomer, demoOrder } from '~/server/db/schema'

export async function createDemo() {
  await db.transaction(async tx => {
    const customerIds = await tx
      .insert(demoCustomer)
      .values({
        name: 'Demo Customer',
        email: '123@qq.com',
        phone: '1234567890'
      })
      .$returningId()

    const customerId = customerIds[0].id

    await tx.insert(demoOrder).values({
      customerId: customerId
    })
  })
  return 'demo'
}
