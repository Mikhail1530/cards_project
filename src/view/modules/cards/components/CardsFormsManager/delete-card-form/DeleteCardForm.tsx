import { Dialog, Typography } from '@/view/ui'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import s from './DeleteCardForm.module.scss'
import { ReactNode } from 'react'

export type DeleteCardFormProps = {
  cardQuestion: string | undefined
  onSubmit: (data: DeleteCardFormValues) => void
  inputLabel?: string
  checkboxLabel?: string
  icon?: ReactNode
  open: boolean
  onClose: () => void
  cardId: string
}

type DeleteCardFormValues = z.infer<typeof deleteCardForm>

const deleteCardForm = z.object({
  cardId: z.string(),
})

export const DeleteCardForm = ({
  open,
  cardId,
  icon,
  cardQuestion,
  onSubmit,
  onClose,
}: DeleteCardFormProps) => {
  const { handleSubmit } = useForm<DeleteCardFormValues>({
    resolver: zodResolver(deleteCardForm),
    defaultValues: { cardId: cardId },
  })

  const handleFormSubmit = handleSubmit((data: DeleteCardFormValues) => {
    onSubmit(data)
    onClose()
    console.log(data, 'is data in DeleteDeckForm handleSubmit')
  })

  return (
    <Dialog
      className={s.dialog}
      title={'Delete Deck'}
      acceptBtnText={'Delete'}
      handleFormSubmit={handleFormSubmit}
      triggerBtnText={''}
      open={open}
      icon={icon}
      onClose={onClose}
      triggerBtnVariant={'icon'}
    >
      <div className={s.invisible} />
      <form>
        <div className={s.body}>
          <Typography>
            Do you really want to remove "{cardQuestion}" question card? <br />
            All cards will be deleted.
          </Typography>
        </div>
      </form>
    </Dialog>
  )
}
