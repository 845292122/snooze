import type { Hook } from '@hono/zod-validator'
import type { Env } from 'hono'
import { StatusCodes } from 'http-status-codes'
import { flattenError } from 'zod/v4/core'

const getFieldErrors = (error: unknown): Record<string, string[]> => {
  if (error && typeof (error as { flatten?: unknown }).flatten === 'function') {
    const flattened = (
      error as { flatten: () => { fieldErrors: Record<string, string[]> } }
    ).flatten()
    return flattened.fieldErrors ?? {}
  }

  if (error && Array.isArray((error as { issues?: unknown }).issues)) {
    return flattenError(error as never).fieldErrors as Record<string, string[]>
  }

  return {}
}

export const onValidationError: Hook<unknown, Env, string> = (result, c) => {
  if (!result.success) {
    // 方案 A：平铺错误，格式为 { fieldName: "error message" }
    const flattenedErrors = getFieldErrors(result.error)

    // 方案 B：只取第一条可读性高的错误消息作为主 Message
    // const firstErrorMessage = result.error.errors[0]?.message || '参数校验失败';

    return c.json(
      {
        success: false,
        errors: flattenedErrors
      },
      StatusCodes.BAD_REQUEST
    )
  }
}
