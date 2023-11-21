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
}

type EditDeckFormValues = z.infer<typeof editCardForm>

const editCardForm = z.object({
  id: z.string(),
  questionImg: z.string().optional(),
  question: z.string().min(3, 'Too short question').max(25),
  answer: z.string().min(3, 'Too short answer').max(100),
})

export const EditCardForm = ({ icon, onSubmit, id }: EditCardFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EditDeckFormValues>({
    resolver: zodResolver(editCardForm),
    defaultValues: { id: id, questionImg: '', question: '', answer: '' },
  })

  const handleFormSubmit = handleSubmit((data: EditDeckFormValues) => {
    const formData = new FormData()
    // formData.append('questionImg', JSON.stringify(data.questionImg))
    formData.append('question', data.question)
    formData.append('answer', data.answer)
    // Object.entries(data).forEach(([key, value]) => formData.append(key, JSON.stringify(value)))
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
    >
      <div className={s.invisible} />
      <hr /> {/*FIXME: ask support*/}
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
