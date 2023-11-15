import { DeckOperationsWindow } from '@/view/templates/pack/DeckOperationsWindow'
import { useCreateDeckMutation } from '@/view/services/decks/decks.service'

type AddDeck = {
  deckName?: string
}

export const AddDeck = ({ deckName }: AddDeck) => {
  const [createDeck] = useCreateDeckMutation() // first parameter is function we use to make a fetch. Second is the response from server if mutation was successful

  return (
    <DeckOperationsWindow
      header={'Add New Deck'}
      acceptBtnText={'Add New Deck'}
      onSubmit={createDeck}
      deckName={deckName}
    />
  )
}
