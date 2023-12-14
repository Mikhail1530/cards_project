import s from './Header.module.scss'
import fancy_logo from '../../assets/pictures/fancy_logo.png'
import { HeaderAvatarPopup } from '@/view/modules/header/HeaderSelect/HeaderAvatarPopup'
import { Button, Typography } from '@/view/ui'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuthMeQuery } from '@/api/services/auth/auth.service'
import { Error } from '../../assets/components/Error/Error'
import { Loading } from '@/view/assets'

type HeaderPropsType = {
  text?: 'Login' | 'Sign up'
}

export const Header = ({ text = 'Login' }: HeaderPropsType) => {
  const { data: user, error, isLoading } = useAuthMeQuery({ skip: true })
  const navigate = useNavigate()
  const { pathname } = useLocation()

  if (isLoading) {
    return <Loading />
  }
  if (!user || error) {
    return <Error error={error} />
  }

  const handleSignUpBtnClick = () => {
    navigate(pathname === '/login' ? '/signUp' : '/login')
  }

  return (
    <div className={s.header}>
      <img src={fancy_logo} alt={'logoPicture'} />
      <div className={s.avatarAndName}>
        <Typography className={s.userName} variant={'body2'}>
          {user.name}
        </Typography>
        {user.id ? (
          <HeaderAvatarPopup />
        ) : (
          <Button fullWidth={false} onClick={handleSignUpBtnClick}>
            {text}
          </Button>
        )}
      </div>
    </div>
  )
}
