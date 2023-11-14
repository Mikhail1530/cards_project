import { useState } from 'react'
import { DecksTable } from '@/components/modules/decks/components/decks-table/decks-table'
import { Pagination } from '@/components/ui/pagination/pagination'
import { useGetDecksQuery } from '@/services/decks/decks.service'
import { Typography } from '@/components/ui/Typography'

export const Decks = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const {
    data: decks,
    isLoading,
    isFetching,
    error,
  } = useGetDecksQuery({ currentPage: currentPage, itemsPerPage: itemsPerPage })

  if (!decks) {
    return <div>No decks available</div>
  }

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

  return (
    <>
      <DecksTable currentTableData={decks.items} />
      <Pagination
        currentPage={currentPage}
        totalCount={decks.pagination.totalItems}
        totalPages={decks.pagination.totalPages}
        handlePageChange={handlePageChange}
        handleSetItemsPerPage={handleSetItemsPerPage}
        itemsPerPage={decks.pagination.itemsPerPage}
        selectOptions={selectOptionsOfDecksToDisplay}
      />
    </>
  )
}
