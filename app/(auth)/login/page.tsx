import { Button, Flex } from 'antd'

export default function LoginPage() {
  return (
    <div>
      <Flex gap="small" wrap>
        <Button type="primary">Primary Button</Button>
        <Button>Default Button</Button>
        <Button type="dashed">Dashed Button</Button>
        <Button type="text">Text Button</Button>
        <Button type="link">Link Button</Button>
      </Flex>
      <h1>Login Page</h1>
      {/* Add your login form or components here */}
    </div>
  )
}
