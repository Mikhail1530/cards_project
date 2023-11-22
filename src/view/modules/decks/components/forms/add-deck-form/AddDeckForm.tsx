import { ControlledCheckbox, ControlledTextField, Dialog } from '@/view/ui'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import s from './AddDeckForm.module.scss'
import { ReactNode } from 'react'

export type AddDeckProps = {
  onSubmit: (data: AddDeckFormValues) => void
  icon?: ReactNode
  // open: boolean
  // onClose: () => void
}

type AddDeckFormValues = z.infer<typeof addDeckForm>

const addDeckForm = z.object({
  name: z.string().min(3, 'Too short selectedDeck name').max(25),
  isPrivate: z.boolean().optional(),
})

export const AddDeck = ({ icon, onSubmit }: AddDeckProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddDeckFormValues>({
    resolver: zodResolver(addDeckForm),
    defaultValues: { name: '', isPrivate: false },
  })

  const handleFormSubmit = handleSubmit((data: AddDeckFormValues) => {
    onSubmit(data)
    // onClose()
    console.log(data, 'is data in DeckOperationsWindow handleSubmit')
  })

  return (
    <Dialog
      className={s.dialog}
      title={'Add New Deck'}
      acceptBtnText={'Add deck'}
      handleFormSubmit={handleFormSubmit}
      triggerBtnText={'Add new deck'}
      icon={icon}
      // open={open}
      // onClose={onClose}
    >
      <form>
        <div className={s.body}>
          <ControlledTextField
            className={s.bodyItem}
            control={control}
            name={'name'}
            label={'Deck name'}
            errorMessage={errors.name?.message}
          />
          <ControlledCheckbox control={control} name={'isPrivate'} label={'Private deck'} />
        </div>
      </form>
    </Dialog>
  )
}
