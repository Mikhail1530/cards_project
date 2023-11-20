import { Typography } from '@/view/ui/Typography'
import { Button } from '@/view/ui/Button'
import EditPencil from '@/view/assets/icons/editPencil/edit-pencil.tsx'
import Logout from '@/view/assets/icons/log-out/Logout.tsx'
import s from './nameWithEditButton.module.scss'

export const NameWithEditButton = ({ openNameEditing, email, nickname }: any) => {
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
      <Button icon={<Logout />} className={s.logout_btn} variant={'secondary'}>
        Logout
      </Button>
    </div>
  )
}