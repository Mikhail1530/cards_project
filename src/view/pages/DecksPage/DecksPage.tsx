import { ChangeEvent, useMemo, useRef, useState } from 'react'
import { DecksTable } from '@/view/modules/decks/components/DecksTable/DecksTable'
import { Pagination } from '@/view/components/pagination/pagination'
import { useGetDecksQuery } from '@/api/services/decks/decks.service'
import { Typography } from '@/view/ui/Typography'
import { DeckFormsManager } from '@/view/modules/decks/components/DeckFormsManager/DeckFormsManager'
import { Page, TextField } from '@/view/ui'
import { Header } from '@/view/modules'
import { Sort } from '@/view/ui/Table/Table'
import { TableWithPageLoadingSkeleton } from '@/view/ui/Table/TableSkeleton/TableSkeleton'
import s from './DecksPage.module.scss'

export const DecksPage = () => {
  const [sort, setSort] = useState<Sort>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState<string | number>(10)
  const searchTermRef = useRef('')

  const sortedString = useMemo(() => {
    if (!sort) return null

    return `${sort.key}-${sort.direction}`
  }, [sort])

  const {
    data: decks,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useGetDecksQuery({
    currentPage: currentPage,
    itemsPerPage: itemsPerPage,
    orderBy: sortedString,
    name: searchTermRef.current,
  })

  if (isLoading || isFetching) {
    return <TableWithPageLoadingSkeleton numRows={+itemsPerPage} />
  }

  if (!decks) {
    return 'No decks available!'
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

  const handleSetItemsPerPage = (numOfItemsPerPage: number | string) => {
    setItemsPerPage(numOfItemsPerPage)
  }

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  let timeoutId: NodeJS.Timeout | undefined
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

  return (
    <>
      <Header />
      <Page>
        <div className={s.headerAndAddDeckBtn}>
          <Typography variant={'h1'}>Decks list</Typography>
          <DeckFormsManager type={'ADD'} />
        </div>
        <div className={s.filtersContainer}>
          <TextField onChange={handleSearchChange} />
        </div>
        <DecksTable currentTableData={decks.items} sort={sort} setSort={setSort} />
        <Pagination
          currentPage={currentPage}
          totalCount={decks.pagination.totalItems}
          totalPages={decks.pagination.totalPages}
          handlePageChange={handlePageChange}
          handleSetItemsPerPage={handleSetItemsPerPage}
          itemsPerPage={decks.pagination.itemsPerPage}
          selectOptions={selectOptionsOfDecksToDisplay}
        />
      </Page>
    </>
  )
}
