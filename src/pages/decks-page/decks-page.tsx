import { useState } from 'react'
import { DecksTable } from '@/components/decks-table/decks-table'
import { Pagination } from '@/components/ui/pagination/pagination'
import { useGetDecksQuery } from '@/services/decks/decks.service'
import { Typography } from '@/components/ui/Typography'

const DecksPage = () => {
  const [currentPage, setCurrentPage] = useState(1)

  const {
    data: decks,
    isLoading,
    isFetching,
    error,
  } = useGetDecksQuery({ currentPage: currentPage, itemsPerPage: 10 })

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

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  console.log('this is decks:', decks)
  return (
    <>
      <DecksTable currentTableData={decks.items} />
      <Pagination
        currentPage={currentPage}
        totalCount={decks.pagination.totalItems}
        totalPages={decks.pagination.totalPages}
        handlePageChange={handlePageChange}
        pageSize={decks.pagination.itemsPerPage}
      />
    </>
  )
}

export default DecksPage
