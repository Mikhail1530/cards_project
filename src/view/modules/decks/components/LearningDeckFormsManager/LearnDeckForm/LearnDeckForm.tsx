import { Button, Card, ControlledRadioGroup, Typography } from '@/view/ui'
import s from './LearnDeckForm.module.scss'
import { ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AddGradeToCardArgs } from '@/api/services/cards/cards.types'
import { CardType } from '@/api/services/decks/decks.types'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loading } from '@/view/assets'

type LearnDeckFormPropsType = {
  onSubmit: (data: AddGradeToCardArgs) => void
  deckId: string
  deckName: string
  card: CardType
  isCardGradeLoading: boolean
  isSuccess: boolean
}

type LearnDeckFromValues = z.infer<typeof learnDeckForm>

const learnDeckForm = z.object({
  grade: z.string().min(1, 'Rating is required'),
})

export const LearnDeckForm = ({
  onSubmit,
  deckId,
  deckName,
  card,
  isCardGradeLoading,
}: LearnDeckFormPropsType) => {
  const [openAnswer, setOpenAnswer] = useState(false)

  const handleOpenAnswerModule = (e: ChangeEvent) => {
    e.preventDefault()
    setOpenAnswer(!openAnswer)
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LearnDeckFromValues>({
    resolver: zodResolver(learnDeckForm),
    defaultValues: { grade: '' },
  })

  const handleFormSubmit = handleSubmit(async (data: { grade: string }) => {
    const formData = {
      deckId,
      body: { cardId: card.id, grade: Number(data.grade) },
    }
    onSubmit(formData)
    setOpenAnswer(false)
  })

  return (
    <form onSubmit={handleFormSubmit}>
      <Card className={s.learnDeckCard}>
        <Typography variant={'h1'}>Learn {deckName}</Typography>
        {isCardGradeLoading ? (
          <Loading />
        ) : (
          <div className={s.questionAndCaption}>
            <Typography variant={'body1'}>
              <b>Question</b>: {card.question}
            </Typography>
            {card.questionImg && <img src={card.questionImg} alt={'question image'} />}
            <Typography variant={'body2'}>Number of attempts: {card.shots}</Typography>
          </div>
        )}
        <Button onClick={handleOpenAnswerModule}>Show answer</Button>
        {openAnswer && (
          <AnswerAndRatingModule
            answerImg={card.answerImg}
            name={'grade'}
            control={control}
            submitForm={handleFormSubmit}
            answer={card.answer}
            errors={errors}
          />
        )}
      </Card>
    </form>
  )
}

const AnswerAndRatingModule = ({ control, name, submitForm, answer, answerImg, errors }: any) => {
  return (
    <>
      <div className={s.answerHeaders}>
        <Typography variant={'body1'}>
          <b>Answer</b>: {answer}
        </Typography>
        {answerImg && <img src={answerImg} alt={'Answer image'} />}
        <Typography variant={'body1'}>
          <b>Rate yourself</b>:
        </Typography>
      </div>
      <div className={s.answerRadioGroup}>
        <ControlledRadioGroup
          options={[
            { label: 'Did not know', value: '1', checked: true },
            { label: 'Forgot', value: '2', checked: false },
            { label: 'Difficult', value: '3', checked: false },
            { label: 'Good', value: '4', checked: false },
            { label: 'Easy', value: '5', checked: false },
          ]}
          name={name}
          control={control}
          errorMessage={errors.grade?.message}
        />
      </div>
      <Button onClick={submitForm}>Next question</Button>
    </>
  )
}
