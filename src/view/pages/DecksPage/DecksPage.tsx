import { useMemo, useState } from 'react'
import { DecksTable } from '@/view/modules/decks/components/DecksTable/DecksTable'
import { Pagination } from '@/view/components/pagination/pagination'
import { useGetDecksQuery } from '@/api/services/decks/decks.service'
import { Typography } from '@/view/ui/Typography'
import { DeckFormsManager } from '@/view/modules/decks/components/DeckFormsManager/DeckFormsManager'
import { Page } from '@/view/ui'
import { Header } from '@/view/modules'
import Loading from '@/view/assets/components/Loading/Loading'
import { Sort } from '@/view/ui/Table/table'

export const DecksPage = () => {
  const [sort, setSort] = useState<Sort>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState<string | number>(10)

  const sortedString = useMemo(() => {
    if (!sort) return null

    return `${sort.key}-${sort.direction}`
  }, [sort])

  console.log(sortedString)

  const {
    data: decks,
    isLoading,
    isFetching,
    error,
  } = useGetDecksQuery({
    currentPage: currentPage,
    itemsPerPage: itemsPerPage,
    orderBy: sortedString,
  })

  if (isLoading || isFetching) {
    return <Loading />
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

  const selectOptionsOfDecksToDisplay = ['10', '20', '30', '50', '100']

  return (
    <>
      <Header />
      <Page>
        <DeckFormsManager type={'ADD'} />
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
