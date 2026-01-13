import type { SWRConfiguration } from 'swr'
import { http } from './fetcher'

export const swrFetcher = <T>(url: string): Promise<T> => {
  return http.get<T>(url)
}

export const swrConfig: SWRConfiguration = {
  fetcher: swrFetcher,
  revalidateOnFocus: false,
  shouldRetryOnError: false,
  dedupingInterval: 2000,
  onError: error => {
    console.error('SWR Error:', error)
  }
}
