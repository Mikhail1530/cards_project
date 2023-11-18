import { Table, TBody, TCell, THead, THeader, TRow } from '@/view/ui/Table/table'
import { Button } from '@/view/ui/Button'
import s from './SelectedDeckTable.module.scss'
import { Link } from 'react-router-dom'
import { EditPencil, PlayInCircle } from '@/view/assets/icons'

export const SelectedDeckTable = ({ currentTableData }: any) => {
  return (
    <Table>
      <THead>
        <TRow>
          <THeader>Question</THeader>
          <THeader>Answer</THeader>
          <THeader>Last Updated</THeader>
          <THeader>Grade</THeader>
          <THeader></THeader>
        </TRow>
      </THead>
      <TBody>
        {currentTableData.map((deck: any) => {
          return (
            <TRow key={deck.id}>
              <TCell>{deck?.question}</TCell>
              <TCell>{deck?.answer}</TCell>
              <TCell>{new Date(deck?.updated).toLocaleDateString()}</TCell>
              <TCell>{deck?.grade}</TCell>
              <TCell>
                <div className={s.iconsContainer}>
                  <Button as={Link} to={`/decks/${deck.id}/learn`} variant={'icon'}>
                    <PlayInCircle />
                  </Button>
                  <Button as={Link} to={`/decks/`} variant={'icon'}>
                    <EditPencil />
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
