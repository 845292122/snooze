import type { Context } from 'hono'

const getTraceId = (c: Context) => c.get('traceId')

export function ok<T>(c: Context, data?: T, message?: string) {
  return c.json(
    {
      ...(data !== undefined && { data }),
      ...(message && { message }),
      traceId: getTraceId(c)
    },
    200
  )
}

export function fail(c: Context, message: string, status: number) {
  return c.json(
    {
      message,
      traceId: getTraceId(c)
    },
    // biome-ignore lint/suspicious/noExplicitAny: Hono's json method requires specific status code type
    status as any
  )
}
