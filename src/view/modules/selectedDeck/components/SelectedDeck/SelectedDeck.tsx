import { useState } from 'react'
import { useGetCardsInDeckQuery, useGetDeckByIdQuery } from '@/view/services/decks/decks.service'
import { Button, Pagination, Card, Typography } from '@/view/ui'
import { useMatch, useNavigate } from 'react-router-dom'
import { SelectedDeckTable } from '@/view/modules/selectedDeck/components/SelectedDeck/SelectedDeckTable/SelectedDeckTable'
import { ShowNoCards } from '@/view/modules/selectedDeck/helpers/showNoCards/ShowNoCards'
import {
  useCreateCardMutation,
  useDeleteCardMutation,
  useUpdateCardMutation,
} from '@/view/services/cards/cards.service'
import { AddCardForm } from '@/view/modules/selectedDeck/components/forms/add-card-form/AddCardForm'
import s from './SelectedDeck.module.scss'
import { ArrowBack } from '@/view/assets/icons/arrow-back/ArrowBack'
import { CardType } from '@/view/services/decks/decks.types'
import { EditCardForm } from '@/view/modules/selectedDeck/components/forms/edit-card-form/EditCardForm'
import { DeleteCardForm } from '@/view/modules/selectedDeck/components/forms/delete-card-form/DeleteCardForm'

export type SelectedCardStatusOptions = 'edit' | 'delete'
export type CardModalType = {
  key: SelectedCardStatusOptions
  value: CardType
} | null

export const SelectedDeck = () => {
  const [card, setCard] = useState<CardModalType>()
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const navigate = useNavigate()
  const match = useMatch('/decks/:id/learn')

  const {
    data: cards,
    isLoading,
    isFetching,
    error,
  } = useGetCardsInDeckQuery({
    id: match?.params.id,
    currentPage: currentPage,
    itemsPerPage: itemsPerPage,
  })
  const [createNewCard] = useCreateCardMutation()
  const deck = useGetDeckByIdQuery({ id: match?.params.id })
  console.log(deck)
  const [updateCard] = useUpdateCardMutation()
  const [deleteCard] = useDeleteCardMutation()

  if (isLoading || isFetching) {
    return <div>loading...</div>
  }
  if (error) {
    if ('status' in error) {
      const errMsg = 'error' in error ? error.error : JSON.stringify(error.data)
      return (
        <>
          <Typography>An error has occurred:</Typography>
          <Typography>{errMsg}</Typography>
        </>
      )
    } else {
      return <div>{error.message}</div>
    }
  }

  const handleSetItemsPerPage = (numOfItemsPerPage: number) => {
    setItemsPerPage(numOfItemsPerPage)
  }

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const selectOptionsOfDecksToDisplay = ['10', '20', '30', '50', '100']

  if (!cards) {
    return null // FIXME ask how to handle this properly
  }

  return (
    <Card className={s.card}>
      {cards.items.length < 1 ? (
        <ShowNoCards
          id={match?.params.id}
          createNewCard={createNewCard}
          deckName={deck.data?.name}
          navigate={navigate}
        />
      ) : (
        <>
          <div className={s.header}>
            <Button className={s.backBtn} onClick={() => navigate(-1)} variant={'icon'}>
              <ArrowBack />
              <Typography>Back to Decks List</Typography>
            </Button>
            <div className={s.deckNameWithBtn}>
              <Typography variant={'large'}>{deck.data?.name}</Typography>
              <AddCardForm id={match?.params.id} onSubmit={createNewCard} />
            </div>
          </div>
          <SelectedDeckTable selectedDeckTableData={cards?.items} setCard={setCard} />
        </>
      )}
      {card?.key === 'edit' ? (
        <EditCardForm
          id={card.value.id}
          open={!!card}
          onSubmit={updateCard}
          onClose={() => setCard(null)}
        />
      ) : card?.key === 'delete' ? (
        <DeleteCardForm
          cardQuestion={card.value.question}
          id={card.value.id}
          onClose={() => setCard(null)}
          onSubmit={deleteCard}
          open
        />
      ) : null}

      <Pagination
        currentPage={currentPage}
        totalCount={cards.pagination.totalItems}
        totalPages={cards.pagination.totalPages}
        handlePageChange={handlePageChange}
        handleSetItemsPerPage={handleSetItemsPerPage}
        itemsPerPage={cards.pagination.itemsPerPage}
        selectOptions={selectOptionsOfDecksToDisplay}
      />
    </Card>
  )
}
