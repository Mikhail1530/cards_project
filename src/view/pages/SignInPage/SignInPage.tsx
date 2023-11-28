import { LoginForm } from '@/view/modules/auth'
import { useLoginMutation } from '@/view/services/auth/auth.service'
import { LoginArgs } from '@/view/services/auth/auth.types'
import { useNavigate } from 'react-router-dom'
import { Header } from '@/view/modules'
import { Page } from '@/view/ui'

export const SignInPage = () => {
  const [login] = useLoginMutation()
  const navigate = useNavigate()

  const handleLogin = async (args: LoginArgs) => {
    try {
      await login(args)
      navigate('/')
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Page>
      <Header />
      <LoginForm onSubmit={handleLogin} />
    </Page>
  )
}
