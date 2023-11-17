import * as RDialog from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'
import './Dialog.scss'
import { Button, Typography } from '@/view/ui'
import { Close } from '@/view/assets'
import { ComponentPropsWithoutRef, forwardRef, ReactNode } from 'react'

// export const Dialog = ({ children }: any) => (
//   <RDialog.Root>
//     <RDialog.Trigger asChild>
//       <Button fullWidth={true}>Edit deck</Button>
//     </RDialog.Trigger>
//     <RDialog.Portal>
//       <RDialog.Overlay className="DialogOverlay" />
//       <RDialog.Content className="DialogContent">
//         <RDialog.Title className="DialogTitle">
//           <Typography as={'h2'} variant={'h2'}>
//             Edit profile
//           </Typography>
//         </RDialog.Title>
//         <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
//           <RDialog.Close asChild>
//             <button className="Button green">Save changes</button>
//           </RDialog.Close>
//         </div>
//         <RDialog.Close asChild>
//           <button className="IconButton" aria-label="Close">
//             <Close />
//           </button>
//         </RDialog.Close>
//       </RDialog.Content>
//     </RDialog.Portal>
//   </RDialog.Root>
// )

export const Dialog = ({ title }: any) => (
  <RDialog.Root>
    <DialogTrigger>
      <Button>Dialog trigger</Button>
    </DialogTrigger>
    <DialogContent title={title} onOpenChange={() => {}} open>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button fullWidth={false} variant={'secondary'}>
          Close
        </Button>
        <Button fullWidth={false}>Add new pack</Button>
      </div>
    </DialogContent>
  </RDialog.Root>
)

export type DialogContentProps = {
  children: ReactNode
  onOpenChange: (open: boolean) => void
  open: boolean
  title?: string
} & Omit<ComponentPropsWithoutRef<typeof RDialog.Dialog>, 'onOpenChange' | 'open'>

const DialogContent = forwardRef(
  ({ children, title, ...props }: DialogContentProps, forwardedRef) => (
    <RDialog.Portal>
      <RDialog.Overlay className="DialogOverlay" />
      <RDialog.Content {...props} ref={forwardedRef} className="DialogContent">
        <div className={'header'}>
          <RDialog.Title className="DialogTitle">
            <Typography as={'h2'} variant={'h2'}>
              {title}
            </Typography>
            <RDialog.Close aria-label="Close">
              <Close />
            </RDialog.Close>
          </RDialog.Title>
        </div>
        <div className={'body'}>{children}</div>
      </RDialog.Content>
    </RDialog.Portal>
  )
)

// const RadixDialog = RDialog.Root
const DialogTrigger = RDialog.Trigger
