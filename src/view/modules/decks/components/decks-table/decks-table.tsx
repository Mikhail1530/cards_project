import { Table, TBody, TCell, THead, THeader, TRow } from '@/view/ui/Table/table'
import { Button } from '@/view/ui/Button'
import s from './decks-table.module.scss'
import { Link } from 'react-router-dom'
import { Bin, Close, EditPencil, PlayInCircle } from '@/view/assets/icons'
import { Dialog } from '@/view/ui'
import { AddDeck } from '@/view/modules'

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
                  <Button
                    onClick={() => console.log(deck.id)}
                    as={Link}
                    // to={`/decks/`}
                    variant={'icon'}
                  >
                    <EditPencil />
                  </Button>
                  <Dialog
                    acceptBtnText={'sometext'}
                    handleFormSubmit={() => {}}
                    title={''}
                    icon={<Close />}
                    triggerBtnText={'sas'}
                  >
                    <AddDeck deckName={''} onSubmit={() => {}} />
                  </Dialog>
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
