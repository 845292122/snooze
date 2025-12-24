import {
  boolean,
  mysqlEnum,
  mysqlTable,
  serial,
  text,
  timestamp,
  varchar
} from 'drizzle-orm/mysql-core'

// * 用户表
export const users = mysqlTable('users', {
  id: serial('id').primaryKey(),
  phone: varchar('phone', { length: 20 }).notNull(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  role: mysqlEnum('role', ['admin', 'user']).notNull().default('user'),
  type: mysqlEnum('type', ['normal', 'premium']).notNull().default('normal'),
  isActive: boolean('is_active').notNull().default(true),
  deletedAt: timestamp('deleted_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow()
})

// * OAuth
export const userOAuths = mysqlTable('user_oauths', {
  id: serial('id').primaryKey(),
  userId: serial('user_id').notNull(),
  provider: varchar('provider', { length: 50 }).notNull(),
  providerId: varchar('provider_user_id', { length: 255 }).notNull(),
  accessToken: varchar('access_token', { length: 500 }),
  refreshToken: varchar('refresh_token', { length: 500 }),
  expiresAt: timestamp('expires_at'),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').notNull().defaultNow().onUpdateNow()
})

// * 会话表
export const userSessions = mysqlTable('user_sessions', {
  id: serial('id').primaryKey(),
  userId: serial('user_id').notNull(),
  token: varchar('token', { length: 512 }).notNull(),
  type: mysqlEnum('type', ['access', 'refresh']).notNull(),
  revoked: boolean('revoked').notNull().default(false),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow()
})

// * 审计日志
export const auditLogs = mysqlTable('audit_logs', {
  id: serial('id').primaryKey(),
  userId: serial('user_id').notNull(),
  action: varchar('action', { length: 255 }).notNull(),
  targetType: varchar('target_type', { length: 50 }),
  targetId: serial('target_id'),
  ip: varchar('ip', { length: 50 }),
  createdAt: timestamp('created_at').notNull().defaultNow()
})

// * 扩展信息
export const userProfiles = mysqlTable('user_profiles', {
  id: serial('id').primaryKey(),
  userId: serial('user_id').notNull(),
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
