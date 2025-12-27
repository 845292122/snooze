import { Button, CloseButton, Dialog, Portal, useDialog } from '@chakra-ui/react'

// type FieldConfig = {
//   name: string
//   label: string
//   type?: string
//   placeholder?: string
//   required?: boolean
//   defaultValue?: any
// }

type FormDialogProps = {
  title?: string
}

export default function FormDialog({ title = '新建' }: FormDialogProps) {
  const dialog = useDialog()
  return (
    <Dialog.RootProvider value={dialog}>
      <Dialog.Trigger asChild>
        <Button variant="outline" size="sm">
          {dialog.open ? 'Close' : 'Open'} Dialog
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{title}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>body</Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">取消</Button>
              </Dialog.ActionTrigger>
              <Button>提交</Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.RootProvider>
  )
}
