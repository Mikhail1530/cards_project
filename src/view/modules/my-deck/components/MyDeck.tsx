import { useState } from 'react'
import {
  useGetCardsInDeckQuery,
  useGetDeckByIdQuery,
  useGetDecksQuery,
} from '@/view/services/decks/decks.service'
import { Pagination, Typography } from '@/view/ui'
import { DecksTable } from '@/view/modules/decks/components/decks-table/decks-table'
import { useMatch, useParams } from 'react-router-dom'

export const MyDeck = () => {
  // const [currentPage, setCurrentPage] = useState(1)
  // const [itemsPerPage, setItemsPerPage] = useState(10)
  // const match = useMatch('/decks/:id/learn')
  // const { data: selectedDeck } = useGetDeckByIdQuery({ id: match?.params.id })
  // const {
  //   data: decks,
  //   isLoading,
  //   isFetching,
  //   error,
  // } = useGetDecksQuery({ currentPage: currentPage, itemsPerPage: itemsPerPage })
  // const { data: cards } = useGetCardsInDeckQuery({ id: match?.params.id })
  //
  // if (!decks) {
  //   return <div>No decks available</div>
  // }
  //
  // if (isLoading || isFetching) {
  //   return <div>loading...</div>
  // }
  //
  // if (error) {
  //   if ('status' in error) {
  //     const errMsg = 'error' in error ? error.error : JSON.stringify(error.data)
  //
  //     return (
  //       <>
  //         <Typography>An error has occurred:</Typography>
  //         <Typography>{errMsg}</Typography>
  //       </>
  //     )
  //   } else {
  //     return <div>{error.message}</div>
  //   }
  // }
  //
  // const handleSetItemsPerPage = (numOfItemsPerPage: number) => {
  //   setItemsPerPage(numOfItemsPerPage)
  // }
  //
  // const handlePageChange = (pageNumber: number) => {
  //   setCurrentPage(pageNumber)
  // }
  //
  // const selectOptionsOfDecksToDisplay = ['10', '20', '30', '50', '100']
  // console.log(selectedDeck)

  //clp00g3zp1kr2vo2qrgalz2n7
  return (
    <>
      {/*<DecksTable currentTableData={cards?.items} />*/}
      {/*<Pagination*/}
      {/*  currentPage={currentPage}*/}
      {/*  totalCount={decks.pagination.totalItems}*/}
      {/*  totalPages={decks.pagination.totalPages}*/}
      {/*  handlePageChange={handlePageChange}*/}
      {/*  handleSetItemsPerPage={handleSetItemsPerPage}*/}
      {/*  itemsPerPage={decks.pagination.itemsPerPage}*/}
      {/*  selectOptions={selectOptionsOfDecksToDisplay}*/}
      {/*/>*/}
    </>
  )
}
