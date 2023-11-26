import { Table, TBody, TCell, THead, THeader, TRow } from '@/view/ui/Table/table'
import { Button } from '@/view/ui/Button'
import s from './decks-table.module.scss'
import { Link } from 'react-router-dom'
import { PlayInCircle } from '@/view/assets/icons'
import { GetDecksResponseItem as DeckType } from '@/view/services/decks/decks.types'
import { DeckFormsManager } from '@/view/modules/decks/components/DeckFormsManager/DeckFormsManager'

type DecksTable = {
  currentTableData: DeckType[]
}

export const DecksTable = ({ currentTableData }: DecksTable) => {
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
        {currentTableData.map((deck: DeckType) => {
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
                  <Button
                    fullWidth={false}
                    as={Link}
                    to={`/decks/${deck.id}/learn`}
                    variant={'icon'}
                  >
                    <PlayInCircle />
                  </Button>
                  <DeckFormsManager type={'EDIT'} deck={deck} />
                  <DeckFormsManager type={'DELETE'} deck={deck} />
                </div>
              </TCell>
            </TRow>
          )
        })}
      </TBody>
    </Table>
  )
}
