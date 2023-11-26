import {
  DeleteDeckArgs,
  DeleteDeckResponseType,
  GetCardsByDeckIdArgs,
  GetDeckByIdArgs,
  GetDeckByIdResponse,
  GetDecksArgs,
  GetDecksResponse,
  RetrieveCardInDeckResponseType,
  UpdateDeckArgs,
  UpdateDeckResponseType,
} from '@/view/services/decks/decks.types'
import { baseApi } from '@/view/services/base-api'

const decksService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getDecks: builder.query<GetDecksResponse, GetDecksArgs | void>({
        // getDeck (key) is name of endpoint that we see in reduxTools
        // GetDecksResponse -> the endpoint response object that the server would return
        // GetDecksArgs -> data that we would pass to the hook
        query: args => {
          return {
            url: `v1/decks`,
            params: args ?? {},
            //method: 'GET' by default
          }
        },
        // The `query: () => 'v1/decks'` is defining the API endpoint URL
        // path that should be used for the `getDecks` query.
        //
        // This line means when you call the `useGetDecksQuery` hook in your component,
        // it's going to make an HTTP GET request to the endpoint
        // `'https://api.flashcards.andrii.es/v1/decks'`.
        providesTags: ['Decks', 'Cards'],
      }),
      getDeckById: builder.query<GetDeckByIdResponse, GetDeckByIdArgs>({
        query: ({ id }) => {
          return `v1/decks/${id}`
        }, // = {url: `v1/decks/${id}`}
      }),
      getCardsInDeck: builder.query<RetrieveCardInDeckResponseType, GetCardsByDeckIdArgs>({
        query: ({ id }) => `v1/decks/${id}/cards`,
        providesTags: ['Cards'],
      }),
      createDeck: builder.mutation<void, FormData>({
        query: args => {
          return {
            url: 'v1/decks',
            method: 'POST',
            body: args,
            formData: true,
          }
        },
        invalidatesTags: ['Decks'],
      }),
      updateDeck: builder.mutation<UpdateDeckResponseType, UpdateDeckArgs>({
        query: ({ id, name, isPrivate }) => {
          return {
            url: `v1/decks/${id}`,
            method: 'PATCH',
            body: { name, isPrivate },
          }
        },
        invalidatesTags: ['Decks'],
      }),
      deleteDeck: builder.mutation<DeleteDeckResponseType, DeleteDeckArgs>({
        query: ({ id }) => {
          return {
            url: `v1/decks/${id}`,
            method: 'DELETE',
          }
        },
        invalidatesTags: ['Decks'],
      }),
    }
  },
})

export const {
  useGetDecksQuery,
  useGetDeckByIdQuery,
  useGetCardsInDeckQuery,
  useCreateDeckMutation,
  useUpdateDeckMutation,
  useDeleteDeckMutation,
} = decksService // hooks that createApi function returns
