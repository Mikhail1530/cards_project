import { useCreateDeckMutation } from '@/services/decks/decks.service'
import { Table, TBody, TCell, THead, THeader, TRow } from '@/components/ui/Table/table'
import { Button } from '@/components/ui/Button'
import s from './decks-table.module.scss'
import { Link } from 'react-router-dom'
import { PlayInCircle, EditPencil, Bin } from '@/assets/icons'

export const DecksTable = ({ currentTableData }: any) => {
  const [createDeck] = useCreateDeckMutation() // first parameter is function we use to make a fetch. Second is the response from server if mutation was successful

  return (
    <>
      <Button onClick={() => createDeck({ name: 'new Deck' })}>create new deck</Button>
      <Table>
        <THead>
          <TRow>
            <THeader>Name</THeader>
            <THeader>Cards</THeader>
            <THeader>Last Updated</THeader>
            <THeader>Created By</THeader>
            <THeader></THeader>
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
                <TCell>
                  <div className={s.iconsContainer}>
                    <Button as={Link} to={`/decks/${deck.id}/learn`} variant={'icon'}>
                      <PlayInCircle />
                    </Button>
                    <Button as={Link} to={`/decks/`} variant={'icon'}>
                      <EditPencil />
                    </Button>
                    <Button as={Link} to={`/decks/`} variant={'icon'}>
                      <Bin />
                    </Button>
                    {/*{deck.author.id === currentUserId && (*/}
                    {/*  <>*/}
                    {/*    <Button onClick={handleEditClick(deck.id)} variant={'icon'}>*/}
                    {/*      <Edit2Outline />*/}
                    {/*    </Button>*/}
                    {/*    <Button onClick={handleDeleteClick(deck.id)} variant={'icon'}>*/}
                    {/*      <TrashOutline />*/}
                    {/*    </Button>*/}
                    {/*  </>*/}
                    {/*)}*/}
                  </div>
                </TCell>
              </TRow>
            )
          })}
        </TBody>
      </Table>
    </>
  )
}
