/** biome-ignore-all lint/suspicious/noExplicitAny: generic utility hook requires any for flexibility */
import useSWR, { type SWRConfiguration, type SWRResponse } from 'swr'
import { fetcher } from '../lib/fetcher'

export function useFetch<T = any>(
  key: string | null,
  options?: SWRConfiguration<T, any>
): SWRResponse<T, any> {
  return useSWR<T>(key, fetcher, options)
}
