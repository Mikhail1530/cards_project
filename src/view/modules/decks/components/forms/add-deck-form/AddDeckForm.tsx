import { ControlledCheckbox, ControlledTextField, Dialog } from '@/view/ui'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import s from './AddDeckForm.module.scss'
import { ReactNode } from 'react'

export type AddDeckProps = {
  deckName: string | undefined
  onSubmit: (data: AddDeckFormValues) => void
  inputLabel?: string
  checkboxLabel?: string
  icon?: ReactNode
}

type AddDeckFormValues = z.infer<typeof addDeckForm>

const addDeckForm = z.object({
  name: z.string().min(3, 'Too short deck name').max(25),
  isPrivate: z.boolean().optional(),
})

export const AddDeck = ({
  icon,
  deckName,
  onSubmit,
  inputLabel = 'SelectedDeck name',
  checkboxLabel = 'Private deck',
}: AddDeckProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddDeckFormValues>({
    resolver: zodResolver(addDeckForm),
    defaultValues: { name: deckName, isPrivate: false },
  })

  const handleFormSubmit = handleSubmit((data: AddDeckFormValues) => {
    onSubmit(data)

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
    >
      <div className={s.invisible} />
      <hr /> {/*FIXME: ask support*/}
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
