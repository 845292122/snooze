'use client'

import {
  ActionBar,
  Badge,
  Box,
  Button,
  Flex,
  Grid,
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
  AiOutlineCalendar,
  AiOutlineClose,
  AiOutlineDownload,
  AiOutlineEdit,
  AiOutlineLineChart,
  AiOutlinePhone,
  AiOutlinePlus,
  AiOutlineSearch,
  AiOutlineUpload
} from 'react-icons/ai'

/**
 * 模拟患者数据
 */
const MOCK_PATIENTS = [
  {
    id: '1',
    name: '张三',
    avatar: 'https://bit.ly/dan-abramov',
    age: 28,
    gender: '男',
    phone: '138-1234-5678',
    lastVisit: '2025-12-15',
    status: 'active',
    nextAppointment: '2025-12-25 10:00'
  },
  {
    id: '2',
    name: '李四',
    avatar: 'https://bit.ly/sage-adebayo',
    age: 35,
    gender: '女',
    phone: '138-2345-6789',
    lastVisit: '2025-12-10',
    status: 'inactive',
    nextAppointment: null
  },
  {
    id: '3',
    name: '王五',
    avatar: 'https://bit.ly/ryan-florence',
    age: 42,
    gender: '男',
    phone: '138-3456-7890',
    lastVisit: '2025-12-18',
    status: 'active',
    nextAppointment: '2025-12-23 14:30'
  },
  {
    id: '4',
    name: '赵六',
    avatar: 'https://bit.ly/kent-c-dodds',
    age: 31,
    gender: '女',
    phone: '138-4567-8901',
    lastVisit: '2025-12-12',
    status: 'active',
    nextAppointment: '2025-12-22 09:00'
  },
  {
    id: '5',
    name: '孙七',
    avatar: 'https://bit.ly/dan-abramov',
    age: 55,
    gender: '男',
    phone: '138-5678-9012',
    lastVisit: '2025-11-30',
    status: 'inactive',
    nextAppointment: null
  },
  {
    id: '6',
    name: '周八',
    avatar: 'https://bit.ly/sage-adebayo',
    age: 26,
    gender: '女',
    phone: '138-6789-0123',
    lastVisit: '2025-12-19',
    status: 'active',
    nextAppointment: '2025-12-24 16:00'
  }
]

/**
 * 患者状态配置
 */
const PATIENT_STATUSES = [
  { value: 'active', label: '活跃患者', color: 'green.500' },
  { value: 'inactive', label: '非活跃', color: 'gray.500' },
  { value: 'vip', label: 'VIP患者', color: 'purple.500' },
  { value: 'new', label: '新患者', color: 'blue.500' }
]

/**
 * 患者页面
 * 患者快速搜索、操作按钮
 * 患者卡片网格展示
 * 多选数据后顶部出现批量操作ActionBar
 */
