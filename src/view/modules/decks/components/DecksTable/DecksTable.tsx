import { Table, TableHeader, TBody, TCell, TRow } from '@/view/ui/Table/Table'
import { Button } from '@/view/ui/Button'
import s from './DecksTable.module.scss'
import { Link } from 'react-router-dom'
import { PlayInCircle } from '@/view/assets/icons'
import { GetDecksResponseItem as DeckType } from '@/api/services/decks/decks.types'
import { DeckFormsManager } from '@/view/modules/decks/components/DeckFormsManager/DeckFormsManager'

type DecksTable = {
  currentTableData: DeckType[] | undefined
  sort: any
  setSort: any
  userId: string | undefined
}

export type Column = {
  key: string
  sortable?: boolean
  title: string
}

const columns: Array<Column> = [
  {
    key: 'name',
    title: 'Name',
  },
  {
    key: 'cardsCount',
    title: 'Cards',
  },
  {
    key: 'updated',
    title: 'Last Updated',
  },
  {
    key: 'createdBy',
    title: 'Created by',
    sortable: false,
  },
]

export const DecksTable = ({ currentTableData, sort, setSort, userId }: DecksTable) => {
  return (
    <Table>
      <TableHeader columns={columns} sort={sort} onSort={setSort} />
      <TBody>
        {currentTableData?.map((deck: DeckType) => {
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
                    to={`/decks/${deck.id}`}
                    variant={'icon'}
                    icon={<PlayInCircle />}
                  />
                  {userId === deck.author.id && <DeckFormsManager type={'EDIT'} deck={deck} />}
                  {userId === deck.author.id && <DeckFormsManager type={'DELETE'} deck={deck} />}
                </div>
              </TCell>
            </TRow>
          )
        })}
      </TBody>
    </Table>
  )
}
