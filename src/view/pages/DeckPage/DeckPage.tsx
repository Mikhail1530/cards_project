import { ChangeEvent, useRef, useState } from 'react'
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
import { TableSkeleton } from '@/view/ui/Table/TableSkeleton/TableSkeleton'

export const DeckPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState<number | string>(10)
  const navigate = useNavigate()
  const match = useMatch('/decks/:id/learn')
  const searchedCardNameValue = useRef('')

  const {
    data: cards,
    isLoading,
    error,
    isError,
    isFetching,
    refetch,
  } = useGetCardsInDeckQuery({
    id: match?.params.id,
    currentPage: currentPage,
    itemsPerPage: itemsPerPage,
    question: searchedCardNameValue.current,
    // answer: searchedCardNameValue.current,
  })
  const { data: deck, isLoading: isCardLoading } = useGetDeckByIdQuery({ id: match?.params.id })

  if (isLoading || isCardLoading) {
    return <Loading />
  }

  const handleSetItemsPerPage = (numOfItemsPerPage: number | string) => {
    console.log(numOfItemsPerPage)
    setItemsPerPage(numOfItemsPerPage)
  }

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const selectOptionsOfDecksToDisplay = ['10', '20', '30', '50', '100']

  if (!cards || !deck || isError) {
    return <Error error={error} />
  }

  let timeoutId: NodeJS.Timeout
  const handleCardSearch = (e: ChangeEvent<HTMLInputElement>) => {
    searchedCardNameValue.current = e.target.value
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      refetch()
      // searchedCardNameValue.current = ''
    }, 500)
  }
  console.log(cards, 'Cards')

  return (
    <>
      <Header />
      <Page>
        {cards.items.length < 1 && !searchedCardNameValue ? (
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
              placeholder={'Enter card question'}
              icon={<Bin />}
              onChange={handleCardSearch}
            />
            {isLoading || isFetching ? (
              <TableSkeleton numRows={cards.items.length} />
            ) : (
              <CardsTable selectedDeckTableData={cards?.items} />
            )}
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
