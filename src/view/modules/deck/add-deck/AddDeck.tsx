import { ControlledCheckbox, ControlledTextField, Dialog } from '@/view/ui'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import s from './AddDeck.module.scss'
import { Close, EditPencil } from '@/view/assets'

export type AddDeckProps = {
  deckName: string | undefined
  onSubmit: (data: AddDeckFormValues) => void
  inputLabel?: string
  checkboxLabel?: string
}

type AddDeckFormValues = z.infer<typeof addDeck>

const addDeck = z.object({
  name: z.string().min(3, 'Too short deck name').max(25),
  isPrivate: z.boolean().optional(),
})

export const AddDeck = ({
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
    resolver: zodResolver(addDeck),
    defaultValues: { name: deckName, isPrivate: false },
  })

  const handleFormSubmit = handleSubmit((data: AddDeckFormValues) => {
    onSubmit(data)

    console.log(data, 'is data in DeckOperationsWindow handleSubmit')
  })

  return (
    <Dialog
      className={s.dialog}
      title={'Add New SelectedDeck'}
      acceptBtnText={'Add New SelectedDeck'}
      handleFormSubmit={handleFormSubmit}
      triggerBtnText={'Add new deck'}
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
