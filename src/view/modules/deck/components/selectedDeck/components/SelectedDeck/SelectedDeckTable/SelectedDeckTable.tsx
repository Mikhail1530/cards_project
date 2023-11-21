import { Table, TBody, TCell, THead, THeader, TRow } from '@/view/ui/Table/table'
import { Button } from '@/view/ui/Button'
import s from './SelectedDeckTable.module.scss'
import { Bin, EditPencil } from '@/view/assets/icons'
import { CardType } from '@/view/services/decks/decks.types'
import { CardModalType, SelectedCardStatusOptions } from '../SelectedDeck'

type SelectedDeckTableType = {
  selectedDeckTableData: CardType[]
  setCard: (obj: CardModalType) => void
}

export const SelectedDeckTable = ({ selectedDeckTableData, setCard }: SelectedDeckTableType) => {
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
        {selectedDeckTableData.map((card: CardType) => {
          const onClick = (key: SelectedCardStatusOptions) => {
            setCard({ key, value: card })
          }
          return (
            <TRow key={card.id}>
              <TCell>{card?.question}</TCell>
              <TCell>{card?.answer}</TCell>
              <TCell>{new Date(card?.updated).toLocaleDateString()}</TCell>
              <TCell>{card?.grade}</TCell>
              <TCell>
                <div className={s.iconsContainer}>
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
