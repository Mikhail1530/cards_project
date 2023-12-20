import { LoginForm } from '@/view/modules/auth'
import { useAuthMeQuery, useLoginMutation } from '@/api/services/auth/auth.service'
import { LoginArgs } from '@/api/services/auth/auth.types'
import { Navigate, useNavigate } from 'react-router-dom'
import { Header } from '@/view/modules'
import { Page } from '@/view/ui'

export const SignInPage = () => {
  const [login] = useLoginMutation()
  const { data: user } = useAuthMeQuery({ skip: true })
  const navigate = useNavigate()

  const handleLogin = async (args: LoginArgs) => {
    try {
      await login(args)
      navigate('/')
    } catch (e) {
      console.error(e)
    }
  }

  if (user) {
    return <Navigate to={'/'} />
  }

  return (
    <>
      <Header text={'Sign up'} />
      <Page>
        <LoginForm onSubmit={handleLogin} />
      </Page>
    </>
  )
}
