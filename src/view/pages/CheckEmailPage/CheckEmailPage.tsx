import { Header } from '@/view/modules'
import { Page } from '@/view/ui'
import { CheckEmailModal } from '@/view/modules/auth/components/CheckEmailModal/CheckEmailModal'
import { useNavigate } from 'react-router-dom'

export const CheckEmailPage = () => {
  const navigate = useNavigate()
  //here fetch the token if token exist then show Recover password modal.

  const handleSignUp = () => {
    navigate('/login')
  }

  return (
    <Page>
      <Header text={'Login'} />
      <CheckEmailModal onSubmit={handleSignUp} />
    </Page>
  )
}
