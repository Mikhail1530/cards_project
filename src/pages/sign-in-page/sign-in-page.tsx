import { LoginForm } from '@/components/auth/LoginForm'
import s from './sign-in-page.module.scss'
import { useLoginMutation } from '@/services/auth/auth.service'
import { LoginArgs } from '@/services/auth/auth.types'
import { useNavigate } from 'react-router-dom'

const SignInPage = () => {
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

export default SignInPage
