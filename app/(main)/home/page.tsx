'use client'

import { Column } from '@ant-design/charts'
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  CarryOutOutlined,
  UserOutlined
} from '@ant-design/icons'
import { Alert, Button, Card, Flex, Space, Statistic, Typography } from 'antd'

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

const data = [
  { type: '1-3秒', value: 0.6 },
  { type: '4-10秒', value: 1 },
  { type: '11-30秒', value: 0.7 },
  { type: '31-60秒', value: 0.5 },
  { type: '1-3分', value: 0.2 },
  { type: '3-10分', value: 0.5 },
  { type: '10-30分', value: 0.3 },
  { type: '30+分', value: 0.25 }
]

const config = {
  data,
  xField: 'type',
  yField: 'value',
  markBackground: {
    style: {
      fill: '#eee'
    }
  },
  scale: {
    y: {
      domain: [0, 1]
    }
  },
  legend: false
}

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
    <Flex vertical style={{ width: '100%' }}>
      <Alert
        title="Informational Notes"
        description="Additional description and information about copywriting."
        type="info"
        showIcon
        closable
        styles={{
          root: {
            marginBottom: 20
          }
        }}
      />
      {/* 统计卡片 */}
      <Flex gap={22}>
        <Card hoverable style={{ width: '100%', borderRadius: '8px' }}>
          <Statistic
            title={
              <Space size="small">
                <UserOutlined style={{ color: '#1890ff' }} />
                <span>累计访问量</span>
              </Space>
            }
            value={112893}
            // 使用 styles.value 代替已弃用的 valueStyle
            styles={{
              content: {
                fontSize: '28px',
                fontWeight: 700,
                color: 'rgba(0, 0, 0, 0.88)'
              }
            }}
          />

          {/* 趋势对比区 */}
          <div style={{ marginTop: 16, display: 'flex', gap: '16px' }}>
            <Space size={4}>
              <Typography.Text type="secondary">周同比</Typography.Text>
              <Typography.Text color="error" style={{ color: '#cf1322', fontWeight: 500 }}>
                12% <ArrowUpOutlined />
              </Typography.Text>
            </Space>

            <Space size={4}>
              <Typography.Text type="secondary">日环比</Typography.Text>
              <Typography.Text style={{ color: '#3f8600', fontWeight: 500 }}>
                5% <ArrowDownOutlined />
              </Typography.Text>
            </Space>
          </div>
        </Card>
        <Card hoverable style={{ width: '100%', borderRadius: '8px' }}>
          <Statistic
            title={
              <Space size="small">
                <UserOutlined style={{ color: '#1890ff' }} />
                <span>累计访问量</span>
              </Space>
            }
            value={112893}
            // 使用 styles.value 代替已弃用的 valueStyle
            styles={{
              content: {
                fontSize: '28px',
                fontWeight: 700,
                color: 'rgba(0, 0, 0, 0.88)'
              }
            }}
          />

          {/* 趋势对比区 */}
          <div style={{ marginTop: 16, display: 'flex', gap: '16px' }}>
            <Space size={4}>
              <Typography.Text type="secondary">周同比</Typography.Text>
              <Typography.Text color="error" style={{ color: '#cf1322', fontWeight: 500 }}>
                12% <ArrowUpOutlined />
              </Typography.Text>
            </Space>

            <Space size={4}>
              <Typography.Text type="secondary">日环比</Typography.Text>
              <Typography.Text style={{ color: '#3f8600', fontWeight: 500 }}>
                5% <ArrowDownOutlined />
              </Typography.Text>
            </Space>
          </div>
        </Card>
        <Card hoverable style={{ width: '100%', borderRadius: '8px' }}>
          <Statistic
            title={
              <Space size="small">
                <UserOutlined style={{ color: '#1890ff' }} />
                <span>累计访问量</span>
              </Space>
            }
            value={112893}
            // 使用 styles.value 代替已弃用的 valueStyle
            styles={{
              content: {
                fontSize: '28px',
                fontWeight: 700,
                color: 'rgba(0, 0, 0, 0.88)'
              }
            }}
          />

          {/* 趋势对比区 */}
          <div style={{ marginTop: 16, display: 'flex', gap: '16px' }}>
            <Space size={4}>
              <Typography.Text type="secondary">周同比</Typography.Text>
              <Typography.Text color="error" style={{ color: '#cf1322', fontWeight: 500 }}>
                12% <ArrowUpOutlined />
              </Typography.Text>
            </Space>

            <Space size={4}>
              <Typography.Text type="secondary">日环比</Typography.Text>
              <Typography.Text style={{ color: '#3f8600', fontWeight: 500 }}>
                5% <ArrowDownOutlined />
              </Typography.Text>
            </Space>
          </div>
        </Card>
        <Card hoverable style={{ width: '100%', borderRadius: '8px' }}>
          <Statistic
            title={
              <Space size="small">
                <UserOutlined style={{ color: '#1890ff' }} />
                <span>累计访问量</span>
              </Space>
            }
            value={112893}
            // 使用 styles.value 代替已弃用的 valueStyle
            styles={{
              content: {
                fontSize: '28px',
                fontWeight: 700,
                color: 'rgba(0, 0, 0, 0.88)'
              }
            }}
          />

          {/* 趋势对比区 */}
          <div style={{ marginTop: 16, display: 'flex', gap: '16px' }}>
            <Space size={4}>
              <Typography.Text type="secondary">周同比</Typography.Text>
              <Typography.Text color="error" style={{ color: '#cf1322', fontWeight: 500 }}>
                12% <ArrowUpOutlined />
              </Typography.Text>
            </Space>

            <Space size={4}>
              <Typography.Text type="secondary">日环比</Typography.Text>
              <Typography.Text style={{ color: '#3f8600', fontWeight: 500 }}>
                5% <ArrowDownOutlined />
              </Typography.Text>
            </Space>
          </div>
        </Card>
      </Flex>

      <Flex gap="large" style={{ marginTop: 20 }}>
        <Flex style={{ width: '70%' }} vertical>
          <div style={{ height: '600px' }}>
            <Typography.Title level={4} style={{ margin: 0 }}>
              <CarryOutOutlined style={{ fontSize: 20, marginRight: 5 }} />
              访问时长分布
            </Typography.Title>
            <Column {...config} />
          </div>
          <div>
            <Typography.Title level={4} style={{ margin: 0 }}>
              <CarryOutOutlined style={{ fontSize: 20, marginRight: 5 }} />
              最近活动
            </Typography.Title>
          </div>
        </Flex>
        <Flex flex={1}>
          <Typography.Title level={4} style={{ margin: 0 }}>
            <CarryOutOutlined style={{ fontSize: 20, marginRight: 5 }} />
            今日任务
          </Typography.Title>
        </Flex>
      </Flex>
    </Flex>
  )
}
