'use client'

import {
  Toaster as ChakraToaster,
  createToaster,
  Portal,
  Spinner,
  Stack,
  Toast
} from '@chakra-ui/react'

// * 成功提示
// toaster.create({
//   title: "Success",
//   description: "操作成功",
//   type: "success",
// })

// * 错误提示
// toaster.create({
//   title: "Error",
//   description: "操作失败",
//   type: "error",
//   meta: { closable: true },
// })

// * 带操作按钮
// toaster.create({
//   title: "Update available",
//   action: {
//     label: "Update",
//     onClick: () => console.log("Updating..."),
//   },
//   type: "info",
// })

export const toaster = createToaster({
  placement: 'top',
  pauseOnPageIdle: true
})

export const Toaster = () => {
  return (
    <Portal>
      <ChakraToaster toaster={toaster} insetInline={{ mdDown: '4' }}>
        {toast => (
          <Toast.Root width={{ md: 'sm' }}>
            {toast.type === 'loading' ? (
              <Spinner size="sm" color="blue.solid" />
            ) : (
              <Toast.Indicator />
            )}
            <Stack gap="1" flex="1" maxWidth="100%">
              {toast.title && <Toast.Title>{toast.title}</Toast.Title>}
              {toast.description && <Toast.Description>{toast.description}</Toast.Description>}
            </Stack>
            {toast.action && <Toast.ActionTrigger>{toast.action.label}</Toast.ActionTrigger>}
            {toast.meta?.closable && <Toast.CloseTrigger />}
          </Toast.Root>
        )}
      </ChakraToaster>
    </Portal>
  )
}
