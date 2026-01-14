import {
  Button,
  CloseButton,
  createListCollection,
  Drawer,
  Field,
  Input,
  Portal,
  Select,
  useBreakpointValue,
  VStack
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as z from 'zod'
import { toaster } from '~/client/components/Toaster'
import { useApiMutation } from '~/client/hooks/useApi'

const schema = z.object({
  name: z.string().min(2, '名称至少需要2个字符'),
  email: z.email('请输入有效的邮箱地址'),
  age: z.number({ message: '请输入年龄' }).int('年龄必须为整数').positive('年龄必须为正整数'),
  gender: z.number().optional(),
  phone: z.string().min(11, '电话至少需要11位数字')
})

type FormValues = z.infer<typeof schema>

const genders = createListCollection({
  items: [
    { label: '男', value: 1 },
    { label: '女', value: 2 },
    { label: '其他', value: 0 }
  ]
})

export default function FormDrawer() {
  const isMobile = useBreakpointValue({ base: true, md: false }, { ssr: false })
  const [open, setOpen] = useState(false)
  type ServerPayload = {
    name: string
    email: string
    phone: string
    age: number
    gender?: '0' | '1' | '2'
    address?: string
  }

  const { trigger, isMutating } = useApiMutation<unknown, ServerPayload>('/demo/create')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    shouldUnregister: true,
    mode: 'onSubmit',
    defaultValues: {
      name: '',
      email: '',
      age: undefined as unknown as number,
      gender: undefined,
      phone: ''
    }
  })

  const onSubmit = async (data: FormValues) => {
    try {
      const payload: ServerPayload = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        age: data.age,
        ...(data.gender !== undefined ? { gender: String(data.gender) as '0' | '1' | '2' } : {})
      }

      await trigger(payload)
      toaster.create({
        title: '提交成功',
        type: 'success',
        meta: { closable: true }
      })
      setOpen(false)
      reset()
    } catch (error) {
      toaster.create({
        title: '提交失败',
        description: error instanceof Error ? error.message : '未知错误',
        type: 'error',
        meta: { closable: true }
      })
    }
  }

  return (
    <Drawer.Root
      unmountOnExit
      lazyMount
      open={open}
      placement={isMobile ? 'top' : 'end'}
      onOpenChange={d => {
        setOpen(d.open)
        if (!d.open) reset()
      }}
    >
      <Drawer.Trigger asChild>
        <Button variant="outline" size="sm">
          打开表单抽屉
        </Button>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner p={4}>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>表单抽屉标题</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <form onSubmit={handleSubmit(console.log)}>
                <VStack align="start" gap="4">
                  <Field.Root invalid={!!errors.name}>
                    <Field.Label>姓名</Field.Label>
                    <Input {...register('name')} />
                    <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
                  </Field.Root>
                  <Field.Root invalid={!!errors.email}>
                    <Field.Label>邮箱</Field.Label>
                    <Input type="email" {...register('email')} />
                    <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
                  </Field.Root>
                  <Field.Root invalid={!!errors.age}>
                    <Field.Label>年龄</Field.Label>
                    <Input
                      type="number"
                      inputMode="numeric"
                      {...register('age', { valueAsNumber: true })}
                    />
                    <Field.ErrorText>{errors.age?.message}</Field.ErrorText>
                  </Field.Root>
                  <Field.Root invalid={!!errors.phone}>
                    <Field.Label>电话</Field.Label>
                    <Input {...register('phone')} />
                    <Field.ErrorText>{errors.phone?.message}</Field.ErrorText>
                  </Field.Root>
                  <Field.Root invalid={!!errors.gender}>
                    <Field.Label>性别</Field.Label>
                    <Controller
                      control={control}
                      name="gender"
                      render={({ field }) => (
                        <Select.Root
                          name={field.name}
                          value={field.value ? [String(field.value)] : []}
                          onValueChange={({ value }) => field.onChange(Number(value[0]))}
                          onInteractOutside={() => field.onBlur()}
                          positioning={{ sameWidth: true }}
                          collection={genders}
                        >
                          <Select.HiddenSelect />
                          <Select.Control>
                            <Select.Trigger type="button">
                              <Select.ValueText placeholder="请选择性别" />
                            </Select.Trigger>
                            <Select.IndicatorGroup>
                              <Select.Indicator />
                            </Select.IndicatorGroup>
                          </Select.Control>
                          <Select.Positioner>
                            <Select.Content>
                              {genders.items.map(gender => (
                                <Select.Item item={gender} key={gender.value}>
                                  <Select.ItemText>{gender.label}</Select.ItemText>
                                  <Select.ItemIndicator />
                                </Select.Item>
                              ))}
                            </Select.Content>
                          </Select.Positioner>
                        </Select.Root>
                      )}
                    />
                  </Field.Root>
                </VStack>
              </form>
            </Drawer.Body>
            <Drawer.Footer>
              <Button
                variant="outline"
                onClick={() => {
                  setOpen(false)
                  reset()
                }}
              >
                取消
              </Button>
              <Button onClick={handleSubmit(onSubmit)} loading={isMutating}>
                提交
              </Button>
            </Drawer.Footer>
            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  )
}