export default function PatientPage() {
  const [searchText, setSearchText] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)
  const [selectedPatients, setSelectedPatients] = useState<string[]>([])

  const handleStatusSelect = (value: string) => {
    setSelectedStatus(value)
  }

  const handleClearStatus = () => {
    setSelectedStatus(null)
  }

  const handleTogglePatient = (patientId: string) => {
    setSelectedPatients(prev =>
      prev.includes(patientId) ? prev.filter(id => id !== patientId) : [...prev, patientId]
    )
  }

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
                placeholder="搜索患者..."
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
                患者状态
              </Text>
            </HStack>

            <VStack gap={1} align="stretch">
              {PATIENT_STATUSES.map(status => {
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

      {/* 右侧卡片区域 */}
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
                  placeholder="搜索患者..."
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
                导入
              </Button>
              <Button size="sm" variant="outline" colorPalette="gray">
                <AiOutlineDownload size={16} />
                导出
              </Button>
              <Button size="sm" colorPalette="blue">
                <AiOutlinePlus size={16} />
                新建患者
              </Button>
            </HStack>
          </Flex>

          {/* 患者卡片网格 */}
          <Box flex={1} overflowY="auto" p={4}>
            <Grid
              templateColumns={{
                base: '1fr',
                md: 'repeat(2, 1fr)',
                lg: 'repeat(3, 1fr)',
                xl: 'repeat(4, 1fr)'
              }}
              gap={4}
            >
              {MOCK_PATIENTS.map(patient => {
                const isSelected = selectedPatients.includes(patient.id)
                return (
                  <Box
                    key={patient.id}
                    position="relative"
                    borderRadius="lg"
                    border="2px"
                    borderColor={isSelected ? 'blue.400' : 'gray.200'}
                    bg={isSelected ? 'blue.50' : 'white'}
                    p={4}
                    _hover={{
                      borderColor: isSelected ? 'blue.500' : 'gray.300',
                      shadow: 'md'
                    }}
                    transition="all 0.2s"
                  >
                    {/* 复选框 */}
                    <Box position="absolute" top={3} right={3}>
                      <Checkbox.Root
                        checked={isSelected}
                        onCheckedChange={() => handleTogglePatient(patient.id)}
                      >
                        <Checkbox.HiddenInput />
                        <Checkbox.Control />
                      </Checkbox.Root>
                    </Box>

                    {/* 卡片内容 */}
                    <Flex direction="column" h="full" gap={3}>
                      {/* 头像和基本信息 */}
                      <Flex direction="column" align="center" gap={2}>
                        <Avatar.Root size="lg">
                          <Avatar.Image src={patient.avatar} />
                          <Avatar.Fallback>{patient.name[0]}</Avatar.Fallback>
                        </Avatar.Root>
                        <VStack gap={0}>
                          <Text fontSize="lg" fontWeight="bold" color="gray.800">
                            {patient.name}
                          </Text>
                          <HStack gap={2} fontSize="sm" color="gray.600">
                            <Text>{patient.age}岁</Text>
                            <Text>·</Text>
                            <Text>{patient.gender}</Text>
                          </HStack>
                        </VStack>
                      </Flex>

                      {/* 状态标签 */}
                      <Flex justify="center">
                        <Badge
                          size="sm"
                          colorPalette={patient.status === 'active' ? 'green' : 'gray'}
                        >
                          {patient.status === 'active' ? '活跃' : '非活跃'}
                        </Badge>
                      </Flex>

                      {/* 联系方式 */}
                      <VStack gap={2} align="stretch" pt={2} borderTop="1px" borderColor="gray.100">
                        <HStack gap={2} fontSize="sm" color="gray.600">
                          <AiOutlinePhone size={14} />
                          <Text>{patient.phone}</Text>
                        </HStack>
                        <HStack gap={2} fontSize="sm" color="gray.600">
                          <AiOutlineCalendar size={14} />
                          <Text>最近就诊: {patient.lastVisit}</Text>
                        </HStack>
                      </VStack>

                      {/* 下次预约 */}
                      {patient.nextAppointment && (
                        <Box
                          p={2}
                          bg="blue.50"
                          borderRadius="md"
                          border="1px"
                          borderColor="blue.200"
                        >
                          <Text fontSize="xs" color="blue.700" fontWeight="medium">
                            下次预约: {patient.nextAppointment}
                          </Text>
                        </Box>
                      )}

                      {/* 填充空间，让按钮推到底部 */}
                      <Box flex={1} />

                      {/* 操作按钮 */}
                      <Button size="sm" variant="outline" colorPalette="blue" w="full">
                        <AiOutlineEdit size={14} />
                        查看详情
                      </Button>
                    </Flex>
                  </Box>
                )
              })}
            </Grid>
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
              显示 1-{MOCK_PATIENTS.length} 条，共 {MOCK_PATIENTS.length} 条
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
        {selectedPatients.length > 0 && (
          <Box position="absolute" top={0} left={0} right={0} zIndex={10}>
            <ActionBar.Root open>
              <ActionBar.Content>
                <ActionBar.SelectionTrigger>
                  已选中 {selectedPatients.length} 位患者
                </ActionBar.SelectionTrigger>
                <ActionBar.Separator />
                <HStack gap={2}>
                  <Button size="sm" variant="outline" colorPalette="gray">
                    <AiOutlineCalendar size={16} />
                    批量预约
                  </Button>
                  <Button size="sm" variant="outline" colorPalette="gray">
                    <AiOutlineDownload size={16} />
                    导出数据
                  </Button>
                </HStack>
                <ActionBar.CloseTrigger onClick={() => setSelectedPatients([])} />
              </ActionBar.Content>
            </ActionBar.Root>
          </Box>
        )}
      </Box>
    </Flex>
  )
}
