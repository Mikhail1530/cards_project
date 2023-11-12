import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from '@/services/base-query-with-reauth'

export const baseApi = createApi({
  reducerPath: 'baseApi',
  // baseQuery consider as instance.axios
  tagTypes: ['Decks', 'AuthMe'],
  baseQuery: baseQueryWithReauth,
  // refetchOnFocus: true,
  endpoints: () => ({}),
})
