'use client'

import type { ReactNode } from 'react'
import { SWRConfig } from 'swr'
import { fetcher } from '../lib/fetcher'

interface Props {
  children: ReactNode
}

export function SWRProvider({ children }: Props) {
  return (
    <SWRConfig
      value={{
        fetcher,
        revalidateOnFocus: true, // 页面回到前台自动刷新
        shouldRetryOnError: true, // 请求失败自动重试
        errorRetryCount: 2,
        dedupingInterval: 2000, // 2秒内重复请求只会发送一次
        refreshInterval: 0 // 不自动轮询，可自行配置
      }}
    >
      {children}
    </SWRConfig>
  )
}
