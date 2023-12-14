import { Table, TBody, TCell, THead, THeader, TRow } from '@/view/ui/Table/Table'
import s from './CardsTable.module.scss'
import { CardType } from '@/api/services/decks/decks.types'
import { CardFormsManager } from '@/view/modules/cards/components/CardsFormsManager/CardFormsManager'
import { FilledRatingStar } from '@/view/assets'
import { EmptyRatingStar } from '@/view/assets/icons/emptyRatingStar/EmptyRatingStar'

type SelectedDeckTableType = {
  selectedDeckTableData: CardType[]
  userId: string
}

export const CardsTable = ({ selectedDeckTableData, userId }: SelectedDeckTableType) => {
  return (
    <Table>
      <THead>
        <TRow>
          <THeader>Question</THeader>
          <THeader>Answer</THeader>
          <THeader>Last Updated</THeader>
          <THeader colSpan={2}>Grade</THeader>
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
              <TCell>{drawStars(card?.grade)}</TCell>
              {card.userId === userId && (
                <TCell>
                  <div className={s.iconsContainer}>
                    <CardFormsManager type={'EDIT'} card={card} />
                    <CardFormsManager type={'DELETE'} card={card} />
                  </div>
                </TCell>
              )}
            </TRow>
          )
        })}
      </TBody>
    </Table>
  )
}

// React knows how to render arrays of JSX elements, treating each element as a separate child in the DOM.
// const drawStars = (numberOfFilledStars: number) => {
//   return Array(5)
//     .fill(<FilledRatingStar />, 0, numberOfFilledStars)
//     .fill(<EmptyRatingStar />, numberOfFilledStars, 5)
// }
const drawStars = (numberOfFilledStars: number) => {
  return Array(5)
    .fill(null)
    .map((_, index) => {
      return index < numberOfFilledStars ? (
        <FilledRatingStar key={index} />
      ) : (
        <EmptyRatingStar key={index} />
      )
    })
}
