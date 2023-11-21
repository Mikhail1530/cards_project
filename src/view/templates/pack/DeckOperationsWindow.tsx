import { ControlledCheckbox, ControlledTextField } from '../../ui'
import s from './DeckOperationsWindow.module.scss'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// type DeckOperationsWindow<T extends ElementType> = {
//   header: string
//   packName: string
//   onSubmit: (data: BodyValues) => void
//   acceptBtnText: string
// } & UseControllerProps &
//   Omit<CardProps<T>, 'value' | 'onChange' | 'ref'>

export type DeckOperationsWindowProps = {
  deckName: string | undefined
  onSubmit: (data: BodyValues) => void
  inputLabel?: string
  checkboxLabel?: string
}

type BodyValues = z.infer<typeof deckOperationsWindowSchema>

const deckOperationsWindowSchema = z.object({
  name: z.string().min(3, 'Too short selectedDeck name').max(25),
  isPrivate: z.boolean().optional(),
})

export const DeckOperationsWindow = ({
  deckName,
  onSubmit,
  inputLabel = 'SelectedDeck name',
  checkboxLabel = 'Private selectedDeck',
}: DeckOperationsWindowProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<BodyValues>({
    resolver: zodResolver(deckOperationsWindowSchema),
    defaultValues: { name: deckName, isPrivate: false },
  })

  const handleFormSubmit = (data: BodyValues) => {
    onSubmit(data)
    console.log(data, 'is data in DeckOperationsWindow handleSubmit')
  }
  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
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
  )
}
