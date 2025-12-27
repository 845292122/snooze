'use client'

import { usePathname, useRouter } from 'next/navigation'

/**
 * 页面配置项
 */
type PageProps = {
  label: string
  // icon: IconType
  path: string
}

const pages: PageProps[] = [
  {
    label: '今日',
    // icon: AiFillSchedule,
    path: '/home'
  },
  {
    label: '日历',
    // icon: AiFillCalendar,
    path: '/calendar'
  },
  {
    label: '患者',
    // icon: AiOutlineAudit,
    path: '/patient'
  },
  {
    label: '账户',
    // icon: AiFillAccountBook,
    path: '/accounts'
  },
  {
    label: '顾客demo',
    // icon: AiFillAccountBook,
    path: '/demo'
  }
]

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      MainLayout
      {children}
    </div>
  )
}
