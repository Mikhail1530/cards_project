import { Button, Card, ControlledRadioGroup, Typography } from '@/view/ui'
import s from '@/view/modules/decks/components/LearningDeckFormsManager/LearnDeckForm/LearnDeckForm.module.scss'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { AddGradeToCardArgs } from '@/api/services/cards/cards.types'

type LearnDeckFormPropsType = {
  onSubmit: (data: AddGradeToCardArgs) => void
  deckId: string
}

export const LearnDeckForm = ({ onSubmit, deckId }: LearnDeckFormPropsType) => {
  const [openAnswer, setOpenAnswer] = useState(true)

  const handleOpenAnswerModule = () => {
    setOpenAnswer(!openAnswer)
  }

  const { control, handleSubmit } = useForm<{ grade: string }>({
    defaultValues: { grade: '1' },
  })

  const handleFormSubmit = handleSubmit((data: { grade: string }) => {
    const formData = {
      deckId,
      body: { cardId: 'dddddd', grade: Number(data.grade) },
    }
    onSubmit(formData)
  })

  return (
    <form onSubmit={handleFormSubmit}>
      <Card className={s.learnDeckCard}>
        <Typography variant={'h1'}>Learn "packname"</Typography>
        <div className={s.questionAndCaption}>
          <Typography variant={'body1'}>
            <b>Question</b>: question here
          </Typography>
          <Typography variant={'caption'}>Number of attempts: 10</Typography>
        </div>
        <Button onClick={handleOpenAnswerModule}>Show answer</Button>
        {openAnswer && (
          <AnswerAndRatingModule name={'grade'} control={control} submitForm={handleFormSubmit} />
        )}
      </Card>
    </form>
  )
}

const AnswerAndRatingModule = ({ control, name, submitForm }: any) => {
  return (
    <>
      <div className={s.answerHeaders}>
        <Typography variant={'body1'}>
          <b>Answer</b>: answer here
        </Typography>
        <Typography variant={'body1'}>
          <b>Rate yourself</b>:
        </Typography>
      </div>
      <div className={s.answerRadioGroup}>
        <ControlledRadioGroup
          options={[
            { label: 'Did not know', value: '1' },
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
