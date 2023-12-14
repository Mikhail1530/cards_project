import { ChangeEvent, useRef, useState } from 'react'
import { useGetCardsInDeckQuery, useGetDeckByIdQuery } from '@/api/services/decks/decks.service'
import { Button, Page, Pagination, TextField, Typography } from '@/view/ui'
import { useMatch, useNavigate } from 'react-router-dom'
import { CardsTable } from '@/view/modules/cards/components/CardsTable/CardsTable'
import { ShowNoCards } from '@/view/modules/cards/helpers/ShowNoCards/ShowNoCards'
import s from './DeckPage.module.scss'
import { ArrowBack } from '@/view/assets/icons/arrow-back/ArrowBack'
import { CardFormsManager } from '@/view/modules/cards/components/CardsFormsManager/CardFormsManager'
import { Loading } from '@/view/assets'
import { Error } from '@/view/assets/components/Error/Error'
import { Header } from '@/view/modules'
import { TableSkeleton } from '@/view/ui/Table/TableSkeleton/TableSkeleton'
import { useAuthMeQuery } from '@/api/services/auth/auth.service'
import { DropdownMenu } from '@/view/ui/DropDownMenu/DropDownMenu'
import { ExtraMenu } from '@/view/assets/icons/extraMenu/ExtraMenu'
import { PlayIcon } from '@radix-ui/react-icons'
import { DeckFormsManager } from '@/view/modules/decks'
import * as RDropdownMenu from '@radix-ui/react-dropdown-menu'
import Search from '@/view/assets/icons/search/search'

export const DeckPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState<number | string>(10)
  const navigate = useNavigate()
  const match = useMatch('/decks/:id/')
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
  })
  const { data: deck, isLoading: isCardLoading } = useGetDeckByIdQuery({ id: match?.params.id })
  const { data: user } = useAuthMeQuery({ skip: true })

  if (isLoading || isCardLoading) {
    return <Loading />
  }

  if (!cards || !deck || !user || isError) {
    return <Error error={error} />
  }

  const handleSetItemsPerPage = (numOfItemsPerPage: number | string) => {
    setItemsPerPage(numOfItemsPerPage)
  }

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const selectOptionsOfDecksToDisplay = ['10', '20', '30', '50', '100']

  let timeoutId: NodeJS.Timeout
  const handleCardSearch = (e: ChangeEvent<HTMLInputElement>) => {
    searchedCardNameValue.current = e.target.value
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      refetch()
    }, 500)
  }

  return (
    <>
      <Header />
      <Page>
        {cards.items.length < 1 && user.id === deck.userId ? (
          <ShowNoCards
            cover={deck.cover}
            deckId={deck.id}
            deckName={deck.name}
            navigate={navigate}
          />
        ) : (
          <>
            <div className={s.header}>
              <Button className={s.backBtn} onClick={() => navigate(`/`)} variant={'icon'}>
                <ArrowBack />
                <Typography>Back to Decks List</Typography>
              </Button>
              <div className={s.deckNameAndBtnContainer}>
                <div className={s.firstRow}>
                  <Typography className={s.deckNameWithImg_titleAndDropDown} variant={'large'}>
                    {deck.name}{' '}
                    {user.id === deck.userId && (
                      <DropdownMenu triggerIcon={<ExtraMenu />}>
                        <RDropdownMenu.Item
                          onSelect={e => {
                            e.preventDefault()
                            navigate(`/decks/${deck.id}/learn`)
                          }}
                          className={s.DropdownMenuItem}
                        >
                          <PlayIcon />
                          Learn
                        </RDropdownMenu.Item>
                        <RDropdownMenu.Item
                          onSelect={e => e.preventDefault()}
                          className={s.DropdownMenuItem}
                        >
                          <DeckFormsManager type={'EDIT'} deck={deck} triggerBtnText={'Edit'} />
                        </RDropdownMenu.Item>
                        <RDropdownMenu.Item
                          onSelect={e => e.preventDefault()}
                          className={s.DropdownMenuItem}
                        >
                          <DeckFormsManager type={'DELETE'} deck={deck} triggerBtnText={'Delete'} />
                        </RDropdownMenu.Item>
                      </DropdownMenu>
                    )}
                  </Typography>
                  {user.id === deck.userId ? (
                    <div className={s.header__btn}>
                      <CardFormsManager type={'ADD'} deckId={match?.params.id} />
                    </div>
                  ) : (
                    <Button fullWidth={false} onClick={() => navigate(`/decks/${deck.id}/learn`)}>
                      Study
                    </Button>
                  )}
                </div>
                {deck.cover && <img src={deck.cover} alt={'Deck cover'} />}
              </div>
            </div>
            <TextField
              search={true}
              type="search"
              className={s.search}
              placeholder={'Enter card question'}
              icon={<Search />}
              onChange={handleCardSearch}
            />
            {isLoading || isFetching ? (
              <TableSkeleton numRows={cards.items.length} />
            ) : (
              <CardsTable selectedDeckTableData={cards.items} userId={user.id} />
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
