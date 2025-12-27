'use client'

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
  return <div>patient</div>
}
