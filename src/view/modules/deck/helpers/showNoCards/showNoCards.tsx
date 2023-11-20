import { Button, Card, Typography } from '@/view/ui'
import { ArrowBack } from '@/view/assets/icons/arrow-back/ArrowBack'
import { NavigateFunction } from 'react-router-dom'
import s from './showNoCards.module.scss'
import { AddCardForm } from '@/view/modules/deck/components/forms/add-card-form/AddCardForm'

export const showNoCards = (navigate: NavigateFunction, createNewCard, deckName, id) => {
  return (
    <Card className={s.card}>
      <div className={s.backButton}>
        <Button onClick={() => navigate(-1)} variant={'icon'}>
          <ArrowBack />
          <Typography>Back to Decks List</Typography>
        </Button>
      </div>
      <div className={s.caption}>
        <Typography variant={'large'}>{deckName}</Typography>
      </div>
      <div className={s.body}>
        <Typography variant={'body1'} className={s.bodyTypography}>
          This pack is empty. Click add new card to fill this pack
        </Typography>
        {/*{className={s.bodyButton}}*/}
        <AddCardForm id={id} onSubmit={createNewCard} />
      </div>
    </Card>
  )
}
