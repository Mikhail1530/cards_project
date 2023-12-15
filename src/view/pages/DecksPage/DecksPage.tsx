import { ChangeEvent, useMemo, useRef, useState } from 'react'
import { DecksTable } from '@/view/modules/decks/components/DecksTable/DecksTable'
import { Pagination } from '@/view/components/pagination/pagination'
import { useGetDecksQuery } from '@/api/services/decks/decks.service'
import { Typography } from '@/view/ui/Typography'
import { DeckFormsManager } from '@/view/modules/decks/components/DeckFormsManager/DeckFormsManager'
import { Button, Page, Slider, TextField } from '@/view/ui'
import { Header } from '@/view/modules'
import { Sort } from '@/view/ui/Table/Table'
import { TableSkeleton } from '@/view/ui/Table/TableSkeleton/TableSkeleton'
import s from './DecksPage.module.scss'
import { ErrorModal } from '@/view/assets'
import { useAuthMeQuery } from '@/api/services/auth/auth.service'
import { Loading } from '@/view/assets'
import Search from '@/view/assets/icons/search/search'

export const DecksPage = () => {
  const [sort, setSort] = useState<Sort>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState<string | number>(10)
  const searchTermRef = useRef('')
  // TODO: ask is it possible to get rid of these states.
  const [ownerId, setOwnerId] = useState<string | undefined>('')
  const [activeBtn, setActiveBtn] = useState({
    myDeck: false,
    allDecks: true,
  })
  const [cardsCount, setCardsCount] = useState({
    minCardsCount: 0,
    maxCardsCount: 100,
  })

  const sortedString = useMemo(() => {
    if (!sort) return null

    return `${sort.key}-${sort.direction}`
  }, [sort])

  const { data: user } = useAuthMeQuery({ skip: true })

  const {
    data: decks,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useGetDecksQuery({
    minCardsCount: cardsCount.minCardsCount,
    maxCardsCount: cardsCount.maxCardsCount,
    currentPage: currentPage,
    itemsPerPage: itemsPerPage,
    orderBy: sortedString,
    name: searchTermRef.current,
    authorId: ownerId,
  })

  if (error) {
    return <ErrorModal errorMessage={JSON.stringify(error)} />
  }

  //TODO: ask how to handle this properly
  const filterDecksByOwner = (author: 'me' | 'all') => {
    if (author === 'me') {
      setOwnerId(user?.id)
      setActiveBtn({
        myDeck: true,
        allDecks: false,
      })
      refetch()
    } else {
      setOwnerId('')
      setActiveBtn({
        myDeck: false,
        allDecks: true,
      })
      refetch()
    }
  }

  const handleSetItemsPerPage = (numOfItemsPerPage: number | string) => {
    setItemsPerPage(numOfItemsPerPage)
  }

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const cleanFilters = () => {
    searchByCardsInDeck([0, 100])
    setOwnerId('')
    setActiveBtn({
      myDeck: false,
      allDecks: true,
    })
  }

  const searchByCardsInDeck = (minMaxCardsValues: number[]) => {
    setCardsCount({ minCardsCount: minMaxCardsValues[0], maxCardsCount: minMaxCardsValues[1] })
  }

  let timeoutId: NodeJS.Timeout
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    searchTermRef.current = e.target.value
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      refetch()
    }, 500)
  }

  const selectOptionsOfDecksToDisplay = ['10', '20', '30', '50', '100']

  if (isLoading) {
    return <Loading />
  }

  // if (!user && !isLoading) {
  //   return 'No user!'
  // }

  return (
    <>
      <Header />
      <Page className={s.decksPage}>
        <div className={s.captionAndAddDeckBtn}>
          <Typography variant={'h1'}>Decks list</Typography>
          <DeckFormsManager type={'ADD'} />
        </div>
        <div className={s.filtersContainer}>
          <TextField
            className={s.filtersTextfield}
            defaultValue={searchTermRef.current}
            onChange={handleSearchChange}
            placeholder={'Search deck'}
            icon={<Search />}
            search={true}
          />
          <div className={s.decksFilterBtnsContainer}>
            <Typography variant={'caption'}>Select decks</Typography>
            <div className={s.decksFilterBtns}>
              <Button
                variant={activeBtn.myDeck ? 'primary' : 'tertiary'}
                edges={'sharpRight'}
                onClick={() => filterDecksByOwner('me')}
                fullWidth={false}
              >
                My decks
              </Button>
              <Button
                variant={activeBtn.allDecks ? 'primary' : 'tertiary'}
                edges={'sharpLeft'}
                onClick={() => filterDecksByOwner('all')}
                fullWidth={false}
              >
                All decks
              </Button>
            </div>
          </div>
          <Slider
            onSubmit={searchByCardsInDeck}
            // cardsCount={cardsCount}
            //TODO make properly cleaner
            // cleanOnSubmit={!!cardsCount}
          />
          <div className={s.cleanFilterBtn}>
            <Button variant={'secondary'} onClick={cleanFilters} fullWidth={false}>
              &nbsp; Clean filters &nbsp;
            </Button>
          </div>
        </div>
        {isLoading || isFetching ? (
          <TableSkeleton numRows={+itemsPerPage} />
        ) : (
          <DecksTable
            userId={user?.id}
            currentTableData={decks?.items}
            sort={sort}
            setSort={setSort}
          />
        )}
        <Pagination
          currentPage={currentPage}
          totalCount={decks?.pagination.totalItems}
          totalPages={decks?.pagination.totalPages}
          handlePageChange={handlePageChange}
          handleSetItemsPerPage={handleSetItemsPerPage}
          itemsPerPage={decks?.pagination.itemsPerPage}
          selectOptions={selectOptionsOfDecksToDisplay}
        />
      </Page>
    </>
  )
}

// Another option instead of Ref is to use debounce hook instead of ref
// const [searchTerm, setSearchTerm] = useState('')
// const debouncedValue = useDebounce(searchTerm)
// useEffect(() => {
//   refetch()
//   console.log('debouncedValue', debouncedValue)
// }, [debouncedValue])
