import { ControlledTextField, Dialog } from '@/view/ui'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import s from './EditCardForm.module.scss'
import { ReactNode } from 'react'

export type EditCardFormProps = {
  onSubmit: (data: { formData: FormData; id: string | undefined }) => void
  inputLabel?: string
  checkboxLabel?: string
  icon?: ReactNode
  id: string | undefined
  open: boolean
  onClose: () => void
}

type EditDeckFormValues = z.infer<typeof editCardForm>

const editCardForm = z.object({
  id: z.string(),
  answer: z.string().min(3, 'Too short selectedDeck name').max(25),
  question: z.string().min(3, 'Too short selectedDeck name').max(25),
  questionImg: z.string().optional(),
})

export const EditCardForm = ({ icon, onSubmit, id, open, onClose }: EditCardFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EditDeckFormValues>({
    resolver: zodResolver(editCardForm),
    defaultValues: { id: id, answer: '', question: '' },
  })

  const handleFormSubmit = handleSubmit((data: EditDeckFormValues) => {
    const formData = new FormData()
    formData.append('question', data.question)
    formData.append('answer', data.answer)
    onSubmit({ formData, id })
    console.log(data, 'is data in DeckOperationsWindow handleSubmit')
  })

  return (
    <Dialog
      className={s.dialog}
      title={'Edit Card'}
      acceptBtnText={'Save changes'}
      handleFormSubmit={handleFormSubmit}
      triggerBtnText={'Save changes'}
      icon={icon}
      open={open}
      onClose={onClose}
    >
      <div className={s.invisible} />
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
