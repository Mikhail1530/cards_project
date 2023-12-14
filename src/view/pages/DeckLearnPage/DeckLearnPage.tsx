import { LearningDeckFormsManager } from '@/view/modules/decks'
import { Button, Page, Typography } from '@/view/ui'
import s from './DeckLearnPage.module.scss'
import { Header } from '@/view/modules'
import { ArrowBack } from '@/view/assets/icons/arrow-back/ArrowBack'
import { useMatch, useNavigate } from 'react-router-dom'

export const DeckLearnPage = () => {
  const navigate = useNavigate()
  const deckId = useMatch('decks/:deckId/learn')

  return (
    <>
      <Header />
      <Button
        className={s.backBtn}
        onClick={() => navigate(`/decks/${deckId?.params.deckId}`)}
        variant={'icon'}
      >
        <ArrowBack />
        <Typography>Back to Deck</Typography>
      </Button>
      <Page>
        <LearningDeckFormsManager type={'LEARN'} />
      </Page>
    </>
  )
}
