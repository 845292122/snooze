'use client'

import { Box, Button, Flex, Input, Text, VStack } from '@chakra-ui/react'
import { Drawer } from '@chakra-ui/react/drawer'
import { Field } from '@chakra-ui/react/field'
import { format, getDay, parse, startOfWeek } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import { useState } from 'react'
import {
  Calendar,
  dateFnsLocalizer,
  type Event,
  type SlotInfo,
  type View
} from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

// 配置 date-fns 本地化
const locales = { 'zh-CN': zhCN }
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
})

// 事件类型
interface CalendarEvent extends Event {
  id: string
  title: string
  start: Date
  end: Date
  desc?: string
}

/**
 * 日程安排页面
 * 支持查看月/周/日视图
 * 点击日期格子添加事件
 * 显示当天所有事件
 */
export default function CalendarPage() {
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: '1',
      title: '示例事件',
      start: new Date(),
      end: new Date(Date.now() + 3600000),
      desc: '这是一个示例事件'
    }
  ])
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState<{ start: Date; end: Date } | null>(null)
  const [formData, setFormData] = useState({ title: '', desc: '' })
  const [currentDate, setCurrentDate] = useState(new Date())
  const [currentView, setCurrentView] = useState<View>('month')

  // 选择时间槽（点击日期格子）
  const handleSelectSlot = (slotInfo: SlotInfo) => {
    setSelectedSlot({ start: slotInfo.start as Date, end: slotInfo.end as Date })
    setFormData({ title: '', desc: '' })
    setDrawerOpen(true)
  }

  // 添加事件
  const handleAddEvent = () => {
    if (!selectedSlot || !formData.title.trim()) return

    const newEvent: CalendarEvent = {
      id: Date.now().toString(),
      title: formData.title,
      start: selectedSlot.start,
      end: selectedSlot.end,
      desc: formData.desc
    }

    setEvents(prev => [...prev, newEvent])
    setDrawerOpen(false)
    setFormData({ title: '', desc: '' })
  }

  // 点击现有事件
  const handleSelectEvent = (event: CalendarEvent) => {
    // 可以实现编辑或删除功能
    alert(
      `事件: ${event.title}\n时间: ${format(event.start, 'yyyy-MM-dd HH:mm', { locale: zhCN })}\n描述: ${event.desc || '无'}`
    )
  }

  return (
    <VStack w="full" h="full" align="stretch" gap={4} p={4} overflowY="auto">
      {/* 日历容器 */}
      <Box bg="white" border="1px" borderColor="gray.200" borderRadius="lg" p={4} minH="600px">
        <Calendar
          localizer={localizer}
          culture="zh-CN"
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }}
          views={['month', 'week', 'day', 'agenda']}
          view={currentView}
          onView={setCurrentView}
          date={currentDate}
          onNavigate={setCurrentDate}
          toolbar
          selectable
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          messages={{
            today: '今天',
            previous: '上一页',
            next: '下一页',
            month: '月',
            week: '周',
            day: '日',
            agenda: '日程',
            date: '日期',
            time: '时间',
            event: '事件',
            allDay: '全天',
            work_week: '工作日',
            yesterday: '昨天',
            tomorrow: '明天',
            noEventsInRange: '该时间段内暂无事件',
            showMore: total => `+${total} 个事件`
          }}
          formats={{
            dateFormat: 'd',
            dayFormat: (date, culture, localizer) => localizer?.format(date, 'EEE', culture) ?? '',
            weekdayFormat: (date, culture, localizer) =>
              localizer?.format(date, 'EEE', culture) ?? '',
            monthHeaderFormat: (date, culture, localizer) =>
              localizer?.format(date, 'yyyy年 M月', culture) ?? '',
            dayHeaderFormat: (date, culture, localizer) =>
              localizer?.format(date, 'M月d日 EEEE', culture) ?? '',
            dayRangeHeaderFormat: ({ start, end }, culture, localizer) =>
              `${localizer?.format(start, 'M月d日', culture)} - ${localizer?.format(end, 'M月d日', culture)}`,
            agendaHeaderFormat: ({ start, end }, culture, localizer) =>
              `${localizer?.format(start, 'M月d日', culture)} - ${localizer?.format(end, 'M月d日', culture)}`
          }}
        />
      </Box>

      {/* 添加事件 Drawer */}
      <Drawer.Root open={drawerOpen} onOpenChange={e => setDrawerOpen(e.open)} placement="end">
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>添加新事件</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <VStack align="stretch" gap={4}>
                {selectedSlot && (
                  <Box p={3} bg="blue.50" borderRadius="md">
                    <Text fontSize="sm" color="gray.700">
                      <strong>开始时间：</strong>
                      {format(selectedSlot.start, 'yyyy年M月d日 HH:mm', { locale: zhCN })}
                    </Text>
                    <Text fontSize="sm" color="gray.700" mt={1}>
                      <strong>结束时间：</strong>
                      {format(selectedSlot.end, 'yyyy年M月d日 HH:mm', { locale: zhCN })}
                    </Text>
                  </Box>
                )}

                <Field.Root>
                  <Field.Label>
                    事件标题{' '}
                    <Text as="span" color="red.500">
                      *
                    </Text>
                  </Field.Label>
                  <Input
                    placeholder="请输入事件标题"
                    value={formData.title}
                    onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  />
                </Field.Root>

                <Field.Root>
                  <Field.Label>事件描述</Field.Label>
                  <Input
                    placeholder="请输入事件描述（可选）"
                    value={formData.desc}
                    onChange={e => setFormData(prev => ({ ...prev, desc: e.target.value }))}
                  />
                </Field.Root>
              </VStack>
            </Drawer.Body>
            <Drawer.Footer>
              <Flex gap={2} w="full" justify="flex-end">
                <Button variant="outline" onClick={() => setDrawerOpen(false)}>
                  取消
                </Button>
                <Button
                  colorPalette="blue"
                  onClick={handleAddEvent}
                  disabled={!formData.title.trim()}
                >
                  保存事件
                </Button>
              </Flex>
            </Drawer.Footer>
            <Drawer.CloseTrigger />
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer.Root>
    </VStack>
  )
}
