import { Dialog, Typography } from '@/view/ui'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import s from './DeleteDeckForm.module.scss'
import { ReactNode } from 'react'

export type DeleteDeckProps = {
  deckName: string
  onSubmit: (data: DeleteDeckFormValues) => void
  inputLabel?: string
  checkboxLabel?: string
  icon?: ReactNode
  open: boolean
  onClose: () => void
  id: string
  // onClick: () => void
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
}: DeleteDeckProps) => {
  const { handleSubmit } = useForm<DeleteDeckFormValues>({
    resolver: zodResolver(deleteDeckForm),
    defaultValues: { id: id },
  })

  const handleFormSubmit = handleSubmit((data: DeleteDeckFormValues) => {
    onSubmit(data)
    onClose()
    console.log(data, 'is data in DeleteDeckForm handleSubmit')
  })

  return (
    <Dialog
      className={s.dialog}
      title={'Delete Deck'}
      acceptBtnText={'Save changes'}
      handleFormSubmit={handleFormSubmit}
      triggerBtnText={'Delete _selectedDeck'}
      icon={icon}
      open={open}
      onClose={onClose}
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
