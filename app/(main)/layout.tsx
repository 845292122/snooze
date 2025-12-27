'use client'

import {
  Box,
  Button,
  Drawer,
  Flex,
  HStack,
  IconButton,
  Menu,
  Portal,
  Text,
  VStack
} from '@chakra-ui/react'
import { Avatar } from '@chakra-ui/react/avatar'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import type { IconType } from 'react-icons'
import {
  AiFillAccountBook,
  AiFillCalendar,
  AiFillSchedule,
  AiOutlineAudit,
  AiOutlineLogout,
  AiOutlineMenu,
  AiOutlineQuestionCircle
} from 'react-icons/ai'

/**
 * 页面配置项
 */
type PageProps = {
  label: string
  icon: IconType
  path: string
}

const pages: PageProps[] = [
  {
    label: '今日',
    icon: AiFillSchedule,
    path: '/home'
  },
  {
    label: '日历',
    icon: AiFillCalendar,
    path: '/calendar'
  },
  {
    label: '患者',
    icon: AiOutlineAudit,
    path: '/patient'
  },
  {
    label: '账户',
    icon: AiFillAccountBook,
    path: '/accounts'
  },
  {
    label: '顾客demo',
    icon: AiFillAccountBook,
    path: '/demo'
  }
]

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [drawerOpen, setDrawerOpen] = useState(false)

  const handleLogout = () => {
    console.log('退出登录')
    router.push('/auth')
  }

  return (
    <Flex h="100vh" bg="gray.50" flexDirection="column">
      {/* 移动端顶部导航栏 */}
      <Box
        display={{ base: 'block', md: 'none' }}
        bg="white"
        borderBottom="1px"
        borderColor="gray.200"
        position="sticky"
        top={0}
        zIndex={10}
      >
        <HStack justify="space-between" px={4} py={3}>
          {/* 左侧菜单按钮 */}
          <IconButton
            aria-label="打开菜单"
            variant="ghost"
            size="md"
            onClick={() => setDrawerOpen(true)}
          >
            <AiOutlineMenu />
          </IconButton>

          {/* 中间Logo */}
          <Flex align="center" gap={1}>
            <Box
              w="28px"
              h="28px"
              borderRadius="full"
              bg="black"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Text fontSize="18px" fontWeight="bold" color="white">
                S
              </Text>
            </Box>
          </Flex>

          {/* 右侧用户头像 */}
          <Menu.Root positioning={{ placement: 'bottom-end' }}>
            <Menu.Trigger rounded="full" focusRing="outside">
              <Avatar.Root size="sm" cursor="pointer">
                <Avatar.Fallback name="Segun Adebayo" />
                <Avatar.Image src="https://bit.ly/sage-adebayo" />
              </Avatar.Root>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content>
                  <Menu.Item value="account" cursor="pointer">
                    Account
                  </Menu.Item>
                  <Menu.Item value="settings" cursor="pointer">
                    Settings
                  </Menu.Item>
                  <Menu.Item
                    value="logout"
                    cursor="pointer"
                    _hover={{ color: 'red.500' }}
                    onClick={handleLogout}
                  >
                    <Flex align="center" gap={2}>
                      {/* <Logout theme="outline" size="16" /> */}
                      <Text>退出登录</Text>
                    </Flex>
                  </Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
        </HStack>
      </Box>

      {/* 移动端抽屉菜单 */}
      <Drawer.Root open={drawerOpen} onOpenChange={e => setDrawerOpen(e.open)} placement="top">
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Body pt={4}>
              <VStack gap={2} align="stretch">
                {pages.map(page => {
                  const Icon = page.icon
                  const isActive = pathname === page.path
                  return (
                    <Button
                      key={page.path}
                      variant="ghost"
                      justifyContent="flex-start"
                      h="auto"
                      py={3}
                      px={4}
                      bg={isActive ? 'blue.50' : 'transparent'}
                      color={isActive ? 'blue.600' : 'gray.600'}
                      _hover={{
                        bg: isActive ? 'blue.50' : 'gray.100',
                        color: isActive ? 'blue.600' : 'gray.800'
                      }}
                      onClick={() => {
                        router.push(page.path)
                        setDrawerOpen(false)
                      }}
                    >
                      <Flex align="center" gap={3}>
                        <Icon />
                        <Text fontSize="md" fontWeight="medium">
                          {page.label}
                        </Text>
                      </Flex>
                    </Button>
                  )
                })}
              </VStack>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer.Root>

      <Flex flex={1} overflow="hidden">
        {/* 桌面端左侧边栏 */}
        <Box
          w="70px"
          bg="white"
          borderRight="1px"
          borderColor="gray.200"
          display={{ base: 'none', md: 'block' }}
        >
          <Flex direction="column" h="full">
            {/* 上半部分：Logo + 菜单 */}
            <VStack gap={0} flex={1} pt={6}>
              {/* Logo */}
              <Flex align="center" gap={1} mb={6}>
                <Box
                  w="32px"
                  h="32px"
                  borderRadius="full"
                  bg="black"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text fontSize="24px" fontWeight="bold" color="white">
                    S
                  </Text>
                </Box>
              </Flex>

              {/* 菜单栏 */}
              <VStack gap={2} w="full" px={2}>
                {pages.map(page => {
                  const Icon = page.icon
                  const isActive = pathname === page.path
                  return (
                    <Button
                      key={page.path}
                      variant="ghost"
                      w="full"
                      h="auto"
                      py={1}
                      px={1}
                      flexDirection="column"
                      gap={1}
                      bg={isActive ? 'blue.50' : 'transparent'}
                      color={isActive ? 'blue.600' : 'gray.600'}
                      _hover={{
                        bg: isActive ? 'blue.50' : 'gray.100',
                        color: isActive ? 'blue.600' : 'gray.800'
                      }}
                      onClick={() => router.push(page.path)}
                    >
                      <Icon />
                      <Text fontSize="xs" fontWeight="medium">
                        {page.label}
                      </Text>
                    </Button>
                  )
                })}
              </VStack>
            </VStack>

            {/* 下半部分：工具按钮 + 用户头像 */}
            <VStack gap={4} pb={4} px={2}>
              {/* 帮助中心等图标按钮 */}
              <IconButton
                aria-label="帮助中心"
                variant="ghost"
                size="md"
                color="gray.600"
                _hover={{ bg: 'gray.100', color: 'gray.800' }}
              >
                <AiOutlineQuestionCircle />
              </IconButton>

              {/* 用户头像及菜单 */}
              <Menu.Root positioning={{ placement: 'right-end' }}>
                <Menu.Trigger rounded="full" focusRing="outside">
                  <Avatar.Root size="sm" cursor="pointer">
                    <Avatar.Fallback name="Segun Adebayo" />
                    <Avatar.Image src="https://bit.ly/sage-adebayo" />
                  </Avatar.Root>
                </Menu.Trigger>
                <Portal>
                  <Menu.Positioner>
                    <Menu.Content>
                      <Menu.Item value="account" cursor="pointer">
                        Account
                      </Menu.Item>
                      <Menu.Item value="settings" cursor="pointer">
                        Settings
                      </Menu.Item>
                      <Menu.Item
                        value="logout"
                        cursor="pointer"
                        _hover={{ color: 'red.500' }}
                        onClick={handleLogout}
                      >
                        <Flex align="center" gap={2}>
                          <AiOutlineLogout size={16} />
                          <Text>退出登录</Text>
                        </Flex>
                      </Menu.Item>
                    </Menu.Content>
                  </Menu.Positioner>
                </Portal>
              </Menu.Root>
            </VStack>
          </Flex>
        </Box>

        {/* 右侧主内容区域 */}
        <Box flex={1} overflow="auto" p={3}>
          {children}
        </Box>
      </Flex>
    </Flex>
  )
}
