import { Dialog, Typography } from '@/view/ui'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import s from './DeleteDeckForm.module.scss'
import { ReactNode } from 'react'

export type EditDeckProps = {
  deckName: string | undefined
  onSubmit: (data: DeleteDeckFormValues) => void
  inputLabel?: string
  checkboxLabel?: string
  icon?: ReactNode
  open: boolean
  onClose: () => void
  id: string
}

type DeleteDeckFormValues = z.infer<typeof deleteDeckForm>

const deleteDeckForm = z.object({
  id: z.string(),
})

export const DeleteDeck = ({ open, id, icon, deckName, onSubmit, onClose }: EditDeckProps) => {
  const { handleSubmit } = useForm<DeleteDeckFormValues>({
    resolver: zodResolver(deleteDeckForm),
    defaultValues: { id: id },
  })

  const handleFormSubmit = handleSubmit((data: DeleteDeckFormValues) => {
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
      triggerBtnText={'Delete deck'}
      open={open}
      icon={icon}
      onClose={onClose}
    >
      <div className={s.invisible} />
      <hr /> {/*FIXME: ask support*/}
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
