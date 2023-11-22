import { Button, Typography } from '@/view/ui'
import s from './ShowNoCards.module.scss'
import { AddCardForm } from '@/view/modules/selectedDeck/components/forms/add-card-form/AddCardForm'
import { ArrowBack } from '@/view/assets/icons/arrow-back/ArrowBack'
import { NavigateFunction } from 'react-router-dom'

type ShowNoCardsType = {
  deckName?: string
  id: string | undefined
  navigate: NavigateFunction
  createNewCard: (data: { formData: FormData; id: string | undefined }) => void
}

export const ShowNoCards = ({ id, navigate, createNewCard, deckName }: ShowNoCardsType) => {
  return (
    <>
      <div className={s.header}>
        <Button className={s.backBtn} onClick={() => navigate(-1)} variant={'icon'}>
          <ArrowBack />
          <Typography>Back to Decks List</Typography>
        </Button>
        <Typography variant={'large'}>{deckName}</Typography>
      </div>
      <div className={s.body}>
        <Typography variant={'body1'} className={s.bodyTypography}>
          This pack is empty. Click add new card to fill this pack
        </Typography>
        <AddCardForm id={id} onSubmit={createNewCard} />
      </div>
    </>
  )
}
