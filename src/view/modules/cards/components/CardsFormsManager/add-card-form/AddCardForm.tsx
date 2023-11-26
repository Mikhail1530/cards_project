import { ControlledTextField, Dialog } from '@/view/ui'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import s from './AddCardForm.module.scss'
import { ReactNode } from 'react'

export type AddCardFormProps = {
  onSubmit: (data: { deckId: string; formData: FormData }) => void
  inputLabel?: string
  checkboxLabel?: string
  icon?: ReactNode
  // id: string | undefined
  deckId: string
  open: boolean
  onClose: () => void
}

type AddDeckFormValues = z.infer<typeof addCardForm>

const addCardForm = z.object({
  deckId: z.string(),
  questionImg: z.string().optional(),
  question: z.string().min(3, 'Too short question').max(100),
  answer: z.string().min(3, 'Too short answer').max(100),
})

export const AddCardForm = ({ icon, onSubmit, deckId, open, onClose }: AddCardFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddDeckFormValues>({
    resolver: zodResolver(addCardForm),
    defaultValues: { deckId: deckId, questionImg: '', question: '', answer: '' },
  })

  const handleFormSubmit = handleSubmit((data: AddDeckFormValues) => {
    const formData = new FormData()
    // formData.append('questionImg', JSON.stringify(data.questionImg))
    formData.append('question', data.question)
    formData.append('answer', data.answer)
    // Object.entries(data).forEach(([key, value]) => formData.append(key, JSON.stringify(value)))
    onSubmit({ formData, deckId })
    onClose()
    console.log(data, 'is data in DeckOperationsWindow handleSubmit')
  })

  return (
    <Dialog
      className={s.dialog}
      title={'Add New CardType'}
      acceptBtnText={'Add card'}
      handleFormSubmit={handleFormSubmit}
      triggerBtnText={'Add new card'}
      icon={icon}
      open={open}
      onClose={onClose}
    >
      <form>
        <div className={s.body}>
          <ControlledTextField
            className={s.bodyItem}
            control={control}
            name={'questionImg'}
            label={'Choose a question format'}
            errorMessage={errors.questionImg?.message}
          />
          <ControlledTextField
            className={s.bodyItem}
            control={control}
            name={'question'}
            label={'Question'}
            errorMessage={errors.question?.message}
          />
          <ControlledTextField
            className={s.bodyItem}
            control={control}
            name={'answer'}
            label={'Answer'}
            errorMessage={errors.answer?.message}
          />
        </div>
      </form>
    </Dialog>
  )
}
