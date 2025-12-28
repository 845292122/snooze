'use client'

import { CopyrightOutlined } from '@ant-design/icons'
import { Flex } from 'antd'

export default function EntracnceLayout({ children }: { children: React.ReactNode }) {
  return (
    <Flex
      style={{ width: '100vw', height: '100vh' }}
      align="center"
      justify="center"
      vertical={true}
    >
      {/* <Flex align="center" gap={7}>
        <Flex
          style={{
            width: '22px',
            height: '22px',
            borderRadius: 'full',
            backgroundColor: 'black'
          }}
          align="center"
          justify="center"
        >
          <Typography.Text style={{ fontSize: '18px', fontWeight: 'bold', color: 'white' }}>
            S
          </Typography.Text>
        </Flex>
        <Typography.Text style={{ fontSize: '18px', fontWeight: 'bold', color: 'black' }}>
          NOOZE
        </Typography.Text>
      </Flex> */}
      {children}

      <div
        style={{ position: 'absolute', bottom: 30, left: 0, width: '100%', textAlign: 'center' }}
      >
        <CopyrightOutlined />
        <span style={{ marginLeft: '10px' }}>Powered by Edison.Cheung</span>
      </div>
    </Flex>
  )
}
