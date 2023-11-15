import { useState } from 'react'
import { DecksTable } from '@/view/modules/decks/components/decks-table/decks-table'
import { Pagination } from '@/view/components/pagination/pagination'
import { useGetDecksQuery } from '@/view/services/decks/decks.service'
import { Typography } from '@/view/ui/Typography'
import { Button } from '@/view/ui'
import { AddDeck } from '@/view/modules'

export const Decks = () => {
  const [modalVisible, setModalVisible] = useState(false)
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

  const handleModalWindowVisibility = () => {
    console.log('handleModal')
    setModalVisible(!modalVisible)
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
      <Button fullWidth={false} onClick={handleModalWindowVisibility}>
        create new deck
      </Button>
      {modalVisible ? <AddDeck deckName={''} /> : null}
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
