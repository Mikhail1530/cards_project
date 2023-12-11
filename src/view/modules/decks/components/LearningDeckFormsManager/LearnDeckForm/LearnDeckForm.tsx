import { Button, Card, ControlledRadioGroup, Typography } from '@/view/ui'
import s from './LearnDeckForm.module.scss'
import { ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AddGradeToCardArgs } from '@/api/services/cards/cards.types'
import { CardType } from '@/api/services/decks/decks.types'
import { ArrowBack } from '@/view/assets/icons/arrow-back/ArrowBack'
import { useNavigate } from 'react-router-dom'

type LearnDeckFormPropsType = {
  onSubmit: (data: AddGradeToCardArgs) => void
  deckId: string
  deckName: string
  card: CardType
  setPreviousCardId: (cardId: string) => void
}

export const LearnDeckForm = ({
  onSubmit,
  deckId,
  deckName,
  card,
  setPreviousCardId,
}: LearnDeckFormPropsType) => {
  const navigate = useNavigate()
  const [openAnswer, setOpenAnswer] = useState(false)

  const handleOpenAnswerModule = (e: ChangeEvent) => {
    e.preventDefault()
    setOpenAnswer(!openAnswer)
  }

  const { control, handleSubmit } = useForm<{ grade: string }>({
    defaultValues: { grade: '1' },
  })

  const handleFormSubmit = handleSubmit((data: { grade: string }) => {
    const formData = {
      deckId,
      body: { cardId: card.id, grade: Number(data.grade) },
    }
    setPreviousCardId(card.id)
    onSubmit(formData)
  })

  return (
    <form onSubmit={handleFormSubmit}>
      <Card className={s.learnDeckCard}>
        <Button className={s.backBtn} onClick={() => navigate(`/decks/${deckId}`)} variant={'icon'}>
          <ArrowBack />
          <Typography>Back to Deck</Typography>
        </Button>
        <Typography variant={'h1'}>Learn {deckName}</Typography>
        <div className={s.questionAndCaption}>
          <Typography variant={'body1'}>
            <b>Question</b>: {card.question}
          </Typography>
          <Typography variant={'caption'}>Number of attempts: {card.shots}</Typography>
        </div>
        <Button onClick={handleOpenAnswerModule}>Show answer</Button>
        {openAnswer && (
          <AnswerAndRatingModule
            name={'grade'}
            control={control}
            submitForm={handleFormSubmit}
            answer={card.answer}
          />
        )}
      </Card>
    </form>
  )
}

const AnswerAndRatingModule = ({ control, name, submitForm, answer }: any) => {
  return (
    <>
      <div className={s.answerHeaders}>
        <Typography variant={'body1'}>
          <b>Answer</b>: {answer}
        </Typography>
        <Typography variant={'body1'}>
          <b>Rate yourself</b>:
        </Typography>
      </div>
      <div className={s.answerRadioGroup}>
        <ControlledRadioGroup
          options={[
            { label: 'Did not know', value: '1', checked: true },
            { label: 'Forgot', value: '2' },
            { label: 'Difficult', value: '3' },
            { label: 'Good', value: '4' },
            { label: 'Easy', value: '5' },
          ]}
          name={name}
          control={control}
        />
      </div>
      <Button onClick={submitForm}>Next question</Button>
    </>
  )
}
