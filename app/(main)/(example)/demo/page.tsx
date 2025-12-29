'use client'

import {
  DownloadOutlined,
  RiseOutlined,
  SearchOutlined,
  StepBackwardOutlined,
  UploadOutlined,
  UserAddOutlined
} from '@ant-design/icons'
import { Avatar, Button, Flex, Input, Space, Table, Tag, Typography } from 'antd'
import type { CheckableTagOption } from 'antd/es/tag/CheckableTagGroup'
import { useState } from 'react'

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

const tagsData: CheckableTagOption<string>[] = [
  {
    label: (
      <Flex align="center" justify="center" gap={5}>
        <StepBackwardOutlined style={{ marginTop: 1 }} />
        <span style={{ fontSize: 12 }}>Books</span>
      </Flex>
    ),
    value: 'Books'
  },
  {
    label: (
      <Flex align="center" justify="center" gap={5}>
        <StepBackwardOutlined style={{ marginTop: 1 }} />
        <span style={{ fontSize: 12 }}>Books</span>
      </Flex>
    ),
    value: 'Movies'
  },
  {
    label: (
      <Flex align="center" justify="center" gap={5}>
        <StepBackwardOutlined style={{ marginTop: 1 }} />
        <span style={{ fontSize: 12 }}>Books</span>
      </Flex>
    ),
    value: 'Music'
  },
  {
    label: (
      <Flex align="center" justify="center" gap={5}>
        <StepBackwardOutlined style={{ marginTop: 1 }} />
        <span style={{ fontSize: 12 }}>Books</span>
      </Flex>
    ),
    value: 'Sports'
  },
  {
    label: (
      <Flex align="center" justify="center" gap={5}>
        <StepBackwardOutlined style={{ marginTop: 1 }} />
        <span style={{ fontSize: 12 }}>Books</span>
      </Flex>
    ),
    value: 'Travel'
  }
]

/**
 * 用户页面
 * 用户快速搜索、操作按钮
 * 数据表格可多选
 * 多选数据后底部出现批量操作drawer
 */
export default function DemoPage() {
  const [singleSelected, setSingleSelected] = useState<string | null>('Books')

  return (
    <Flex gap="large" style={{ width: '100%' }}>
      <div style={{ width: 200 }}>
        <Input
          placeholder="搜索用户..."
          variant="underlined"
          allowClear
          prefix={<SearchOutlined />}
        />

        <Space style={{ marginTop: 24 }}>
          <RiseOutlined style={{ fontSize: '26px' }} />
          <Typography.Text type="secondary">状态</Typography.Text>
        </Space>
        <Tag.CheckableTagGroup
          options={tagsData}
          value={singleSelected}
          onChange={val => setSingleSelected(val)}
          styles={{
            root: {
              display: 'flex',
              flexDirection: 'column',
              marginTop: 12
            },
            item: {
              height: 30,
              display: 'flex',
              alignItems: 'center',
              padding: '0 12px'
            }
          }}
        />
      </div>
      <Flex flex={1} vertical>
        <Flex justify="flex-end">
          <Space>
            <Button type="dashed" icon={<DownloadOutlined />} disabled>
              导出
            </Button>
            <Button type="dashed" icon={<UploadOutlined />}>
              导入
            </Button>
            <Button type="primary" icon={<UserAddOutlined />}>
              新增
            </Button>
          </Space>
        </Flex>
        <Table
          dataSource={MOCK_ACCOUNTS}
          rowKey="id"
          rowSelection={{ type: 'checkbox', fixed: true }}
          styles={{
            root: {
              marginTop: 25
            }
          }}
        >
          <Table.Column
            title="avatar"
            dataIndex="avatar"
            key="avatar"
            render={(avatar: string) => <Avatar src={avatar} />}
          />
          <Table.Column title="name" dataIndex="name" key="name" />
          <Table.Column title="shopName" dataIndex="shopName" key="shopName" />
          <Table.Column title="lastLogin" dataIndex="lastLogin" key="lastLogin" />
          <Table.Column
            title="Action"
            key="action"
            render={(_: any, record: any) => (
              <Space size="middle">
                <Button type="link">Invite {record.lastName}</Button>
                <Button type="link">Delete</Button>
              </Space>
            )}
          />
        </Table>
      </Flex>
    </Flex>
  )
}
