import EditPencil from '@/assets/icons/editPencil/EditPencil.tsx'
import { Button } from '@/components/ui/Button'
import s from './avatarWithEditButton.module.scss'
type AvatarWithEditButton = {
  avatar: string
  handleAvatarChange: () => void
}

export const AvatarWithEditButton = ({ avatar, handleAvatarChange }: AvatarWithEditButton) => {
  return (
    <div className={s.avatarContainer}>
      <div className={s.avatar}>
        <img src={avatar} alt={'avatar'}></img>
        <Button
          onClick={handleAvatarChange}
          className={s.avatarEditButton}
          icon={<EditPencil />}
          variant={'secondary'}
        ></Button>
      </div>
    </div>
  )
}