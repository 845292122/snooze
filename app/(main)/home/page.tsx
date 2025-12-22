'use client'

import { Chart, useChart } from '@chakra-ui/charts'
import { Alert, Box, Flex, Heading, HStack, Text, VStack } from '@chakra-ui/react'
import { Avatar } from '@chakra-ui/react/avatar'
import { Checkbox } from '@chakra-ui/react/checkbox'
import { useState } from 'react'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'

/**
 * 模拟最近事件数据
 */
const RECENT_EVENTS = [
  {
    id: '1',
    avatar: 'https://bit.ly/dan-abramov',
    title: '新患者预约',
    content: '张三预约了明天上午10:00的就诊时间',
    time: '2小时前'
  },
  {
    id: '2',
    avatar: 'https://bit.ly/sage-adebayo',
    title: '治疗完成',
    content: '李四完成了根管治疗，状态良好',
    time: '4小时前'
  },
  {
    id: '3',
    avatar: 'https://bit.ly/ryan-florence',
    title: '账单支付',
    content: '王五已完成本月治疗费用支付',
    time: '6小时前'
  },
  {
    id: '4',
    avatar: 'https://bit.ly/kent-c-dodds',
    title: '预约取消',
    content: '赵六取消了今天下午的预约',
    time: '8小时前'
  }
]

/**
 * 模拟今日任务数据
 */
const INITIAL_TASKS = [
  { id: '1', content: '检查预约系统更新', completed: false },
  { id: '2', content: '回复患者咨询邮件', completed: false },
  { id: '3', content: '准备明天的手术器械', completed: true },
  { id: '4', content: '更新患者病历记录', completed: false },
  { id: '5', content: '确认药品库存', completed: false }
]

/**
 * 今日任务页面
 * 提示banner
 * 数据图表
 * 今日任务列表
 * 最近活动列表
 */
export default function HomePage() {
  const [tasks, setTasks] = useState(INITIAL_TASKS)

  const chart = useChart({
    data: [
      { allocation: 60, type: 'Stock' },
      { allocation: 45, type: 'Crypto' },
      { allocation: 12, type: 'ETF' },
      { allocation: 4, type: 'Cash' }
    ],
    series: [{ name: 'allocation', color: 'teal.solid' }]
  })

  const handleToggleTask = (taskId: string) => {
    setTasks(prev =>
      prev.map(task => (task.id === taskId ? { ...task, completed: !task.completed } : task))
    )
  }

  return (
    <VStack w="full" h="full" align="stretch" gap={4} overflowY="auto" p={4}>
      {/* Banner 提示区域 */}
      <Alert.Root status="info" variant="subtle">
        <Alert.Indicator />
        <Box>
          <Alert.Title>欢迎回来！</Alert.Title>
          <Alert.Description>
            今天是{' '}
            {new Date().toLocaleDateString('zh-CN', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              weekday: 'long'
            })}
            ，您有 {tasks.filter(t => !t.completed).length} 项待办任务需要处理。
          </Alert.Description>
        </Box>
      </Alert.Root>

      {/* 主内容区域 - 3:1 比例 */}
      <Flex gap={4} direction={{ base: 'column', lg: 'row' }}>
        {/* 左侧容器 - 占3份 */}
        <VStack flex={{ base: 1, lg: 3 }} align="stretch" gap={4}>
          {/* 柱形图区域 */}
          <Box bg="white" p={5} borderRadius="lg" border="1px" borderColor="gray.200">
            <Heading size="md" mb={4}>
              月度数据统计
            </Heading>
            <Chart.Root maxH="sm" chart={chart}>
              <BarChart data={chart.data}>
                <CartesianGrid stroke={chart.color('border.muted')} vertical={false} />
                <XAxis axisLine={false} tickLine={false} dataKey={chart.key('type')} />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  domain={[0, 100]}
                  tickFormatter={value => `${value}%`}
                />
                {chart.series.map(item => (
                  <Bar
                    key={item.name}
                    isAnimationActive={false}
                    dataKey={chart.key(item.name)}
                    fill={chart.color(item.color)}
                  />
                ))}
              </BarChart>
            </Chart.Root>
          </Box>

          {/* 最近事件列表 */}
          <Box bg="white" p={5} borderRadius="lg" border="1px" borderColor="gray.200" flex={1}>
            <Heading size="md" mb={4}>
              最近事件
            </Heading>
            <VStack gap={3} align="stretch">
              {RECENT_EVENTS.map(event => (
                <Box
                  key={event.id}
                  p={3}
                  borderRadius="md"
                  border="1px"
                  borderColor="gray.100"
                  _hover={{ bg: 'gray.50' }}
                  transition="background 0.2s"
                >
                  <HStack align="start" mb={2}>
                    <Avatar.Root size="sm">
                      <Avatar.Image src={event.avatar} />
                      <Avatar.Fallback>{event.title[0]}</Avatar.Fallback>
                    </Avatar.Root>
                    <VStack align="start" gap={0} flex={1}>
                      <HStack justify="space-between" w="full">
                        <Text fontSize="sm" fontWeight="semibold" color="gray.800">
                          {event.title}
                        </Text>
                        <Text fontSize="xs" color="gray.500">
                          {event.time}
                        </Text>
                      </HStack>
                    </VStack>
                  </HStack>
                  <Text fontSize="sm" color="gray.600" pl={10}>
                    {event.content}
                  </Text>
                </Box>
              ))}
            </VStack>
          </Box>
        </VStack>

        {/* 右侧容器 - 占1份 */}
        <Box
          flex={{ base: 1, lg: 1 }}
          bg="white"
          p={5}
          borderRadius="lg"
          border="1px"
          borderColor="gray.200"
        >
          <Heading size="md" mb={4}>
            今日任务
          </Heading>
          <VStack gap={2} align="stretch">
            {tasks.map(task => (
              <HStack
                key={task.id}
                p={2}
                borderRadius="md"
                _hover={{ bg: 'gray.50' }}
                transition="background 0.2s"
              >
                <Checkbox.Root
                  checked={task.completed}
                  onCheckedChange={() => handleToggleTask(task.id)}
                >
                  <Checkbox.HiddenInput />
                  <Checkbox.Control />
                </Checkbox.Root>
                <Text
                  fontSize="sm"
                  color={task.completed ? 'gray.400' : 'gray.700'}
                  textDecoration={task.completed ? 'line-through' : 'none'}
                  flex={1}
                >
                  {task.content}
                </Text>
              </HStack>
            ))}
          </VStack>
        </Box>
      </Flex>
    </VStack>
  )
}
