import { relations } from 'drizzle-orm'
import {
  boolean,
  index,
  int,
  mysqlTable,
  serial,
  text,
  timestamp,
  tinyint,
  varchar
} from 'drizzle-orm/mysql-core'

// * 登录用户信息
export const user = mysqlTable('user', {
  id: varchar('id', { length: 36 }).primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  emailVerified: boolean('email_verified').default(false).notNull(),
  image: text('image'),
  // admin | user | premium
  role: varchar('role', { length: 50 }).notNull().default('user'),
  createdAt: timestamp('created_at', { fsp: 3 }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { fsp: 3 })
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull()
})

// * 会话信息
export const session = mysqlTable(
  'session',
  {
    id: varchar('id', { length: 36 }).primaryKey(),
    expiresAt: timestamp('expires_at', { fsp: 3 }).notNull(),
    token: varchar('token', { length: 255 }).notNull().unique(),
    createdAt: timestamp('created_at', { fsp: 3 }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { fsp: 3 })
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: text('ip_address'),
    userAgent: text('user_agent'),
    userId: varchar('user_id', { length: 36 })
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' })
  },
  table => [index('session_userId_idx').on(table.userId)]
)

// * 第三方账号信息
export const account = mysqlTable(
  'account',
  {
    id: varchar('id', { length: 36 }).primaryKey(),
    accountId: text('account_id').notNull(),
    providerId: text('provider_id').notNull(),
    userId: varchar('user_id', { length: 36 })
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    accessToken: text('access_token'),
    refreshToken: text('refresh_token'),
    idToken: text('id_token'),
    accessTokenExpiresAt: timestamp('access_token_expires_at', { fsp: 3 }),
    refreshTokenExpiresAt: timestamp('refresh_token_expires_at', { fsp: 3 }),
    scope: text('scope'),
    password: text('password'),
    createdAt: timestamp('created_at', { fsp: 3 }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { fsp: 3 })
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull()
  },
  table => [index('account_userId_idx').on(table.userId)]
)

// * 验证码/重置密码等
export const verification = mysqlTable(
  'verification',
  {
    id: varchar('id', { length: 36 }).primaryKey(),
    identifier: varchar('identifier', { length: 255 }).notNull(),
    value: text('value').notNull(),
    expiresAt: timestamp('expires_at', { fsp: 3 }).notNull(),
    createdAt: timestamp('created_at', { fsp: 3 }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { fsp: 3 })
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull()
  },
  table => [index('verification_identifier_idx').on(table.identifier)]
)

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account)
}))

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id]
  })
}))

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id]
  })
}))

// * 扩展信息
export const userProfile = mysqlTable('user_profile', {
  id: serial('id').primaryKey(),
  userId: int('user_id').notNull(),
  avatar: varchar('avatar', { length: 255 }),
  name: varchar('name', { length: 100 }).notNull(),
  address: varchar('address', { length: 255 }),
  contact: varchar('contact', { length: 100 }),
  phone: varchar('phone', { length: 20 }),
  domain: varchar('domain', { length: 255 }),
  extraInfo: text('extra_info'),
  deletedAt: timestamp('deleted_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow()
})

// * 审计日志
export const auditLog = mysqlTable('audit_log', {
  id: serial('id').primaryKey(),
  userId: int('user_id').notNull(),
  action: varchar('action', { length: 255 }).notNull(),
  targetType: varchar('target_type', { length: 50 }),
  targetId: int('target_id'),
  ip: varchar('ip', { length: 50 }),
  createdAt: timestamp('created_at').notNull().defaultNow()
})

// * (1) create schema demo
export const demoCustomer = mysqlTable('demo_customer', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 100 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  phone: varchar('phone', { length: 20 }),
  gender: tinyint('gender', { unsigned: true }),
  address: varchar('address', { length: 255 }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow()
})

export const demoOrder = mysqlTable('demo_order', {
  id: int('id').primaryKey().autoincrement(),
  customerId: int('customer_id')
    .notNull()
    .references(() => demoCustomer.id, { onDelete: 'cascade' }),
  orderDate: timestamp('order_date').notNull().defaultNow(),
  status: varchar('status', { length: 50 }).notNull().default('pending'),
  totalAmount: int('total_amount').notNull().default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow()
})

// * (2) 定义关联关系
export const customerRelations = relations(demoCustomer, ({ many }) => ({
  demoOrders: many(demoOrder)
}))

export const orderRelations = relations(demoOrder, ({ one }) => ({
  customer: one(demoCustomer, {
    fields: [demoOrder.customerId],
    references: [demoCustomer.id]
  })
}))
