import { Table, TBody, TCell, THead, THeader, TRow } from '@/view/ui/Table/table'
import { Button } from '@/view/ui/Button'
import s from './decks-table.module.scss'
import { Link } from 'react-router-dom'
import { Bin, EditPencil, PlayInCircle } from '@/view/assets/icons'
import { GetDecksResponseItems } from '@/view/services/decks/decks.types'
import {
  SelectedDeckStatusOptions,
  SetCurrentDeckUseStateType,
} from '@/view/modules/selectedDeck/components/selectedDeck/types/types.'

type DecksTable = {
  currentTableData: GetDecksResponseItems[]
  setCurrentDeck: (obj: SetCurrentDeckUseStateType) => void
}

export const DecksTable = ({ currentTableData, setCurrentDeck }: DecksTable) => {
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
          const onClick = (key: SelectedDeckStatusOptions) => {
            setCurrentDeck({ key, val: deck })
          }
          return (
            <TRow key={deck.id}>
              <TCell>
                {deck.cover && <img alt="Image view" src={deck.cover} width={50} />}
                {deck?.name}
              </TCell>
              <TCell>{deck?.cardsCount}</TCell>
              <TCell>{new Date(deck?.updated).toLocaleDateString()}</TCell>
              <TCell>{deck?.author?.name}</TCell>
              <TCell>
                <div className={s.iconsContainer}>
                  <Button as={Link} to={`/decks/${deck.id}/learn`} variant={'icon'}>
                    <PlayInCircle />
                  </Button>
                  <Button onClick={() => onClick('edit')} variant={'icon'}>
                    <EditPencil />
                  </Button>
                  <Button onClick={() => onClick('delete')} variant={'icon'}>
                    <Bin />
                  </Button>
                </div>
              </TCell>
            </TRow>
          )
        })}
      </TBody>
    </Table>
  )
}
