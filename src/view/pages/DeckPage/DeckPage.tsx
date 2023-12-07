import { useState } from 'react'
import { useGetCardsInDeckQuery, useGetDeckByIdQuery } from '@/api/services/decks/decks.service'
import { Button, Page, Pagination, TextField, Typography } from '@/view/ui'
import { useMatch, useNavigate } from 'react-router-dom'
import { CardsTable } from '@/view/modules/cards/components/CardsTable/CardsTable'
import { ShowNoCards } from '@/view/modules/cards/helpers/ShowNoCards/ShowNoCards'
import s from './DeckPage.module.scss'
import { ArrowBack } from '@/view/assets/icons/arrow-back/ArrowBack'
import { CardFormsManager } from '@/view/modules/cards/components/CardsFormsManager/CardFormsManager'
import Loading from '@/view/assets/components/Loading/Loading'
import { Error } from '@/view/assets/components/Error/Error'
import { Header } from '@/view/modules'
import { Bin } from '@/view/assets'

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

  return (
    <>
      <Header />
      <Page>
        {cards.items.length < 1 ? (
          <ShowNoCards
            cover={deck.cover}
            deckId={deck.id}
            deckName={deck.name}
            navigate={navigate}
          />
        ) : (
          <>
            <div className={s.header}>
              <Button className={s.backBtn} onClick={() => navigate(-1)} variant={'icon'}>
                <ArrowBack />
                <Typography>Back to Decks List</Typography>
              </Button>
              <div className={s.deckNameAndBtnContainer}>
                <div className={s.deckNameWithImg}>
                  <Typography variant={'large'}>{deck.name}</Typography>
                  {deck.cover && <img src={deck.cover} alt={'Deck cover'} />}
                </div>
                <div className={s.header__btn}>
                  <CardFormsManager type={'ADD'} deckId={match?.params.id} />
                </div>
              </div>
            </div>
            <TextField
              search={true}
              type="search"
              className={s.search}
              placeholder={'Card search'}
              icon={<Bin />}
            />
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
      </Page>
    </>
  )
}
