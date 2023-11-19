import { useState } from 'react'
import {
  useCreateDeckMutation,
  useGetCardsInDeckQuery,
  useGetDeckByIdQuery,
} from '@/view/services/decks/decks.service'
import { Button, Card, Pagination, Typography } from '@/view/ui'
import { useMatch } from 'react-router-dom'
import { SelectedDeckTable } from '@/view/modules/selectedDeck/components/SelectedDeck/SelectedDeckTable/SelectedDeckTable'
import { AddDeck } from '@/view/modules'

export const SelectedDeck = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const match = useMatch('/decks/:id/learn')
  const {
    data: selectedDeck,
    isLoading,
    isFetching,
    error,
  } = useGetDeckByIdQuery({ id: match?.params.id })
  // const { data: decks } = useGetDecksQuery({ currentPage: currentPage, itemsPerPage: itemsPerPage })
  const { data: cards } = useGetCardsInDeckQuery({
    id: match?.params.id,
    currentPage: currentPage,
    itemsPerPage: itemsPerPage,
  })

  const showNoCards = () => {
    return (
      <Card style={{ width: 420, height: 420 }}>
        <div>
          <Typography>No decks available</Typography>
          <Button onSubmit={() => {}}>Add new card unfinished</Button>
        </div>
      </Card>
    )
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

  if (!cards) {
    return null // FIXME ask how to handle this properly
  }

  return (
    <>
      {cards.items.length < 1 ? (
        showNoCards()
      ) : (
        <SelectedDeckTable currentTableData={cards?.items} />
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
    </>
  )
}
