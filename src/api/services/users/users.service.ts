import { baseApi } from '@/api/base-api'

export const usersService = baseApi.injectEndpoints({
  endpoints: builder => ({
    deleteAccount: builder.mutation<boolean, { id: string }>({
      query: ({ id }) => {
        debugger
        return {
          method: 'DELETE',
          url: `v1/users/${id}`,
        }
      },
      // invalidatesTags: ['AuthMe'],
    }),
  }),
})

export const { useDeleteAccountMutation } = usersService
