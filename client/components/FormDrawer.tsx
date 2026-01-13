import {
  Button,
  CloseButton,
  createListCollection,
  Drawer,
  Field,
  Input,
  Portal,
  Select,
  VStack
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as z from 'zod'

const schema = z.object({
  name: z.string().min(2, '名称至少需要2个字符'),
  email: z.string().email('请输入有效的邮箱地址'),
  gender: z.string().optional(),
  phone: z.number().optional()
})

type FormValues = z.infer<typeof schema>

const genders = createListCollection({
  items: [
    { label: '男', value: 'male' },
    { label: '女', value: 'female' },
    { label: '其他', value: 'other' }
  ]
})

export default function FormDrawer() {
  const [open, setOpen] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    shouldUnregister: true,
    defaultValues: {
      name: '',
      email: '',
      gender: undefined,
      phone: undefined
    }
  })

  return (
    <Drawer.Root
      unmountOnExit
      lazyMount
      open={open}
      placement="top"
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
                  <Field.Root invalid={!!errors.gender}>
                    <Field.Label>性别</Field.Label>
                    <Controller
                      control={control}
                      name="gender"
                      render={({ field }) => (
                        <Select.Root
                          name={field.name}
                          value={field.value ? [field.value] : []}
                          onValueChange={({ value }) => field.onChange(value[0])}
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
              <Button variant="outline">Cancel</Button>
              <Button>Save</Button>
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
