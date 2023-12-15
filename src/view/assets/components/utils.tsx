import React from 'react'
import { Navigate } from 'react-router-dom'

type Config = {
  redirectTo: string
  redirectFrom: string
}

export const WithAuthRedirect =
  (config: Config) => (Component: React.FC) => (): React.JSX.Element => {
    // const { isError, data, isLoading, isSuccess } = useAuthMeQuery()
    const { redirectTo, redirectFrom } = config

    console.log('RENDER1')

    switch (redirectFrom) {
      // case 'login': {
      //   if (!isError) {
      //     console.log('RENDER2')
      //     return <Navigate to={'/login'} />
      //   }
      //   break
      // }

      case 'outlet':
        return <Navigate to={redirectTo} />

      default:
        break
    }

    return <Component />
  }
