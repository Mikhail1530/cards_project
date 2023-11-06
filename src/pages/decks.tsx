import { useGetDecksQuery } from '@/services/base-api.ts'
import Table, { TBody, TCell, THead, THeader, TRow } from '@/components/ui/Table/table.tsx'
import { store } from '@/services/store.ts'

export const Decks = () => {
  const { data: decks, isLoading, isError } = useGetDecksQuery({ currentPage: 2 })

  console.log(store.getState())

  return (
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
        {decks?.items?.map(deck => {
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
  )
}
