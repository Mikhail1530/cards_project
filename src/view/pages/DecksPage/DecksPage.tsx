import { ChangeEvent, useRef } from 'react'
import { DecksTable } from '@/view/modules/decks/components/DecksTable/DecksTable'
import { Pagination } from '@/view/components/pagination/pagination'
import { useGetDecksQuery } from '@/api/services/decks/decks.service'
import { Typography } from '@/view/ui/Typography'
import { DeckFormsManager } from '@/view/modules/decks/components/DeckFormsManager/DeckFormsManager'
import { Button, Page, Slider, TextField } from '@/view/ui'
import { Header } from '@/view/modules'
import { Sort } from '@/view/ui/Table/Table'
import s from './DecksPage.module.scss'
import { ErrorModal, Loading } from '@/view/assets'
import { useAuthMeQuery } from '@/api/services/auth/auth.service'
import Search from '@/view/assets/icons/search/search'
import {
  cleanFilters,
  selectActiveTab,
  selectAuthorId,
  selectCurrentPage,
  selectItemsPerPage,
  selectMaxCardsCount,
  selectMinCardsCount,
  selectOrderBy,
  selectSort,
  setActiveTab,
  setAuthorId,
  setCurrentPage,
  setItemsPerPage,
  setMaxCardsCount,
  setMinCardsCount,
  setName,
  setSort,
} from '@/view/modules/decks/slice/DecksSlice'
import { useDispatch, useSelector } from 'react-redux'
import { AppRootStateType } from '@/app/store'

export const DecksPage = () => {
  const dispatch = useDispatch()
  const sort = useSelector(selectSort)
  const currentPage = useSelector(selectCurrentPage)
  const itemsPerPage = useSelector(selectItemsPerPage)
  const activeTab = useSelector(selectActiveTab)
  const minCardsCount = useSelector(selectMinCardsCount)
  const maxCardsCount = useSelector(selectMaxCardsCount)
  const orderBy = useSelector(selectOrderBy)
  const authorId = useSelector(selectAuthorId)
  const name = useSelector((state: AppRootStateType) => state.decks.name)
  const inputRef = useRef<HTMLInputElement | null>(null) // useRef is used only to display the data after cleaning. The state changes with redux.

  const handleSortChange = (sortObj: Sort) => {
    dispatch(setSort(sortObj))
  }

  const { data: user } = useAuthMeQuery({ skip: true })

  const {
    data: decks,
    isLoading,
    error,
  } = useGetDecksQuery({
    minCardsCount: minCardsCount,
    maxCardsCount: maxCardsCount,
    currentPage: currentPage,
    itemsPerPage: itemsPerPage,
    orderBy: orderBy,
    name: name,
    authorId: authorId,
  })

  const handleSetItemsPerPage = (numOfItemsPerPage: number | string) => {
    dispatch(setItemsPerPage(Number(numOfItemsPerPage)))
  }

  const handlePageChange = (pageNumber: number) => {
    dispatch(setCurrentPage(pageNumber))
  }

  const handleFiltersCleaning = () => {
    if (inputRef.current) {
      inputRef.current.value = ''
    }
    dispatch(cleanFilters())
  }

  const searchByCardsInDeck = (minMaxCardsValues: number[]) => {
    dispatch(setMinCardsCount(minMaxCardsValues[0]))
    dispatch(setMaxCardsCount(minMaxCardsValues[1]))
  }

  let timeoutId: NodeJS.Timeout
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      dispatch(setName(e.target.value))
    }, 500)
  }

  const selectOptionsOfDecksToDisplay = ['10', '20', '30', '50', '100']

  if (!user) {
    return <Loading />
  } // check for errors with this one

  const filterDecksByOwner = (author: 'me' | 'all') => {
    if (author === 'me') {
      dispatch(setAuthorId(user.id))
      dispatch(
        setActiveTab({
          myDeck: true,
          allDecks: false,
        })
      )
    } else {
      dispatch(setAuthorId(''))
      dispatch(
        setActiveTab({
          myDeck: false,
          allDecks: true,
        })
      )
    }
  }

  if (error) {
    return <ErrorModal errorMessage={JSON.stringify(error)} />
  }

  if (isLoading) {
    return <Loading />
  }

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
            defaultValue={name}
            ref={inputRef}
            // value={searchValue}
            onChange={handleSearchChange}
            placeholder={'Search deck'}
            icon={<Search />}
            search={true}
          />
          <div className={s.decksFilterBtnsContainer}>
            <Typography variant={'caption'}>Select decks</Typography>
            <div className={s.decksFilterBtns}>
              <Button
                variant={activeTab.myDeck ? 'primary' : 'tertiary'}
                edges={'sharpRight'}
                onClick={() => filterDecksByOwner('me')}
                fullWidth={false}
              >
                My decks
              </Button>
              <Button
                variant={activeTab.allDecks ? 'primary' : 'tertiary'}
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
            minCardsCount={minCardsCount}
            maxCardsCount={maxCardsCount}
          />
          <div className={s.cleanFilterBtn}>
            <Button variant={'secondary'} onClick={handleFiltersCleaning} fullWidth={false}>
              &nbsp; Clean filters &nbsp;
            </Button>
          </div>
        </div>
        {/*{isLoading ? (*/}
        {/*  <TableSkeleton numRows={+itemsPerPage} />*/}
        {/*) : (*/}
        <DecksTable
          userId={user?.id}
          currentTableData={decks?.items}
          sort={sort}
          setSort={handleSortChange}
        />
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
