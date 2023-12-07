import { Table, TBody, TCell, THead, THeader, TRow } from '@/view/ui/Table/Table'
import s from './CardsTable.module.scss'
import { CardType } from '@/api/services/decks/decks.types'
import { CardFormsManager } from '@/view/modules/cards/components/CardsFormsManager/CardFormsManager'

type SelectedDeckTableType = {
  selectedDeckTableData: CardType[]
}

export const CardsTable = ({ selectedDeckTableData }: SelectedDeckTableType) => {
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
          return (
            <TRow key={card.id}>
              <TCell>
                {card?.questionImg ? (
                  <>
                    <img src={card?.questionImg} alt="questionImg" />
                    {card?.question}
                  </>
                ) : (
                  card?.question
                )}
              </TCell>
              <TCell>
                {card?.answerImg ? (
                  <>
                    <img src={card?.answerImg} alt="questionImg" />
                    {card?.answer}
                  </>
                ) : (
                  card?.answer
                )}
              </TCell>
              <TCell>{new Date(card?.updated).toLocaleDateString()}</TCell>
              <TCell>{card?.grade}</TCell>
              <TCell>
                <div className={s.iconsContainer}>
                  <CardFormsManager type={'EDIT'} card={card} />
                  <CardFormsManager type={'DELETE'} card={card} />
                </div>
              </TCell>
            </TRow>
          )
        })}
      </TBody>
    </Table>
  )
}
