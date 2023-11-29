import { Button, Card, Typography } from '@/view/ui'
import logo from '@/view/assets/pictures/logo.png'
import { useState } from 'react'
import s from './HeaderAvatarPopup.module.scss'
import { Bin } from '@/view/assets'
import avatar from '../../../assets/pictures/logo.png'
import { ProfileFormsManager } from '@/view/modules/profile/components/ProfileFormsManager/ProfileFormsManager'

export const HeaderAvatarPopup = () => {
  const [open, setOpen] = useState(false)

  return (
    <div className={s.headerAvatarPopup}>
      <img onClick={() => setOpen(!open)} src={logo} alt={'logoPicture'} />
      {open && (
        <Card className={s.headerAvaraPopupCard}>
          <div className={s.pictureAndProfileInfoContainer}>
            <img src={avatar} alt={'avatar'} />
            <div className={s.text}>
              <Typography variant={'subtitle2'}>Name</Typography>
              <Typography variant={'caption'}>email@email.com</Typography>
            </div>
          </div>
          <div className={s.btnsContainer}>
            <ProfileFormsManager type={'PROFILE'} />
            <Button variant={'link'} icon={<Bin />} fullWidth={false}>
              My profile
            </Button>
            <Button variant={'link'} icon={<Bin />} fullWidth={false}>
              Sign out
            </Button>
          </div>
        </Card>
      )}
    </div>
  )
}
