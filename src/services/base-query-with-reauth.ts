import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import { Mutex } from 'async-mutex'

// create a new mutex
const mutex = new Mutex()
const baseQuery = fetchBaseQuery({
  baseUrl: 'https://api.flashcards.andrii.es',
  credentials: 'include',
  // prepareHeaders: headers => {
  //   const token = localStorage.getItem('token')
  //   if (token) {
  //     headers.set('Authorization', `Beares ${token}`)
  //   }
  //   return headers
  // },
})

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock()
  let result = await baseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 401) {
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()
      try {
        await baseQuery({ method: 'POST', url: 'v1/auth/refresh-token' }, api, extraOptions)
        //retry the initial query
        result = await baseQuery(args, api, extraOptions)
      } finally {
        // release must be called once the mutex should be released again.
        release()
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock()
      result = await baseQuery(args, api, extraOptions)
    }
  }
  return result
}
