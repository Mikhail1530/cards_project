import { ErrorIcon } from '@/view/assets'
import { Button } from '@/view/ui'
import { useNavigate } from 'react-router-dom'
import s from './ErrorModal.module.scss'

export const ErrorModal = ({ errorMessage }: { errorMessage: string }) => {
  const navigate = useNavigate()
  return (
    <div className={s.errorModal}>
      <ErrorIcon />
      <div className={s.errorMessage}>
        Oops! <br />
        {errorMessage}
      </div>
      <Button fullWidth={false} onClick={() => navigate('/login')}>
        Back to home page
      </Button>
    </div>
  )
}
