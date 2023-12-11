import { GetDecksResponseItem as DeckType } from '@/api/services/decks/decks.types'
import { LearnDeckForm } from '@/view/modules/decks'
import {
  useAddGradeToCardMutation,
  useGetRandomCardQuery,
} from '@/api/services/cards/cards.service'
import { useGetDeckByIdQuery } from '@/api/services/decks/decks.service'
import { useParams } from 'react-router-dom'
import { Error } from '@/view/assets/components/Error/Error'
import { useState } from 'react'

type LearningDeckFormsManagerPropsType = {
  type: 'LEARN'
  deck?: DeckType
}

export const LearningDeckFormsManager = ({ type }: LearningDeckFormsManagerPropsType) => {
  const [previousCardId, setPreviousCardId] = useState<string>('')
  const params = useParams()
  if (!params.id) return <Error>Oops! Something went wrong, there are no such deck anymore</Error>
  const [addGradeToCard] = useAddGradeToCardMutation()
  const { data: deck, error } = useGetDeckByIdQuery({ id: params.id })
  const { data: card } = useGetRandomCardQuery({ deckId: params.id, previousCardId })

  if (!deck || !card) {
    return <Error error={error} />
  }

  let formComponent
  switch (type) {
    case 'LEARN': {
      formComponent = (
        <LearnDeckForm
          onSubmit={addGradeToCard}
          deckId={deck?.id}
          deckName={deck?.name}
          card={card}
          setPreviousCardId={setPreviousCardId}
        />
      )
      break
    }
  }

  return formComponent
}
