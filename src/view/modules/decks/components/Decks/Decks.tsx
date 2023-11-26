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
import { EditDeck } from '@/view/modules/decks/components/forms/edit-deck-form/EditDeckForm'
import { SetCurrentDeckUseStateType } from '@/view/modules/selectedDeck/components/SelectedDeck/types/types.'
import { DeleteDeckForm } from '@/view/modules/decks/components/forms/delete-deck-form/DeleteDeckForm'
import { AddDeck } from '@/view/modules'

/** Shows modals when currentDeck is selected (not empty)*/

export const Decks = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
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

  return (
    <>
      <AddDeck
        onSubmit={createDeck}
        // open={addDeckOpenStatus}
        //FIXME wouldnt work since when we add new deck nothing is selected yet
        // onClose={() => setCurrentDeck(null)}
      />
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
