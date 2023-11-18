import { useState } from 'react'
import { useGetCardsInDeckQuery, useGetDeckByIdQuery } from '@/view/services/decks/decks.service'
import { Pagination, Typography } from '@/view/ui'
import { useMatch } from 'react-router-dom'
import { SelectedDeckTable } from '@/view/modules/selectedDeck/components/SelectedDeck/SelectedDeckTable/SelectedDeckTable'

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
  console.log(match, 'match in SelectedDeck')

  if (!cards) {
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
  console.log(selectedDeck, ' in selected deck')

  //clp00g3zp1kr2vo2qrgalz2n7
  return (
    <>
      {cards.items.length < 1 ? (
        <div>No cards</div>
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
