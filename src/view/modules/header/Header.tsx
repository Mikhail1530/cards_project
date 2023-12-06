import s from './Header.module.scss'
import fancy_logo from '../../assets/pictures/fancy_logo.png'
import { HeaderAvatarPopup } from '@/view/modules/header/HeaderSelect/HeaderAvatarPopup'
import { Button, Typography } from '@/view/ui'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AppRootStateType } from '@/app/store'

type HeaderPropsType = {
  text?: 'Login' | 'Sign up'
}

export const Header = ({ text = 'Login' }: HeaderPropsType) => {
  const userId = useSelector((state: AppRootStateType) => state.user.id)
  const userName = useSelector((state: AppRootStateType) => state.user.name)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const handleSignUpBtnClick = () => {
    navigate(pathname === '/login' ? '/signUp' : '/login')
  }

  return (
    <div className={s.header}>
      <img src={fancy_logo} alt={'logoPicture'} />
      <div className={s.avatarAndName}>
        <Typography className={s.userName} variant={'body2'}>
          {userName}
        </Typography>
        {userId ? (
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
