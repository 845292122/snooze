'use client'

import {
  ActionBar,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Input,
  InputGroup,
  Text,
  VStack
} from '@chakra-ui/react'
import { Avatar } from '@chakra-ui/react/avatar'
import { Checkbox } from '@chakra-ui/react/checkbox'
import { useState } from 'react'

import {
  AiOutlineClose,
  AiOutlineDownload,
  AiOutlineEdit,
  AiOutlineLineChart,
  AiOutlineSearch,
  AiOutlineUpload
} from 'react-icons/ai'
import FormDrawer from '~/client/components/FormDrawer'

/**
 * 模拟账户数据
 */
const MOCK_ACCOUNTS = [
  {
    id: '1',
    name: 'John Doe',
    shopName: "John's Shop",
    avatar: 'https://bit.ly/dan-abramov',
    lastLogin: '2025-12-20 14:30'
  },
  {
    id: '2',
    name: 'Jane Smith',
    shopName: "Jane's Store",
    avatar: 'https://bit.ly/sage-adebayo',
    lastLogin: '2025-12-20 10:15'
  },
  {
    id: '3',
    name: 'Bob Johnson',
    shopName: "Bob's Market",
    avatar: 'https://bit.ly/ryan-florence',
    lastLogin: '2025-12-19 16:45'
  },
  {
    id: '4',
    name: 'Alice Williams',
    shopName: "Alice's Boutique",
    avatar: 'https://bit.ly/kent-c-dodds',
    lastLogin: '2025-12-19 09:20'
  }
]

/**
 * 账户状态配置
 */
const ACCOUNT_STATUSES = [
  { value: 'active', label: '活跃', color: 'green.500' },
  { value: 'inactive', label: '未激活', color: 'gray.500' },
  { value: 'suspended', label: '已暂停', color: 'orange.500' },
  { value: 'banned', label: '已禁用', color: 'red.500' }
]

/**
 * 用户页面
 * 用户快速搜索、操作按钮
 * 数据表格可多选
 * 多选数据后底部出现批量操作drawer
 */
