import { Button, Typography } from '@/view/ui'
import s from './ShowNoCards.module.scss'
import { ArrowBack } from '@/view/assets/icons/arrow-back/ArrowBack'
import { NavigateFunction } from 'react-router-dom'
import { CardFormsManager } from '@/view/modules/cards/components/CardsFormsManager/CardFormsManager'

type ShowNoCardsType = {
  deckName?: string
  deckId: string | undefined
  navigate: NavigateFunction
  cover: string
}

export const ShowNoCards = ({ deckId, navigate, deckName, cover }: ShowNoCardsType) => {
  return (
    <>
      <div className={s.header}>
        <Button className={s.backBtn} onClick={() => navigate(-1)} variant={'icon'}>
          <ArrowBack />
          <Typography>Back to Decks List</Typography>
        </Button>
        <Typography variant={'large'}>{deckName}</Typography>
        {cover && <img src={cover} alt={'Deck cover'} />}
      </div>
      <div className={s.body}>
        <Typography variant={'body1'} className={s.bodyTypography}>
          This pack is empty. Click add new card to fill this pack
        </Typography>
        <CardFormsManager deckId={deckId} type={'ADD'} />
      </div>
    </>
  )
}
