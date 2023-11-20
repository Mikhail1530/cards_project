import { useState } from 'react'
import { useGetCardsInDeckQuery, useGetDeckByIdQuery } from '@/view/services/decks/decks.service'
import { Pagination, Typography } from '@/view/ui'
import { useMatch, useNavigate } from 'react-router-dom'
import { SelectedDeckTable } from '@/view/modules/deck/components/selectedDeck/components/SelectedDeck/SelectedDeckTable/SelectedDeckTable'
import { showNoCards } from '@/view/modules/deck/helpers/showNoCards/showNoCards'
import { useCreateCardMutation } from '@/view/services/cards/cards.service'

type AddNewCardFormDataType = {
  id: string
  questionImg?: string
  question: string
  answer: string
}

export const SelectedDeck = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const navigate = useNavigate()
  const match = useMatch('/decks/:id/learn')
  console.log(match?.params.id)
  // const {
  //   data: selectedDeck,
  //   isLoading,
  //   isFetching,
  //   error,
  // } = useGetDeckByIdQuery({ id: match?.params.id })
  // console.log(selectedDeck, 'selectedDeck')
  const {
    data: cards,
    isLoading,
    isFetching,
    error,
  } = useGetCardsInDeckQuery({
    id: match?.params.id,
    currentPage: currentPage,
    itemsPerPage: itemsPerPage,
  })
  const [createNewCard, response] = useCreateCardMutation()
  console.log(response, 'createnewCard response')

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
  //selectedDeck?.name
  return (
    <>
      {cards.items.length < 1 ? (
        showNoCards(navigate, createNewCard, 'hardcodedSelectedDEckName', match?.params.id)
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
    //AddCardForm
  )
}
