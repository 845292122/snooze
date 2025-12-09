import { handle } from 'hono/vercel'
import app from '@/lib/hono'

/**
 * 路由统一入口（GET + POST）
 */
export const GET = handle(app)
export const POST = handle(app)
