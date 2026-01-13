import useSWR, { mutate, type SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import { http } from '~/server/lib/fetcher'

// GET 请求 Hook
export function useApi<T>(url: string | null, config?: SWRConfiguration<T>) {
  return useSWR<T>(url, config)
}

// POST 请求 Hook
export function useApiMutation<T, A = unknown>(url: string, method = 'POST') {
  return useSWRMutation<T, Error, string, A>(url, async (key, { arg }) => {
    return http.post<T>(key, arg)
  })
}

// 手动刷新数据
export function refreshData(key: string | string[]) {
  if (Array.isArray(key)) {
    key.forEach(k => {
      mutate(k)
    })
  } else {
    mutate(key)
  }
}
