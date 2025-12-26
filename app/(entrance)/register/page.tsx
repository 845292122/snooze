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
  Stack,
  Text
} from '@chakra-ui/react'
import { useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [agreeTerms, setAgreeTerms] = useState(false)

  const handleRegister = () => {
    console.log({ email, password, confirmPassword, agreeTerms })
    // TODO: 实现注册逻辑
  }

  return (
    <>
      {/* 欢迎文字 */}
      <Heading size="xl" textAlign="center" mt={4}>
        创建账户
      </Heading>

      {/* 系统简介 */}
      <Text color="gray.600" fontSize="sm" textAlign="center">
        填写以下信息完成注册
      </Text>

      {/* 注册表单 */}
      <Box w="full">
        <Stack gap={4}>
          {/* 邮箱输入框 */}
          <Box>
            <Text fontSize="sm" mb={2} fontWeight="medium">
              邮箱
            </Text>
            <Input
              type="email"
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

          {/* 确认密码输入框 */}
          <Box>
            <Text fontSize="sm" mb={2} fontWeight="medium">
              确认密码
            </Text>
            <Box position="relative">
              <Input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="请再次输入密码"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                paddingRight="12"
              />
              <Box position="absolute" right="2" top="50%" transform="translateY(-50%)">
                <IconButton
                  aria-label={showConfirmPassword ? '隐藏密码' : '显示密码'}
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <AiFillEye size={20} /> : <AiFillEyeInvisible size={20} />}
                </IconButton>
              </Box>
            </Box>
          </Box>

          {/* 同意条款 */}
          <Flex justify="space-between" align="center">
            <Checkbox.Root
              checked={agreeTerms}
              onCheckedChange={details => setAgreeTerms(!!details.checked)}
            >
              <Checkbox.HiddenInput />
              <Checkbox.Control />
              <Checkbox.Label>我已阅读并同意服务条款</Checkbox.Label>
            </Checkbox.Root>
          </Flex>

          {/* 注册按钮 */}
          <Button w="full" onClick={handleRegister}>
            注册
          </Button>

          <Text textAlign="center" mt="5" color="gray.500">
            已有账户？ <Link href="/login">请登录</Link>
          </Text>
        </Stack>
      </Box>
    </>
  )
}
