import { ControlledTextField, Dialog } from '@/view/ui'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import s from './EditCardForm.module.scss'
import { ReactNode, useState } from 'react'
import { ControlledFileUploader, ControlledSelect } from '@/view/components/shared-controlled'

export type EditCardFormProps = {
  onSubmit: (data: { cardId: string | undefined; formData: FormData }) => void
  inputLabel?: string
  checkboxLabel?: string
  icon?: ReactNode
  cardId: string | undefined
  open: boolean
  onClose: () => void
  questionImg?: string
  answerImg?: string
  question: string
  answer: string
}

type EditDeckFormValues = z.infer<typeof editCardForm>

const editCardForm = z.object({
  cardId: z.string(),
  answer: z.string().min(3, 'Too short deck name. It should be at least 3 symbols').max(100),
  question: z.string().min(3, 'Too short deck name. It should be at least 3 symbols').max(100),
  questionForm: z.string().optional(),
  questionImg: z.any().optional(),
  answerImg: z.any().optional(),
})

export const EditCardForm = ({
  icon,
  onSubmit,
  cardId,
  open,
  onClose,
  answer,
  questionImg,
  answerImg,
  question,
}: EditCardFormProps) => {
  const [questionForm, setQuestionForm] = useState('')
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EditDeckFormValues>({
    resolver: zodResolver(editCardForm),
    defaultValues: {
      cardId: cardId,
      answer: answer,
      question: question,
      questionImg: '',
      answerImg: '',
      questionForm: '',
    },
  })

  const handleFormSubmit = handleSubmit((data: EditDeckFormValues) => {
    const formData = new FormData()
    formData.append('question', data.question)
    formData.append('answer', data.answer)
    formData.append('questionImg', data.questionImg)
    formData.append('answerImg', data.answerImg)
    onSubmit({ cardId, formData })
  })

  return (
    <Dialog
      className={s.dialog}
      title={'Edit Card'}
      acceptBtnText={'Save changes'}
      handleFormSubmit={handleFormSubmit}
      triggerBtnText={''}
      icon={icon}
      open={open}
      onClose={onClose}
      triggerBtnVariant={'icon'}
    >
      <form>
        <div className={s.body}>
          <ControlledSelect
            className={s.bodyItem}
            options={['text', 'image', 'video']}
            name={'questionForm'}
            control={control}
            setQuestionForm={setQuestionForm}
          />
          {questionForm === 'image' ? (
            <div className={s.fileUploadersContainer}>
              {questionImg && <img src={questionImg} alt={'questionImg'} />}
              <ControlledFileUploader
                className={s.bodyItem}
                control={control}
                name={'questionImg'}
                fileInputLabelText={'Change question image'}
              />
              {answerImg && <img src={answerImg} alt={'answerImg'} />}
              <ControlledFileUploader
                className={s.bodyItem}
                control={control}
                name={'answerImg'}
                fileInputLabelText={'Change answer image'}
              />
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>
      </form>
    </Dialog>
  )
}
