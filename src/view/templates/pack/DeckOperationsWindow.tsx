import { Card } from '@/view/ui/Card'
import { Button, ControlledCheckbox, ControlledTextField, Typography } from '../../ui'
import s from './DeckOperationsWindow.module.scss'
import { Close } from '@/view/assets'
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
  header: string
  deckName: string
  onSubmit: (data: BodyValues) => void
  acceptBtnText: string
  inputLabel?: string
  checkboxLabel?: string
}

type BodyValues = z.infer<typeof deckOperationsWindowSchema>

const deckOperationsWindowSchema = z.object({
  name: z.string().min(3, 'Too short deck name').max(25),
  isPrivate: z.boolean().optional(),
})

export const DeckOperationsWindow = ({
  header,
  deckName,
  onSubmit,
  acceptBtnText,
  inputLabel = 'Deck name',
  checkboxLabel = 'Private deck',
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
      <Card className={s.packContainer}>
        <div className={s.header}>
          <Typography variant={'h2'}>{header}</Typography>
          <Button fullWidth={false} variant={'icon'}>
            <Close />
          </Button>
        </div>
        <hr />
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
        <div className={s.footerBtns}>
          <Button variant={'secondary'} fullWidth={false}>
            Cancel
          </Button>
          <Button fullWidth={false}>{acceptBtnText}</Button>
        </div>
      </Card>
    </form>
  )
}
