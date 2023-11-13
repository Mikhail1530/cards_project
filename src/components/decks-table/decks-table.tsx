import { useCreateDeckMutation } from '@/services/decks/decks.service'
import Table, { TBody, TCell, THead, THeader, TRow } from '@/components/ui/Table/table'
import { Button } from '@/components/ui/Button'

export const DecksTable = ({ currentTableData }: any) => {
  const [createDeck, createDeckStatus] = useCreateDeckMutation() // first parameter is function we use to make a fetch. Second is the response from server if mutation was successful

  return (
    <>
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
