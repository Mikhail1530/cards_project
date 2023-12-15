import { Typography } from '@/view/ui/Typography'
import { Button } from '@/view/ui/Button'
import s from './nameWithEditButton.module.scss'
import { EditPencil, Logout } from '@/view/assets/icons'

type NameWithEditButtonPropsType = {
  openNameEditing: (open: boolean) => void
  email: string
  nickname: string
  logout: () => void
}

export const NameWithEditButton = ({
  openNameEditing,
  email,
  nickname,
  logout,
}: NameWithEditButtonPropsType) => {
  // const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    // navigate('/login')
  }

  return (
    <div className={s.nameWithEditButtonContainer}>
      <div className={s.nameWithEditButton}>
        <Typography as={'div'} className={s.name} variant={'h1'}>
          {nickname}
        </Typography>
        <Button
          onClick={openNameEditing}
          className={s.editNameButton}
          icon={<EditPencil />}
          variant={'secondary'}
        ></Button>
      </div>
      <div>
        <Typography as={'div'} className={s.email} variant={'body2'}>
          {email}
        </Typography>
      </div>
      <Button
        icon={<Logout />}
        onClick={handleLogout}
        className={s.logout_btn}
        variant={'secondary'}
      >
        Logout
      </Button>
    </div>
  )
}
