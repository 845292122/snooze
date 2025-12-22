import { relations, sql } from 'drizzle-orm'
import {
  index,
  int,
  mysqlEnum,
  mysqlTable,
  timestamp,
  uniqueIndex,
  varchar
} from 'drizzle-orm/mysql-core'

// * 用户表
export const user = mysqlTable(
  'user',
  {
    id: int('id').primaryKey().autoincrement(),
    clinicId: int('clinic_id').notNull(),
    type: mysqlEnum('type', ['admin', 'clinic_user']).notNull(),
    phone: varchar('phone', { length: 20 }).notNull(),
    passwordHash: varchar('password_hash', { length: 255 }).notNull(),
    avatar: varchar('avatar', { length: 1000 }),
    status: mysqlEnum('status', ['active', 'inactive']).notNull().default('active'),
    createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
    lastLoginAt: timestamp('last_login_at')
  },
  t => [
    index('typeIdx').on(t.type),
    index('clinicIdx').on(t.clinicId),
    index('phoneIdx').on(t.phone),
    index('statusIdx').on(t.status)
  ]
)

// * 诊所信息表
export const clinic = mysqlTable(
  'clinic',
  {
    id: int('id').primaryKey().autoincrement(),
    name: varchar('name', { length: 100 }).notNull(),
    address: varchar('address', { length: 255 }),
    contact: varchar('contact', { length: 100 }),
    phone: varchar('phone', { length: 20 }),
    status: mysqlEnum('status', ['active', 'inactive', 'trial']).notNull().default('active'),
    createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
    updatedAt: timestamp('updated_at')
      .default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`)
      .notNull()
  },
  t => [index('nameIdx').on(t.name)]
)

// * 微信授权
export const wechatAuth = mysqlTable(
  'wechat_auth',
  {
    id: int('id').primaryKey().autoincrement(),
    userId: int('user_id')
      .notNull()
      .references(() => user.id),
    openId: varchar('open_id', { length: 100 }).notNull(),
    unionId: varchar('union_id', { length: 100 }).notNull().unique(),
    accessToken: varchar('access_token', { length: 255 }).notNull(),
    createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull()
  },
  t => [uniqueIndex('unionIdx').on(t.unionId)]
)

export const userRelations = relations(user, ({ one }) => ({
  clinic: one(clinic, { fields: [user.clinicId], references: [clinic.id] }),
  wechatAuth: one(wechatAuth, { fields: [user.id], references: [wechatAuth.userId] })
}))
