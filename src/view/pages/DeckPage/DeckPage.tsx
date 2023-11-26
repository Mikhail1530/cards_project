import { useState } from 'react'
import { useGetCardsInDeckQuery, useGetDeckByIdQuery } from '@/view/services/decks/decks.service'
import { Button, Card, Pagination, Typography } from '@/view/ui'
import { useMatch, useNavigate } from 'react-router-dom'
import { CardsTable } from '@/view/modules/cards/components/CardsTable/CardsTable'
import { ShowNoCards } from '@/view/modules/cards/helpers/ShowNoCards/ShowNoCards'
import s from './DeckPage.module.scss'
import { ArrowBack } from '@/view/assets/icons/arrow-back/ArrowBack'
import { CardFormsManager } from '@/view/modules/cards/components/CardsFormsManager/CardFormsManager'

export const DeckPage = () => {
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
  const deck = useGetDeckByIdQuery({ id: match?.params.id })

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
        <ShowNoCards deckId={deck?.data?.id} deckName={deck?.data?.name} navigate={navigate} />
      ) : (
        <>
          <div className={s.header}>
            <Button className={s.backBtn} onClick={() => navigate(-1)} variant={'icon'}>
              <ArrowBack />
              <Typography>Back to Decks List</Typography>
            </Button>
            <div className={s.deckNameWithBtn}>
              <Typography variant={'large'}>{deck.data?.name}</Typography>
              <CardFormsManager type={'ADD'} deckId={match?.params.id} />
            </div>
          </div>
          <CardsTable selectedDeckTableData={cards?.items} />
        </>
      )}

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
