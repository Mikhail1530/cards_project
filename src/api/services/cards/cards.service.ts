import { baseApi } from '@/api/base-api'
import {
  AddGradeToCardArgs,
  CreateCardResponseType,
  DeleteCardArgs,
  UpdateCardResponseType,
} from '@/api/services/cards/cards.types'
import { CardType } from '@/api/services/decks/decks.types'

const cardsService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      createCard: builder.mutation<
        CreateCardResponseType,
        { deckId: string | undefined; formData: FormData }
      >({
        query: ({ formData, deckId }) => {
          return {
            url: `v1/decks/${deckId}/cards`,
            method: 'POST',
            body: formData ?? {},
          }
        },
        invalidatesTags: ['Cards'],
      }),
      updateCard: builder.mutation<
        UpdateCardResponseType,
        { cardId: string | undefined; formData: FormData }
      >({
        query: ({ cardId, formData }) => {
          return {
            url: `v1/cards/${cardId}`,
            method: 'PATCH',
            body: formData ?? {},
          }
        },
        invalidatesTags: ['Cards'],
      }),
      deleteCard: builder.mutation<void, DeleteCardArgs>({
        query: ({ cardId }) => {
          return {
            url: `v1/cards/${cardId}`,
            method: 'DELETE',
          }
        },
        invalidatesTags: ['Cards'],
      }),
      addGradeToCard: builder.mutation<CardType, AddGradeToCardArgs>({
        query: args => {
          return {
            url: `v1/decks/${args.deckId}/learn`,
            method: 'POST',
            body: args.body,
          }
        },
        invalidatesTags: ['Cards'],
      }),
      getRandomCard: builder.query<void, { deckId: string; previousCardId?: string }>({
        query: ({ deckId, previousCardId }) => {
          return {
            url: `v1/decks/${deckId}/learn?previousCardId=${previousCardId && previousCardId}`,
            method: 'GET',
          }
        },
        providesTags: ['Cards'],
      }),
    }
  },
})

export const {
  useCreateCardMutation,
  useUpdateCardMutation,
  useDeleteCardMutation,
  useAddGradeToCardMutation,
  // useGetCardByIdQuery,
  useGetRandomCardQuery,
} = cardsService
