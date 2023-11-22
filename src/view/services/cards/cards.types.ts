export type CreateCardResponseType = {
  id: string
  deckId: string
  userId: string
  question: string
  answer: string
  shots: number
  answerImg: string
  questionImg: string
  questionVideo: string
  answerVideo: string
  rating: number
  created: string
  updated: string
}

export type UpdateCardResponseType = {
  id: string
  deckId: string
  userId: string
  question: string
  answer: string
  shots: number
  answerImg: string
  questionImg: string
  questionVideo: string
  answerVideo: string
  rating: number
  created: string
  updated: string
}

export type UpdateCardArgs = {
  id: string
  questionImg?: string
  question: string
  answer: string
  questionVideo?: string
  answerVideo?: string
}

export type DeleteCardArgs = {
  id: string
}

// export type CreateCardArgs = {
//   id: string
//   question: string
//   answer: string
//   questionImg?: string
//   answerImg?: string
//   questionVideo?: string
//   answerVideo?: string
// }
