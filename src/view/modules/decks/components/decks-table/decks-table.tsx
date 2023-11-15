import { Table, TBody, TCell, THead, THeader, TRow } from '@/view/ui/Table/table'
import { Button } from '@/view/ui/Button'
import s from './decks-table.module.scss'
import { Link } from 'react-router-dom'
import { Bin, EditPencil, PlayInCircle } from '@/view/assets/icons'

export const DecksTable = ({ currentTableData }: any) => {
  return (
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
  )
}
