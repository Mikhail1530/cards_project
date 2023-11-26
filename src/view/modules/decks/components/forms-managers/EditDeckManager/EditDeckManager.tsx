import { GetDecksResponseItem as DeckType } from '@/view/services/decks/decks.types'
import { useUpdateDeckMutation } from '@/view/services/decks/decks.service'
import { useState } from 'react'
import { EditDeck } from '@/view/modules/decks/components/forms/edit-deck-form/EditDeckForm'
import { EditPencil } from '@/view/assets'

type EditDeckManagerPropsType = {
  deck: DeckType
}

export const EditDeckManager = ({ deck }: EditDeckManagerPropsType) => {
  const [handleDeckEdit] = useUpdateDeckMutation()
  const [open, setOpen] = useState(false)
  return (
    <EditDeck
      icon={<EditPencil />}
      id={deck.id}
      open={open}
      onClose={() => setOpen(!open)}
      deckName={'editDeck'}
      onSubmit={handleDeckEdit}
    />
  )
}
