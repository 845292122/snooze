'use client'

import { Button, Checkbox, Input, Link } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { BsFingerprint, BsLock, BsPhone } from 'react-icons/bs'
import z from 'zod'

const schema = z.object({
  phone: z.string().min(1, '请输入手机号'),
  password: z.string().min(6, '密码长度不能少于6位'),
  rememberMe: z.boolean().optional()
})

type FormValues = z.infer<typeof schema>

export default function LoginForm() {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting, touchedFields }
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      phone: '',
      password: '',
      rememberMe: false
    }
  })

  const onSubmit = async (values: FormValues) => {
    console.log(values)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Controller
        name="phone"
        control={control}
        render={({ field }) => (
          <Input
            label={touchedFields.phone && errors.phone ? errors.phone.message : '手机号'}
            labelPlacement="outside-top"
            type="text"
            {...field}
            isInvalid={!!(touchedFields.phone && errors.phone)}
            startContent={<BsPhone size={18} />}
          />
        )}
      />
      <div>
        <div className="flex justify-between items-center mb-2">
          <label
            htmlFor="password-input"
            className={`text-sm ${touchedFields.password && errors.password ? 'text-danger' : 'text-foreground'}`}
          >
            {touchedFields.password && errors.password ? errors.password.message : '密码'}
          </label>
          <Link color="primary" className="cursor-pointer text-sm">
            忘记密码 ?
          </Link>
        </div>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input
              id="password-input"
              type="password"
              {...field}
              isInvalid={!!(touchedFields.password && errors.password)}
              startContent={<BsLock size={18} />}
            />
          )}
        />
      </div>
      <Controller
        name="rememberMe"
        control={control}
        render={({ field }) => (
          <Checkbox isSelected={field.value} onValueChange={field.onChange} size="sm">
            记住我
          </Checkbox>
        )}
      />
      <Button
        type="submit"
        color="primary"
        variant="shadow"
        fullWidth
        isLoading={isSubmitting}
        className="mt-2"
      >
        登 录
      </Button>
      <div className="text-center text-sm text-gray-600">
        还没有账号？
        <Link href="#" underline="always" className="ml-1 text-sm">
          请注册
        </Link>
      </div>
      <Button
        variant="flat"
        radius="full"
        color="success"
        fullWidth
        isDisabled
        startContent={<BsFingerprint size={18} />}
      >
        使用微信登录
      </Button>
    </form>
  )
}
