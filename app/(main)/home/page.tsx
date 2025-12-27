'use client'

import { Button } from 'antd'

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
  return (
    <div>
      home
      <Button type="primary">Button</Button>
    </div>
  )
}
