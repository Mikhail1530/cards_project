import { GetDecksResponseItem as DeckType } from '@/view/services/decks/decks.types'
import { useDeleteDeckMutation } from '@/view/services/decks/decks.service'
import { useState } from 'react'
import { Bin } from '@/view/assets'
import { DeleteDeckForm } from '@/view/modules/decks/components/forms/delete-deck-form/DeleteDeckForm'

type DeleteDeckManagerPropsType = {
  deck: DeckType
}

export const DeleteDeckManager = ({ deck }: DeleteDeckManagerPropsType) => {
  const [deleteDeck] = useDeleteDeckMutation() // in post,delete,patch we do not provide args since we retrieve a function which accepts all the params
  const [open, setOpen] = useState(false)

  return (
    <DeleteDeckForm
      icon={<Bin />}
      id={deck.id}
      open={open}
      //onClick={() => setOpen(true)}
      onClose={() => setOpen(!open)}
      deckName={deck.name}
      onSubmit={deleteDeck}
    />
  )
}
