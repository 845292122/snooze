'use client'

import { CoffeeOutlined, LockOutlined, MobileOutlined, WechatOutlined } from '@ant-design/icons'
import { Button, Checkbox, Col, Divider, Flex, Form, Input, Row, Typography } from 'antd'

type FieldType = {
  phone: string
  captcha: string
  remeberMe: boolean
}

export default function AuthPage() {
  return (
    <Flex vertical={true} align="center" style={{ width: '350px' }}>
      <Typography.Title level={3}>欢迎回来</Typography.Title>
      <Typography.Paragraph type="secondary" style={{}}>
        登录您的账户以继续访问系统
      </Typography.Paragraph>

      <Form name="login" style={{ width: '100%', marginBottom: '-20px', marginTop: '20px' }}>
        <Form.Item<FieldType> name="phone">
          <Input placeholder="手机号" prefix={<MobileOutlined />} />
        </Form.Item>
        <Form.Item<FieldType> name="captcha">
          <Row gutter={8}>
            <Col span={18}>
              <Input placeholder="验证码" prefix={<LockOutlined />} />
            </Col>
            <Col span={6}>
              <Button block>获取验证码</Button>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item<FieldType> name="remeberMe" valuePropName="checked">
          <Checkbox>保持登录</Checkbox>
        </Form.Item>
      </Form>

      <Button type="primary" block icon={<CoffeeOutlined />}>
        登录
      </Button>

      <Divider plain> 其他登录方式</Divider>

      <Button block icon={<WechatOutlined />}>
        微信登录
      </Button>
    </Flex>
  )
}
