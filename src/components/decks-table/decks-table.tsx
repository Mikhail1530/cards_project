import { useCreateDeckMutation, useGetDecksQuery } from '@/services/decks/decks.service'
import Table, { TBody, TCell, THead, THeader, TRow } from '@/components/ui/Table/table'
import { Typography } from '@/components/ui/Typography'
import { Button } from '@/components/ui/Button'

export const DecksTable = ({ currentTableData }: any) => {
  // prettier-ignore
  // const { data: decks, refetch, isError, error } = useGetDecksQuery({ currentPage: 1, itemsPerPage: 10 })
  // console.log(decks, 'decks data')
  const [createDeck, createDeckStatus] = useCreateDeckMutation() // first parameter is function we use to make a fetch. Second is the response from server if mutation was successful

  // if (isError) {
  //   return (
  //     <Typography variant={'h1'}>
  //       An error occured: {error.data?.message}. Please{' '}
  //       {<a href={'http://localhost:5173/login'}>login </a>}again
  //     </Typography>
  //   )
  // }

  // console.log(currentTableData(), 'inDeckTables')
  // const data = currentTableData()
  // console.log(currentTableData[0].name, 'data')

  return (
    <>
      {/*<Button onClick={refetch}>refetch</Button>*/}
      <Button onClick={() => createDeck({ name: 'new Deck' })}>create new deck</Button>
      <Table>
        <THead>
          <TRow>
            <THeader>Name</THeader>
            <THeader>Cards</THeader>
            <THeader>Updated</THeader>
            <THeader>Author</THeader>
          </TRow>
        </THead>
        <TBody>
          {currentTableData.map((deck: any) => {
            return (
              <TRow key={deck.id}>
                <TCell>{deck?.name}</TCell>
                <TCell>{deck?.cardsCount}</TCell>
                <TCell>{new Date(deck?.updated).toLocaleDateString()}</TCell>
                <TCell>{deck?.author?.name}</TCell>
              </TRow>
            )
          })}
        </TBody>
      </Table>
    </>
  )
}
