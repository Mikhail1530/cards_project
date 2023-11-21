import { useState } from 'react'
import { useGetCardsInDeckQuery } from '@/view/services/decks/decks.service'
import { Button, Pagination, Card, Typography } from '@/view/ui'
import { useMatch, useNavigate } from 'react-router-dom'
import { SelectedDeckTable } from '@/view/modules/selectedDeck/components/selectedDeck/components/SelectedDeck/SelectedDeckTable/SelectedDeckTable'
import { ShowNoCards } from '@/view/modules/selectedDeck/helpers/showNoCards/ShowNoCards'
import { useCreateCardMutation, useUpdateCardMutation } from '@/view/services/cards/cards.service'
import { AddCardForm } from '@/view/modules/selectedDeck/components/forms/add-card-form/AddCardForm'
import s from './SelectedDeck.module.scss'
import { ArrowBack } from '@/view/assets/icons/arrow-back/ArrowBack'
import { CardType } from '@/view/services/decks/decks.types'
import { EditCardForm } from '@/view/modules/selectedDeck/components/forms/edit-card-form/EditCardForm'

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
  const [updateCard] = useUpdateCardMutation()

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
        <ShowNoCards id={match?.params.id} createNewCard={createNewCard} navigate={navigate} />
      ) : (
        <>
          <div className={s.header}>
            <Button className={s.backBtn} onClick={() => navigate(-1)} variant={'icon'}>
              <ArrowBack />
              <Typography>Back to Decks List</Typography>
            </Button>
            <div className={s.deckNameWithBtn}>
              <Typography variant={'large'}>{'hardcodedSelectedDEckName'}</Typography>
              <AddCardForm id={match?.params.id} onSubmit={createNewCard} />
            </div>
          </div>
          <SelectedDeckTable selectedDeckTableData={cards?.items} setCard={setCard} />
        </>
      )}
      {card?.key === 'edit' && (
        <EditCardForm
          id={card.value.id}
          open={!!card}
          onSubmit={updateCard}
          onClose={() => setCard(null)}
        />
      )}
      {card?.key === 'delete' && <div>DELETE CARD</div>}

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
