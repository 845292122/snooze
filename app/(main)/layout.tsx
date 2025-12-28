'use client'

import {
  AppleFilled,
  CarryOutFilled,
  ContactsFilled,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ScheduleFilled,
  UserOutlined,
  VerticalAlignMiddleOutlined,
  WechatWorkFilled
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Avatar, Button, Flex, Menu, Popover, Typography } from 'antd'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

type MenuItem = Required<MenuProps>['items'][number]

/**
 * 页面配置项
 */
const pages: MenuItem[] = [
  {
    key: '/home',
    label: '今日',
    icon: <CarryOutFilled style={{ fontSize: '18px' }} />
  },
  {
    key: '/calendar',
    label: '日历',
    icon: <ScheduleFilled style={{ fontSize: '18px' }} />
  },
  {
    key: '/patient',
    label: '患者',
    icon: <ContactsFilled style={{ fontSize: '18px' }} />
  },
  {
    key: '/accounts',
    label: '账户',
    icon: <WechatWorkFilled style={{ fontSize: '18px' }} />
  },
  {
    key: '/demo',
    label: '顾客demo',
    icon: <AppleFilled style={{ fontSize: '18px' }} />
  }
]

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [collapse, setCollapse] = useState<boolean>(false)
  const pathname = usePathname()
  const router = useRouter()

  return (
    <Flex
      style={{
        height: '100vh',
        width: '100vw'
      }}
    >
      <Flex
        vertical
        style={{
          width: collapse ? 80 : 200,
          borderRight: '1px solid rgba(0,0,0,0.06)',
          transition: 'width 0.3s cubic-bezier(0.2, 0, 0, 1)',
          overflow: 'hidden'
        }}
      >
        <Flex
          style={{ height: '56px', borderBottom: '1px solid rgba(0,0,0,0.06)' }}
          justify={collapse ? 'center' : 'space-between'}
          align="center"
        >
          {!collapse && (
            <Typography.Title
              level={4}
              style={{
                margin: 0,
                color: 'black',
                whiteSpace: 'nowrap',
                marginLeft: 20,
                transition: 'all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)',
                opacity: collapse ? 0 : 1,
                transform: collapse ? 'translateX(-10px)' : 'translateX(0)',
                pointerEvents: collapse ? 'none' : 'auto',
                width: collapse ? 0 : 'auto',
                overflow: 'hidden'
              }}
            >
              SNOOZE
            </Typography.Title>
          )}
          <Button
            type="text"
            styles={{
              root: {
                marginRight: collapse ? 0 : 12
              }
            }}
            icon={
              collapse ? (
                <MenuUnfoldOutlined style={{ fontSize: '18px' }} />
              ) : (
                <MenuFoldOutlined style={{ fontSize: '18px' }} />
              )
            }
            onClick={() => setCollapse(!collapse)}
          />
        </Flex>
        <Flex flex={1}>
          <Menu
            theme="light"
            mode="inline"
            items={pages}
            inlineCollapsed={collapse}
            selectedKeys={[pathname]}
            onClick={({ key }) => router.push(key)}
            styles={{
              root: {
                border: 'none'
              }
            }}
          />
        </Flex>
        <Flex
          align="center"
          justify="center"
          style={{ height: '56px', borderTop: '1px solid rgba(0,0,0,0.06)' }}
        >
          <Popover placement="rightBottom" content={<div>123</div>} title="Title" arrow={false}>
            <Flex
              style={{
                width: '100%',
                height: '100%',
                padding: '0 12px',
                overflow: 'hidden', // 关键：确保内部元素位移出界后不可见
                position: 'relative'
              }}
              align="center"
            >
              {/* 左侧头像和用户信息部分 */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flex: 1,
                  minWidth: 0 // 防止 flex 子元素撑破容器
                }}
              >
                <Avatar
                  shape="square"
                  icon={<UserOutlined />}
                  size="large"
                  style={{
                    flexShrink: 0,
                    marginRight: collapse ? 0 : 12,
                    // 关键：为了让头像居中更完美，收缩时可以微调位置
                    transform: collapse ? 'translateX(4px)' : 'translateX(0)',
                    transition: 'all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)'
                  }}
                />

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    opacity: collapse ? 0 : 1,
                    width: collapse ? 0 : '120px',
                    transition: 'all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden'
                  }}
                >
                  <Typography.Text strong style={{ fontSize: '14px' }}>
                    John Doe
                  </Typography.Text>
                  <Typography.Text type="secondary" style={{ fontSize: '12px' }}>
                    xxx@qq.com
                  </Typography.Text>
                </div>
              </div>

              {/* 右侧图标部分：彻底解决隐藏不全的问题 */}
              <div
                style={{
                  flexShrink: 0, // 1. 确保图标不会因为宽度变小而被压扁
                  width: collapse ? 0 : '24px', // 2. 宽度归零
                  opacity: collapse ? 0 : 1, // 3. 透明度归零
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  // 4. 关键位移：收缩时向右侧大幅度滑出
                  transform: collapse ? 'translateX(30px)' : 'translateX(0)',
                  transition: 'all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)',
                  overflow: 'hidden'
                }}
              >
                <VerticalAlignMiddleOutlined style={{ color: 'gray' }} />
              </div>
            </Flex>
          </Popover>
        </Flex>
      </Flex>
      <Flex flex={1} style={{ padding: 16 }}>
        {children}
      </Flex>
    </Flex>
  )
}
