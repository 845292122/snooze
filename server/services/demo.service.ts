import db from '~/server/db'
import { demoCustomer, demoOrder } from '~/server/db/schema'
import type { CreateCustomerInput } from '~/shared/schemas/demo.schema'

export async function createDemo(customerData: CreateCustomerInput) {
  const { name, email, phone } = customerData

  await db.transaction(async tx => {
    const customerIds = await tx
      .insert(demoCustomer)
      .values({
        name,
        email,
        phone
      })
      .$returningId()

    const customerId = customerIds[0].id

    await tx.insert(demoOrder).values({
      customerId: customerId
    })
  })
  return 'demo'
}
