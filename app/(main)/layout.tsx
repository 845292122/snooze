'use client'

import {
  Button,
  Drawer,
  DrawerContent,
  Navbar,
  NavbarContent,
  type PressEvent,
  ScrollShadow,
  Tooltip,
  useDisclosure
} from '@heroui/react'
import { BarChart3, Home, Menu, Settings, Users } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Profile from '~/client/components/Profile'

// * 导航菜单项配置
const menuItems = [
  { name: '首页', icon: <Home size={18} />, href: '/home' },
  { name: '数据', icon: <BarChart3 size={18} />, href: '/calendar' },
  { name: '成员', icon: <Users size={18} />, href: '/patient' },
  { name: 'demo', icon: <Settings size={18} />, href: '/demo' }
]

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const pathname = usePathname()

  // * LOGO
  const Logo = () => (
    <div className="w-9 h-9 bg-black rounded-lg flex items-center justify-center shadow-sm">
      <span className="text-white font-bold text-base tracking-tighter">H</span>
    </div>
  )

  // * 桌面端菜单项
  const DesktopNav = () => (
    <div className="flex flex-col gap-1.5 p-1.5">
      {menuItems.map(item => (
        <Tooltip
          key={item.href}
          content={item.name}
          placement="right"
          delay={0}
          closeDelay={0}
          size="sm"
        >
          <Button
            as={Link}
            href={item.href}
            variant={pathname === item.href ? 'flat' : 'light'}
            color={pathname === item.href ? 'primary' : 'default'}
            className={`flex flex-col items-center justify-center min-w-0 transition-all gap-1
              w-13 h-13 rounded-xl
            `}
          >
            {item.icon}
            <span className="text-[13px] font-medium scale-90 opacity-80">{item.name}</span>
          </Button>
        </Tooltip>
      ))}
    </div>
  )

  // * 移动端菜单项
  const MobileNav = (onClose: ((e: PressEvent) => void) | undefined) => (
    <div className="flex flex-col gap-1 p-4">
      {menuItems.map(item => (
        <Button
          key={item.href}
          as={Link}
          href={item.href}
          onPress={onClose}
          variant={pathname === item.href ? 'flat' : 'light'}
          color={pathname === item.href ? 'primary' : 'default'}
          startContent={item.icon}
          className="justify-start h-12 text-sm font-medium px-4"
          fullWidth
        >
          {item.name}
        </Button>
      ))}
    </div>
  )

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-background">
      {/* --- 移动端头部 --- */}
      <Navbar isBordered className="md:hidden h-14" maxWidth="full">
        <NavbarContent justify="start">
          <Button isIconOnly variant="light" size="sm" onPress={onOpen}>
            <Menu size={20} />
          </Button>
        </NavbarContent>
        <NavbarContent justify="center">
          <Logo />
        </NavbarContent>
        <NavbarContent justify="end">
          <Profile />
        </NavbarContent>
      </Navbar>

      {/* --- 移动端顶部抽屉 --- */}
      <Drawer
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top"
        backdrop="blur"
        classNames={{
          base: 'rounded-b-2xl'
        }}
      >
        <DrawerContent>{onClose => <div className="py-4">{MobileNav(onClose)}</div>}</DrawerContent>
      </Drawer>

      {/* --- 桌面端侧边栏 --- */}
      <aside className="hidden md:flex flex-col w-16 h-screen sticky top-0 border-r border-divider bg-content1/30 backdrop-blur-md">
        {/* 头部固定 */}
        <div className="h-16 flex items-center justify-center shrink-0">
          <Logo />
        </div>

        {/* 中间导航自适应滚动 */}
        <ScrollShadow hideScrollBar className="flex-1 py-2 flex flex-col items-center">
          <DesktopNav />
        </ScrollShadow>

        {/* 底部固定 */}
        <div className="h-16 flex items-center justify-center shrink-0 border-t border-divider">
          <Profile />
        </div>
      </aside>

      {/* --- 主内容区 --- */}
      <main className="flex-1 overflow-x-hidden">
        <div className="p-2 md:p-4">{children}</div>
      </main>
    </div>
  )
}
