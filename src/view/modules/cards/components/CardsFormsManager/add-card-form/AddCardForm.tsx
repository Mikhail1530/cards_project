import { ControlledTextField, Dialog } from '@/view/ui'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import s from './AddCardForm.module.scss'
import { ReactNode, useState } from 'react'
import { ControlledSelect } from '@/view/components/shared-controlled/ControlledSelect/ControlledSelect'
import { ControlledFileUploader } from '@/view/components/shared-controlled/ControlledFileUploader/ControlledFileUploader'

export type AddCardFormProps = {
  onSubmit: (data: { deckId: string; formData: FormData }) => void
  inputLabel?: string
  checkboxLabel?: string
  icon?: ReactNode
  // id: string | undefined
  deckId: string
  open: boolean
  onClose: () => void
  questionImg?: string
  answerImg?: string
}

type AddDeckFormValues = z.infer<typeof addCardForm>

const addCardForm = z.object({
  deckId: z.string(),
  questionImg: z.any().optional(),
  answerImg: z.any().optional(),
  question: z.string().min(3, 'Too short question. It should be at least 3 symbols').max(100),
  answer: z.string().min(3, 'Too short answer. It should be at least 3 symbols').max(100),
  questionForm: z.string().optional(),
})

export const AddCardForm = ({
  icon,
  onSubmit,
  deckId,
  open,
  onClose,
  questionImg,
  answerImg,
}: AddCardFormProps) => {
  const [questionForm, setQuestionForm] = useState('')
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddDeckFormValues>({
    resolver: zodResolver(addCardForm),
    defaultValues: {
      deckId: deckId,
      questionImg: '',
      answerImg: '',
      question: '',
      answer: '',
      questionForm: '',
    },
  })

  const handleFormSubmit = handleSubmit((data: AddDeckFormValues) => {
    const formData = new FormData()
    formData.append('question', data.question)
    formData.append('answer', data.answer)
    formData.append('questionImg', data.questionImg)
    formData.append('answerImg', data.answerImg)
    onSubmit({ formData, deckId })
    onClose()
  })

  return (
    <Dialog
      className={s.dialog}
      title={'Add New Card'}
      acceptBtnText={'Add card'}
      handleFormSubmit={handleFormSubmit}
      triggerBtnText={'Add new card'}
      icon={icon}
      open={open}
      onClose={onClose}
    >
      <form>
        <div className={s.body}>
          <ControlledSelect
            className={s.select}
            options={['text', 'image', 'video']}
            name={'questionForm'}
            control={control}
            setQuestionForm={setQuestionForm}
          />
          {questionForm === 'image' ? (
            <div className={s.fileUploadersContainer}>
              <div className={s.questionContainer}>
                {questionImg && <img src={questionImg} alt={'questionImg'} />}
                <ControlledFileUploader
                  className={s.bodyItem}
                  control={control}
                  name={'questionImg'}
                  fileInputLabelText={'Add question picture'}
                />
                <ControlledTextField
                  className={s.bodyItem + ' ' + errors && s.question}
                  control={control}
                  name={'question'}
                  label={'Question'}
                  errorMessage={errors.question?.message}
                />
              </div>
              <div className={s.answerContainer}>
                {answerImg && <img src={answerImg} alt={'answerImg'} />}
                <ControlledFileUploader
                  className={s.bodyItem}
                  control={control}
                  name={'answerImg'}
                  fileInputLabelText={'Add answer picture '}
                />
                <ControlledTextField
                  className={s.bodyItem}
                  control={control}
                  name={'answer'}
                  label={'Answer'}
                  errorMessage={errors.answer?.message}
                />
              </div>
            </div>
          ) : (
            <div className={s.textUploaderContainer}>
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
          )}
        </div>
      </form>
    </Dialog>
  )
}
