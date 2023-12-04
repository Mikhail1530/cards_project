import s from './avatarWithEditButton.module.scss'
import { Control } from 'react-hook-form'
import { EditPencil } from '@/view/assets'
import { PersonalInformationFormValues } from '../PersonalInformationForm'
import { TextField } from '@/view/ui'

type AvatarWithEditButtonPropsType = {
  avatar: string
  // handleAvatarChange: () => void
  control: Control<PersonalInformationFormValues>
  name: 'avatar'
  register: any
  // onChange: any
}

export const AvatarWithEditButton = ({ avatar }: AvatarWithEditButtonPropsType) => {
  return (
    <div className={s.avatarContainer}>
      <div className={s.avatar}>
        <img src={avatar} alt={'avatar'}></img>
        <TextField type={'file'} className={s.avatarEditButton} icon={<EditPencil />} />
      </div>
    </div>
  )
}
