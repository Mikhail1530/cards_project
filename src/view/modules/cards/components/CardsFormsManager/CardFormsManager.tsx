import { useState } from 'react'
import { Bin, EditPencil } from '@/view/assets'
import { CardType } from '@/api/services/decks/decks.types'
import { AddCardForm } from '@/view/modules/cards/components/CardsFormsManager/add-card-form/AddCardForm'
import {
  useCreateCardMutation,
  useDeleteCardMutation,
  useUpdateCardMutation,
} from '@/api/services/cards/cards.service'
import { EditCardForm } from '@/view/modules/cards/components/CardsFormsManager/edit-card-form/EditCardForm'
import { DeleteCardForm } from '@/view/modules/cards/components/CardsFormsManager/delete-card-form/DeleteCardForm'

type CardFormsManagerPropsType = {
  type: 'ADD' | 'EDIT' | 'DELETE'
  card?: CardType
  deckId?: string
}

export const CardFormsManager = ({ type, card, deckId }: CardFormsManagerPropsType) => {
  const [createNewCard] = useCreateCardMutation()
  const [handleCardEdit] = useUpdateCardMutation()
  const [handleCardDelete] = useDeleteCardMutation()
  const [open, setOpen] = useState(false)
  //error={error1 || error2 || error3}
  let formComponent
  switch (type) {
    case 'ADD': {
      if (!deckId) throw new Error('No deck id provided to form! ')
      formComponent = (
        <AddCardForm
          onSubmit={createNewCard}
          deckId={deckId}
          open={open}
          onClose={() => setOpen(!open)}
        />
      )
      break
    }
    case 'EDIT': {
      if (!card) throw new Error('No necessary data provided to form!')
      console.log(card, 'card')
      formComponent = (
        <EditCardForm
          question={card.question}
          answer={card?.answer}
          cardId={card.id}
          questionImg={card?.questionImg}
          answerImg={card?.answerImg}
          open={open}
          onClose={() => setOpen(!open)}
          onSubmit={handleCardEdit}
          icon={<EditPencil />}
        />
      )
      break
    }
    case 'DELETE': {
      if (!card) throw new Error('No deck provided to form!')

      formComponent = (
        <DeleteCardForm
          icon={<Bin />}
          cardId={card.id}
          open={open}
          onClose={() => setOpen(!open)}
          onSubmit={handleCardDelete}
          cardQuestion={card.question}
        />
      )
      break
    }
  }
  return formComponent
}
