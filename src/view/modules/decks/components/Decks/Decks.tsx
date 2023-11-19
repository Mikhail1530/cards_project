import { useState } from 'react'
import { DecksTable } from '@/view/modules/decks/components/decks-table/decks-table'
import { Pagination } from '@/view/components/pagination/pagination'
import {
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useGetDecksQuery,
  useUpdateDeckMutation,
} from '@/view/services/decks/decks.service'
import { Typography } from '@/view/ui/Typography'
import { AddDeck } from '@/view/modules'
import { GetDecksResponseItems } from '@/view/services/decks/decks.types'
import { EditDeck } from '@/view/modules/deck/edit-deck/EditDeck'
import { SetCurrentDeckUseStateType } from '@/view/modules/selectedDeck/types/types.'
import { DeleteDeck } from '@/view/modules/deck/delete-deck/DeleteDeck.'

/** Show modals when currentDeck is selected (not empty)*/

export const Decks = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [currentDeck, setCurrentDeck] = useState<SetCurrentDeckUseStateType>()

  const [handleDeckEdit] = useUpdateDeckMutation({ id: currentDeck?.val.id })
  const [deleteDeck, response] = useDeleteDeckMutation({ id: currentDeck?.val.id })
  console.log(response, 'response after edit')
  const [createDeck] = useCreateDeckMutation() // first parameter is function we use to make a fetch. Second is the response from server if mutation was successful
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

  // const selectedDeckToEdit = decks.items.find(deck => deck.id === id)

  // const handleEdit = () => {}
  //handleEdit={} handleDelete={}
  console.log(currentDeck, 'currentDEck')
  return (
    <>
      <AddDeck deckName={'addDeck'} onSubmit={createDeck} inputLabel={'Deck name'} />
      <DecksTable setCurrentDeck={setCurrentDeck} currentTableData={decks.items} />
      <Pagination
        currentPage={currentPage}
        totalCount={decks.pagination.totalItems}
        totalPages={decks.pagination.totalPages}
        handlePageChange={handlePageChange}
        handleSetItemsPerPage={handleSetItemsPerPage}
        itemsPerPage={decks.pagination.itemsPerPage}
        selectOptions={selectOptionsOfDecksToDisplay}
      />
      {currentDeck?.key === 'edit' ? (
        <EditDeck
          id={currentDeck?.val.id}
          open={!!currentDeck}
          onClose={() => setCurrentDeck(null)}
          deckName={'editDeck'}
          onSubmit={handleDeckEdit}
        />
      ) : currentDeck?.key === 'delete' ? (
        <DeleteDeck
          id={currentDeck?.val.id}
          open={!!currentDeck}
          onClose={() => setCurrentDeck(null)}
          deckName={'deleteDeck'}
          onSubmit={deleteDeck}
        />
      ) : null}
    </>
  )
}
