import { Dialog, Typography } from '@/view/ui'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import s from './DeleteDeckForm.module.scss'
import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

export type DeleteDeckProps = {
  deckName: string
  onSubmit: (data: DeleteDeckFormValues) => void
  inputLabel?: string
  checkboxLabel?: string
  icon?: ReactNode
  open: boolean
  onClose: () => void
  id: string
  triggerBtnText?: string
  deleteSuccess: boolean
}

type DeleteDeckFormValues = z.infer<typeof deleteDeckForm>

const deleteDeckForm = z.object({
  id: z.string(),
})

export const DeleteDeckForm = ({
  open,
  id,
  icon,
  deckName,
  onSubmit,
  onClose,
  triggerBtnText,
  deleteSuccess,
}: DeleteDeckProps) => {
  const { handleSubmit } = useForm<DeleteDeckFormValues>({
    resolver: zodResolver(deleteDeckForm),
    defaultValues: { id: id },
  })

  if (deleteSuccess) {
    return <Navigate to={'/'} />
  }

  const handleFormSubmit = handleSubmit((data: DeleteDeckFormValues) => {
    onSubmit(data)
    onClose()
  })

  return (
    <Dialog
      className={s.dialog}
      title={'Delete Deck'}
      acceptBtnText={'Save changes'}
      handleFormSubmit={handleFormSubmit}
      triggerBtnText={triggerBtnText || ''}
      icon={icon}
      open={open}
      onClose={onClose}
      triggerBtnVariant={'icon'}
    >
      <div className={s.invisible} />
      <form>
        <div className={s.body}>
          <Typography>
            Do you really want to remove {deckName}? <br />
            All cards will be deleted.
          </Typography>
        </div>
      </form>
    </Dialog>
  )
}
