import { ControlledCheckbox, ControlledTextField, Dialog } from '@/view/ui'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import s from './EditDeckForm.module.scss'
import { ReactNode } from 'react'

export type EditDeckProps = {
  deckName: string | undefined
  onSubmit: (data: EditDeckFormValues) => void
  inputLabel?: string
  checkboxLabel?: string
  icon?: ReactNode
  open: boolean
  onClose: () => void
  id: string
  isPrivate: boolean
  triggerBtnText?: string
}

type EditDeckFormValues = z.infer<typeof editDeckForm>

const editDeckForm = z.object({
  name: z.string().min(3, 'Too short deck name. It should be at lesst 3 symbols').max(25),
  isPrivate: z.boolean().optional(),
  id: z.string(),
})

export const EditDeckForm = ({
  open,
  id,
  icon,
  deckName,
  onSubmit,
  onClose,
  inputLabel = 'Edit',
  checkboxLabel = 'deck',
  isPrivate,
  triggerBtnText,
}: EditDeckProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EditDeckFormValues>({
    resolver: zodResolver(editDeckForm),
    defaultValues: { name: deckName, isPrivate: isPrivate, id: id },
  })

  const handleFormSubmit = handleSubmit((data: EditDeckFormValues) => {
    onSubmit(data)
    onClose()
    console.log(data, 'is data in EditDeckForm handleSubmit')
  })

  return (
    <Dialog
      className={s.dialog}
      title={'Edit Deck'}
      acceptBtnText={'Save changes'}
      handleFormSubmit={handleFormSubmit}
      triggerBtnText={triggerBtnText ? triggerBtnText : ''}
      open={open}
      icon={icon}
      onClose={onClose}
      triggerBtnVariant={'icon'}
    >
      <div className={s.invisible} />
      <form>
        <div className={s.body}>
          <ControlledTextField
            className={s.bodyItem}
            control={control}
            name={'name'}
            label={inputLabel}
            errorMessage={errors.name?.message}
          />
          <ControlledCheckbox control={control} name={'isPrivate'} label={checkboxLabel} />
        </div>
      </form>
    </Dialog>
  )
}
