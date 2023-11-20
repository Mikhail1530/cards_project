import * as RDialog from '@radix-ui/react-dialog'
import s from './Dialog.module.scss'
import { Button, Typography } from '@/view/ui'
import { Close } from '@/view/assets'
import { ComponentPropsWithoutRef, forwardRef, HTMLAttributes, ReactNode, useState } from 'react'

type DialogProps = {
  handleFormSubmit: () => void
  title: string
  icon?: ReactNode
  acceptBtnText: string
  children: ReactNode
  triggerBtnText: string
  open?: boolean
  onClose?: () => void
} & ComponentPropsWithoutRef<typeof RDialog.Dialog> &
  HTMLAttributes<HTMLDivElement>
/**
 * This dialog component is used to create your own module window. Includes Opening Trigger as button,
 * two buttons and [`DialogContent`](#dialogcontent)  component as body part
 * * How to use the `Dialog` component:
 *
 * <Dialog title="Example Dialog" acceptBtnText="OK">
 *
 *  This is the content of the dialog.
 *
 * </DialogContent>
 */
export const Dialog = ({
  open,
  onOpenChange,
  triggerBtnText,
  icon,
  onClose,
  children,
  ...props
}: DialogProps): ReactNode => {
  // const [open, setOpen] = useState(false)
  return (
    <RDialog.Root open={open} onOpenChange={onClose}>
      <DialogTrigger asChild>
        <Button fullWidth={false} variant={icon && 'icon'}>
          {icon ? icon : triggerBtnText}
        </Button>
      </DialogTrigger>
      <DialogContent setOpen={onClose} {...props}>
        {children}
      </DialogContent>
    </RDialog.Root>
  )
}

export type DialogContentProps = {
  children: ReactNode
  handleFormSubmit: () => void
  acceptBtnText: string
  title?: string
  // onOpenChange: (open: boolean) => void
  setOpen: (open: boolean) => void
} & Omit<ComponentPropsWithoutRef<typeof RDialog.Dialog>, 'onOpenChange' | 'open'>
/**
 *  @component
 *  `DialogContent` component used as a building block for the Dialog module window.
 *  By default, is set to have two buttons to close / save. Crossed button in the corner and optional Title.
 *  Whole additional logic passed trough children via Dialog component.
 *  If currentDeck in [`Decks`](#dialogcontent) is not empty open show modal. Onclose set data to null
 *  @param {string} [title] - Optional title for the dialog header you pass through Dialog.
 *  @param {ReactNode} children - The content of the Dialog you pass through Dialog.
 *  @example
 */
const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
  (
    { title, handleFormSubmit, acceptBtnText, setOpen, children, ...props }: DialogContentProps,
    forwardedRef
  ) => (
    <RDialog.Portal>
      <RDialog.Overlay className={s.dialogOverlay} />
      <RDialog.Content {...props} ref={forwardedRef} className={s.dialogContent}>
        <div className={s.header}>
          <RDialog.Title className={s.dialogTitle}>
            <Typography variant={'h2'}>{title}</Typography>
            <RDialog.Close aria-label="Close">
              <Close />
            </RDialog.Close>
          </RDialog.Title>
        </div>
        <div className={s.body}>{children}</div>
        <div className={s.footer}>
          <div className={s.dialogFooter}>
            <Button onClick={() => setOpen(!open)} fullWidth={false} variant={'secondary'}>
              Close
            </Button>
            <Button onClick={handleFormSubmit} fullWidth={false}>
              {acceptBtnText}
            </Button>
          </div>
        </div>
      </RDialog.Content>
    </RDialog.Portal>
  )
)

// const RadixDialog = RDialog.Root
const DialogTrigger = RDialog.Trigger
