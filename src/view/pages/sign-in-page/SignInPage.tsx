import { LoginForm } from '@/view/modules/auth'
import s from './SignInPage.module.scss'
import { useLoginMutation } from '@/view/services/auth/auth.service'
import { LoginArgs } from '@/view/services/auth/auth.types'
import { useNavigate } from 'react-router-dom'

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
    <div className={s.signInPage}>
      <LoginForm onSubmit={handleLogin} />
    </div>
  )
}
