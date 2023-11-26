import { ControlledTextField, Dialog } from '@/view/ui'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import s from './EditCardForm.module.scss'
import { ChangeEvent, ReactNode, useState } from 'react'
import { ControlledSelect } from '@/view/components/shared-controlled/ControlledSelect/ControlledSelect'
import { ControlledFileUploader } from '@/view/components/shared-controlled/ControlledTextField/ControlledTextField'

export type EditCardFormProps = {
  onSubmit: (data: { cardId: string | undefined; formData: FormData }) => void
  inputLabel?: string
  checkboxLabel?: string
  icon?: ReactNode
  cardId: string | undefined
  open: boolean
  onClose: () => void
  question: string
  answer: string
}

type EditDeckFormValues = z.infer<typeof editCardForm>

const editCardForm = z.object({
  cardId: z.string(),
  answer: z.string().min(3, 'Too short _selectedDeck name').max(100),
  question: z.string().min(3, 'Too short _selectedDeck name').max(100),
  questionForm: z.string().optional(),
  questionImg: z.string().optional(),
})

export const EditCardForm = ({
  icon,
  onSubmit,
  cardId,
  open,
  onClose,
  answer,
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
      questionForm: '',
    },
  })

  const handleFormSubmit = handleSubmit((data: EditDeckFormValues) => {
    const formData = new FormData()
    formData.append('question', data.question)
    formData.append('answer', data.answer)
    if (data.questionImg) formData.append('questionImg', data.questionImg)
    onSubmit({ cardId, formData })
    console.log(data, 'is data in DeckOperationsWindow handleSubmit')
  })

  const selector = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value)
  }

  console.log(questionForm)

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
        {/*<select onChange={selector}>*/}
        {/*  <option value="volvo">Volvo</option>*/}
        {/*  <option value="saab">Saab</option>*/}
        {/*  <option value="mercedes">Mercedes</option>*/}
        {/*  <option value="audi">Audi</option>*/}
        {/*</select>*/}
        <div className={s.body}>
          <ControlledSelect
            options={['text', 'image', 'video']}
            name={'questionForm'}
            control={control}
            setQuestionForm={setQuestionForm}
          />
          {questionForm === 'image' ? (
            <ControlledFileUploader control={control} name={'questionImg'} />
          ) : (
            <>
              {' '}
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
          {/*<ControlledTextField*/}
          {/*  className={s.bodyItem}*/}
          {/*  control={control}*/}
          {/*  name={'questionImg'}*/}
          {/*  label={'Choose a question format'}*/}
          {/*  errorMessage={errors.questionImg?.message}*/}
          {/*/>*/}
          {/*<ControlledTextField*/}
          {/*  className={s.bodyItem}*/}
          {/*  control={control}*/}
          {/*  name={'question'}*/}
          {/*  label={'Question'}*/}
          {/*  errorMessage={errors.question?.message}*/}
          {/*/>*/}
          {/*<ControlledTextField*/}
          {/*  className={s.bodyItem}*/}
          {/*  control={control}*/}
          {/*  name={'answer'}*/}
          {/*  label={'Answer'}*/}
          {/*  errorMessage={errors.answer?.message}*/}
          {/*/>*/}
        </div>
      </form>
    </Dialog>
  )
}
