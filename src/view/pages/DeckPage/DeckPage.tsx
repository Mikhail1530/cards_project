import { useState } from 'react'
import { useGetCardsInDeckQuery, useGetDeckByIdQuery } from '@/api/services/decks/decks.service'
import { Button, Card, Pagination, Typography } from '@/view/ui'
import { useMatch, useNavigate } from 'react-router-dom'
import { CardsTable } from '@/view/modules/cards/components/CardsTable/CardsTable'
import { ShowNoCards } from '@/view/modules/cards/helpers/ShowNoCards/ShowNoCards'
import s from './DeckPage.module.scss'
import { ArrowBack } from '@/view/assets/icons/arrow-back/ArrowBack'
import { CardFormsManager } from '@/view/modules/cards/components/CardsFormsManager/CardFormsManager'
import Loading from '@/view/assets/components/Loading/Loading'
import { Error } from '@/view/assets/components/Error/Error'

export const DeckPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState<number | string>(10)
  const navigate = useNavigate()
  const match = useMatch('/decks/:id/learn')

  const {
    data: cards,
    isLoading,
    error,
    isError,
  } = useGetCardsInDeckQuery({
    id: match?.params.id,
    currentPage: currentPage,
    itemsPerPage: itemsPerPage,
  })
  const { data: deck, isLoading: isCardLoading } = useGetDeckByIdQuery({ id: match?.params.id })

  if (isLoading || isCardLoading) {
    return <Loading />
  }

  const handleSetItemsPerPage = (numOfItemsPerPage: number | string) => {
    setItemsPerPage(numOfItemsPerPage)
  }

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const selectOptionsOfDecksToDisplay = ['10', '20', '30', '50', '100']

  if (!cards || !deck || isError) {
    return <Error error={error} />
  }

  console.log(deck.cover, 'deck')

  return (
    <Card className={s.card}>
      {cards.items.length < 1 ? (
        <ShowNoCards cover={deck.cover} deckId={deck.id} deckName={deck.name} navigate={navigate} />
      ) : (
        <>
          <div className={s.header}>
            <Button className={s.backBtn} onClick={() => navigate(-1)} variant={'icon'}>
              <ArrowBack />
              <Typography>Back to Decks List</Typography>
            </Button>
            <div className={s.deckNameWithBtn}>
              <Typography variant={'large'}>{deck.name}</Typography>
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
