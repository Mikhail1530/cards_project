import { Button, Card, Typography } from '@/view/ui'
import { useState } from 'react'
import s from './HeaderAvatarPopup.module.scss'
import { ProfileFormsManager } from '@/view/modules/profile/components/ProfileFormsManager/ProfileFormsManager'
import { useAuthMeQuery } from '@/api/services/auth/auth.service'

export const HeaderAvatarPopup = () => {
  const [open, setOpen] = useState(false)
  const { data } = useAuthMeQuery({ skip: true })

  if (!data) {
    return null
  }

  return (
    <div className={s.headerAvatarPopup}>
      {!data.name ? (
        <Button fullWidth={false}>Sign Up</Button>
      ) : (
        <img onClick={() => setOpen(!open)} src={data.avatar} alt={'logoPicture'} />
      )}
      {open && (
        <Card className={s.headerAvaraPopupCard}>
          <div className={s.pictureAndProfileInfoContainer}>
            <img src={data.avatar} alt={'avatar'} />
            <div className={s.text}>
              <Typography variant={'subtitle2'}>{data.name}</Typography>
              <Typography variant={'caption'}>{data.email}</Typography>
            </div>
          </div>
          <div className={s.btnsContainer}>
            <ProfileFormsManager type={'PROFILE'} />
            <ProfileFormsManager type={'LOGOUT-BTN'} />
          </div>
        </Card>
      )}
    </div>
  )
}
