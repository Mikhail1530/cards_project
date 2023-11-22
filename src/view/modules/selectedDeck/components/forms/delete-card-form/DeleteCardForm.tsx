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
  id: string
}

type DeleteCardFormValues = z.infer<typeof deleteCardForm>

const deleteCardForm = z.object({
  id: z.string(),
})

export const DeleteCardForm = ({
  open,
  id,
  icon,
  cardQuestion,
  onSubmit,
  onClose,
}: DeleteCardFormProps) => {
  const { handleSubmit } = useForm<DeleteCardFormValues>({
    resolver: zodResolver(deleteCardForm),
    defaultValues: { id: id },
  })

  const handleFormSubmit = handleSubmit((data: DeleteCardFormValues) => {
    onSubmit(data)
    onClose()
    console.log(data, 'is data in DeleteDeck handleSubmit')
  })

  return (
    <Dialog
      className={s.dialog}
      title={'Delete Deck'}
      acceptBtnText={'Save changes'}
      handleFormSubmit={handleFormSubmit}
      triggerBtnText={'Delete selectedDeck'}
      open={open}
      icon={icon}
      onClose={onClose}
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
