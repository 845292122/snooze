import { sql } from 'drizzle-orm'
import { mysqlTable } from 'drizzle-orm/mysql-core'

export const users = mysqlTable('user', d => ({
  id: d
    .varchar({ length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: d.varchar({ length: 255 }),
  email: d.varchar({ length: 255 }).notNull(),
  emailVerified: d
    .timestamp({
      mode: 'date',
      fsp: 3
    })
    .default(sql`CURRENT_TIMESTAMP(3)`),
  image: d.varchar({ length: 255 })
}))
