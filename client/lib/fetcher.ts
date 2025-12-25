import { nanoid } from 'nanoid'
import { toaster } from '~/client/components/Toaster'
import { authStore } from '~/client/stores/auth'
import { logger } from '~/server/lib/logger'
import { COMMON_CONSTANT } from '~/shared/constants/common'

const SLOW_REQUEST_THRESHOLD = 2000 // 2 秒

// TODO: 幂等、请求拦截器、meta
export async function fetcher<T>(url: string, options: RequestInit = {}): Promise<T> {
  const traceId = nanoid()
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    [COMMON_CONSTANT.TRACE_ID]: traceId,
    ...(options.headers instanceof Headers
      ? Object.fromEntries(options.headers.entries())
      : (options.headers as Record<string, string>))
  }

  const start = performance.now()

  try {
    // 自动带上 token
    if (authStore.token) {
      // biome-ignore lint/complexity/useLiteralKeys: Authorization header needs bracket notation
      headers['Authorization'] = `Bearer ${authStore.token}`
    }

    const res = await fetch(url, { ...options, headers })
    const json = await res.json()

    const duration = performance.now() - start
    if (duration > SLOW_REQUEST_THRESHOLD) {
      logger.warn(
        {
          url,
          duration,
          traceId
        },
        'Slow request'
      )
    }

    if (!res.ok) {
      toaster.create({
        title: 'Error',
        description: json.message || 'Request failed',
        type: 'error',
        meta: { closable: true }
      })
      const error = new Error(json.message || 'Request Error')
      // biome-ignore lint/suspicious/noExplicitAny: need to attach traceId to error object
      ;(error as any).traceId = json.traceId
      throw error
    }

    return json.data as T
    // biome-ignore lint/suspicious/noExplicitAny: error object type is unknown
  } catch (err: any) {
    toaster.create({
      title: 'Error',
      description: err.message || 'Request failed',
      type: 'error',
      meta: { closable: true }
    })
    throw err
  }
}
