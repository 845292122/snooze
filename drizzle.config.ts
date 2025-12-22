import { defineConfig } from 'drizzle-kit'

/**
 * 直接推送（本地快速迭代）：bunx drizzle-kit push
 * 或生成 + 迁移：
 *  bunx drizzle-kit generate
 *  bunx drizzle-kit migrate
 *
 */
export default defineConfig({
  out: './drizzle',
  schema: './server/db/schema.ts',
  dialect: 'mysql',
  dbCredentials: {
    url: process.env.DATABASE_URL ?? ''
  }
})
