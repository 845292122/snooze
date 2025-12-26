'use client'

import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  IconButton,
  Input,
  Link,
  Separator,
  Stack,
  Text
} from '@chakra-ui/react'
import { useState } from 'react'
import { AiFillEye, AiFillEyeInvisible, AiFillWechat } from 'react-icons/ai'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  const handleLogin = () => {
    console.log({ email, password, rememberMe })
    // TODO: 实现登录逻辑
  }

  return (
    <>
      {/* 欢迎文字 */}
      <Heading size="xl" textAlign="center" mt={4}>
        欢迎回来
      </Heading>

      {/* 系统简介 */}
      <Text color="gray.600" fontSize="sm" textAlign="center">
        登录您的账户以继续访问系统
      </Text>

      {/* 登录表单 */}
      <Box w="full">
        <Stack gap={4}>
          {/* 邮箱输入框 */}
          <Box>
            <Text fontSize="sm" mb={2} fontWeight="medium">
              邮箱
            </Text>
            <Input
              type="tel"
              placeholder="请输入邮箱"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </Box>

          {/* 密码输入框 */}
          <Box>
            <Text fontSize="sm" mb={2} fontWeight="medium">
              密码
            </Text>
            <Box position="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="请输入密码"
                value={password}
                onChange={e => setPassword(e.target.value)}
                paddingRight="12"
              />
              <Box position="absolute" right="2" top="50%" transform="translateY(-50%)">
                <IconButton
                  aria-label={showPassword ? '隐藏密码' : '显示密码'}
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <AiFillEye size={20} /> : <AiFillEyeInvisible size={20} />}
                </IconButton>
              </Box>
            </Box>
          </Box>

          {/* 记住我和忘记密码 */}
          <Flex justify="space-between" align="center">
            <Checkbox.Root
              checked={rememberMe}
              onCheckedChange={details => setRememberMe(!!details.checked)}
            >
              <Checkbox.HiddenInput />
              <Checkbox.Control />
              <Checkbox.Label>记住我</Checkbox.Label>
            </Checkbox.Root>
            <Link color="blue.500" fontSize="sm" href="#">
              忘记密码？
            </Link>
          </Flex>

          {/* 登录按钮 */}
          <Button w="full" onClick={handleLogin}>
            登录
          </Button>

          <Separator />

          <Button w="full" variant="outline" disabled>
            <AiFillWechat />
            微信登录
          </Button>

          <Text textAlign="center" mt="5" color="gray.500">
            还没有账户？ <Link href="/register">请注册</Link>
          </Text>
        </Stack>
      </Box>
    </>
  )
}
