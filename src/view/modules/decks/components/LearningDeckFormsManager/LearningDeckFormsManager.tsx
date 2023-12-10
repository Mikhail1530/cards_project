import { GetDecksResponseItem as DeckType } from '@/api/services/decks/decks.types'
import { LearnDeckForm } from '@/view/modules/decks'
import { useAddGradeToCardMutation } from '@/api/services/cards/cards.service'
import { useGetDeckByIdQuery } from '@/api/services/decks/decks.service'
import { useParams } from 'react-router-dom'
import { Error } from '@/view/assets/components/Error/Error'

type LearningDeckFormsManagerPropsType = {
  type: 'LEARN'
  deck?: DeckType
}

export const LearningDeckFormsManager = ({ type }: LearningDeckFormsManagerPropsType) => {
  const params = useParams()
  const [addGradeToCard] = useAddGradeToCardMutation()
  const { data: deck, error } = useGetDeckByIdQuery({ id: params.id })

  if (!deck) {
    return <Error error={error} />
  }

  let formComponent
  switch (type) {
    case 'LEARN': {
      formComponent = <LearnDeckForm onSubmit={addGradeToCard} deckId={deck?.id} />
      break
    }
  }

  return formComponent
}