export default function DemoPage() {
  const [searchText, setSearchText] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([])

  const handleStatusSelect = (value: string) => {
    setSelectedStatus(value)
  }

  const handleClearStatus = () => {
    setSelectedStatus(null)
  }

  const handleToggleAccount = (accountId: string) => {
    setSelectedAccounts(prev =>
      prev.includes(accountId) ? prev.filter(id => id !== accountId) : [...prev, accountId]
    )
  }

  const [_dialogOpen, _setDialogOpen] = useState(false)
  return (
    <Flex w="full" h="full" gap={4}>
      {/* 左侧搜索和筛选区域 */}
      <Box w="280px" flexShrink={0} bg="white" display={{ base: 'none', md: 'block' }}>
        <VStack gap={4} align="stretch">
          {/* 快速搜索框 */}
          <Box borderRadius="lg" px={4} mt={7} border="1px" borderColor="gray.200">
            <InputGroup startElement={<AiOutlineSearch size={16} />}>
              <Input
                variant="flushed"
                placeholder="搜索账户..."
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                size="md"
              />
            </InputGroup>
          </Box>

          {/* 状态筛选 */}
          <Box borderRadius="lg" px={5} mt={3} border="1px" borderColor="gray.200">
            <HStack mb={2}>
              <AiOutlineLineChart size={16} />
              <Text fontSize="md" fontWeight="semibold" color="gray.700">
                状态
              </Text>
            </HStack>

            <VStack gap={1} align="stretch">
              {ACCOUNT_STATUSES.map(status => {
                const isSelected = selectedStatus === status.value
                return (
                  <HStack
                    key={status.value}
                    px={2.5}
                    py={1.5}
                    borderRadius="md"
                    cursor="pointer"
                    bg={isSelected ? 'blue.50' : 'transparent'}
                    _hover={{ bg: isSelected ? 'blue.50' : 'gray.50' }}
                    onClick={() => handleStatusSelect(status.value)}
                    justify="space-between"
                    align="center"
                    minH="32px"
                  >
                    <HStack gap={2} align="center">
                      <Box w="8px" h="8px" borderRadius="full" bg={status.color} />
                      <Text
                        fontSize="sm"
                        color={isSelected ? 'blue.600' : 'gray.700'}
                        fontWeight={isSelected ? 'medium' : 'normal'}
                      >
                        {status.label}
                      </Text>
                    </HStack>
                    <Box
                      w="20px"
                      h="20px"
                      flexShrink={0}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      {isSelected && (
                        <IconButton
                          aria-label="清除筛选"
                          size="xs"
                          variant="ghost"
                          colorPalette="gray"
                          onClick={e => {
                            e.stopPropagation()
                            handleClearStatus()
                          }}
                        >
                          <AiOutlineClose size={14} />
                        </IconButton>
                      )}
                    </Box>
                  </HStack>
                )
              })}
            </VStack>
          </Box>
        </VStack>
      </Box>

      {/* 右侧列表区域 */}
      <Box
        flex={1}
        bg="white"
        borderRadius="lg"
        border="1px"
        borderColor="gray.200"
        position="relative"
      >
        <Flex direction="column" h="full">
          {/* 顶部操作按钮 */}
          <Flex
            px={4}
            py={4}
            borderBottom="1px"
            borderColor="gray.200"
            justify={{ base: 'space-between', md: 'flex-end' }}
            align="center"
            gap={3}
            flexWrap={{ base: 'wrap', sm: 'nowrap' }}
          >
            {/* 移动端搜索框 */}
            <Box
              flex={{ base: '1 1 100%', sm: '1 1 auto' }}
              display={{ base: 'block', md: 'none' }}
            >
              <InputGroup startElement={<AiOutlineSearch size={16} />}>
                <Input
                  placeholder="搜索账户..."
                  value={searchText}
                  onChange={e => setSearchText(e.target.value)}
                  size="sm"
                />
              </InputGroup>
            </Box>

            {/* 操作按钮组 */}
            <HStack gap={2} flexShrink={0}>
              <Button size="sm" variant="outline" colorPalette="gray">
                <AiOutlineUpload size={16} />
                上传
              </Button>
              <Button size="sm" variant="outline" colorPalette="gray">
                <AiOutlineDownload size={16} />
                下载
              </Button>
              {/* <Button size="sm" colorPalette="blue" onClick={() => setDialogOpen(true)}>
                <AiOutlinePlus size={16} />
                新建
              </Button> */}
              <FormDrawer />
            </HStack>
          </Flex>

          {/* 账户列表 */}
          <Box flex={1} overflowY="auto" px={4} py={2}>
            {/* 账户列表项 */}
            <VStack gap={0} align="stretch">
              {MOCK_ACCOUNTS.map(account => {
                const isSelected = selectedAccounts.includes(account.id)
                return (
                  <HStack
                    key={account.id}
                    py={3}
                    px={3}
                    borderBottom="1px"
                    borderColor="gray.100"
                    bg={isSelected ? 'blue.50' : 'transparent'}
                    _hover={{ bg: isSelected ? 'blue.50' : 'gray.50' }}
                    transition="background 0.2s"
                  >
                    {/* 复选框 */}
                    <Checkbox.Root
                      checked={isSelected}
                      onCheckedChange={() => handleToggleAccount(account.id)}
                    >
                      <Checkbox.HiddenInput />
                      <Checkbox.Control />
                    </Checkbox.Root>

                    {/* 头像 */}
                    <Avatar.Root size="md">
                      <Avatar.Image src={account.avatar} />
                      <Avatar.Fallback>{account.name[0]}</Avatar.Fallback>
                    </Avatar.Root>

                    {/* 名称信息 */}
                    <VStack gap={0} align="flex-start" flex={1}>
                      <Text fontSize="sm" fontWeight="medium" color="gray.800">
                        {account.name}
                      </Text>
                      <Text fontSize="xs" color="gray.500">
                        {account.shopName}
                      </Text>
                    </VStack>

                    {/* 右侧信息和操作 */}
                    <VStack gap={1} align="flex-end" w="200px">
                      <Text fontSize="xs" color="gray.500">
                        {account.lastLogin}
                      </Text>
                      <Button size="xs" variant="outline" colorPalette="blue">
                        <AiOutlineEdit size={12} />
                        编辑
                      </Button>
                    </VStack>
                  </HStack>
                )
              })}
            </VStack>
          </Box>

          {/* 分页 */}
          <Flex
            px={4}
            py={3}
            borderTop="1px"
            borderColor="gray.200"
            justify="space-between"
            align="center"
          >
            <Text fontSize="sm" color="gray.600">
              显示 1-{MOCK_ACCOUNTS.length} 条，共 {MOCK_ACCOUNTS.length} 条
            </Text>
            <HStack gap={2}>
              <Button size="sm" variant="outline" disabled>
                上一页
              </Button>
              <Button size="sm" variant="outline" colorPalette="blue">
                1
              </Button>
              <Button size="sm" variant="outline" disabled>
                下一页
              </Button>
            </HStack>
          </Flex>
        </Flex>

        {/* ActionBar - 选中时显示 */}
        {selectedAccounts.length > 0 && (
          <Box position="absolute" bottom={0} left={0} right={0} zIndex={10}>
            <ActionBar.Root open>
              <ActionBar.Content>
                <ActionBar.SelectionTrigger>
                  已选中 {selectedAccounts.length} 项
                </ActionBar.SelectionTrigger>
                <ActionBar.Separator />
                <HStack gap={2}>
                  <Button size="sm" variant="outline" colorPalette="gray">
                    <AiOutlineUpload size={16} />
                    上传
                  </Button>
                  <Button size="sm" variant="outline" colorPalette="gray">
                    <AiOutlineDownload size={16} />
                    下载
                  </Button>
                </HStack>
                <ActionBar.CloseTrigger onClick={() => setSelectedAccounts([])} />
              </ActionBar.Content>
            </ActionBar.Root>
          </Box>
        )}
      </Box>
    </Flex>
  )
}
